import React, { useEffect, useState } from 'react';
import { IonBackButton, IonButton, IonButtons, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonToolbar } from '@ionic/react';
import '../styles/Login.css';

import { arrowBack, carOutline } from "ionicons/icons";
import CustomField from '../components/CustomField';
import { useLoginFields } from '../data/fields';
import { validateForm } from '../data/utils';
import { useParams } from 'react-router';
import Action from '../components/Action';
import Wave from '../components/Wave';
import { PushNotifications, PushNotificationSchema, ActionPerformed, RegistrationError } from '@capacitor/push-notifications';
import { Toast } from '@capacitor/toast';
import api from '../services/api';
import { IonSpinner } from '@ionic/react';



interface LoginFormData {
    [key: string]: string;
}

const Login: React.FC = () => {

    const [isLoading, setIsLoading] = useState(false);

    const register = () => {
        // Register for push notifications
        PushNotifications.checkPermissions().then(result => {
            if (result.receive == 'granted') {
                console.log('Register');
                PushNotifications.register();
                // Get the FCM device token
                PushNotifications.addListener('registration', (token) => {
                    console.log('Token ' + token.value);
                    const deviceToken = token.value;
                    showToast(deviceToken);
                    sendTokenToServer(deviceToken);
                });

                // Some issue with our setup and push will not work
                PushNotifications.addListener('registrationError',
                    (error: RegistrationError) => {
                        alert('Error on registration: ' + JSON.stringify(error));
                    }
                );

                // Handle incoming notifications
                PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
                    handleIncomingNotification(notification);
                });

                // Handle notification click/tap
                PushNotifications.addListener('pushNotificationActionPerformed', (action: ActionPerformed) => {
                    handleNotificationAction(action);
                });
            }
        });
    };

    const sendTokenToServer = async (deviceToken: string) => {
        try {
            // const response = await fetch('http://192.168.21.172:8080/registerDeviceToken/1', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ deviceToken }),
            // });
            const response = await api.post('/registerDeviceToken', deviceToken, {
                headers: {
                    'Content-Type': 'text/plain'
                }
            });
            window.location.href = '/home';

            if (response.status) {
                console.log('Device token sent successfully');
            } else {
                console.error('Failed to send device token to the server');
            }
        } catch (error) {
            console.error('Error sending device token:', error);
        }
    };

    const handleIncomingNotification = (notification: PushNotificationSchema) => {
        // Handle the received notification
        console.log('Received notification:', JSON.stringify(notification));

        // Display the notification in your app, update UI, etc.
    };

    const handleNotificationAction = (action: ActionPerformed) => {
        // Handle the user's action on the notification (e.g., open a specific page)
        console.log('Notification action performed:', action);

        // Implement your logic based on the action, such as navigating to a specific page
    };

    const showToast = async (msg: string) => {
        await Toast.show({
            text: msg
        })
    }

    const params = useParams();
    const fields = useLoginFields();
    // console.log(fields);
    const [errors, setErrors] = useState<{ id: string; message: string }[]>([]);

    const login = async () => {
        const formErrors = validateForm(fields);
        setErrors(formErrors);

        if (!formErrors.length) {
            const formData: LoginFormData = {};
            fields.forEach(field => {
                formData[field.id] = field.input.state.value;
                // console.log(formData[field.id]);
            });

            setIsLoading(true);
            // console.log(formData);

            try {
                const response = await api.post('/rest/auth/login', formData);
                const authToken = response.data.token;

                localStorage.setItem('authToken', authToken);
                // register();

                window.location.href = "/home"


            } catch (error) {
                showToast('Error during login');
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        return () => {
            fields.forEach((field) => field.input.state.reset(''));
            setErrors([]);
        };
    }, [params]);

    return (
        <IonPage className='loginPage'>
            <IonHeader>
                <IonToolbar className='ion-toolbar'>

                    <IonButtons slot="start">
                        <IonBackButton icon={arrowBack} text="" className="custom-back" />
                    </IonButtons>

                    <IonButtons slot="end">
                        <IonButton className="custom-button">
                            <IonIcon icon={carOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonGrid className="ion-padding">
                    <IonRow>
                        <IonCol size="12" className="headingText">
                            <IonCardTitle>Connexion à la Plateforme Automobile</IonCardTitle>
                            <h5>Bienvenue, explorez nos incroyables offres de voitures !</h5>
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-margin-top ion-padding-top">
                        <IonCol size="12">

                            {fields.map(field => {

                                return <CustomField key={field.id} field={field} errors={errors} />;
                            })}

                            <IonButton className="custom-button" expand="block" onClick={login} disabled={isLoading}>
                                {isLoading ? (
                                    <IonSpinner name="crescent" color="light" />
                                ) : (
                                    'Se connecter'
                                )}
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>

            <IonFooter className='ion-footer'>
                <IonGrid className="ion-no-margin ion-no-padding">

                    <Action message="Vous n'avez pas de compte?" text="Créer" link="/signup" />
                    <Wave />
                </IonGrid>
            </IonFooter>
        </IonPage>
    );
};

export default Login;

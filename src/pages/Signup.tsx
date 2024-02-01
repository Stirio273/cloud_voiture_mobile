import React, { useEffect, useState } from 'react';
import { IonBackButton, IonButton, IonButtons, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonPage, IonToolbar } from '@ionic/react';
import { arrowBack, shapesOutline } from "ionicons/icons";
import CustomField from '../components/CustomField';
import { useSignupFields } from '../data/fields';
import Action from '../components/Action';
import Wave from '../components/Wave';
import { validateForm } from '../data/utils';
import { useParams } from 'react-router';
import '../styles/Signup.css';
import api from '../services/api';
import { IonSpinner } from '@ionic/react';
import { Toast } from '@capacitor/toast';

interface SignupFormData {
    [key: string]: any;
}

const Signup: React.FC = () => {
    const params = useParams();
    const fields = useSignupFields();
    const [errors, setErrors] = useState<{ id: string; message: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const showToast = async (msg: string) => {
        await Toast.show({
            text: msg
        })
    }

    const createAccount = async () => {
        const formErrors = validateForm(fields);
        setErrors(formErrors);

        if (!formErrors.length) {
            const formData :  SignupFormData = {};
            fields.forEach(field => {
                formData[field.id] = field.input.state.value;
            });
            formData['actif'] = 1;
            
            setIsLoading(true);

            try {
                const response = await api.post('/utilisateur/inscription', formData);
                const authToken = response.data.token;

                showToast('Signup successfull,please log now');
                await new Promise(resolve => setTimeout(resolve, 1000));

                window.location.href = '/signin';

                
            } catch (error) {
                console.log(error);
                showToast('Error during login');
            } finally {
                setIsLoading(false);
            }
        }
    }

    useEffect(() => {
        return () => {
            fields.forEach(field => field.input.state.reset(''));
            setErrors([]);
        }
    }, [params]);

    return (
        <IonPage className="signupPage">
            <IonHeader>
                <IonToolbar className="ion-toolbar">
                    <IonButtons slot="start">
                        <IonBackButton icon={arrowBack} text="" className="custom-back" />
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton className="custom-button">
                            <IonIcon icon={shapesOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonGrid className="ion-padding">
                    <IonCol size="12" className="headingText">
                        <IonCardTitle>Inscription</IonCardTitle>
                        <h5>Faisons connaissance</h5>
                    </IonCol>

                    <IonCol size="12">
                        {fields.map(field => (
                            <CustomField key={field.id} field={field} errors={errors} />
                        ))}
                        <IonButton className="custom-button" expand="block" onClick={createAccount} disabled={isLoading}>
                                {isLoading ? (
                                    <IonSpinner name="crescent" color="light" />
                                ) : (
                                    'Créer un compte'
                                )}
                        </IonButton>
                    </IonCol>
                </IonGrid>
            </IonContent>

            <IonFooter className='ion-footer'>
                <IonGrid className="ion-no-margin ion-no-padding">
                    <Action message="Vous avez déjà un compte?" text="Connexion" link="/signin" />
                    <Wave />
                </IonGrid>
            </IonFooter>
        </IonPage>
    );
};

export default Signup;

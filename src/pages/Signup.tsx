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

const Signup: React.FC = () => {
    const params = useParams();
    const fields = useSignupFields();
    const [errors, setErrors] = useState<{ id: string; message: string }[]>([]);

    const createAccount = () => {
        const formErrors = validateForm(fields);
        setErrors(formErrors);

        if (!formErrors.length) {
            // Soumettez votre formulaire ici
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
            <IonContent fullscreen className='ion-content'>
                <IonGrid className="ion-padding">
                    <IonCol size="12" className="headingText">
                        <IonCardTitle>Inscription</IonCardTitle>
                        <h5>Faisons connaissance</h5>
                    </IonCol>

                    <IonCol size="12">
                        {fields.map(field => (
                            <CustomField key={field.id} field={field} errors={errors} />
                        ))}
                        <IonButton className="custom-button" expand="block" onClick={createAccount}>
                            Créer un compte
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

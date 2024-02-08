// CarPost.tsx

import React from 'react';
import {
    IonBackButton,
    IonBadge,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonFooter,
    IonGrid,
    IonHeader,
    IonIcon,
    IonNote,
    IonPage,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';
import { bookmarkOutline, shareOutline,arrowBackOutline } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router';
import '../styles/CarPost.css';
import { useState ,useEffect } from "react";
import api from "../services/api";
import { IonSpinner } from "@ionic/react";
import { Photo } from '../services/interface';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CarPost: React.FC = () => {
    const [annonce, setAnnonce] = useState(null as any);
    const [loading,setLoading] = useState(true);
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const getData = async () => {
          try {
            const responseMarque = await api.get("/user/annonce/"+id);
            console.log(responseMarque.data.data);
            setAnnonce(responseMarque.data.data);
            setLoading(false);
          } catch (error) {
            console.error("Erreur", error);
            setLoading(false);
            setError(error);
          }
        };
    
        getData();
      },[id]);

      const goToPreviousPage = () => {
        history.goBack();  // Navigate to the previous page
    };



    const slideOpts = {
        slidesPerView: 1,
        spaceBetween: 10
    };

    return (
        
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton text="" style={{ left: '10px' }} />
                </IonButtons>
                <IonTitle>Detail de la voiture</IonTitle>
                </IonToolbar>
            </IonHeader>

            {loading && <IonSpinner name="crescent" color="light" />}
            {!loading && (
                <>
                <IonContent fullscreen>
                    <Carousel showArrows={true} showThumbs={false}>
                    {annonce?.photo.map((photo: Photo, index: number) => (
                        <SwiperSlide key={index}>
                        <img src={photo.link} alt={`Car ${index + 1}`} className="car-image" />
                        </SwiperSlide>
                    ))}
                    </Carousel>

                    <IonGrid className="ion-padding">
                    <IonRow className="ion-align-items-center ion-justify-content-between">
                        <IonNote>{new Date(annonce?.date).toLocaleString()}</IonNote>
                    </IonRow>

                    <IonRow>
                        <IonCol size="12">
                        <IonText color="dark">
                            <h3>{annonce?.nomVoiture}</h3>
                            <h3>{annonce?.marque.libelle}</h3>
                            <h3>{annonce?.type.libelle}</h3>
                            <h3>{annonce?.categorie.libelle}</h3>
                            <h3>{annonce?.carburant.libelle}</h3>
                        </IonText>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="12">
                        <IonText color="dark">
                            <h3>Prix : {annonce?.prix}</h3>
                            <h3>Annonce par : {annonce?.utilisateur.nom + " " + annonce?.utilisateur.prenom}</h3>
                        </IonText>
                        </IonCol>
                    </IonRow>
                    </IonGrid>
                </IonContent>

                <IonFooter className="view-post-footer">
                    <IonRow className="post-footer ion-align-self-center ion-justify-content-between">
                        <div className="ion-padding">
                            <IonButton fill="clear" color="primary">
                                <IonIcon icon={shareOutline} />
                            </IonButton>

                        </div>

                        <div>
                            <IonBadge color="primary" className="post-category">
                            {annonce?.categorie.libelle}
                            </IonBadge>
                        </div>
                    </IonRow>
                </IonFooter>
                </>
            )}
            {error && (
            <div className="error-message">
                <IonText color="danger">
                    <p>{error.message || "An error occurred."}</p>
                </IonText>
            </div>
            )}
            </IonPage>

    );
};

export default CarPost;

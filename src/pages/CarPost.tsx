// CarPost.tsx

import React from 'react';
import {
    IonBackButton,
    IonBadge,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
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
import { bookmarkOutline, shareOutline, arrowBackOutline } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router';
import '../styles/CarPost.css';
import { useState, useEffect } from "react";
import api from "../services/api";
import { IonSpinner } from "@ionic/react";
import { Photo } from '../services/interface';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CarPost: React.FC = () => {
    const [annonce, setAnnonce] = useState(null as any);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const responseMarque = await api.get("/user/annonce/" + id);
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
    }, [id]);

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
                        <IonBackButton text="" style={{ left: '10px', marginLeft: 10 }} />
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

                        <IonGrid>
                            <IonRow>
                                <IonCol size='12'>
                                    <IonCard>
                                        <IonCardHeader className='bordered'>
                                            <IonCardTitle color="success" style={{ fontSize: 20 }}>
                                                {annonce?.nomVoiture}
                                            </IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent style={{ paddingTop: 10 }}>
                                            <IonRow>
                                                {annonce?.description}
                                            </IonRow>
                                            <IonRow>
                                                <IonCol size='6'>
                                                    Date de publication
                                                </IonCol>
                                                <IonCol size='6' className='infoValue' style={{ textAlign: 'right' }}>
                                                    {new Date(annonce?.date).toLocaleString().slice(0, 10)}
                                                </IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonCol size='6'>
                                                    Prix
                                                </IonCol>
                                                <IonCol size='3' offset='3' className='infoValue'>
                                                    {annonce?.prix} Ar
                                                </IonCol>
                                            </IonRow>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            </IonRow>

                            <IonRow>
                                <IonCol size='12'>
                                    <IonCard>
                                        <IonCardHeader className='bordered'>
                                            <IonCardTitle color="success" style={{ fontSize: 20 }}>
                                                Informations generales
                                            </IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <IonRow>
                                                <IonCol size='6'>
                                                    Marque
                                                </IonCol>
                                                <IonCol size='3' offset='3' className='infoValue'>
                                                    {annonce?.marque.libelle}
                                                </IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonCol size='6'>
                                                    Categorie
                                                </IonCol>
                                                <IonCol size='3' offset='3' className='infoValue'>
                                                    {annonce?.categorie.libelle}
                                                </IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonCol size='6'>
                                                    Type
                                                </IonCol>
                                                <IonCol size='3' offset='3' className='infoValue'>
                                                    {annonce?.type.libelle}
                                                </IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonCol size='6'>
                                                    Pays constructeur
                                                </IonCol>
                                                <IonCol size='6' className='infoValue'>
                                                    {annonce?.marque.pays.libelle}
                                                </IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonCol size='6'>
                                                    Carburant
                                                </IonCol>
                                                <IonCol size='3' offset='3' className='infoValue'>
                                                    {annonce?.carburant.libelle}
                                                </IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonCol size='6'>
                                                    Proprietaire
                                                </IonCol>
                                                <IonCol size='6' className='infoValue' style={{ textAlign: 'right' }}>
                                                    {annonce?.utilisateur.nom + " " + annonce?.utilisateur.prenom}
                                                </IonCol>
                                            </IonRow>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonContent>
                </>
            )
            }
            {
                error && (
                    <div className="error-message">
                        <IonText color="danger">
                            <p>{error.message || "An error occurred."}</p>
                        </IonText>
                    </div>
                )
            }
        </IonPage >

    );
};

export default CarPost;

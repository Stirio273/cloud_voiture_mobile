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
import { bookmarkOutline, shareOutline } from 'ionicons/icons';
import { useParams } from 'react-router';
import { carPosts } from '../localData';
import '../styles/CarPost.css';

const CarPost: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const car = carPosts.find(post => parseInt(post.id.toString()) === parseInt(id));

    if (!car) {
        return <div>Voiture introuvable</div>;
    }

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
                    <IonTitle>{car.title}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <Swiper /*pager={true}*/ /*options={slideOpts}*/>
                    {car.images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img src={image} alt={`Car ${index + 1}`} className="car-image" />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <IonGrid className="ion-padding">
                    <IonRow className="ion-align-items-center ion-justify-content-between">
                        <IonNote>{car.date}</IonNote>
                    </IonRow>

                    <IonRow>
                        <IonCol size="12">
                            <IonText color="dark">
                                <h1>{car.title}</h1>
                            </IonText>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="12">
                            <IonText color="medium">
                                <p>{car.description}</p>
                            </IonText>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="12">
                            <IonText color="dark">
                                <h2>Informations Générales</h2>
                            </IonText>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="6">
                            <IonText color="medium">Marque: {car.make}</IonText>
                        </IonCol>
                        <IonCol size="6">
                            <IonText color="medium">Modèle: {car.model}</IonText>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="6">
                            <IonText color="medium">Année: {car.year}</IonText>
                        </IonCol>
                        <IonCol size="6">
                            <IonText color="medium">Prix: ${car.price.toLocaleString()}</IonText>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>

            <IonFooter className="view-post-footer">
                <IonRow className="post-footer ion-align-self-center ion-justify-content-between">
                    <div>
                        <IonButton fill="clear" color="primary">
                            <IonIcon icon={shareOutline} />
                        </IonButton>
                        <IonButton fill="clear" color="primary">
                            <IonIcon icon={bookmarkOutline} />
                        </IonButton>
                    </div>

                    <div>
                        <IonBadge color="primary" className="post-category">
                            {car.category}
                        </IonBadge>
                    </div>
                </IonRow>
            </IonFooter>
        </IonPage>
    );
};

export default CarPost;

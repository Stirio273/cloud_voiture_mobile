// Post.tsx

import React, { useState } from 'react';
import { IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonNote, IonRow } from "@ionic/react";
import { heartOutline, heartSharp,trashBin } from "ionicons/icons";
import {AnnonceProps} from '../services/interface';
import "../styles/Post.css";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import api from "../services/api";

const Post: React.FC<AnnonceProps> = ({ annonce,afficherStatus,isFavorite }) => {

    const [estFavorisSt,setEstFavorisSt] = useState(isFavorite);

    const handleToggleFavorite = async (event: React.MouseEvent,idannonce:string) => {
        event.preventDefault();
        event.stopPropagation();

        if(estFavorisSt == true){
            const resp = await api.delete("/user/annonce/favoris/supprimer/"+idannonce);
        } else {
            const resp = await api.post("/user/annonce/favoris/ajouter/"+idannonce);
        }

        setEstFavorisSt(!estFavorisSt);
    };

    const renderStatusDetails = () => {
        let statusText = "";
        let statusColorClass = "";
    
        switch (annonce.etat) {
            case -10:
                statusText = "Supprimé";
                statusColorClass = "status-deleted";
                break;
            case -5:
                statusText = "Refusé";
                statusColorClass = "status-rejected";
                break;
            case 0:
                statusText = "En attente de validation";
                statusColorClass = "status-pending";
                break;
            case 5:
                statusText = "Validé";
                statusColorClass = "status-validated";
                break;
            case 10:
                statusText = "Vendu";
                statusColorClass = "status-sold";
                break;
            default:
                statusText = "Statut inconnu";
                statusColorClass = "status-unknown";
                break;
        }
    
        return (
            <p className={`status-label ${statusColorClass}`}>
                Statut : {statusText}
            </p>
        );
    };
    

    return (
        <Link to={`/annonce/${annonce.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <IonCard className="post-card">
                
                <Carousel showArrows={false} showThumbs={false}>
                {annonce.photo.map((photo, photoIndex) => (
                    <div key={photoIndex}>
                        <img src={photo.link} alt="main post" className="post-image" />
                    </div>
                ))}
                </Carousel>

                
                    <IonCardContent className="post-content">
                        <IonCardTitle className="post-title">
                            <span className="post-link">
                                {annonce.nomVoiture}
                            </span>
                        </IonCardTitle>

                        <p>
                            {annonce.description}
                        </p>
                        <p>
                            Publie par :
                            {annonce.utilisateur.nom +" "+annonce.utilisateur.nom}
                        </p>
                        <p>
                            Date :
                            {new Date(annonce.date).toLocaleString()}
                        </p>
                        
                        { afficherStatus ? renderStatusDetails() : "" }

                        <IonRow className="post-footer ion-align-self-center ion-justify-content-between">
                            <div>
                                <IonButton fill="clear" color="primary" size="small" onClick={(e) => handleToggleFavorite(e,annonce.id)}>
                                    <IonIcon icon={estFavorisSt ? heartSharp : heartOutline} />
                                </IonButton>
                                <IonButton fill="clear" color="primary" size="small">
                                    Detail
                                </IonButton>
                                
                            </div>

                            <div>
                                <IonBadge color="primary" className="post-category">
                                    {annonce.categorie.libelle}
                                </IonBadge>
                            </div>
                        </IonRow>
                    </IonCardContent>
                
            </IonCard>
        </Link>
    );
}

export default Post;

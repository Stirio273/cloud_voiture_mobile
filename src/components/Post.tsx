// Post.tsx

import React, { useState } from 'react';
import { IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonNote, IonRow } from "@ionic/react";
import { shareOutline, heartOutline, heartSharp } from "ionicons/icons";

import "../styles/Post.css";

interface PostProps {
    post: {
        id: number;
        images: string[];
        sellerImage: string;
        seller: string;
        date: string;
        title: string;
        description: string;
        category: string;
    };
}

const Post: React.FC<PostProps> = ({ post }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const handleToggleFavorite = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setIsFavorite(!isFavorite);
    };

    return (
        <IonCard routerLink={`/annonce/${post.id}`} className="post-card">
            <img src="assets/mini.jpg" alt="main post" className="post-image" />

            <IonCardContent className="post-content">
                <IonCardTitle className="post-title">
                    <span className="post-link" onClick={(e) => e.stopPropagation()}>
                        {post.title}
                    </span>
                </IonCardTitle>

                <p>
                    {post.description}
                </p>

                <IonRow className="post-footer ion-align-self-center ion-justify-content-between">
                    <div>
                        <IonButton fill="clear" color="primary" size="small">
                            <IonIcon icon={shareOutline} />
                        </IonButton>
                        <IonButton fill="clear" color="primary" size="small" onClick={handleToggleFavorite}>
                            <IonIcon icon={isFavorite ? heartSharp : heartOutline} />
                        </IonButton>
                    </div>

                    <div>
                        <IonBadge color="primary" className="post-category">
                            {post.category}
                        </IonBadge>
                    </div>
                </IonRow>
            </IonCardContent>
        </IonCard>
    );
}

export default Post;

// Layout.tsx

import React from 'react';
import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { carOutline, notificationsOutline } from 'ionicons/icons';
import '../styles/Layout.css'; // Créez ou mettez à jour un fichier CSS pour les styles personnalisés

interface LayoutProps {
    pageTitle: string;
    children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ pageTitle, children }) => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="layout-toolbar">
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle className="layout-title">
                        <IonIcon icon={carOutline} className="car-icon" />
                        {pageTitle}
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="layout-content">
                {children}
            </IonContent>
            <IonFooter></IonFooter>
        </IonPage>
    );
};

export default Layout;

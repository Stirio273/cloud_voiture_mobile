import React from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { homeOutline, homeSharp, carOutline, carSharp, addCircleOutline, addCircleSharp, createOutline, createSharp, logOutOutline, logOutSharp, chatbubbleOutline, chatbubbleSharp, documentOutline, documentSharp, heartOutline, heartSharp, mailOutline, mailSharp, settingsOutline, settingsSharp, helpCircleOutline, documentTextOutline, peopleOutline, personOutline, menuOutline } from 'ionicons/icons';
import '../styles/Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Accueil',
    url: '/home',
    iosIcon: homeOutline,
    mdIcon: homeSharp
  },
  {
    title: 'Inserer une annonce',
    url: '/inserer_annonce',
    iosIcon: addCircleOutline,
    mdIcon: addCircleSharp
  },
  {
    title: 'Mes annonces',
    url: '/mes-annonces',
    iosIcon: carOutline,
    mdIcon: carSharp
  },
  {
    title: 'Mes favoris',
    url: '/mes-favoris',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },

  {
    title: 'Se déconnecter',
    url: '/deconnexion',
    iosIcon: logOutOutline,
    mdIcon: logOutSharp
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (

    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList>
          <IonHeader translucent>
            <IonToolbar>
              <IonTitle>MilaVam</IonTitle>
            </IonToolbar>
          </IonHeader>
          {appPages.map((appPage, index) => {
            return (
              <IonItem key={index} className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>)
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;

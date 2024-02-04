import React from 'react';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { homeOutline, homeSharp, carOutline, carSharp, addCircleOutline, addCircleSharp, createOutline, createSharp, logOutOutline, logOutSharp, chatbubbleOutline, chatbubbleSharp, documentOutline, documentSharp, heartOutline, heartSharp, mailOutline, mailSharp, settingsOutline, settingsSharp, helpCircleOutline, documentTextOutline, peopleOutline, personOutline } from 'ionicons/icons';
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
        <IonList id="inbox-list" className="custom-menu">
          <div className="user-name-background">
            <IonListHeader className="menu-header">Rakoto Nirina</IonListHeader>
            <IonNote className="menu-email">rnmdp@gmail.com</IonNote>
          </div>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;

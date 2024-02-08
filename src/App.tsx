import React, { useEffect } from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useLocation } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import NotificationsPage from './pages/NotificationsPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import CarPost from './pages/CarPost';
import { PushNotifications, PushNotification, PushNotificationActionPerformed, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';
import { Toast } from '@capacitor/toast';
import InsererAnnonce from './pages/InsererAnnonce';
import MesAnnonces from './pages/MesAnnonces';
import MesFavoris from './pages/MesFavoris';
import DetailMonAnnonce from './pages/DetailMonAnnonce';
import VendreAnnonce from './pages/VendreAnnonce';
import Logout from './pages/Logut';

setupIonicReact();

const App: React.FC = () => {

  const pathname = window.location.pathname;

  // Détermine si l'utilisateur est sur une page de connexion
  const isLoginPage = pathname === '/signin' || pathname === '/signup';
  
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          {!isLoginPage && <Menu />}
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/signin" />
            </Route>
            <Route path="/page/:name" exact={true}>
              <Page />
            </Route>
            <Route path="/notifications" exact={true}>
              <NotificationsPage />
            </Route>
            <Route path="/signin" exact={true}>
              <Login />
            </Route>
            <Route path="/signup" exact={true}>
              <Signup />
            </Route>
            <Route path="/home" exact={true}>
              <Home />
            </Route>
            <Route path="/mes-annonces" exact={true}>
              <MesAnnonces />
            </Route>
            <Route path="/mes-favoris" exact={true}>
              <MesFavoris />
            </Route>
            <Route exact path="/annonce/:id">
              <CarPost />
            </Route>
            <Route exact path="/detail-mon-annonce/:id">
              <DetailMonAnnonce />
            </Route>
            <Route exact path="/vendre/:id">
              <VendreAnnonce />
            </Route>
            <Route path="/inserer_annonce" exact={true}>
              <InsererAnnonce />
            </Route>
            <Route path="/deconnexion" exact={true}>
              <Logout/>
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

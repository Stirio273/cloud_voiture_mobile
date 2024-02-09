import React, { useEffect } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import api from '../services/api';

const Logout: React.FC = () => {
  useEffect(() => {
    logout();
  }, []);

  const logout = async () => {
    await api.post('/unregisterDeviceToken', localStorage.getItem('deviceToken'), {
      headers: {
        'Content-Type': 'text/plain'
      }
    });
    localStorage.removeItem('authToken');
    window.location.href = '/signin';
  };

  return (
    <IonPage>
      <IonContent>
        {/* Aucun contenu n'est rendu car le composant est utilisé uniquement pour effectuer la déconnexion et la redirection */}
      </IonContent>
    </IonPage>
  );
};

export default Logout;

import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import '../styles/Page.css';
import NotificationsList from '../components/NotificationsList';
import Layout from '../components/Layout';

const Page: React.FC = () => {
  const { name } = useParams<{ name: string; }>();

  return (
    <Layout pageTitle={name}>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <ExploreContainer>

      </ExploreContainer>
    </Layout>
  );
};

export default Page;

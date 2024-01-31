import React, { useEffect } from 'react';
import { IonHeader, IonTitle, IonToolbar, IonContent, IonButton, IonFooter } from '@ionic/react';
import NotificationsList from '../components/NotificationsList';
import Layout from '../components/Layout';
import '../styles/ExploreContainer.css';
import { LocalNotifications } from '@capacitor/local-notifications';

const NotificationsPage: React.FC = () => {
    useEffect(() => {
        scheduleNotification();
    }, []);

    const scheduleNotification = async () => {
        await LocalNotifications.schedule({
            notifications: [
                {
                    title: 'New Notification',
                    body: 'You have a new notification!',
                    id: 1,
                    schedule: { at: new Date(Date.now() + 1000) },
                },
            ],
        });
    };

    const dummyNotifications = [
        {
            id: 1,
            title: 'New Message',
            message: 'You have a new message from John Doe.',
            timestamp: '2024-01-15T12:30:00',
        },
        {
            id: 2,
            title: 'Meeting Reminder',
            message: 'Reminder: Team meeting at 2:00 PM.',
            timestamp: '2024-01-16T14:00:00',
        },
    ];

    const pageTitle = 'Notifications';

    return (
        <Layout pageTitle={pageTitle}>
            <NotificationsList notifs={dummyNotifications} />
        </Layout>
    );
};

export default NotificationsPage;

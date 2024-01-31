import React, { useEffect, useState } from 'react';
import '../styles/NotificationsList.css';
import { IonList, IonCard, IonCardContent, IonListHeader, IonLabel, IonItem, IonText } from '@ionic/react';
import { PushNotificationSchema, PushNotifications, Token, ActionPerformed } from '@capacitor/push-notifications';
import { Toast } from '@capacitor/toast';

interface Notification {
    id: number;
    title: string;
    message: string;
    timestamp: string;
}

interface NotificationsListProps {
    notifs: Notification[];
}

const NotificationsList: React.FC<NotificationsListProps> = ({ notifs }) => {
    const nullEntry: any[] = []
    const [notifications, setnotifications] = useState(nullEntry);

    useEffect(() => {
        // PushNotifications.checkPermissions().then((res) => {
        //     if (res.receive !== 'granted') {
        //         PushNotifications.requestPermissions().then((res) => {
        //             if (res.receive === 'denied') {
        //                 showToast('Push Notification permission denied');
        //             }
        //             else {
        //                 showToast('Push Notification permission granted');
        //                 register();
        //             }
        //         });
        //     }
        //     else {
        //         register();
        //     }
        // });
    }, [])

    const register = () => {
        console.log('Initializing HomePage');

        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();

        // On success, we should be able to receive notifications
        PushNotifications.addListener('registration',
            (token: Token) => {
                showToast('Push registration success');
            }
        );

        // Some issue with our setup and push will not work
        PushNotifications.addListener('registrationError',
            (error: any) => {
                alert('Error on registration: ' + JSON.stringify(error));
            }
        );

        // Show us the notification payload if the app is open on our device
        PushNotifications.addListener('pushNotificationReceived',
            (notification: PushNotificationSchema) => {
                setnotifications(notifications => [...notifications, { id: notification.id, title: notification.title, body: notification.body, type: 'foreground' }])
            }
        );

        // Method called when tapping on a notification
        PushNotifications.addListener('pushNotificationActionPerformed',
            (notification: ActionPerformed) => {
                setnotifications(notifications => [...notifications, { id: notification.notification.data.id, title: notification.notification.data.title, body: notification.notification.data.body, type: 'action' }])
            }
        );
    }

    const showToast = async (msg: string) => {
        await Toast.show({
            text: msg
        })
    }
    return (
        <div className="notifications-container">
            {/* <h2>Notifications</h2>
            <ul className="notification-list">
                {notifications.map((notification, index) => (
                    <li key={index} className="notification-item">
                        <strong className="notification-title">{notification.title}</strong>
                        <p className="notification-message">{notification.message}</p>
                        <small className="notification-timestamp">{notification.timestamp}</small>
                    </li>
                ))}
            </ul> */}
            {/* <div>
                <IonList>
                    <IonCard>
                        <IonCardContent>
                            1. Register for Push by clicking the footer button.<br></br>
                            2. Once registered, you can send push from the Firebase console. <br></br>
                            <a>Check documentation</a><br></br>
                            3. Once your app receives notifications, you` ll see the data here in the list
                        </IonCardContent>
                    </IonCard>
                </IonList>
            </div> */}
            <IonListHeader mode="ios" lines="full">
                <IonLabel>Notifications</IonLabel>
            </IonListHeader>
            {notifs.length !== 0 &&
                <IonList>
                    {notifs.map((notif: Notification) =>
                        <IonItem key={notif.id}>
                            <IonLabel>
                                <IonText>
                                    <h3 className="notif-title">{notif.title}</h3>
                                </IonText>
                                <p>{notif.message}</p>
                            </IonLabel>
                        </IonItem>
                    )}
                </IonList>}
        </div>
    );
};

export default NotificationsList;

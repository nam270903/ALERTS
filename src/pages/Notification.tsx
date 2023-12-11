import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle, 
    IonContent,
    IonButton,
    IonButtons,
    IonMenuButton,
    IonList,
    IonLabel,
    IonItem, 
    IonInfiniteScroll,
    IonInfiniteScrollContent
} from '@ionic/react'
import '@capacitor/push-notifications'
import React, {useEffect, useState} from 'react'
import sendTelegramNotification from '../components/TelegramNoti'

const Notification: React.FC = () => {
    const handleSendNotification = () => {
        sendTelegramNotification('This is where they attack us');
      };
    
    const [items, setItems] = useState<string[]>([]);
    
    const generateItems = () => {
        const newItems = [];
        for (let i = 0; i < 51; i++) {
            newItems.push(`Item ${1 + items.length + i}`);
        }
        setItems([...items, ...newItems]);
    };

    useEffect(() => {
        generateItems();
      }, []);

    return (
        <IonPage>

            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle>Notifications</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent class='ion-text-center' >
                <div>
                    <h1>ALERTS!</h1>
                <IonButton onClick={handleSendNotification}>Send me to Application</IonButton>
                </div>

                <IonList>
                    {items.map((item, index) => (
                        <IonItem key={item}>
                            <IonLabel>{item}</IonLabel>
                        </IonItem>
                    ))}
                </IonList>

                <IonInfiniteScroll>
                    <IonInfiniteScrollContent loadingText="Please wait..." loadingSpinner="bubbles"></IonInfiniteScrollContent>
                </IonInfiniteScroll>
            </IonContent>

        </IonPage>
    )
}

export default Notification
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

const NotificationItem: React.FC<{ item: string; onClick: () => void }> = ({ item, onClick }) => {
    return (
      <IonItem button onClick={onClick}>
        <IonLabel>{item}</IonLabel>
      </IonItem>
    );
  };
  
  const Notification: React.FC = () => {
    const [items, setItems] = useState<string[]>([]);
  
    const generateItems = () => {
      const newItems = [];
      for (let i = 0; i < 51; i++) {
        newItems.push(`Item ${1 + items.length + i}`);
      }
      setItems([...items, ...newItems]);
    };
  
    const handleSendNotification = (item: string) => {
      sendTelegramNotification(`${item}`);
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
  
        <IonContent class='ion-text-center'>
          <div>
            <h1>ALERTS!</h1>
          </div>
  
          <IonList>
            {items.map((item, index) => (
              <NotificationItem key={item} item={item} onClick={() => handleSendNotification(item)} />
            ))}
          </IonList>
  
          <IonInfiniteScroll>
            <IonInfiniteScrollContent loadingText='Please wait...' loadingSpinner='bubbles'></IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Notification;
  
import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonList,
  IonLabel,
  IonItem,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/react';
import '@capacitor/push-notifications';
import sendTelegramNotification from '../components/TelegramNoti';

const NotificationItem: React.FC<{ item: string; onClick: () => void; hasNewNotification: boolean }> = ({ item, onClick, hasNewNotification }) => {
 
    return (
    <IonItem button onClick={onClick}>
      
      <IonLabel>{item}</IonLabel>
      
      {hasNewNotification && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: '8px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'blue' }}></div>
        </div>
      )}
    </IonItem>
  );
};

const Notification: React.FC = () => {
  const [items, setItems] = useState<{ text: string; hasNewNotification: boolean }[]>([]);

  const generateItems = () => {
    const newItems = [];
    for (let i = 0; i < 5; i++) {
      newItems.push({ text: `Item ${1 + items.length + i}`, hasNewNotification: true });
    }
    setItems([...items, ...newItems]);
  };

  const handleSendNotification = (item: { text: string; hasNewNotification: boolean }) => {
    sendTelegramNotification(`${item.text}`);
  };

  const handleItemClick = (index: number) => {
    const updatedItems = [...items];
    updatedItems[index].hasNewNotification = false;
    setItems(updatedItems);
  };

  const doRefresh = (event: CustomEvent) => {
    setTimeout(() => {
      const newItems = [];
      for (let i = 0; i < 5; i++) {
        newItems.push({ text: `Item ${1 + items.length + i}`, hasNewNotification: true });
      }

      setItems([...newItems, ...items]);
      event.detail.complete(); // Hide the refresher
    }, 1000);
  };

  useEffect(() => {
    generateItems();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Notifications</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent class="ion-text-center">
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent refreshingSpinner="circular" color="primary"></IonRefresherContent>
        </IonRefresher>

        <div>
          <h1>ALERTS!</h1>
        </div>

        <IonList>
          {items.map((item, index) => (
            <NotificationItem
              key={item.text}
              item={item.text}
              hasNewNotification={item.hasNewNotification}
              onClick={() => {
                handleItemClick(index);
                handleSendNotification(item);
              }}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Notification;

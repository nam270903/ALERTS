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

  const fetchAlerts = async () => {
    try {
      const response = await fetch('https://chouette.doclai.com/alerts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + btoa('nam-vu-tue:QtsUj9My:SvZ3R5'),
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched alerts:', data);
        setItems(data.map((alert: any) => ({ text: alert.message, hasNewNotification: true })));
      } else {
        console.error('Failed to fetch alerts:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  const handleItemClick = (index: number) => {
    const updatedItems = [...items];
    updatedItems[index].hasNewNotification = false;
    setItems(updatedItems);
  };

  const doRefresh = (event: CustomEvent) => {
    setTimeout(() => {
      fetchAlerts();
      event.detail.complete();
    }, 1000);
  };

  useEffect(() => {
    fetchAlerts(); 
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
              onClick={() => handleItemClick(index)}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Notification;
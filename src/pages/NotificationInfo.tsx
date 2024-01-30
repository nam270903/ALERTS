import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonLabel } from '@ionic/react';
import { useLocation } from 'react-router-dom';

const NotificationInfo: React.FC = () => {
  const location = useLocation();
  const data: any = (location.state as any)?.data;

  if (!data) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonBackButton defaultHref='/Notification'/>
            </IonButtons>
            <IonTitle>Notification Information</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <p>Data not available</p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/Notification'/>
          </IonButtons>
          <IonTitle>Notification Information</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardContent style={{ overflow: 'auto' }}>
            <IonLabel>
              <h1 className='ion-text-center'>Notification Information</h1>
              <IonGrid>
                <IonRow>
                  <IonCol size="6">
                    <p><strong>Level:</strong></p>
                  </IonCol>
                  <IonCol size="6">
                    <p>{data.level}</p>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="6">
                    <p><strong>Agent ID:</strong></p>
                  </IonCol>
                  <IonCol size="6">
                    <p>{data.agentId}</p>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="6">
                    <p><strong>Agent name:</strong></p>
                  </IonCol>
                  <IonCol size="6">
                    <p>{data.name}</p>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="6">
                    <p><strong>IP address:</strong></p>
                  </IonCol>
                  <IonCol size="6">
                    <p>{data.ip}</p>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="6">
                    <p><strong>Timestamp:</strong></p>
                  </IonCol>
                  <IonCol size="6">
                    <p>{data.timestamp}</p>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="6">
                    <p><strong>Location:</strong></p>
                  </IonCol>
                  <IonCol size="6">
                    <p>{data.location}</p>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="6">
                    <p><strong>Full Log:</strong></p>
                  </IonCol>
                  <IonCol size="6">
                    <p>{data.fullLog}</p>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="6">
                    <p><strong>Description:</strong></p>
                  </IonCol>
                  <IonCol size="6">
                    <p>{data.description}</p>
                  </IonCol>
                </IonRow>

              </IonGrid>
            </IonLabel>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default NotificationInfo;

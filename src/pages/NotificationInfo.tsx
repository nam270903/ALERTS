import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonLabel,
    IonRow,
    IonCol,
    IonGrid,
    IonButtons,
    IonBackButton
  } from '@ionic/react';
  import React, { useState, useEffect } from 'react';
  import { useLocation, useHistory, useParams } from 'react-router-dom';
  import { Hit } from './Notification';

  
  const NotificationInfo: React.FC = () => {
    const location = useLocation();
    const data: Hit = (location.state as any)?.data;
  
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
                  <p><strong>AgentID:</strong></p>
                </IonCol>
                <IonCol size="6">
                  <p>{data._source.agent.id}</p>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">
                  <p><strong>Timestamp:</strong></p>
                </IonCol>
                <IonCol size="6">
                  <p>{data._source.timestamp}</p>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">
                  <p><strong>Full Log:</strong></p>
                </IonCol>
                <IonCol size="6">
                  <p>{data._source.full_log}</p>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">
                  <p><strong>Description:</strong></p>
                </IonCol>
                <IonCol size="6">
                  <p>{data._source.rule.description}</p>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">
                  <p><strong>Level:</strong></p>
                </IonCol>
                <IonCol size="6">
                  <p>{data._source.rule.level}</p>
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
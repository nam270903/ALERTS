import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle, 
    IonContent,
    IonButton,
    IonButtons,
    IonMenuButton
} from '@ionic/react'
import '@capacitor/push-notifications'
import React, {useEffect, useState} from 'react'
import sendTelegramNotification from '../components/TelegramNoti'

const Notification: React.FC = () => {
    const handleSendNotification = () => {
        sendTelegramNotification('This is where they attack us');
      };
    
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
            <IonContent className='ion-padding'>
                <div className="ion-padding">
                    <h2>Alerts!</h2>
                <IonButton onClick={handleSendNotification}>Send me to Application</IonButton>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Notification
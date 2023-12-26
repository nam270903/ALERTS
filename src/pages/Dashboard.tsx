import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle, 
    IonContent,
    IonButtons,
    IonButton,
    IonMenuButton
} from '@ionic/react'

const Dashboard: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonButtons slot='start'>
                        <IonMenuButton></IonMenuButton>
                </IonButtons>
                <IonTitle>Dashboard</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'></IonContent>
        </IonPage>
    )
}

export default Dashboard
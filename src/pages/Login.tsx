import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle, 
    IonContent,
    useIonRouter,
    IonButton
} from '@ionic/react'

const Login: React.FC = () => {
    const navigation = useIonRouter();

    const doLogin = () => {
        navigation.push('/app', 'forward','push' );
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                <IonButton onClick={() => doLogin()} expand='full'>
                    Log in 
                </IonButton>
            </IonContent>
        </IonPage>
    )
}

export default Login
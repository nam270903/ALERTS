import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonLabel,
  IonItem,
  IonIcon,
  useIonRouter,
  IonAlert,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { eye, eyeOff } from 'ionicons/icons';
import { useState } from 'react';
import './Login.css';
import Logo from './ALERTS.png'

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  
  const doLogin = () => {
    const form = new FormData();
    form.append("username", username);
    form.append("password", password);
    const options: RequestInit = {
      method: 'POST',
      redirect: 'follow',
      body:form
    };
    try {
      fetch('https://chouette.doclai.com/login', options)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.token) {
            navigation.push('/app/Notification', 'forward', 'push');
            console.log('User successfully logged in!');
            setAuthenticated(true);
          } else {
            console.log('Invalid username or password');
            setShowAlert(true);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    
    <IonPage>
      <IonContent>
      <IonGrid className='ion-no-padding login-container'>
        <IonRow className='ion-justify-content-center ion-align-items-center'>
            <div className='logo-box'>
              <img src={Logo} alt='My Logo' />
            </div>
          
            <IonCol size='12' size-md='8' size-lg='6' className='ion-text-center'>
            <div className='dark-overlay ion-padding'>
              <h1>ALERTS</h1>
              </div>

            <div className='login-box'>
              <IonItem>
                <IonLabel position='floating'>Username</IonLabel>
                <IonInput
                  className='login-input' 
                  type='text' 
                  value={username} 
                  onIonChange={(e) => setUsername(e.detail.value!)} />
              </IonItem>

              <IonItem>
                <IonLabel position='floating'>Password</IonLabel>
                <IonInput 
                  type={showPassword ? 'text' : 'password'} 
                  value={password} 
                  onIonChange={(e) => setPassword(e.detail.value!)} />

                <IonButton slot='end' onClick={() => setShowPassword(!showPassword)}>
                  <IonIcon icon={showPassword ? eye : eyeOff} />
                </IonButton>
              </IonItem>

              <div style={{ marginTop: '10px' }}>
                <IonButton onClick={doLogin} color='primary' style={{ color: '#000000', width:'100%' }}>
                  Log in
                </IonButton>
              </div>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Invalid Password'}
          message={'Please enter a valid password.'}
          buttons={['OK']}
          cssClass={"custom-alert"}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
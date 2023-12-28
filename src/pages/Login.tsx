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
const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const doLogin = () => {
    // Mock authentication logic for testing purposes
    if (username === '1' && password === '1') {
      console.log('Login successful!');
      // If login is successful, navigate to Notification
      navigation.push('/app', 'forward', 'push');
    } else {
      console.log('Invalid username or password');
      // Show alert for incorrect password
      setShowAlert(true);
    }
  };

  return (
    <IonPage>

      <IonContent>
      <IonGrid className='ion-no-padding login-container'>
        <IonRow>
          <IonCol size='12' size-md='8' size-lg='6'>
            <div className='app-name-box'>
              <h1>ALERTS</h1>
            </div>

            <div className='login-box'>
              <IonItem>
                <IonLabel position='floating'>Username</IonLabel>
                <IonInput type='text' value={username} onIonChange={(e) => setUsername(e.detail.value!)} />
              </IonItem>

              <IonItem>
                <IonLabel position='floating'>Password</IonLabel>
                <IonInput type={showPassword ? 'text' : 'password'} value={password} onIonChange={(e) => setPassword(e.detail.value!)} />

                <IonButton slot='end' onClick={() => setShowPassword(!showPassword)}>
                  <IonIcon icon={showPassword ? eye : eyeOff} />
                </IonButton>
              </IonItem>

              <div style={{ marginTop: '10px' }}>
                <IonButton onClick={doLogin} color='primary' style={{ color: '#000000' }}>
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
/>
      </IonContent>
    </IonPage>
  );
};

export default Login;

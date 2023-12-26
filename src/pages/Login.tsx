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
  } from '@ionic/react';
  import { eye, eyeOff } from 'ionicons/icons';
  import { useState } from 'react';
  
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

        <IonHeader>
          <IonToolbar>
            <IonTitle className='ion-text-center'>Log in</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent className='ion-padding ion-text-center'>
          
          <IonItem>
            <IonLabel position='floating'>Username</IonLabel>
            <IonInput type='text' value={username} onIonChange={(e) => setUsername(e.detail.value!)} />
          </IonItem>
          
          <IonItem className='ion-align-items-center'>
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
  
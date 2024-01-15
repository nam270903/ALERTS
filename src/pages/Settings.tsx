import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenuButton,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonInput,
  IonButton,
  IonAlert,
  IonIcon,
  IonToggle,
  IonListHeader,
  IonList,
  IonItem
} from '@ionic/react';
import LogoutAlert from './LogoutAlert';
import { logOutOutline } from 'ionicons/icons';
import type { ToggleCustomEvent } from '@ionic/react';
import './Settings.css';
import '../main.css'


const Settings: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [savedPhoneNumber, setSavedPhoneNumber] = useState('');
  const [showAlert, setShowAlert] = useState(false);
<<<<<<< Updated upstream
  const [inputSectionVisible, setInputSectionVisible] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
=======
  const [isEditing, setIsEditing] = useState(false);

  const formatPhoneNumber = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');

    const formattedValue = numericValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

    return formattedValue;
  };
>>>>>>> Stashed changes

  const handlePhoneNumberChange = (event: any) => {
    const value = formatPhoneNumber(event.detail.value);
    setPhoneNumber(value);
  };

  const handleSave = () => {
    const isValidPhoneNumber =  /^\d{3}-\d{3}-\d{4}$/.test(phoneNumber);

    if (!isValidPhoneNumber) {
      setShowAlert(true);
    } else {
      setSavedPhoneNumber(phoneNumber);
      setPhoneNumber('');
      setIsEditing(false);
    }
  };

  const handleUpdate = () => {
    setIsEditing(true);
  };

  const handleLogout = () => {
    setShowLogoutAlert(true);
  };

  const confirmLogout = () => {
    console.log('User has been logged out.');
    setShowLogoutAlert(false);
  };

  const [themeToggle, setThemeToggle] = useState(false);

  const toggleChange = (ev: ToggleCustomEvent) => {
    toggleDarkTheme(ev.detail.checked);
  };

  const toggleDarkTheme = (shouldAdd: boolean) => {
    document.body.classList.toggle('dark', shouldAdd);
  };

  const initializeDarkTheme = (isDark: boolean) => {
    setThemeToggle(isDark);
    toggleDarkTheme(isDark);
  };

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: light)');

    initializeDarkTheme(prefersDark.matches);

    prefersDark.addEventListener('change', (mediaQuery) => initializeDarkTheme(mediaQuery.matches));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot='start' />
          <IonTitle>SETTINGS</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent>
            <IonGrid>
              <IonRow className="ion-align-items-center">
                <IonCol size="4">
                  <IonLabel>IT Desk Helper Number:</IonLabel>
                </IonCol>
                <IonCol size="5">
                  {isEditing ? (
                    <IonInput
                      type="tel"
                      placeholder="Enter phone number"
                      value={phoneNumber}
                      onIonChange={handlePhoneNumberChange}
                    />
                  ) : (
                    <IonLabel>{savedPhoneNumber}</IonLabel>
                  )}
                </IonCol>

                <IonCol size="3">
                  {isEditing ? (
                    <IonButton onClick={handleSave} color="primary" fill="solid">
                      Save
                    </IonButton>
                  ) : (
                    <IonButton onClick={handleUpdate} color="primary" fill="solid">
                      Update
                    </IonButton>
                  )}
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Invalid Number"
          subHeader="Please enter a valid phone number."
          message="Make sure the phone number has 10 digits and contains only numbers."
          buttons={[
            {
              text:'OK',
              cssClass: 'custom-alert'
            }
          ]}
        />
      </IonContent>

      <IonContent className="ion-padding ion-margin-top">
        <IonCard>
          <IonCardContent>
            <IonGrid>
              <IonList inset={true}>
                <IonItem>
                  <IonToggle checked={themeToggle} onIonChange={toggleChange} justify="space-between">Dark Mode</IonToggle>
                </IonItem>
              </IonList>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>


      <IonButton onClick={handleLogout} expand="full">
        <IonIcon icon={logOutOutline} slot="start" />
          Sign out
        </IonButton>

      <LogoutAlert
        isOpen={showLogoutAlert}
        onDidDismiss={() => setShowLogoutAlert(false)}
        onLogoutConfirmed={confirmLogout}/>
    </IonPage>
  );
};

export default Settings;
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes

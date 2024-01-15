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
  const [displayedPhoneNumber, setDisplayedPhoneNumber] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [inputSectionVisible, setInputSectionVisible] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const handlePhoneNumberChange = (event: any) => {
    const value = event.detail.value.replace(/[^0-9]/g, '');
    setPhoneNumber(value);
  };

  const handleCheckPhoneNumber = () => {
    const isValidPhoneNumber = /^\d{10}$/.test(phoneNumber);

    if (!isValidPhoneNumber) {
      setShowAlert(true);
    } else {
      setDisplayedPhoneNumber(phoneNumber);
      setPhoneNumber('');
      setInputSectionVisible(false);
    }
  };

  const handleSavePhoneNumber = () => {
    setInputSectionVisible(true);
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
              {inputSectionVisible && (
                <IonRow>
                  <IonCol size="8">
                    <IonLabel position="stacked">New Number</IonLabel>
                    <IonInput
                      type="tel"
                      value={phoneNumber}
                      onIonChange={handlePhoneNumberChange}
                    />
                  </IonCol>
                  <IonCol size="4" className="ion-text-center">
                    <IonButton onClick={handleCheckPhoneNumber} color="primary" fill="solid">
                      Save
                    </IonButton>
                  </IonCol>
                </IonRow>
              )}

              {displayedPhoneNumber && !inputSectionVisible && (
                <IonRow className="ion-margin-top">
                  <IonCol>
                    <IonLabel>IT Desk Helper Number: </IonLabel>
                    <IonLabel>{displayedPhoneNumber}</IonLabel>
                  </IonCol>
                </IonRow>
              )}

              <IonRow className="ion-margin-top">
                <IonCol>
                  <IonButton onClick={handleSavePhoneNumber} color="primary" fill="solid">
                    Update
                  </IonButton>
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
          buttons={['OK']}
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

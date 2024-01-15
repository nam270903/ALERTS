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

  // Listen for the toggle check/uncheck to toggle the dark theme
  const toggleChange = (ev: ToggleCustomEvent) => {
    toggleDarkTheme(ev.detail.checked);
  };

  // Add or remove the "dark" class on the document body
  const toggleDarkTheme = (shouldAdd: boolean) => {
    document.body.classList.toggle('dark', shouldAdd);
  };

  // Check/uncheck the toggle and update the theme based on isDark
  const initializeDarkTheme = (isDark: boolean) => {
    setThemeToggle(isDark);
    toggleDarkTheme(isDark);
  };

  useEffect(() => {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: light)');

    // Initialize the dark theme based on the initial
    // value of the prefers-color-scheme media query
    initializeDarkTheme(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
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


      <IonButton className='ion-button'>
        Sign out
      </IonButton>

      <LogoutAlert
        isOpen={showLogoutAlert}
        onDidDismiss={() => setShowLogoutAlert(false)}
        onLogoutConfirmed={confirmLogout}
      />
    </IonPage>
  );
};

export default Settings;

import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenuButton,
  IonButton,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonInput,
  IonAlert,
  IonIcon,
  IonToggle,
  IonList,
} from '@ionic/react';
import LogoutAlert from './LogoutAlert';
import { logOutOutline, callOutline } from 'ionicons/icons';
import '../main.css';

const Settings: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [savedPhoneNumber, setSavedPhoneNumber] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [inputSectionVisible, setInputSectionVisible] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [themeToggle, setThemeToggle] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const formatPhoneNumber = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    const formattedValue = numericValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    return formattedValue;
  };

  const handlePhoneNumberChange = (event: any) => {
    const value = formatPhoneNumber(event.detail.value);
    setPhoneNumber(value);
  };

  const handleSave = () => {
    const isValidPhoneNumber = /^\d{3}-\d{3}-\d{4}$/.test(phoneNumber);

    if (!isValidPhoneNumber) {
      setShowAlert(true);
    } else {
      setSavedPhoneNumber(phoneNumber);
      setPhoneNumber('');
      setIsEditing(false);
    }
  };

  const handlePhoneNumberClick = () => {
    if (!isEditing && savedPhoneNumber) {
      const phoneNumberWithoutDashes = savedPhoneNumber.replace(/-/g, '');
      const telLink = `tel:${phoneNumberWithoutDashes}`;
      window.location.href = telLink;
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

  const toggleChange = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.body.classList.toggle('dark', newDarkMode);
  };

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    const updateDarkMode = () => {
      const newDarkMode = prefersDark.matches;
      setIsDarkMode(newDarkMode);
      document.body.classList.toggle('dark', newDarkMode);
    };

    updateDarkMode();

    const mediaQueryListener = () => {
      updateDarkMode();
    };

    prefersDark.addEventListener('change', mediaQueryListener);

    return () => {
      prefersDark.removeEventListener('change', mediaQueryListener);
    };
  }, []);

  const handleCall = () => {
    if (savedPhoneNumber) {
      const phoneNumberWithoutDashes = savedPhoneNumber.replace(/-/g, '');
      const telLink = `tel:${phoneNumberWithoutDashes}`;
      window.location.href = telLink;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle>SETTINGS</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent className="ion-text-center">
            <IonGrid>
              <IonRow className="ion-align-items-center">
                <IonCol size="4">
                  <IonLabel>IT Desk Helper Number:</IonLabel>
                </IonCol>
                <IonCol
                size="5"
                onClick={handlePhoneNumberClick}
                style={{ cursor: isEditing ? 'auto' : 'pointer' }}
                >
                  {isEditing ? (
                    <IonInput
                      type="tel"
                      placeholder="Enter phone number"
                      value={phoneNumber}
                      onIonChange={handlePhoneNumberChange}
                    />
                  ) : (
                    <div className="ion-align-items-center">
                      <IonLabel className="phone-number-label">{savedPhoneNumber}</IonLabel>
                    </div>
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

        <IonCard>
          <IonCardContent className="ion-text-center">
            <IonGrid>
              <IonRow className="ion-align-items-center">
                <IonCol size="4" className="ion-text-center">
                  <IonLabel>Dark Mode</IonLabel>
                </IonCol>
                <IonCol size="7" className="ion-text-right">
                  <IonList inset={true} className="toggle-list">
                    <IonToggle
                      checked={isDarkMode}
                      onIonChange={toggleChange}
                      justify="space-between"
                      className="dark-mode-toggle"
                    />
                  </IonList>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        <IonButton onClick={handleLogout} expand="full">
          <IonIcon icon={logOutOutline} slot="start" />
          Sign out
        </IonButton>

        <LogoutAlert
          isOpen={showLogoutAlert}
          onDidDismiss={() => setShowLogoutAlert(false)}
          onLogoutConfirmed={confirmLogout}
        />

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Invalid Number"
          subHeader="Please enter a valid phone number."
          message="Make sure the phone number has 10 digits and contains only numbers."
          buttons={[
            {
              text: 'OK',
              cssClass: 'custom-alert',
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Settings;

import React, { useState, useEffect } from 'react';
import { IonAlert } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Login.css';

interface LogoutAlertProps {
  isOpen: boolean;
  onDidDismiss: () => void;
  onLogoutConfirmed: () => void;
}

const LogoutAlert: React.FC<LogoutAlertProps> = ({ isOpen, onDidDismiss, onLogoutConfirmed }) => {
  const history = useHistory();
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  useEffect(() => {
    if (redirectToLogin) { 
      history.push('');   
    }
  }, [redirectToLogin, history]);

  const handleLogoutConfirmed = () => {
    onLogoutConfirmed();
    setRedirectToLogin(true);
  };

  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onDidDismiss}
      header={'Confirm Logout'}
      message={'Are you sure you want to sign out?'}
      buttons={[
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'custom-alert',
          handler: onDidDismiss,
        },
        {
          text: 'OK',
          cssClass: 'custom-alert',
          handler: handleLogoutConfirmed,
        },
      ]}
    />
  );
};

export default LogoutAlert;

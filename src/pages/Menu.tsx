import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSplitPane,
  IonMenu,
  IonRouterOutlet,
  IonMenuToggle,
  IonItem,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { Redirect, Route } from 'react-router';
import { notificationsOutline, appsOutline, logOutOutline } from 'ionicons/icons';  // Import the necessary Ionicons
import { useState } from 'react';

import Notification from './Notification';
import Dashboard from './Dashboard';
import AgentInfo from './AgentInfo';
import NotificationInfo from './NotificationInfo';
import LogoutAlert from './LogoutAlert';

const Menu: React.FC = () => {
  const paths = [
    { name: 'Notification', url: '/app/Notification', icon: notificationsOutline },
    { name: 'Dashboard', url: '/app/Dashboard', icon: appsOutline },
  ];
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const handleLogout = () => {
    setShowLogoutAlert(true);
  };

  const confirmLogout = () => {
    console.log('User has been logged out.');
    setShowLogoutAlert(false);
  };

  return (
    <IonPage style={{ width: '100%', height: '100%' }}>
      <IonSplitPane contentId="main">
        <IonMenu side="start" contentId="main" >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent style={{ width: '100%' }}>
            {paths.map((item, index) => (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem routerLink={item.url} routerDirection="forward">
                  <IonIcon icon={item.icon} slot="start" />
                  {item.name}
                </IonItem>
              </IonMenuToggle>
            ))}

            <IonButton onClick={handleLogout} expand="full">
              <IonIcon icon={logOutOutline} slot="start" />
              Sign out
            </IonButton>

            <LogoutAlert
            isOpen={showLogoutAlert}
            onDidDismiss={() => setShowLogoutAlert(false)}
            onLogoutConfirmed={confirmLogout}
          />
          </IonContent>
        </IonMenu>

        <IonRouterOutlet id="main">
          <Route exact path="/app/Notification" component={Notification} />
          <Route exact path="/app/Dashboard" component={Dashboard} />
          <Route exact path="/app/AgentInfo" component={AgentInfo} />
          <Route exact path="/app/NotificationInfo" component={NotificationInfo} />
          <Redirect to="/app/Notification" />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonPage>
  );
};

export default Menu;

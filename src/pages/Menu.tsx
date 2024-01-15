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
import { notificationsOutline, appsOutline, settingsOutline } from 'ionicons/icons';

import Notification from './Notification';
import Dashboard from './Dashboard';
import AgentInfo from './AgentInfo';
import NotificationInfo from './NotificationInfo';
import Settings from './Settings'; 

const Menu: React.FC = () => {
  const paths = [
    { name: 'Notification', url: '/app/Notification', icon: notificationsOutline },
    { name: 'Dashboard', url: '/app/Dashboard', icon: appsOutline },
    { name: 'Settings', url: '/app/Settings', icon: settingsOutline}
  ];

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

          </IonContent>
        </IonMenu>

        <IonRouterOutlet id="main">
          <Route exact path="/app/Notification" component={Notification} />
          <Route exact path="/app/Dashboard" component={Dashboard} />
          <Route exact path="/app/AgentInfo" component={AgentInfo} />
          <Route exact path="/app/Settings" component={Settings}/>
          <Route exact path="/app/NotificationInfo" component={NotificationInfo} />
            <Redirect to="/app/Notification" />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonPage>
  );
};

export default Menu;

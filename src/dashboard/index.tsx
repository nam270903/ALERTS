import React from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar, useIonTheme } from '@ionic/react';
import { DownloadOutline, Mail, PointOfSale, PersonAdd, Traffic } from 'react-ionicons';
import Header from '../components/Header';
import StatBox from '../components/StatBox';
import LineChart from '../components/LineChart';
import GeographyChart from '../components/GeographyChart';
import BarChart from '../components/BarChart';
import ProgressCircle from '../components/ProgressCircle';
import { tokens } from '../theme/theme';
import { useIonTheme } from '@ionic/react-hooks';

const Dashboard: React.FC = () => {
  const theme = useIonTheme();
  const colors = tokens(theme);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>DASHBOARD</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid>
          {/* HEADER */}
          <IonRow className="ion-align-items-center ion-justify-content-between ion-padding">
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
            <IonCol>
              <IonButton
                expand="full"
                color="primary"
                size="default"
                shape="round"
              >
                <IonIcon icon={DownloadOutline} />
                Download Reports
              </IonButton>
            </IonCol>
          </IonRow>

          {/* GRID & CHARTS */}
          <IonRow className="ion-align-items-start ion-justify-content-between ion-padding">
            {/* ROW 1 */}
            <IonCol size="3" className={`ion-padding ion-text-center`} style={{ backgroundColor: colors.primary[400] }}>
              <StatBox
                title="12,361"
                subtitle="Emails Sent"
                progress={0.75}
                increase="+14%"
                icon={<Mail color={colors.greenAccent[600]} height="26px" width="26px" />}
              />
            </IonCol>
            {/* ... (Repeat for other StatBoxes) */}

            {/* ROW 2 */}
            <IonCol size="8" className={`ion-padding`} style={{ backgroundColor: colors.primary[400] }}>
              {/* ... (Revenue Generated and LineChart components) */}
            </IonCol>
            <IonCol size="4" className={`ion-padding`} style={{ backgroundColor: colors.primary[400], overflow: 'auto' }}>
              {/* ... (Recent Transactions) */}
            </IonCol>

            {/* ROW 3 */}
            <IonCol size="4" className={`ion-padding`} style={{ backgroundColor: colors.primary[400] }}>
              {/* ... (Campaign information) */}
            </IonCol>
            <IonCol size="4" className={`ion-padding`} style={{ backgroundColor: colors.primary[400] }}>
              {/* ... (Sales Quantity) */}
            </IonCol>
            <IonCol size="4" className={`ion-padding`} style={{ backgroundColor: colors.primary[400] }}>
              {/* ... (Geography Based Traffic) */}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;

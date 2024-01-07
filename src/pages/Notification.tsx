import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonList,
  IonLabel,
  IonItem,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/react';

interface Hit {
  _source: {
    agent: {
      id: string;
    };
    timestamp: string;
    full_log: string;
    rule: {
      description: string;
      level: number;
    };
  };
}

const NotificationItem: React.FC<{ item: string; onClick: () => void; hasNewNotification: boolean }> = ({ item, onClick, hasNewNotification }) => {
  return (
    <IonItem button onClick={onClick}>
      <IonLabel>{item}</IonLabel>
      {hasNewNotification && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: '8px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'blue' }}></div>
        </div>
      )}
    </IonItem>
  );
};

const Notification: React.FC = () => {
  const [items, setItems] = useState<{ text: string; hasNewNotification: boolean }[]>([]);
  const [jwtToken, setJwtToken] = useState<string>('');
  const [tableData, setTableData] = useState<any[]>([]);


  useEffect(() => {
    const fetchJwtToken = async () => {
      const form = new FormData();
      form.append("username", "admin");
      form.append("password", "admin");


      const options: RequestInit = {
        method: 'POST',
        redirect: 'follow',
        body:form
      };

      try {
        const response = await fetch('https://chouette.doclai.com/login', options);
        const data = await response.json();

        console.log(data);

        if (data && data.token) {
          setJwtToken(data.token);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchJwtToken();

  }, []);


  useEffect(() => {
    if (jwtToken) {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      };

      const fetchAlerts = async () => {
        try {
          const response = await fetch('https://chouette.doclai.com/auth/alerts?y=2024&m=01&d=07', options);
          const data = await response.json();
          console.log(data);
          if (data && data.hits) {
            const hits: Hit[] = data.hits.hits;

            const extractedData = hits.map((hit) => ({
              agentId: hit._source.agent.id,
              timestamp: hit._source.timestamp,
              fullLog: hit._source.full_log,
              description: hit._source.rule.description,
              level: hit._source.rule.level,
            }));
    
            setTableData(extractedData);
          }

        } catch (error) {
          console.error(error);
        }
      };


      fetchAlerts();
    }
  }, [jwtToken]);

  const handleItemClick = (index: number) => {
    const updatedItems = [...items];
    updatedItems[index].hasNewNotification = false;
    setItems(updatedItems);
  };




  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Notifications</IonTitle>
        </IonToolbar>
      </IonHeader>
Re
      <IonContent class="ion-text-center">

      <table>
          <thead>
            <tr>
              <th>Agent ID</th>
              <th>Timestamp</th>
              <th>Full Log</th>
              <th>Description</th>
              <th>Level</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => (
              <tr key={index}>
                <td>{data.agentId}</td>
                <td>{data.timestamp}</td>
                <td>{data.fullLog}</td>
                <td>{data.description}</td>
                <td>{data.level}</td>
              </tr>
            ))}
          </tbody>
        </table>


      </IonContent>
    </IonPage>
  );
};

export default Notification;
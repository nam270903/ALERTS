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
  IonItem,
  IonLabel,
  IonBadge,
  IonCard,
} from '@ionic/react';
import ReactApexChart from 'react-apexcharts';
import { NavLink, useHistory } from 'react-router-dom';

export interface Hit {
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

const Notification: React.FC = () => {
  const [jwtToken, setJwtToken] = useState<string>('');
  const [tableData, setTableData] = useState<any[]>([]);
  const [pieChartData, setPieChartData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const history = useHistory();

  const handleNotiClick = (data: Hit) => {
    console.log('Clicked noti:', data);
    history.push(`/app/NotificaionInfo`, { data });
  };

  useEffect(() => {
    const fetchJwtToken = async () => {
      const form = new FormData();
      form.append('username', 'admin');
      form.append('password', 'admin');

      const options: RequestInit = {
        method: 'POST',
        redirect: 'follow',
        body: form,
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
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      const fetchAlerts = async () => {
        try {
          const response = await fetch('https://chouette.doclai.com/auth/recent-alerts?sz=50', options);
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


  useEffect(() => {
    if (jwtToken) {
      const levelDistribution = Array(15).fill(0);

      tableData.forEach((data) => {
        levelDistribution[data.level - 1]++;
      });

      setPieChartData(levelDistribution);
    }
  }, [jwtToken, tableData]);

  const pieChartOptions = {
    labels: ['Level 1','Level 2','Level 3','Level 4','Level 5','Level 6','Level 7','Level 8','Level 9','Level 10','Level 11','Level 12','Level 13','Level 14','Level 15',],
    colors: ['#28a745','#4caf50','#66bb6a','#81c784','#a5d6a7','#c8e6c9','#e6ee9c','#ffee58','#ffd600','#ffc107','#ffb300','#ffa000','#ff8f00','#ff6f00','#ff3d00',],
  };

  const getBadgeColor = (level: number): string => {
    if (level <= 5) {
      return 'success';
    } else if (level <= 11) {
      return 'warning';
    } else {
      return 'danger'; 
    }
  };

  const getBadgeContent = (level: number): string => {
    if (level <= 5) {
      return `Level ${level}: Safe`;
    } else if (level <= 11) {
      return `Level ${level}: Warning`;
    } else {
      return `Level ${level}: Dangerous`;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>NOTIFICATIONS</IonTitle>
        </IonToolbar>
      </IonHeader>


      <IonContent class="ion-padding">
        
          <ReactApexChart options={pieChartOptions} series={pieChartData} type="donut" height={350} />

        <IonList>
          {tableData.map((data, index) => (
            <IonItem key={index} lines="full" onClick={() => handleNotiClick(data)}>
              
              <IonLabel>
                <h2 className="ion-text-primary">Agent ID: {data.agentId}</h2>
                <p>Timestamp: {data.timestamp}</p>
                <p>Full Log: {data.fullLog}</p>
                <p>Description: {data.description}</p>
              </IonLabel>

              <IonBadge color={getBadgeColor(data.level)} slot="end">
                 {getBadgeContent(data.level)}
              </IonBadge>    

            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Notification;

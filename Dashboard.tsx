import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonMenuButton,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { NavLink, useHistory } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';

export interface Agent {
  id: string;
  name: string;
  platform: string;
  status: string;
  node: string;
  ip: string;
}

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [jwtToken, setJwtToken] = useState<string>('');
  const [agents, setAgents] = useState<Agent[]>([]);
  const [activeAgents, setActiveAgents] = useState<string>('');
  const [disconnectedAgents, setDisconnectedAgents] = useState<string>('');
  const [neverConnectedAgents, setNeverConnectedAgents] = useState<string>('');
  const [pendingAgents, setPendingAgents] = useState<string>('');
  const [totalAgents, setTotalAgents] = useState<string>('');
  const [pieChartData, setPieChartData] = useState<number[]>([]);
  const filteredAgents = agents
    .filter((agent) => agent.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((agent) => statusFilter === null || agent.status === statusFilter);
  const history = useHistory();

  const handleAgentClick = (agent: Agent) => {
    console.log('Clicked agent:', agent);
    history.push(`/app/AgentInfo`, { agent });
  };

  const clearFilter = () => {
    setStatusFilter(null);
    setSearchTerm('');
  };

  const updatePieChartData = () => {
    const data = [
      parseInt(activeAgents, 10),
      parseInt(disconnectedAgents, 10),
      parseInt(neverConnectedAgents, 10),
      parseInt(pendingAgents, 10),
    ];

    console.log('Pie Chart Data:', data);

    setPieChartData(data);
  };

  const pieChartOptions = {
    labels: ['Active', 'Disconnected', 'Never Connected', 'Pending'],
    colors: ['#28a745', '#dc3545', '#ffc107', '#007bff'],
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

        console.log('Login Response:', data);

        if (data && data.token) {
          setJwtToken(data.token);
        }
      } catch (error) {
        console.error('Login Error:', error);
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

      const listAgents = async () => {
        try {
          const response = await fetch('https://chouette.doclai.com/auth/agents', options);
          const data = await response.json();

          console.log('API Response:', data);

          const extractedAgents: Agent[] = data.data.affected_items.map((item: any) => ({
            id: item.id,
            name: item.name,
            ip: item.ip,
            platform: item.os.platform,
            status: item.status,
            node: item.node_name,
          }));

          console.log('Extracted Agents:', extractedAgents);

          setAgents(extractedAgents);
          
        } catch (error) {
          console.error('List Agents Error:', error);
        }
      };

      const agentsStatus = async () => {
        try {
          const response = await fetch('https://chouette.doclai.com/auth/agents/summary/status', options);
          const data = await response.json();

          console.log('Agents Status Response:', data);

          if (data && data.data) {
            setActiveAgents(data.data.connection.active);
            setNeverConnectedAgents(data.data.connection.never_connected);
            setDisconnectedAgents(data.data.connection.disconnected);
            setPendingAgents(data.data.connection.pending);
            setTotalAgents(data.data.connection.total);
          }
        } catch (error) {
          console.error('Agents Status Error:', error);
        }
      };

      listAgents();
      agentsStatus();
    }
  }, [jwtToken]);

  useEffect(() => {
    updatePieChartData();
  }, [activeAgents, disconnectedAgents, neverConnectedAgents, pendingAgents]);


  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton/>
          </IonButtons>
          <IonTitle>DASHBOARD</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid className="ion-text-center">
          <IonRow>
            <IonCol>
              <h1>Agent List</h1>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonCard>
          <IonCardContent>
            <ReactApexChart
              options={pieChartOptions}
              series={pieChartData}
              type="donut"
              height={350}
            />
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonLabel>Active:</IonLabel>
                  <IonBadge color="success">{activeAgents}</IonBadge>
                </IonCol>
                <IonCol>
                  <IonLabel>Disconnected:</IonLabel>
                  <IonBadge color="danger">{disconnectedAgents}</IonBadge>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonLabel>Never Connected</IonLabel>
                  <IonBadge color="warning">{neverConnectedAgents}</IonBadge>
                </IonCol>
                <IonCol>
                  <IonLabel>Pending:</IonLabel>
                  <IonBadge color="primary">{pendingAgents}</IonBadge>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonLabel>Total Agents:</IonLabel>
                  <IonBadge color="dark">{totalAgents}</IonBadge>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        <IonGrid className="search-and-filter">
          <IonRow>
            <IonCol size="8">
              <IonSearchbar
                value={searchTerm}
                onIonChange={(e) => setSearchTerm(e.detail.value!)}
              ></IonSearchbar>
            </IonCol>
            <IonCol size="4" className="ion-text-end">
              <IonSelect
                value={statusFilter}
                placeholder="Filter"
                onIonChange={(e) => setStatusFilter(e.detail.value)}
                className="status-filter"
              >
                <IonSelectOption value="active">Active</IonSelectOption>
                <IonSelectOption value="disconnected">Disconnected</IonSelectOption>
                <IonSelectOption value="pending">Pending</IonSelectOption>
                <IonSelectOption value="never_connected">Never Connected</IonSelectOption>
              </IonSelect>

              <IonButton onClick={clearFilter}>Clear Filter</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonList>
          {filteredAgents.map((agent) => (
            <IonItem key={agent.id} onClick={() => handleAgentClick(agent)}>
              <IonLabel>
                <h2>{agent.name}</h2>
                <p>ID: {agent.id}</p>
                <p>IP Address: {agent.ip}</p>
                <p>Platform: {agent.platform}</p>
                <p>Cluster Node: {agent.node}</p>
              </IonLabel>

              <IonBadge
                color={
                  agent.status === 'active'
                    ? 'success'
                    : agent.status === 'disconnected'
                    ? 'danger'
                    : 'warning'
                }
              >
                {agent.status === 'active'
                  ? 'Active'
                  : agent.status === 'disconnected'
                  ? 'Disconnect'
                  : 'N'}
              </IonBadge>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;

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
  IonIcon,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { useHistory } from 'react-router-dom';



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
  const [activeAgents, setactiveAgents] = useState<string>('');
  const [disconectedAgents, setdisconectedAgents] = useState<string>('');
  const [neverconnectedAgents, setneverconnectedgents] = useState<string>('');
  const [pendingAgents, setpendingAgents] = useState<string>('');
  const [totalAgents, settotalAgents] = useState<string>('');

  const history = useHistory();

  const handleAgentClick = (agent: Agent) => {
    console.log('Clicked agent:', agent);
    // Navigate to AgentInfo page and pass agent details as URL parameters
    history.push(`/AgentInfo`,{agent}); {


    };
  };

  const filteredAgents = agents
  .filter((agent) => agent.name.toLowerCase().includes(searchTerm.toLowerCase()))
  .filter((agent) => statusFilter === null || agent.status === statusFilter);

  const clearFilter = () => {
    setStatusFilter(null);
    setSearchTerm('');
  };

  useEffect(() => {
    // Simulating fetching JWT token (replace this with your actual logic)
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

      const ListAgents = async () => {
        try {
          const response = await fetch('https://chouette.doclai.com/auth/agents', options);
          const data = await response.json();
          console.log(data);
          const extractedAgents: Agent[] = data.data.affected_items.map((item: any) => ({
            id: item.id,
            name: item.name,
            ip: item.ip,
            platform: item.os.platform,
            status: item.status,
            node: item.node_name
          }));
  
          setAgents(extractedAgents);
        } catch (error) {
          console.error(error);
        }
      };

      const AgentsStatus = async () => {
        try {
          const response = await fetch('https://chouette.doclai.com/auth/agents/summary/status', options);
          const data = await response.json();
          console.log(data);
          if (data && data.data) {
            setactiveAgents(data.data.connection.active);
            setneverconnectedgents(data.data.connection.never_connected);
            setdisconectedAgents(data.data.connection.disconnected);
            setpendingAgents(data.data.connection.pending);
            settotalAgents(data.data.connection.total);
          }


        } catch (error) {
          console.error(error);
        }
      }

      ListAgents();
      AgentsStatus();
    }
  }, [jwtToken]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Dashboard</IonTitle>
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
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonLabel>Active:</IonLabel>
                  <IonBadge color="success">{activeAgents}</IonBadge>
                </IonCol>
                <IonCol>
                  <IonLabel>Disconnected:</IonLabel>
                  <IonBadge color="danger">{disconectedAgents}</IonBadge>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonLabel>Never Connected</IonLabel>
                  <IonBadge color="warning">{neverconnectedAgents}</IonBadge>
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
                placeholder="Filter by Status"
                onIonChange={(e) => setStatusFilter(e.detail.value)}
                className="status-filter"
              >
                <IonSelectOption value="active">Active</IonSelectOption>
                <IonSelectOption value="disconnected">Disconnected</IonSelectOption>
                <IonSelectOption value="pending">Pending</IonSelectOption>
                <IonSelectOption value="never_connected">Never Connected</IonSelectOption>
              </IonSelect>

              <IonButton onClick={clearFilter}>
                  Clear Filter
                </IonButton>

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
                <p>Status: {agent.status}</p>
              </IonLabel>

              <IonBadge color={agent.status === 'active' ? 'success' : agent.status === 'disconnected' ? 'danger' : 'warning'}>
                {agent.status === 'active' ? 'Active' : agent.status === 'disconnected' ? 'Disconnect' : 'N'}
              </IonBadge>

            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
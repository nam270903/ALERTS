import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle, 
    IonContent,
    IonButtons,
    IonButton,
    IonMenuButton
} from '@ionic/react'
import { options } from 'ionicons/icons';
import React, { useState, useEffect } from 'react'

interface Agent{
    id: string;
    name: string;
    platform: string;
    status: string;
    node:string;
    ip: string;
}

const Dashboard: React.FC = () => {

    const [jwtToken,setJwtToken] = useState<string>(''); 
    const [agents, setAgents] = useState<Agent[]>([]);
    const [activeAgents, setactiveAgents] = useState<string>('');
    const [disconectedAgents, setdisconectedAgents] = useState<string>('');
    const [neverconnectedAgents, setneverconnectedgents] = useState<string>('');
    const [pendingAgents, setpendingAgents] = useState<string>('');
    const [totalAgents, settotalAgents] = useState<string>('');

    useEffect(() => {
        const fetchJwtToken = async () => {
          const options = {
            method: 'POST',
            headers: {
              'User-Agent': 'insomnia/8.4.5',
              Authorization: 'Basic YXBpLXVzZXI6dkpwLXBzSEtMbVFOWG1TM19qN2U='
            }
          };
    
          try {
            const response = await fetch('https://chouette.doclai.com/security/user/authenticate', options);
            const data = await response.json();
    
            if (data && data.data && data.data.token) {
              setJwtToken(data.data.token);
            }
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchJwtToken();
    
      }, []);
    
      useEffect(() => {
        // Simulating fetching JWT token (replace this with your actual logic)
        const alerts = async () => {
          const options = {
            method: 'GET',
            headers: {
              'User-Agent': 'insomnia/8.4.5',
              Authorization: 'Basic YXBpLXVzZXI6dkpwLXBzSEtMbVFOWG1TM19qN2U='
            }
          };
    
          try {
            const response = await fetch('https://chouette.doclai.com/alerts?y=2023&m=12&d=27', options);
            const data = await response.json();
            console.log('Fetched Alerts:',data);
          } catch (error) {
            console.error(error);
          }
        };
    
        alerts();
    
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
              const response = await fetch('https://chouette.doclai.com/agents', options);
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
              const response = await fetch('https://chouette.doclai.com/agents/summary/status', options);
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
          </IonHeader>
          <IonContent fullscreen>
            <IonHeader collapse="condense">
            </IonHeader>
            <div>
          <h1>JWT Token:</h1>
          <p>{jwtToken}</p>
            </div>
    
            <div>
          <h1>Agent List</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>IP Address</th>
                <th>Platform</th>
                <th>Cluster Node</th>
                <th>Status</th>
    
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent.id}>
                  <td>{agent.id}  </td>
                  <td>{agent.name}  </td>
                  <td>{agent.ip}  </td>
                  <td>{agent.platform}  </td>
                  <td>{agent.node}  </td>
                  <td>{agent.status}  </td>
                </tr>
              ))}
    
                <p>Active Agents:</p> {activeAgents}
                <p>Disconnected Agents:</p> {disconectedAgents}
                <p>Never Connected Agents:</p> {neverconnectedAgents}
                <p>Pending Agents:</p> {pendingAgents}
                <p>Total Agents:</p> {totalAgents}
    
            </tbody>
          </table>
        </div>
          </IonContent>
        </IonPage>
      )
}

export default Dashboard
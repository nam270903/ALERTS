import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonLabel,
  IonRow,
  IonCol,
  IonGrid,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { Agent } from './Dashboard';
import './Agentinfo.css';
interface PackageItem {
  name: string;
  description: string;
  architecture: string;
  format: string;
  size: number;
}

interface ProcessItem {
  cmd: string;
  name: string;
  start_time: number;
  processor: number;
  size: number;
}

const AgentInfo: React.FC = () => {
  const [jwtToken, setJwtToken] = useState<string>('');
  const location = useLocation();
  const agent: Agent = (location.state as any)?.agent;
  const [CPUcores, setCPUcores] = useState<string>('');
  const [CPUclock, setCPUclock] = useState<string>('');
  const [CPUname, setCPUname] = useState<string>('');
  const [RAMfree, setRAMfree] = useState<string>('');
  const [RAMtotal, setRAMtotal] = useState<string>('');
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [processes, setProcesses] = useState<ProcessItem[]>([]);

  useEffect(() => {
    const fetchJwtToken = async () => {
      const form = new FormData();
      form.append("username", "admin");
      form.append("password", "admin");

      const options: RequestInit = {
        method: 'POST',
        redirect: 'follow',
        body: form,
      };

      try {
        const response = await fetch('https://chouette.doclai.com/login', options);
        const data = await response.json();

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

      const AgentStatus = async () => {
        try {
          const response = await fetch(`https://chouette.doclai.com/auth/syscollector/${agent.id}/hardware`, options);
          const data = await response.json();
          if (data && data.data) {
            setCPUcores(data.data.affected_items[0].cpu.cores);
            setCPUclock(data.data.affected_items[0].cpu.mhz);
            setCPUname(data.data.affected_items[0].cpu.name);
            setRAMfree(data.data.affected_items[0].ram.free);
            setRAMtotal(data.data.affected_items[0].ram.total);
          }
        } catch (error) {
          console.error(error);
        }
      };

      AgentStatus();

      const AgentPackages = async () => {
        try {
          const response = await fetch(`https://chouette.doclai.com/auth/syscollector/${agent.id}/packages`, options);
          const data = await response.json();
          if (data && data.data) {
            const extractedPackage: PackageItem[] = data.data.affected_items.map((item: any) => ({
              name: item.name,
              description: item.description,
              architecture: item.architecture,
              format: item.format,
              size: item.size,
            }));
            setPackages(extractedPackage);
          }
        } catch (error) {
          console.error(error);
        }
      };

      AgentPackages();

      const AgentProcesses = async () => {
        try {
          const response = await fetch(`https://chouette.doclai.com/auth/syscollector/${agent.id}/processes`, options);
          const data = await response.json();
          if (data && data.data) {
            const extractedProcess: ProcessItem[] = data.data.affected_items.map((item: any) => ({
              cmd: item.cmd,
              name: item.name,
              start_time: item.start_time,
              processor: item.processor,
              size: item.size,
            }));
            setProcesses(extractedProcess);
          }
        } catch (error) {
          console.error(error);
        }
      };

      AgentProcesses();
    }
  }, [jwtToken, agent.id]);

  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/Dashboard'/>
          </IonButtons>
          <IonTitle>Agent Information</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        
      <IonCard>
          <IonCardContent style={{ overflow: 'auto' }}>
            <IonLabel>
              <h1 className='ion-text-center'>Agent Information</h1>
            <IonGrid>
              <IonRow>
                <IonCol size="6">
                  <p><strong>Name:</strong></p>
                </IonCol>
                <IonCol size="6">
                  <p>{agent.name}</p>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">
                  <p><strong>ID:</strong></p>
                </IonCol>
                <IonCol size="6">
                  <p>{agent.id}</p>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">
                  <p><strong>IP Address:</strong></p>
                </IonCol>
                <IonCol size="6">
                  <p>{agent.ip}</p>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">
                  <p><strong>Platform:</strong></p>
                </IonCol>
                <IonCol size="6">
                  <p>{agent.platform}</p>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">
                  <p><strong>Cluster Node:</strong></p>
                </IonCol>
                <IonCol size="6">
                  <p>{agent.node}</p>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">
                  <p><strong>Status:</strong></p>
                </IonCol>
                <IonCol size="6">
                  <p>{agent.status}</p>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">
                  <p><strong>CPU cores:</strong></p>
                </IonCol>
                <IonCol size="6">
                  <p>{CPUcores}</p>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">
                  <p><strong>CPU clock (mHz):</strong></p>
                </IonCol>
                <IonCol size="6">
                  <p>{CPUclock}</p>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">
                  <p><strong>CPU name:</strong></p>
                </IonCol>
                <IonCol size="6">
                  <p>{CPUname}</p>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">
                  <p><strong>Total RAM:</strong></p>
                </IonCol>
                <IonCol size="6">
                  <p>{RAMtotal}</p>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">
                  <p><strong>Free RAM:</strong></p>
                </IonCol>
                <IonCol size="6">
                  <p>{RAMfree}</p>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonLabel>
        </IonCardContent>
      </IonCard>

        <IonCard>
          <IonCardContent style={{ overflow: 'auto' }}>
            <IonLabel>
              <h1 className='ion-text-center'>Package List</h1>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <div className="table-container">
                      <table>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Architecture</th>
                            <th>Format</th>
                            <th>Size</th>
                          </tr>
                        </thead>
                        <tbody>
                          {packages.map((Package, index) => (
                            <tr key={index}>
                              <td>{Package.name}</td>
                              <td>{Package.description}</td>
                              <td>{Package.architecture}</td>
                              <td>{Package.format}</td>
                              <td>{Package.size}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent style={{ overflow: 'auto' }}>
            <IonLabel>
              <h1 className='ion-text-center'>Process List</h1>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <div className="table-container">
                      <table>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Command</th>
                            <th>Start Time</th>
                            <th>Processor</th>
                            <th>Size</th>
                          </tr>
                        </thead>
                        <tbody>
                          {processes.map((process, index) => (
                            <tr key={index}>
                              <td>{process.name}</td>
                              <td>{process.cmd}</td>
                              <td>{new Date(process.start_time * 1000).toLocaleString()}</td>
                              <td>{process.processor}</td>
                              <td>{process.size}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default AgentInfo;

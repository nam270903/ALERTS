import { useParams, useLocation } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import {Agent} from './Dashboard';

const AgentInfo: React.FC = () => {
  const [jwtToken, setJwtToken] = useState<string>('');
  const location = useLocation();
  const agent: Agent = (location.state as any)?.agent;
  const [CPUcores, setCPUcores] = useState<string>('');
  const [CPUclock, setCPUclock] = useState<string>('');
  const [CPUname, setCPUname] = useState<string>('');
  const [RAMfree, setRAMfree] = useState<string>('');
  const [RAMtotal, setRAMtotal] = useState<string>('');


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

      const AgentsStatus = async () => {
        try {
          const response = await fetch(`https://chouette.doclai.com/auth/syscollector/${agent.id}/hardware`, options);
          const data = await response.json();
          console.log(data);
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
      }
      AgentsStatus();
    }
  }, [jwtToken]);
  

  return (
    <div>
      <h1>Agent Information</h1>
      <p><strong>Name:</strong> {agent.name}</p>
      <p><strong>ID:</strong> {agent.id}</p>
      <p><strong>IP Address:</strong> {agent.ip}</p>
      <p><strong>Platform:</strong> {agent.platform}</p>
      <p><strong>Cluster Node:</strong> {agent.node}</p>
      <p><strong>Status:</strong> {agent.status}</p>
      <p><strong>CPU cores:</strong> {CPUcores}</p>
      <p><strong>CPU clock (mHz):</strong> {CPUclock}</p>
      <p><strong>CPU name:</strong> {CPUname}</p>
      <p><strong>total RAM:</strong> {RAMtotal}</p>
      <p><strong>free RAM:</strong> {RAMfree}</p>
      
    </div>
  );
};

export default AgentInfo;
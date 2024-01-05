import { useParams, useLocation } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import {Agent} from './Dashboard';


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

      const AgentStatus = async () => {
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
      AgentStatus();

      const AgentPackages = async () => {
        try {
          const response = await fetch(`https://chouette.doclai.com/auth/syscollector/${agent.id}/packages`, options);
          const data = await response.json();
          console.log(data);
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
      }
      AgentPackages();

      const AgentProcesses = async () => {
        try {
          const response = await fetch(`https://chouette.doclai.com/auth/syscollector/${agent.id}/processes`, options);
          const data = await response.json();
          console.log(data);
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
      }
      AgentProcesses();
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

      <div>
      <h1>Package List</h1>
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
          {packages.map((Package) => (
            <tr key={Package.name}>
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


      <div>
      <h1>Process List</h1>
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
          {processes.map((process) => (
            <tr key={process.name}>
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
      
    </div>
  );
};

export default AgentInfo;
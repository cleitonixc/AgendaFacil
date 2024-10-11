import React, { useState } from 'react';
import { Calendar, Users, BarChart, Clock, Settings, PlusCircle } from 'lucide-react';
import ServiceScheduleConfig from '../components/ServiceScheduleConfig';
import ServiceScheduleView from '../components/ServiceScheduleView';

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, children }) => (
  <button
    className={`px-4 py-2 font-medium rounded-lg transition-colors ${
      active ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Painel de Controle</h1>
      
      <div className="mb-6">
        <nav className="flex space-x-4">
          <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
            Visão Geral
          </TabButton>
          <TabButton active={activeTab === 'appointments'} onClick={() => setActiveTab('appointments')}>
            Agendamentos
          </TabButton>
          <TabButton active={activeTab === 'services'} onClick={() => setActiveTab('services')}>
            Serviços
          </TabButton>
          <TabButton active={activeTab === 'schedules'} onClick={() => setActiveTab('schedules')}>
            Agendas
          </TabButton>
          <TabButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')}>
            Configurações
          </TabButton>
        </nav>
      </div>

      {activeTab === 'overview' && <OverviewTab />}
      {activeTab === 'appointments' && <AppointmentsTab />}
      {activeTab === 'services' && <ServicesTab />}
      {activeTab === 'schedules' && <SchedulesTab />}
      {activeTab === 'settings' && <SettingsTab />}
    </div>
  );
};

const OverviewTab: React.FC = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Visão Geral</h2>
    {/* Add overview content here */}
  </div>
);

const AppointmentsTab: React.FC = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Agendamentos</h2>
    {/* Add appointments content here */}
  </div>
);

const ServicesTab: React.FC = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Serviços</h2>
    {/* Add services content here */}
  </div>
);

const SchedulesTab: React.FC = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Configuração de Agendas</h2>
    <ServiceScheduleConfig />
    <div className="mt-8">
      <ServiceScheduleView />
    </div>
  </div>
);

const SettingsTab: React.FC = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Configurações</h2>
    {/* Add settings content here */}
  </div>
);

export default Dashboard;
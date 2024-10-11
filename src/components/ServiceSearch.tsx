import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
}

interface ServiceSearchProps {
  onServiceSelect: (service: Service) => void;
}

const ServiceSearch: React.FC<ServiceSearchProps> = ({ onServiceSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [services] = useState<Service[]>([
    { id: '1', name: 'Corte de Cabelo', description: 'Corte moderno para todos os estilos', duration: 30, price: 50 },
    { id: '2', name: 'Barba', description: 'Aparar e modelar sua barba', duration: 20, price: 30 },
    { id: '3', name: 'Coloração', description: 'Tintura profissional para seu cabelo', duration: 60, price: 120 },
    { id: '4', name: 'Hidratação', description: 'Tratamento intensivo para cabelos danificados', duration: 45, price: 80 },
    { id: '5', name: 'Penteado', description: 'Penteados para ocasiões especiais', duration: 40, price: 70 },
  ]);

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar serviços..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div className="space-y-4">
        {filteredServices.map(service => (
          <div
            key={service.id}
            className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition duration-150 ease-in-out"
            onClick={() => onServiceSelect(service)}
          >
            <h3 className="text-lg font-semibold">{service.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{service.description}</p>
            <div className="flex justify-between text-sm">
              <span>Duração: {service.duration} min</span>
              <span className="font-semibold">R$ {service.price.toFixed(2)}</span>
            </div>
          </div>
        ))}
        {filteredServices.length === 0 && (
          <p className="text-center text-gray-500">Nenhum serviço encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default ServiceSearch;
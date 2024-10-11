import React from 'react';

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
}

interface ServiceSelectionProps {
  services: Service[];
  selectedService: Service | null;
  onServiceSelect: (service: Service) => void;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({
  services,
  selectedService,
  onServiceSelect,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Selecione um Serviço</h3>
      <div className="space-y-2">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => onServiceSelect(service)}
            className={`w-full p-3 text-left rounded-lg transition-colors ${
              selectedService?.id === service.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{service.name}</span>
              <span className="text-sm">
                {service.duration} min | R$ {service.price.toFixed(2)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelection;
import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isReserved: boolean;
}

interface DaySchedule {
  date: string;
  timeSlots: TimeSlot[];
}

interface Service {
  id: string;
  name: string;
}

const ServiceScheduleView: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);

  const services: Service[] = [
    { id: '1', name: 'Corte de Cabelo' },
    { id: '2', name: 'Barba' },
    { id: '3', name: 'Coloração' },
  ];

  useEffect(() => {
    if (selectedService) {
      fetchSchedule(selectedService.id, selectedDate);
    }
  }, [selectedService, selectedDate]);

  const fetchSchedule = (serviceId: string, date: Date) => {
    // Simulating API call to fetch schedule
    const mockSchedule: DaySchedule[] = [
      {
        date: date.toISOString().split('T')[0],
        timeSlots: [
          { id: '1', startTime: '09:00', endTime: '10:00', isReserved: false },
          { id: '2', startTime: '10:00', endTime: '11:00', isReserved: true },
          { id: '3', startTime: '11:00', endTime: '12:00', isReserved: false },
          { id: '4', startTime: '13:00', endTime: '14:00', isReserved: false },
          { id: '5', startTime: '14:00', endTime: '15:00', isReserved: true },
          { id: '6', startTime: '15:00', endTime: '16:00', isReserved: false },
          { id: '7', startTime: '16:00', endTime: '17:00', isReserved: false },
        ],
      },
    ];
    setSchedule(mockSchedule);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Agenda de Serviços</h2>
      <div className="mb-4">
        <label htmlFor="service-select" className="block text-sm font-medium text-gray-700 mb-2">
          Selecione um serviço
        </label>
        <select
          id="service-select"
          className="w-full p-2 border rounded-md"
          value={selectedService?.id || ''}
          onChange={(e) => setSelectedService(services.find(s => s.id === e.target.value) || null)}
        >
          <option value="">Selecione um serviço</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      </div>
      {selectedService && (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Selecione uma data</label>
            <input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => handleDateChange(new Date(e.target.value))}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schedule[0]?.timeSlots.map((slot) => (
              <div
                key={slot.id}
                className={`p-4 rounded-lg flex items-center justify-between ${
                  slot.isReserved ? 'bg-red-100' : 'bg-green-100'
                }`}
              >
                <div className="flex items-center">
                  <Clock className="mr-2" size={20} />
                  <span>
                    {slot.startTime} - {slot.endTime}
                  </span>
                </div>
                <span className={`text-sm font-medium ${slot.isReserved ? 'text-red-600' : 'text-green-600'}`}>
                  {slot.isReserved ? 'Reservado' : 'Disponível'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceScheduleView;
import React, { useState } from 'react';
import { Clock, Plus, Trash2 } from 'lucide-react';

interface Service {
  id: string;
  name: string;
}

interface TimeSlot {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

interface ServiceSchedule {
  serviceId: string;
  timeSlots: TimeSlot[];
}

const ServiceScheduleConfig: React.FC = () => {
  const [services] = useState<Service[]>([
    { id: '1', name: 'Corte de Cabelo' },
    { id: '2', name: 'Barba' },
    { id: '3', name: 'Coloração' },
  ]);

  const [schedules, setSchedules] = useState<ServiceSchedule[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');

  const addTimeSlot = (serviceId: string) => {
    const newTimeSlot: TimeSlot = {
      id: Date.now().toString(),
      dayOfWeek: 1,
      startTime: '09:00',
      endTime: '17:00',
    };

    setSchedules((prevSchedules) => {
      const existingSchedule = prevSchedules.find((s) => s.serviceId === serviceId);
      if (existingSchedule) {
        return prevSchedules.map((s) =>
          s.serviceId === serviceId
            ? { ...s, timeSlots: [...s.timeSlots, newTimeSlot] }
            : s
        );
      } else {
        return [...prevSchedules, { serviceId, timeSlots: [newTimeSlot] }];
      }
    });
  };

  const updateTimeSlot = (serviceId: string, timeSlotId: string, field: keyof TimeSlot, value: string | number) => {
    setSchedules((prevSchedules) =>
      prevSchedules.map((schedule) =>
        schedule.serviceId === serviceId
          ? {
              ...schedule,
              timeSlots: schedule.timeSlots.map((slot) =>
                slot.id === timeSlotId ? { ...slot, [field]: value } : slot
              ),
            }
          : schedule
      )
    );
  };

  const removeTimeSlot = (serviceId: string, timeSlotId: string) => {
    setSchedules((prevSchedules) =>
      prevSchedules.map((schedule) =>
        schedule.serviceId === serviceId
          ? {
              ...schedule,
              timeSlots: schedule.timeSlots.filter((slot) => slot.id !== timeSlotId),
            }
          : schedule
      )
    );
  };

  const getDayName = (dayNumber: number) => {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return days[dayNumber - 1];
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <label htmlFor="service-select" className="block text-sm font-medium text-gray-700 mb-2">
          Selecione um serviço
        </label>
        <select
          id="service-select"
          className="w-full p-2 border rounded-md"
          value={selectedServiceId}
          onChange={(e) => setSelectedServiceId(e.target.value)}
        >
          <option value="">Selecione um serviço</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      </div>

      {selectedServiceId && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Horários de Atendimento</h3>
          {schedules
            .find((s) => s.serviceId === selectedServiceId)
            ?.timeSlots.map((slot) => (
              <div key={slot.id} className="flex items-center space-x-4 mb-4">
                <select
                  className="p-2 border rounded-md"
                  value={slot.dayOfWeek}
                  onChange={(e) =>
                    updateTimeSlot(selectedServiceId, slot.id, 'dayOfWeek', parseInt(e.target.value))
                  }
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <option key={day} value={day}>
                      {getDayName(day)}
                    </option>
                  ))}
                </select>
                <input
                  type="time"
                  className="p-2 border rounded-md"
                  value={slot.startTime}
                  onChange={(e) =>
                    updateTimeSlot(selectedServiceId, slot.id, 'startTime', e.target.value)
                  }
                />
                <span>até</span>
                <input
                  type="time"
                  className="p-2 border rounded-md"
                  value={slot.endTime}
                  onChange={(e) =>
                    updateTimeSlot(selectedServiceId, slot.id, 'endTime', e.target.value)
                  }
                />
                <button
                  onClick={() => removeTimeSlot(selectedServiceId, slot.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          <button
            onClick={() => addTimeSlot(selectedServiceId)}
            className="flex items-center text-blue-500 hover:text-blue-700"
          >
            <Plus size={20} className="mr-2" />
            Adicionar Horário
          </button>
        </div>
      )}
    </div>
  );
};

export default ServiceScheduleConfig;
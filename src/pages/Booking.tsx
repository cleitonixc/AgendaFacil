import React, { useState } from 'react';
import ServiceSearch from '../components/ServiceSearch';
import BookingForm from '../components/BookingForm';

const Booking: React.FC = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Agende seu Serviço</h1>
      {!selectedService ? (
        <ServiceSearch onServiceSelect={setSelectedService} />
      ) : (
        <BookingForm initialService={selectedService} />
      )}
    </div>
  );
};

export default Booking;
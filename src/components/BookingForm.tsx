import React, { useState } from 'react';
import Calendar from './Calendar';
import ServiceSelection from './ServiceSelection';
import PixPayment from './PixPayment';

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
}

interface BookingFormProps {
  initialService: Service;
}

const BookingForm: React.FC<BookingFormProps> = ({ initialService }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedService, setSelectedService] = useState<Service>(initialService);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      handleNextStep();
    } else {
      console.log('Agendamento finalizado:', { selectedDate, selectedService, name, email });
    }
  };

  const handlePaymentComplete = () => {
    console.log('Pagamento confirmado');
    setStep(4);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
          <li className={`flex md:w-full items-center ${step >= 1 ? 'text-blue-600 dark:text-blue-500' : ''} sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}>
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
              </svg>
              Data
            </span>
          </li>
          <li className={`flex md:w-full items-center ${step >= 2 ? 'text-blue-600 dark:text-blue-500' : ''} after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}>
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              <span className="mr-2">2</span>
              Informações
            </span>
          </li>
          <li className={`flex items-center ${step >= 3 ? 'text-blue-600 dark:text-blue-500' : ''}`}>
            <span className="mr-2">3</span>
            Pagamento
          </li>
        </ol>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <>
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <h3 className="text-lg font-semibold mb-2">Serviço Selecionado</h3>
              <p>{selectedService.name} - R$ {selectedService.price.toFixed(2)}</p>
            </div>
            <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
          </>
        )}

        {step === 2 && (
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-4">Informações de Contato</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <PixPayment
            amount={selectedService.price}
            onPaymentComplete={handlePaymentComplete}
          />
        )}

        {step === 4 && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
            <p className="font-bold">Agendamento Confirmado!</p>
            <p>Seu serviço foi agendado com sucesso. Um email de confirmação foi enviado para {email}.</p>
          </div>
        )}

        {step < 3 && (
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {step === 2 ? 'Ir para Pagamento' : 'Próximo'}
          </button>
        )}
      </form>
    </div>
  );
};

export default BookingForm;
import React, { useState } from 'react';
import { QrCode } from 'lucide-react';

interface PixPaymentProps {
  amount: number;
  onPaymentComplete: () => void;
}

const PixPayment: React.FC<PixPaymentProps> = ({ amount, onPaymentComplete }) => {
  const [pixCode] = useState('00020126580014BR.GOV.BCB.PIX0136123e4567-e12b-12d1-a456-426655440000520400005303986540510.005802BR5913Teste Empresa6008Sao Paulo62070503***6304B14B');

  const handleConfirmPayment = () => {
    // Simular verificação de pagamento
    setTimeout(() => {
      onPaymentComplete();
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Pagamento via Pix</h3>
      <div className="flex flex-col items-center mb-6">
        <QrCode className="w-48 h-48 text-gray-800 mb-4" />
        <p className="text-sm text-gray-600 mb-2">Escaneie o QR Code acima com seu aplicativo bancário</p>
        <p className="font-semibold">Valor: R$ {amount.toFixed(2)}</p>
      </div>
      <div className="mb-4">
        <p className="text-sm font-medium mb-1">Ou copie o código Pix abaixo:</p>
        <input
          type="text"
          value={pixCode}
          readOnly
          className="w-full p-2 border rounded bg-gray-100 text-sm"
        />
      </div>
      <button
        onClick={handleConfirmPayment}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
      >
        Confirmar Pagamento
      </button>
    </div>
  );
};

export default PixPayment;
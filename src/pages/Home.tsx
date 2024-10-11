import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Instagram, CreditCard } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Bem-vindo ao AgendaFácil</h1>
      <p className="text-xl mb-8">Simplifique seu agendamento e cresça seu negócio</p>
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <FeatureCard
          icon={<Calendar className="h-12 w-12 text-blue-500" />}
          title="Agendamento Simples"
          description="Gerencie sua agenda com facilidade e eficiência"
        />
        <FeatureCard
          icon={<Instagram className="h-12 w-12 text-pink-500" />}
          title="Integração Instagram"
          description="Conecte-se com clientes através das redes sociais"
        />
        <FeatureCard
          icon={<CreditCard className="h-12 w-12 text-green-500" />}
          title="Pagamento via Pix"
          description="Receba pagamentos de forma rápida e segura"
        />
      </div>
      <Link
        to="/login"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
      >
        Comece Agora
      </Link>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Home;
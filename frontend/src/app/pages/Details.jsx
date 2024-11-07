import { useState } from 'react';
import PredictionsHeader from '../components/organisms/PredictionsHeader';
import PredictionsSections from '../components/organisms/PredictionsSections';
import DetailsSections from '../components/organisms/DetailsSections';
import Positions from './Positions';

export default function Details() {
  const [activeTab, setActiveTab] = useState('left');

  const renderSection = () => {
    switch (activeTab) {
      case 'left':
        return <PredictionsSections />;
      case 'center':
        return <DetailsSections />;
      case 'right':
        return <Positions />;
      default:
        return <p>No se seleccionó ninguna sección.</p>;
    }
  };

  return (
    <div className="mb-[90px] flex flex-col">
      <PredictionsHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderSection()}
    </div>
  );
}

import { useState } from 'react';
import PredictionsHeader from '../components/organisms/PredictionsHeader';
import PredictionsSections from '../components/organisms/PredictionsSections';
import Positions from './Positions';

export default function Details() {
  const [underlinePosition, setUnderlinePosition] = useState('left');

  const renderSection = () => {
    switch (underlinePosition) {
      case 'left':
        return <PredictionsSections />;
      case 'center':
        return <h2>Details</h2>;
      case 'right':
        return <Positions />;
      default:
        return <p>No se seleccionó ninguna sección.</p>;
    }
  };

  return (
    <div className="flex flex-col">
      <PredictionsHeader
        underlinePosition={underlinePosition}
        setUnderlinePosition={setUnderlinePosition}
      />
      {renderSection()}
    </div>
  );
}

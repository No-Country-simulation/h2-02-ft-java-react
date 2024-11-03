import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from 'react-icons/io';
import HeaderLeague from '../atoms/HeaderLeague';
import { BodyPredictionsCard } from '../atoms/BodyPredictionsCard';
import StatusPredictionsCard from '../atoms/StatusPredictionsCard';

export function PredictionCarrousel({ totalPoints, status, match }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === match.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? match.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative">
      {/* Botones de navegación fuera del contenedor principal */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform p-2 text-purpleWaki"
      >
        <IoIosArrowDropleftCircle size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 transform p-2 text-purpleWaki"
      >
        <IoIosArrowDroprightCircle size={24} />
      </button>

      {/* Contenedor principal del carrusel */}
      <div className="flex flex-col divide-y overflow-hidden rounded-large shadow-custom">
        <HeaderLeague
          league={match[currentIndex].competition}
          competitionShield={match[currentIndex].competitionShield}
        />

        {/* Prediction Card animada */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          <BodyPredictionsCard
            selected={match[currentIndex].expectedResult}
            homeTeam={{
              name: match[currentIndex].homeTeam,
              logoUrl: match[currentIndex].homeShield,
            }}
            awayTeam={{
              name: match[currentIndex].awayTeam,
              logoUrl: match[currentIndex].awayShield,
            }}
            points={match[currentIndex].points}
            status={status}
          />
        </motion.div>

        <StatusPredictionsCard status={status} points={totalPoints} />
      </div>
    </div>
  );
}

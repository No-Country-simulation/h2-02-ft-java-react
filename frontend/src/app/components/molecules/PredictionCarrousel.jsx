import { useState } from 'react';
import { motion } from 'framer-motion';
import { TbCircleArrowRight } from 'react-icons/tb';
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

  return (
    <div className="grid h-full w-full grid-cols-[1fr_auto] overflow-hidden rounded-large shadow-custom">
      {/* Contenedor principal del carrusel */}
      <div className="flex flex-col divide-y">
        <HeaderLeague
          league={match[currentIndex].competition}
          competitionShield={match[currentIndex].competitionShield}
          isCombined={true}
        />
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 90 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -90 }}
          transition={{ duration: 0.7 }}
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

      <button
        onClick={handleNext}
        className="z-10 flex h-full w-8 items-center justify-center bg-gradient-to-r from-blueWaki to-purpleWaki text-white"
      >
        <TbCircleArrowRight size={24} />
      </button>
    </div>
  );
}

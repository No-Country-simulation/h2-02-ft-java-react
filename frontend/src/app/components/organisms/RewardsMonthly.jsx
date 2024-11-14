import { useState, useEffect } from 'react';
import { IoGift } from 'react-icons/io5';
import { TbRosetteNumber1 } from 'react-icons/tb';
import { RiArrowRightWideLine, RiArrowLeftWideLine } from 'react-icons/ri';
import Camiseta from '../../../assets/camiseta.png';
import Lazo from '../../../assets/lazo.png';

const rewardsGold = [
  {
    img: Camiseta,
    title: 'Sorteo división Oro',
    subtitle: 'Camiseta selección argentina',
    icon: <IoGift size={24.33} className="absolute text-[#CFA53C]" />,
  },
  {
    img: Camiseta,
    title: 'Sorteo división Plata',
    subtitle: 'Camiseta selección argentina',
    icon: <IoGift size={24.33} className="absolute text-[#A4A4A4]" />,
  },
  {
    img: Camiseta,
    title: 'Premio 1er puesto división Oro',
    subtitle: 'Camiseta selección argentina',
    icon: <TbRosetteNumber1 size={24.33} className="absolute text-blueWaki" />,
  },
];

const rewardsSilver = [
  {
    img: Camiseta,
    title: 'Sorteo división Plata',
    subtitle: 'Camiseta selección argentina',
    icon: <IoGift size={24.33} className="absolute text-[#A4A4A4]" />,
  },
];

export default function RewardsMonthly({ isGold }) {
  const [currentReward, setCurrentReward] = useState(0);
  const rewards = isGold ? rewardsGold : rewardsSilver;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReward((prevReward) => (prevReward + 1) % rewards.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [rewards.length]);

  const handlePrev = () => {
    setCurrentReward(
      (prevReward) => (prevReward - 1 + rewards.length) % rewards.length
    );
  };

  const handleNext = () => {
    setCurrentReward((prevReward) => (prevReward + 1) % rewards.length);
  };

  return (
    <div className="relative m-7 flex items-center">
      {isGold && (
        <button onClick={handlePrev} className="absolute left-0 z-10">
          <RiArrowLeftWideLine size={24} />
        </button>
      )}
      <div className="flex w-full justify-center overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentReward * 100}%)` }}
        >
          {rewards.map((reward, index) => (
            <div
              key={index}
              className="flex w-full flex-shrink-0 justify-center"
            >
              <div className="relative flex h-[211.02px] w-[294.82px] items-center rounded-lg bg-gradient-to-r from-blueWaki to-purpleWaki p-2">
                <img
                  src={reward.img}
                  alt="Camiseta"
                  className="h-[150px] object-contain"
                />
                <div className="ml-1 mt-10 flex flex-col justify-center">
                  <span className="text-medium-18 text-white">
                    {reward.title}
                  </span>
                  <span className="text-regular-14 text-label">
                    {reward.subtitle}
                  </span>
                </div>
                <div className="absolute right-[40px] top-[8px] flex h-[41.33px] w-[41.33px] items-center justify-center">
                  <img
                    src={Lazo}
                    alt="Lazo"
                    className="h-[100px] object-contain"
                  />
                  {reward.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isGold && (
        <button onClick={handleNext} className="absolute right-0 z-10">
          <RiArrowRightWideLine size={24} />
        </button>
      )}
    </div>
  );
}

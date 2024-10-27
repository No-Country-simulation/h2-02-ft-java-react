import MyPredictionsHeader from '../components/organisms/MyPredictionsHeader';
import MyPredictionSection from '../components/organisms/MyPredictionSection';

export default function MyPredictions() {
  return (
    <div className="flex flex-col bg-gradientWaki">
      <MyPredictionsHeader />
      <MyPredictionSection />
    </div>
  );
}

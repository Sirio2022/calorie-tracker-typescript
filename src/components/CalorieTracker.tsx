import { useActivity } from '../hooks/useActivity';
import CalorieDisplay from './CalorieDisplay';

export default function CalorieTracker() {
  const { caloriesConsumed, caloriesBurned, caloriesDifference } =
    useActivity();

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center uppercase">
        Calory Consumed vs Burned
      </h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay calories={caloriesConsumed} text="Consumed" />

        <CalorieDisplay calories={caloriesBurned} text="Burned" />

        <p className=" text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
          <span
            className={`
            font-black text-6xl
            ${caloriesDifference > 0 ? 'text-green-500' : 'text-red-500'}`}
          >
            {caloriesDifference}
          </span>
          Difference
        </p>
      </div>
    </>
  );
}

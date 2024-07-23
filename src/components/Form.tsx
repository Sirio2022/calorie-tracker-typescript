import { useId, ChangeEvent } from 'react';
import { categories } from '../data/categories';
import { useActivity } from '../hooks/useActivity';

export default function Form() {
  const category = useId();
  const description = useId();
  const calories = useId();

  const { activity, setActivity, isValidActivity, handleSubmit } =
    useActivity();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setActivity((prevActivity) => ({
      ...prevActivity,
      [name]:
        name === 'category' || name === 'calories'
          ? parseInt(value, 10)
          : value,
    }));
  };

  return (
    <form
      className=" space-y-5 bg-white shadow-md p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor={category} className=" font-bold">
          Category:
        </label>
        <select
          name="category"
          id={category}
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor={description} className=" font-bold">
          Activity:
        </label>
        <input
          type="text"
          name="activity"
          id={description}
          className="border border-slate-300 p-2 rounded-lg w-full"
          placeholder='E.g. "30 minutes of running" or "1 slice of pizza"'
          value={activity.activity}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor={calories} className=" font-bold">
          Calories:
        </label>
        <input
          type="number"
          name="calories"
          id={calories}
          className="border border-slate-300 p-2 rounded-lg w-full"
          placeholder="Enter the number of calories. E.g. 300"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="w-full bg-lime-600 text-white font-bold uppercase py-2 px-4 rounded-lg cursor-pointer hover:bg-lime-700 disabled:opacity-50 disabled:cursor-not-allowed"
        value={activity.category === 1 ? 'Add Food' : 'Add Exercise'}
        disabled={!isValidActivity()}
      />
    </form>
  );
}

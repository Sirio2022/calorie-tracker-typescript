import { useActivity } from '../hooks/useActivity';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function ActivityList() {
  const { state, dispatch, categoryName } = useActivity();

  const activities = state.activities;

  return activities?.length > 0 ? (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center uppercase">
        Foods and Exercises
      </h2>

      {activities.map((activity) => (
        <div
          key={activity.id}
          className="px-5 py-10 bg-white mt-5 flex justify-between shadow-lg rounded-lg"
        >
          <div className="space-y-2 relative">
            <p
              className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold rounded-lg ${
                activity.category === 1 ? 'bg-indigo-500' : 'bg-orange-500'
              }`}
            >
              {categoryName(activity.category)}
            </p>
            <p className="text-2xl font-bold pt-5">{activity.activity}</p>
            <p className="font-black text-4xl text-lime-500">
              {activity.calories} <span>calories</span>
            </p>
          </div>

          <div className=" flex gap-5 items-center">
            <button
              className="bg-blue-500 px-5 py-2 rounded-lg text-white flex items-center hover:bg-blue-700"
              onClick={() =>
                dispatch({ type: 'EDIT_ACTIVITY', payload: activity.id })
              }
            >
              <PencilSquareIcon className="h-5 w-5 mr-2" />
              Edit
            </button>
            <button
              className="bg-red-500 px-5 py-2 rounded-lg text-white flex items-center hover:bg-red-700"
              onClick={() =>
                dispatch({ type: 'DELETE_ACTIVITY', payload: activity.id })
              }
            >
              <TrashIcon className="h-5 w-5 mr-2" />
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  ) : (
    <h2 className="text-4xl font-bold text-slate-600 text-center uppercase">
      No activities yet
    </h2>
  );
}

import { useActivity } from '../hooks/useActivity';
import Swal from 'sweetalert2';

export default function Header() {
  const { state, clearApp } = useActivity();

  const handleClick = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        clearApp();
        Swal.fire('Deleted!', 'All activities have been deleted.', 'success');
      }
    });
  };

  return (
    <div className=" max-w-4xl mx-auto flex justify-between items-center">
      <h1 className=" text-center text-lg font-bold text-white uppercase">
        Calorie Tracker
      </h1>

      {state.activities.length > 0 && (
        <button
          className=" bg-red-500 px-5 py-2 rounded-lg text-white flex items-center hover:bg-red-700"
          onClick={handleClick}
        >
          Reset App
        </button>
      )}
    </div>
  );
}

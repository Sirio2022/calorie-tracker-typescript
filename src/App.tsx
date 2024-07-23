import Header from './components/Header';
import ActivityList from './components/ActivityList';
import Form from './components/Form';
import CalorieTracker from './components/CalorieTracker';

function App() {
  return (
    <>
      <header className=" bg-lime-600 py-3">
        <Header />
      </header>

      <section className=" bg-lime-500 py-20 px-5">
        <div className=" max-w-4xl mx-auto">
          <Form />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
        <div className=" max-w-4xl mx-auto">
          <CalorieTracker />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList />
      </section>
    </>
  );
}

export default App;

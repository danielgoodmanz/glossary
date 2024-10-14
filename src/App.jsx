//pages
import Home from '../pages/Home';
import Navbar from './my_components/Navbar';

function App() {
  return (
    <div>
      <div className='font-bold text-red-400 min-h-screen'>
        <Navbar />
        <Home />
      </div>
      <footer className='flex justify-between text-xs'>
        <p>by Dan</p>
        <p>glossary v1</p>
      </footer>

      <div>
        {/* sample card but lets keep simple & build up, perhaps a button that opens
        the card in a new route /:id perhaps a modal on the same page even */}
      </div>
    </div>
  );
}

export default App;

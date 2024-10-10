//pages
import Home from '../pages/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='font-bold bg-zinc-800 text-red-400 min-h-screen'>
      <Navbar />
      <Home />
      <footer className='flex justify-between text-xs'>
        <p>by Dan</p>
        <p>glossary v1</p>
      </footer>
    </div>
  );
}

export default App;

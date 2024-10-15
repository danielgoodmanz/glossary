//pages
import Home from '../pages/Home';
import Navbar from './my_components/Navbar';
import Header from './my_components/Header';

function App() {
  return (
    <div>
      <div className='font-bold min-h-screen'>
        <Navbar />
        <Header />
        <Home />
        <footer className='flex justify-between text-xs'>
          <p>by Dan</p>
          <p>glossary v1</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

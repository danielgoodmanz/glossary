//pages
import Home from '../pages/Home';
import Navbar from './my_components/Navbar';
import Header from './my_components/Header';
import { ThemeProvider } from '@/components/theme-provider';

function App() {
  return (
    <div className='flex flex-col justify-center font-bold min-h-screen'>
      <div>
        <Navbar />
        <Header />
        <Home />
      </div>
      <footer className='flex justify-between text-xs mt-auto'>
        <p>by Dan</p>
        <p>glossary.dev v1</p>
      </footer>
    </div>
  );
}

export default App;

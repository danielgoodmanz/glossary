//pages
import Home from '../pages/Home';
import Navbar from '../components/my-components/Navbar';
import Header from '../components/my-components/Header';

//shadcn imports
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <ThemeProvider>
      <div className='flex flex-col justify-center font-bold min-h-screen'>
        <div>
          <Navbar />
          <Header />
          <Home />
        </div>
        <Toaster />
        <footer className='flex justify-between text-xs mt-auto'>
          <p>by Dan</p>
          <p>glossary.dev v1</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;

//TODO:
//re-install shadcnui with typescript
//skeleton components

//shadcn imports
import { Button } from '@/components/ui/button';
import { MoonStar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/components/theme-provider';

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className='flex gap-4 justify-end font-bold'>
      <Link className='' to='/'>
        <h1>home</h1>
      </Link>
      <Link to='/add'>
        <h1>contribute</h1>
      </Link>
      <Button
        onClick={() =>
          theme === 'light' ? setTheme('dark') : setTheme('light')
        }
        className='h-6 w-6'
        variant='ghost'
        size='icon'
      >
        <MoonStar></MoonStar>
      </Button>
    </div>
  );
};

export default Navbar;

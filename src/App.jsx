//pages
import Home from '../pages/Home';
import Navbar from './components/Navbar';

//shadcn test
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function App() {
  return (
    <div>
      <div className="font-bold bg-neutral-900 text-red-400 min-h-screen">
        <Navbar />
        <Home />
        <footer className="flex justify-between text-xs">
          <p>by Dan</p>
          <p>glossary v1</p>
        </footer>
      </div>
      <div>
        {/* sample card but lets keep simple & build up, perhaps a button that opens
        the card in a new route /:id perhaps a modal on the same page even */}
        <Card>
          <CardHeader>
            <CardTitle>Sample term</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <p>Lorem ipsum dolor sit amet.</p>
          </CardContent>
          <CardFooter>
            <p>Difficulty 5</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default App;

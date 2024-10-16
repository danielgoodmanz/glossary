//shadcn imports
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/button';

const TermCard = ({ term, terms, setTerms, currentId, setCurrentId }) => {
  //delete handler
  const handleDelete = async () => {
    //soft validation
    const deleteCheck = prompt('password');
    if (deleteCheck === 'delete') {
      const response = await fetch('http://localhost:3000/delete/' + term._id, {
        method: 'DELETE',
      });
      const json = await response.json();

      setTerms((previousTerms) =>
        previousTerms.filter((t) => t._id !== term._id)
      );
    }
  };

  //edit handler
  const handleEdit = (_id) => {
    setCurrentId(term._id);
    // future implementation could make the input fields editable
  };

  return (
    <div className='flex justify-center'>
      <Card className='flex flex-col justify-between max-w-min'>
        <CardHeader>
          <CardTitle>{term.title}</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p>{term.definition}</p>
          <p>{term.difficulty}</p>
        </CardContent>
        <CardFooter className='space-x-4'>
          <Button variant='destructive' onClick={handleDelete}>
            delete
          </Button>
          <span> // </span>
          <Button onClick={handleEdit}>edit</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TermCard;

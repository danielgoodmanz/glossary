import { Link, useParams } from 'react-router-dom';

import React from 'react';

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
import { Trash2, WandSparkles } from 'lucide-react';

//hooks
import { useToast } from '@/hooks/use-toast';

const TermCard = ({ term, terms, setTerms, currentId, setCurrentId }) => {
  const { toast } = useToast();

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
      toast({
        description: 'term deleted succesfully!',
        variant: 'destructive',
      });
    }
  };

  //edit handler
  const handleEdit = (_id) => {
    setCurrentId(term._id);
    // future implementation could make the input fields editable
  };

  //select handler
  const handleSelect = () => {};

  return (
    <div className='flex justify-center'>
      <Card className='flex flex-col justify-between max-w-min'>
        <Link to={`/${term.title}`}>
          <CardHeader>
            <CardTitle onClick={handleSelect}>{term.title}</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
        </Link>
        <CardContent className='space-y-4'>
          <p>{term.definition}</p>
          <p>{term.difficulty}</p>
        </CardContent>
        <CardFooter className='space-x-4'>
          <Button variant='destructive' onClick={handleDelete}>
            <Trash2 size={20}></Trash2>
          </Button>
          <span> // </span>
          <Button onClick={handleEdit}>
            <WandSparkles size={20}></WandSparkles>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TermCard;

import { Link } from 'react-router-dom';

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Trash2, WandSparkles } from 'lucide-react';

const TermCard = ({ term, handleDelete, handleEdit }) => {
  return (
    <div className='flex justify-center'>
      <Card className='flex flex-col justify-between max-w-min'>
        <Link to={`/${term.title}`}>
          <CardHeader>
            <CardTitle>{term.title}</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
        </Link>
        <CardContent className='space-y-4'>
          <p>{term.definition}</p>
          <p>{term.difficulty}</p>
        </CardContent>
        <CardFooter className='space-x-4'>
          <Dialog>
            <DialogTrigger>
              <Button variant='destructive'>
                <Trash2 size={20}></Trash2>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription className='flex flex-col items-center'>
                  <p>
                    This action cannot be undone. This will delete the term from
                    the glossary database.
                  </p>
                  <Button
                    variant='destructive'
                    onClick={() => handleDelete(term)}
                    className='max-w-min mt-2'
                  >
                    YES
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <span> // </span>
          <Button onClick={() => handleEdit(term)}>
            <WandSparkles size={20}></WandSparkles>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TermCard;

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
        <Link to>
          <CardHeader>
            <CardTitle>130 NE 169th Terr</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
        </Link>
        <CardContent className='space-y-4'>
          <p>3/2 single family + legal efficiency in North Miami Beach</p>
          <p>
            Description: Investor opportunity! Features impact windows/doors,
            brand-new roof, etc..!
          </p>
          <p>Photos link: OR SMALL PHOTO HERE</p>
          <p>ARV $380k</p>
          <p>Price:$300k</p>
          <p>Closing: December 31st, 2024</p>
          <p>Escrow: $10k</p>
          <p></p>
        </CardContent>
        <CardFooter className='space-x-4'>
          <Dialog>
            <DialogTrigger>
              <Button variant='destructive'>Contact Saida/Jermaine here</Button>
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
                    C YES
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <span> // </span>
          <Button onClick={() => handleEdit(term)}>Edit deal</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TermCard;

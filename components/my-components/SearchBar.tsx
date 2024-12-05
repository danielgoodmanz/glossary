import React from 'react';

//shadcn imports
import { Input } from '../ui/input';

//types
type SearchProps = {
  search: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ search, onChange }: SearchProps) => {
  return (
    <div className='flex justify-center my-6'>
      <Input
        type='text'
        placeholder='begin your search'
        className='italic w-1/4 text-center text-base'
        value={search}
        onChange={onChange}
      ></Input>
    </div>
  );
};

export default SearchBar;

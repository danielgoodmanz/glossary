import React from 'react';

const CardContainer = ({ children }) => {
  return (
    <div id='cardarea' className='flex justify-center gap-4 flex-wrap'>
      {children}
    </div>
  );
};

export default CardContainer;

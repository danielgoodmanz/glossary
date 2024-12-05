//types
type CardContainerProps = {
  children: React.ReactNode;
};

const CardContainer = ({ children }: CardContainerProps) => {
  return (
    <div id='cardarea' className='flex justify-center gap-4 flex-wrap'>
      {children}
    </div>
  );
};

export default CardContainer;

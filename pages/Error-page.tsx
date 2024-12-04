import { useRouteError } from 'react-router-dom';
import { Link } from 'react-router-dom';

type RouteError = {
  statusText: string;
  message: string;
};

export default function ErrorPage() {
  //when typing a value returned by a hook, you may need to type assert ie. using the 'as' keyword
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <div
      id='error-page'
      className='flex flex-col justify-center items-center font-bold min-h-screen'
    >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link className='text-4xl' to='/'>
        take me home
      </Link>
    </div>
  );
}

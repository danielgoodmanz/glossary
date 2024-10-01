import { Link } from 'react-router-dom';

const Card = ({ term }) => {
  //delete handler
  const handleClick = async () => {
    //soft validation
    const deleteCheck = prompt('password');
    if (deleteCheck === 'delete') {
      const response = await fetch('http://localhost:3000/delete/' + term._id, {
        method: 'DELETE',
      });
      const json = await response.json();
    }
  };

  //edit handler
  const handleEdit = (_id) => {
    //here let's make the form fields editable and lift state then fetch a patch request to API
    console.log(term._id);
  };

  return (
    <div>
      <h2>{term.title}</h2>
      <p>{term.definition}</p>
      <p>{term.difficulty}</p>
      <button onClick={handleClick}>delete</button>
      <span> // </span>
      <Link to='/edit'>
        <button onClick={handleEdit}>edit</button>
      </Link>
    </div>
  );
};

export default Card;

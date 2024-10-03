import { Link } from 'react-router-dom';

const Card = ({ term, terms, setTerms, currentId, setCurrentId }) => {
  //delete handler
  const handleDelete = async () => {
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
    setCurrentId(term._id);
    // future implementation could make the input fields editable
  };

  return (
    <div>
      <h2>{term.title}</h2>
      <p>{term.definition}</p>
      <p>{term.difficulty}</p>
      <button onClick={handleDelete}>delete</button>
      <span> // </span>
      <button onClick={handleEdit}>edit</button>
    </div>
  );
};

export default Card;

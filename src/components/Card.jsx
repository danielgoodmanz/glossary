const Card = ({ term }) => {
  const handleClick = async () => {
    const deleteCheck = prompt('password');
    if (deleteCheck === 'delete') {
      const response = await fetch('http://localhost:3000/delete/' + term._id, {
        method: 'DELETE',
      });
      const json = await response.json();
    }
  };

  const handleEdit = () => {};
  return (
    <div>
      <h2>{term.title}</h2>
      <p>{term.definition}</p>
      <p>{term.difficulty}</p>
      <span onClick={handleClick}>delete</span>
      <span> // </span>
      <span onClick={handleEdit}>edit</span>
    </div>
  );
};

export default Card;

const Card = (props) => {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.definition}</p>
      <p>{props.difficulty}</p>
    </div>
  );
};

export default Card;

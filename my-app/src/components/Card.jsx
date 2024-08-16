import Types from "prop-types";

export default function Card(props) {
  const { name, img, color } = props;
  return (
    <button
      key={name}
      className="card"
      title={name}
      id={name}
      style={{ "--color": `${color}` }}
    >
      <span className="text">YOU PICKED</span>
      <img src={img} alt={name} />
    </button>
  );
}

Card.propTypes = {
  name: Types.string.isRequired,
  img: Types.string.isRequired,
  color: Types.string.isRequired,
};

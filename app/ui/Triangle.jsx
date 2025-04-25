const Triangle = ({ direction, size, color }) => {
  const rotation = {
    up: 'rotate-0',
    down: 'rotate-180',
  }[direction];

  return (
    <svg
      className={`${size} ${rotation} ${color}`}
      viewBox="0 0 100 60"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <polygon points="50,0 0,60 100,60" />
    </svg>
  );
};

export default Triangle;
type SquareProps = {
  items: string[];
};
function Square({ items }: SquareProps) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={`square-item-${index}`} className="flex">
          <span
            className="bg-green-dark w-2 h-2 inline-block m-2"
            aria-hidden
          />

          <span className="flex-1">{item}</span>
        </li>
      ))}
    </ul>
  );
}

const List = {
  Square,
};
export default List;

type InfoSetProps = {
  title: string;
  content: string;
};
export function InfoSet({ title, content }: InfoSetProps) {
  return (
    <article className="flex flex-col lg:flex-row text-sm">
      <h3 className="mr-2 font-medium opacity-50">{title}</h3>
      <p className="font-normal">{content}</p>
    </article>
  );
}

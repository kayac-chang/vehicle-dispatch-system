export function Background() {
  return (
    <div
      className="fixed top-0 -z-10 w-screen h-300p bg-cover"
      style={{
        backgroundPositionX: `50%`,
        backgroundImage: "url(/images/background.png)",
      }}
    />
  );
}

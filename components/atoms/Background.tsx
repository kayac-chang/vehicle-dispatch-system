export function Background() {
  return (
    <div
      className="fixed top-0 -z-10 w-screen bg-cover"
      style={{
        height: `300%`,
        backgroundPositionX: `50%`,
        backgroundImage: "url(/images/background.png)",
      }}
    />
  );
}

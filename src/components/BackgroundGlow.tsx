export function BackgroundGlow() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-primary blur-3xl animate-green-glow"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-primary blur-3xl animate-green-glow-alt"
      />
    </>
  );
}

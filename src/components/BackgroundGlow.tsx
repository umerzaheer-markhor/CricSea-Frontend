export function BackgroundGlow({ bottomGlow = true }: { bottomGlow?: boolean }) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-primary blur-3xl animate-green-glow"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-40 h-[32rem] w-[32rem] rounded-full bg-primary blur-3xl animate-green-glow-alt"
      />
      {bottomGlow ? (
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/2 h-[24rem] w-[24rem] -translate-x-1/2 translate-y-1/3 rounded-full bg-primary blur-3xl animate-green-glow"
          style={{ animationDelay: "1.75s" }}
        />
      ) : null}
    </>
  );
}

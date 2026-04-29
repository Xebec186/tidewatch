export default function BackgroundGlow() {
  return (
    <>
      <div className="pointer-events-none absolute top-[-10%] left-[-5%] h-[60%] w-[40%] rounded-full bg-primary/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[-5%] h-[70%] w-[50%] rounded-full bg-secondary-container/20 blur-[120px]" />
    </>
  );
}

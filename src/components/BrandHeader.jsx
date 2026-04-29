import { MdWaves } from "react-icons/md";

export default function BrandHeader() {
  return (
    <div className="mb-10 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-xl">
        <MdWaves className="text-on-primary" size={35} />
      </div>
      <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-primary">
        TideWatch
      </h1>
      <p className="text-sm font-medium text-on-surface-variant">
        Fluid Intelligence Systems
      </p>
    </div>
  );
}

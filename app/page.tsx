import Image from 'next/image'
import Board from "./components/Board";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col gap-4 text-slate-600">
      <Board />
    </div>
  );
}

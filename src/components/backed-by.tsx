import Image from "next/image";
import decibelMark from "@/assets/decibel.png";
import yCombinatorMark from "@/assets/y-combinator.svg";

export function BackedBy({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="inline-flex items-center gap-3 rounded-full bg-white/12 py-1.5 pr-4 pl-4 ring-1 ring-white/25 backdrop-blur-sm">
        <span className="text-[13px] font-medium text-white sm:text-sm">
          Backed by
        </span>
        <span className="flex items-center gap-2.5">
          <Image
            src={decibelMark}
            alt="Decibel"
            width={256}
            height={256}
            className="size-5 shrink-0"
          />
          <Image
            src={yCombinatorMark}
            alt="Y Combinator"
            width={256}
            height={256}
            className="size-5 shrink-0 rounded-[3px]"
          />
        </span>
      </div>
    </div>
  );
}

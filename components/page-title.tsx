import { oswald } from "../app/fonts";
import Image from "next/image";

export default function PageTitle({ title }: { title: string | null }) {
  return (
    <div className="flex justify-start items-center gap-4 text-white border-b border-white/70 py-5">
      <button
        type="button"
        onClick={() => window.history.back()}
        className="cursor-pointer"
      >
        <Image
          src="/images/go-back-light.png"
          alt="go back"
          width={30}
          height={30}
          className="object-cover"
        />
      </button>
      <p className={`text-lg ${oswald.className} font-semibold`}>{title}</p>
    </div>
  );
}

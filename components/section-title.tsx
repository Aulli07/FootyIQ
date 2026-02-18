import { oswald } from "../app/fonts";

export default function HomeTitleSection({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2">
      <p
        className={`text-lg tracking-wide ${oswald.className} text-white font-heading`}
      >
        {title}
      </p>
    </div>
  );
}

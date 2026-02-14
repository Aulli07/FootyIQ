import { oswald } from "../fonts";

export default function TitleSection({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center">
      <p className={`text-center text-white ${oswald.className} text-lg font-medium`}>
        {title}
      </p>
    </div>
  );
}

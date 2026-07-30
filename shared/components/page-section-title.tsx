import { oswald } from "@/app/font-icons/fonts";

export default function TitleSection({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center">
      <p
        className={`text-center text-light-text-primary dark:text-dark-text-primary ${oswald.className} text-lg font-medium`}
      >
        {title}
      </p>
    </div>
  );
}

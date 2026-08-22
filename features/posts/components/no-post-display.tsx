import { poppins } from "@/app/font-icons/fonts";


export function NoPostDisplay() {
  return (
    <main className="px-4 py-6 min-h-[80vh] text-light-text-primary dark:text-dark-text-primary">
      <div className="max-w-3xl mx-auto border border-light-ui-border dark:border-white/20 rounded-2xl bg-light-background-card dark:bg-white/5 p-6">
        <p
          className={`${poppins.className} text-light-text-secondary dark:text-dark-text-secondary text-sm`}
        >
          Post not found.
        </p>
      </div>
    </main>
  );
}
import { RefObject } from "react";


export function PostTextAreaUI({myPostRef}: {myPostRef: RefObject<HTMLTextAreaElement | null>}) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-10 w-10 shrink-0 rounded-full border border-black bg-gradient-to-br from-emerald-500 to-teal-500" />

      <div className="flex-1 min-h-0">
        <textarea
          ref={myPostRef}
          placeholder="What's happening?"
          className="overflow-hidden min-h-30 auto w-full resize-none bg-transparent text-lg text-light-text-primary placeholder:text-light-text-muted focus:outline-none dark:text-dark-text-primary dark:placeholder:text-dark-text-muted"
          onChange={() => {
            const current = myPostRef.current;
            if (current) {
              current.style.height = "auto";
              current.style.height = `${current.scrollHeight}px`;
            }
          }}
        />
      </div>
    </div>
  )
}
import { AnimatePresence, motion } from "framer-motion";
import { oswald } from "@/app/font-icons/fonts";
import { createPortal } from "react-dom";
import type { ReactNode, RefObject } from "react";

type DropdownShellProps = {
  menuRef: RefObject<HTMLUListElement | null>;
  label: string;
  children: ReactNode;
};

export function DropdownShell({
  menuRef,
  label,
  children,
}: DropdownShellProps) {
  return createPortal(
    <AnimatePresence>
      <motion.ul
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 20 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        ref={menuRef}
        style={{ position: "absolute" }}
        className="absolute z-[99999] w-full bottom-0 mt-2 min-h-[62vh] max-h-[62vh] overflow-hidden overflow-y-auto rounded-2xl border border-light-ui-border/80 bg-light-background-card/98 text-light-text-primary shadow-2xl shadow-slate-300/25 ring-1 ring-emerald-500/10 backdrop-blur dark:border-white/10 dark:bg-[#0b1216]/95 dark:text-dark-text-primary dark:shadow-black/30 dark:ring-white/10"
      >
        {/* <div className="sticky top-0 z-10 border-b border-light-ui-border/70 bg-light-background-card/95 px-4 py-3 dark:border-white/10 dark:bg-[#0b1216]/95">
          <p
            className={`${oswald.className} text-base font-semibold uppercase tracking-wide text-light-text-primary dark:text-dark-text-primary`}
          >
            {label}
          </p>
        </div> */}

        <div className="px-3 py-3">{children}</div>
      </motion.ul>
    </AnimatePresence>,
    document.body,
  );
}

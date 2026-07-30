import { useRef, useEffect, useLayoutEffect } from "react";



export function useOnClickOutside(
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  isOpen: boolean,
) {

  const containerRef = useRef<HTMLDivElement >(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);   
  const menuRef = useRef<HTMLUListElement | null>(null);

  const updateMenuPosition = () => {
    const trigger = triggerRef.current;
    if (!trigger) return;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) return;

      if (triggerRef.current?.contains(target)) return;
      if (menuRef.current?.contains(target)) return;
      if (containerRef.current?.contains(target)) return;

      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) return;
    updateMenuPosition();

    const onScrollOrResize = () => updateMenuPosition();
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("scroll", onScrollOrResize, true);
    return () => {
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("scroll", onScrollOrResize, true);
    };
  }, [isOpen]);

  return {containerRef, triggerRef, menuRef}
}

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function MethodSelect({ value, onChange, options, bordered = false }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, openUp: false });
  const ref = useRef(null);
  const dropdownRef = useRef(null);

  const DROPDOWN_HEIGHT = 160;
  const DROPDOWN_WIDTH = 80;
  const GAP = 4;

  const calcPos = () => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const openUp = spaceBelow < DROPDOWN_HEIGHT && spaceAbove > spaceBelow;
    const top = openUp ? rect.top - GAP : rect.bottom + GAP;
    const left = Math.min(rect.left, window.innerWidth - DROPDOWN_WIDTH - 8);
    setPos({ top, left, openUp });
  };

  const handleOpen = () => {
    calcPos();
    setOpen((o) => !o);
  };

  useEffect(() => {
    const handler = (e) => {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      )
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const update = () => calcPos();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open]);

  const normalized = options.map((o) =>
    typeof o === "string" ? { value: o, label: o } : o,
  );
  const selected = normalized.find((o) => o.value === value);

  const dropdown = (
    <div
      ref={dropdownRef}
      style={{
        position: "fixed",
        left: pos.left,
        zIndex: 99999,
        ...(pos.openUp
          ? { bottom: window.innerHeight - pos.top }
          : { top: pos.top }),
      }}
    >
      <div className="bg-[#0d1314] border border-acid/30 rounded shadow-xl shadow-black/60 overflow-hidden min-w-18">
        {normalized.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => {
              onChange(opt.value);
              setOpen(false);
            }}
            className={`w-full text-left px-3 py-1.5 text-[13px] font-display tracking-widest
              transition-colors duration-100 cursor-pointer whitespace-nowrap
              ${
                opt.value === value
                  ? "text-acid bg-acid/10"
                  : "text-body hover:text-acid hover:bg-acid/5"
              }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={handleOpen}
        className={`flex items-center gap-1.5 font-display text-acid outline-none
          text-[15px] cursor-pointer transition-colors
          ${
            bordered
              ? "bg-black/40 border border-acid/30 px-1.5 py-1 rounded hover:border-acid/60"
              : "px-1.5 py-0.5 hover:text-acid/70"
          }`}
      >
        {selected?.label ?? value}
        <svg
          className={`w-2 h-2 shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 10 6"
          fill="none"
        >
          <path
            d="M1 1l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open && createPortal(dropdown, document.body)}
    </div>
  );
}

export function CabinMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M5 15.5 16 6l11 9.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M8 14.8V25h16V14.8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M14 25v-6h4v6" stroke="currentColor" strokeWidth="1.75" />
      <path d="M16 6V3.5" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

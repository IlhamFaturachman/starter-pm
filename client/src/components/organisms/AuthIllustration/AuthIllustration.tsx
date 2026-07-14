export function AuthIllustration() {
  return (
    <div className="relative transition-transform hover:-translate-y-2">
      <div className="absolute inset-0 scale-75 rounded-full bg-brand-blue opacity-10 blur-[80px] dark:opacity-20" />
      <svg
        viewBox="0 0 240 240"
        className="relative z-10 h-auto w-full max-w-[300px] drop-shadow-2xl"
        aria-hidden="true"
      >
        <path
          d="M50,120 C30,170 80,220 130,210 C180,200 210,140 190,90 C170,40 90,30 50,120 Z"
          fill="#0C5EAD"
          opacity="0.15"
          className="dark:opacity-30"
        />
        <path
          d="M50,100 L120,130 L190,100 M120,130 L120,200"
          stroke="#F99823"
          strokeWidth="2"
          fill="none"
          strokeDasharray="6 4"
          opacity="0.6"
        />
        <g fill="#1E293B" stroke="#0C5EAD" strokeWidth="2.5">
          <ellipse cx="50" cy="85" rx="22" ry="8" fill="#0C5EAD" opacity="0.8" />
          <path d="M28,85 v25 a22,8 0 0,0 44,0 v-25" />
          <ellipse cx="50" cy="110" rx="22" ry="8" />
          <ellipse cx="190" cy="85" rx="22" ry="8" fill="#0C5EAD" opacity="0.8" />
          <path d="M168,85 v25 a22,8 0 0,0 44,0 v-25" />
          <ellipse cx="190" cy="110" rx="22" ry="8" />
          <ellipse cx="120" cy="40" rx="22" ry="8" fill="#0C5EAD" opacity="0.8" />
          <path d="M98,40 v25 a22,8 0 0,0 44,0 v-25" />
          <ellipse cx="120" cy="65" rx="22" ry="8" />
        </g>
        <path
          d="M120,90 L160,105 L160,140 C160,175 120,195 120,195 C120,195 80,175 80,140 L80,105 Z"
          fill="#1E293B"
          stroke="#0C5EAD"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M120,98 L152,110 L152,138 C152,165 120,182 120,182 C120,182 88,165 88,138 L88,110 Z"
          fill="#0C5EAD"
          opacity="0.2"
        />
        <path
          d="M100,145 L115,160 L140,125"
          stroke="#F99823"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="170" cy="50" r="4" fill="#F99823" />
        <circle cx="40" cy="160" r="3" fill="#F99823" />
        <circle cx="190" cy="170" r="5" fill="#F99823" opacity="0.6" />
      </svg>
    </div>
  );
}

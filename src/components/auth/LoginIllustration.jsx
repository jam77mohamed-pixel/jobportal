import React from 'react';

/**
 * 2D Vector Illustration matching the reference design:
 * Features a modern smartphone, megaphone broadcasting notice period talent,
 * floating career speech bubbles, clouds, and walking professional figures.
 */
export const LoginIllustration = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-4 select-none">
      <svg
        viewBox="0 0 420 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[360px] h-auto drop-shadow-sm"
      >
        <defs>
          <linearGradient id="screenGrad" x1="160" y1="40" x2="260" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EFF6FF" />
            <stop offset="100%" stopColor="#DBEAFE" />
          </linearGradient>

          <linearGradient id="phoneBody" x1="150" y1="30" x2="270" y2="290" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          <linearGradient id="speakerGrad" x1="260" y1="110" x2="340" y2="170" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>

          <linearGradient id="speakerAccent" x1="290" y1="100" x2="330" y2="150" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>

          <linearGradient id="bubbleBlue" x1="60" y1="70" x2="140" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          <linearGradient id="bubbleCyan" x1="270" y1="60" x2="350" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          <filter id="vectorGlow" x="0" y="0" width="420" height="340" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#2563EB" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* Soft Background Aura / Cloud base */}
        <ellipse cx="210" cy="290" rx="170" ry="22" fill="#EFF6FF" />
        <ellipse cx="210" cy="285" rx="130" ry="14" fill="#DBEAFE" />

        {/* Floating Clouds */}
        {/* Left Cloud */}
        <path
          d="M60 130C54 130 50 134 50 140C44 140 40 144 40 150C40 156 45 160 51 160H89C95 160 100 155 100 150C100 144 96 140 90 140C89 134 83 130 76 130C72 130 68 132 66 135C64 132 62 130 60 130Z"
          fill="#E0F2FE"
          opacity="0.8"
        />
        {/* Right Cloud */}
        <path
          d="M330 90C326 90 323 93 323 97C319 97 316 100 316 104C316 108 320 111 324 111H351C355 111 358 108 358 104C358 100 355 97 351 97C350 93 346 90 341 90C338 90 336 91 334 93C333 91 331 90 330 90Z"
          fill="#E0F2FE"
          opacity="0.9"
        />

        {/* Center: Smartphone Frame */}
        <rect
          x="145"
          y="35"
          width="130"
          height="240"
          rx="22"
          fill="url(#phoneBody)"
          stroke="#334155"
          strokeWidth="3"
        />
        {/* Smartphone Screen */}
        <rect
          x="153"
          y="45"
          width="114"
          height="220"
          rx="15"
          fill="url(#screenGrad)"
        />

        {/* Phone Notch & Speaker */}
        <rect x="188" y="49" width="44" height="4" rx="2" fill="#64748B" />

        {/* Screen Content: Job Alert Card */}
        <rect x="162" y="66" width="96" height="52" rx="8" fill="#FFFFFF" stroke="#BFDBFE" strokeWidth="1" />
        <rect x="170" y="76" width="40" height="6" rx="3" fill="#2563EB" />
        <rect x="170" y="86" width="65" height="4" rx="2" fill="#94A3B8" />
        <rect x="170" y="94" width="50" height="4" rx="2" fill="#CBD5E1" />
        <circle cx="242" cy="79" r="6" fill="#10B981" />
        <path d="M240 79L241.5 80.5L244.5 77.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />

        {/* Screen Content: Notice Period Fast Track Card */}
        <rect x="162" y="126" width="96" height="62" rx="8" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="1" />
        <rect x="170" y="136" width="55" height="6" rx="3" fill="#0284C7" />
        <rect x="170" y="146" width="75" height="4" rx="2" fill="#64748B" />
        <rect x="170" y="154" width="48" height="4" rx="2" fill="#94A3B8" />
        <rect x="170" y="166" width="38" height="12" rx="4" fill="#DBEAFE" />
        <text x="174" y="175" fill="#1E40AF" fontSize="7" fontWeight="bold">15d Notice</text>

        {/* Screen Content: Action Pill */}
        <rect x="162" y="196" width="96" height="20" rx="6" fill="#2563EB" />
        <text x="185" y="210" fill="#FFFFFF" fontSize="8" fontWeight="bold">Instant Match</text>

        {/* Megaphone / Loudspeaker */}
        <g transform="translate(195, 80)">
          {/* Sound wave arcs */}
          <path d="M125 15C132 24 132 38 125 47" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M135 7C146 21 146 41 135 55" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M145 0C160 18 160 44 145 62" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2" />

          {/* Cone body */}
          <path
            d="M55 35L105 10V52L55 35Z"
            fill="url(#speakerGrad)"
            stroke="#1D4ED8"
            strokeWidth="1.5"
          />
          {/* Bell rim */}
          <ellipse cx="105" cy="31" rx="6" ry="21" fill="#0284C7" stroke="#0369A1" strokeWidth="1.5" />
          {/* Sound emitter center */}
          <ellipse cx="106" cy="31" rx="2.5" ry="9" fill="#E0F2FE" />
          {/* Megaphone back handle & grip */}
          <rect x="42" y="27" width="15" height="15" rx="3" fill="#1E293B" />
          <path d="M48 42L42 62C41 65 44 68 47 68H51C54 68 56 65 55 62L51 42" fill="#F59E0B" />
          {/* Sound pulse star */}
          <polygon points="122,5 125,12 132,14 126,18 127,25 121,21 115,24 117,17 112,12 119,11" fill="#FBBF24" />
        </g>

        {/* Floating Speech / Notification Bubbles */}
        {/* Left Bubble: "15 Days Notice" */}
        <g transform="translate(48, 65)">
          <rect width="94" height="34" rx="10" fill="url(#bubbleBlue)" filter="url(#vectorGlow)" />
          <path d="M30 34L35 41L42 34H30Z" fill="#1D4ED8" />
          <circle cx="18" cy="17" r="7" fill="#FFFFFF" fillOpacity="0.2" />
          <path d="M15 17L17 19L21 15" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <text x="32" y="16" fill="#FFFFFF" fontSize="9" fontWeight="bold">Notice Period</text>
          <text x="32" y="26" fill="#BFDBFE" fontSize="8">Active Candidate</text>
        </g>

        {/* Right Bubble: "Immediate Hiring" */}
        <g transform="translate(265, 48)">
          <rect width="98" height="32" rx="10" fill="url(#bubbleCyan)" filter="url(#vectorGlow)" />
          <path d="M70 32L65 38L58 32H70Z" fill="#0284C7" />
          <circle cx="82" cy="16" r="6" fill="#FFFFFF" fillOpacity="0.2" />
          <circle cx="82" cy="16" r="3" fill="#FFFFFF" />
          <text x="12" y="15" fill="#FFFFFF" fontSize="9" fontWeight="bold">Immediate Join</text>
          <text x="12" y="25" fill="#E0F2FE" fontSize="8">0–15 Days Match</text>
        </g>

        {/* Walking Figures at Base */}
        {/* Left Character: Professional Candidate Walking with Briefcase */}
        <g transform="translate(75, 175)">
          {/* Head */}
          <circle cx="35" cy="20" r="9" fill="#FBBF24" />
          {/* Hair */}
          <path d="M26 18C26 13 30 10 36 10C42 10 44 14 44 18C41 17 38 18 36 18C33 18 30 17 26 18Z" fill="#1E293B" />
          {/* Body / Suit jacket */}
          <path d="M24 30C24 28 26 27 28 27H42C44 27 46 28 46 30L48 62H22L24 30Z" fill="#2563EB" />
          {/* Tie */}
          <path d="M34 27L36 38L34 42L32 38L34 27Z" fill="#F59E0B" />
          {/* Left Leg */}
          <path d="M26 62L22 92H28L32 62H26Z" fill="#1E293B" />
          {/* Right Leg (Walking step) */}
          <path d="M42 62L48 90H42L36 62H42Z" fill="#0F172A" />
          {/* Shoes */}
          <rect x="18" y="90" width="12" height="5" rx="2" fill="#0F172A" />
          <rect x="44" y="88" width="12" height="5" rx="2" fill="#0F172A" />
          {/* Briefcase in hand */}
          <rect x="10" y="55" width="14" height="11" rx="2" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
          <path d="M14 55V52H20V55" stroke="#B45309" strokeWidth="1" />
        </g>

        {/* Right Character: Recruiter / Talent Leader with Tablet */}
        <g transform="translate(280, 180)">
          {/* Head */}
          <circle cx="35" cy="18" r="9" fill="#FCD34D" />
          {/* Hair (Longer style) */}
          <path d="M26 16C26 10 33 8 38 8C43 8 45 12 45 18C45 25 43 27 42 28L38 27C35 27 34 25 34 21L26 16Z" fill="#7C2D12" />
          {/* Blazer / Attire */}
          <path d="M24 28C24 26 26 25 28 25H42C44 25 46 26 46 28L47 58H23L24 28Z" fill="#0EA5E9" />
          {/* Inner top */}
          <polygon points="32,25 38,25 35,34" fill="#FFFFFF" />
          {/* Trousers */}
          <path d="M26 58L28 88H34L33 58H26Z" fill="#334155" />
          <path d="M40 58L42 88H36L37 58H40Z" fill="#1E293B" />
          {/* Shoes */}
          <rect x="25" y="87" width="10" height="4" rx="2" fill="#0F172A" />
          <rect x="37" y="87" width="10" height="4" rx="2" fill="#0F172A" />
          {/* Tablet held in hand */}
          <rect x="44" y="38" width="14" height="18" rx="2" fill="#0F172A" stroke="#38BDF8" strokeWidth="1" />
          <rect x="46" y="41" width="10" height="12" rx="1" fill="#FFFFFF" />
        </g>
      </svg>

      <div className="text-center mt-2 px-6">
        <h3 className="text-base font-extrabold text-slate-800 tracking-tight">
          Accelerated Notice Period Matching
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
          Connecting companies with pre-vetted professionals ready to join within 0 to 30 days.
        </p>
      </div>
    </div>
  );
};

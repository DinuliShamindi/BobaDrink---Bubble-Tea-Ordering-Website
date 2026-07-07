import { useId } from 'react';

/* ============================================
   BobaBliss — Cup Illustration
   Renders the signature boba cup SVG used
   across the nav mark, hero, and drink cards.
   ============================================ */
export default function CupIcon({ liquidColor, animated = true, pearlColor = "#3B2A20" }) {
  const clipId = useId();

  return (
    <svg
      viewBox="0 0 120 160"
      className={`cup-icon${animated ? " cup-icon--animated" : ""}`}
      role="img"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M22 46 L98 46 L88 148 Q88 154 82 154 L38 154 Q32 154 32 148 Z" />
        </clipPath>
      </defs>
      {/* lid */}
      <rect x="16" y="34" width="88" height="14" rx="7" fill="var(--brew)" opacity="0.9" />
      {/* straw */}
      <rect
        x="70"
        y="4"
        width="10"
        height="42"
        rx="4"
        fill="var(--peach-deep)"
        transform="rotate(8 75 25)"
      />
      {/* cup body outline */}
      <path
        d="M22 46 L98 46 L88 148 Q88 154 82 154 L38 154 Q32 154 32 148 Z"
        fill="#FFFFFF"
        stroke="var(--brew)"
        strokeWidth="3"
      />
      {/* liquid */}
      <g clipPath={`url(#${clipId})`}>
        <rect x="22" y="70" width="76" height="90" fill={liquidColor} />
        <circle className="pearl" cx="46" cy="140" r="7" fill={pearlColor} />
        <circle className="pearl" cx="64" cy="146" r="7" fill={pearlColor} />
        <circle className="pearl" cx="80" cy="138" r="7" fill={pearlColor} />
        <circle className="pearl" cx="55" cy="128" r="7" fill={pearlColor} />
        <circle className="pearl" cx="72" cy="124" r="7" fill={pearlColor} />
      </g>
      {/* cup outline again on top for crisp edge */}
      <path
        d="M22 46 L98 46 L88 148 Q88 154 82 154 L38 154 Q32 154 32 148 Z"
        fill="none"
        stroke="var(--brew)"
        strokeWidth="3"
      />
    </svg>
  );
}

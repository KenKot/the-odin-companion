export default function RadialProgressBar({ completed, total }) {
  const percentage = (completed / total) * 100;
  const radius = 35; // Reduced from 45 to 35
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg
      width="80" // Reduced from 100 to 80
      height="80" // Reduced from 100 to 80
      viewBox="0 0 100 100"
      className="progress-ring"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffed4a" /> {/* Yellow */}
          <stop offset="50%" stopColor="#ff9f43" /> {/* Orange */}
          <stop offset="100%" stopColor="#f56036" /> {/* Red */}
        </linearGradient>
      </defs>
      <circle
        className="progress-ring__circle"
        stroke="#d1d5db"
        strokeWidth="8" // Reduced from 10 to 8
        fill="transparent"
        r={radius}
        cx="50"
        cy="50"
      />
      <circle
        className="progress-ring__circle"
        stroke="url(#gradient)"
        strokeWidth="8" // Reduced from 10 to 8
        fill="transparent"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        r={radius}
        cx="50"
        cy="50"
      />
      <text
        x="50"
        y="50"
        textAnchor="middle"
        fill="white"
        fontSize="14px"
        dy=".3em"
        className="percentage-text"
      >
        {`${percentage.toFixed(0)}%`}
      </text>
    </svg>
  );
}

interface WaveDividerProps {
  flip?: boolean;
  color?: 'cream' | 'white' | 'cream-dark';
  className?: string;
}

export function WaveDivider({ flip = false, color = 'cream', className = '' }: WaveDividerProps) {
  const fillMap = {
    cream: '#FDF8F0',
    white: '#ffffff',
    'cream-dark': '#F5EDE0',
  };

  const fill = fillMap[color];

  return (
    <div
      className={`relative w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''} ${className}`}
      style={{ marginTop: flip ? 0 : -1, marginBottom: flip ? -1 : 0 }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full h-12 sm:h-16 md:h-20"
      >
        {/* Watercolor-style organic wave with multiple layers */}
        <path
          d="M0,40 C120,65 240,20 360,35 C480,50 540,15 720,30 C900,45 1020,10 1200,35 C1320,50 1380,25 1440,40 L1440,80 L0,80 Z"
          fill={fill}
          opacity="0.4"
        />
        <path
          d="M0,50 C180,25 300,55 480,35 C660,15 780,55 960,40 C1140,25 1260,50 1440,35 L1440,80 L0,80 Z"
          fill={fill}
          opacity="0.6"
        />
        <path
          d="M0,55 C160,35 320,60 480,45 C640,30 800,55 960,42 C1120,30 1280,52 1440,45 L1440,80 L0,80 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

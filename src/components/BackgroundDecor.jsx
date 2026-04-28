import React from 'react';

export default function BackgroundDecor() {
  return (
    <>
      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        @keyframes floatYAlt {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(8px); }
        }

        @keyframes pulseDot {
          0%, 100% { opacity: 0.12; }
          50% { opacity: 0.22; }
        }

        @keyframes dashFlow {
          from { stroke-dashoffset: 10; }
          to { stroke-dashoffset: 0; }
        }

        .float-curve-1 {
          animation: floatY 23s ease-in-out infinite;
          transform-origin: center;
        }

        .float-curve-2 {
          animation: floatY 18s ease-in-out infinite;
          transform-origin: center;
        }

        .float-curve-3 {
          animation: floatYAlt 20s ease-in-out infinite;
          transform-origin: center;
        }

        .pulse-dot-1 {
          animation: pulseDot 8s ease-in-out infinite;
        }

        .pulse-dot-2 {
          animation: pulseDot 8s ease-in-out infinite 3s;
        }

        .pulse-dot-3 {
          animation: pulseDot 8s ease-in-out infinite 6s;
        }

        .pulse-dot-4 {
          animation: pulseDot 8s ease-in-out infinite 9s;
        }

        .dash-flow-line {
          animation: dashFlow 8s linear infinite;
        }
      `}</style>

      <svg
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{
          zIndex: 0,
          overflow: 'hidden',
          filter: 'blur(0.4px)',
        }}
        aria-hidden="true"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Main gradient from logo colors */}
          <linearGradient
            id="rufusGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#1A6EDB" />
            <stop offset="100%" stopColor="#00C2D1" />
          </linearGradient>

          {/* Radial gradient for node glow effects */}
          <radialGradient id="nodeGlow">
            <stop offset="0%" stopColor="#00C2D1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00C2D1" stopOpacity="0" />
          </radialGradient>

          {/* Radial gradient for glow blobs */}
          <radialGradient id="glowBlobTopRight" cx="85%" cy="10%">
            <stop offset="0%" stopColor="#00C2D1" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#00C2D1" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="glowBlobBottomLeft" cx="10%" cy="90%">
            <stop offset="0%" stopColor="#1A6EDB" stopOpacity="0.035" />
            <stop offset="100%" stopColor="#1A6EDB" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* === GLOW BLOBS (background) === */}
        <circle
          cx="1620"
          cy="108"
          r="300"
          fill="url(#glowBlobTopRight)"
          opacity="0.025"
        />
        <circle
          cx="192"
          cy="972"
          r="250"
          fill="url(#glowBlobBottomLeft)"
          opacity="0.025"
        />

        {/* === LARGE FLOWING CURVES === */}

        {/* Curve 1: Top-left arc (flowing down and right) */}
        <path
          className="float-curve-1"
          d="M 100,50 Q 200,150 250,300 T 350,600"
          fill="none"
          stroke="url(#rufusGradient)"
          strokeWidth="2"
          opacity="0.04"
          strokeLinecap="round"
        />

        {/* Curve 2: Bottom-right curve (flowing up and left) */}
        <path
          className="float-curve-2"
          d="M 1820,1030 Q 1720,900 1650,750 T 1500,400"
          fill="none"
          stroke="url(#rufusGradient)"
          strokeWidth="2"
          opacity="0.04"
          strokeLinecap="round"
        />

        {/* Curve 3: Top-right S-curve (smaller, decorative) */}
        <path
          className="float-curve-3"
          d="M 1700,100 Q 1600,250 1550,350 Q 1520,450 1600,500"
          fill="none"
          stroke="url(#rufusGradient)"
          strokeWidth="2"
          opacity="0.03"
          strokeLinecap="round"
        />

        {/* Curve 4: Center-left horizontal sweep (very faint) */}
        <path
          d="M 50,540 Q 300,480 600,520 Q 750,540 900,500"
          fill="none"
          stroke="url(#rufusGradient)"
          strokeWidth="1.5"
          opacity="0.025"
          strokeLinecap="round"
        />

        {/* === CIRCUIT NODES (dots at curve endpoints and midpoints) === */}

        {/* Nodes for Curve 1 */}
        <circle
          cx="100"
          cy="50"
          r="5"
          fill="#00C2D1"
          opacity="0.07"
        />
        <circle cx="100" cy="50" r="8" fill="url(#nodeGlow)" opacity="0.6" />

        <circle
          className="pulse-dot-1"
          cx="200"
          cy="150"
          r="3"
          fill="#1A6EDB"
          opacity="0.08"
        />

        <circle
          className="pulse-dot-2"
          cx="350"
          cy="600"
          r="5"
          fill="#00C2D1"
          opacity="0.07"
        />
        <circle cx="350" cy="600" r="8" fill="url(#nodeGlow)" opacity="0.5" />

        {/* Nodes for Curve 2 */}
        <circle
          cx="1820"
          cy="1030"
          r="5"
          fill="#00C2D1"
          opacity="0.07"
        />
        <circle cx="1820" cy="1030" r="8" fill="url(#nodeGlow)" opacity="0.6" />

        <circle
          className="pulse-dot-3"
          cx="1650"
          cy="750"
          r="3"
          fill="#1A6EDB"
          opacity="0.08"
        />

        <circle
          className="pulse-dot-4"
          cx="1500"
          cy="400"
          r="5"
          fill="#00C2D1"
          opacity="0.07"
        />
        <circle cx="1500" cy="400" r="8" fill="url(#nodeGlow)" opacity="0.5" />

        {/* Nodes for Curve 3 */}
        <circle
          cx="1700"
          cy="100"
          r="4"
          fill="#00C2D1"
          opacity="0.06"
        />

        <circle
          cx="1600"
          cy="500"
          r="4"
          fill="#1A6EDB"
          opacity="0.07"
        />

        {/* Connector lines with dashed animation */}
        <line
          className="dash-flow-line"
          x1="100"
          y1="50"
          x2="200"
          y2="150"
          stroke="#00C2D1"
          strokeWidth="1"
          opacity="0.03"
          strokeDasharray="4 6"
        />

        <line
          className="dash-flow-line"
          x1="200"
          y1="150"
          x2="350"
          y2="600"
          stroke="#00C2D1"
          strokeWidth="1"
          opacity="0.025"
          strokeDasharray="4 6"
          style={{ animationDelay: '1s' }}
        />

        <line
          className="dash-flow-line"
          x1="1820"
          y1="1030"
          x2="1500"
          y2="400"
          stroke="#00C2D1"
          strokeWidth="1"
          opacity="0.03"
          strokeDasharray="4 6"
          style={{ animationDelay: '2s' }}
        />

        {/* === SMALL SCATTERED CIRCUIT FRAGMENTS === */}

        {/* Fragment 1: Top-left quadrant */}
        <g opacity="0.03">
          <path
            d="M 300,200 L 340,200 L 340,240"
            stroke="#1A6EDB"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="340" cy="240" r="1.5" fill="#1A6EDB" />
        </g>

        {/* Fragment 2: Top area */}
        <g opacity="0.03">
          <path
            d="M 800,150 L 800,190 L 840,190"
            stroke="#1A6EDB"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="840" cy="190" r="1.5" fill="#1A6EDB" />
        </g>

        {/* Fragment 3: Top-right quadrant */}
        <g opacity="0.03">
          <path
            d="M 1450,180 L 1490,180 L 1490,220"
            stroke="#1A6EDB"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="1490" cy="220" r="1.5" fill="#1A6EDB" />
        </g>

        {/* Fragment 4: Right side, upper */}
        <g opacity="0.03">
          <path
            d="M 1750,400 L 1750,440 L 1790,440"
            stroke="#1A6EDB"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="1790" cy="440" r="1.5" fill="#1A6EDB" />
        </g>

        {/* Fragment 5: Center area */}
        <g opacity="0.03">
          <path
            d="M 960,500 L 1000,500 L 1000,540"
            stroke="#1A6EDB"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="1000" cy="540" r="1.5" fill="#1A6EDB" />
        </g>

        {/* Fragment 6: Right side, lower */}
        <g opacity="0.03">
          <path
            d="M 1600,700 L 1640,700 L 1640,740"
            stroke="#1A6EDB"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="1640" cy="740" r="1.5" fill="#1A6EDB" />
        </g>

        {/* Fragment 7: Bottom area */}
        <g opacity="0.03">
          <path
            d="M 600,850 L 600,890 L 640,890"
            stroke="#1A6EDB"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="640" cy="890" r="1.5" fill="#1A6EDB" />
        </g>

        {/* Fragment 8: Bottom-left quadrant */}
        <g opacity="0.03">
          <path
            d="M 400,950 L 440,950 L 440,990"
            stroke="#1A6EDB"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="440" cy="990" r="1.5" fill="#1A6EDB" />
        </g>

        {/* Fragment 9: Center-left */}
        <g opacity="0.03">
          <path
            d="M 180,650 L 220,650 L 220,690"
            stroke="#1A6EDB"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="220" cy="690" r="1.5" fill="#1A6EDB" />
        </g>

        {/* Fragment 10: Left side */}
        <g opacity="0.03">
          <path
            d="M 50,400 L 50,440 L 90,440"
            stroke="#1A6EDB"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="90" cy="440" r="1.5" fill="#1A6EDB" />
        </g>

        {/* Fragment 11: Upper-center area */}
        <g opacity="0.03">
          <path
            d="M 1200,300 L 1240,300 L 1240,340"
            stroke="#1A6EDB"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="1240" cy="340" r="1.5" fill="#1A6EDB" />
        </g>

        {/* Fragment 12: Lower-center area */}
        <g opacity="0.03">
          <path
            d="M 900,750 L 900,790 L 940,790"
            stroke="#1A6EDB"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="940" cy="790" r="1.5" fill="#1A6EDB" />
        </g>
      </svg>
    </>
  );
}

export function WorldMapBackground() {
  return (
    <svg
      viewBox="0 0 400 200"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Location pin marker: outline teardrop with small hollow circle and ground shadow */}
      <g transform="translate(300, 56)">
        <ellipse cx="0" cy="32" rx="9" ry="2.4" fill="currentColor" opacity="0.25" />
        <path
          d="M0 0C-6 0 -11 5 -11 11C-11 18 0 29 0 29C0 29 11 18 11 11C11 5 6 0 0 0Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          opacity="0.9"
        />
        <circle cx="0" cy="11" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.9" />
      </g>
    </svg>
  );
}
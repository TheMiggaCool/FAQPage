// Flor de lila: el motivo de la marca. Se usa en el Hero, el avatar y el botón flotante.
function Blossom({
  petal = "var(--lila-600)",
  center = "var(--white)",
  rotate = 0,
  size = 40,
  ...rest
}) {
  return (
    <svg
      viewBox="-50 -50 100 100"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <g transform={`rotate(${rotate})`}>
        {[0, 90, 180, 270].map((angle) => (
          <ellipse
            key={angle}
            cx="0"
            cy="-25"
            rx="16"
            ry="24"
            transform={`rotate(${angle})`}
            style={{ fill: petal }}
          />
        ))}
        <circle r="8" style={{ fill: center }} />
      </g>
    </svg>
  );
}

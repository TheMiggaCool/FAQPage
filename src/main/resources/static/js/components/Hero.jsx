
// [x, y, tamaño, color del pétalo] — forman un racimo de lilas
const FLORETS = [
  [150, 6, 54, "lila-500"],
  [112, 48, 58, "lila-600"],
  [178, 48, 58, "celeste-400"],
  [76, 96, 62, "lila-300"],
  [140, 94, 66, "white"],
  [208, 96, 60, "lila-600"],
  [40, 150, 64, "celeste-400"],
  [108, 150, 68, "lila-500"],
  [178, 150, 66, "lila-300"],
  [248, 152, 62, "white"],
  [8, 208, 60, "lila-600"],
  [76, 212, 66, "white"],
  [146, 210, 70, "celeste-400"],
  [218, 212, 66, "lila-600"],
  [288, 210, 58, "lila-500"],
];

function Hero() {
  return (
    <header className="hero">
      <div className="hero__inner">
        <div className="hero__copy">
          <h1 className="hero__title">¿En qué podemos ayudarte?</h1>
          <p className="hero__text">
            Acá están las respuestas a las consultas más comunes. Si no
            encontrás lo que buscás, escribile a Lila, nuestra asistente
            virtual.
          </p>
        </div>

        <svg
          className="hero__art"
          viewBox="0 0 360 290"
          aria-hidden="true"
          focusable="false"
        >
          {FLORETS.map(([x, y, size, color], i) => (
            <Blossom
              key={`${x}-${y}`}
              x={x}
              y={y}
              size={size}
              rotate={(i * 19) % 90}
              petal={`var(--${color})`}
              center="var(--celeste-100)"
            />
          ))}
        </svg>
      </div>
    </header>
  );
}

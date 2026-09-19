
const INITIAL_MESSAGES = [
  {
    id: 1,
    author: "lila",
    text: "¡Hola! Soy Lila, la asistente virtual del centro de ayuda. Contame qué necesitás y te doy una mano.",
  },
];

function LilaAvatar({ size = 32, inverted = false }) {
  return (
    <span
      className={`lila-avatar${inverted ? " lila-avatar--inverted" : ""}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Blossom
        size={size * 0.68}
        petal={inverted ? "var(--lila-600)" : "var(--white)"}
        center={inverted ? "var(--white)" : "var(--lila-600)"}
      />
    </span>
  );
}

function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [draft, setDraft] = useState("");

  const listRef = useRef(null);
  const inputRef = useRef(null);

  // Bajar al último mensaje cuando llega uno nuevo o se abre el chat
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
  }, [messages, isOpen]);

  // Al abrir: enfocar el input (solo si hay mouse, para no abrir el teclado en el celular)
  // y permitir cerrar con Escape.
  useEffect(() => {
    if (!isOpen) return;

    if (window.matchMedia("(hover: hover)").matches) {
      inputRef.current?.focus();
    }

    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { id: Date.now(), author: "user", text }]);
    setDraft("");

    // TODO: acá conectás tu lógica. Cuando tengas la respuesta, agregala así:
    // setMessages((prev) => [...prev, { id: Date.now(), author: "lila", text: respuesta }]);
  };

  return (
    <>
      <section
        id="lila-chat"
        className={`chat-window${isOpen ? " is-open" : ""}`}
        role="dialog"
        aria-label="Chat con Lila"
        aria-hidden={!isOpen}
      >
        <header className="chat-header">
          <LilaAvatar size={44} inverted />
          <div className="chat-header__info">
            <h2 className="chat-header__name">Lila</h2>
            <p className="chat-header__role">Asistente virtual</p>
          </div>
          <button
            type="button"
            className="chat-header__close"
            aria-label="Cerrar chat"
            onClick={() => setIsOpen(false)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </button>
        </header>

        <div
          ref={listRef}
          className="chat-messages"
          role="log"
          aria-live="polite"
          aria-label="Mensajes"
        >
          {messages.map(({ id, author, text }) =>
            author === "lila" ? (
              <div key={id} className="msg msg--lila">
                <LilaAvatar size={32} />
                <div className="msg__body">
                  <span className="msg__author">Lila</span>
                  <p className="msg__bubble">{text}</p>
                </div>
              </div>
            ) : (
              <div key={id} className="msg msg--user">
                <div className="msg__body">
                  <p className="msg__bubble">{text}</p>
                </div>
              </div>
            )
          )}
        </div>

        <form className="chat-form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            className="chat-form__input"
            placeholder="Escribí tu mensaje"
            aria-label="Escribí tu mensaje"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoComplete="off"
          />
          <button
            type="submit"
            className="chat-form__send"
            aria-label="Enviar mensaje"
            disabled={!draft.trim()}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M4 12L20 4l-4.5 16-3.5-6.5L4 12z"
                fill="currentColor"
              />
            </svg>
          </button>
        </form>
      </section>

      <button
        type="button"
        className={`chat-fab${isOpen ? " is-open" : ""}`}
        aria-label={isOpen ? "Cerrar chat con Lila" : "Abrir chat con Lila"}
        aria-expanded={isOpen}
        aria-controls="lila-chat"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="chat-fab__icon chat-fab__icon--blossom">
          <Blossom size={34} petal="var(--white)" center="var(--lila-600)" />
        </span>
        <span className="chat-fab__icon chat-fab__icon--close">
          <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </span>
      </button>
    </>
  );
}

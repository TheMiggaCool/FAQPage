// ============================================================================
//  CONFIGURACIÓN DE LA CONEXIÓN CON EL BACKEND  (todo lo que podés necesitar
//  ajustar está en este bloque y en los puntos marcados con "AJUSTAR")
// ============================================================================

// AJUSTAR: URL de tu endpoint. Coincide con el ChatController del proyecto:
//   @RequestMapping("/api/chat") + @PostMapping  →  POST /api/chat
// Como esta página la sirve el propio Spring Boot (resources/static), usamos una
// ruta relativa y no hay problemas de CORS. Si la API estuviera en otro servidor,
// poné la URL completa, por ejemplo "http://localhost:8080/api/chat".
const API_URL = "/api/chat";

// Tiempo máximo de espera (ms). Las respuestas de la IA pueden tardar unos segundos.
const REQUEST_TIMEOUT_MS = 30000;

// Mensaje que muestra Lila cuando algo falla (error de red, timeout, HTTP 4xx/5xx...).
const ERROR_MESSAGE =
    "Lo siento, tuve un problema de conexión. ¿Podrías intentar de nuevo?";

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
  const [isLoading, setIsLoading] = useState(false); // true mientras esperamos a Lila

  const listRef = useRef(null);
  const inputRef = useRef(null);
  const nextId = useRef(INITIAL_MESSAGES.length + 1); // ids únicos para cada mensaje

  // Agrega un mensaje al historial. `isError` marca los mensajes de fallo para darles otro estilo.
  const addMessage = (author, text, isError = false) => {
    setMessages((prev) => [
      ...prev,
      { id: nextId.current++, author, text, isError },
    ]);
  };

  // Bajar al último mensaje cuando llega uno nuevo, aparece "escribiendo…" o se abre el chat
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading, isOpen]);

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

  // ==========================================================================
  //  ENVÍO DE MENSAJES: acá se hace la conexión con el backend
  // ==========================================================================
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || isLoading) return; // evita enviar vacío o mensajes duplicados en paralelo

    // 1) Mostrar enseguida el mensaje del usuario y activar el indicador de carga
    addMessage("user", text);
    setDraft("");
    setIsLoading(true);

    // 2) Timeout: si el servidor no responde a tiempo, cancelamos la petición
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      // 3) Petición al backend con fetch
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        // AJUSTAR (envío): nombre del campo que espera tu backend.
        // Coincide con el record ChatRequest(String mensaje) del proyecto:
        //   { "mensaje": "texto del usuario" }
        body: JSON.stringify({ mensaje: text }),

        signal: controller.signal,
      });

      // fetch NO lanza error por códigos 4xx/5xx, así que lo hacemos a mano
      if (!response.ok) {
        throw new Error(`El servidor respondió con el estado ${response.status}`);
      }

      const data = await response.json();

      // AJUSTAR (respuesta): nombre del campo con el texto de la IA.
      // Coincide con el record ChatResponse(String respuesta) del proyecto:
      //   { "respuesta": "texto de la IA" }
      const reply = data.respuesta;

      // NO FUNCIONA CUANDO GEMINI RESPONDE. SOLO CUANDO RESPONDE GROQ.

      if (typeof reply !== "string" || !reply.trim()) {
        throw new Error("La respuesta del servidor no incluye el campo esperado");
      }
      // 4) Éxito: agregar la respuesta de Lila al historial
      addMessage("lila", reply);

    } catch (error) {
      // 5) Cualquier fallo (red caída, timeout, HTTP de error, JSON inválido...)
      //    termina acá. El detalle técnico queda en la consola para depurar.
      console.error("Error al consultar a Lila:", error);
      addMessage("lila", ERROR_MESSAGE, true);
    } finally {
      // 6) Pase lo que pase: limpiar el timeout y ocultar el indicador de carga
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
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
            {messages.map(({ id, author, text, isError }) =>
                author === "lila" ? (
                    <div key={id} className="msg msg--lila">
                      <LilaAvatar size={32} />
                      <div className="msg__body">
                        <span className="msg__author">Lila</span>
                        <p className={`msg__bubble${isError ? " msg__bubble--error" : ""}`}>
                          {text}
                        </p>
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

            {/* Indicador de carga: visible solo mientras esperamos la respuesta */}
            {isLoading && (
                <div className="msg msg--lila">
                  <LilaAvatar size={32} />
                  <div className="msg__body">
                    <span className="msg__author">Lila está escribiendo…</span>
                    <p className="msg__bubble msg__bubble--typing" aria-hidden="true">
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                    </p>
                  </div>
                </div>
            )}
          </div>

          <form className="chat-form" onSubmit={handleSendMessage}>
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
                disabled={!draft.trim() || isLoading}
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

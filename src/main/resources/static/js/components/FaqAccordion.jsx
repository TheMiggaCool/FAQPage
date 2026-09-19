
function FaqAccordion({ items = FAQS }) {
  // Cada pregunta se abre y se cierra de forma independiente.
  const [openIds, setOpenIds] = useState([]);

  const toggle = (id) =>
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((openId) => openId !== id) : [...prev, id]
    );

  return (
    <section className="faq" aria-labelledby="faq-title">
      <h2 id="faq-title" className="faq__title">
        Preguntas frecuentes
      </h2>

      <ul className="faq__list">
        {items.map(({ id, question, answer }) => {
          const isOpen = openIds.includes(id);
          return (
            <li key={id} className={`faq-item${isOpen ? " is-open" : ""}`}>
              <h3 className="faq-item__heading">
                <button
                  type="button"
                  id={`faq-trigger-${id}`}
                  className="faq-item__trigger"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${id}`}
                  onClick={() => toggle(id)}
                >
                  <span>{question}</span>
                  <span className="faq-item__icon" aria-hidden="true" />
                </button>
              </h3>

              <div
                id={`faq-panel-${id}`}
                role="region"
                aria-labelledby={`faq-trigger-${id}`}
                className="faq-item__panel"
              >
                <div className="faq-item__panel-inner">
                  <p className="faq-item__answer">{answer}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

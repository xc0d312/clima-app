function LoadingState() {
  return (
    <section className="feedback-card loading-card" aria-live="polite">
      <h2>Consultando clima</h2>
      <p>Estamos pidiendo la informacion al backend y preparando el resultado.</p>
    </section>
  );
}

export default LoadingState;

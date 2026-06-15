function ErrorMessage({ message }) {
  return (
    <section className="feedback-card error-card" role="alert">
      <h2>No pudimos obtener el clima</h2>
      <p>{message}</p>
    </section>
  );
}

export default ErrorMessage;

document.addEventListener('DOMContentLoaded', () => {
  const elementosAnimados = document.querySelectorAll('.animar');

  const observador = new IntersectionObserver(
    (elementos) => {
      elementos.forEach((elemento) => {
        if (elemento.isIntersecting) {
          elemento.target.classList.add('visible');
          observador.unobserve(elemento.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  elementosAnimados.forEach((el) => observador.observe(el));
});

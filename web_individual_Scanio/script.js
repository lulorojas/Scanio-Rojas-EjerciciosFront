const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

document.querySelectorAll(".glitch-hover").forEach(elemento => {
    // Guardamos el texto original la primera vez
    if (!elemento.dataset.valor) {
        elemento.dataset.valor = elemento.innerText;
    }

    elemento.addEventListener("mouseover", evento => {
        let iteraciones = 0;
        
        // Evita que el efecto se pise si le pasás el mouse muy rápido
        clearInterval(elemento.intervalo);

        elemento.intervalo = setInterval(() => {
            evento.target.innerText = evento.target.innerText
                .split("")
                .map((letra, index) => {
                    // Si ya pasó la iteración, dejamos la letra correcta
                    if (index < iteraciones) {
                        return evento.target.dataset.valor[index];
                    }
                    // Si no, metemos una letra/símbolo random
                    return letras[Math.floor(Math.random() * letras.length)];
                })
                .join("");

            // Cuando ya decodificó toda la palabra, frenamos
            if (iteraciones >= evento.target.dataset.valor.length) {
                clearInterval(elemento.intervalo);
            }

            iteraciones += 1 / 3; // Controla la velocidad de decodificación
        }, 30);
    });
});

// Efecto Spotlight para las tarjetas
document.querySelectorAll(".tarjetaproyecto").forEach(tarjeta => {
    tarjeta.addEventListener("mousemove", (e) => {
        const rect = tarjeta.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Le pasamos las coordenadas exactas al CSS
        tarjeta.style.setProperty("--x", `${x}px`);
        tarjeta.style.setProperty("--y", `${y}px`);
    });
});
// Efecto 3D Tilt para las tarjetas de skills
document.querySelectorAll(".tarjetaskill").forEach(tarjeta => {
    
    tarjeta.addEventListener("mousemove", (e) => {
        const rect = tarjeta.getBoundingClientRect();
        
        // Calculamos la posición del mouse relativa al centro de la tarjeta
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // El '15' es la intensidad. A mayor número, más se dobla la tarjeta.
        const rotateX = ((y - centerY) / centerY) * -15; 
        const rotateY = ((x - centerX) / centerX) * 15;

        // Aplicamos la rotación en 3D y la agrandamos un poquito (scale)
        tarjeta.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    // Cuando el mouse entra, sacamos la transición para que reaccione al instante
    tarjeta.addEventListener("mouseenter", () => {
        tarjeta.style.transition = "none";
    });

    // Cuando el mouse sale, la tarjeta vuelve a su lugar suavemente
    tarjeta.addEventListener("mouseleave", () => {
        tarjeta.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        tarjeta.style.transition = "transform 0.5s ease, box-shadow 0.4s ease, border 0.4s ease";
    });
});
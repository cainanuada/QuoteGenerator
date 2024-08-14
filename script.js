// Função para gerar uma nova citação a partir da API Quotable
function buttonClick() {
    fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => {
            const quote = data.content;
            const author = data.author;

            // Exibe a citação e o autor
            document.querySelector(".quote").textContent = quote;
            document.querySelector(".name").textContent = author;
        })
        .catch(error => console.error('Erro ao obter a citação:', error));
}

// Função para copiar a citação para a área de transferência
document.querySelector(".copy").addEventListener("click", () => {
    const quoteText = document.querySelector(".quote").textContent;
    const authorText = document.querySelector(".name").textContent;
    const fullQuote = `"${quoteText}" - ${authorText}`;

    // Cria um elemento de texto temporário
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = fullQuote;
    document.body.appendChild(tempTextArea);

    // Seleciona e copia o texto
    tempTextArea.select();
    document.execCommand("copy");

    // Remove o elemento de texto temporário
    document.body.removeChild(tempTextArea);

    // Alerta ao usuário que a citação foi copiada
    alert("Citação copiada para a área de transferência!");
});

// Função para tocar a citação em voz alta
document.querySelector(".sound").addEventListener("click", () => {
    const quote = document.querySelector(".quote").textContent;
    const utterance = new SpeechSynthesisUtterance(quote);
    
    // Define algumas propriedades adicionais, se desejado
    utterance.lang = 'en-US'; // Define o idioma
    utterance.pitch = 1; // Ajusta o tom da voz
    utterance.rate = 1; // Ajusta a velocidade da fala

    // Reproduz o áudio
    speechSynthesis.speak(utterance);
});

// Gera uma citação inicial ao carregar a página
window.onload = buttonClick;

let spinning = false;

function preloadImages(images, callback) {
  let loadedImages = 0;

  images.forEach((imagePath) => {
    const image = new Image();
    image.src = imagePath;

    image.onload = () => {
      loadedImages++;
      if (loadedImages === images.length) {
        callback();
      }
    };
  });
}

function spinWheel() {
  if (!spinning) {
    spinning = true;
    const wheel = document.getElementById('wheel');
    const resultContainer = document.getElementById('result-container');
    const resultImage = document.getElementById('result-image');
    const resultText = document.getElementById('result-text');

    const imagePaths = [
      "./Fotos/ps5.jpg",
      "./Fotos/arcondicionado.jpg",
      "./Fotos/biz.png",
      "./Fotos/conta-lol.png",
      "./Fotos/dinheiro.jpg",
      "./Fotos/Guitarra.png",
      "./Fotos/notebook.jpg",
      "./Fotos/tia.jpg",
    ];

    preloadImages(imagePaths, () => {
      // Garante que a rotação comece a partir de 0
      wheel.style.transition = 'none';
      wheel.style.transform = 'rotate(0deg)';

      // Força o navegador a recalcular o estilo antes de aplicar a transição
      wheel.offsetHeight;

      // Calcula um grau aleatório para a rotação
      const randomDegree = Math.floor(Math.random() * 360) + 360 * 5;

      // Adiciona 3600 graus para garantir várias voltas antes de parar
      const totalRotation = randomDegree + 3600;

      // Aplica a transição com o grau aleatório
      wheel.style.transition = 'transform 3s ease-out';
      wheel.style.transform = `rotate(${totalRotation}deg`;

      setTimeout(() => {
        wheel.style.transition = 'none';
        spinning = false;

        const winnerIndex = Math.floor(totalRotation / 45) % 8;
        const winnerImageSrc = imagePaths[winnerIndex];
        const winnerText = `Prêmio ${winnerIndex + 1}`;

        // Configura o tamanho desejado para a imagem (ajuste conforme necessário)
        resultImage.style.width = '200px';
        resultImage.style.height = '200px';

        resultImage.src = winnerImageSrc;
        resultText.textContent = winnerText;

        resultContainer.style.display = 'block';
      }, 3000);
    });
  }
}

function resetWheel() {
  const wheel = document.getElementById('wheel');
  wheel.style.transition = 'none';
  wheel.style.transform = 'rotate(0deg)';
  spinning = false;

  // Resetando o tamanho da imagem ao tamanho original
  const resultImage = document.getElementById('result-image');
  resultImage.style.width = 'auto';
  resultImage.style.height = 'auto';
}

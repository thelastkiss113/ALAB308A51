export function createStars(numStars) {
    const starContainer = document.body;
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      if (Math.random() < 0.5) { // 50% chance of being a twinkling star
        star.classList.add('twinkling-star');
      }
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      starContainer.appendChild(star);
    }
  }
createStars(50);
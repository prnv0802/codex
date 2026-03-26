const chain = document.getElementById('chain');
const stage = document.getElementById('network-stage');

for (let i = 0; i < 8; i += 1) {
  const block = document.createElement('div');
  block.className = 'block';
  block.textContent = `Block ${i + 1}`;
  chain.appendChild(block);
}

const routes = [
  [170, 150, 500, 190],
  [170, 470, 500, 430],
  [830, 150, 500, 190],
  [830, 470, 500, 430],
  [500, 190, 500, 430],
  [170, 150, 830, 150],
  [170, 470, 830, 470],
];

function spawnPacket() {
  const packet = document.createElement('div');
  packet.className = 'packet';
  stage.appendChild(packet);

  const [x1, y1, x2, y2] = routes[Math.floor(Math.random() * routes.length)];
  const duration = 1800 + Math.random() * 1400;
  const start = performance.now();

  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - (1 - p) ** 3;
    const x = x1 + (x2 - x1) * eased;
    const y = y1 + (y2 - y1) * eased;
    packet.style.left = `${x}px`;
    packet.style.top = `${y}px`;

    if (p < 1) {
      requestAnimationFrame(tick);
    } else {
      packet.remove();
    }
  }

  requestAnimationFrame(tick);
}

setInterval(spawnPacket, 500);

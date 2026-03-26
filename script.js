const chain = document.getElementById('chain');
const stage = document.getElementById('network-stage');
const modal = document.getElementById('detail-modal');
const modalTitle = document.getElementById('modal-title');
const modalTag = document.getElementById('modal-tag');
const modalSummary = document.getElementById('modal-summary');
const modalWhy = document.getElementById('modal-why');
const modalPoints = document.getElementById('modal-points');

const details = {
  agentA: {
    tag: 'Agent Role',
    title: 'Agent A: Identity Provider Agent',
    summary:
      'This agent proves who it is with decentralized identity credentials and signs every protocol message.',
    why: 'Customers can trust interactions because identity is cryptographically proven, not assigned by a central authority.',
    points: [
      'Issues verifiable credentials and rotates keys safely.',
      'Publishes trust anchors referenced by other agents.',
      'Emits signed audit entries for every request.',
    ],
  },
  agentB: {
    tag: 'Agent Role',
    title: 'Agent B: Policy Agent',
    summary: 'This agent enforces data usage policy and allows only approved actions in each session.',
    why: 'It ensures governance and compliance are embedded into each agent-to-agent connection.',
    points: [
      'Evaluates context-aware access rules.',
      'Restricts sensitive operations at runtime.',
      'Can revoke capabilities when risk conditions change.',
    ],
  },
  agentC: {
    tag: 'Agent Role',
    title: 'Agent C: Capability Agent',
    summary: 'This agent packages encrypted service capabilities and conditionally shares them with peers.',
    why: 'Customers understand that capability sharing is controlled and tamper resistant.',
    points: [
      'Only discloses approved functions for each peer.',
      'Attaches signed capability proofs.',
      'Supports delegated authority with expiry windows.',
    ],
  },
  agentD: {
    tag: 'Agent Role',
    title: 'Agent D: Runtime Agent',
    summary: 'This agent executes tasks after consensus and streams execution proofs back to the network.',
    why: 'Demonstrates that execution can be trustworthy even without a centralized orchestrator.',
    points: [
      'Consumes only consensus-approved intents.',
      'Streams signed runtime telemetry.',
      'Triggers automatic rollback on policy violations.',
    ],
  },
  trustLayer: {
    tag: 'Layer',
    title: 'Trust Layer (Validator Quorum)',
    summary: 'A decentralized validator group verifies intent transactions and identity proofs.',
    why: 'Trust is distributed across many validators, removing single points of failure.',
    points: [
      'Quorum-based validation prevents unilateral control.',
      'Validator decisions are cryptographically provable.',
      'Supports permissioned or public validator sets.',
    ],
  },
  auditLayer: {
    tag: 'Layer',
    title: 'Audit Layer (Immutable Trail)',
    summary: 'Every handshake and runtime event is anchored to immutable ledger records.',
    why: 'Customers gain real-time transparency and post-incident forensic confidence.',
    points: [
      'Signed attestations tied to ledger state.',
      'Time-ordered evidence for compliance teams.',
      'No actor can secretly rewrite history.',
    ],
  },
  discovery: {
    tag: 'Walkthrough Step',
    title: 'Step 1: Agent Discovery',
    summary: 'Agents discover peers and exchange verifiable DIDs to establish identity context.',
    why: 'Discovery without central directories enables resilient, cross-organization collaboration.',
    points: ['DID resolution', 'Trust anchor exchange', 'Peer reputation lookup'],
  },
  policyNegotiation: {
    tag: 'Walkthrough Step',
    title: 'Step 2: Policy Negotiation',
    summary: 'Agents negotiate scopes, obligations, and constraints before any data operation begins.',
    why: 'Clear policy agreement reduces legal and operational uncertainty for enterprise buyers.',
    points: ['Scope boundaries', 'Data handling rules', 'Action-level authorization'],
  },
  proofExchange: {
    tag: 'Walkthrough Step',
    title: 'Step 3: Proof Exchange',
    summary: 'Signed credentials and risk posture proofs are exchanged and validated peer-to-peer.',
    why: 'Demonstrates trust decisions can be mathematically verifiable and auditable.',
    points: ['Credential validation', 'Risk scoring', 'Capability proof verification'],
  },
  onChainIntent: {
    tag: 'Walkthrough Step',
    title: 'Step 4: On-Chain Intent',
    summary: 'Handshake intent and policy hashes are submitted to the blockchain as a transaction.',
    why: 'The ledger becomes a neutral trust fabric both parties can independently verify.',
    points: ['Intent payload commit', 'Policy hash notarization', 'Settlement timestamping'],
  },
  consensus: {
    tag: 'Walkthrough Step',
    title: 'Step 5: Consensus',
    summary: 'Validator nodes evaluate and agree on the transaction under protocol-defined consensus.',
    why: 'Consensus replaces centralized broker approval with distributed agreement.',
    points: ['Byzantine fault tolerance', 'Finality guarantees', 'Cross-node signature aggregation'],
  },
  sessionOpen: {
    tag: 'Walkthrough Step',
    title: 'Step 6: Session Open',
    summary: 'On finality, agents open a trusted session channel and begin secure execution.',
    why: 'Shows practical business value: trusted automation without centralized mediation.',
    points: ['Mutual attestation', 'Encrypted channel bootstrap', 'Least-privilege runtime tokens'],
  },
  continuousAudit: {
    tag: 'Walkthrough Step',
    title: 'Step 7: Continuous Audit',
    summary: 'Session actions stream as signed attestations and are continuously monitored.',
    why: 'Enterprise clients get governance visibility while retaining decentralized operation.',
    points: ['Live compliance dashboard feed', 'Anomaly flagging', 'Immutable evidence archive'],
  },
  revocation: {
    tag: 'Walkthrough Step',
    title: 'Step 8: Revocation & Recovery',
    summary: 'Compromised keys or capabilities can be revoked quickly, with remediation evidence on-chain.',
    why: 'Risk containment becomes immediate and transparent to all participants.',
    points: ['Key revocation proofs', 'Session quarantine', 'Recovery flow attestation'],
  },
  noCentralBroker: {
    tag: 'Core Principle',
    title: 'No Central Broker',
    summary: 'No single server controls trust. Every decision is jointly validated with cryptographic evidence.',
    why: 'This lowers concentration risk and avoids dependency on one organization.',
    points: ['Distributed trust decisions', 'Fewer single points of failure', 'Transparent multi-party verification'],
  },
  onChainHandshake: {
    tag: 'Core Principle',
    title: 'On-Chain Handshake',
    summary: 'Handshake terms are committed to the ledger before session activation.',
    why: 'Contract-like transparency improves partner confidence and reduces disputes.',
    points: ['Tamper-evident terms', 'Shared source of truth', 'Replayable verification'],
  },
  continuousCompliance: {
    tag: 'Core Principle',
    title: 'Continuous Compliance',
    summary: 'Compliance is enforced and observed at runtime rather than checked only after incidents.',
    why: 'Security and governance teams can intervene quickly when policies drift.',
    points: ['Real-time policy checks', 'Signed audit stream', 'Fast incident investigation'],
  },
  block1: {
    tag: 'Ledger',
    title: 'Block 1: Identity Anchors',
    summary: 'Stores validator and agent identity anchors used to bootstrap trust.',
    why: 'A shared identity root prevents spoofing and rogue participants.',
    points: ['Validator root keys', 'DID root commitments', 'Rotation metadata'],
  },
};

for (let i = 0; i < 8; i += 1) {
  const block = document.createElement('button');
  block.className = 'block explainable';
  block.dataset.topic = `block${i + 1}`;
  block.textContent = `Block ${i + 1}`;
  chain.appendChild(block);

  if (!details[`block${i + 1}`]) {
    details[`block${i + 1}`] = {
      tag: 'Ledger',
      title: `Block ${i + 1}: Protocol Evidence`,
      summary: `This block stores signed protocol evidence captured during handshake and runtime stage ${i + 1}.`,
      why: 'Customers can inspect trust decisions as immutable, sequenced records.',
      points: ['Signed participant actions', 'Policy checkpoint hash', 'Consensus proof metadata'],
    };
  }
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

function openModal(topic) {
  const detail = details[topic];
  if (!detail) {
    return;
  }

  modalTag.textContent = detail.tag;
  modalTitle.textContent = detail.title;
  modalSummary.textContent = detail.summary;
  modalWhy.textContent = detail.why;
  modalPoints.innerHTML = '';
  detail.points.forEach((point) => {
    const li = document.createElement('li');
    li.textContent = point;
    modalPoints.appendChild(li);
  });

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.explainable').forEach((node) => {
  node.addEventListener('click', () => openModal(node.dataset.topic));
});

document.querySelectorAll('[data-close-modal]').forEach((node) => {
  node.addEventListener('click', closeModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

setInterval(spawnPacket, 500);

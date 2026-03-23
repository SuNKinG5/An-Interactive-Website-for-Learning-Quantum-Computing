import { BlochSphere } from "../lib/quantum/BlochSphere.js";
import { fromAngle, toAngle, applyGate } from "../lib/quantum/QuantumEngine.js";

const DEFAULT_STATE = {
  theta: Math.PI / 2,
  phi: 0,
};

const state = { ...DEFAULT_STATE };
const history = [];
let blochSim = null;

const elements = {
  thetaSlider: document.getElementById("theta-slider"),
  phiSlider: document.getElementById("phi-slider"),
  thetaValue: document.getElementById("theta-value"),
  phiValue: document.getElementById("phi-value"),
  resetBtn: document.getElementById("reset-btn"),
  gateSequence: document.getElementById("gate-sequence"),
  prob0Display: document.getElementById("prob-0-display"),
  prob1Display: document.getElementById("prob-1-display"),
  prob0Percent: document.getElementById("prob-0-percent"),
  prob1Percent: document.getElementById("prob-1-percent"),
  prob0Bar: document.getElementById("prob-0-bar"),
  prob1Bar: document.getElementById("prob-1-bar"),
  alphaDisplay: document.getElementById("alpha-display"),
  betaDisplay: document.getElementById("beta-display"),
  stateLabel: document.getElementById("state-label"),
  coordX: document.getElementById("coord-x"),
  coordY: document.getElementById("coord-y"),
  coordZ: document.getElementById("coord-z"),
  navButtons: document.querySelectorAll("[data-panel]"),
  panelCards: document.querySelectorAll("[data-panel-card]"),
  gateButtons: {
    X: document.getElementById("gate-x"),
    Y: document.getElementById("gate-y"),
    Z: document.getElementById("gate-z"),
    H: document.getElementById("gate-h"),
  },
};

function safeNumber(value) {
  return Math.abs(value) < 1e-12 ? 0 : value;
}

function formatFixed(value) {
  return safeNumber(value).toFixed(3);
}

function getCurrentVector() {
  return fromAngle(state.theta, state.phi);
}

function initBlochSphere() {
  const canvas = document.getElementById("bloch-canvas");
  if (!canvas) {
    return;
  }

  blochSim = new BlochSphere(canvas, {
    background: 0xf8fbff,
    shellColor: 0xcbd5e1,
    gridColor: 0xd1d5db,
    equator: 0x60a5fa,
    arrowColor: 0x2563eb,
  });
}

function getStateLabel([x, y, z]) {
  const epsilon = 1e-9;

  if (Math.abs(x) < epsilon && Math.abs(y) < epsilon && Math.abs(z - 1) < epsilon) {
    return "|0>";
  }

  if (Math.abs(x) < epsilon && Math.abs(y) < epsilon && Math.abs(z + 1) < epsilon) {
    return "|1>";
  }

  if (Math.abs(y) < epsilon && Math.abs(z) < epsilon && Math.abs(x - 1) < epsilon) {
    return "|+>";
  }

  if (Math.abs(y) < epsilon && Math.abs(z) < epsilon && Math.abs(x + 1) < epsilon) {
    return "|->";
  }

  return "|psi>";
}

function updateSliders() {
  const thetaDeg = Math.round((state.theta * 180) / Math.PI);
  let phiDeg = Math.round((state.phi * 180) / Math.PI);

  //
  if (phiDeg < 0) {
    phiDeg += 360
  }

  elements.thetaSlider.value = thetaDeg;
  elements.thetaValue.textContent = thetaDeg;
  elements.phiSlider.value = phiDeg;
  elements.phiValue.textContent = phiDeg;
}

function updateProbabilities() {
  const prob0 = Math.cos(state.theta / 2) ** 2;
  const prob1 = Math.sin(state.theta / 2) ** 2;

  elements.prob0Display.textContent = Math.sqrt(prob0).toFixed(3);
  elements.prob1Display.textContent = Math.sqrt(prob1).toFixed(3);
  elements.prob0Percent.textContent = `${(prob0 * 100).toFixed(1)}%`;
  elements.prob1Percent.textContent = `${(prob1 * 100).toFixed(1)}%`;
  elements.prob0Bar.style.width = `${prob0 * 100}%`;
  elements.prob1Bar.style.width = `${prob1 * 100}%`;
}

function updateBloch() {
  if (!blochSim) {
    return;
  }

  blochSim.setBlochVector(getCurrentVector());
}

function updateStateVector() {
  const alpha = Math.cos(state.theta / 2);
  const beta = Math.sin(state.theta / 2);
  const [x, y, z] = getCurrentVector();

  elements.alphaDisplay.textContent = alpha.toFixed(3);
  elements.betaDisplay.textContent = beta.toFixed(3);
  elements.stateLabel.textContent = getStateLabel([x, y, z]);
  elements.coordX.textContent = formatFixed(x);
  elements.coordY.textContent = formatFixed(y);
  elements.coordZ.textContent = formatFixed(z);
}

function renderHistory() {
  if (!history.length) {
    elements.gateSequence.innerHTML = '<span class="section-help">No gates applied yet</span>';
    return;
  }

  elements.gateSequence.innerHTML = history
    .map((gate) => {
      const extraClass = gate === "H" ? " is-h" : "";
      return `<span class="sequence-gate${extraClass}">${gate}</span>`;
    })
    .join("");
}

function updateAll() {
  updateSliders();
  updateBloch();
  updateProbabilities();
  updateStateVector();
  renderHistory();
}

// function applyGateToState(gate) {
//   const next = applyGate(getCurrentVector(), gate);
//   const [theta, phi] = toAngle(next);

//   state.theta = theta;
//   state.phi = phi;
//   history.push(gate);

//   updateAll();
// }
function recomputeFromHistory() {
  state.theta = DEFAULT_STATE.theta;
  state.phi = DEFAULT_STATE.phi;

  for (const gate of history) {
    const next = applyGate(getCurrentVector(), gate);
    const [theta, phi] = toAngle(next);
    state.theta = theta;
    state.phi = phi;
  }

  updateAll();
}

function addGateToCircuit(gate) {
  history.push(gate);
  recomputeFromHistory();
}

function flashGateButton(gate) {
  const button = elements.gateButtons[gate];
  if (!button) {
    return;
  }

  button.classList.add("is-pressed");
  window.setTimeout(() => {
    button.classList.remove("is-pressed");
  }, 180);
}

function setActivePanel(panelName) {
  elements.navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.panel === panelName);
  });

  elements.panelCards.forEach((card) => {
    card.classList.toggle("is-active", card.dataset.panelCard === panelName);
  });
}

function resetState() {
  state.theta = DEFAULT_STATE.theta;
  state.phi = DEFAULT_STATE.phi;
  history.length = 0;
  updateAll();
}

function bindEvents() {
  elements.thetaSlider.addEventListener("input", (event) => {
    state.theta = (Number(event.target.value) * Math.PI) / 180;
    history.length = 0;
    updateAll();
  });

  elements.phiSlider.addEventListener("input", (event) => {
    state.phi = (Number(event.target.value) * Math.PI) / 180;
    history.length = 0;
    updateAll();
  });

  Object.entries(elements.gateButtons).forEach(([gate, button]) => {
    //click แบบเดิม
    button.addEventListener("click", () => {
      flashGateButton(gate);
      addGateToCircuit(gate);
    });
    //ลากมาใส่
    button.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", gate);
      event.dataTransfer.effectAllowed = "copy";
    });
  });

  elements.gateSequence.addEventListener("dragover", (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  });

  elements.gateSequence.addEventListener("drop", (event) => {
    event.preventDefault();

    const gate = event.dataTransfer.getData("text/plain");
    if (!elements.gateButtons[gate]) return;

    flashGateButton(gate);
    addGateToCircuit(gate);
  });

  elements.resetBtn.addEventListener("click", resetState);

  elements.navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActivePanel(button.dataset.panel);
    });
  });

  window.addEventListener("keydown", (event) => {
    const gate = event.key.toUpperCase();
    if (!elements.gateButtons[gate]) {
      return;
    }

    event.preventDefault();
    flashGateButton(gate);
    addGateToCircuit(gate);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initBlochSphere();
  bindEvents();
  setActivePanel("bloch");
  updateAll();

  const loop = () => {
    if (blochSim) {
      blochSim.render();
    }
    requestAnimationFrame(loop);
  };

  loop();
});

import { BlochSphere } from "../lib/quantum/BlochSphere.js";
import { fromAngle, toAngle, applyGate } from "../lib/quantum/QuantumEngine.js";

const DEFAULT_QUBIT_STATE = {
  theta: 0,
  phi: 0,
};

const state = {
  selectedQubit: "q0",
  qubits: {
    q0: { ...DEFAULT_QUBIT_STATE },
    q1: { ...DEFAULT_QUBIT_STATE },
  },
  measurement: {
    q0: null,
    q1: null,
  },
  measuredRows: {
    q0: false,
    q1: false,
  },
};

const history = {
  q0: [],
  q1: [],
};

let blochSim = null;

const elements = {
  // thetaSlider: document.getElementById("theta-slider"),
  // phiSlider: document.getElementById("phi-slider"),
  // thetaValue: document.getElementById("theta-value"),
  // phiValue: document.getElementById("phi-value"),
  resetBtn: document.getElementById("reset-btn"),

  gateSequenceQ0: document.getElementById("gate-sequence-q0"),
  gateSequenceQ1: document.getElementById("gate-sequence-q1"),
  classicalSequenceC: document.getElementById("classical-sequence-c"),

  prob0Display: document.getElementById("prob-0-display"),
  prob1Display: document.getElementById("prob-1-display"),
  prob0Percent: document.getElementById("prob-0-percent"),
  prob1Percent: document.getElementById("prob-1-percent"),
  prob0Bar: document.getElementById("prob-0-bar"),
  prob1Bar: document.getElementById("prob-1-bar"),
  // alphaDisplay: document.getElementById("alpha-display"),
  // betaDisplay: document.getElementById("beta-display"),
  // stateLabel: document.getElementById("state-label"),
  // coordX: document.getElementById("coord-x"),
  // coordY: document.getElementById("coord-y"),
  // coordZ: document.getElementById("coord-z"),

  gateButtons: {
    X: document.getElementById("gate-x"),
    Y: document.getElementById("gate-y"),
    Z: document.getElementById("gate-z"),
    H: document.getElementById("gate-h"),
    M: document.getElementById("gate-m"),
  },
};

// function safeNumber(value) {
//   return Math.abs(value) < 1e-12 ? 0 : value;
// }

// function formatFixed(value) {
//   return safeNumber(value).toFixed(3);
// }

function getQubitState(qubitKey) {
  return state.qubits[qubitKey];
}

function getCurrentQubitState() {
  return getQubitState(state.selectedQubit);
}

function getVectorFor(qubitKey) {
  const qubit = getQubitState(qubitKey);
  return fromAngle(qubit.theta, qubit.phi);
}

function getCurrentVector() {
  return getVectorFor(state.selectedQubit);
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

// function getStateLabel([x, y, z]) {
//   const epsilon = 1e-9;

//   if (Math.abs(x) < epsilon && Math.abs(y) < epsilon && Math.abs(z - 1) < epsilon) {
//     return "|0>";
//   }

//   if (Math.abs(x) < epsilon && Math.abs(y) < epsilon && Math.abs(z + 1) < epsilon) {
//     return "|1>";
//   }

//   if (Math.abs(y) < epsilon && Math.abs(z) < epsilon && Math.abs(x - 1) < epsilon) {
//     return "|+>";
//   }

//   if (Math.abs(y) < epsilon && Math.abs(z) < epsilon && Math.abs(x + 1) < epsilon) {
//     return "|->";
//   }

//   return "|psi>";
// }

function setSelectedQubit(qubitKey) {
  state.selectedQubit = qubitKey;
  elements.gateSequenceQ0?.classList.toggle("is-selected", qubitKey === "q0");
  elements.gateSequenceQ1?.classList.toggle("is-selected", qubitKey === "q1");
  updateAll();
}

function clearMeasurement(qubitKey) {
  state.measurement[qubitKey] = null;
  state.measuredRows[qubitKey] = false;
}

// function updateSliders() {
//   const current = getCurrentQubitState();
//   const thetaDeg = Math.round((current.theta * 180) / Math.PI);
//   let phiDeg = Math.round((current.phi * 180) / Math.PI);

//   if (phiDeg < 0) {
//     phiDeg += 360;
//   }

//   elements.thetaSlider.value = thetaDeg;
//   elements.thetaValue.textContent = thetaDeg;
//   elements.phiSlider.value = phiDeg;
//   elements.phiValue.textContent = phiDeg;
// }

function updateProbabilities() {
  const current = getCurrentQubitState();
  const prob0 = Math.cos(current.theta / 2) ** 2;
  const prob1 = Math.sin(current.theta / 2) ** 2;

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

// function updateStateVector() {
//   const current = getCurrentQubitState();
//   const alpha = Math.cos(current.theta / 2);
//   const beta = Math.sin(current.theta / 2);
//   const [x, y, z] = getCurrentVector();
//   const blochTargetLabel = document.getElementById("bloch-target-label");

//   elements.alphaDisplay.textContent = alpha.toFixed(3);
//   elements.betaDisplay.textContent = beta.toFixed(3);
//   elements.stateLabel.textContent = `${state.selectedQubit} ${getStateLabel([x, y, z])}`;
//   elements.coordX.textContent = formatFixed(x);
//   elements.coordY.textContent = formatFixed(y);
//   elements.coordZ.textContent = formatFixed(z);

//   if (blochTargetLabel) {
//     blochTargetLabel.textContent = `Showing ${state.selectedQubit} on the Bloch sphere`;
//   }
// }

function renderHistory() {
  const renderRow = (container, gates, showMeasure) => {
    if (!container) return;

    const renderedGates = [...gates];
    if (showMeasure) {
      renderedGates.push("M");
    }

    if (!renderedGates.length) {
      container.innerHTML = '<span class="section-help">No gates</span>';
      return;
    }

    container.innerHTML = renderedGates
      .map((gate) => {
        if (gate === "M") {
          return '<span class="measure-gate">M</span>';
        }

        const extraClass = gate === "H" ? " is-h" : "";
        return `<span class="sequence-gate${extraClass}">${gate}</span>`;
      })
      .join("");
  };

  renderRow(elements.gateSequenceQ0, history.q0, state.measuredRows.q0);
  renderRow(elements.gateSequenceQ1, history.q1, state.measuredRows.q1);

  const bitstring = `${state.measurement.q0 ?? "-"}${state.measurement.q1 ?? "-"}`;
  elements.classicalSequenceC.innerHTML =
    bitstring === "--" ? "" : `<span class="classical-bitstring">${bitstring}</span>`;
}

function updateAll() {
  // updateSliders();
  updateBloch();
  updateProbabilities();
  // updateStateVector();
  renderHistory();
}

function recomputeQubitFromHistory(qubitKey) {
  const qubit = getQubitState(qubitKey);
  qubit.theta = DEFAULT_QUBIT_STATE.theta;
  qubit.phi = DEFAULT_QUBIT_STATE.phi;

  for (const gate of history[qubitKey]) {
    const next = applyGate(getVectorFor(qubitKey), gate);
    const [theta, phi] = toAngle(next);
    qubit.theta = theta;
    qubit.phi = phi;
  }
}

function recomputeFromHistory() {
  recomputeQubitFromHistory("q0");
  recomputeQubitFromHistory("q1");
  updateAll();
}

function addGateToCircuit(gate, qubitKey = state.selectedQubit) {
  if (gate === "M") {
    measureQubit(qubitKey);
    return;
  }

  history[qubitKey].push(gate);
  clearMeasurement(qubitKey);
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

function measureQubit(qubitKey) {
  const qubit = getQubitState(qubitKey);
  const prob0 = Math.cos(qubit.theta / 2) ** 2;
  const result = Math.random() < prob0 ? 0 : 1;

  qubit.theta = result === 0 ? 0 : Math.PI;
  qubit.phi = 0;
  state.measurement[qubitKey] = String(result);
  state.measuredRows[qubitKey] = true;

  updateAll();
}

function resetState() {
  state.qubits.q0 = { ...DEFAULT_QUBIT_STATE };
  state.qubits.q1 = { ...DEFAULT_QUBIT_STATE };
  state.measurement.q0 = null;
  state.measurement.q1 = null;
  state.measuredRows.q0 = false;
  state.measuredRows.q1 = false;
  history.q0.length = 0;
  history.q1.length = 0;
  setSelectedQubit("q0");
}

function bindWireInteractions(qubitKey, container) {
  if (!container) {
    return;
  }

  container.addEventListener("click", () => {
    setSelectedQubit(qubitKey);
  });

  container.addEventListener("dragover", (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    if (state.selectedQubit !== qubitKey) {
      state.selectedQubit = qubitKey;
      elements.gateSequenceQ0?.classList.toggle("is-selected", qubitKey === "q0");
      elements.gateSequenceQ1?.classList.toggle("is-selected", qubitKey === "q1");
    }
  });

  container.addEventListener("drop", (event) => {
    event.preventDefault();
    const gate = event.dataTransfer.getData("text/plain");
    if (!elements.gateButtons[gate]) return;

    setSelectedQubit(qubitKey);
    flashGateButton(gate);
    addGateToCircuit(gate, qubitKey);
  });
}

function bindEvents() {
  // elements.thetaSlider.addEventListener("input", (event) => {
  //   const current = getCurrentQubitState();
  //   current.theta = (Number(event.target.value) * Math.PI) / 180;
  //   history[state.selectedQubit].length = 0;
  //   clearMeasurement(state.selectedQubit);
  //   updateAll();
  // });

  // elements.phiSlider.addEventListener("input", (event) => {
  //   const current = getCurrentQubitState();
  //   current.phi = (Number(event.target.value) * Math.PI) / 180;
  //   history[state.selectedQubit].length = 0;
  //   clearMeasurement(state.selectedQubit);
  //   updateAll();
  // });

  Object.entries(elements.gateButtons).forEach(([gate, button]) => {
    if (!button) {
      return;
    }

    button.addEventListener("click", () => {
      flashGateButton(gate);
      addGateToCircuit(gate);
    });

    button.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", gate);
      event.dataTransfer.effectAllowed = "copy";
    });
  });

  bindWireInteractions("q0", elements.gateSequenceQ0);
  bindWireInteractions("q1", elements.gateSequenceQ1);

  elements.resetBtn.addEventListener("click", resetState);

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
  setSelectedQubit("q0");

  const loop = () => {
    if (blochSim) {
      blochSim.render();
    }
    requestAnimationFrame(loop);
  };

  loop();
});

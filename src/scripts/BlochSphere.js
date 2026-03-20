import { BlochSphere } from "../lib/quantum/BlochSphere.js";
import { applyGate } from "../lib/quantum/QuantumEngine.js";

const canvas = document.getElementById("bloch");
const sphere = new BlochSphere(canvas, {
  background: 0xf8fafc,
  shellColor: 0xcbd5e1,
  gridColor: 0xd1d5db,
  equator: 0x60a5fa,
  arrowColor: 0x2563eb,
});

let vector = [0, 0, 1];

const elements = {
  label: document.getElementById("lbl"),
  theta: document.getElementById("th"),
  phi: document.getElementById("ph"),
  x: document.getElementById("x"),
  y: document.getElementById("y"),
  z: document.getElementById("z"),
  reset: document.getElementById("reset"),
  gateButtons: document.querySelectorAll("[data-gate]"),
};

function toAngles([x, y, z]) {
  const theta = Math.acos(Math.max(-1, Math.min(1, z)));
  const phi = Math.atan2(y, x);
  return [theta, phi];
}

function formatNumber(value) {
  const rounded = Math.abs(value) < 1e-12 ? 0 : value;
  return rounded.toFixed(3);
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

function updatePanel() {
  const [theta, phi] = toAngles(vector);
  const [x, y, z] = vector;

  elements.label.textContent = getStateLabel(vector);
  elements.theta.textContent = (theta * 180 / Math.PI).toFixed(1);
  elements.phi.textContent = (phi * 180 / Math.PI).toFixed(1);
  elements.x.textContent = formatNumber(x);
  elements.y.textContent = formatNumber(y);
  elements.z.textContent = formatNumber(z);
}

function setVector(nextVector) {
  vector = nextVector;
  sphere.setBlochVector(vector);
  updatePanel();
}

elements.gateButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setVector(applyGate(vector, button.dataset.gate));
  });
});

elements.reset.addEventListener("click", () => {
  setVector([0, 0, 1]);
});

window.addEventListener("keydown", (event) => {
  const gate = event.key.toUpperCase();
  if (!["X", "Y", "Z", "H"].includes(gate)) {
    return;
  }

  event.preventDefault();
  setVector(applyGate(vector, gate));
});

function loop() {
  sphere.render();
  requestAnimationFrame(loop);
}

setVector(vector);
loop();

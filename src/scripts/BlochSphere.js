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

let animatingVector = [0, 0, 1];
let startVector = [0, 0, 1];
let targetVector = [0, 0, 1];

// ตัวแปรใหม่สำหรับกำหนดแกนและมุมหมุน
let activeAxis = [1, 0, 0]; 
let activeAngle = Math.PI;  
let isAnimating = false;
let animationStartTime;
const animationDuration = 1000;

const elements = {
  thetaSlider: document.getElementById("theta-slider"),
  phiSlider: document.getElementById("phi-slider"),
  stateSlider: document.getElementById("state-slider"),
  thetaText: document.getElementById("th"),
  phiText: document.getElementById("ph"),
  stateIndicator: document.getElementById("state-indicator"),
  reset: document.getElementById("reset"),
  gateButtons: document.querySelectorAll("[data-gate]"),

  prob0Text: document.getElementById("prob-0-text"),
  prob0Bar: document.getElementById("prob-0-bar"),
  prob1Text: document.getElementById("prob-1-text"),
  prob1Bar: document.getElementById("prob-1-bar"),
};

function toAngles([x, y, z]) {
  const theta = Math.acos(Math.max(-1, Math.min(1, z)));
  const phi = Math.atan2(y, x);
  return [theta, phi];
}

function fromAngles(theta, phi) {
  return [
    Math.sin(theta) * Math.cos(phi),
    Math.sin(theta) * Math.sin(phi),
    Math.cos(theta)
  ];
}

function updatePanel(vec) {
  const [theta, phi] = toAngles(vec);

  let thetaDeg = Math.round((theta * 180) / Math.PI);
  let phiDeg = Math.round((phi * 180) / Math.PI);
  if (phiDeg < 0) phiDeg += 360; 

  const statePercent = Math.round((thetaDeg / 180) * 100);

  if (elements.thetaText) elements.thetaText.textContent = thetaDeg;
  if (elements.phiText) elements.phiText.textContent = phiDeg;
  if (elements.stateIndicator) elements.stateIndicator.textContent = statePercent + '%';

  if (elements.thetaSlider) elements.thetaSlider.value = thetaDeg;
  if (elements.phiSlider) elements.phiSlider.value = phiDeg;
  if (elements.stateSlider) elements.stateSlider.value = statePercent;

  // P(0) = cos^2(theta/2) และ P(1) = sin^2(theta/2)
  const p0 = Math.pow(Math.cos(theta / 2), 2);
  const p1 = Math.pow(Math.sin(theta / 2), 2);
  
  // ทำเป็นเปอร์เซ็นต์ ทศนิยม 1 ตำแหน่ง
  const p0Percent = (p0 * 100).toFixed(1);
  const p1Percent = (p1 * 100).toFixed(1);

  // อัปเดต Text
  if (elements.prob0Text) elements.prob0Text.textContent = p0Percent + '%';
  if (elements.prob1Text) elements.prob1Text.textContent = p1Percent + '%';

  // อัปเดตความยาวหลอด Progress Bar
  if (elements.prob0Bar) elements.prob0Bar.style.width = p0Percent + '%';
  if (elements.prob1Bar) elements.prob1Bar.style.width = p1Percent + '%';
}

function setInstantVector(nextVector) {
  animatingVector = nextVector;
  isAnimating = false;
  sphere.setBlochVector(animatingVector);
  updatePanel(animatingVector);
}

// ใหม่: ฟังก์ชันหมุน 3D รอบแกนใดๆ (Rodrigues' rotation formula)
function rotateAroundAxis(v, axis, angle) {
  const [vx, vy, vz] = v;
  const [kx, ky, kz] = axis;

  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  const dot = vx * kx + vy * ky + vz * kz;

  const crossX = ky * vz - kz * vy;
  const crossY = kz * vx - kx * vz;
  const crossZ = kx * vy - ky * vx;

  return [
    vx * cosA + crossX * sinA + kx * dot * (1 - cosA),
    vy * cosA + crossY * sinA + ky * dot * (1 - cosA),
    vz * cosA + crossZ * sinA + kz * dot * (1 - cosA)
  ];
}

// ใหม่: จัดการแอนิเมชันตามชนิดของ Gate
function startGateAnimation(gate) {
  startVector = animatingVector;
  
  // กำหนดแกนตามชนิดของเกต (หมุน 180 องศา หรือ Math.PI ทั้งหมด)
  if (gate === "X") {
    activeAxis = [1, 0, 0]; // แกน X
  } else if (gate === "Y") {
    activeAxis = [0, 1, 0]; // แกน Y
  } else if (gate === "Z") {
    activeAxis = [0, 0, 1]; // แกน Z
  } else if (gate === "H") {
    activeAxis = [1/Math.sqrt(2), 0, 1/Math.sqrt(2)]; // แกนทแยง X+Z
  }
  
  activeAngle = Math.PI; 
  targetVector = applyGate(startVector, gate);
  animationStartTime = performance.now();
  isAnimating = true;
}

// --- Event Listeners ---

if (elements.gateButtons) {
  elements.gateButtons.forEach((button) => {
    button.addEventListener("click", () => {
      startGateAnimation(button.dataset.gate);
    });
  });
}

if (elements.reset) {
  elements.reset.addEventListener("click", () => setInstantVector([0, 0, 1]));
}

window.addEventListener("keydown", (event) => {
  const gate = event.key.toUpperCase();
  if (!["X", "Y", "Z", "H"].includes(gate)) return;
  event.preventDefault();
  startGateAnimation(gate);
});

// (Event Listener ของ Sliders ยังเหมือนเดิม)
if (elements.thetaSlider) {
  elements.thetaSlider.addEventListener('input', (e) => {
    const theta = (parseFloat(e.target.value) * Math.PI) / 180;
    const [, currentPhi] = toAngles(animatingVector);
    setInstantVector(fromAngles(theta, currentPhi));
  });
}

if (elements.phiSlider) {
  elements.phiSlider.addEventListener('input', (e) => {
    const phi = (parseFloat(e.target.value) * Math.PI) / 180;
    const [currentTheta,] = toAngles(animatingVector);
    setInstantVector(fromAngles(currentTheta, phi));
  });
}

if (elements.stateSlider) {
  elements.stateSlider.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    const theta = (val / 100) * Math.PI;
    const [, currentPhi] = toAngles(animatingVector);
    setInstantVector(fromAngles(theta, currentPhi));
  });
}

// Main Render Loop อัปเดตใหม่
function loop(currentTime) {
  if (isAnimating && animationStartTime !== undefined) {
    const elapsedTime = currentTime - animationStartTime;
    const progress = Math.min(1, elapsedTime / animationDuration);

    // 1. คำนวณมุมหมุน ณ เฟรมนี้
    const currentAngle = activeAngle * progress;
    
    // 2. หมุนเวกเตอร์ตั้งต้นรอบแกนของเกต
    animatingVector = rotateAroundAxis(startVector, activeAxis, currentAngle);
    
    sphere.setBlochVector(animatingVector);
    updatePanel(animatingVector);

    if (progress === 1) {
      isAnimating = false;
      // Snap เข้าค่า target ตอนจบเพื่อป้องกันจุดทศนิยมคลาดเคลื่อน
      setInstantVector(targetVector); 
    }
  }

  sphere.render();
  requestAnimationFrame(loop);
}

// Initialize
setInstantVector([0, 0, 1]);
requestAnimationFrame(loop);
import { BlochSphere } from "../scene/BlochSphere.js";
import { fromAngle, toAngle, applyGate } from "../scene/Quantum_Engin.js";

// ==========================================
// 1. Global State
// ==========================================

let state = {
  theta: Math.PI / 2,
  phi: 0,
};

let blochSim = null;
let animId = null;


// ==========================================
// 2. HTML templates
// ==========================================

const vizData = {

  bloch: `
<div class="rounded-2xl p-10 flex items-center justify-center mb-8 bg-[#f8fbff] border-[1.5px] border-[#e8eef6] w-full max-w-[720px] aspect-square">
   <canvas id="bloch-canvas" class="w-full h-full"></canvas>
</div>

<div class="rounded-2xl p-6 w-full max-w-sm bg-[#f8fbff] border-[1.5px] border-[#e8eef6]">
<h3 class="text-sm font-semibold mb-4 text-[#0f172a]">Probability Amplitudes</h3>

<div class="grid grid-cols-2 gap-4">

<div class="rounded-lg p-4 bg-white border-[1.5px] border-[#e8eef6]">
<p class="text-xs mb-2 font-mono text-[#94a3b8]">|0⟩</p>
<p id="prob-0-display" class="text-lg font-bold font-mono text-[#3b82f6]">0.707</p>
<p id="prob-0-percent" class="text-xs mt-1 font-mono text-[#60a5fa]">50.0%</p>
</div>

<div class="rounded-lg p-4 bg-white border-[1.5px] border-[#e8eef6]">
<p class="text-xs mb-2 font-mono text-[#94a3b8]">|1⟩</p>
<p id="prob-1-display" class="text-lg font-bold font-mono text-[#60a5fa]">0.707</p>
<p id="prob-1-percent" class="text-xs mt-1 font-mono text-[#93c5fd]">50.0%</p>
</div>

</div>
</div>
`,

  phase: `
<div class="rounded-2xl p-8 flex items-center justify-center mb-8 bg-[#f8fbff] border-[1.5px] border-[#e8eef6] w-full max-w-[420px] aspect-square">

<div class="text-center font-mono text-lg text-[#3b82f6]">
Phase Visualization
</div>

</div>
`,

  state: `
<div class="rounded-2xl p-8 bg-[#f8fbff] border-[1.5px] border-[#e8eef6] w-full max-w-[500px]">

<h3 class="text-sm font-semibold mb-6 text-[#0f172a]">State Vector Representation</h3>

<div class="space-y-4">

<div class="rounded-lg p-4 bg-white border-[1.5px] border-[#e8eef6] font-mono">

<div class="flex items-center gap-2 mb-2">
<span class="text-[#3b82f6] font-bold">α =</span>
<span id="alpha-display">0.707</span>
</div>

<div class="flex items-center gap-2">
<span class="text-[#60a5fa] font-bold">β =</span>
<span id="beta-display">0.707</span>
</div>

</div>

</div>

</div>
`
};


// ==========================================
// 3. SPA Navigation
// ==========================================

function loadVisualization(type) {

  document.getElementById("dynamic-viz-workspace").innerHTML = vizData[type]

  if (type === "bloch") {

    const canvas = document.getElementById("bloch-canvas")

    blochSim = new BlochSphere(canvas)

    updateBloch()

    startLoop()

  }

  updateAllViz()

}


// ==========================================
// 4. Render Loop
// ==========================================

function startLoop() {

  if (animId) cancelAnimationFrame(animId)

  function loop() {

    if (blochSim) blochSim.render()

    animId = requestAnimationFrame(loop)

  }

  loop()

}


// ==========================================
// 5. Update Visualization
// ==========================================

function updateBloch() {

  if (!blochSim) return

  const v = fromAngle(state.theta, state.phi)

  blochSim.setBlochVector(v)

}

function updateProbabilities() {

  const prob0 = Math.cos(state.theta / 2) ** 2
  const prob1 = Math.sin(state.theta / 2) ** 2

  safeSet("prob-0-display", "textContent", prob0.toFixed(3))
  safeSet("prob-1-display", "textContent", prob1.toFixed(3))

  safeSet("prob-0-percent", "textContent", (prob0 * 100).toFixed(1) + "%")
  safeSet("prob-1-percent", "textContent", (prob1 * 100).toFixed(1) + "%")

}

function updateStateVector() {

  const alpha = Math.cos(state.theta / 2)
  const beta = Math.sin(state.theta / 2)

  safeSet("alpha-display", "textContent", alpha.toFixed(3))
  safeSet("beta-display", "textContent", beta.toFixed(3))

}

function updateAllViz() {

  updateBloch()
  updateProbabilities()
  updateStateVector()

}


// ==========================================
// 6. Helpers
// ==========================================

function safeSet(id, prop, val) {

  const el = document.getElementById(id)
  if (!el) return
  el[prop] = val

}

function updateSliders() {

  const thetaDeg = Math.round(state.theta * 180 / Math.PI)
  const phiDeg = Math.round(state.phi * 180 / Math.PI)

  safeSet("theta-slider", "value", thetaDeg)
  safeSet("theta-value", "textContent", thetaDeg)

  safeSet("phi-slider", "value", phiDeg)
  safeSet("phi-value", "textContent", phiDeg)

}


// ==========================================
// 7. Event Listeners
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

  // sliders

  document.getElementById("theta-slider").addEventListener("input", (e) => {

    state.theta = e.target.value * Math.PI / 180
    updateAllViz()

  })

  document.getElementById("phi-slider").addEventListener("input", (e) => {

    state.phi = e.target.value * Math.PI / 180
    updateAllViz()

  })


  // quantum gates

  document.getElementById("gate-x").addEventListener("click", () => {

    const v = fromAngle(state.theta, state.phi)

    const next = applyGate(v, "X")

    const [t, p] = toAngle(next)

    state.theta = t
    state.phi = p

    updateSliders()
    updateAllViz()

  })

  document.getElementById("gate-y").addEventListener("click", () => {

    const v = fromAngle(state.theta, state.phi)

    const next = applyGate(v, "Y")

    const [t, p] = toAngle(next)

    state.theta = t
    state.phi = p

    updateSliders()
    updateAllViz()

  })

  document.getElementById("gate-z").addEventListener("click", () => {

    const v = fromAngle(state.theta, state.phi)

    const next = applyGate(v, "Z")

    const [t, p] = toAngle(next)

    state.theta = t
    state.phi = p

    updateSliders()
    updateAllViz()

  })

  document.getElementById("gate-h").addEventListener("click", () => {

    const v = fromAngle(state.theta, state.phi)

    const next = applyGate(v, "H")

    const [t, p] = toAngle(next)

    state.theta = t
    state.phi = p

    updateSliders()
    updateAllViz()

  })


  // reset

  document.getElementById("reset-btn").addEventListener("click", () => {

    state.theta = Math.PI / 2
    state.phi = 0

    updateSliders()
    updateAllViz()

  })


  // initial page

  loadVisualization("bloch")

})
import { gateDetails, lessonsData } from "./Lessons.js";

const defaultConfig = {
  background_color: "#ffffff",
  surface_color: "#f8fbff",
  text_color: "#0f172a",
  primary_action_color: "#2563eb",
  secondary_action_color: "#64748b",
  font_family: "Google Sans",
  font_size: 16,
  lesson_title: "Quantum Computing Foundations",
  lesson_explain:
    "คอมพิวเตอร์ควอนตัมใช้คิวบิต ซูเปอร์โพซิชัน และการแทรกสอดเพื่อประมวลผลข้อมูลในรูปแบบที่ต่างจากคอมพิวเตอร์ทั่วไป",
  next_btn: "Next Lesson",
};



let currentLessonIndex = 0;
let activeRotationAxis = "x";

function getTextStack(config) {
  const font = config.font_family || defaultConfig.font_family;
  return `${font}, 'Google Sans', sans-serif`;
}

async function onConfigChange(config) {
  const c = { ...defaultConfig, ...config };
  const stack = getTextStack(c);

  document.body.style.background = c.background_color;
  document.getElementById("app-wrapper").style.background = c.background_color;
  document.getElementById("lesson-title").style.fontFamily = stack;
  document.getElementById("lesson-title").style.color = c.text_color;
  document.getElementById("lesson-header").style.fontFamily = stack;
  document.getElementById("lesson-header").style.color = c.text_color;
  document.getElementById("lesson-explanation").style.fontFamily = stack;
  document.getElementById("lesson-explanation").style.color =
    c.secondary_action_color;

  const nextBtn = document.getElementById("next-btn");
  nextBtn.querySelector("span").textContent = c.next_btn;
  nextBtn.style.background = c.primary_action_color;
  nextBtn.style.fontFamily = stack;
}

function mapToCapabilities(config) {
  function colorMutable(key) {
    return {
      get: () => config[key] || defaultConfig[key],
      set: (value) => {
        config[key] = value;
        window.elementSdk.setConfig({ [key]: value });
      },
    };
  }

  return {
    recolorables: [
      colorMutable("background_color"),
      colorMutable("surface_color"),
      colorMutable("text_color"),
      colorMutable("primary_action_color"),
      colorMutable("secondary_action_color"),
    ],
    borderables: [],
    fontEditable: {
      get: () => config.font_family || defaultConfig.font_family,
      set: (value) => {
        config.font_family = value;
        window.elementSdk.setConfig({ font_family: value });
      },
    },
    fontSizeable: {
      get: () => config.font_size || defaultConfig.font_size,
      set: (value) => {
        config.font_size = value;
        window.elementSdk.setConfig({ font_size: value });
      },
    },
  };
}

function mapToEditPanelValues(config) {
  const c = { ...defaultConfig, ...config };
  return new Map([
    ["lesson_title", c.lesson_title],
    ["lesson_explain", c.lesson_explain],
    ["next_btn", c.next_btn],
  ]);
}

if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities,
    mapToEditPanelValues,
  });
}

function updateProbability(value) {
  const prob0 = Number(value);
  const prob1 = 100 - prob0;
  const amp0 = Math.sqrt(prob0 / 100 || 0);
  const amp1 = Math.sqrt(prob1 / 100 || 0);

  const entries = [
    ["prob-0", `${prob0}%`],
    ["state-0", `${prob0}%`],
    ["state-1", `${prob1}%`],
    ["amp-0", amp0.toFixed(3)],
    ["amp-1", amp1.toFixed(3)],
  ];

  entries.forEach(([id, text]) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = text;
    }
  });
}

function measureQubit() {
  const resultEl = document.getElementById("measurement-result");
  if (!resultEl) return;

  const measured = Math.random() < 0.5 ? "|0>" : "|1>";
  resultEl.innerHTML = `ผลการวัดคือ <span class="inline-ket">${measured}</span> สถานะซูเปอร์โพซิชันได้ยุบลงเป็นสถานะฐานเพียงค่าเดียวในขณะที่ทำการวัด`;
}

function showGateDetails(gate) {
  const detail = gateDetails[gate];
  if (!detail) return;

  document.querySelectorAll("[data-gate]").forEach((card) => {
    card.classList.toggle("is-active", card.dataset.gate === gate);
  });

  const nameEl = document.getElementById("gate-detail-name");
  const copyEl = document.getElementById("gate-detail-copy");
  const matrixEl = document.getElementById("gate-detail-matrix");
  const effectEl = document.getElementById("gate-detail-effect");

  if (nameEl) nameEl.textContent = detail.name;
  if (copyEl) copyEl.textContent = detail.copy;
  if (matrixEl) matrixEl.textContent = detail.matrix;
  if (effectEl) effectEl.textContent = detail.effect;
}

function rotationExplanation(axis, angle) {
  if (angle === 0) {
    return "เมื่อมุมเป็น 0 องศา เกตจะยังไม่เปลี่ยนสถานะของคิวบิต";
  }

  if (angle === 90) {
    return `การหมุนหนึ่งในสี่รอบรอบแกน ${axis.toUpperCase()} ทำให้สถานะเปลี่ยนอย่างชัดเจนโดยยังไม่ไปถึงขั้วตรงข้าม`;
  }

  if (angle === 180) {
    return `การหมุนครึ่งรอบรอบแกน ${axis.toUpperCase()} ให้ผลเทียบได้กับเกต Pauli แกนนั้น ยกเว้น global phase`;
  }

  if (angle < 90) {
    return `การหมุนมุมเล็กรอบแกน ${axis.toUpperCase()} เหมาะกับการปรับสถานะอย่างละเอียด`;
  }

  return `การหมุนมุมค่อนข้างมากรอบแกน ${axis.toUpperCase()} จะพาสถานะเข้าใกล้ฝั่งตรงข้ามของทรงกลม`;
}

function updateRotationDemo(value) {
  const angle = Number(value);
  const angleEl = document.getElementById("rotation-angle");
  const fillEl = document.getElementById("rotation-fill");
  const gateLabelEl = document.getElementById("rotation-gate-label");
  const descEl = document.getElementById("rotation-description");

  if (angleEl) angleEl.textContent = String(angle);
  if (fillEl) fillEl.style.width = `${(angle / 180) * 100}%`;
  if (gateLabelEl) {
    gateLabelEl.textContent = `R${activeRotationAxis}(${angle} deg)`;
  }
  if (descEl) {
    descEl.textContent = rotationExplanation(activeRotationAxis, angle);
  }
}

function setRotationAxis(axis) {
  activeRotationAxis = axis;
  document.querySelectorAll("[data-axis]").forEach((card) => {
    card.classList.toggle("is-active", card.dataset.axis === axis);
  });

  const currentAngle = document.getElementById("rotation-slider")?.value || "90";
  updateRotationDemo(currentAngle);
}

function initLessonInteractions(index) {
  if (index === 1) {
    updateProbability(document.getElementById("probability-slider")?.value || "50");
  }

  if (index === 4) {
    showGateDetails("X");
  }

  if (index === 5) {
    activeRotationAxis = "x";
    setRotationAxis("x");
    updateRotationDemo(document.getElementById("rotation-slider")?.value || "90");
  }

  if (index === 3) {
    // รีเซ็ตค่าเริ่มต้นเสมอเมื่อเปิดบทเรียนใหม่
    l4_qx = 0; l4_qy = 0; l4_qz = 1; 
    l4_sphereRotX = -15; l4_sphereRotY = -30;
    
    // ตั้งเวลาหน่วงนิดนึงให้ DOM โหลดเสร็จก่อนจับ Event ลากหมุน
    setTimeout(() => {
      initL4Drag();
      updateL4Vector();
      lucide.createIcons();
    }, 100);
  }
}

function loadLesson(index) {
  if (index < 0 || index >= lessonsData.length) return;

  currentLessonIndex = index;
  const lesson = lessonsData[index];

  document.getElementById("lesson-meta").textContent = lesson.category;
  document.getElementById("lesson-title").textContent = lesson.title;
  document.getElementById("lesson-header").textContent = lesson.header;
  document.getElementById("lesson-explanation").textContent = lesson.explanation;
  document.getElementById("dynamic-workspace").innerHTML = lesson.workspaceHTML;

  const navButtons = document.querySelectorAll("#sidebar .nav-btn");
  navButtons.forEach((btn, i) => {
    btn.classList.toggle("nav-item-active", i === index);
  });

  const nextBtn = document.getElementById("next-btn");
  nextBtn.style.display = index === lessonsData.length - 1 ? "none" : "inline-flex";

  initLessonInteractions(index);
  lucide.createIcons();
}

function goToNextLesson() {
  loadLesson(currentLessonIndex + 1);
}

// --- Lesson 1 Interactive Functions ---

function toggleBit(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  // สลับค่า 0 กับ 1
  if (el.textContent === "0") {
    el.textContent = "1";
    el.classList.remove("text-slate-800");
    el.classList.add("text-blue-600");
  } else {
    el.textContent = "0";
    el.classList.remove("text-blue-600");
    el.classList.add("text-slate-800");
  }
}

function updateQubitSlider(value) {
  const q0 = 100 - value;
  const q1 = value;

  document.getElementById("sim2-q0").textContent = q0;
  document.getElementById("sim2-q1").textContent = q1;
  document.getElementById("sim2-bar0").style.width = `${q0}%`;
  document.getElementById("sim2-bar1").style.width = `${q1}%`;
}

// ตัวแปรสำหรับเช็คสถานะ Animation ป้องกันการกดซ้ำ
let isSearching = false;

function resetSearchBoxes() {
  const boxes = ['box-1', 'box-5', 'box-9', 'box-12', 'box-20'];
  boxes.forEach(id => {
    const el = document.getElementById(id);
    el.className = "w-12 h-12 flex items-center justify-center border-2 rounded-xl bg-white text-lg font-bold text-slate-400 transition-all";
  });
}

function runClassicalSearch() {
  if (isSearching) return;
  isSearching = true;
  resetSearchBoxes();

  const statusEl = document.getElementById("search-status");
  statusEl.textContent = "กำลังไล่หาทีละกล่อง...";
  statusEl.className = "text-sm font-medium text-slate-600 bg-slate-100 inline-block px-4 py-1.5 rounded-full";

  const sequence = ['box-1', 'box-5', 'box-9']; // สมมติว่าเจอที่กล่องที่ 3

  sequence.forEach((boxId, index) => {
    setTimeout(() => {
      const el = document.getElementById(boxId);
      // ไฮไลท์ตอนกำลังตรวจ
      el.classList.add("border-amber-400", "text-amber-600", "bg-amber-50");

      setTimeout(() => {
        if (boxId === 'box-9') {
          // เจอแล้ว
          el.className = "w-12 h-12 flex items-center justify-center border-2 rounded-xl bg-green-500 text-lg font-bold text-white shadow-lg transform scale-110 transition-all";
          statusEl.innerHTML = `เจอเลข 9 แล้ว! <span class="text-amber-600">ใช้เวลาหา 3 รอบ</span> (ไล่ทีละตัว)`;
          isSearching = false;
        } else {
          // ไม่ใช่ ให้เป็นสีเทาไป
          el.className = "w-12 h-12 flex items-center justify-center border-2 rounded-xl bg-slate-100 text-lg font-bold text-slate-300 transition-all opacity-50";
        }
      }, 400); // ระยะเวลาที่สว่างขึ้นมา
    }, index * 800); // หน่วงเวลาแต่ละกล่อง 0.8 วินาที
  });
}

function runQuantumSearch() {
  if (isSearching) return;
  isSearching = true;
  resetSearchBoxes();

  const statusEl = document.getElementById("search-status");
  statusEl.textContent = "Qubits กำลังประมวลผลทุกกล่องพร้อมกัน (Superposition)...";
  statusEl.className = "text-sm font-medium text-blue-600 bg-blue-50 inline-block px-4 py-1.5 rounded-full";

  // Step 1: สว่างทุกกล่องพร้อมกัน (Superposition)
  setTimeout(() => {
    const allBoxes = ['box-1', 'box-5', 'box-9', 'box-12', 'box-20'];
    allBoxes.forEach(id => {
      document.getElementById(id).className = "w-12 h-12 flex items-center justify-center border-2 border-blue-300 rounded-xl bg-blue-50 text-lg font-bold text-blue-500 transition-all shadow-[0_0_15px_rgba(59,130,246,0.5)]";
    });

    // Step 2: คำตอบโผล่ขึ้นมาทันที (Interference/Grover's)
    setTimeout(() => {
      allBoxes.forEach(id => {
        const el = document.getElementById(id);
        if (id === 'box-9') {
          el.className = "w-12 h-12 flex items-center justify-center border-2 rounded-xl bg-blue-600 text-lg font-bold text-white shadow-lg shadow-blue-300 transform scale-110 transition-all";
        } else {
          el.className = "w-12 h-12 flex items-center justify-center border-2 rounded-xl bg-slate-50 text-lg font-bold text-slate-200 transition-all opacity-30";
        }
      });
      statusEl.innerHTML = `เจอเลข 9 แล้ว! <span class="text-blue-600">เจอได้ในพริบตา</span> เพราะประมวลผลพร้อมกัน`;
      isSearching = false;
    }, 1000); // โชว์ superposition 1 วินาที
  }, 100);
}

// --- Lesson 2 Interactive Functions ---

function toggleL2Bit() {
  const el = document.getElementById("l2-bit-display");
  if (!el) return;
  if (el.textContent === "0") {
    el.textContent = "1";
    el.classList.replace("text-slate-400", "text-slate-800");
  } else {
    el.textContent = "0";
    el.classList.replace("text-slate-800", "text-slate-400");
  }
}

let isCoinSpinning = true;
let spinInterval;

function spinCoin() {
  const coin = document.getElementById("coin-element");
  const text = document.getElementById("coin-text");
  const status = document.getElementById("coin-status");

  if (!coin) return;

  isCoinSpinning = true;
  // เปลี่ยน animate-spin เป็น animate-coin-flip
  coin.classList.add("animate-coin-flip", "border-dashed", "bg-yellow-300");
  coin.classList.remove("bg-yellow-200");

  text.textContent = "0/1";
  text.classList.remove("text-4xl");
  text.classList.add("text-2xl");
  status.textContent = "เหรียญกำลังหมุน! เป็นทั้ง 0 และ 1 พร้อมกัน (Superposition)";
  status.className = "text-sm font-medium text-blue-600 mt-4 h-6";
}

function stopCoin() {
  const coin = document.getElementById("coin-element");
  const text = document.getElementById("coin-text");
  const status = document.getElementById("coin-status");

  if (!coin || !isCoinSpinning) return;

  isCoinSpinning = false;
  // ถอด animate-coin-flip ออกเมื่อกดหยุด
  coin.classList.remove("animate-coin-flip", "border-dashed", "bg-yellow-300");
  coin.classList.add("bg-yellow-200");

  // สุ่ม 0 หรือ 1
  const result = Math.random() < 0.5 ? "0" : "1";
  text.textContent = result;
  text.classList.remove("text-2xl");
  text.classList.add("text-4xl");

  status.textContent = `เหรียญหยุดแล้ว! ออกผลลัพธ์เป็น ${result}`;
  status.className = "text-sm font-bold text-rose-600 mt-4 h-6";
}

// ค่าเริ่มต้นของ Probability
let currentProb0 = 70;

function updateL2Probability(value) {
  currentProb0 = Number(value);
  const prob1 = 100 - currentProb0;

  // Update Text
  document.getElementById("prob-val-0").textContent = currentProb0;
  document.getElementById("prob-val-1").textContent = prob1;

  // Update Bars
  document.getElementById("prob-bar-0").style.width = `${currentProb0}%`;
  document.getElementById("prob-bar-1").style.width = `${prob1}%`;

  // ซ่อน Overlay ถ้ายูสเซอร์เลื่อน Slider ใหม่ (เตรียมวัดค่าใหม่)
  document.getElementById("measure-overlay").classList.add("hidden");
  document.getElementById("measure-overlay").classList.remove("flex");
}

function measureL2Qubit() {
  const overlay = document.getElementById("measure-overlay");
  const resultText = document.getElementById("measure-result");

  if (!overlay) return;

  // สุ่มตัวเลข 0-100 เทียบกับโอกาสของ 0
  const randomRoll = Math.random() * 100;
  const finalResult = randomRoll < currentProb0 ? "0" : "1";

  // แสดงผล
  resultText.textContent = finalResult;
  overlay.classList.remove("hidden");
  overlay.classList.add("flex");

  // Animation เล็กน้อยให้ดู Impact
  overlay.animate([
    { opacity: 0, transform: 'scale(0.95)' },
    { opacity: 1, transform: 'scale(1)' }
  ], { duration: 200, easing: 'ease-out' });
}

// Register Window Functions สำหรับ Lesson 2
window.toggleL2Bit = toggleL2Bit;
window.spinCoin = spinCoin;
window.stopCoin = stopCoin;
window.updateL2Probability = updateL2Probability;
window.measureL2Qubit = measureL2Qubit;

// ตอน Load บทเรียน อย่าลืมสั่งหมุนเหรียญเป็นค่าเริ่มต้น
const originalLoadLesson = window.loadLesson;
window.loadLesson = function (index) {
  originalLoadLesson(index);
  if (index === 1) { // ถ้าเป็นบทที่ 2 (index 1)
    setTimeout(() => {
      spinCoin();
      lucide.createIcons(); // วาด icon ใหม่
    }, 100);
  }
};

// --- Lesson 3 Interactive Functions ---

let l3Prob0 = 70; // ค่าเริ่มต้น P(0)

function updateL3Slider(value) {
  l3Prob0 = parseInt(value);
  const l3Prob1 = 100 - l3Prob0;
  
  // อัปเดตตัวเลขเปอร์เซ็นต์
  document.getElementById("l3-val-0").textContent = l3Prob0;
  document.getElementById("l3-val-1").textContent = l3Prob1;
  
  // อัปเดตกราฟแท่ง (Probability)
  document.getElementById("l3-bar-0").style.width = `${l3Prob0}%`;
  document.getElementById("l3-bar-1").style.width = `${l3Prob1}%`;
  
  // รีเซ็ตผลการทดลอง (เผื่อผู้ใช้เปลี่ยนค่ากลางคัน)
  document.getElementById("l3-single-result").textContent = "?";
  document.getElementById("l3-single-result").className = "text-5xl font-bold text-slate-300 font-['Space_Mono'] transition-all";
  
  document.getElementById("l3-multi-count-0").textContent = "0";
  document.getElementById("l3-multi-count-1").textContent = "0";
  document.getElementById("l3-multi-bar-0").style.width = "0%";
  document.getElementById("l3-multi-bar-1").style.width = "0%";
  document.getElementById("l3-multi-insight").textContent = "คุณเปลี่ยนความน่าจะเป็น ลองรันการทดลองใหม่ดูสิ!";
}

function measureL3Single() {
  const resultEl = document.getElementById("l3-single-result");
  
  // สุ่ม 0-100 เทียบกับ l3Prob0
  const randomRoll = Math.random() * 100;
  const finalResult = randomRoll < l3Prob0 ? "0" : "1";
  
  // แสดงผล
  resultEl.textContent = finalResult;
  resultEl.className = `text-6xl font-bold font-['Space_Mono'] transition-all transform scale-110 ${finalResult === "0" ? "text-slate-700" : "text-blue-600"}`;
  
  // เด้งกลับขนาดเดิม
  setTimeout(() => {
    resultEl.classList.remove("scale-110", "text-6xl");
    resultEl.classList.add("text-5xl");
  }, 200);
}

function runL3Multi(times) {
  let count0 = 0;
  let count1 = 0;
  
  // จำลองการวัดผลหลายรอบ
  for (let i = 0; i < times; i++) {
    const randomRoll = Math.random() * 100;
    if (randomRoll < l3Prob0) {
      count0++;
    } else {
      count1++;
    }
  }
  
  // คำนวณความยาวของกราฟผลลัพธ์ (เทียบจากจำนวนครั้งทั้งหมด)
  const pct0 = (count0 / times) * 100;
  const pct1 = (count1 / times) * 100;
  
  // อัปเดต UI
  document.getElementById("l3-multi-count-0").textContent = count0;
  document.getElementById("l3-multi-count-1").textContent = count1;
  document.getElementById("l3-multi-bar-0").style.width = `${pct0}%`;
  document.getElementById("l3-multi-bar-1").style.width = `${pct1}%`;
  
  // แสดง Insight สรุป
  const insightEl = document.getElementById("l3-multi-insight");
  if (times >= 50) {
    insightEl.innerHTML = `สังเกตไหมว่าสัดส่วนผลลัพธ์ <strong class="text-white">${pct0.toFixed(0)}% / ${pct1.toFixed(0)}%</strong> ใกล้เคียงกับ P(0)=${l3Prob0}% / P(1)=${100-l3Prob0}% ที่เราตั้งไว้มาก!`;
  } else {
    insightEl.textContent = "รันจำนวนน้อยครั้ง ผลลัพธ์อาจจะยังแกว่งอยู่ ลองรัน 100 ครั้งดูสิ!";
  }
}

// --- Lesson 4 Interactive Functions (Bloch Sphere) ---

// พิกัด 3D ของ Quantum State (เริ่มที่ขั้วเหนือ |0>)
let l4_qx = 0; 
let l4_qy = 0; 
let l4_qz = 1;

// ตัวแปรสำหรับหมุนมุมกล้องของลูกบอล
let l4_isDragging = false;
let l4_prevMousePos = { x: 0, y: 0 };
let l4_sphereRotX = -15;
let l4_sphereRotY = -30;

function initL4Drag() {
  const container = document.getElementById('l4-sphere-container');
  if(!container) return;
  
  // ลบ Event Listener เก่าทิ้งก่อน (ป้องกันการผูกซ้ำถ้าโหลดบทเรียนซ้ำ)
  container.onmousedown = null;
  window.onmouseup = null;
  window.onmousemove = null;

  container.onmousedown = (e) => {
    l4_isDragging = true;
    l4_prevMousePos = { x: e.clientX, y: e.clientY };
    container.classList.add('cursor-grabbing');
  };

  window.onmouseup = () => {
    l4_isDragging = false;
    if(container) container.classList.remove('cursor-grabbing');
  };

  window.onmousemove = (e) => {
    if (!l4_isDragging) return;
    const deltaX = e.clientX - l4_prevMousePos.x;
    const deltaY = e.clientY - l4_prevMousePos.y;
    
    l4_sphereRotY += deltaX * 0.6;
    l4_sphereRotX -= deltaY * 0.6; 
    
    // จำกัดการก้ม/เงย ไม่ให้ตีลังกา
    l4_sphereRotX = Math.max(-80, Math.min(80, l4_sphereRotX));
    
    document.getElementById('l4-bloch-sphere').style.transform = `rotateX(${l4_sphereRotX}deg) rotateY(${l4_sphereRotY}deg)`;
    l4_prevMousePos = { x: e.clientX, y: e.clientY };
  };
}

function updateL4Vector() {
  // Normalize (ป้องกันตัวเลขคลาดเคลื่อนจากการหมุนหลายรอบ)
  const r = Math.sqrt(l4_qx*l4_qx + l4_qy*l4_qy + l4_qz*l4_qz);
  l4_qx /= r; l4_qy /= r; l4_qz /= r;

  // แปลงพิกัด 3D กลับเป็นมุม Theta (ขั้ว) และ Phi (เส้นศูนย์สูตร)
  const theta = Math.acos(l4_qz) * 180 / Math.PI;
  const phi = Math.atan2(l4_qy, l4_qx) * 180 / Math.PI;

  const container = document.getElementById('l4-vector-container');
  if(container) {
    // การหมุน CSS: หมุนเส้นศูนย์สูตร (Y) ก่อน แล้วค่อยก้มลงมา (Z)
    container.style.transform = `rotateY(${-phi}deg) rotateZ(${theta}deg)`;
  }

  // อัปเดตข้อความบอกสถานะ
  const status = document.getElementById('l4-bloch-status');
  if(status) {
    if(l4_qz >= 0.99) status.innerHTML = "สถานะปัจจุบัน: <strong>|0⟩</strong> (ขั้วเหนือ)";
    else if(l4_qz <= -0.99) status.innerHTML = "สถานะปัจจุบัน: <strong>|1⟩</strong> (ขั้วใต้)";
    else if(Math.abs(l4_qz) < 0.05) status.innerHTML = "สถานะปัจจุบัน: <strong>Superposition</strong> 50/50 (เส้นศูนย์สูตร)";
    else status.innerHTML = "สถานะปัจจุบัน: <strong>Superposition</strong> (ผสมในอัตราส่วนที่ไม่เท่ากัน)";
  }
}

function setL4State(state) {
  if(state === '0') { l4_qx = 0; l4_qy = 0; l4_qz = 1; }
  if(state === '1') { l4_qx = 0; l4_qy = 0; l4_qz = -1; }
  if(state === 'sup') { l4_qx = 1; l4_qy = 0; l4_qz = 0; }
  updateL4Vector();
}

function rotateL4Bloch(axis) {
  const rad = Math.PI / 2; // สั่งหมุนทีละ 90 องศาให้เห็นภาพง่ายๆ
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  let nx = l4_qx, ny = l4_qy, nz = l4_qz;

  // สูตรหมุน 3D Matrix แบบง่ายๆ
  if(axis === 'X') {
    ny = l4_qy * cos - l4_qz * sin;
    nz = l4_qy * sin + l4_qz * cos;
  } else if(axis === 'Y') {
    nx = l4_qx * cos + l4_qz * sin;
    nz = -l4_qx * sin + l4_qz * cos;
  } else if(axis === 'Z') {
    nx = l4_qx * cos - l4_qy * sin;
    ny = l4_qx * sin + l4_qy * cos;
  }
  
  l4_qx = nx; l4_qy = ny; l4_qz = nz;
  updateL4Vector();
}

window.loadLesson = loadLesson;
window.goToNextLesson = goToNextLesson;
window.updateProbability = updateProbability;
window.measureQubit = measureQubit;
window.showGateDetails = showGateDetails;
window.updateRotationDemo = updateRotationDemo;
window.setRotationAxis = setRotationAxis;
window.toggleBit = toggleBit;
window.updateQubitSlider = updateQubitSlider;
window.runClassicalSearch = runClassicalSearch;
window.runQuantumSearch = runQuantumSearch;
window.updateL3Slider = updateL3Slider;
window.measureL3Single = measureL3Single;
window.runL3Multi = runL3Multi;
window.setL4State = setL4State;
window.rotateL4Bloch = rotateL4Bloch;

document.addEventListener("DOMContentLoaded", () => {
  loadLesson(0);
  lucide.createIcons();
});

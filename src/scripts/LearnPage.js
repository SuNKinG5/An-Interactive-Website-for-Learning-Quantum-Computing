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

  // เช็คของบทที่ 5
  setTimeout(() => {
    const l5Container = document.getElementById('l5-sphere-container');
    if (l5Container) {
      l5_qx = 0; l5_qy = 0; l5_qz = 1; // รีเซ็ตตำแหน่ง
      l5_currentTheta = 0;             // รีเซ็ตมุมสะสม
      l5_currentPhi = 0;               // รีเซ็ตมุมสะสม
      initL5Drag();
      updateL5Vector();
    }
  }, 100);

  setTimeout(() => {
    const l6Container = document.getElementById('l6-sphere-container');
    if (l6Container) {
      // รีเซ็ตค่าเมื่อเปลี่ยนหน้า
      l6_int1_isSuperpos = false;
      l6_bloch_isSuperpos = false;
      l6_int4_step = 0;
      
      initL6Drag();
    }
  }, 100);

  // เช็คของบทที่ 7 (Multiple Qubits)
  setTimeout(() => {
    const l7Display = document.getElementById('l7-int1-display');
    if (l7Display) {
      // รีเซ็ตค่ากลับเป็นค่าตั้งต้นทุกครั้งที่เปิดบทเรียนนี้
      applyL7Reset();
      document.querySelector('input[type="range"]').value = 2; // รีเซ็ต slider
      updateL7Int2Slider(2);
    }
  }, 100);

  // เช็คของบทที่ 8 (Entanglement)
  setTimeout(() => {
    const l8Container = document.getElementById('l8-qa-ball');
    if (l8Container) {
      resetL8(); // ล้างค่าและ UI กลับเป็น 100% |00>
    }
  }, 100);

  // เช็คของบทที่ 9 (Quantum Circuits)
  setTimeout(() => {
    const l9Node = document.getElementById('l9-node-1');
    if (l9Node) {
      l9ResetStep(); // รีเซ็ต Simulation แบบขั้นบันได
      l9ClearCircuit(); // ล้างกระดานต่อ Gate
      
      const out0 = document.getElementById('l9-out-0');
      if (out0) out0.style.opacity = '0';
      const out1 = document.getElementById('l9-out-1');
      if (out1) out1.style.opacity = '0';
      const entDesc = document.getElementById('l9-entangle-desc');
      if (entDesc) entDesc.innerText = '';
    }
  }, 100);

  // เช็คของบทที่ 10 (Quantum Algorithms)
  setTimeout(() => {
    const l10Box = document.getElementById('l10-box-0');
    if (l10Box) {
      l10ResetSearch();
      l10ResetGrover();
    }
  }, 100);
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


// Lesson 5: Quantum Gates Lab (CSS Sphere)

let l5_rotX = -15, l5_rotY = -30; 
let l5_qx = 0, l5_qy = 0, l5_qz = 1; // สถานะเริ่มต้น |0>

// [เพิ่มใหม่] ตัวแปรเก็บมุมสะสม เพื่อป้องกัน CSS หมุนย้อนกลับ
let l5_currentTheta = 0;
let l5_currentPhi = 0;

function initL5Drag() {
  const container = document.getElementById('l5-sphere-container');
  const sphere = document.getElementById('l5-bloch-sphere');
  if (!container || !sphere) return;

  let isDragging = false;
  let prevPos = { x: 0, y: 0 };

  container.onmousedown = null;
  window.onmouseup = null;
  window.onmousemove = null;

  container.onmousedown = (e) => {
    isDragging = true;
    prevPos = { x: e.clientX, y: e.clientY };
  };

  window.addEventListener('mouseup', () => isDragging = false);
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - prevPos.x;
    const deltaY = e.clientY - prevPos.y;

    l5_rotY += deltaX * 0.5;
    l5_rotX -= deltaY * 0.5;
    l5_rotX = Math.max(-90, Math.min(90, l5_rotX)); 

    sphere.style.transform = `rotateX(${l5_rotX}deg) rotateY(${l5_rotY}deg)`;
    prevPos = { x: e.clientX, y: e.clientY };
  });
}

// [เพิ่มใหม่] ฟังก์ชันคำนวณทิศทางการหมุน ให้เดินหน้าเสมอถ้าระยะทางเท่ากัน
function getNextContinuousAngle(current, target) {
  let diff = (target - (current % 360)) % 360;
  if (diff < 0) diff += 360;
  // ถ้าหมุนเกิน 180 องศา ให้เลือกทางที่สั้นกว่า (หมุนย้อนกลับ)
  // **ยกเว้น** กรณีตั้งใจหมุน 180 องศาเป๊ะๆ (Gate X, Y, Z) ให้หมุนเดินหน้าต่อไป!
  if (diff > 180 && diff !== 180) diff -= 360;
  return current + diff;
}

function updateL5Vector() {
  const vector = document.getElementById('l5-vector-container');
  const status = document.getElementById('l5-bloch-status');
  if (!vector || !status) return;

  const length = Math.sqrt(l5_qx**2 + l5_qy**2 + l5_qz**2) || 1;
  const nx = l5_qx / length, ny = l5_qy / length, nz = l5_qz / length;

  // 1. คำนวณมุมเป้าหมายแบบ Absolute ปกติ
  const targetTheta = Math.round(Math.acos(nz) * (180 / Math.PI));
  const targetPhi = Math.round(Math.atan2(ny, nx) * (180 / Math.PI));

  // 2. คอนเวิร์ตให้เป็น "มุมสะสมต่อเนื่อง" เพื่อหลอก CSS 
  l5_currentTheta = getNextContinuousAngle(l5_currentTheta, targetTheta);
  l5_currentPhi = getNextContinuousAngle(l5_currentPhi, targetPhi);

  // 3. ใช้มุมที่สะสมแล้วสั่งหมุน
  vector.style.transform = `rotateY(${l5_currentPhi}deg) rotateZ(${l5_currentTheta}deg)`;

  // อัปเดตข้อความบอกสถานะคร่าวๆ
  if (nz >= 0.99) status.innerHTML = "สถานะปัจจุบัน: <strong>|0⟩</strong> (ขั้วเหนือ)";
  else if (nz <= -0.99) status.innerHTML = "สถานะปัจจุบัน: <strong>|1⟩</strong> (ขั้วใต้)";
  else if (nx >= 0.99) status.innerHTML = "สถานะปัจจุบัน: <strong>|+⟩</strong> (ชี้มาแกน X แนวหน้า)";
  else if (nx <= -0.99) status.innerHTML = "สถานะปัจจุบัน: <strong>|-⟩</strong> (ชี้ไปแกน -X แนวหลัง)";
  else status.innerHTML = "สถานะปัจจุบัน: <strong>Superposition / Mixed</strong>";
}

function applyL5Gate(gate) {
  if (gate === 'X') {
    l5_qy = -l5_qy;
    l5_qz = -l5_qz;
  } else if (gate === 'Y') {
    l5_qx = -l5_qx;
    l5_qz = -l5_qz;
  } else if (gate === 'Z') {
    l5_qx = -l5_qx;
    l5_qy = -l5_qy;
  } else if (gate === 'H') {
    let temp = l5_qx;
    l5_qx = l5_qz;
    l5_qz = temp;
    l5_qy = -l5_qy;
  } else if (gate === 'reset') {
    l5_qx = 0; l5_qy = 0; l5_qz = 1;
  }
  
  // สั่งอัปเดตตำแหน่งลูกศรทันที
  updateL5Vector();
}


// Lesson 6: Hadamard Gate (H Gate)


// Interactive 1: Create Superposition
let l6_int1_isSuperpos = false;
function toggleL6Int1() {
  l6_int1_isSuperpos = !l6_int1_isSuperpos;
  
  const box = document.getElementById('l6-int1-box');
  const stateTxt = document.getElementById('l6-int1-state');
  const descTxt = document.getElementById('l6-int1-desc');
  const bar0 = document.getElementById('l6-int1-bar0');
  const bar1 = document.getElementById('l6-int1-bar1');
  const val0 = document.getElementById('l6-int1-val0');
  const val1 = document.getElementById('l6-int1-val1');

  if (l6_int1_isSuperpos) {
    box.className = "flex-1 bg-indigo-50/50 p-6 rounded-2xl border border-indigo-200 text-center relative overflow-hidden transition-all duration-500 shadow-inner";
    stateTxt.innerText = "|+⟩";
    stateTxt.className = "text-5xl font-bold text-rose-500 mb-2 font-mono transition-all scale-110";
    descTxt.innerText = "Superposition (ผสม 0 และ 1)";
    bar0.style.width = "50%";
    bar1.style.width = "50%";
    val0.innerText = "50%";
    val1.innerText = "50%";
  } else {
    box.className = "flex-1 bg-slate-50 p-6 rounded-2xl border text-center relative overflow-hidden transition-all duration-500";
    stateTxt.innerText = "|0⟩";
    stateTxt.className = "text-5xl font-bold text-slate-800 mb-2 font-mono transition-all";
    descTxt.innerText = "สถานะแน่นอน (100%)";
    bar0.style.width = "100%";
    bar1.style.width = "0%";
    val0.innerText = "100%";
    val1.innerText = "0%";
  }
}

// Interactive 2: Bloch Sphere
let l6_rotX = -15, l6_rotY = -30; 
let l6_bloch_isSuperpos = false;

function initL6Drag() {
  const container = document.getElementById('l6-sphere-container');
  const sphere = document.getElementById('l6-bloch-sphere');
  if (!container || !sphere) return;

  let isDragging = false;
  let prevPos = { x: 0, y: 0 };

  container.onmousedown = null;
  window.onmouseup = null;
  window.onmousemove = null;

  container.onmousedown = (e) => {
    isDragging = true;
    prevPos = { x: e.clientX, y: e.clientY };
  };

  window.addEventListener('mouseup', () => isDragging = false);
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - prevPos.x;
    const deltaY = e.clientY - prevPos.y;

    l6_rotY += deltaX * 0.5;
    l6_rotX -= deltaY * 0.5;
    l6_rotX = Math.max(-90, Math.min(90, l6_rotX)); 

    sphere.style.transform = `rotateX(${l6_rotX}deg) rotateY(${l6_rotY}deg)`;
    prevPos = { x: e.clientX, y: e.clientY };
  });
}

function applyL6BlochH() {
  l6_bloch_isSuperpos = !l6_bloch_isSuperpos;
  const vector = document.getElementById('l6-vector-container');
  const status = document.getElementById('l6-bloch-status');
  
  if (!vector || !status) return;

  // สำหรับ H Gate ง่ายๆ แค่หมุนลงมาตามแกน Z สู่แกน X
  if (l6_bloch_isSuperpos) {
    vector.style.transform = "rotateY(0deg) rotateZ(90deg)";
    status.innerHTML = "สถานะปัจจุบัน: <strong>|+⟩</strong> (Superposition / เส้นศูนย์สูตร)";
  } else {
    vector.style.transform = "rotateY(0deg) rotateZ(0deg)";
    status.innerHTML = "สถานะปัจจุบัน: <strong>|0⟩</strong> (ขั้วเหนือ / ค่าแน่นอน)";
  }
}

// Interactive 3: Apply H Twice
let l6_int4_step = 0;
function applyL6Twice() {
  const btn = document.getElementById('l6-int4-btn');
  const state2 = document.getElementById('l6-int4-state2');
  const state3 = document.getElementById('l6-int4-state3');
  const arrow1 = document.getElementById('l6-int4-arrow1');
  const arrow2 = document.getElementById('l6-int4-arrow2');

  l6_int4_step = (l6_int4_step + 1) % 3;

  if (l6_int4_step === 1) {
    // 1st press
    state2.innerText = "|+⟩";
    state2.classList.remove('opacity-50');
    arrow1.classList.remove('text-slate-500');
    arrow1.classList.add('text-rose-500');
    btn.innerText = "กด H Gate (ครั้งที่ 2)";
    btn.className = "bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-bold shadow-md transition-all flex items-center gap-2 mx-auto";
  } else if (l6_int4_step === 2) {
    // 2nd press
    state3.innerText = "|0⟩";
    state3.classList.remove('opacity-50');
    arrow2.classList.remove('text-slate-500');
    arrow2.classList.add('text-blue-500');
    btn.innerText = "รีเซ็ต (Reset)";
    btn.className = "bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-full font-bold shadow-md transition-all flex items-center gap-2 mx-auto";
  } else {
    // Reset
    state2.innerText = "?";
    state2.classList.add('opacity-50');
    state3.innerText = "?";
    state3.classList.add('opacity-50');
    arrow1.classList.remove('text-rose-500');
    arrow2.classList.remove('text-blue-500');
    btn.innerText = "กด H Gate (ครั้งที่ 1)";
    btn.className = "bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-full font-bold shadow-md transition-all flex items-center gap-2 mx-auto";
  }
}


// Lesson 7: Multiple Qubits Interactives


// Interactive 1: State Explorer
function setL7Int1State(state) {
  const display = document.getElementById('l7-int1-display');
  if (!display) return;
  
  // เด้ง Animation เล็กน้อยตอนเปลี่ยนค่า
  display.classList.remove('scale-100');
  display.classList.add('scale-110', 'text-blue-600');
  display.innerText = `|${state}⟩`;
  
  setTimeout(() => {
    display.classList.remove('scale-110', 'text-blue-600');
    display.classList.add('scale-100');
  }, 150);
}

// Interactive 2: Qubit Counter (Exponential Slider)
function updateL7Int2Slider(qubits) {
  const numStates = Math.pow(2, qubits);
  
  document.getElementById('l7-int2-qubits').innerText = qubits;
  
  // ฟอร์แมตตัวเลขให้มีคอมม่า (เช่น 1,024)
  document.getElementById('l7-int2-states').innerText = numStates.toLocaleString();
}

// Interactive 3: Multi-State Superposition Bar Chart
function applyL7Reset() {
  updateL7BarChart(100, 0, 0, 0);
  
  document.getElementById('l7-int3-badge').innerText = "สถานะแน่นอน (Deterministic)";
  document.getElementById('l7-int3-badge').className = "px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full transition-all";
  document.getElementById('l7-int3-desc').innerHTML = "ระบบกลับมาเริ่มต้นที่สถานะ <strong>|00⟩</strong> 100%";
}

function applyL7HGateAll() {
  // เมื่อใส่ H gate เข้าไป 2 ตัว จะได้ 25% เท่ากันหมด (1/4 probability)
  updateL7BarChart(25, 25, 25, 25);
  
  document.getElementById('l7-int3-badge').innerText = "Superposition แบบสมบูรณ์";
  document.getElementById('l7-int3-badge').className = "px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full transition-all";
  document.getElementById('l7-int3-desc').innerHTML = "สุดยอด! ควอนตัมกำลังประมวลผล <strong>4 คำตอบ (สถานะ) พร้อมกันในเสี้ยววินาที</strong>";
}

// ฟังก์ชันช่วยเหลือสำหรับอัปเดตแท่งกราฟ
function updateL7BarChart(v00, v01, v10, v11) {
  const vals = [
    { id: '00', val: v00 },
    { id: '01', val: v01 },
    { id: '10', val: v10 },
    { id: '11', val: v11 }
  ];
  
  vals.forEach(item => {
    const bar = document.getElementById(`l7-int3-bar${item.id}`);
    const text = document.getElementById(`l7-int3-val${item.id}`);
    
    if (bar && text) {
      bar.style.height = `${item.val}%`;
      text.innerText = `${item.val}%`;
      
      // เปลี่ยนสีตามค่าความน่าจะเป็น
      if (item.val > 0) {
        bar.classList.remove('bg-blue-200', 'shadow-none');
        bar.classList.add('bg-blue-500', 'shadow-[0_0_15px_rgba(59,130,246,0.5)]');
        text.classList.remove('text-slate-400');
        text.classList.add('text-blue-600');
      } else {
        bar.classList.remove('bg-blue-500', 'shadow-[0_0_15px_rgba(59,130,246,0.5)]', 'bg-blue-500', 'shadow-[0_0_15px_rgba(99,102,241,0.4)]');
        bar.classList.add('bg-blue-200');
        text.classList.remove('text-blue-600', 'text-slate-500');
        text.classList.add('text-slate-400');
      }
    }
  });
}

// ==========================================
// Lesson 8: Entanglement Interactives
// ==========================================

let l8_isEntangled = false;
let l8_isMeasured = false;

function createL8Entanglement() {
  if (l8_isMeasured) return; // ถ้าวัดไปแล้ว ห้ามทำซ้ำจนกว่าจะรีเซ็ต
  
  l8_isEntangled = true;
  
  // UI อัปเดตทรงกลม Qubit
  const qaBall = document.getElementById('l8-qa-ball');
  const qbBall = document.getElementById('l8-qb-ball');
  const qaVal = document.getElementById('l8-qa-val');
  const qbVal = document.getElementById('l8-qb-val');
  
  qaBall.style.backgroundColor = '#115e59'; // teal-800
  qaBall.style.borderColor = '#2dd4bf'; // teal-400
  qbBall.style.backgroundColor = '#115e59';
  qbBall.style.borderColor = '#2dd4bf';
  
  qaVal.innerText = "?";
  qaVal.style.color = '#fff';
  qbVal.innerText = "?";
  qbVal.style.color = '#fff';

  // อัปเดตเส้นเชื่อม
  const linkGlow = document.getElementById('l8-link-glow');
  linkGlow.style.opacity = '1';
  linkGlow.style.transform = 'translateX(0)';
  // ให้ไฟวิ่งสลับไปมา
  linkGlow.classList.add('animate-pulse');

  // อัปเดตกราฟ (50% |00> และ 50% |11>)
  updateL8BarChart(50, 0, 0, 50);

  // เปลี่ยนสถานะข้อความและปุ่ม
  document.getElementById('l8-status-text').innerHTML = "<span class='text-teal-400 font-bold'>สร้าง Entanglement สำเร็จ! (สถานะคือ 50% |00⟩ + 50% |11⟩)</span>";
  
  const measureBtn = document.getElementById('l8-btn-measure');
  measureBtn.disabled = false;
  measureBtn.className = "px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-bold flex flex-col items-center gap-1 transition-all w-full max-w-sm shadow-lg shadow-rose-200 transform hover:-translate-y-1";
  measureBtn.innerHTML = `<i data-lucide="crosshair" class="w-6 h-6"></i> <span>Measure Qubit A</span><span class="text-xs font-normal opacity-90">(คลิกและลองสังเกตุผลลัพธ์ของ Qubit B)</span>`;
  lucide.createIcons();
}

function measureL8QubitA() {
  if (!l8_isEntangled || l8_isMeasured) return;
  l8_isMeasured = true;

  // สุ่มผลลัพธ์ 0 หรือ 1
  const result = Math.random() < 0.5 ? 0 : 1;
  
  // อัปเดต Qubit A
  const qaBall = document.getElementById('l8-qa-ball');
  const qaVal = document.getElementById('l8-qa-val');
  qaBall.style.backgroundColor = '#f8fafc'; // slate-50
  qaBall.style.borderColor = '#cbd5e1'; // slate-300
  qaVal.innerText = result;
  qaVal.style.color = '#0f172a'; // slate-900

  // 💥 จุดว้าว: อัปเดต Qubit B ให้ตรงกันทันที 💥
  setTimeout(() => {
    const qbBall = document.getElementById('l8-qb-ball');
    const qbVal = document.getElementById('l8-qb-val');
    
    // ใส่ Effect แฟลชสว่างวาบให้ Qubit B ก่อนเปลี่ยนค่า
    qbBall.style.boxShadow = '0 0 30px rgba(45, 212, 191, 1)';
    
    setTimeout(() => {
      qbBall.style.backgroundColor = '#f8fafc';
      qbBall.style.borderColor = '#cbd5e1';
      qbBall.style.boxShadow = 'none';
      qbVal.innerText = result;
      qbVal.style.color = '#0f172a';
      
      // ลบเส้นเชื่อม (เพราะโดน Measure แล้ว Entanglement แตกสลาย)
      document.getElementById('l8-link-glow').style.opacity = '0';
      document.getElementById('l8-link-glow').classList.remove('animate-pulse');

      // อัปเดตกราฟ (100% |00> หรือ 100% |11>)
      if (result === 0) {
        updateL8BarChart(100, 0, 0, 0);
        document.getElementById('l8-status-text').innerHTML = "ผลลัพธ์: ได้ <strong class='text-white'>|00⟩</strong> 100% (Entanglement แตกสลายแล้ว)";
      } else {
        updateL8BarChart(0, 0, 0, 100);
        document.getElementById('l8-status-text').innerHTML = "ผลลัพธ์: ได้ <strong class='text-white'>|11⟩</strong> 100% (Entanglement แตกสลายแล้ว)";
      }
    }, 300); // ดีเลย์นิดเดียวให้เห็นแฟลช
  }, 100); // ดีเลย์นิดนึงให้ดูเหมือนวิ่งจาก A ไป B
  
  // ปิดปุ่ม
  const measureBtn = document.getElementById('l8-btn-measure');
  measureBtn.disabled = true;
  measureBtn.className = "px-8 py-4 bg-slate-200 text-slate-400 cursor-not-allowed rounded-2xl font-bold flex flex-col items-center gap-1 transition-all w-full max-w-sm";
  measureBtn.innerHTML = `<i data-lucide="check-circle" class="w-6 h-6"></i> <span>วัดค่าเสร็จสมบูรณ์</span>`;
  lucide.createIcons();
}

function resetL8() {
  l8_isEntangled = false;
  l8_isMeasured = false;
  
  // คืนค่า UI ลูกบอล
  const qaBall = document.getElementById('l8-qa-ball');
  const qbBall = document.getElementById('l8-qb-ball');
  const qaVal = document.getElementById('l8-qa-val');
  const qbVal = document.getElementById('l8-qb-val');
  
  qaBall.style.backgroundColor = '#334155'; // slate-700
  qaBall.style.borderColor = '#475569'; // slate-600
  qbBall.style.backgroundColor = '#334155';
  qbBall.style.borderColor = '#475569';
  qaBall.style.boxShadow = 'none';
  qbBall.style.boxShadow = 'none';
  
  qaVal.innerText = "?";
  qaVal.style.color = '#94a3b8'; // slate-400
  qbVal.innerText = "?";
  qbVal.style.color = '#94a3b8';

  // ปิดไฟเส้นเชื่อม
  const linkGlow = document.getElementById('l8-link-glow');
  if (linkGlow) {
    linkGlow.style.opacity = '0';
    linkGlow.style.transform = 'translateX(-100%)';
    linkGlow.classList.remove('animate-pulse');
  }

  // รีเซ็ตกราฟ
  updateL8BarChart(100, 0, 0, 0);

  // รีเซ็ตข้อความและปุ่ม
  const statusTxt = document.getElementById('l8-status-text');
  if (statusTxt) statusTxt.innerHTML = "ตอนนี้ Qubit ทั้งสองยังไม่ได้เชื่อมกัน (อยู่ในสถานะ |00⟩)";
  
  const measureBtn = document.getElementById('l8-btn-measure');
  if (measureBtn) {
    measureBtn.disabled = true;
    measureBtn.className = "px-8 py-4 bg-slate-200 text-slate-400 cursor-not-allowed rounded-2xl font-bold flex flex-col items-center gap-1 transition-all w-full max-w-sm";
    measureBtn.innerHTML = `<i data-lucide="crosshair" class="w-6 h-6"></i> <span>Measure Qubit A</span><span class="text-xs font-normal opacity-80">(ต้องสร้าง Entanglement ก่อน)</span>`;
    lucide.createIcons();
  }
}

function updateL8BarChart(v00, v01, v10, v11) {
  const vals = [
    { id: '00', val: v00 },
    { id: '01', val: v01 },
    { id: '10', val: v10 },
    { id: '11', val: v11 }
  ];
  
  vals.forEach(item => {
    const bar = document.getElementById(`l8-bar-${item.id}`);
    const text = document.getElementById(`l8-val-${item.id}`);
    
    if (bar && text) {
      bar.style.width = `${item.val}%`;
      text.innerText = `${item.val}%`;
      
      // สลับสีให้ตรงเป๊ะ
      if (item.val > 0) {
        bar.style.backgroundColor = '#14b8a6'; // teal-500
        text.style.color = '#fff';
      } else {
        bar.style.backgroundColor = '#64748b'; // slate-500
        text.style.color = '#94a3b8'; // slate-400
      }
    }
  });
}

// ==========================================
// Lesson 9: Quantum Circuits Interactives
// ==========================================

// --- Interactive 2: Step-by-Step ---
let l9_step = 0;
const l9_maxStep = 3;

function l9ResetStep() {
  l9_step = 0;
  updateL9StepUI();
}

function l9NextStep() {
  if (l9_step < l9_maxStep) {
    l9_step++;
    updateL9StepUI();
  }
}

function updateL9StepUI() {
  const node1 = document.getElementById('l9-node-1');
  const node2 = document.getElementById('l9-node-2');
  const node3 = document.getElementById('l9-node-3');
  const label = document.getElementById('l9-step-label');
  const desc = document.getElementById('l9-step-desc');
  const btnNext = document.getElementById('l9-btn-next');

  // รีเซ็ตสไตล์
  [node1, node2, node3].forEach(n => {
    n.style.borderColor = '#64748b'; // slate-500
    n.style.backgroundColor = '#334155'; // slate-700
    n.style.color = '#fff';
    n.style.boxShadow = 'none';
  });

  if (l9_step === 0) {
    label.innerText = "จุดเริ่มต้น (Start)";
    desc.innerHTML = "Qubit เริ่มต้นที่สถานะ <strong class='text-white'>|0⟩</strong> แบบ 100%";
    btnNext.disabled = false;
    btnNext.style.opacity = '1';
  } 
  else if (l9_step === 1) {
    node1.style.borderColor = '#518adf'; 
    node1.style.backgroundColor = '#3982be'; 
    node1.style.boxShadow = '0 0 15px rgba(30, 90, 158, 0.6)';
    label.innerText = "Step 1: H Gate (Hadamard)";
    desc.innerHTML = "แยกเส้นทาง! สร้าง <strong>Superposition</strong> (50% |0⟩ และ 50% |1⟩)";
  } 
  else if (l9_step === 2) {
    node1.style.borderColor = '#64748b';
    node1.style.backgroundColor = '#334155';
    node2.style.borderColor = '#518adf'; 
    node2.style.backgroundColor = '#3982be'; 
    node2.style.boxShadow = '0 0 15px rgba(30, 90, 158, 0.6)';
    label.innerText = "Step 2: X Gate (NOT)";
    desc.innerHTML = "สลับสถานะ (Flip)! แต่เนื่องจากเป็น 50/50 อยู่แล้ว ความน่าจะเป็นจึงยังเท่าเดิม (แต่เฟสเปลี่ยน)";
  } 
  else if (l9_step === 3) {
    node2.style.borderColor = '#64748b';
    node2.style.backgroundColor = '#334155';
    node3.style.borderColor = '#f43f5e'; // rose-500
    node3.style.backgroundColor = '#e11d48'; // rose-600
    node3.style.boxShadow = '0 0 15px rgba(225, 29, 72, 0.6)';
    label.innerText = "Step 3: Measurement (วัดผล)";
    
    const res = Math.random() < 0.5 ? 0 : 1;
    desc.innerHTML = `ยุบตัว (Collapse)! สุ่มผลลัพธ์ออกมาได้เป็น <strong class='text-rose-400 text-xl'>|${res}⟩</strong>`;
    
    btnNext.disabled = true;
    btnNext.style.opacity = '0.5';
  }
}

// --- Interactive 3: Entanglement Circuit ---
function l9RunEntanglement() {
  const out0 = document.getElementById('l9-out-0');
  const out1 = document.getElementById('l9-out-1');
  const desc = document.getElementById('l9-entangle-desc');
  
  desc.innerText = "กำลังประมวลผล...";
  out0.style.opacity = '0';
  out1.style.opacity = '0';

  setTimeout(() => {
    // ผลลัพธ์ของ Bell State คือ 00 หรือ 11
    const res = Math.random() < 0.5 ? '0' : '1';
    
    out0.innerText = `|${res}⟩`;
    out1.innerText = `|${res}⟩`;
    out0.style.opacity = '1';
    out1.style.opacity = '1';
    
    desc.innerHTML = `เชื่อมสำเร็จ! ทั้งคู่ยุบตัวได้สถานะ <strong class='text-blue-600'>|${res}${res}⟩</strong> เสมอ!`;
  }, 800);
}

// --- Interactive 4: Build Your Own Circuit ---
let l9_userCircuit = []; // เก็บ string 'H' หรือ 'X' (สูงสุด 3 ตัว)

function l9AddGate(gateType) {
  if (l9_userCircuit.length >= 3) return; // เต็มแล้ว
  l9_userCircuit.push(gateType);
  updateL9CircuitUI();
}

function l9ClearCircuit() {
  l9_userCircuit = [];
  updateL9CircuitUI();
  // รีเซ็ตผลลัพธ์กลับเป็น 100% |0>
  setL9Results(100, 0);
}

function updateL9CircuitUI() {
  for (let i = 0; i < 3; i++) {
    const slot = document.getElementById(`l9-slot-${i}`);
    if (i < l9_userCircuit.length) {
      const gate = l9_userCircuit[i];
      slot.innerText = gate;
      slot.style.borderStyle = 'solid';
      slot.style.color = '#fff';
      
      if (gate === 'H') {
        slot.style.backgroundColor = '#2563eb'; // blue-600
        slot.style.borderColor = '#1d4ed8'; // blue-700
      } else {
        slot.style.backgroundColor = '#059669'; // emerald-600
        slot.style.borderColor = '#047857'; // emerald-700
      }
    } else {
      slot.innerText = i + 1;
      slot.style.borderStyle = 'dashed';
      slot.style.backgroundColor = '#fff';
      slot.style.borderColor = '#cbd5e1'; // slate-300
      slot.style.color = '#94a3b8'; // slate-400
    }
  }
}

function l9RunCircuit() {
  // คณิตศาสตร์ของควอนตัม 1 Qubit (Amplitudes)
  // เริ่มที่ |0>
  let a0 = 1.0; 
  let a1 = 0.0;
  
  const invSqrt2 = 1.0 / Math.sqrt(2);

  // วิ่งผ่านทีละ Gate
  for (let gate of l9_userCircuit) {
    let next_a0, next_a1;
    if (gate === 'H') {
      next_a0 = (a0 + a1) * invSqrt2;
      next_a1 = (a0 - a1) * invSqrt2;
    } else if (gate === 'X') {
      next_a0 = a1;
      next_a1 = a0;
    }
    a0 = next_a0;
    a1 = next_a1;
  }

  // คำนวณความน่าจะเป็น (Probability = Amplitude^2)
  // ปัดเศษนิดหน่อยป้องกัน Floating point error
  let p0 = Math.round(Math.pow(a0, 2) * 100);
  let p1 = Math.round(Math.pow(a1, 2) * 100);
  
  // ให้ชัวร์ว่ารวมกันได้ 100
  if (p0 + p1 !== 100) p1 = 100 - p0;

  setL9Results(p0, p1);
}

function setL9Results(p0, p1) {
  const bar0 = document.getElementById('l9-res-0');
  const bar1 = document.getElementById('l9-res-1');
  const val0 = document.getElementById('l9-res-val-0');
  const val1 = document.getElementById('l9-res-val-1');
  
  if (bar0 && bar1) {
    bar0.style.width = `${p0}%`;
    bar1.style.width = `${p1}%`;
    val0.innerText = `${p0}%`;
    val1.innerText = `${p1}%`;
    
    // เปลี่ยนสีไฮไลต์ตัวที่มีค่ามากกว่า
    bar0.style.backgroundColor = p0 > 0 ? '#2b5be0' : '#475569';
    bar1.style.backgroundColor = p1 > 0 ? '#2b5be0' : '#475569';
  }
}


// Lesson 10: Quantum Algorithms Interactives


// --- Interactive 1: Search Comparison ---
let l10_searchInterval = null;
let l10_isSearching = false;

function l10ResetSearch() {
  clearInterval(l10_searchInterval);
  l10_isSearching = false;
  
  // รีเซ็ตสไตล์กล่องทั้งหมด
  for(let i=0; i<4; i++) {
    const box = document.getElementById(`l10-box-${i}`);
    box.style.backgroundColor = '#1e293b'; // slate-800
    box.style.borderColor = '#475569'; // slate-600
    box.style.color = '#94a3b8'; // slate-400
    box.style.transform = 'scale(1)';
    box.style.boxShadow = 'none';
  }
  
  document.getElementById('l10-search-status').innerHTML = "กำลังรอคำสั่ง...";
}

function l10RunClassical() {
  if(l10_isSearching) return;
  l10ResetSearch();
  l10_isSearching = true;
  
  document.getElementById('l10-search-status').innerHTML = "Classical: กำลังค้นหาทีละกล่องอย่างช้าๆ...";
  
  let currentIndex = 0;
  
  l10_searchInterval = setInterval(() => {
    // รีเซ็ตกล่องก่อนหน้า (ถ้ามี)
    if(currentIndex > 0) {
      const prevBox = document.getElementById(`l10-box-${currentIndex-1}`);
      prevBox.style.backgroundColor = '#1e293b';
      prevBox.style.borderColor = '#475569';
    }
    
    // ไฮไลต์กล่องปัจจุบัน
    const currBox = document.getElementById(`l10-box-${currentIndex}`);
    currBox.style.backgroundColor = '#334155'; // slate-700
    currBox.style.borderColor = '#94a3b8'; // slate-400
    
    // เช็คคำตอบ (กล่องที่ 3 คือเลข 9)
    if (currentIndex === 3) {
      clearInterval(l10_searchInterval);
      setTimeout(() => {
        currBox.style.backgroundColor = '#10b981'; // emerald-500
        currBox.style.borderColor = '#059669'; // emerald-600
        currBox.style.color = '#fff';
        currBox.style.transform = 'scale(1.1)';
        currBox.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.5)';
        document.getElementById('l10-search-status').innerHTML = "<span class='text-emerald-500'>Classical: เจอเลข 9 แล้ว! (ต้องเปิดหาตั้ง 4 ครั้ง)</span>";
        l10_isSearching = false;
      }, 300);
    } else {
      currentIndex++;
    }
  }, 600); // ดีเลย์ 0.6 วิ ต่อการหา 1 กล่อง
}

function l10RunQuantum() {
  if(l10_isSearching) return;
  l10ResetSearch();
  l10_isSearching = true;
  
  document.getElementById('l10-search-status').innerHTML = "Quantum: สร้าง Superposition เพื่อเช็คทุกกล่อง <strong>พร้อมกัน!</strong>";
  
  // 1. กระจาย Superposition (ไฮไลต์ทุกกล่องพร้อมกัน)
  for(let i=0; i<4; i++) {
    const box = document.getElementById(`l10-box-${i}`);
    box.style.backgroundColor = '#3b82f6'; // blue-500
    box.style.borderColor = '#60a5fa'; // blue-400
    box.style.color = '#fff';
    box.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.4)';
  }
  
  // 2. ขยายคำตอบที่ถูกต้อง (Grover's Magic) ทันทีในเสี้ยววิ!
  setTimeout(() => {
    for(let i=0; i<4; i++) {
      const box = document.getElementById(`l10-box-${i}`);
      if(i === 3) { // คำตอบที่ถูก
        box.style.backgroundColor = '#3b82f6'; // blue-500
        box.style.borderColor = '#60a5fa'; // blue-400
        box.style.transform = 'scale(1.1)';
        box.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.8)';
      } else { // คำตอบที่ผิดหดตัวลง
        box.style.backgroundColor = '#1e293b'; 
        box.style.borderColor = '#475569';
        box.style.color = '#64748b'; // สีจางลง
        box.style.boxShadow = 'none';
        box.style.transform = 'scale(0.9)';
      }
    }
    document.getElementById('l10-search-status').innerHTML = "<span class='text-blue-500'>Quantum: เจอเลข 9 แล้ว! (ใช้การทำงานเพียงก้าวเดียว!)</span>";
    l10_isSearching = false;
  }, 1000);
}

// --- Interactive 2: Probability Amplification (Grover's) ---
let l10_groverStep = 0;

// โอกาสเปอร์เซ็นต์ในแต่ละก้าว (จำลอง Amplitude Amplification ของจริง)
// Target คือ index 5
const l10_groverData = [
  // Step 0: Initial Superposition
  { target: 12.5, others: 12.5, desc: "<strong>เริ่มต้น:</strong> ใช้ H Gate เพื่อเข้าสู่ Superposition (ทุกค่ามีโอกาส 12.5% เท่ากัน)" },
  // Step 1: 1st Iteration
  { target: 78.1, others: 3.1, desc: "<strong>Step 1:</strong> ควอนตัมพลิกเฟสและขยายความน่าจะเป็นของเป้าหมายให้พุ่งสูงขึ้นอย่างชัดเจน!" },
  // Step 2: 2nd Iteration (เกือบ 100% ในความเป็นจริงของ 3 qubits ใช้ 2 รอบพอดี)
  { target: 94.5, others: 0.8, desc: "<strong>Step 2:</strong> ขยายซ้ำอีกรอบ ตอนนี้โอกาสสุ่มเจอคำตอบที่ถูกคือ <strong>94.5%</strong>! (พร้อมที่จะวัดผลแล้ว)" }
];

function l10ResetGrover() {
  l10_groverStep = 0;
  l10ApplyGroverData();
  
  const btn = document.getElementById('l10-btn-grover');
  btn.disabled = false;
  btn.innerHTML = `<i data-lucide="play-circle" class="w-4 h-4"></i> Run Algorithm (Step 1)`;
  btn.className = "px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-200 transition-all flex items-center gap-2";
  lucide.createIcons();
}

function l10RunGroverStep() {
  if (l10_groverStep >= 2) return; // ทำได้แค่ 2 ขั้น (เหมาะสมที่สุดสำหรับ 8 states)
  
  l10_groverStep++;
  l10ApplyGroverData();
  
  const btn = document.getElementById('l10-btn-grover');
  
  if (l10_groverStep === 1) {
    btn.innerHTML = `<i data-lucide="play-circle" class="w-4 h-4"></i> Run Algorithm (Step 2)`;
  } else if (l10_groverStep === 2) {
    btn.disabled = true;
    btn.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4"></i> สำเร็จ (คำตอบชัดเจนแล้ว)`;
    btn.className = "px-6 py-2 bg-slate-300 text-slate-500 cursor-not-allowed rounded-lg text-sm font-bold flex items-center gap-2 transition-all";
  }
  lucide.createIcons();
}

function l10ApplyGroverData() {
  const data = l10_groverData[l10_groverStep];
  
  for(let i=0; i<8; i++) {
    const bar = document.getElementById(`l10-bar-${i}`);
    const valText = document.getElementById(`l10-val-${i}`);
    
    if (i === 5) { // Target |101>
      bar.style.height = `${data.target}%`;
      valText.innerText = `${data.target}%`;
      
      if (l10_groverStep > 0) {
        bar.style.backgroundColor = '#f59e0b'; // amber-500
        bar.style.boxShadow = `0 0 ${10 + (l10_groverStep*10)}px rgba(245, 158, 11, ${0.5 + (l10_groverStep*0.2)})`;
      } else {
        bar.style.backgroundColor = '#fbbf24'; // amber-400
        bar.style.boxShadow = '0 0 10px rgba(251, 191, 36, 0.5)';
      }
    } else { // Others
      bar.style.height = `${data.others}%`;
      valText.innerText = `${data.others}%`;
      
      if (l10_groverStep > 0) {
        bar.style.backgroundColor = '#e2e8f0'; // slate-200
        valText.style.color = '#94a3b8'; // slate-400
      } else {
        bar.style.backgroundColor = '#cbd5e1'; // slate-300
        valText.style.color = '#64748b'; // slate-500
      }
    }
  }
  
  document.getElementById('l10-grover-desc').innerHTML = data.desc;
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
window.applyL5Gate = applyL5Gate;
window.toggleL6Int1 = toggleL6Int1;
window.applyL6BlochH = applyL6BlochH;
window.applyL6Twice = applyL6Twice;
window.setL7Int1State = setL7Int1State;
window.updateL7Int2Slider = updateL7Int2Slider;
window.applyL7Reset = applyL7Reset;
window.applyL7HGateAll = applyL7HGateAll;
window.createL8Entanglement = createL8Entanglement;
window.measureL8QubitA = measureL8QubitA;
window.resetL8 = resetL8;
window.l9ResetStep = l9ResetStep;
window.l9NextStep = l9NextStep;
window.l9RunEntanglement = l9RunEntanglement;
window.l9AddGate = l9AddGate;
window.l9ClearCircuit = l9ClearCircuit;
window.l9RunCircuit = l9RunCircuit;
window.l10ResetSearch = l10ResetSearch;
window.l10RunClassical = l10RunClassical;
window.l10RunQuantum = l10RunQuantum;
window.l10ResetGrover = l10ResetGrover;
window.l10RunGroverStep = l10RunGroverStep;

document.addEventListener("DOMContentLoaded", () => {
  loadLesson(0);
  lucide.createIcons();
});

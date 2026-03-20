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

const gateDetails = {
  X: {
    name: "Pauli-X",
    copy:
      "เกต X สลับสถานะฐาน |0> กับ |1> จึงมักถูกมองว่าเป็น NOT gate ของโลกควอนตัม",
    effect:
      "บน Bloch sphere เกต X คือการหมุนมุม pi รอบแกน X",
    matrix: "[0  1]\n[1  0]",
  },
  Y: {
    name: "Pauli-Y",
    copy:
      "เกต Y พลิกสถานะเหมือน X แต่เพิ่มเฟสเข้ามาด้วย ทำให้มีผลต่อการแทรกสอดของสถานะในขั้นตอนถัดไป",
    effect:
      "บน Bloch sphere เกต Y คือการหมุนมุม pi รอบแกน Y",
    matrix: "[0  -i]\n[i   0]",
  },
  Z: {
    name: "Pauli-Z",
    copy:
      "เกต Z ไม่เปลี่ยน |0> แต่ใส่เครื่องหมายลบให้กับ |1> จึงเปลี่ยนเฟสสัมพัทธ์โดยไม่เปลี่ยนความน่าจะเป็นใน computational basis",
    effect:
      "บน Bloch sphere เกต Z คือการหมุนมุม pi รอบแกน Z",
    matrix: "[1   0]\n[0  -1]",
  },
};

const lessonsData = [
  {
    category: "Quantum Basics",
    title: "Quantum Computing Foundations",
    header: "What Makes Quantum Computing Different?",
    explanation:
      "Quantum computing คือการประมวลผลข้อมูลด้วยระบบทางควอนตัม แทนที่จะเก็บข้อมูลเป็นบิตที่มีค่าได้แค่ 0 หรือ 1 เราใช้คิวบิตซึ่งมีแอมพลิจูดและเฟส ทำให้เกิดซูเปอร์โพซิชัน การแทรกสอด และการคำนวณแบบใหม่ที่เหมาะกับปัญหาบางชนิด เช่น การจำลองระบบฟิสิกส์ การค้นหา และการเพิ่มประสิทธิภาพเชิงโครงสร้าง",
    workspaceHTML: `
      <div class="workspace-stack">
        <section class="rounded-[1.5rem] p-7 interactive-container">
          <p class="subtle-kicker">Core Idea</p>
          <div class="comparison-table">
            <div class="comparison-row">
              <div class="comparison-label">Classical Bit</div>
              <p class="comparison-copy">บิตแบบดั้งเดิมเก็บค่าได้เพียง 0 หรือ 1 ในช่วงเวลาใดเวลาหนึ่ง และเกตแบบคลาสสิกจะเปลี่ยนค่านั้นตามกฎเชิงตรรกะที่แน่นอน</p>
            </div>
            <div class="comparison-row">
              <div class="comparison-label">Qubit</div>
              <p class="comparison-copy">คิวบิตเก็บแอมพลิจูดของ |0> และ |1> พร้อมกันได้ ทำให้เส้นทางของการคำนวณมีความสำคัญพอ ๆ กับผลลัพธ์สุดท้าย</p>
            </div>
            <div class="comparison-row">
              <div class="comparison-label">Advantage</div>
              <p class="comparison-copy">คอมพิวเตอร์ควอนตัมไม่ได้เร็วกว่าในทุกโจทย์ แต่ในปัญหาที่มีโครงสร้างเหมาะสม มันสามารถแทนสถานะและแปลงข้อมูลได้อย่างมีประสิทธิภาพกว่า</p>
            </div>
          </div>
        </section>

        <section class="lesson-grid">
          <article class="lesson-card">
            <h3>Representation</h3>
            <p>สถานะควอนตัมอธิบายด้วยเวกเตอร์ แอมพลิจูด และเฟส ไม่ได้มีแค่คำตอบแบบจริงหรือเท็จเหมือนตรรกะคลาสสิก</p>
          </article>
          <article class="lesson-card">
            <h3>Evolution</h3>
            <p>เกตควอนตัมคือเมทริกซ์ยูนิตารีที่หมุนและผสมแอมพลิจูดของสถานะอย่างย้อนกลับได้</p>
          </article>
          <article class="lesson-card">
            <h3>Measurement</h3>
            <p>เมื่อวัดคิวบิต เราจะได้ผลลัพธ์แบบคลาสสิก และแอมพลิจูดจะกลายเป็นความน่าจะเป็นของผลที่สังเกตได้</p>
          </article>
        </section>

        <section class="rounded-[1.5rem] p-7 visual-container">
          <p class="subtle-kicker">Learning Roadmap</p>
          <ul class="bullet-list">
            <li>เริ่มจากคิวบิตเดี่ยวและทำความเข้าใจว่ามันถูกมองบน Bloch sphere อย่างไร</li>
            <li>ต่อด้วยซูเปอร์โพซิชันและเอนแทงเกิลเมนต์ ซึ่งอธิบายว่าทำไมระบบควอนตัมจึงต่างจากระบบคลาสสิก</li>
            <li>จากนั้นจึงไปสู่เกตและอัลกอริทึม เพื่อเชื่อมแนวคิดเข้ากับการจำลองแบบโต้ตอบ</li>
          </ul>
        </section>
      </div>
    `,
  },
  {
    category: "Quantum Basics",
    title: "Understanding the Qubit",
    header: "What Is a Qubit?",
    explanation:
      "คิวบิตคือหน่วยข้อมูลพื้นฐานของระบบควอนตัม มันสามารถอธิบายได้เป็นเวกเตอร์ที่มีสองทิศฐานคือ |0> และ |1> ก่อนการวัด จุดของสถานะสามารถอยู่ระหว่างสองขั้วนี้ได้ ซึ่งหมายความว่ามันไม่จำเป็นต้องเป็นค่าแบบคลาสสิกเพียงค่าเดียว",
    workspaceHTML: `
      <div class="workspace-stack">
        <section class="rounded-[1.5rem] p-7 visual-container">
          <p class="subtle-kicker">Bloch Sphere Intuition</p>
          <div class="flex flex-col lg:flex-row items-center gap-8">
            <div class="flex-1 flex justify-center">
              <svg class="bloch-sphere" viewBox="0 0 320 320" width="300" height="300" fill="none">
                <circle cx="160" cy="160" r="112" stroke="#bfdbfe" stroke-width="2" />
                <ellipse cx="160" cy="160" rx="112" ry="42" stroke="#dbeafe" stroke-width="2" />
                <line x1="160" y1="48" x2="160" y2="272" stroke="#dbeafe" stroke-width="2" stroke-dasharray="5 5" />
                <line x1="160" y1="160" x2="224" y2="112" stroke="#2563eb" stroke-width="3" />
                <circle cx="224" cy="112" r="6" fill="#2563eb" />
                <text x="160" y="34" text-anchor="middle" fill="#2563eb" class="sphere-text">|0&gt;</text>
                <text x="160" y="294" text-anchor="middle" fill="#2563eb" class="sphere-text">|1&gt;</text>
                <text x="52" y="164" text-anchor="middle" fill="#60a5fa" class="sphere-text">-x</text>
                <text x="268" y="164" text-anchor="middle" fill="#60a5fa" class="sphere-text">+x</text>
              </svg>
            </div>
            <div class="flex-1 space-y-4">
              <p class="text-sm leading-7 text-color-muted">ขั้วเหนือของทรงกลมแทน <span class="inline-ket">|0&gt;</span> ส่วนขั้วใต้แทน <span class="inline-ket">|1&gt;</span> สถานะบริสุทธิ์ของคิวบิตเดี่ยวสามารถแทนได้ด้วยจุดหนึ่งบนผิวทรงกลมนี้</p>
              <div class="math-chip-row">
                <span class="math-chip">|psi&gt; = alpha|0&gt; + beta|1&gt;</span>
                <span class="math-chip">|alpha|^2 + |beta|^2 = 1</span>
              </div>
              <p class="text-sm leading-7 text-color-muted">การเปลี่ยนมุมจะเปลี่ยนสัดส่วนระหว่าง |0&gt; กับ |1&gt; ส่วนการเปลี่ยนเฟสจะส่งผลต่อการแทรกสอดเมื่อผ่านเกตในขั้นตอนต่อไป</p>
            </div>
          </div>
        </section>

        <section class="rounded-[1.5rem] p-7 interactive-container">
          <p class="subtle-kicker">Probability Explorer</p>
          <div class="flex items-center justify-between mb-3">
            <label class="text-sm font-medium text-color-main" for="probability-slider">ความน่าจะเป็นของ |0&gt;</label>
            <span id="prob-0" class="text-sm font-semibold prob-text">50%</span>
          </div>
          <input id="probability-slider" type="range" min="0" max="100" value="50" class="w-full h-2 rounded-lg custom-slider" oninput="updateProbability(this.value)">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div class="rounded-xl p-4 state-box">
              <p class="text-xs mb-1 text-color-muted">Basis State |0&gt;</p>
              <p id="state-0" class="text-lg font-bold prob-text">50%</p>
              <p class="text-sm text-color-muted mt-2">Amplitude: <span id="amp-0" class="inline-ket">0.707</span></p>
            </div>
            <div class="rounded-xl p-4 state-box">
              <p class="text-xs mb-1 text-color-muted">Basis State |1&gt;</p>
              <p id="state-1" class="text-lg font-bold text-blue-400">50%</p>
              <p class="text-sm text-color-muted mt-2">Amplitude: <span id="amp-1" class="inline-ket">0.707</span></p>
            </div>
          </div>
        </section>
      </div>
    `,
  },
  {
    category: "Quantum Basics",
    title: "Superposition",
    header: "Why Can a Qubit Be Both 0 and 1?",
    explanation:
      "ซูเปอร์โพซิชันหมายถึงการเตรียมคิวบิตให้มีแอมพลิจูดอยู่บนทั้งสองสถานะฐานพร้อมกัน นั่นไม่ได้แปลว่าเราอ่านได้สองคำตอบพร้อมกัน แต่หมายความว่าแอมพลิจูดเหล่านี้พัฒนาไปด้วยกันจนกว่าจะมีการวัด ทำให้เกตในลำดับถัดไปสามารถเสริมและหักล้างผลลัพธ์กันได้",
    workspaceHTML: `
      <div class="workspace-stack">
        <section class="rounded-[1.5rem] p-7 interactive-container">
          <p class="subtle-kicker">Measurement Simulator</p>
          <div class="measure-shell text-center">
            <div class="measure-orb">
              <span>|psi&gt;</span>
            </div>
            <p class="text-sm leading-7 text-color-muted">คิวบิตนี้อยู่ในซูเปอร์โพซิชันแบบสมดุล ซึ่งมักสร้างได้โดยใช้ Hadamard gate กับ <span class="inline-ket">|0&gt;</span> เมื่อทำการวัด สถานะจะยุบลงเป็นผลลัพธ์แบบคลาสสิกเพียงค่าเดียว</p>
            <button class="measure-btn" onclick="measureQubit()">Measure Qubit</button>
            <div id="measurement-result" class="result-banner">ยังไม่ได้วัด สถานะนี้มีโอกาสออก |0&gt; และ |1&gt; อย่างละ 50%</div>
          </div>
        </section>

        <section class="lesson-grid">
          <article class="lesson-card">
            <h3>Not Classical Uncertainty</h3>
            <p>เหรียญที่ยังไม่ได้เปิดดูมีผลลัพธ์จริงซ่อนอยู่แล้ว แต่คิวบิตในซูเปอร์โพซิชันถูกอธิบายด้วยแอมพลิจูดทั้งสองส่วนอย่างแท้จริง</p>
          </article>
          <article class="lesson-card">
            <h3>Interference Matters</h3>
            <p>แอมพลิจูดเป็นจำนวนเชิงซ้อน จึงสามารถเสริมกันหรือหักล้างกันได้ นี่คือหัวใจของอัลกอริทึมควอนตัมจำนวนมาก</p>
          </article>
          <article class="lesson-card">
            <h3>Measurement Collapse</h3>
            <p>หลังการวัด คิวบิตจะไม่อยู่ในซูเปอร์โพซิชันของ basis เดิมอีกต่อไป แต่กลายเป็นผลลัพธ์แบบคลาสสิกที่นำไปใช้งานต่อได้</p>
          </article>
        </section>
      </div>
    `,
  },
  {
    category: "Quantum Basics",
    title: "Entanglement",
    header: "Why Must Two Qubits Be Described Together?",
    explanation:
      "เอนแทงเกิลเมนต์เกิดขึ้นเมื่อสถานะของหลายคิวบิตไม่สามารถแยกอธิบายเป็นแต่ละตัวแบบอิสระได้อีกต่อไป เราจึงต้องอธิบายระบบทั้งหมดพร้อมกัน และเมื่อมีการวัด ผลลัพธ์จะสัมพันธ์กันในแบบที่สัญชาตญาณเชิงคลาสสิกอธิบายได้ยาก",
    workspaceHTML: `
      <div class="workspace-stack">
        <section class="rounded-[1.5rem] p-7 visual-container">
          <p class="subtle-kicker">Bell Pair Story</p>
          <div class="lesson-grid">
            <article class="lesson-card">
              <h3>Step 1</h3>
              <p>เริ่มด้วยคิวบิตสองตัวในสถานะ <span class="inline-ket">|00&gt;</span> แล้วใช้ Hadamard กับคิวบิตตัวแรกเพื่อสร้างซูเปอร์โพซิชัน</p>
            </article>
            <article class="lesson-card">
              <h3>Step 2</h3>
              <p>ใช้ controlled-X เพื่อให้คิวบิตตัวที่สองตามตัวแรก สถานะจะกลายเป็น <span class="inline-ket">( |00&gt; + |11&gt; ) / sqrt(2)</span></p>
            </article>
            <article class="lesson-card">
              <h3>Step 3</h3>
              <p>เมื่อวัดคิวบิตตัวใดตัวหนึ่ง ผลลัพธ์ของทั้งคู่จะสัมพันธ์กัน แม้แต่ละตัวจะดูสุ่มเมื่อมองแยกกัน</p>
            </article>
          </div>
        </section>

        <section class="rounded-[1.5rem] p-7 interactive-container">
          <p class="subtle-kicker">What Entanglement Changes</p>
          <ul class="bullet-list">
            <li>สถานะของระบบต้องเขียนเป็นเวกเตอร์ร่วม ไม่ใช่เรื่องเล่าของคิวบิตแต่ละตัวแบบแยกขาด</li>
            <li>ความสัมพันธ์ที่เห็นไม่ได้เกิดจากการส่งสัญญาณคลาสสิกหลังการวัด แต่เกิดจากโครงสร้างของสถานะควอนตัมตั้งแต่ต้น</li>
            <li>แนวคิดนี้เป็นพื้นฐานของ quantum teleportation, error correction และวงจรที่ต้องอาศัยการประสานสถานะหลายคิวบิต</li>
          </ul>
          <div class="timeline-note mt-6">
            ถ้าคู่คิวบิตเอนแทงเกิลกันอย่างเต็มที่ การรู้ผลของตัวแรกจะบอกข้อจำกัดของผลลัพธ์ที่เป็นไปได้ของตัวที่สองใน basis เดียวกันทันที
          </div>
        </section>
      </div>
    `,
  },
  {
    category: "Quantum Gates",
    title: "Pauli Gates",
    header: "How Do the Basic Single-Qubit Gates Work?",
    explanation:
      "เกต Pauli ได้แก่ X, Y และ Z เป็นเกตพื้นฐานที่กำหนดเรขาคณิตของการเคลื่อนที่ของคิวบิตเดี่ยวบน Bloch sphere แม้มันจะดูเรียบง่าย แต่แทบทุกวงจรที่ซับซ้อนกว่าล้วนสร้างต่อยอดจากเกตชุดนี้",
    workspaceHTML: `
      <div class="workspace-stack">
        <section class="rounded-[1.5rem] p-7 visual-container">
          <p class="subtle-kicker">Choose a Gate</p>
          <div class="gate-grid">
            <button class="gate-card" data-gate="X" onclick="showGateDetails('X')">
              <span class="gate-symbol">X</span>
              <h3>Pauli-X</h3>
              <p>Bit flip between |0&gt; and |1&gt;</p>
            </button>
            <button class="gate-card" data-gate="Y" onclick="showGateDetails('Y')">
              <span class="gate-symbol">Y</span>
              <h3>Pauli-Y</h3>
              <p>Bit flip with an added phase change</p>
            </button>
            <button class="gate-card" data-gate="Z" onclick="showGateDetails('Z')">
              <span class="gate-symbol">Z</span>
              <h3>Pauli-Z</h3>
              <p>Phase flip on the |1&gt; component</p>
            </button>
          </div>
        </section>

        <section class="detail-card">
          <h4 id="gate-detail-name">Pauli-X</h4>
          <p id="gate-detail-copy">เกต X สลับสถานะฐานของคิวบิต และทำหน้าที่คล้าย NOT gate ในโลกควอนตัม</p>
          <div id="gate-detail-matrix" class="detail-matrix">[0  1]
[1  0]</div>
          <p id="gate-detail-effect" class="text-sm text-color-muted mt-3">บน Bloch sphere เกต X คือการหมุนมุม pi รอบแกน X</p>
        </section>
      </div>
    `,
  },
  {
    category: "Quantum Gates",
    title: "Rotation Gates",
    header: "Why Are Rotation Gates More Flexible?",
    explanation:
      "เกตหมุนช่วยให้เราหมุนคิวบิตได้ตามมุมที่ต้องการรอบแกนที่เลือก มันเป็นการขยายแนวคิดจากเกต Pauli ทำให้วงจรสามารถเตรียมสถานะได้อย่างละเอียด ไม่ได้จำกัดอยู่แค่การพลิกครึ่งรอบแบบเต็ม ๆ",
    workspaceHTML: `
      <div class="workspace-stack">
        <section class="rounded-[1.5rem] p-7 interactive-container">
          <p class="subtle-kicker">Rotation Playground</p>
          <div class="math-chip-row mb-6">
            <button class="gate-card is-active" data-axis="x" onclick="setRotationAxis('x')">
              <span class="gate-symbol">Rx</span>
              <h3>Rotate Around X</h3>
              <p>Moves the state through the YZ plane</p>
            </button>
            <button class="gate-card" data-axis="y" onclick="setRotationAxis('y')">
              <span class="gate-symbol">Ry</span>
              <h3>Rotate Around Y</h3>
              <p>Moves the state through the XZ plane</p>
            </button>
            <button class="gate-card" data-axis="z" onclick="setRotationAxis('z')">
              <span class="gate-symbol">Rz</span>
              <h3>Rotate Around Z</h3>
              <p>Adjusts phase around the vertical axis</p>
            </button>
          </div>

          <label class="text-sm font-medium text-color-main" for="rotation-slider">Rotation Angle</label>
          <div class="slider-row mt-3">
            <input id="rotation-slider" type="range" min="0" max="180" value="90" class="w-full h-2 rounded-lg custom-slider" oninput="updateRotationDemo(this.value)">
            <span class="slider-value"><span id="rotation-angle">90</span> องศา</span>
          </div>

          <div class="rotation-meter mt-5">
            <div id="rotation-fill" class="rotation-fill"></div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div class="state-box rounded-xl p-4">
              <p class="text-xs text-color-muted mb-1">Current Gate</p>
              <p id="rotation-gate-label" class="text-lg font-bold prob-text">Rx(90 deg)</p>
            </div>
            <div class="state-box rounded-xl p-4">
              <p class="text-xs text-color-muted mb-1">Interpretation</p>
              <p id="rotation-description" class="text-sm leading-7 text-color-muted">การหมุนหนึ่งในสี่รอบทำให้สถานะเปลี่ยนอย่างชัดเจน แต่ยังไม่ถึงขั้วตรงข้ามของทรงกลม</p>
            </div>
          </div>
        </section>

        <section class="rounded-[1.5rem] p-7 visual-container">
          <p class="subtle-kicker">Why This Matters</p>
          <ul class="bullet-list">
            <li>เกตหมุนช่วยเตรียมสถานะคิวบิตได้หลากหลายกว่าการใช้เพียงเกตพื้นฐานแบบเต็มรอบ</li>
            <li>มุมที่ละเอียดมีความสำคัญต่อ variational algorithms การคาลิเบรต และการควบคุมฮาร์ดแวร์จริง</li>
            <li>บนฮาร์ดแวร์หลายแบบ เกตพื้นฐานระดับเครื่องถูกสร้างขึ้นมาในรูปของการหมุนรอบแกนต่าง ๆ อยู่แล้ว</li>
          </ul>
        </section>
      </div>
    `,
  },
];

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

window.loadLesson = loadLesson;
window.goToNextLesson = goToNextLesson;
window.updateProbability = updateProbability;
window.measureQubit = measureQubit;
window.showGateDetails = showGateDetails;
window.updateRotationDemo = updateRotationDemo;
window.setRotationAxis = setRotationAxis;

document.addEventListener("DOMContentLoaded", () => {
  loadLesson(0);
  lucide.createIcons();
});

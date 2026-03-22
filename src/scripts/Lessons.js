export const gateDetails = {
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

export const lessonsData = [
  {
    category: "Quantum Basics",
    title: "Introduction to Quantum Computing",
    header: "ยินดีต้อนรับสู่โลกของควอนตัม",
    explanation:
      "Quantum Computing คือการประมวลผลข้อมูลด้วยระบบทางฟิสิกส์ระดับอะตอม มันไม่ได้มาแทนที่คอมพิวเตอร์ทั่วไป แต่มาเพื่อแก้ปัญหาที่คอมพิวเตอร์ทั่วไปต้องใช้เวลาคำนวณเป็นหมื่นปีให้เสร็จได้ในพริบตา",
    workspaceHTML: `
      <div class="workspace-stack space-y-8">
        
        <section class="rounded-[1.5rem] p-7 visual-container bg-blue-50/50">
          <p class="subtle-kicker text-blue-600">Learning Objective</p>
          <h3 class="text-lg font-bold mb-2">หลังเรียนจบบทนี้ คุณจะได้</h3>
          <ul class="bullet-list">
            <li>เข้าใจว่า Quantum Computing คืออะไร</li>
            <li>รู้ว่ามันต่างจากคอมพิวเตอร์ทั่วไปยังไง</li>
            <li>เห็นภาพว่าทำไมมันถึงสำคัญ</li>
          </ul>
        </section>

        <section class="rounded-[1.5rem] p-7 interactive-container">
          <p class="subtle-kicker">1. Everyday Computers</p>
          <h3 class="text-lg font-bold mb-2">คอมพิวเตอร์ที่เราใช้ทุกวัน</h3>
          <p class="text-color-muted mb-6">คอมพิวเตอร์ทั่วไปทำงานโดยใช้หน่วยเล็กๆ ที่เรียกว่า <strong>Bit</strong> ซึ่งมีค่าได้แค่ <strong>0 (ปิด)</strong> หรือ <strong>1 (เปิด)</strong> ทุกอย่างในคอมพิวเตอร์ ไม่ว่าจะเป็นรูปภาพ เพลง หรือเกม สุดท้ายแล้วจะถูกแปลงเป็น 0 และ 1 ทั้งหมด</p>
          
          <div class="bg-white border rounded-2xl p-6 text-center shadow-sm max-w-sm mx-auto">
            <p class="text-sm text-color-muted mb-4 font-semibold">Bit Switch Simulator</p>
            <div id="sim1-bit" class="text-7xl font-bold mb-6 font-['Space_Mono'] text-slate-800 transition-colors">0</div>
            <button onclick="toggleBit('sim1-bit')" class="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full font-semibold transition-all w-full flex items-center justify-center gap-2">
              <i data-lucide="power" class="w-4 h-4"></i> สลับสถานะ (Toggle)
            </button>
            <p class="text-sm text-color-muted mt-4">สังเกตว่า Bit เลือกเป็นได้แค่ <strong>"ค่าใดค่าหนึ่ง"</strong> ในเวลาเดียวกัน</p>
          </div>
        </section>

        <section class="rounded-[1.5rem] p-7 interactive-container">
          <p class="subtle-kicker">2. What is Quantum Computing?</p>
          <h3 class="text-lg font-bold mb-2">แล้ว Quantum Computing คืออะไร?</h3>
          <p class="text-color-muted mb-6">Quantum Computing ใช้กฎของฟิสิกส์ระดับอะตอม แทนที่จะใช้ <strong>Bit</strong> Quantum Computing ใช้สิ่งที่เรียกว่า <strong>Qubit (คิวบิต)</strong> ซึ่งสามารถเป็นได้ทั้ง 0 และ 1 <strong>"พร้อมกัน"</strong> (เราเรียกสถานะนี้ว่า Superposition)</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white border rounded-2xl p-6 text-center shadow-sm flex flex-col justify-between">
              <div>
                <h4 class="font-bold mb-2 text-slate-700">Classical Bit</h4>
                <p class="text-sm text-color-muted mb-4">เป็นได้แค่ 0 หรือ 1</p>
                <div id="sim2-bit" class="text-6xl font-bold mb-6 font-['Space_Mono'] text-slate-800">0</div>
              </div>
              <button onclick="toggleBit('sim2-bit')" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-sm font-semibold transition-all">
                Switch (0 or 1)
              </button>
            </div>

            <div class="bg-blue-50/30 border border-blue-100 rounded-2xl p-6 text-center shadow-sm flex flex-col justify-between">
              <div>
                <h4 class="font-bold mb-2 text-blue-700">Quantum Qubit</h4>
                <p class="text-sm text-color-muted mb-4">ผสมผสาน 0 และ 1 ได้พร้อมกัน</p>
                <div class="flex justify-between w-full mb-2 font-['Space_Mono'] text-sm font-bold">
                  <span class="text-slate-600">|0⟩: <span id="sim2-q0">50</span>%</span>
                  <span class="text-blue-600">|1⟩: <span id="sim2-q1">50</span>%</span>
                </div>
                <div class="w-full h-8 bg-slate-200 rounded-lg overflow-hidden flex mb-6 shadow-inner">
                  <div id="sim2-bar0" class="h-full bg-slate-400 transition-all duration-75" style="width: 50%"></div>
                  <div id="sim2-bar1" class="h-full bg-blue-500 transition-all duration-75" style="width: 50%"></div>
                </div>
              </div>
              <input type="range" min="0" max="100" value="50" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" oninput="updateQubitSlider(this.value)">
              <p class="text-sm text-color-muted mt-3">เลื่อนเพื่อเปลี่ยนอัตราส่วนผสม</p>
            </div>
          </div>
        </section>

        <section class="rounded-[1.5rem] p-7 interactive-container">
          <p class="subtle-kicker">3. The Quantum Advantage</p>
          <h3 class="text-lg font-bold mb-2">ทำไมถึงสำคัญ?</h3>
          <p class="text-color-muted mb-6">เพราะมันสามารถ <strong>"ลองหลายคำตอบได้พร้อมกัน"</strong> ทำให้แก้ปัญหาที่ซับซ้อนได้เร็วกว่ามาก เช่น การถอดรหัส (Cryptography), การค้นหายาใหม่ (Drug Discovery) หรือ การหาเส้นทางที่ดีที่สุด (Optimization)</p>

          <div class="bg-white border rounded-2xl p-6 text-center shadow-sm">
            <p class="text-sm font-semibold mb-4 text-slate-700">ลองค้นหาเลข "9" ในกล่องเหล่านี้</p>
            
            <div class="flex justify-center gap-3 mb-8" id="search-array">
              <div class="w-12 h-12 flex items-center justify-center border-2 rounded-xl bg-white text-lg font-bold text-slate-400 transition-all" id="box-1">1</div>
              <div class="w-12 h-12 flex items-center justify-center border-2 rounded-xl bg-white text-lg font-bold text-slate-400 transition-all" id="box-5">5</div>
              <div class="w-12 h-12 flex items-center justify-center border-2 rounded-xl bg-white text-lg font-bold text-slate-400 transition-all" id="box-9">9</div>
              <div class="w-12 h-12 flex items-center justify-center border-2 rounded-xl bg-white text-lg font-bold text-slate-400 transition-all" id="box-12">12</div>
              <div class="w-12 h-12 flex items-center justify-center border-2 rounded-xl bg-white text-lg font-bold text-slate-400 transition-all" id="box-20">20</div>
            </div>

            <div class="flex flex-col sm:flex-row justify-center gap-4">
              <button onclick="runClassicalSearch()" class="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2">
                <i data-lucide="search" class="w-4 h-4"></i> Classical Search
              </button>
              <button onclick="runQuantumSearch()" class="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-200">
                <i data-lucide="zap" class="w-4 h-4"></i> Quantum Search
              </button>
            </div>
            
            <div class="mt-6 h-8">
              <p id="search-status" class="text-sm font-medium text-slate-500 bg-slate-50 inline-block px-4 py-1.5 rounded-full">พร้อมค้นหาแล้ว คลิกเลือกวิธีด้านบนเลย!</p>
            </div>
          </div>
        </section>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section class="rounded-[1.5rem] p-7 visual-container bg-amber-50/50">
            <h3 class="text-lg font-bold mb-3 text-amber-800 flex items-center gap-2"><i data-lucide="alert-triangle" class="w-5 h-5"></i> ข้อจำกัด (ในปัจจุบัน)</h3>
            <ul class="bullet-list text-amber-900/80">
              <li>สร้างยากและต้องใช้อุณหภูมิติดลบมหาศาล</li>
              <li>ถูกรบกวนจากสิ่งแวดล้อมได้ง่าย (Error rate สูง)</li>
              <li>ยังไม่ได้เอามาใช้แทนคอมพิวเตอร์ทั่วไป (พิมพ์งาน เล่นเน็ต)</li>
            </ul>
          </section>

          <section class="rounded-[1.5rem] p-7 visual-container bg-emerald-50/50">
            <h3 class="text-lg font-bold mb-3 text-emerald-800 flex items-center gap-2"><i data-lucide="check-circle-2" class="w-5 h-5"></i> สรุปสั้นๆ (Summary)</h3>
            <ul class="bullet-list text-emerald-900/80">
              <li><strong>คอมทั่วไป:</strong> ใช้ Bit (0 หรือ 1)</li>
              <li><strong>ควอนตัม:</strong> ใช้ Qubit (หลายสถานะพร้อมกัน)</li>
              <li><strong>ผลลัพธ์:</strong> ทำงานขนานกันได้ แก้ปัญหาเฉพาะทางได้เร็วทะลุขีดจำกัด</li>
            </ul>
          </section>
        </div>

      </div>
    `,
  },
  {
    category: "Quantum Basics",
    title: "Understanding the Qubit",
    header: "Qubit คืออะไร?",
    explanation:
      "ทำความรู้จักกับ Qubit (คิวบิต) หน่วยข้อมูลพื้นฐานของ Quantum Computer ที่ฉีกกฎเกณฑ์เดิมๆ ของคอมพิวเตอร์ที่เราเคยรู้จัก ด้วยความสามารถในการเป็นหลายสถานะพร้อมกัน",
    workspaceHTML: `
      <style>
        @keyframes coinFlip3D {
          0% { transform: perspective(400px) rotateY(0deg); }
          100% { transform: perspective(400px) rotateY(360deg); }
        }
        .animate-coin-flip {
          animation: coinFlip3D 0.3s linear infinite;
        }
      </style>
      
      <div class="workspace-stack space-y-8">
        
        <section class="rounded-[1.5rem] p-7 visual-container bg-blue-50/50">
          <p class="subtle-kicker text-blue-600">Learning Objective</p>
          <h3 class="text-lg font-bold mb-2">หลังเรียนจบบทนี้ คุณจะได้</h3>
          <ul class="bullet-list">
            <li>เข้าใจว่า Qubit คืออะไร</li>
            <li>เข้าใจแนวคิด Superposition (การทับซ้อนของสถานะ)</li>
            <li>เห็นภาพว่าทำไม Qubit ถึงต่างจาก Bit ทั่วไป</li>
          </ul>
        </section>

        <section class="rounded-[1.5rem] p-7 interactive-container">
          <p class="subtle-kicker">1. Classical Bit Review</p>
          <h3 class="text-lg font-bold mb-2">ทบทวน: Bit คืออะไร?</h3>
          <p class="text-color-muted mb-6">ในคอมพิวเตอร์ทั่วไป เราใช้ <strong>Bit</strong> ซึ่งมีค่าได้แค่ <strong>0 (ปิด)</strong> หรือ <strong>1 (เปิด)</strong> อย่างใดอย่างหนึ่งเท่านั้น ไม่สามารถเป็นสองค่าพร้อมกันได้</p>
          
          <div class="bg-white border rounded-2xl p-6 text-center shadow-sm max-w-sm mx-auto">
            <p class="text-sm text-color-muted mb-4 font-semibold">Bit Toggle</p>
            <div id="l2-bit-display" class="text-6xl font-bold mb-4 font-['Space_Mono'] text-slate-400">0</div>
            <button onclick="toggleL2Bit()" class="px-6 py-2 bg-slate-800 text-white rounded-full font-semibold transition-all hover:bg-slate-700 w-full">
              สลับค่า (0 ↔ 1)
            </button>
            <p class="text-sm text-color-muted mt-3">สังเกตว่ามันเลือกได้แค่ค่าเดียวเสมอ</p>
          </div>
        </section>

        <section class="rounded-[1.5rem] p-7 interactive-container">
          <p class="subtle-kicker">2. Superposition</p>
          <h3 class="text-lg font-bold mb-2">Qubit และแนวคิด Superposition</h3>
          <p class="text-color-muted mb-6"><strong>Qubit</strong> พิเศษตรงที่มันสามารถเป็น <strong>ทั้ง 0 และ 1 "พร้อมกัน" ได้</strong> ลองนึกภาพเป็นเหรียญ: <br><br>
          <strong>Bit</strong> = เหรียญที่วางอยู่บนโต๊ะ (ออกหัว หรือ ออกก้อย ชัดเจน)<br>
          <strong>Qubit</strong> = เหรียญที่ <strong>"กำลังหมุนอยู่"</strong> (ยังไม่หยุดพัก จึงเป็นทั้งหัวและก้อยพร้อมกัน) สถานะนี้เรียกว่า <strong>Superposition</strong></p>

          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 border border-indigo-100 rounded-2xl p-6 text-center shadow-sm max-w-md mx-auto">
            <p class="text-sm text-blue-800 mb-6 font-semibold">Spinning Coin Simulator</p>
            
            <div class="h-32 flex items-center justify-center mb-6">
              <div id="coin-element" class="w-24 h-24 rounded-full border-4 border-yellow-400 bg-yellow-200 flex items-center justify-center shadow-lg transition-all duration-300 transform">
                <span id="coin-text" class="text-2xl font-bold text-yellow-700 font-['Space_Mono']">0 / 1</span>
              </div>
            </div>

            <div class="flex gap-3 justify-center">
              <button onclick="spinCoin()" class="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold transition-all hover:bg-blue-700 shadow-md flex items-center gap-2">
                <i data-lucide="refresh-cw" class="w-4 h-4"></i> Spin (หมุน)
              </button>
              <button onclick="stopCoin()" class="px-6 py-2 bg-rose-500 text-white rounded-full font-semibold transition-all hover:bg-rose-600 shadow-md flex items-center gap-2">
                <i data-lucide="hand" class="w-4 h-4"></i> Stop (หยุด)
              </button>
            </div>
            <p id="coin-status" class="text-sm font-medium text-blue-700 mt-4 h-6">ลองหมุนเหรียญดู!</p>
          </div>
        </section>

        <section class="rounded-[1.5rem] p-7 interactive-container">
          <p class="subtle-kicker">3. Probability & Measurement</p>
          <h3 class="text-lg font-bold mb-2">โอกาส (Probability) และการวัด (Measurement)</h3>
          <p class="text-color-muted mb-6">Qubit ไม่ได้เป็น "ครึ่งๆ" เสมอไป แต่มันมี <strong>"โอกาส (Probability)"</strong> ที่จะเป็นแต่ละค่า (เช่น โอกาสเป็น 0 อยู่ 70% และเป็น 1 อยู่ 30%) <br>และ <strong>เมื่อเราทำการวัด (Measure)</strong> สถานะ Superposition จะสิ้นสุด และ <strong>"สุ่ม"</strong> ออกมาเป็นแค่ 0 หรือ 1 ตามโอกาสที่ตั้งไว้</p>

          <div class="bg-white border rounded-2xl p-6 shadow-sm">
            <p class="text-sm text-slate-700 mb-4 font-semibold text-center">Qubit Probability & Measurement</p>
            
            <div class="mb-8">
              <div class="flex justify-between text-sm font-bold font-['Space_Mono'] mb-2">
                <span class="text-slate-600">P(0) = <span id="prob-val-0">70</span>%</span>
                <span class="text-blue-600">P(1) = <span id="prob-val-1">30</span>%</span>
              </div>
              <input type="range" min="0" max="100" value="70" class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer" oninput="updateL2Probability(this.value)">
              <p class="text-sm text-color-muted mt-2 text-center">เลื่อนเพื่อปรับเปลี่ยนโอกาสของ Qubit ก่อนทำการวัด</p>
            </div>

            <div class="w-full h-12 bg-slate-100 rounded-xl overflow-hidden flex relative shadow-inner mb-6 border">
              <div id="prob-bar-0" class="h-full bg-slate-300 flex items-center justify-center transition-all duration-200" style="width: 70%">
                <span class="font-bold text-slate-600 opacity-50">|0⟩</span>
              </div>
              <div id="prob-bar-1" class="h-full bg-blue-300 flex items-center justify-center transition-all duration-200" style="width: 30%">
                <span class="font-bold text-blue-700 opacity-50">|1⟩</span>
              </div>
              
              <div id="measure-overlay" class="absolute inset-0 bg-white/90 backdrop-blur-sm hidden items-center justify-center">
                <span class="text-lg font-bold text-slate-800">ผลการวัด: <span id="measure-result" class="text-blue-600 text-2xl">0</span></span>
              </div>
            </div>

            <div class="text-center">
              <button onclick="measureL2Qubit()" class="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold transition-all hover:bg-blue-700 shadow-md shadow-blue-200 flex items-center justify-center gap-2 mx-auto">
                <i data-lucide="eye" class="w-5 h-5"></i> Measure (สังเกตการณ์)
              </button>
              <p class="text-sm text-color-muted mt-3">กดเพื่อวัดค่า! Superposition จะหายไปและเหลือเพียงค่าเดียว</p>
            </div>

          </div>
        </section>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <section class="rounded-[1.5rem] p-6 visual-container bg-slate-50 border">
            <h3 class="text-lg font-bold mb-3 text-slate-800 flex items-center gap-2">Insight สำคัญ</h3>
            <ul class="bullet-list text-slate-700">
              <li>Qubit ไม่ใช่แค่ 0 หรือ 1 แต่เป็น <strong>"หลายสถานะพร้อมกัน"</strong> (จนกว่าจะถูกแอบดู)</li>
              <li>เมื่อถูกวัด (Measure) จะทำให้<strong>สถานะยุบตัวเหลือค่าเดียว</strong></li>
            </ul>
          </section>

          <section class="rounded-[1.5rem] p-6 visual-container bg-emerald-50 border border-emerald-100">
            <h3 class="text-lg font-bold mb-3 text-emerald-800 flex items-center gap-2"><i data-lucide="check-circle" class="w-5 h-5"></i> สรุป (Summary)</h3>
            <ul class="bullet-list text-emerald-900/80">
              <li><strong>Bit:</strong> เป็น 0 หรือ 1 เท่านั้น</li>
              <li><strong>Qubit:</strong> เป็นทั้ง 0 และ 1 พร้อมกันได้ (Superposition)</li>
              <li><strong>Measurement:</strong> บังคับให้ Qubit เลือกตอบแค่ 0 หรือ 1</li>
            </ul>
          </section>
        </div>

      </div>
    `,
  },
  {
    category: "Quantum Deep Dive",
    title: "Superposition (Deep Dive)",
    header: "เจาะลึก Superposition",
    explanation: "ทำความเข้าใจสถานะทับซ้อนให้ลึกซึ้งยิ่งขึ้น พร้อมทดลองวัดค่า (Measurement) เพื่อดูว่า 'ความน่าจะเป็น' ทำงานอย่างไรในโลกควอนตัม",
    workspaceHTML: `
      <div class="workspace-stack space-y-8">
        
        <section class="rounded-[1.5rem] p-7 visual-container bg-blue-50/50">
          <p class="subtle-kicker text-blue-600">Learning Objective</p>
          <h3 class="text-lg font-bold mb-2">หลังเรียนจบบทนี้ คุณจะได้</h3>
          <ul class="bullet-list">
            <li>เข้าใจ Superposition แบบลึกขึ้น ไม่ใช่แค่ 50/50 เสมอไป</li>
            <li>เข้าใจว่า Measurement ทำให้ State เปลี่ยน (Collapse) อย่างไร</li>
            <li>เห็นภาพชัดเจนว่า Probability (ความน่าจะเป็น) ทำงานยังไงเมื่อทดลองหลายครั้ง</li>
          </ul>
        </section>

        <section class="rounded-[1.5rem] p-7 interactive-container">
          <p class="subtle-kicker">1. Quantum State Adjuster</p>
          <h3 class="text-lg font-bold mb-2">Superposition ไม่จำเป็นต้อง "ครึ่งๆ"</h3>
          <p class="text-color-muted mb-6">หลายคนเข้าใจผิดว่า Superposition คือการเป็น 0 อยู่ 50% และ 1 อยู่ 50% เสมอแต่<strong> จริงๆ แล้วไม่ใช่เสมอไป</strong> Superposition สามารถผสมในสัดส่วนไหนก็ได้ (เช่น 90% กับ 10%) ขอแค่รวมกันได้ 100%</p>
          
          <div class="bg-white border rounded-2xl p-6 shadow-sm">
            <p class="text-sm font-semibold text-slate-700 mb-4 text-center">ปรับสัดส่วน Probability</p>
            
            <div class="flex justify-between text-sm font-bold font-['Space_Mono'] mb-2">
              <span class="text-slate-600">P(0) = <span id="l3-val-0">70</span>%</span>
              <span class="text-blue-600">P(1) = <span id="l3-val-1">30</span>%</span>
            </div>
            
            <input type="range" min="0" max="100" value="70" class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-6" oninput="updateL3Slider(this.value)">
            
            <div class="w-full h-10 bg-slate-100 rounded-xl overflow-hidden flex shadow-inner border">
              <div id="l3-bar-0" class="h-full bg-slate-400 flex items-center justify-center transition-all duration-200" style="width: 70%">
                <span class="font-bold text-white text-xs">|0⟩</span>
              </div>
              <div id="l3-bar-1" class="h-full bg-blue-500 flex items-center justify-center transition-all duration-200" style="width: 30%">
                <span class="font-bold text-white text-xs">|1⟩</span>
              </div>
            </div>
            <p class="text-sm text-color-muted mt-3 text-center">เลื่อนเพื่อเปลี่ยนเปอร์เซ็นต์ (สิ่งนี้จะเป็นค่าตั้งต้นให้การทดลองด้านล่าง)</p>
          </div>
        </section>

        <section class="rounded-[1.5rem] p-7 interactive-container">
          <p class="subtle-kicker">2. Single Measurement</p>
          <h3 class="text-lg font-bold mb-2">การวัดค่า (Measurement)</h3>
          <p class="text-color-muted mb-6">ตอนที่ Qubit ยังไม่ถูกวัด มันคือ Superposition แต่ <strong>ทันทีที่เราวัด</strong> มันจะ "สุ่ม" ยุบตัว (Collapse) กลายเป็น <strong>0 หรือ 1 เท่านั้น</strong> ตามสัดส่วนที่เราตั้งไว้ด้านบน</p>

          <div class="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 text-center shadow-sm max-w-sm mx-auto flex flex-col items-center">
            <div class="w-24 h-24 bg-white rounded-2xl shadow-md border-2 border-slate-100 flex items-center justify-center mb-6">
              <span id="l3-single-result" class="text-5xl font-bold text-slate-300 font-['Space_Mono'] transition-all">?</span>
            </div>
            <button onclick="measureL3Single()" class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all w-full flex items-center justify-center gap-2 shadow-md">
              <i data-lucide="crosshair" class="w-5 h-5"></i> Measure Once (วัด 1 ครั้ง)
            </button>
          </div>
        </section>

        <section class="rounded-[1.5rem] p-7 interactive-container bg-slate-800">
          <p class="subtle-kicker">3. Law of Large Numbers</p>
          <h3 class="text-lg font-bold mb-2">ทดลองวัดหลายครั้ง</h3>
          <p class="text-color-muted mb-6">ถ้าเราวัดแค่ครั้งเดียว มันอาจจะดูเหมือน "สุ่มมั่วๆ" แต่ถ้าเรานำ Qubit ที่ตั้งค่าแบบเดิมเป๊ะๆ มาวัดซ้ำๆ (รันหลายรอบ) <strong>เราจะเริ่มเห็น Pattern ของ Probability ที่ซ่อนอยู่</strong></p>

          <div class="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-xl">
            <div class="flex flex-wrap gap-3 justify-center mb-8">
              <button onclick="runL3Multi(10)" class="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-semibold transition-all">รัน 10 ครั้ง</button>
              <button onclick="runL3Multi(50)" class="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-semibold transition-all">รัน 50 ครั้ง</button>
              <button onclick="runL3Multi(100)" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-all shadow-md shadow-blue-900/50">รัน 100 ครั้ง</button>
            </div>

            <div class="space-y-4">
              <div>
                <div class="flex justify-between text-sm font-bold font-['Space_Mono'] text-slate-400 mb-1">
                  <span>ได้ |0⟩ : <span id="l3-multi-count-0" class="text-white text-base">0</span> ครั้ง</span>
                </div>
                <div class="w-full h-6 bg-slate-800 rounded-md overflow-hidden flex">
                  <div id="l3-multi-bar-0" class="h-full bg-slate-400 transition-all duration-500 ease-out" style="width: 0%"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between text-sm font-bold font-['Space_Mono'] text-slate-400 mb-1">
                  <span>ได้ |1⟩ : <span id="l3-multi-count-1" class="text-blue-400 text-base">0</span> ครั้ง</span>
                </div>
                <div class="w-full h-6 bg-slate-800 rounded-md overflow-hidden flex">
                  <div id="l3-multi-bar-1" class="h-full bg-blue-500 transition-all duration-500 ease-out" style="width: 0%"></div>
                </div>
              </div>
            </div>
            
            <p id="l3-multi-insight" class="text-sm text-blue-300 mt-6 text-center h-4">ทดลองรัน 100 ครั้ง เพื่อดูว่าผลลัพธ์เข้าใกล้เปอร์เซ็นต์ที่ตั้งไว้หรือไม่!</p>
          </div>
        </section>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <section class="rounded-[1.5rem] p-6 visual-container bg-slate-50 border col-span-1 md:col-span-2">
            <h3 class="text-lg font-bold mb-3 text-slate-800 flex items-center gap-2">Insight & สิ่งที่ต้องระวัง</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul class="bullet-list text-slate-700">
                <li><strong>Superposition</strong> = มีหลายสถานะพร้อมกัน</li>
                <li><strong>Measurement</strong> = บังคับให้เหลือสถานะเดียว</li>
                <li>ผลลัพธ์ดูเหมือนสุ่ม แต่จริงๆ มี <strong>Pattern ควบคุมอยู่</strong></li>
              </ul>
              <ul class="bullet-list text-rose-800/80">
                <li>Superposition <strong>ไม่ใช่การสุ่มมั่ว (≠ Random)</strong></li>
                <li>มันมี "ความน่าจะเป็น" กำกับไว้เสมอ</li>
                <li>เมื่อวัดค่าไปแล้ว <strong>ย้อนกลับไม่ได้</strong> (Qubit เสียสถานะ Superposition ทันที)</li>
              </ul>
            </div>
          </section>

          <section class="rounded-[1.5rem] p-6 visual-container bg-emerald-50 border border-emerald-100 col-span-1 md:col-span-2">
            <h3 class="text-lg font-bold mb-3 text-emerald-800 flex items-center gap-2"><i data-lucide="check-circle" class="w-5 h-5"></i> สรุป (Summary)</h3>
            <ul class="bullet-list text-emerald-900/80">
              <li>Qubit สามารถอยู่ในหลายสถานะได้ตามสัดส่วนที่ต้องการ</li>
              <li>เมื่อทำการวัด (Measure) จะได้ค่าออกมาเพียงค่าเดียว (0 หรือ 1)</li>
              <li>ต้อง <strong>ทดลองหลายๆ ครั้ง</strong> ถึงจะเห็นความน่าจะเป็นที่แท้จริงของ Qubit นั้น</li>
            </ul>
          </section>
        </div>

      </div>
    `,
  },
  {
    category: "Quantum Visualization",
    title: "Bloch Sphere Visualization",
    header: "มอง Qubit ให้เห็นภาพ 3 มิติ",
    explanation: "ก้าวข้ามขีดจำกัดของตัวเลขและเปอร์เซ็นต์ มาทำความรู้จักกับ 'Bloch Sphere' เครื่องมือ 3 มิติที่จะช่วยให้คุณเห็นภาพการหมุนเปลี่ยนสถานะของ Qubit ได้อย่างสมบูรณ์แบบ",
    workspaceHTML: `
      <div class="workspace-stack space-y-8">
        
        <section class="rounded-[1.5rem] p-7 visual-container bg-blue-50/50">
          <p class="subtle-kicker text-blue-600">Learning Objective</p>
          <h3 class="text-lg font-bold mb-2">หลังเรียนจบบทนี้ คุณจะได้</h3>
          <ul class="bullet-list">
            <li>เข้าใจว่า Qubit สามารถ "มองเป็นภาพ" ได้</li>
            <li>รู้จัก Bloch Sphere และจุดสำคัญบนทรงกลม</li>
            <li>เห็นว่า State ของ Qubit เปลี่ยนแปลงอย่างไรในรูปทรง 3 มิติ</li>
          </ul>
        </section>

        <section class="rounded-[1.5rem] p-7 interactive-container">
          <p class="subtle-kicker">1. The Bloch Sphere</p>
          <h3 class="text-lg font-bold mb-2">พบกับ Bloch Sphere</h3>
          <p class="text-color-muted mb-6">การใช้แค่ตัวเลข 70% หรือ 30% อธิบาย Qubit นั้นยังไม่พอ เพราะจริงๆ แล้วสถานะของมันมี "ทิศทาง" ด้วย <br>เราจึงอธิบาย Qubit ด้วย <strong>ลูกบอล 3 มิติ (Bloch Sphere)</strong> โดยทุกจุดบนผิวลูกบอล = 1 สถานะที่เป็นไปได้ของ Qubit</p>
          <p class="text-color-muted mb-6">หมายเหตุ: สามารถดูการทำงานของ Bloch Sphere ฉบับ WebGL <a href="/pages/BlochSphere.html" class="text-blue-500 hover:text-blue-700 underline">ได้ที่นี่</a></p>

          <div class="border border-slate-700 rounded-2xl p-6 shadow-xl overflow-hidden flex flex-col items-center select-none">
            <p class="text-sm mb-4 animate-pulse">ลากเมาส์ที่ทรงกลมเพื่อหมุนดูรอบๆ แบบ 3D</p><br>
            
            <div id="l4-sphere-container" class="relative w-64 h-64 mx-auto cursor-grab active:cursor-grabbing mb-8" style="perspective: 1000px;">
              <div id="l4-bloch-sphere" class="w-full h-full relative" style="transform-style: preserve-3d; transform: rotateX(-15deg) rotateY(-30deg);">
                
                <div class="absolute top-0 bottom-0 left-1/2 w-0 border-l-2 border-dashed border-slate-600/50 -translate-x-1/2"></div> 
                <div class="absolute left-0 right-0 top-1/2 h-0 border-t-2 border-dashed border-slate-600/50 -translate-y-1/2"></div> 
                <div class="absolute left-0 right-0 top-1/2 h-0 border-t-2 border-dashed border-slate-600/50 -translate-y-1/2" style="transform: rotateY(90deg);"></div> 

                <div class="absolute inset-0 rounded-full border-2 border-slate-600/80" style="transform: rotateX(90deg);"></div>
                <div class="absolute inset-0 rounded-full border-2 border-slate-600/80" style="transform: rotateY(90deg);"></div>
                <div class="absolute inset-0 rounded-full border-2 border-slate-600/80 shadow-[inset_0_0_50px_rgba(255,255,255,0.05)]"></div>


                <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 font-bold text-white bg-slate-800 px-2 rounded text-xs">Z (|0⟩)</div>
                <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 font-bold text-white bg-slate-800 px-2 rounded text-xs">Z (|1⟩)</div>
                <div class="absolute top-1/2 right-0 translate-x-10 -translate-y-1/2 font-bold text-white bg-slate-800 px-2 rounded text-xs">X (|+⟩)</div>
                <div class="absolute top-1/2 left-0 -translate-x-10 -translate-y-1/2 font-bold text-white bg-slate-800 px-2 rounded text-xs">X (|-⟩)</div>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white bg-slate-800 px-2 rounded text-xs" style="transform: translateZ(140px);">Y (|i⟩)</div>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white bg-slate-800 px-2 rounded text-xs" style="transform: translateZ(-140px);">Y (|-i⟩)</div>

                <div id="l4-vector-container" class="absolute inset-0" style="transform-style: preserve-3d; transform: rotateY(0deg) rotateZ(0deg);">
                  <div class="absolute bottom-1/2 left-1/2 w-[3px] h-32 bg-gradient-to-t from-rose-400 to-rose-600 origin-bottom rounded-full" style="transform: translateX(-50%);">
                    <div class="absolute top-0 left-1/2 w-5 h-5 bg-rose-500 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(225,29,72,1)] border-2 border-white"></div>
                  </div>
                </div>

              </div>
            </div>

            <p id="l4-bloch-status" class="text-sm font-semibold text-rose-400 bg-rose-400/10 px-4 py-2 rounded-full font-['Space_Mono']">สถานะปัจจุบัน: |0⟩ (ด้านบน)</p>
          </div>
        </section>

        <section class="rounded-[1.5rem] p-7 interactive-container">
          <p class="subtle-kicker">2. States & Rotations</p>
          <h3 class="text-lg font-bold mb-4">สถานะ & การหมุน</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-slate-50 border rounded-2xl p-5 shadow-sm">
              <p class="text-sm font-bold text-slate-700 mb-3 text-center">ย้ายไปจุดสำคัญ</p>
              <p class="text-sm text-color-muted mb-4 text-center">บนสุดคือ |0⟩, ล่างสุดคือ |1⟩, ตรงกลางคือ Superposition</p>
              <div class="flex flex-col gap-2">
                <button onclick="setL4State('0')" class="py-2 bg-white border hover:bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold transition-all shadow-sm">ชี้ไปที่ |0⟩ (ขั้วเหนือ)</button>
                <button onclick="setL4State('1')" class="py-2 bg-white border hover:bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold transition-all shadow-sm">ชี้ไปที่ |1⟩ (ขั้วใต้)</button>
                <button onclick="setL4State('sup')" class="py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all shadow-sm">Superposition |+⟩ (เส้นศูนย์สูตร)</button>
              </div>
            </div>

            <div class="bg-blue-50 border border-blue-100 rounded-2xl p-5 shadow-sm">
              <p class="text-sm font-bold text-blue-800 mb-3 text-center">หมุนสถานะ (Rotate 90°)</p>
              <p class="text-sm text-blue-600/80 mb-4 text-center">การใช้ Quantum Gate คือการจับจุดนี้ "หมุน" ไปตามแกน X, Y, Z</p>
              <div class="grid grid-cols-3 gap-2 h-[calc(100%-4rem)]">
                <button onclick="rotateL4Bloch('X')" class="bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition-all shadow-md flex flex-col items-center justify-center gap-1">
                  <i data-lucide="rotate-3d" class="w-4 h-4"></i> แกน X
                </button>
                <button onclick="rotateL4Bloch('Y')" class="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-bold transition-all shadow-md flex flex-col items-center justify-center gap-1">
                  <i data-lucide="rotate-3d" class="w-4 h-4"></i> แกน Y
                </button>
                <button onclick="rotateL4Bloch('Z')" class="bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-bold transition-all shadow-md flex flex-col items-center justify-center gap-1">
                  <i data-lucide="rotate-3d" class="w-4 h-4"></i> แกน Z
                </button>
              </div>
            </div>
          </div>
        </section>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <section class="rounded-[1.5rem] p-6 visual-container bg-slate-50 border col-span-1 md:col-span-2">
            <h3 class="text-lg font-bold mb-3 text-slate-800 flex items-center gap-2">ทำไมภาพนี้ถึงสำคัญ?</h3>
            <ul class="bullet-list text-slate-700">
              <li><strong>มองข้ามสมการ:</strong> ช่วยให้เห็นภาพการทำงานของ Qubit โดยไม่ต้องพึ่งสมการคณิตศาสตร์ที่ซับซ้อน</li>
              <li><strong>การคำนวณ = การหมุน:</strong> การเขียนโปรแกรมควอนตัม แท้จริงแล้วคือ <strong>การสั่งให้ Qubit หมุนไปในทิศทางที่ถูกต้อง</strong> ก่อนที่จะทำการวัดผลนั่นเอง!</li>
            </ul>
          </section>

          <section class="rounded-[1.5rem] p-6 visual-container bg-emerald-50 border border-emerald-100 col-span-1 md:col-span-2">
            <h3 class="text-lg font-bold mb-3 text-emerald-800 flex items-center gap-2"><i data-lucide="check-circle" class="w-5 h-5"></i> สรุป (Summary)</h3>
            <ul class="bullet-list text-emerald-900/80">
              <li><strong>Bloch Sphere</strong> ใช้แสดงสถานะ Qubit ด้วยภาพ 3 มิติ</li>
              <li>ขั้วเหนือ = <strong>|0⟩</strong>, ขั้วใต้ = <strong>|1⟩</strong></li>
              <li>สถานะที่อยู่ระหว่างกลางขั้ว (เช่น เส้นศูนย์สูตร) คือสภาวะ <strong>Superposition</strong></li>
            </ul>
          </section>
        </div>

      </div>
    `,
  },
  {
    category: "Intermediate Concepts",
    title: "Quantum Gates (Basic)",
    header: "เกตควอนตัม (Quantum Gates)",
    explanation:
      "ในคอมพิวเตอร์ทั่วไปเราใช้ Logic Gate เพื่อเปลี่ยนค่า 0 และ 1 แต่ในควอนตัมคอมพิวเตอร์ เราใช้ Quantum Gate เพื่อ 'หมุน' สถานะของ Qubit บนทรงกลม 3 มิติ",
    workspaceHTML: `
      <div class="workspace-stack space-y-8">
        
        <section class="rounded-[1.5rem] p-7 visual-container bg-sky-50/50">
          <p class="subtle-kicker text-blue-600">Learning Objective</p>
          <h3 class="text-lg font-bold mb-2">หลังเรียนจบบทนี้ คุณจะได้</h3>
          <ul class="bullet-list">
            <li>เข้าใจว่า Quantum Gate คืออะไร</li>
            <li>รู้ว่า gate ใช้ "เปลี่ยนสถานะ qubit" (ผ่านการหมุน)</li>
            <li>รู้จักเกตพื้นฐาน: X, Y, Z</li>
          </ul>
        </section>

        <section class="rounded-[1.5rem] p-7 interactive-container">
          <p class="subtle-kicker">1. Classical vs Quantum Gates</p>
          <h3 class="text-lg font-bold mb-2">Quantum Gate คืออะไร?</h3>
          <p class="text-color-muted mb-6">จากบทที่แล้ว เรารู้ว่า <strong>Qubit = จุดบนลูกบอล</strong> ดังนั้น <strong>Quantum Gate = การจับจุดนั้นหมุนไปรอบๆ</strong> บนลูกบอล 3 มิตินั่นเอง!</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-slate-50 border rounded-2xl p-5 shadow-sm">
              <h4 class="font-bold text-slate-700 mb-2">Classical Gates</h4>
              <p class="text-sm text-color-muted">ใช้ Logic Gate (เช่น AND, OR, NOT) เพื่อเปลี่ยนค่า Bit กลับไปกลับมา (0 ↔ 1)</p>
            </div>
            <div class="bg-blue-50 border border-blue-100 rounded-2xl p-5 shadow-sm">
              <h4 class="font-bold text-blue-600 mb-2">Quantum Gates</h4>
              <p class="text-sm text-blue-600/80">ใช้เพื่อ <strong>เปลี่ยนสถานะ (ทิศทาง)</strong> ของ Qubit ในพื้นที่ 3 มิติ</p>
            </div>
          </div>
        </section>

        <section class="rounded-[1.5rem] p-7 interactive-container shadow-xl">
          <p class="subtle-kicker">2. Quantum Gate Lab</p>
          <h3 class="text-lg font-bold mb-2">ทดลองหมุนเกต X, Y, Z</h3>
          <p class="text-color-muted mb-6">ลองกดปุ่ม Apply ด้านล่าง แล้วสังเกตว่า <strong>"ก่อน"</strong> และ <strong>"หลัง"</strong> ใช้เกต สถานะของ Qubit เปลี่ยนแปลงไปในทิศทางไหน</p>
          <p class="text-color-muted mb-6">หมายเหตุ: สามารถดูการทำงานของ Bloch Sphere ฉบับ WebGL <a href="/pages/BlochSphere.html" class="text-blue-500 hover:text-blue-700 underline">ได้ที่นี่</a></p><br>

          <div class="flex justify-center mb-6">
              <div id="l5-sphere-container" class="relative w-64 h-64 cursor-grab active:cursor-grabbing select-none" style="perspective: 1000px;">
                <div id="l5-bloch-sphere" class="w-full h-full relative transition-transform duration-75 ease-out" style="transform-style: preserve-3d; transform: rotateX(-15deg) rotateY(-30deg);">
                  
                  <div class="absolute top-0 bottom-0 left-1/2 w-0 border-l-2 border-dashed border-slate-600/50 -translate-x-1/2"></div> 
                  <div class="absolute left-0 right-0 top-1/2 h-0 border-t-2 border-dashed border-slate-600/50 -translate-y-1/2"></div> 
                  <div class="absolute left-0 right-0 top-1/2 h-0 border-t-2 border-dashed border-slate-600/50 -translate-y-1/2" style="transform: rotateY(90deg);"></div>

                  <div class="absolute inset-0 rounded-full border-2 border-slate-600/80" style="transform: rotateX(90deg);"></div>
                  <div class="absolute inset-0 rounded-full border-2 border-slate-600/80" style="transform: rotateY(90deg);"></div>
                  <div class="absolute inset-0 rounded-full border-2 border-slate-600/80 shadow-[inset_0_0_50px_rgba(255,255,255,0.02)]"></div>


                  <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 font-bold text-white bg-slate-800 px-2 rounded text-xs">Z (|0⟩)</div>
                  <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 font-bold text-white bg-slate-800 px-2 rounded text-xs">Z (|1⟩)</div>
                  <div class="absolute top-1/2 right-0 translate-x-10 -translate-y-1/2 font-bold text-white bg-slate-800 px-2 rounded text-xs">X (|+⟩)</div>
                  <div class="absolute top-1/2 left-0 -translate-x-10 -translate-y-1/2 font-bold text-white bg-slate-800 px-2 rounded text-xs">X (|-⟩)</div>
                  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white bg-slate-800 px-2 rounded text-xs" style="transform: translateZ(140px);">Y (|i⟩)</div>
                  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white bg-slate-800 px-2 rounded text-xs" style="transform: translateZ(-140px);">Y (|-i⟩)</div>

                  <div id="l5-vector-container" class="absolute inset-0" style="transform-style: preserve-3d; transform: rotateY(0deg) rotateZ(0deg);">
                    <div class="absolute bottom-1/2 left-1/2 w-[3px] h-32 bg-gradient-to-t from-rose-400 to-rose-600 origin-bottom rounded-full -translate-x-1/2">
                      <div class="absolute top-0 left-1/2 w-5 h-5 bg-rose-500 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(225,29,72,1)] border-2 border-white"></div>
                    </div>
                  </div>

                </div>
              </div>
          </div>
          
          <p id="l5-bloch-status" class="text-sm font-semibold text-rose-400 bg-rose-400/10 px-4 py-2 rounded-full font-['Space_Mono'] text-center mb-6">สถานะปัจจุบัน: |0⟩</p>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <button onclick="applyL5Gate('X')" class="bg-rose-600 hover:bg-rose-500 text-white py-3 rounded-xl font-bold flex flex-col items-center transition-all shadow-md hover:-translate-y-0.5">
              <span>Apply X</span>
              <span class="text-xs font-normal opacity-80 mt-1">สลับ 0 ↔ 1 (NOT)</span>
            </button>
            <button onclick="applyL5Gate('Y')" class="bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-bold flex flex-col items-center transition-all shadow-md hover:-translate-y-0.5">
              <span>Apply Y</span>
              <span class="text-xs font-normal opacity-80 mt-1">หมุนเฉียงแกน Y</span>
            </button>
            <button onclick="applyL5Gate('Z')" class="bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold flex flex-col items-center transition-all shadow-md hover:-translate-y-0.5">
              <span>Apply Z</span>
              <span class="text-xs font-normal opacity-80 mt-1">หมุนรอบแกน Z (Phase)</span>
            </button>
          </div>
          
          <div class="flex flex-col sm:flex-row justify-center gap-3 mt-6">
            <button onclick="applyL5Gate('H')" class="text-sm bg-indigo-500/20 hover:bg-indigo-500/40 text-indigo-500 border border-indigo-500/50 py-2 px-4 rounded-lg transition-all">H Gate (ชี้ไป Superposition ก่อนกด Z)</button>
            <button onclick="applyL5Gate('reset')" class="text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 px-4 rounded-lg transition-all">Reset กลับไปที่ |0⟩</button>
          </div>
        </section>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <section class="rounded-[1.5rem] p-6 visual-container bg-slate-50 border">
            <h3 class="text-lg font-bold mb-3 text-slate-800 flex items-center gap-2">Insight สำคัญ</h3>
            <ul class="bullet-list text-slate-700">
              <li>Quantum Gate <strong>ไม่ใช่แค่เปลี่ยนค่า</strong> 0 เป็น 1</li>
              <li>แต่มันคือ <strong>"การหมุนในแกน 3D"</strong></li>
              <li>การคำนวณแบบควอนตัม = <strong>การใช้ Gate ต่อกัน</strong> เพื่อหมุนเวกเตอร์ไปหาคำตอบที่ถูกต้อง</li>
            </ul>
          </section>

          <section class="rounded-[1.5rem] p-6 visual-container bg-emerald-50 border border-emerald-100">
            <h3 class="text-lg font-bold mb-3 text-emerald-800 flex items-center gap-2"><i data-lucide="check-circle" class="w-5 h-5"></i> สรุป (Summary)</h3>
            <ul class="bullet-list text-emerald-900/80">
              <li>Quantum Gate ใช้เปลี่ยนสถานะ Qubit</li>
              <li><strong>X Gate:</strong> ตีลังกาสลับขั้วเหนือ-ใต้ (Flip)</li>
              <li><strong>Y, Z Gate:</strong> หมุนเปลี่ยนทิศทาง/Phase (Rotate)</li>
              <li>ทั้งหมดนี้อธิบายได้ด้วยการหมุนบน Bloch Sphere</li>
            </ul>
          </section>
        </div>

      </div>
    `,
  },
  {
    category: "Intermediate Concepts",
    title: "Hadamard Gate (H Gate)",
    header: "ประตูสู่ Superposition",
    explanation:
      "Hadamard Gate (H Gate) คือกุญแจสำคัญที่ทำให้ Qubit เข้าสู่สถานะ Superposition ทำให้มันสามารถคำนวณหลายทางเลือกได้ในเวลาเดียวกัน ถือเป็นจุดเริ่มต้นของอัลกอริทึมควอนตัมส่วนใหญ่",
    workspaceHTML: `
      <div class="workspace-stack space-y-8">
        
        <section class="rounded-[1.5rem] p-7 visual-container bg-indigo-50/50">
          <p class="subtle-kicker text-blue-600">Learning Objective</p>
          <h3 class="text-lg font-bold mb-2">หลังเรียนจบบทนี้ คุณจะได้</h3>
          <ul class="bullet-list">
            <li>เข้าใจว่า Hadamard Gate คืออะไร</li>
            <li>รู้ว่า H Gate ใช้สร้าง Superposition ได้อย่างไร</li>
            <li>เห็นภาพผลลัพธ์ของ H Gate อย่างชัดเจนบน Bloch Sphere</li>
          </ul>
        </section>

        <section class="rounded-[1.5rem] p-7 interactive-container">
          <p class="subtle-kicker">1. The Missing Piece</p>
          <h3 class="text-lg font-bold mb-2">ปัญหาจากบทก่อนหน้า</h3>
          <p class="text-color-muted mb-4">ในบท Quantum Gates เราได้ทดลองใช้เกตต่างๆ และพบว่า:</p>
          <ul class="bullet-list text-slate-700 mb-6">
            <li><strong>X Gate:</strong> สลับค่า |0⟩ กับ |1⟩ ไปมา</li>
            <li><strong>Y, Z Gate:</strong> หมุนเปลี่ยนทิศทาง (Phase) ของสถานะ</li>
          </ul>
          <div class="bg-amber-50 text-amber-900 p-4 rounded-xl font-medium border border-amber-200 text-sm">
            แต่คำถามที่สำคัญที่สุดคือ... <strong>"แล้วเราจะสร้าง Superposition (สถานะครึ่งๆ กลางๆ) ได้ยังไง?"</strong>
          </div>
        </section>

        <section class="rounded-[1.5rem] p-7 interactive-container">
          <p class="subtle-kicker">2. The Answer</p>
          <h3 class="text-lg font-bold mb-2">คำตอบคือ Hadamard Gate</h3>
          <p class="text-color-muted mb-6"><strong>Hadamard Gate (H Gate)</strong> คือเกตพิเศษที่ใช้เปลี่ยนสถานะที่ "แน่นอน" (100% เป็น 0 หรือ 1) ให้แตกออกกลายเป็น <strong>Superposition (50/50)</strong></p>
          
          <div class="bg-white border rounded-2xl p-6 shadow-sm flex flex-col items-center">
            <p class="text-sm font-semibold text-slate-700 mb-6">ทดลองใช้ H Gate เพื่อสร้าง Superposition</p>
            
            <div class="flex items-center gap-6 w-full max-w-md mb-8">
              <div class="flex-1 bg-slate-50 p-6 rounded-2xl border text-center relative overflow-hidden transition-all duration-500" id="l6-int1-box">
                <div class="relative z-10">
                  <div id="l6-int1-state" class="text-5xl font-bold text-slate-800 mb-2 font-mono transition-all">|0⟩</div>
                  <div id="l6-int1-desc" class="text-sm text-slate-500 font-medium">สถานะแน่นอน (100%)</div>
                  
                  <div class="mt-6 space-y-3">
                    <div class="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <span class="w-6 text-right">|0⟩</span>
                      <div class="flex-1 bg-slate-200 rounded-full h-3 overflow-hidden">
                        <div id="l6-int1-bar0" class="bg-blue-500 h-full w-full transition-all duration-500"></div>
                      </div>
                      <span id="l6-int1-val0" class="w-10 text-right">100%</span>
                    </div>
                    <div class="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <span class="w-6 text-right">|1⟩</span>
                      <div class="flex-1 bg-slate-200 rounded-full h-3 overflow-hidden">
                        <div id="l6-int1-bar1" class="bg-rose-500 h-full w-0 transition-all duration-500"></div>
                      </div>
                      <span id="l6-int1-val1" class="w-10 text-right">0%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button onclick="toggleL6Int1()" class="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-md shadow-blue-200 flex items-center gap-2 transition-all hover:-translate-y-0.5">
              <i data-lucide="zap" class="w-5 h-5"></i> Apply H Gate
            </button>
          </div>
        </section>

        <section class="rounded-[1.5rem] p-7 interactive-container">
          <p class="subtle-kicker">3. Why It Matters</p>
          <h3 class="text-lg font-bold mb-2">ทำไม H Gate ถึงสำคัญนัก?</h3>
          <p class="mb-6 text-color-muted">เพราะมันคือ <strong>"ประตูเข้าสู่ Quantum Power"</strong> การนำ Qubit เข้าสู่ Superposition ทำให้คอมพิวเตอร์สามารถ "ลองหลายสถานะพร้อมกัน" ได้ ลองเปรียบเทียบความแตกต่างด้านล่างนี้ดูสิครับ</p>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div class="text-sm text-slate-300 mb-3">ก่อนใช้ H Gate</div>
              <div class="text-4xl font-mono font-bold text-slate-300 mb-2">|0⟩</div>
              <div class="text-sm text-slate-300">มีแค่ 1 ทางเลือก (Classical)</div>
            </div>
            <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700 relative shadow-[0_0_20px_rgba(99,102,241,0.1)]">
              <div class="absolute -left-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center bg-blue-500 text-white rounded-full w-6 h-6 z-10">
                <i data-lucide="arrow-right" class="w-3 h-3"></i>
              </div>
              <div class="text-sm text-slate-300 mb-3">หลังใช้ H Gate</div>
              <div class="text-4xl font-mono font-bold text-rose-400 mb-2">|+⟩</div>
              <div class="text-sm text-slate-300 font-mono">50% |0⟩ <span class="px-1">+</span> 50% |1⟩</div>
            </div>
          </div>
        </section>

        <section class="rounded-[1.5rem] p-7 interactive-container">
          <p class="subtle-kicker">4. Visualizing H Gate</p>
          <h3 class="text-lg font-bold mb-2">มองผ่าน Bloch Sphere</h3>
          <p class="text-color-muted mb-6">เมื่อเรา Apply H Gate จุดสถานะจะย้ายจากขั้วเหนือ <strong>(|0⟩)</strong> ลงมาอยู่ที่เส้นศูนย์สูตร <strong>(แกน X)</strong> ซึ่งเป็นจุดกึ่งกลางที่สมดุลระหว่าง 0 กับ 1 พอดี เรียกว่าสถานะ <strong>|+⟩</strong></p>
          
          <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-hidden flex flex-col items-center select-none">
            <div id="l6-sphere-container" class="relative w-56 h-56 mx-auto cursor-grab active:cursor-grabbing mb-6" style="perspective: 1000px;">
              <div id="l6-bloch-sphere" class="w-full h-full relative transition-transform duration-75 ease-out" style="transform-style: preserve-3d; transform: rotateX(-15deg) rotateY(-30deg);">
                
                <div class="absolute top-0 bottom-0 left-1/2 w-0 border-l-2 border-dashed border-slate-400/50 -translate-x-1/2"></div> 
                <div class="absolute left-0 right-0 top-1/2 h-0 border-t-2 border-dashed border-slate-400/50 -translate-y-1/2"></div> 
                <div class="absolute left-0 right-0 top-1/2 h-0 border-t-2 border-dashed border-slate-400/50 -translate-y-1/2" style="transform: rotateY(90deg);"></div> 
                <div class="absolute inset-0 rounded-full border-2 border-slate-600/80" style="transform: rotateX(90deg);"></div>
                <div class="absolute inset-0 rounded-full border-2 border-slate-600/80" style="transform: rotateY(90deg);"></div>
                <div class="absolute inset-0 rounded-full border-2 border-slate-600/80 shadow-[inset_0_0_50px_rgba(0,0,0,0.02)]"></div>

                <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 font-bold text-white bg-slate-800 px-2 rounded text-xs" style="transform: translateZ(20px);">|0⟩</div>
                <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 font-bold text-white bg-slate-800 px-2 rounded text-xs" style="transform: translateZ(20px);">|1⟩</div>
                <div class="absolute top-1/2 right-0 translate-x-8 -translate-y-1/2 font-bold text-white bg-slate-800 px-2 rounded text-xs" style="transform: translateZ(20px);">X (|+⟩)</div>

                <div id="l6-vector-container" class="absolute inset-0 transition-transform duration-700 ease-in-out" style="transform-style: preserve-3d; transform: rotateY(0deg) rotateZ(0deg);">
                  <div class="absolute bottom-1/2 left-1/2 w-[3px] h-28 bg-gradient-to-t from-transparent to-blue-500 origin-bottom rounded-full -translate-x-1/2">
                    <div class="absolute top-0 left-1/2 w-4 h-4 bg-blue-600 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(79,70,229,0.8)] border-2 border-white"></div>
                  </div>
                </div>

              </div>
            </div>

            <button onclick="applyL6BlochH()" class="px-6 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold rounded-full transition-all flex items-center gap-2 mb-4">
              <i data-lucide="refresh-cw" class="w-4 h-4"></i> สลับสถานะ (Apply H)
            </button>
            <p id="l6-bloch-status" class="text-sm font-semibold text-blue-600 font-['Space_Mono']">สถานะปัจจุบัน: |0⟩ (ขั้วเหนือ)</p>
          </div>
        </section>

        <section class="rounded-[1.5rem] p-7 interactive-container bg-blue-50/50">
          <p class="subtle-kicker text-blue-600">5. Reversibility</p>
          <h3 class="text-xl font-bold mb-2">ความเจ๋งของการ Apply H สองครั้ง</h3>
          <p class="text-slate-600 mb-6">กฎที่สำคัญมากของควอนตัมคือ ถ้านำ <strong>H Gate มาใช้ซ้อนกัน 2 ครั้ง</strong> สถานะที่เบลอๆ (Superposition) จะกลับมารวมตัวกันกลายเป็นสถานะเริ่มต้นที่ชัดเจนเหมือนเดิม!</p>
          
          <div class="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm text-center">
            <div class="flex items-center justify-center gap-2 sm:gap-4 mb-6 text-xl font-mono font-bold text-slate-700">
              <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-50 border-2 border-slate-200 flex items-center justify-center shadow-sm">|0⟩</div>
              <div id="l6-int4-arrow1" class="text-slate-300 transition-colors"><i data-lucide="arrow-right"></i></div>
              <div id="l6-int4-state2" class="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-50 border-2 border-slate-200 flex items-center justify-center shadow-sm opacity-50 transition-all text-rose-500">?</div>
              <div id="l6-int4-arrow2" class="text-slate-300 transition-colors"><i data-lucide="arrow-right"></i></div>
              <div id="l6-int4-state3" class="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-50 border-2 border-slate-200 flex items-center justify-center shadow-sm opacity-50 transition-all text-blue-600">?</div>
            </div>

            <button onclick="applyL6Twice()" id="l6-int4-btn" class="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-full font-bold shadow-md transition-all flex items-center gap-2 mx-auto">
              กด H Gate (ครั้งที่ 1)
            </button>
          </div>
        </section>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <section class="rounded-[1.5rem] p-6 visual-container bg-slate-50 border col-span-1 md:col-span-2">
            <h3 class="text-lg font-bold mb-3 text-slate-800 flex items-center gap-2">Insight สำคัญ</h3>
            <ul class="bullet-list text-slate-700">
              <li><strong>จุดเริ่มต้นของทุกสิ่ง:</strong> Quantum Algorithm แทบทุกตัว ต้องเริ่มต้นด้วยการใช้ H Gate เพื่อเตรียมความพร้อมให้คิวบิตเสมอ</li>
              <li><strong>ย้อนกลับได้เสมอ (Reversible):</strong> ทุกการเปลี่ยนแปลงในควอนตัมสามารถย้อนกลับได้ การใช้ H Gate ซ้ำ จึงเปรียบเสมือนการ Undo นั่นเอง</li>
            </ul>
          </section>

          <section class="rounded-[1.5rem] p-6 visual-container bg-emerald-50 border border-emerald-100 col-span-1 md:col-span-2">
            <h3 class="text-lg font-bold mb-3 text-emerald-800 flex items-center gap-2"><i data-lucide="check-circle" class="w-5 h-5"></i> สรุป (Summary)</h3>
            <ul class="bullet-list text-emerald-900/80">
              <li><strong>H Gate</strong> ใช้สำหรับเปลี่ยนสถานะที่แน่นอน ให้กลายเป็น Superposition</li>
              <li>บน Bloch Sphere มันคือการหมุนจุดจากขั้วเหนือ (|0⟩) ลงมาที่เส้นศูนย์สูตร (|+⟩)</li>
              <li>กด H 1 ครั้ง = <strong>เบลอ</strong> (Superposition), กด H 2 ครั้ง = <strong>ชัดเจน</strong> (กลับมาเป็นค่าเดิม)</li>
            </ul>
          </section>
        </div>

      </div>
    `
  },
  {
    category: "Quantum Basics",
    title: "Multiple Qubits",
    header: "พลังของการเชื่อมต่อหลาย Qubit",
    explanation:
      "เมื่อเรานำ Qubit มาทำงานร่วมกัน จำนวนสถานะที่เป็นไปได้จะไม่ใช่แค่เพิ่มขึ้นธรรมดา แต่จะ 'ทวีคูณแบบก้าวกระโดด' นี่คือความลับที่ทำให้ควอนตัมคอมพิวเตอร์ทรงพลัง",
    workspaceHTML: `
      <div class="workspace-stack space-y-8">
        
        <section class="rounded-[1.5rem] p-7 visual-container bg-fuchsia-50/50">
          <p class="subtle-kicker text-blue-600">Learning Objective</p>
          <h3 class="text-lg font-bold mb-2">หลังเรียนจบบทนี้ คุณจะได้</h3>
          <ul class="bullet-list">
            <li>เข้าใจว่าเกิดอะไรขึ้นเมื่อระบบมีมากกว่า 1 Qubit</li>
            <li>รู้จักการเขียนสถานะแบบ |00⟩, |01⟩, |10⟩, |11⟩</li>
            <li>เห็นว่าควอนตัมสามารถเก็บข้อมูลได้มากขึ้นแบบก้าวกระโดด (Exponential)</li>
          </ul>
        </section>

        <section class="rounded-[1.5rem] p-7 interactive-container">
          <p class="subtle-kicker">1. Two Qubits System</p>
          <h3 class="text-lg font-bold mb-2">จาก 1 สู่ 2 Qubit</h3>
          <p class="text-color-muted mb-4">ก่อนหน้านี้เราใช้แค่ 1 Qubit ซึ่งมีสถานะพื้นฐานคือ <strong>|0⟩</strong> และ <strong>|1⟩</strong><br>แต่ถ้าเรามี <strong>2 Qubits</strong> มาจับคู่กัน เราจะได้สถานะพื้นฐานเพิ่มขึ้นเป็น 4 แบบ ดังนี้:</p>
          
          <div class="bg-white border rounded-2xl p-6 shadow-sm flex flex-col items-center">
            <p class="text-sm font-semibold text-slate-700 mb-6 uppercase tracking-wider">State Explorer (2 Qubits)</p>
            
            <div class="flex items-center justify-center gap-6 w-full max-w-md mb-8">
              <div class="flex-1 bg-slate-50 p-8 rounded-2xl border text-center shadow-inner">
                <div class="text-sm text-slate-500 mb-2">สถานะปัจจุบัน (Current State)</div>
                <div id="l7-int1-display" class="text-5xl font-bold font-mono transition-all transform scale-100">|00⟩</div>
              </div>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-md">
              <button onclick="setL7Int1State('00')" class="py-3 bg-white border-2 border-slate-200 hover:border-blue-400 hover:text-blue-600 rounded-xl font-bold text-slate-600 transition-all font-mono">|00⟩</button>
              <button onclick="setL7Int1State('01')" class="py-3 bg-white border-2 border-slate-200 hover:border-blue-400 hover:text-blue-600 rounded-xl font-bold text-slate-600 transition-all font-mono">|01⟩</button>
              <button onclick="setL7Int1State('10')" class="py-3 bg-white border-2 border-slate-200 hover:border-blue-400 hover:text-blue-600 rounded-xl font-bold text-slate-600 transition-all font-mono">|10⟩</button>
              <button onclick="setL7Int1State('11')" class="py-3 bg-white border-2 border-slate-200 hover:border-blue-400 hover:text-blue-600 rounded-xl font-bold text-slate-600 transition-all font-mono">|11⟩</button>
            </div>
            <p class="text-sm text-color-muted mt-4 text-center">ลองกดปุ่มด้านบนเพื่อให้คุ้นชินกับการเขียน Notation แบบหลาย Qubit</p>
          </div>
        </section>

        <section class="rounded-[1.5rem] p-7 interactive-container">
          <p class="subtle-kicker">2. Exponential Growth</p>
          <h3 class="text-lg font-bold mb-2">จำนวนสถานะเพิ่มแบบก้าวกระโดด</h3>
          <p class="text-muted mb-6">จำนวนสถานะที่เป็นไปได้ของระบบควอนตัมจะเพิ่มขึ้นแบบยกกำลังด้วยสูตร <strong><span class="text-blue-600 text-lg font-mono">2ⁿ</span></strong> (n คือจำนวน Qubit)</p>
          
          <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
            <p class="text-sm text-slate-400 mb-4 text-center">ลองเลื่อน Slider เพิ่มจำนวน Qubit ดูสิ</p>
            
            <div class="flex flex-col items-center justify-center gap-4 mb-8">
              <div class="text-center">
                <span id="l7-int2-qubits" class="text-4xl font-bold text-white font-mono">2</span>
                <span class="text-slate-400 ml-2">Qubits</span>
              </div>
              <div class="text-slate-500"><i data-lucide="arrow-down"></i></div>
              <div class="text-center bg-blue-900/30 border border-blue-500/30 px-8 py-4 rounded-2xl w-full max-w-xs">
                <span class="block text-sm text-blue-300 mb-1">สร้างสถานะที่ต่างกันได้ถึง</span>
                <span id="l7-int2-states" class="text-5xl font-bold text-blue-400 font-mono">4</span>
                <span class="text-blue-300 ml-2">สถานะ</span>
              </div>
            </div>

            <input type="range" min="1" max="10" value="2" class="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500" oninput="updateL7Int2Slider(this.value)">
            <div class="flex justify-between text-sm text-slate-300 mt-2 font-mono">
              <span>1</span><span>10 Qubits (1,024 สถานะ!)</span>
            </div>
          </div>
        </section>

        <section class="rounded-[1.5rem] p-7 interactive-container">
          <p class="subtle-kicker">3. Multi-Qubit Superposition</p>
          <h3 class="text-lg font-bold mb-2">H Gate กับหลาย Qubit</h3>
          <p class="text-muted mb-6">ความมหัศจรรย์จะเกิดขึ้นเมื่อเราจับ <strong>Qubit ทุกตัวไปอยู่ในสถานะ Superposition</strong> ด้วยการใช้ H Gate</p>
          
          <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div class="flex justify-between items-center mb-6">
              <h4 class="font-bold text-slate-700 text-sm">ความน่าจะเป็นของระบบ 2 Qubits</h4>
              <span id="l7-int3-badge" class="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-bold rounded-full">สถานะแน่นอน</span>
            </div>
            
            <div class="grid grid-cols-4 gap-2 h-40 items-end mb-4 border-b border-slate-200 pb-2">
              <div class="flex flex-col items-center justify-end h-full group">
                <span id="l7-int3-val00" class="text-xs font-bold mb-1 transition-all">100%</span>
                <div id="l7-int3-bar00" class="w-full max-w-[3rem] bg-blue-500 rounded-t-md transition-all duration-700 ease-in-out shadow-[0_0_15px_rgba(99,102,241,0.4)]" style="height: 100%;"></div>
                <span class="text-xs font-mono font-bold text-slate-600 mt-2">|00⟩</span>
              </div>
              <div class="flex flex-col items-center justify-end h-full group">
                <span id="l7-int3-val01" class="text-xs font-bold text-slate-400 mb-1 transition-all">0%</span>
                <div id="l7-int3-bar01" class="w-full max-w-[3rem] bg-blue-200 rounded-t-md transition-all duration-700 ease-in-out" style="height: 0%;"></div>
                <span class="text-xs font-mono font-bold text-slate-600 mt-2">|01⟩</span>
              </div>
              <div class="flex flex-col items-center justify-end h-full group">
                <span id="l7-int3-val10" class="text-xs font-bold text-slate-400 mb-1 transition-all">0%</span>
                <div id="l7-int3-bar10" class="w-full max-w-[3rem] bg-blue-200 rounded-t-md transition-all duration-700 ease-in-out" style="height: 0%;"></div>
                <span class="text-xs font-mono font-bold text-slate-600 mt-2">|10⟩</span>
              </div>
              <div class="flex flex-col items-center justify-end h-full group">
                <span id="l7-int3-val11" class="text-xs font-bold text-slate-400 mb-1 transition-all">0%</span>
                <div id="l7-int3-bar11" class="w-full max-w-[3rem] bg-blue-200 rounded-t-md transition-all duration-700 ease-in-out" style="height: 0%;"></div>
                <span class="text-xs font-mono font-bold text-slate-600 mt-2">|11⟩</span>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <button onclick="applyL7Reset()" class="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                <i data-lucide="rotate-ccw" class="w-4 h-4"></i> เริ่มต้นที่ |00⟩
              </button>
              <button onclick="applyL7HGateAll()" class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
                <i data-lucide="zap" class="w-5 h-5"></i> Apply H Gate กับ Qubit ทุกตัว
              </button>
            </div>
            
            <div class="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <p id="l7-int3-desc" class="text-sm text-blue-800 text-center">ตอนนี้ระบบอยู่ที่ <strong>|00⟩</strong> ลองกด Apply H Gate เพื่อดูพลังของควอนตัมสิ!</p>
            </div>
          </div>
        </section>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <section class="rounded-[1.5rem] p-6 visual-container bg-slate-50 border col-span-1 md:col-span-2">
            <h3 class="text-lg font-bold mb-3 text-slate-800 flex items-center gap-2">Insight สำคัญ</h3>
            <ul class="bullet-list text-slate-700">
              <li><strong>Exponential Power:</strong> เพียงแค่เพิ่ม Qubit ระบบก็จะมีความจุข้อมูลเพิ่มขึ้น 2 เท่าทันที (300 Qubits = จำนวนสถานะมากกว่าอะตอมในจักรวาลที่สังเกตได้!)</li>
              <li><strong>Superposition ในวงกว้าง:</strong> ทำให้ควอนตัมคอมพิวเตอร์สามารถเก็บหรือ <strong>"ประมวลผลคำตอบที่เป็นไปได้ทั้งหมด"</strong> พร้อมกันในครั้งเดียว นี่คือพื้นฐานของ Quantum Speedup</li>
            </ul>
          </section>

          <section class="rounded-[1.5rem] p-6 visual-container bg-emerald-50 border border-emerald-100 col-span-1 md:col-span-2">
            <h3 class="text-lg font-bold mb-3 text-emerald-800 flex items-center gap-2"><i data-lucide="check-circle" class="w-5 h-5"></i> สรุป (Summary)</h3>
            <ul class="bullet-list text-emerald-900/80">
              <li>ระบบ <strong>2 Qubits</strong> มี <strong>4 สถานะ</strong> (|00⟩, |01⟩, |10⟩, |11⟩)</li>
              <li>ระบบ <strong>n Qubits</strong> จะมีสถานะทั้งหมดเท่ากับ <strong>2ⁿ สถานะ</strong></li>
              <li>หากใช้ H Gate กับทุกตัว ระบบจะอยู่ใน Superposition ของสถานะทั้งหมดพร้อมๆ กันอย่างเท่าเทียม</li>
            </ul>
          </section>
        </div>

      </div>
    `
  },
];
import"./modulepreload-polyfill-DfS4ul37.js";var e={background_color:`#ffffff`,surface_color:`#f8fbff`,text_color:`#0f172a`,primary_action_color:`#2563eb`,secondary_action_color:`#64748b`,font_family:`Google Sans`,font_size:16,lesson_title:`พื้นฐานควอนตัมคอมพิวติ้ง`,lesson_explain:`คอมพิวเตอร์ควอนตัมใช้คิวบิต ซูเปอร์โพซิชัน และการแทรกสอดเพื่อประมวลผลข้อมูลในรูปแบบที่ต่างจากคอมพิวเตอร์ทั่วไป`,next_btn:`Next Lesson`},t={X:{name:`Pauli-X`,copy:`เกต X สลับสถานะฐาน |0> กับ |1> จึงมักถูกมองว่าเป็น NOT gate ของโลกควอนตัม`,effect:`บน Bloch sphere เกต X คือการหมุนมุม pi รอบแกน X`,matrix:`[0  1]
[1  0]`},Y:{name:`Pauli-Y`,copy:`เกต Y พลิกสถานะเหมือน X แต่เพิ่มเฟสเข้ามาด้วย ทำให้มีผลต่อการแทรกสอดของสถานะในขั้นตอนถัดไป`,effect:`บน Bloch sphere เกต Y คือการหมุนมุม pi รอบแกน Y`,matrix:`[0  -i]
[i   0]`},Z:{name:`Pauli-Z`,copy:`เกต Z ไม่เปลี่ยน |0> แต่ใส่เครื่องหมายลบให้กับ |1> จึงเปลี่ยนเฟสสัมพัทธ์โดยไม่เปลี่ยนความน่าจะเป็นใน computational basis`,effect:`บน Bloch sphere เกต Z คือการหมุนมุม pi รอบแกน Z`,matrix:`[1   0]
[0  -1]`}},n=[{category:`พื้นฐานควอนตัม`,title:`พื้นฐานควอนตัมคอมพิวติ้ง`,header:`อะไรทำให้ Quantum Computing ต่างจากคอมพิวเตอร์ทั่วไป?`,explanation:`Quantum computing คือการประมวลผลข้อมูลด้วยระบบทางควอนตัม แทนที่จะเก็บข้อมูลเป็นบิตที่มีค่าได้แค่ 0 หรือ 1 เราใช้คิวบิตซึ่งมีแอมพลิจูดและเฟส ทำให้เกิดซูเปอร์โพซิชัน การแทรกสอด และการคำนวณแบบใหม่ที่เหมาะกับปัญหาบางชนิด เช่น การจำลองระบบฟิสิกส์ การค้นหา และการเพิ่มประสิทธิภาพเชิงโครงสร้าง`,workspaceHTML:`
      <div class="workspace-stack">
        <section class="rounded-[1.5rem] p-7 interactive-container">
          <p class="subtle-kicker">แนวคิดหลัก</p>
          <div class="comparison-table">
            <div class="comparison-row">
              <div class="comparison-label">บิตคลาสสิก</div>
              <p class="comparison-copy">บิตแบบดั้งเดิมเก็บค่าได้เพียง 0 หรือ 1 ในช่วงเวลาใดเวลาหนึ่ง และเกตแบบคลาสสิกจะเปลี่ยนค่านั้นตามกฎเชิงตรรกะที่แน่นอน</p>
            </div>
            <div class="comparison-row">
              <div class="comparison-label">คิวบิต</div>
              <p class="comparison-copy">คิวบิตเก็บแอมพลิจูดของ |0> และ |1> พร้อมกันได้ ทำให้เส้นทางของการคำนวณมีความสำคัญพอ ๆ กับผลลัพธ์สุดท้าย</p>
            </div>
            <div class="comparison-row">
              <div class="comparison-label">ศักยภาพ</div>
              <p class="comparison-copy">คอมพิวเตอร์ควอนตัมไม่ได้เร็วกว่าในทุกโจทย์ แต่ในปัญหาที่มีโครงสร้างเหมาะสม มันสามารถแทนสถานะและแปลงข้อมูลได้อย่างมีประสิทธิภาพกว่า</p>
            </div>
          </div>
        </section>

        <section class="lesson-grid">
          <article class="lesson-card">
            <h3>การแทนข้อมูล</h3>
            <p>สถานะควอนตัมอธิบายด้วยเวกเตอร์ แอมพลิจูด และเฟส ไม่ได้มีแค่คำตอบแบบจริงหรือเท็จเหมือนตรรกะคลาสสิก</p>
          </article>
          <article class="lesson-card">
            <h3>การเปลี่ยนสถานะ</h3>
            <p>เกตควอนตัมคือเมทริกซ์ยูนิตารีที่หมุนและผสมแอมพลิจูดของสถานะอย่างย้อนกลับได้</p>
          </article>
          <article class="lesson-card">
            <h3>การวัดผล</h3>
            <p>เมื่อวัดคิวบิต เราจะได้ผลลัพธ์แบบคลาสสิก และแอมพลิจูดจะกลายเป็นความน่าจะเป็นของผลที่สังเกตได้</p>
          </article>
        </section>

        <section class="rounded-[1.5rem] p-7 visual-container">
          <p class="subtle-kicker">เส้นทางการเรียนรู้</p>
          <ul class="bullet-list">
            <li>เริ่มจากคิวบิตเดี่ยวและทำความเข้าใจว่ามันถูกมองบน Bloch sphere อย่างไร</li>
            <li>ต่อด้วยซูเปอร์โพซิชันและเอนแทงเกิลเมนต์ ซึ่งอธิบายว่าทำไมระบบควอนตัมจึงต่างจากระบบคลาสสิก</li>
            <li>จากนั้นจึงไปสู่เกตและอัลกอริทึม เพื่อเชื่อมแนวคิดเข้ากับการจำลองแบบโต้ตอบ</li>
          </ul>
        </section>
      </div>
    `},{category:`พื้นฐานควอนตัม`,title:`ทำความเข้าใจคิวบิต`,header:`คิวบิตคืออะไร?`,explanation:`คิวบิตคือหน่วยข้อมูลพื้นฐานของระบบควอนตัม มันสามารถอธิบายได้เป็นเวกเตอร์ที่มีสองทิศฐานคือ |0> และ |1> ก่อนการวัด จุดของสถานะสามารถอยู่ระหว่างสองขั้วนี้ได้ ซึ่งหมายความว่ามันไม่จำเป็นต้องเป็นค่าแบบคลาสสิกเพียงค่าเดียว`,workspaceHTML:`
      <div class="workspace-stack">
        <section class="rounded-[1.5rem] p-7 visual-container">
          <p class="subtle-kicker">มองคิวบิตผ่าน Bloch Sphere</p>
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
          <p class="subtle-kicker">ลองปรับความน่าจะเป็น</p>
          <div class="flex items-center justify-between mb-3">
            <label class="text-sm font-medium text-color-main" for="probability-slider">ความน่าจะเป็นของ |0&gt;</label>
            <span id="prob-0" class="text-sm font-semibold prob-text">50%</span>
          </div>
          <input id="probability-slider" type="range" min="0" max="100" value="50" class="w-full h-2 rounded-lg custom-slider" oninput="updateProbability(this.value)">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div class="rounded-xl p-4 state-box">
              <p class="text-xs mb-1 text-color-muted">สถานะฐาน |0&gt;</p>
              <p id="state-0" class="text-lg font-bold prob-text">50%</p>
              <p class="text-sm text-color-muted mt-2">แอมพลิจูด: <span id="amp-0" class="inline-ket">0.707</span></p>
            </div>
            <div class="rounded-xl p-4 state-box">
              <p class="text-xs mb-1 text-color-muted">สถานะฐาน |1&gt;</p>
              <p id="state-1" class="text-lg font-bold text-blue-400">50%</p>
              <p class="text-sm text-color-muted mt-2">แอมพลิจูด: <span id="amp-1" class="inline-ket">0.707</span></p>
            </div>
          </div>
        </section>
      </div>
    `},{category:`พื้นฐานควอนตัม`,title:`ซูเปอร์โพซิชัน`,header:`ทำไมคิวบิตจึงอยู่ได้ทั้ง 0 และ 1?`,explanation:`ซูเปอร์โพซิชันหมายถึงการเตรียมคิวบิตให้มีแอมพลิจูดอยู่บนทั้งสองสถานะฐานพร้อมกัน นั่นไม่ได้แปลว่าเราอ่านได้สองคำตอบพร้อมกัน แต่หมายความว่าแอมพลิจูดเหล่านี้พัฒนาไปด้วยกันจนกว่าจะมีการวัด ทำให้เกตในลำดับถัดไปสามารถเสริมและหักล้างผลลัพธ์กันได้`,workspaceHTML:`
      <div class="workspace-stack">
        <section class="rounded-[1.5rem] p-7 interactive-container">
          <p class="subtle-kicker">ตัวอย่างการวัด</p>
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
            <h3>ไม่ใช่แค่ความไม่แน่นอน</h3>
            <p>เหรียญที่ยังไม่ได้เปิดดูมีผลลัพธ์จริงซ่อนอยู่แล้ว แต่คิวบิตในซูเปอร์โพซิชันถูกอธิบายด้วยแอมพลิจูดทั้งสองส่วนอย่างแท้จริง</p>
          </article>
          <article class="lesson-card">
            <h3>การแทรกสอดสำคัญมาก</h3>
            <p>แอมพลิจูดเป็นจำนวนเชิงซ้อน จึงสามารถเสริมกันหรือหักล้างกันได้ นี่คือหัวใจของอัลกอริทึมควอนตัมจำนวนมาก</p>
          </article>
          <article class="lesson-card">
            <h3>การวัดทำให้สถานะยุบ</h3>
            <p>หลังการวัด คิวบิตจะไม่อยู่ในซูเปอร์โพซิชันของ basis เดิมอีกต่อไป แต่กลายเป็นผลลัพธ์แบบคลาสสิกที่นำไปใช้งานต่อได้</p>
          </article>
        </section>
      </div>
    `},{category:`พื้นฐานควอนตัม`,title:`เอนแทงเกิลเมนต์`,header:`ทำไมคิวบิตสองตัวจึงต้องอธิบายเป็นระบบเดียวกัน?`,explanation:`เอนแทงเกิลเมนต์เกิดขึ้นเมื่อสถานะของหลายคิวบิตไม่สามารถแยกอธิบายเป็นแต่ละตัวแบบอิสระได้อีกต่อไป เราจึงต้องอธิบายระบบทั้งหมดพร้อมกัน และเมื่อมีการวัด ผลลัพธ์จะสัมพันธ์กันในแบบที่สัญชาตญาณเชิงคลาสสิกอธิบายได้ยาก`,workspaceHTML:`
      <div class="workspace-stack">
        <section class="rounded-[1.5rem] p-7 visual-container">
          <p class="subtle-kicker">เรื่องราวของ Bell Pair</p>
          <div class="lesson-grid">
            <article class="lesson-card">
              <h3>ขั้นที่ 1</h3>
              <p>เริ่มด้วยคิวบิตสองตัวในสถานะ <span class="inline-ket">|00&gt;</span> แล้วใช้ Hadamard กับคิวบิตตัวแรกเพื่อสร้างซูเปอร์โพซิชัน</p>
            </article>
            <article class="lesson-card">
              <h3>ขั้นที่ 2</h3>
              <p>ใช้ controlled-X เพื่อให้คิวบิตตัวที่สองตามตัวแรก สถานะจะกลายเป็น <span class="inline-ket">( |00&gt; + |11&gt; ) / sqrt(2)</span></p>
            </article>
            <article class="lesson-card">
              <h3>ขั้นที่ 3</h3>
              <p>เมื่อวัดคิวบิตตัวใดตัวหนึ่ง ผลลัพธ์ของทั้งคู่จะสัมพันธ์กัน แม้แต่ละตัวจะดูสุ่มเมื่อมองแยกกัน</p>
            </article>
          </div>
        </section>

        <section class="rounded-[1.5rem] p-7 interactive-container">
          <p class="subtle-kicker">สิ่งที่เอนแทงเกิลเมนต์เปลี่ยนไป</p>
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
    `},{category:`เกตควอนตัม`,title:`เกต Pauli`,header:`เกตเดี่ยวพื้นฐานทำงานอย่างไร?`,explanation:`เกต Pauli ได้แก่ X, Y และ Z เป็นเกตพื้นฐานที่กำหนดเรขาคณิตของการเคลื่อนที่ของคิวบิตเดี่ยวบน Bloch sphere แม้มันจะดูเรียบง่าย แต่แทบทุกวงจรที่ซับซ้อนกว่าล้วนสร้างต่อยอดจากเกตชุดนี้`,workspaceHTML:`
      <div class="workspace-stack">
        <section class="rounded-[1.5rem] p-7 visual-container">
          <p class="subtle-kicker">เลือกเกตที่ต้องการศึกษา</p>
          <div class="gate-grid">
            <button class="gate-card" data-gate="X" onclick="showGateDetails('X')">
              <span class="gate-symbol">X</span>
              <h3>Pauli-X</h3>
              <p>พลิกสถานะระหว่าง |0&gt; กับ |1&gt;</p>
            </button>
            <button class="gate-card" data-gate="Y" onclick="showGateDetails('Y')">
              <span class="gate-symbol">Y</span>
              <h3>Pauli-Y</h3>
              <p>พลิกสถานะพร้อมปรับเฟส</p>
            </button>
            <button class="gate-card" data-gate="Z" onclick="showGateDetails('Z')">
              <span class="gate-symbol">Z</span>
              <h3>Pauli-Z</h3>
              <p>เปลี่ยนเฟสขององค์ประกอบ |1&gt;</p>
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
    `},{category:`เกตควอนตัม`,title:`เกตหมุน`,header:`ทำไมเกตหมุนจึงยืดหยุ่นกว่าเกตคงที่?`,explanation:`เกตหมุนช่วยให้เราหมุนคิวบิตได้ตามมุมที่ต้องการรอบแกนที่เลือก มันเป็นการขยายแนวคิดจากเกต Pauli ทำให้วงจรสามารถเตรียมสถานะได้อย่างละเอียด ไม่ได้จำกัดอยู่แค่การพลิกครึ่งรอบแบบเต็ม ๆ`,workspaceHTML:`
      <div class="workspace-stack">
        <section class="rounded-[1.5rem] p-7 interactive-container">
          <p class="subtle-kicker">สนามทดลองของเกตหมุน</p>
          <div class="math-chip-row mb-6">
            <button class="gate-card is-active" data-axis="x" onclick="setRotationAxis('x')">
              <span class="gate-symbol">Rx</span>
              <h3>หมุนรอบแกน X</h3>
              <p>ทำให้สถานะเคลื่อนผ่านระนาบ YZ</p>
            </button>
            <button class="gate-card" data-axis="y" onclick="setRotationAxis('y')">
              <span class="gate-symbol">Ry</span>
              <h3>หมุนรอบแกน Y</h3>
              <p>ทำให้สถานะเคลื่อนผ่านระนาบ XZ</p>
            </button>
            <button class="gate-card" data-axis="z" onclick="setRotationAxis('z')">
              <span class="gate-symbol">Rz</span>
              <h3>หมุนรอบแกน Z</h3>
              <p>ปรับเฟสโดยหมุนรอบแกนตั้ง</p>
            </button>
          </div>

          <label class="text-sm font-medium text-color-main" for="rotation-slider">มุมที่ต้องการหมุน</label>
          <div class="slider-row mt-3">
            <input id="rotation-slider" type="range" min="0" max="180" value="90" class="w-full h-2 rounded-lg custom-slider" oninput="updateRotationDemo(this.value)">
            <span class="slider-value"><span id="rotation-angle">90</span> องศา</span>
          </div>

          <div class="rotation-meter mt-5">
            <div id="rotation-fill" class="rotation-fill"></div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div class="state-box rounded-xl p-4">
              <p class="text-xs text-color-muted mb-1">เกตปัจจุบัน</p>
              <p id="rotation-gate-label" class="text-lg font-bold prob-text">Rx(90 deg)</p>
            </div>
            <div class="state-box rounded-xl p-4">
              <p class="text-xs text-color-muted mb-1">คำอธิบาย</p>
              <p id="rotation-description" class="text-sm leading-7 text-color-muted">การหมุนหนึ่งในสี่รอบทำให้สถานะเปลี่ยนอย่างชัดเจน แต่ยังไม่ถึงขั้วตรงข้ามของทรงกลม</p>
            </div>
          </div>
        </section>

        <section class="rounded-[1.5rem] p-7 visual-container">
          <p class="subtle-kicker">ทำไมเกตนี้จึงสำคัญ</p>
          <ul class="bullet-list">
            <li>เกตหมุนช่วยเตรียมสถานะคิวบิตได้หลากหลายกว่าการใช้เพียงเกตพื้นฐานแบบเต็มรอบ</li>
            <li>มุมที่ละเอียดมีความสำคัญต่อ variational algorithms การคาลิเบรต และการควบคุมฮาร์ดแวร์จริง</li>
            <li>บนฮาร์ดแวร์หลายแบบ เกตพื้นฐานระดับเครื่องถูกสร้างขึ้นมาในรูปของการหมุนรอบแกนต่าง ๆ อยู่แล้ว</li>
          </ul>
        </section>
      </div>
    `}],r=0,i=`x`;function a(t){return`${t.font_family||e.font_family}, 'Google Sans', sans-serif`}async function o(t){let n={...e,...t},r=a(n);document.body.style.background=n.background_color,document.getElementById(`app-wrapper`).style.background=n.background_color,document.getElementById(`lesson-title`).style.fontFamily=r,document.getElementById(`lesson-title`).style.color=n.text_color,document.getElementById(`lesson-header`).style.fontFamily=r,document.getElementById(`lesson-header`).style.color=n.text_color,document.getElementById(`lesson-explanation`).style.fontFamily=r,document.getElementById(`lesson-explanation`).style.color=n.secondary_action_color;let i=document.getElementById(`next-btn`);i.querySelector(`span`).textContent=n.next_btn,i.style.background=n.primary_action_color,i.style.fontFamily=r}function s(t){function n(n){return{get:()=>t[n]||e[n],set:e=>{t[n]=e,window.elementSdk.setConfig({[n]:e})}}}return{recolorables:[n(`background_color`),n(`surface_color`),n(`text_color`),n(`primary_action_color`),n(`secondary_action_color`)],borderables:[],fontEditable:{get:()=>t.font_family||e.font_family,set:e=>{t.font_family=e,window.elementSdk.setConfig({font_family:e})}},fontSizeable:{get:()=>t.font_size||e.font_size,set:e=>{t.font_size=e,window.elementSdk.setConfig({font_size:e})}}}}function c(t){let n={...e,...t};return new Map([[`lesson_title`,n.lesson_title],[`lesson_explain`,n.lesson_explain],[`next_btn`,n.next_btn]])}window.elementSdk&&window.elementSdk.init({defaultConfig:e,onConfigChange:o,mapToCapabilities:s,mapToEditPanelValues:c});function l(e){let t=Number(e),n=100-t,r=Math.sqrt(t/100||0),i=Math.sqrt(n/100||0);[[`prob-0`,`${t}%`],[`state-0`,`${t}%`],[`state-1`,`${n}%`],[`amp-0`,r.toFixed(3)],[`amp-1`,i.toFixed(3)]].forEach(([e,t])=>{let n=document.getElementById(e);n&&(n.textContent=t)})}function u(){let e=document.getElementById(`measurement-result`);e&&(e.innerHTML=`ผลการวัดคือ <span class="inline-ket">${Math.random()<.5?`|0>`:`|1>`}</span> สถานะซูเปอร์โพซิชันได้ยุบลงเป็นสถานะฐานเพียงค่าเดียวในขณะที่ทำการวัด`)}function d(e){let n=t[e];if(!n)return;document.querySelectorAll(`[data-gate]`).forEach(t=>{t.classList.toggle(`is-active`,t.dataset.gate===e)});let r=document.getElementById(`gate-detail-name`),i=document.getElementById(`gate-detail-copy`),a=document.getElementById(`gate-detail-matrix`),o=document.getElementById(`gate-detail-effect`);r&&(r.textContent=n.name),i&&(i.textContent=n.copy),a&&(a.textContent=n.matrix),o&&(o.textContent=n.effect)}function f(e,t){return t===0?`เมื่อมุมเป็น 0 องศา เกตจะยังไม่เปลี่ยนสถานะของคิวบิต`:t===90?`การหมุนหนึ่งในสี่รอบรอบแกน ${e.toUpperCase()} ทำให้สถานะเปลี่ยนอย่างชัดเจนโดยยังไม่ไปถึงขั้วตรงข้าม`:t===180?`การหมุนครึ่งรอบรอบแกน ${e.toUpperCase()} ให้ผลเทียบได้กับเกต Pauli แกนนั้น ยกเว้น global phase`:t<90?`การหมุนมุมเล็กรอบแกน ${e.toUpperCase()} เหมาะกับการปรับสถานะอย่างละเอียด`:`การหมุนมุมค่อนข้างมากรอบแกน ${e.toUpperCase()} จะพาสถานะเข้าใกล้ฝั่งตรงข้ามของทรงกลม`}function p(e){let t=Number(e),n=document.getElementById(`rotation-angle`),r=document.getElementById(`rotation-fill`),a=document.getElementById(`rotation-gate-label`),o=document.getElementById(`rotation-description`);n&&(n.textContent=String(t)),r&&(r.style.width=`${t/180*100}%`),a&&(a.textContent=`R${i}(${t} deg)`),o&&(o.textContent=f(i,t))}function m(e){i=e,document.querySelectorAll(`[data-axis]`).forEach(t=>{t.classList.toggle(`is-active`,t.dataset.axis===e)}),p(document.getElementById(`rotation-slider`)?.value||`90`)}function h(e){e===1&&l(document.getElementById(`probability-slider`)?.value||`50`),e===4&&d(`X`),e===5&&(i=`x`,m(`x`),p(document.getElementById(`rotation-slider`)?.value||`90`))}function g(e){if(e<0||e>=n.length)return;r=e;let t=n[e];document.getElementById(`lesson-meta`).textContent=t.category,document.getElementById(`lesson-title`).textContent=t.title,document.getElementById(`lesson-header`).textContent=t.header,document.getElementById(`lesson-explanation`).textContent=t.explanation,document.getElementById(`dynamic-workspace`).innerHTML=t.workspaceHTML,document.querySelectorAll(`#sidebar .nav-btn`).forEach((t,n)=>{t.classList.toggle(`nav-item-active`,n===e)});let i=document.getElementById(`next-btn`);i.style.display=e===n.length-1?`none`:`inline-flex`,h(e),lucide.createIcons()}function _(){g(r+1)}window.loadLesson=g,window.goToNextLesson=_,window.updateProbability=l,window.measureQubit=u,window.showGateDetails=d,window.updateRotationDemo=p,window.setRotationAxis=m,document.addEventListener(`DOMContentLoaded`,()=>{g(0),lucide.createIcons()});
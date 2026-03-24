const algorithms = {
    deutsch: {
        name: "Deutsch Algorithm",
        desc: "Determine whether a function is constant or balanced",
        steps: [
            {
                title: "Initialize Qubits",
                desc: "Prepare two qubits in the computational basis",
                circuit: ["|0>", "|1>"],
                explanation: "อัลกอริทึมของ Deutsch เริ่มจากคิวบิตสองตัว โดยคิวบิตตัวแรกถูกกำหนดให้เป็น |0> และตัวที่สองเป็น |1> สถานะเริ่มต้นนี้จะถูกใช้เพื่อทดสอบฟังก์ชัน oracle",
                amplitudes: null
            },
            {
                title: "Apply Hadamard Gates",
                desc: "Create superposition on both qubits",
                circuit: ["H", "H"],
                explanation: "Hadamard gate ช่วยสร้างซูเปอร์โพซิชันของสถานะที่เป็นไปได้ทั้งหมด หลังจากใช้ H กับคิวบิตทั้งสอง เราจะได้การกระจายแอมพลิจูดแบบเท่ากัน ทำให้สามารถเรียก oracle ได้พร้อมกันในหลายทางเลือก",
                amplitudes: null
            },
            {
                title: "Apply Oracle",
                desc: "Query the unknown function in superposition",
                circuit: ["H", "U_f", "H"],
                explanation: "เมื่อใช้ oracle U_f ระบบจะเข้ารหัสว่าฟังก์ชันเป็น balanced หรือ constant ผ่านรูปแบบของเฟสและการแทรกสอด หลังจากนั้นเราจะใช้ผลของการแทรกสอดเพื่อแยกสองกรณีนี้ออกจากกัน",
                amplitudes: null
            },
            {
                title: "Measure Result",
                desc: "Measure the first qubit to identify the function",
                circuit: ["H", "U_f", "H", "วัด"],
                explanation: "การวัดคิวบิตตัวแรกจะบอกคำตอบทันที ถ้าได้ 0 แปลว่าฟังก์ชันเป็น constant และถ้าได้ 1 แปลว่าเป็น balanced จุดเด่นคืออัลกอริทึมนี้ต้องเรียก oracle เพียงครั้งเดียว",
                amplitudes: null
            }
        ]
    },
    grover: {
        name: "Grover Search",
        desc: "Search an unsorted database with quadratic speedup",
        steps: [
            {
                title: "Initialize Superposition",
                desc: "Distribute amplitude across all candidate states",
                circuit: ["H", "H", "H"],
                explanation: "เริ่มจากใช้ Hadamard กับทุกคิวบิต เพื่อให้ระบบแทนสถานะที่เป็นไปได้ทั้งหมดอย่างเท่าเทียมกัน นี่คือจุดตั้งต้นที่เปิดโอกาสให้การค้นหาเกิดขึ้นพร้อมกันในหลายคำตอบ",
                amplitudes: [0.25, 0.25, 0.25, 0.25]
            },
            {
                title: "Apply Oracle",
                desc: "Mark the target with a phase flip",
                circuit: ["H", "Oracle", "H"],
                explanation: "Oracle จะไม่บอกคำตอบตรง ๆ แต่ทำเครื่องหมายสถานะเป้าหมายด้วยการกลับเฟส ส่งผลให้สถานะนั้นพร้อมจะถูกขยายแอมพลิจูดในขั้นตอนถัดไป",
                amplitudes: [-0.3, 0.2, 0.2, 0.2]
            },
            {
                title: "Apply Diffusion",
                desc: "Amplify the target state's amplitude",
                circuit: ["H", "Oracle", "Diffuse", "H"],
                explanation: "Diffusion operator พลิกแอมพลิจูดรอบค่าเฉลี่ย เมื่อรวมกับ oracle แล้ว แอมพลิจูดของคำตอบเป้าหมายจะสูงขึ้น ขณะที่คำตอบอื่นถูกกดลง",
                amplitudes: [0.05, 0.15, 0.15, 0.65]
            },
            {
                title: "Measure Solution",
                desc: "Measure the qubits to read the most likely answer",
                circuit: ["H", "Oracle", "Diffuse", "วัด"],
                explanation: "หลังจากทำ oracle และ diffusion ซ้ำประมาณ sqrt(N) รอบ คำตอบเป้าหมายจะกลายเป็นผลลัพธ์ที่มีโอกาสถูกวัดได้มากที่สุด",
                amplitudes: [0.02, 0.02, 0.02, 0.94]
            }
        ]
    },
    teleport: {
        name: "Quantum Teleportation",
        desc: "Transfer a quantum state with entanglement and classical bits",
        steps: [
            {
                title: "Prepare Bell Pair",
                desc: "Create an entangled pair between Alice and Bob",
                circuit: ["|psi>", "H", "CNOT"],
                explanation: "Alice และ Bob ต้องมี Bell pair ร่วมกันก่อน โดยใช้ Hadamard กับคิวบิตตัวหนึ่ง แล้วตามด้วย CNOT เพื่อสร้างสถานะเอนแทงเกิลแบบ (|00> + |11>)/sqrt(2)",
                amplitudes: null
            },
            {
                title: "Measure Alice's Qubits",
                desc: "Perform a Bell measurement on the input and half of the pair",
                circuit: ["CNOT", "วัด", "วัด"],
                explanation: "Alice ทำการวัดร่วมกับคิวบิตอินพุตและคิวบิตของตัวเองใน Bell basis ผลลัพธ์จะออกมาเป็นบิตคลาสสิกสองบิตที่บอกว่า Bob ต้องแก้ไขสถานะอย่างไร",
                amplitudes: null
            },
            {
                title: "Send Classical Bits",
                desc: "Send the two classical bits to Bob",
                circuit: ["บิต 1", "บิต 2", ">>>"],
                explanation: "ข้อมูลคลาสสิกสองบิตถูกส่งจาก Alice ไปหา Bob ขั้นตอนนี้สำคัญเพราะ teleportation ไม่ได้ละเมิดข้อจำกัดเรื่องการสื่อสารเร็วกว่าแสง",
                amplitudes: null
            },
            {
                title: "Apply Recovery Operation",
                desc: "Bob uses the appropriate Pauli gate to recover the state",
                circuit: ["แก้ไขแบบ Pauli", "ผลลัพธ์ |psi>"],
                explanation: "Bob เลือกใช้ I, X, Y หรือ Z ตามบิตที่ได้รับ เมื่อทำถูกต้อง สถานะควอนตัมต้นฉบับจะถูกสร้างขึ้นใหม่บนคิวบิตของ Bob",
                amplitudes: null
            }
        ]
    }
    ,
    shor: {
        name: "Shor Algorithm",
        desc: "เรียนรู้การหา period และการแยกตัวประกอบผ่านห้องทดลองแบบโต้ตอบ",
        steps: [
            {
                title: "เลือกค่า N และ a",
                desc: "เลือกจำนวนประกอบ N และค่า a ที่เหมาะสมเพื่อเริ่มต้นอัลกอริทึม",
                circuit: ["N", "a", "gcd"],
                explanation: "Shor's Algorithm เริ่มจากการเลือกจำนวนประกอบ N ที่ต้องการแยกตัวประกอบ และเลือกค่า a ที่อยู่ในช่วง 1 < a < N จากนั้นตรวจสอบค่า gcd(a, N) ก่อน ถ้า gcd มากกว่า 1 เราจะได้ตัวประกอบของ N ทันทีโดยยังไม่ต้องเข้าสู่ขั้นตอนควอนตัม",
                labBefore: "ยังไม่ได้กำหนดโจทย์หรือค่าที่จะใช้ในอัลกอริทึม",
                labAfter: "ระบบมีค่า N และ a พร้อมสำหรับการตรวจสอบและเข้าสู่ขั้นตอนหา period",
                amplitudes: null
            },
            {
                title: "สร้าง Superposition",
                desc: "เตรียม counting register ให้แทนค่า x ได้หลายค่าในเวลาเดียวกัน",
                circuit: ["|0...0>", "H^n", "superposition"],
                explanation: "ในขั้นนี้ counting register จะถูกเตรียมให้อยู่ในสถานะ superposition ด้วยการใช้ Hadamard gates ทำให้รีจิสเตอร์สามารถแทนค่า x ได้หลายค่าพร้อมกัน นี่คือหัวใจของการคำนวณเชิงควอนตัมที่ช่วยให้เราสำรวจหลายความเป็นไปได้ในกระบวนการเดียว",
                labBefore: "counting register ยังแทนได้เพียงสถานะเริ่มต้นเดียว",
                labAfter: "counting register สามารถแทนค่า x ได้หลายค่าพร้อมกันในรูปแบบ superposition",
                amplitudes: null
            },
            {
                title: "ทำ Modular Exponentiation",
                desc: "คำนวณ a^x mod N เพื่อสร้างรูปแบบการวนซ้ำที่ซ่อน period ไว้",
                circuit: ["x", "a^x mod N", "periodicity"],
                explanation: "ขั้นนี้เป็นส่วนสำคัญของ Shor's Algorithm เพราะระบบจะเชื่อมแต่ละค่า x เข้ากับผลลัพธ์ของ a^x mod N ทำให้เกิดรูปแบบที่มีการวนซ้ำตาม period r ซึ่งเป็นข้อมูลสำคัญที่เราต้องการหาเพื่อนำไปใช้แยกตัวประกอบของ N",
                labBefore: "ระบบมีค่า x หลายค่า แต่ยังไม่เชื่อมกับโครงสร้างของฟังก์ชัน modular",
                labAfter: "สถานะของระบบเริ่มสะท้อนรูปแบบการวนซ้ำของ a^x mod N และซ่อน period ไว้ภายใน",
                amplitudes: null
            },
            {
                title: "ทำ Inverse QFT",
                desc: "แปลงรูปแบบการวนซ้ำให้กลายเป็นความน่าจะเป็นที่อ่านออกได้จากการวัด",
                circuit: ["periodicity", "QFT^-1", "peaks"],
                explanation: "Inverse Quantum Fourier Transform หรือ Inverse QFT ทำหน้าที่เปลี่ยนข้อมูลเรื่อง period ที่ซ่อนอยู่ในสถานะควอนตัม ให้กลายเป็นรูปแบบของความน่าจะเป็นที่มีจุดเด่นชัดขึ้น หลังจากขั้นนี้ค่าที่วัดได้จะเริ่มสัมพันธ์กับ period ที่ต้องการหา",
                labBefore: "period ยังซ่อนอยู่ในโครงสร้างเฟสของสถานะควอนตัม",
                labAfter: "ข้อมูลเรื่อง period ถูกแปลงให้อยู่ในรูปที่ measurement สามารถดึงออกมาได้ง่ายขึ้น",
                amplitudes: null
            },
            {
                title: "วัดรีจิสเตอร์",
                desc: "วัดรีจิสเตอร์เพื่ออ่านค่าคลาสสิกที่เกี่ยวข้องกับ period",
                circuit: ["measure", "y / Q", "s/r"],
                explanation: "เมื่อทำการวัด counting register เราจะได้ค่าคลาสสิกออกมา ซึ่งโดยทั่วไปจะสัมพันธ์กับอัตราส่วน s/r ค่านี้ยังไม่ใช่ period โดยตรง แต่เป็นเบาะแสสำคัญที่ใช้ในการประมาณค่า r ในขั้นตอนถัดไป",
                labBefore: "คำตอบยังอยู่ในรูปของสถานะควอนตัมและความน่าจะเป็น",
                labAfter: "ได้ค่าคลาสสิกที่สามารถนำไปวิเคราะห์ต่อเพื่อประมาณ period",
                amplitudes: null
            },
            {
                title: "คำนวณหาตัวประกอบ",
                desc: "ใช้ period ที่หาได้เพื่อคำนวณหาตัวประกอบของ N",
                circuit: ["r", "gcd(a^(r/2) ± 1, N)", "factors"],
                explanation: "เมื่อได้ period r ที่เหมาะสมแล้ว เราจะใช้สูตร gcd(a^(r/2)-1, N) และ gcd(a^(r/2)+1, N) เพื่อหาตัวประกอบของ N ถ้าค่า r ใช้งานได้จริง ขั้นตอนนี้จะให้ตัวประกอบที่ไม่เป็น trivial factors และทำให้เราแยก N ได้สำเร็จ",
                labBefore: "เรารู้ค่า period หรือค่าประมาณของมัน แต่ยังไม่ได้ตัวประกอบของ N",
                labAfter: "ใช้ข้อมูลจาก period เพื่อคำนวณและหาตัวประกอบของ N ได้",
                amplitudes: null
            }
        ]
    }


};

let currentAlgo = "deutsch";
let currentStep = 0;

const defaultConfig = {
    page_title: "Quantum Algorithms",
    next_step_btn: "Next",
    prev_step_btn: "Prev",
    reset_algo_btn: "Reset"
};

function highlightKetText(text) {
    return text.replace(/\|([^>]+)>/g, '<span class="explanation-ket">|$1></span>');
}

// shor control //
function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);

    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }

    return a;
}

function integerPow(base, exponent) {
    let result = 1;

    for (let i = 0; i < exponent; i++) {
        result *= base;
    }

    return result;
}

function findPeriod(a, N, maxSteps = 64) {
    let value = 1;

    for (let x = 1; x <= maxSteps; x++) {
        value = (value * a) % N;
        if (value === 1) {
            return x;
        }
    }

    return null;
}

function renderShorLab(step) {
    const panel = document.getElementById("shor-lab-panel");
    const circuitSection = document.getElementById("circuit-section");
    const isShor = currentAlgo === "shor";

    if (panel) {
        panel.style.display = isShor ? "block" : "none";
    }

    if (circuitSection) {
        circuitSection.style.display = isShor ? "none" : "block";
    }

    if (!isShor) return;

    document.getElementById("shor-lab-step-title").textContent = step.title;
    document.getElementById("shor-lab-step-body").textContent = step.explanation || step.desc || "-";
    document.getElementById("shor-lab-before").textContent = step.labBefore || "-";
    document.getElementById("shor-lab-after").textContent = step.labAfter || "-";
    document.getElementById("shor-lab-gcd").textContent = "-";
    document.getElementById("shor-lab-period").textContent = "-";
    document.getElementById("shor-lab-measurement").textContent = "-";
    document.getElementById("shor-lab-factors").textContent = "-";
    document.getElementById("shor-lab-message").textContent = `ขั้นตอนปัจจุบัน: ${step.title}`;
}

// ======== end =============


function renderStep() {
    const algo = algorithms[currentAlgo];
    const step = algo.steps[currentStep];

    document.getElementById("step-title").textContent = step.title;
    document.getElementById("step-desc").textContent = step.desc;
    document.getElementById("step-explanation").innerHTML = highlightKetText(step.explanation);
    renderShorLab(step);

    const circuitGates = document.getElementById("circuit-gates");
    circuitGates.innerHTML = "";

    //// change not render for shor 
    if (currentAlgo !== "shor") {
        step.circuit.forEach((gate, idx) => {
            const gateEl = document.createElement("div");
            gateEl.className = "circuit-gate";
            gateEl.innerHTML = `<div class="gate-box">${gate}</div>${idx < step.circuit.length - 1 ? '<div class="arrow-separator ml-3"></div>' : ""}`;
            circuitGates.appendChild(gateEl);
        });
    }

    const ampDisplay = document.getElementById("amplitude-display");
    if (step.amplitudes) {
        ampDisplay.style.display = "block";
        const ampContainer = document.getElementById("amplitudes");
        ampContainer.innerHTML = "";

        step.amplitudes.forEach((amp, idx) => {
            const prob = Math.abs(amp) * Math.abs(amp);
            const ampDiv = document.createElement("div");
            ampDiv.className = "amplitude-item";
            ampDiv.innerHTML = `
                <div class="flex justify-between items-center mb-1 amplitude-row">
                    <span class="text-xs amplitude-label">สถานะ |${idx}></span>
                    <span class="text-xs font-bold amplitude-value">${prob.toFixed(2)}</span>
                </div>
                <div class="w-full rounded-full h-2 amplitude-track">
                    <div class="amplitude-bar" style="width: ${prob * 100}%;"></div>
                </div>
            `;
            ampContainer.appendChild(ampDiv);
        });
    } else {
        ampDisplay.style.display = "none";
    }

    const progress = ((currentStep + 1) / algo.steps.length) * 100;
    document.getElementById("progress-text").textContent = `${currentStep + 1}/${algo.steps.length}`;
    document.getElementById("progress-bar").style.width = `${progress}%`;

    document.getElementById("prev-step-btn").disabled = currentStep === 0;
    document.getElementById("next-step-btn").disabled = currentStep === algo.steps.length - 1;
}

function switchAlgorithm(algoKey) {
    currentAlgo = algoKey;
    currentStep = 0;

    const algo = algorithms[currentAlgo];
    document.getElementById("algo-name").textContent = algo.name;
    document.getElementById("algo-desc").textContent = algo.desc;

    document.querySelectorAll(".algo-item").forEach((btn) => {
        btn.classList.toggle("is-active", btn.dataset.algo === algoKey);
    });

    renderStepsPanel();
    renderStep();
}

function renderStepsPanel() {
    const algo = algorithms[currentAlgo];
    const stepsList = document.getElementById("steps-list");
    stepsList.innerHTML = "";

    algo.steps.forEach((step, idx) => {
        const stepBtn = document.createElement("button");
        stepBtn.className = "step-item w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all";
        if (idx === currentStep) {
            stepBtn.classList.add("active-step");
        }

        stepBtn.textContent = `${idx + 1}. ${step.title}`;
        stepBtn.addEventListener("click", () => {
            currentStep = idx;
            renderStepsPanel();
            renderStep();
        });

        stepsList.appendChild(stepBtn);
    });
}

function runShorLabStep() {
    if (currentAlgo !== "shor") return;

    const step = algorithms[currentAlgo].steps[currentStep];
    const N = Number(document.getElementById("shor-lab-n").value);
    const a = Number(document.getElementById("shor-lab-a").value);

    let gcdValue = "-";
    let periodValue = "-";
    let measurementValue = "-";
    let factorsValue = "-";
    let beforeText = step.labBefore || "-";
    let afterText = step.labAfter || "-";
    let message = `จำลองขั้นตอน: ${step.title}`;

    if (!Number.isInteger(N) || N < 4) {
        document.getElementById("shor-lab-message").textContent = "ค่า N ต้องเป็นจำนวนเต็มที่มากกว่า 3";
        return;
    }

    if (!Number.isInteger(a) || a <= 1 || a >= N) {
        document.getElementById("shor-lab-message").textContent = "ค่า a ต้องอยู่ในช่วง 1 < a < N";
        return;
    }

    gcdValue = String(gcd(a, N));
    const period = findPeriod(a, N);

    if (currentStep === 0) {
        afterText = `เลือก N = ${N} และ a = ${a} แล้ว โดยได้ค่า gcd(a, N) = ${gcdValue}`;
    } else if (currentStep === 1) {
        afterText = `counting register ถูกมองว่าแทนค่า x ได้หลายค่าพร้อมกันสำหรับ N = ${N}`;
    } else if (currentStep === 2) {
        afterText = `รูปแบบ a^x mod N เริ่มแสดงการวนซ้ำที่สำคัญ โดยมี period เบื้องต้นเป็น ${period || "ยังไม่พบ"}`;
    } else if (currentStep === 3) {
        afterText = "Inverse QFT จะช่วยเปลี่ยนข้อมูลที่ซ่อนอยู่ให้กลายเป็นค่าที่ measurement อ่านได้ชัดขึ้น";
    } else if (currentStep === 4) {
        afterText = `การวัดให้ค่าคลาสสิกที่ใช้เป็นเบาะแสของ period ${period || "ที่ยังไม่ทราบ"}`;
    } else if (currentStep === 5) {
        afterText = `ขั้นตอนคลาสสิกกำลังใช้ period ${period || "ที่ยังไม่ทราบ"} เพื่อพยายามหาตัวประกอบของ N`;
    }

    if (currentStep >= 2 && period) {
        periodValue = String(period);
    }

    if (currentStep >= 4 && period) {
        measurementValue = `y/Q ~ s/${period}`;
    }

    if (currentStep >= 5 && period && period % 2 === 0) {
        const half = period / 2;
        const factor1 = gcd(integerPow(a, half) - 1, N);
        const factor2 = gcd(integerPow(a, half) + 1, N);

        if (factor1 !== 1 && factor1 !== N && factor2 !== 1 && factor2 !== N) {
            factorsValue = `${factor1} x ${factor2}`;
        } else {
            factorsValue = "ยังไม่พบตัวประกอบที่ใช้ได้";
        }
    }

    document.getElementById("shor-lab-before").textContent = beforeText;
    document.getElementById("shor-lab-after").textContent = afterText;
    document.getElementById("shor-lab-gcd").textContent = gcdValue;
    document.getElementById("shor-lab-period").textContent = periodValue;
    document.getElementById("shor-lab-measurement").textContent = measurementValue;
    document.getElementById("shor-lab-factors").textContent = factorsValue;
    document.getElementById("shor-lab-message").textContent = message;
}


// =================== end ====================================

document.querySelectorAll(".algo-item").forEach((btn) => {
    btn.addEventListener("click", () => switchAlgorithm(btn.dataset.algo));
});

document.getElementById("next-step-btn").addEventListener("click", () => {
    if (currentStep < algorithms[currentAlgo].steps.length - 1) {
        currentStep++;
        renderStepsPanel();
        renderStep();
    }
});

document.getElementById("prev-step-btn").addEventListener("click", () => {
    if (currentStep > 0) {
        currentStep--;
        renderStepsPanel();
        renderStep();
    }
});

document.getElementById("reset-algo-btn").addEventListener("click", () => {
    currentStep = 0;
    renderStepsPanel();
    renderStep();
});


// event listener for shor 
document.getElementById("run-shor-lab-btn").addEventListener("click", runShorLabStep);

document.getElementById("reset-shor-lab-btn").addEventListener("click", () => {
    document.getElementById("shor-lab-n").value = 35;
    document.getElementById("shor-lab-a").value = 2;
    document.getElementById("shor-lab-gcd").textContent = "-";
    document.getElementById("shor-lab-period").textContent = "-";
    document.getElementById("shor-lab-measurement").textContent = "-";
    document.getElementById("shor-lab-factors").textContent = "-";

    if (currentAlgo === "shor") {
        renderShorLab(algorithms[currentAlgo].steps[currentStep]);
    }
});


async function onConfigChange(config) {
    const c = { ...defaultConfig, ...config };
    document.getElementById("page-title").textContent = c.page_title;
    document.getElementById("next-step-btn").innerHTML = `${c.next_step_btn} <i data-lucide="chevron-right" class="w-3 h-3"></i>`;
    document.getElementById("prev-step-btn").innerHTML = `<i data-lucide="chevron-left" class="w-3 h-3"></i> ${c.prev_step_btn}`;
    document.getElementById("reset-algo-btn").innerHTML = `<i data-lucide="rotate-ccw" class="w-4 h-4"></i> ${c.reset_algo_btn}`;
    lucide.createIcons();
}

function mapToCapabilities() {
    return {
        recolorables: [],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined
    };
}

function mapToEditPanelValues(config) {
    const c = { ...defaultConfig, ...config };
    return new Map([
        ["page_title", c.page_title],
        ["next_step_btn", c.next_step_btn],
        ["prev_step_btn", c.prev_step_btn],
        ["reset_algo_btn", c.reset_algo_btn]
    ]);
}

if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
    });
}

renderStepsPanel();
renderStep();
lucide.createIcons();

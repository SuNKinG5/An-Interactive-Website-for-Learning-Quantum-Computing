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

function renderStep() {
    const algo = algorithms[currentAlgo];
    const step = algo.steps[currentStep];

    document.getElementById("step-title").textContent = step.title;
    document.getElementById("step-desc").textContent = step.desc;
    document.getElementById("step-explanation").innerHTML = highlightKetText(step.explanation);

    const circuitGates = document.getElementById("circuit-gates");
    circuitGates.innerHTML = "";

    step.circuit.forEach((gate, idx) => {
        const gateEl = document.createElement("div");
        gateEl.className = "circuit-gate";
        gateEl.innerHTML = `<div class="gate-box">${gate}</div>${idx < step.circuit.length - 1 ? '<div class="arrow-separator ml-3"></div>' : ""}`;
        circuitGates.appendChild(gateEl);
    });

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

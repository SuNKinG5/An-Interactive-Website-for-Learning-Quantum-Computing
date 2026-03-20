document.addEventListener("DOMContentLoaded", () => {
    const mobileToggleBtn = document.getElementById("mobile-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileToggleBtn && mobileMenu) {
        mobileToggleBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }

    lucide.createIcons();
});

const defaultConfig = {
    background_color: "#ffffff",
    surface_color: "#f8fbff",
    text_color: "#0f172a",
    primary_action_color: "#3b82f6",
    secondary_action_color: "#64748b",
    font_family: "Google Sans",
    font_size: 16,
    headline: "เรียนรู้ Quantum Computing แบบโต้ตอบได้",
    subheadline: "สำรวจคิวบิต เกต อัลกอริทึม และภาพประกอบควอนตัมแบบโต้ตอบได้ในประสบการณ์การเรียนรู้เดียว",
    btn_learn: "Start Learning",
    btn_sim: "Open Simulator",
    feature1_title: "ภาพประกอบแบบโต้ตอบ",
    feature2_title: "ซิมูเลเตอร์วงจรควอนตัม",
    feature3_title: "อธิบายอัลกอริทึมทีละขั้น",
    footer_text: "© 2025 QuantumLearn - สื่อการสอน บทจำลอง และเครื่องมือภาพสำหรับทำความเข้าใจ Quantum Computing"
};

async function onConfigChange(config) {
    const c = { ...defaultConfig, ...config };
    const stack = `${c.font_family || defaultConfig.font_family}, 'Google Sans', sans-serif`;

    document.getElementById("hero-headline").style.fontFamily = stack;
    document.getElementById("hero-sub").style.fontFamily = stack;
    document.getElementById("hero-sub").textContent = c.subheadline;
    document.getElementById("btn-learn").querySelector("span").textContent = c.btn_learn;
    document.getElementById("btn-sim").querySelector("span").textContent = c.btn_sim;
    document.getElementById("feat1-title").textContent = c.feature1_title;
    document.getElementById("feat2-title").textContent = c.feature2_title;
    document.getElementById("feat3-title").textContent = c.feature3_title;
    document.getElementById("footer-text").textContent = c.footer_text;
}

function mapToCapabilities(config) {
    function colorMutable(key) {
        return {
            get: () => config[key] || defaultConfig[key],
            set: (value) => {
                config[key] = value;
                window.elementSdk.setConfig({ [key]: value });
            }
        };
    }

    return {
        recolorables: [
            colorMutable("background_color"),
            colorMutable("surface_color"),
            colorMutable("text_color"),
            colorMutable("primary_action_color"),
            colorMutable("secondary_action_color")
        ],
        borderables: [],
        fontEditable: {
            get: () => config.font_family || defaultConfig.font_family,
            set: (value) => {
                config.font_family = value;
                window.elementSdk.setConfig({ font_family: value });
            }
        },
        fontSizeable: {
            get: () => config.font_size || defaultConfig.font_size,
            set: (value) => {
                config.font_size = value;
                window.elementSdk.setConfig({ font_size: value });
            }
        }
    };
}

function mapToEditPanelValues(config) {
    const c = { ...defaultConfig, ...config };
    return new Map([
        ["headline", c.headline],
        ["subheadline", c.subheadline],
        ["btn_learn", c.btn_learn],
        ["btn_sim", c.btn_sim],
        ["feature1_title", c.feature1_title],
        ["feature2_title", c.feature2_title],
        ["feature3_title", c.feature3_title],
        ["footer_text", c.footer_text]
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

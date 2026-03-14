/**
 * Quantum Learn - Application Logic
 * Handles SDK configuration, DOM updates, and user interactivity.
 */

// --- 1. Configurations ---
const defaultConfig = {
  background_color: '#ffffff',
  surface_color: '#f8fbff',
  text_color: '#0f172a',
  primary_action_color: '#3b82f6',
  secondary_action_color: '#64748b',
  font_family: 'DM Sans',
  font_size: 16,
  lesson_title: 'Understanding Qubits',
  lesson_explain: 'A qubit (quantum bit) is the fundamental unit of quantum information. Unlike classical bits that can only be 0 or 1, a qubit can exist in a superposition of both states simultaneously. This unique property is what gives quantum computers their incredible computational power.',
  next_btn: 'Next Lesson'
};

// --- 2. Element UI Updater ---
// Updates DOM elements when the configuration changes (e.g., via SDK)
async function onConfigChange(config) {
  const c = { ...defaultConfig, ...config };
  const font = c.font_family || defaultConfig.font_family;
  const base = c.font_size || defaultConfig.font_size;
  const stack = `${font}, 'DM Sans', sans-serif`;

  // Update typography and text content
  const titleEl = document.getElementById('lesson-title');
  titleEl.textContent = c.lesson_title;
  titleEl.style.fontFamily = stack;
  titleEl.style.fontSize = `${base * 1.5}px`;
  titleEl.style.color = c.text_color;

  const explainEl = document.getElementById('lesson-explanation');
  explainEl.textContent = c.lesson_explain;
  explainEl.style.fontFamily = stack;
  explainEl.style.fontSize = `${base}px`;
  explainEl.style.color = c.secondary_action_color;

  // Update Call-to-Action button
  const nextBtn = document.getElementById('next-btn');
  nextBtn.querySelector('span').textContent = c.next_btn;
  nextBtn.style.background = c.primary_action_color;
  nextBtn.style.fontFamily = stack;
  nextBtn.style.fontSize = `${base * 0.875}px`;

  // Update Headings
  document.querySelectorAll('h2').forEach(h => {
    h.style.fontFamily = stack;
    h.style.fontSize = `${base * 1.125}px`;
    h.style.color = c.text_color;
  });

  // Update Sidebar and Navigation Fonts
  document.getElementById('sidebar').style.background = c.surface_color;
  document.querySelectorAll('#sidebar button').forEach(btn => {
    btn.style.fontFamily = stack;
    btn.style.fontSize = `${base * 0.875}px`;
  });

  // Update Backgrounds
  document.querySelector('header').style.background = c.background_color;
  document.getElementById('app-wrapper').style.background = c.background_color;

  // Update Text Colors
  document.querySelectorAll('label, .text-xs, .text-sm').forEach(el => {
    // Check computed styles or specific string matches to safely replace muted colors
    if (el.style.color === 'rgb(148, 163, 184)' || el.style.color === '#94a3b8') {
      el.style.color = c.secondary_action_color;
    }
  });

  // Update Slider Accent
  document.getElementById('prob-slider').style.accentColor = c.primary_action_color;
}

// --- 3. SDK Mappings ---
function mapToCapabilities(config) {
  const c = { ...defaultConfig, ...config };

  function colorMutable(key) {
    return {
      get: () => config[key] || defaultConfig[key],
      set: (v) => { config[key] = v; window.elementSdk.setConfig({ [key]: v }); }
    };
  }

  return {
    recolorables: [
      colorMutable('background_color'),
      colorMutable('surface_color'),
      colorMutable('text_color'),
      colorMutable('primary_action_color'),
      colorMutable('secondary_action_color')
    ],
    borderables: [],
    fontEditable: {
      get: () => config.font_family || defaultConfig.font_family,
      set: (v) => { config.font_family = v; window.elementSdk.setConfig({ font_family: v }); }
    },
    fontSizeable: {
      get: () => config.font_size || defaultConfig.font_size,
      set: (v) => { config.font_size = v; window.elementSdk.setConfig({ font_size: v }); }
    }
  };
}

function mapToEditPanelValues(config) {
  const c = { ...defaultConfig, ...config };
  return new Map([
    ['lesson_title', c.lesson_title],
    ['lesson_explain', c.lesson_explain],
    ['next_btn', c.next_btn]
  ]);
}

// Initialize SDK if available
if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities,
    mapToEditPanelValues
  });
}

// --- 4. Interactive Functions ---

/**
 * Updates the probability states based on slider input
 * @param {number|string} value - Slider value (0-100)
 */
function updateProbability(value) {
  const prob0 = parseInt(value, 10);
  const prob1 = 100 - prob0;

  document.getElementById('prob-0').textContent = `${prob0}%`;
  document.getElementById('state-0').textContent = `${prob0}%`;
  document.getElementById('state-1').textContent = `${prob1}%`;
}

/**
 * Handles visual state switching for the sidebar navigation
 * @param {HTMLElement} btn - The clicked button element
 */
function switchLesson(btn) {
  // Remove active state from all buttons
  document.querySelectorAll('#sidebar button').forEach(b => {
    b.classList.remove('nav-item-active');
    b.style.background = 'transparent';
    b.style.color = '#64748b'; // Muted text color
  });

  // Apply active state to the clicked button
  btn.classList.add('nav-item-active');
  btn.style.background = '#eff6ff'; // Active background
  btn.style.color = '#3b82f6';      // Active text color
}

// --- 5. Initialization ---
// Render Lucide icons on page load
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
});
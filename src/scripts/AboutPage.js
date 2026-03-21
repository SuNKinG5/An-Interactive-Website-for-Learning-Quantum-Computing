// ข้อมูลการตั้งค่าเนื้อหาภาษาไทย
const defaultConfig = {
  page_title: 'แพลตฟอร์มการเรียนรู้ควอนตัม',
  about_heading: 'เกี่ยวกับแพลตฟอร์มของเรา',
  mission_heading: 'พันธกิจของเรา',
  mission_text: 'เพื่อกระจายความรู้ด้านควอนตัมคอมพิวติ้งผ่านประสบการณ์การเรียนรู้ที่ตอบโต้ได้ เห็นภาพ และเข้าใจง่าย เราเชื่อว่าทุกคนควรเข้าถึงควอนตัมคอมพิวติ้งได้ – ตั้งแต่นักเรียนที่กำลังค้นหาความสนใจ ไปจนถึงมืออาชีพที่กำลังสร้างแอปพลิเคชันควอนตัมแห่งอนาคต',
  features_heading: 'สิ่งที่เรามอบให้'
};

// Element SDK Initialization
async function onConfigChange(config) {
  const c = { ...defaultConfig, ...config };
  
  // อัปเดตเนื้อหาลงใน DOM
  document.getElementById('page-title').textContent = c.page_title;
  document.getElementById('about-heading').textContent = c.about_heading;
  document.getElementById('mission-heading').textContent = c.mission_heading;
  document.getElementById('mission-text').textContent = c.mission_text;
  document.getElementById('features-heading').textContent = c.features_heading;
  
  // สร้างไอคอนใหม่ทุกครั้งที่อัปเดต
  lucide.createIcons();
}

function mapToCapabilities(config) {
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
    ['page_title', c.page_title],
    ['about_heading', c.about_heading],
    ['mission_heading', c.mission_heading],
    ['mission_text', c.mission_text],
    ['features_heading', c.features_heading]
  ]);
}

// ตรวจสอบว่ามี elementSdk โหลดเข้ามาหรือยัง ก่อนที่จะเรียกใช้งาน
if (window.elementSdk) {
  window.elementSdk.init({ 
    defaultConfig, 
    onConfigChange, 
    mapToCapabilities, 
    mapToEditPanelValues 
  });
}

// โหลดไอคอนตอนเริ่มต้น
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
});
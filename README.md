# เว็บไซต์แบบโต้ตอบสำหรับการเรียนรู้ Quantum Computing

โปรเจกต์นี้เป็นเว็บไซต์เพื่อการเรียนรู้ Quantum Computing ในรูปแบบที่เข้าใจง่ายขึ้น ผ่านการอธิบายเชิงภาพ การสรุปแนวคิดแบบเป็นขั้นตอน และหน้าจอแบบโต้ตอบที่ช่วยให้ผู้ใช้เห็นภาพของแนวคิดควอนตัมได้ชัดเจนมากขึ้น

## ภาพรวมของโปรเจกต์

เว็บไซต์นี้ถูกออกแบบมาเพื่อช่วยให้ผู้เรียน โดยเฉพาะผู้เริ่มต้น สามารถทำความเข้าใจหัวข้อสำคัญของ Quantum Computing ได้ง่ายขึ้น ไม่ว่าจะเป็นสถานะของคิวบิต อัลกอริทึมควอนตัม การ teleportation และการมองภาพผ่าน Bloch Sphere

โปรเจกต์นี้พัฒนาเป็นเว็บแบบ front-end โดยใช้ HTML, CSS และ JavaScript และใช้ `three.js` สำหรับส่วนที่เกี่ยวข้องกับการแสดงผลแบบ 3 มิติ

## ความสามารถหลักของเว็บไซต์

- หน้าแรกสำหรับนำทางไปยังส่วนต่าง ๆ ของเว็บไซต์
- หน้าสำหรับเรียนรู้แนวคิดพื้นฐานของ Quantum Computing
- หน้าสำหรับเรียนรู้ Quantum Algorithms แบบเป็นขั้นตอน
- หน้าสำหรับแสดงผล Bloch Sphere แบบ 3 มิติ
- หน้าสำหรับฝึกฝนและทบทวนความเข้าใจ
- โครงสร้างสำหรับหน้าจำลองหรือการทดลองเชิงโต้ตอบ
- การแยก JavaScript และ CSS ตามแต่ละหน้าเพื่อให้ง่ายต่อการพัฒนาและดูแล

## อัลกอริทึมที่มีในโปรเจกต์

ในหน้า `Algorithms Page` ปัจจุบันมีการอธิบายอัลกอริทึมหลัก เช่น

- Deutsch Algorithm
- Grover's Algorithm
- Quantum Teleportation
- Shor's Algorithm

## เทคโนโลยีที่ใช้

- HTML5
- CSS3
- JavaScript (ES Modules)
- Vite
- Three.js

## โครงสร้างโปรเจกต์

```text
.
|-- index.html
|-- package.json
|-- vite.config.js
|-- pages/
|   |-- AboutPage.html
|   |-- AlgorithmsPage.html
|   |-- BlochSphere.html
|   |-- LearnPage.html
|   |-- PracticePage.html
|   `-- SimulatorPage.html
`-- src/
    |-- lib/
    |   `-- quantum/
    |       |-- BlochSphere.js
    |       |-- GridFactory.js
    |       |-- QuantumEngine.js
    |       `-- RendererFactory.js
    |-- scripts/
    |   |-- AboutPage.js
    |   |-- AlgorithmsPage.js
    |   |-- BlochSphere.js
    |   |-- Index.js
    |   |-- LearnPage.js
    |   |-- Lessons.js
    |   |-- PracticePage.js
    |   |-- Questions.js
    |   `-- SimulatorPage.js
    `-- styles/
        |-- AboutPage.css
        |-- AlgorithmsPage.css
        |-- BlochSphere.css
        |-- Index.css
        |-- LearnPage.css
        |-- PracticePage.css
        `-- SimulatorPage.css
```

## วิธีใช้งานโปรเจกต์

### 1. ติดตั้ง dependencies

```bash
npm install
```

### 2. รันโปรเจกต์ในโหมดพัฒนา

```bash
npm run dev
```

### 3. build โปรเจกต์สำหรับใช้งานจริง

```bash
npm run build
```

### 4. preview ไฟล์ที่ build แล้ว

```bash
npm run preview
```

## คำอธิบายหน้าหลักภายในเว็บไซต์

### `index.html`

หน้าเริ่มต้นของเว็บไซต์ ใช้สำหรับนำทางไปยังส่วนต่าง ๆ ของระบบ

### `pages/LearnPage.html`

หน้าสำหรับเรียนรู้แนวคิดพื้นฐานของ Quantum Computing

### `pages/AlgorithmsPage.html`

หน้าสำหรับอธิบายอัลกอริทึมควอนตัมแบบเป็นขั้นตอน พร้อมคำอธิบายและตัวอย่างประกอบ

### `pages/BlochSphere.html`

หน้าสำหรับแสดง Bloch Sphere เพื่อช่วยให้ผู้เรียนเข้าใจสถานะของคิวบิตในมุมมอง 3 มิติ

### `pages/PracticePage.html`

หน้าสำหรับฝึกทำแบบฝึกหัดหรือทบทวนความเข้าใจ

### `pages/SimulatorPage.html`

หน้าที่เตรียมไว้สำหรับส่วนจำลองหรือทดลองการทำงานเชิงโต้ตอบ

## จุดประสงค์ของโปรเจกต์

โปรเจกต์นี้มีเป้าหมายเพื่อทำให้ Quantum Computing เข้าถึงง่ายขึ้น โดยเฉพาะสำหรับผู้ที่เพิ่งเริ่มศึกษา ผ่านแนวทางดังนี้

- อธิบายแนวคิดที่ซับซ้อนให้อยู่ในรูปแบบที่เข้าใจง่าย
- ใช้ภาพและองค์ประกอบเชิงโต้ตอบช่วยในการเรียนรู้
- แสดงลำดับขั้นของอัลกอริทึมแบบเป็นขั้นตอน
- ช่วยให้ผู้เรียนสามารถเชื่อมโยงระหว่างทฤษฎีกับภาพที่มองเห็นได้

## แนวทางพัฒนาต่อในอนาคต

- เพิ่ม simulator ที่โต้ตอบได้มากขึ้น
- เพิ่มแบบฝึกหัดและระบบตรวจคำตอบ
- ปรับปรุงการแสดงผลของ quantum circuit ให้ชัดเจนขึ้น
- เพิ่มหัวข้อควอนตัมที่ลึกขึ้น
- ปรับ responsive design ให้รองรับหน้าจอหลากหลายขนาดมากขึ้น

## หมายเหตุ

- โปรเจกต์นี้เป็นเว็บฝั่ง client-side เป็นหลัก
- โค้ดแยกตามหน้าโดยใช้ JavaScript และ CSS เฉพาะแต่ละส่วน
- `three.js` ถูกใช้สำหรับส่วนแสดงผลเชิงภาพ เช่น Bloch Sphere

## การใช้งาน

โปรเจกต์นี้เหมาะสำหรับใช้ในการเรียน การสาธิต หรือพัฒนาเป็นสื่อการสอนเกี่ยวกับ Quantum Computing ต่อไป

## License

โปรเจกต์นี้มีจุดประสงค์เพื่อการศึกษา เว้นแต่เจ้าของโปรเจกต์จะระบุไว้เป็นอย่างอื่น

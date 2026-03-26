const algorithms = {
    deutsch: {
        name: "Deutsch Algorithm",
        desc: "ตรวจสอบว่าฟังก์ชันเป็น constant หรือ balanced",
        steps: [
            {
                title: "ทำความเข้าใจเป้าหมาย",
                desc: "ตรวจสอบว่าฟังก์ชันเป็น constant หรือ balanced",
                circuit: ["f(0)", "f(1)", "?"],
                explanation: "Deutsch Algorithm ใช้แก้ปัญหาว่า ฟังก์ชัน f(x) ที่รับอินพุตเป็น 0 หรือ 1 นั้นเป็นฟังก์ชันแบบ constant หรือ balanced ถ้า f(0) และ f(1) ให้ผลเหมือนกัน ฟังก์ชันจะเป็น constant แต่ถ้าให้ผลต่างกัน ฟังก์ชันจะเป็น balanced จุดสำคัญคืออัลกอริทึมนี้พยายามหาคำตอบด้วยการเรียก oracle เพียงครั้งเดียว",
                example: "ถ้า f(0)=0 และ f(1)=0 ฟังก์ชันนี้เป็น <strong>constant</strong> แต่ถ้า f(0)=0 และ f(1)=1 ฟังก์ชันนี้เป็น <strong>balanced</strong>",
                amplitudes: null
            },
            {
                title: "เตรียมสถานะเริ่มต้น",
                desc: "กำหนดคิวบิตให้อยู่ในสถานะ |0>|1>",
                circuit: ["|0>", "|1>"],
                explanation: "อัลกอริทึมเริ่มจากคิวบิต 2 ตัวในสถานะ |0>|1> โดยคิวบิตตัวแรกใช้แทนอินพุต x และคิวบิตตัวที่สองใช้ช่วยให้ oracle ส่งข้อมูลของฟังก์ชันกลับมาในรูปแบบ phase การตั้งคิวบิตตัวที่สองเป็น |1> มีความสำคัญต่อการเกิด phase kickback ในขั้นตอนต่อไป",
                example: "ก่อนผ่าน gate ใด ๆ ระบบยังอยู่ในสถานะเริ่มต้นธรรมดา คือคิวบิตตัวแรกเป็น <strong>|0></strong> และคิวบิตตัวที่สองเป็น <strong>|1></strong>",
                amplitudes: null
            },
            {
                title: "สร้าง Superposition",
                desc: "ใส่ Hadamard gate กับคิวบิตทั้งสอง",
                circuit: ["H", "H"],
                explanation: "เมื่อใส่ Hadamard gate กับคิวบิตทั้งสอง ระบบจะเปลี่ยนจากสถานะพื้นฐานไปเป็น superposition ทำให้คิวบิตตัวแรกสามารถแทนทั้งอินพุต 0 และ 1 พร้อมกันได้ ส่วนคิวบิตตัวที่สองจะอยู่ในรูปแบบที่พร้อมให้ข้อมูลของฟังก์ชันถูกเข้ารหัสเป็น phase",
                example: "เดิมทีถ้าเราคิดแบบ classical เราต้องลอง input ทีละค่า แต่หลังใส่ Hadamard คิวบิตตัวแรกจะพร้อมแทนทั้งกรณี <strong>0</strong> และ <strong>1</strong> ในการคำนวณเดียว",
                amplitudes: null
            },
            {
                title: "ผ่าน Quantum Oracle",
                desc: "ให้ Uf เข้ารหัสข้อมูลของฟังก์ชันลงใน phase",
                circuit: ["U_f"],
                explanation: "oracle Uf ทำงานตามกฎ |x>|y> -> |x>|y⊕f(x)> แม้จะดูเหมือน oracle เปลี่ยนเฉพาะคิวบิตตัวที่สอง แต่เมื่อคิวบิตตัวที่สองอยู่ในสถานะที่เหมาะสม ผลของ f(x) จะถูกสะท้อนกลับไปเป็น phase ของคิวบิตตัวแรก ปรากฏการณ์นี้เรียกว่า phase kickback และเป็นหัวใจสำคัญของ Deutsch Algorithm",
                example: "ถ้าเลือกฟังก์ชัน balanced เช่น f(0)=0 และ f(1)=1 phase ที่เกิดขึ้นหลังผ่าน <strong>U_f</strong> จะต่างจากกรณี constant อย่าง f(0)=0 และ f(1)=0",
                amplitudes: null
            },
            {
                title: "แปลง Phase ให้เป็นคำตอบ",
                desc: "ใส่ Hadamard ที่คิวบิตตัวแรกอีกครั้ง",
                circuit: ["H"],
                explanation: "หลังจากผ่าน oracle แล้ว ข้อมูลสำคัญของฟังก์ชันยังไม่ออกมาเป็นผลลัพธ์ตรง ๆ แต่ซ่อนอยู่ใน relative phase ของคิวบิตตัวแรก การใส่ Hadamard อีกครั้งจะเปลี่ยน phase ที่ซ่อนอยู่นี้ให้กลายเป็นผลลัพธ์ที่พร้อมสำหรับการวัด",
                example: "ถ้าฟังก์ชันเป็น constant ระบบจะถูกรวมให้เอนเอียงไปทางผลลัพธ์ <strong>|0></strong> แต่ถ้าฟังก์ชันเป็น balanced ระบบจะเอนเอียงไปทาง <strong>|1></strong>",
                amplitudes: null
            },
            {
                title: "วัดผลลัพธ์",
                desc: "วัดคิวบิตตัวแรกเพื่อสรุปชนิดของฟังก์ชัน",
                circuit: ["Measure"],
                explanation: "ในขั้นตอนสุดท้าย เราวัดคิวบิตตัวแรก ถ้าวัดได้ 0 แสดงว่าฟังก์ชันเป็น constant แต่ถ้าวัดได้ 1 แสดงว่าฟังก์ชันเป็น balanced จุดเด่นของ Deutsch Algorithm คือสามารถใช้การเรียก oracle เพียงครั้งเดียวเพื่อแยกสองกรณีนี้ออกจากกันได้",
                example: "ถ้า oracle เป็นฟังก์ชันที่ให้ค่าเหมือนกันทั้งสองอินพุต เราจะอ่านผลวัดได้เป็น <strong>0</strong> แต่ถ้าให้ค่าต่างกันระหว่างสองอินพุต เราจะได้ผลวัดเป็น <strong>1</strong>",
                amplitudes: null
            }
        ]
    },
    grover: {
        name: "Grover Search",
        desc: "ค้นหาคำตอบที่ถูกทำเครื่องหมายไว้จากข้อมูลที่ไม่เรียงลำดับ",
        steps: [
            {
                title: "ทำความเข้าใจเป้าหมาย",
                desc: "ค้นหาคำตอบที่ถูกทำเครื่องหมายไว้จากข้อมูลที่ไม่เรียงลำดับ",
                circuit: ["N states", "marked", "?"],
                explanation: "Grover's Algorithm ใช้สำหรับค้นหาสถานะหรือคำตอบที่ต้องการจากชุดข้อมูลที่ไม่มีโครงสร้าง เช่น การหาค่าที่ตรงเงื่อนไขจากรายการจำนวนมาก จุดเด่นคือช่วยลดจำนวนขั้นตอนลงจากระดับ N เหลือประมาณรากที่สองของ N จึงเป็นการเร่งความเร็วแบบ quadratic speedup",
                example: "ถ้ามีข้อมูล 16 ค่าและมีคำตอบถูกต้องอยู่เพียง 1 ค่า วิธี classical อาจต้องลองหลายครั้ง แต่ Grover ใช้จำนวนรอบประมาณ <strong>sqrt(16) = 4</strong> เพื่อเพิ่มโอกาสเจอคำตอบได้มากขึ้น",
                amplitudes: null
            },
            {
                title: "เตรียมสถานะเริ่มต้น",
                desc: "สร้าง superposition ให้ทุกสถานะเริ่มต้นอย่างเท่าเทียมกัน",
                circuit: ["H", "H", "H"],
                explanation: "เริ่มต้นด้วยการใส่ Hadamard gate ให้กับทุกคิวบิต เพื่อสร้าง uniform superposition ทำให้ทุกสถานะที่เป็นไปได้มี amplitude เริ่มต้นเท่ากัน ระบบจึงเหมือนกำลังพิจารณาคำตอบทุกตัวพร้อมกันตั้งแต่ต้น",
                example: "ถ้ามี 2 คิวบิต ระบบจะมี 4 สถานะคือ <strong>|00></strong>, <strong>|01></strong>, <strong>|10></strong> และ <strong>|11></strong> ซึ่งหลังใส่ Hadamard ทุกสถานะจะมีโอกาสเริ่มต้นเท่า ๆ กัน",
                amplitudes: [0.25, 0.25, 0.25, 0.25]
            },
            {
                title: "ทำเครื่องหมายด้วย Oracle",
                desc: "ระบุสถานะเป้าหมายด้วยการกลับ phase",
                circuit: ["Oracle"],
                explanation: "Oracle เป็นส่วนที่ใช้ระบุคำตอบที่ต้องการ โดยจะกลับเครื่องหมายของ amplitude ของสถานะเป้าหมาย หรือเรียกว่า phase flip แม้ขั้นตอนนี้ยังไม่เพิ่มโอกาสในการวัดเจอคำตอบทันที แต่เป็นการเตรียมเงื่อนไขสำคัญสำหรับการขยาย amplitude ในขั้นถัดไป",
                example: "ถ้าคำตอบเป้าหมายคือ <strong>|11></strong> oracle จะเปลี่ยน amplitude ของสถานะนี้ให้ติดลบ ขณะที่สถานะอื่นยังคงเดิม",
                amplitudes: [-0.3, 0.2, 0.2, 0.2]
            },
            {
                title: "ขยาย Amplitude",
                desc: "ใช้ diffusion operator เพื่อเพิ่มโอกาสของคำตอบที่ถูกต้อง",
                circuit: ["Diffuse"],
                explanation: "Diffusion operator จะสะท้อนค่า amplitude ของทุกสถานะรอบค่าเฉลี่ยของระบบ ส่งผลให้ amplitude ของสถานะที่ถูก oracle ทำเครื่องหมายไว้เพิ่มขึ้น ขณะที่ amplitude ของสถานะอื่นลดลง กระบวนการนี้คือหัวใจของ amplitude amplification ใน Grover's Algorithm",
                example: "หลังจาก oracle กลับ phase ของสถานะเป้าหมาย diffusion operator จะใช้การแทรกสอดเพื่อดัน amplitude ของสถานะนั้นให้สูงขึ้นกว่าสถานะอื่น",
                amplitudes: [0.05, 0.15, 0.15, 0.65]
            },
            {
                title: "ทำซ้ำ Grover Iteration",
                desc: "สลับทำ Oracle และ Diffusion หลายรอบอย่างพอดี",
                circuit: ["Oracle", "Diffuse", "Repeat"],
                explanation: "หนึ่งรอบของ Grover Iteration ประกอบด้วย oracle และ diffusion operator เมื่อนำมาทำซ้ำหลายครั้ง amplitude ของสถานะเป้าหมายจะเพิ่มขึ้นเรื่อย ๆ จำนวนรอบที่เหมาะสมสำหรับกรณีมีคำตอบเดียวจะอยู่ประมาณ sqrt(N) หากทำมากหรือน้อยเกินไป ความน่าจะเป็นที่จะวัดเจอคำตอบอาจลดลงได้",
                example: "ถ้ามีข้อมูล 16 สถานะและมีคำตอบเดียว จำนวนรอบที่เหมาะสมจะอยู่ประมาณ <strong>4 รอบ</strong> เพื่อให้โอกาสเจอคำตอบสูงที่สุด",
                amplitudes: [0.02, 0.08, 0.08, 0.82]
            },
            {
                title: "วัดผลลัพธ์",
                desc: "อ่านคำตอบจากสถานะที่ถูกขยาย amplitude แล้ว",
                circuit: ["Measure"],
                explanation: "เมื่อทำ Grover Iteration ครบจำนวนรอบที่เหมาะสมแล้ว เราจึงวัดรีจิสเตอร์ของคิวบิต เนื่องจาก amplitude ของสถานะเป้าหมายถูกขยายขึ้นมาก การวัดจึงมีโอกาสสูงที่จะได้คำตอบที่ถูกต้อง",
                example: "ถ้าสถานะ <strong>|11></strong> เป็นคำตอบเป้าหมาย หลังทำ iteration ครบแล้ว การวัดจะมีโอกาสสูงมากที่จะได้ผลเป็น <strong>|11></strong>",
                amplitudes: [0.02, 0.02, 0.02, 0.94]
            }
        ]
    },
    teleport: {
        name: "Quantum Teleportation",
        desc: "ส่งสถานะควอนตัมจาก Alice ไปยัง Bob",
        steps: [
            {
                title: "ทำความเข้าใจเป้าหมาย",
                desc: "ส่งสถานะควอนตัมจาก Alice ไปยัง Bob",
                circuit: ["Q", "A-B entangled", "2 classical bits"],
                explanation: "Quantum teleportation เป็นโปรโตคอลที่ใช้ส่งข้อมูลควอนตัมจาก Alice ไปยัง Bob โดยไม่ต้องส่งคิวบิตต้นฉบับผ่านช่องทางควอนตัมโดยตรง สิ่งที่ถูกส่งคือสถานะควอนตัมของคิวบิต ไม่ใช่วัตถุหรือสสาร และการทำงานนี้ต้องอาศัยทั้งคู่คิวบิตที่พัวพันกันและข้อมูลคลาสสิก 2 บิต",
                example: "Alice มีคิวบิต Q ที่อยู่ในสถานะไม่ทราบค่า และต้องการให้ Bob ได้คิวบิตที่มีสถานะเดียวกันราวกับว่า Alice ส่ง Q ไปให้โดยตรง",
                amplitudes: null
            },
            {
                title: "เตรียม Bell Pair",
                desc: "สร้างคู่คิวบิตพัวพันที่ Alice และ Bob แชร์ร่วมกัน",
                circuit: ["H", "CNOT", "|Phi+>"],
                explanation: "ก่อนเริ่มโปรโตคอล Alice และ Bob ต้องมีคู่คิวบิตที่อยู่ในสถานะพัวพันร่วมกัน โดย Alice ถือคิวบิต A และ Bob ถือคิวบิต B สถานะนี้มักเขียนเป็น |Phi+> และเป็นทรัพยากรสำคัญที่ทำให้การ teleportation เกิดขึ้นได้",
                example: "Alice กับ Bob สามารถเตรียมคู่คิวบิตพัวพันไว้ล่วงหน้า แล้วแยกย้ายกันถือคนละตัวก่อนเริ่มส่งสถานะจริง",
                amplitudes: null
            },
            {
                title: "เชื่อม Q เข้ากับระบบ",
                desc: "ใช้ CNOT และ Hadamard กับคิวบิตฝั่ง Alice",
                circuit: ["CNOT", "H"],
                explanation: "Alice นำคิวบิต Q ที่ต้องการส่งมาทำงานร่วมกับคิวบิต A ของตนเอง โดยใช้ CNOT ก่อน แล้วตามด้วย Hadamard ที่คิวบิต Q ขั้นตอนนี้ทำให้ข้อมูลของสถานะ Q ถูกกระจายเข้าไปในระบบรวมของ Q, A และ B เพื่อเตรียมพร้อมสำหรับการวัด",
                example: "หลังจากทำสอง gate นี้ ข้อมูลของสถานะ Q จะไม่อยู่แบบอ่านตรง ๆ ที่คิวบิตเดิมอีกต่อไป แต่ถูกเข้ารหัสไว้ในโครงสร้างของระบบรวม",
                amplitudes: null
            },
            {
                title: "วัดคิวบิตของ Alice",
                desc: "วัด Q และ A เพื่อให้ได้ข้อมูลคลาสสิก 2 บิต",
                circuit: ["Measure Q", "Measure A"],
                explanation: "Alice วัดคิวบิต Q และ A ใน standard basis แล้วจะได้ผลลัพธ์เป็นบิตคลาสสิก 2 บิต ขั้นตอนนี้สำคัญมาก เพราะหลังการวัด Alice จะไม่ได้ถือสถานะเดิมของ Q อีกต่อไป ซึ่งสอดคล้องกับหลัก no-cloning theorem ว่าเราไม่สามารถคัดลอกสถานะควอนตัมได้",
                example: "ผลการวัดอาจออกมาเป็น 00, 01, 10 หรือ 11 โดยแต่ละกรณีมีโอกาสเกิดเท่ากัน",
                amplitudes: null
            },
            {
                title: "ส่งข้อมูลคลาสสิกให้ Bob",
                desc: "Alice ส่งผลวัด 2 บิตไปยัง Bob",
                circuit: ["a", "b", "classical"],
                explanation: "หลังจากวัดแล้ว Alice จะส่งผลลัพธ์ 2 บิตไปให้ Bob ผ่านช่องทางคลาสสิก ข้อมูลนี้ไม่ได้บอกสถานะควอนตัมทั้งหมดโดยลำพัง แต่เป็นข้อมูลที่ Bob ต้องใช้ร่วมกับคิวบิตพัวพันที่ถืออยู่เพื่อกู้คืนสถานะเดิม",
                example: "ถ้า Alice วัดได้ 10 เธอก็เพียงส่งบิต 1 และ 0 ไปให้ Bob ผ่านการสื่อสารแบบปกติ",
                amplitudes: null
            },
            {
                title: "Bob กู้คืนสถานะ",
                desc: "ใช้ X และ Z ตามค่าบิตที่ได้รับ",
                circuit: ["X/Z correction"],
                explanation: "เมื่อ Bob ได้บิต 2 บิตจาก Alice แล้ว เขาจะเลือกทำ operation ที่เหมาะสมกับคิวบิต B ของตน ถ้าได้ผลบางแบบ Bob อาจไม่ต้องทำอะไรเลย แต่ในกรณีอื่นจะต้องใช้ X, Z หรือ ZX เพื่อเปลี่ยนคิวบิต B ให้กลับมาอยู่ในสถานะเดียวกับ Q เดิม",
                example: "ถ้าผลวัดเป็น 00 Bob ทำ I, ถ้าเป็น 01 ทำ Z, ถ้าเป็น 10 ทำ X, และถ้าเป็น 11 ทำ ZX",
                amplitudes: null
            },
            {
                title: "ได้สถานะเดิมที่ Bob",
                desc: "คิวบิตของ Bob กลายเป็นสถานะเดิมของ Q",
                circuit: ["B = original state"],
                explanation: "หลังจาก Bob ทำ correction เสร็จ คิวบิต B จะอยู่ในสถานะเดียวกับคิวบิต Q ตอนเริ่มต้น รวมถึงความสัมพันธ์กับระบบอื่นถ้า Q เคย entangled อยู่ด้วย ในขณะเดียวกัน Alice จะไม่เหลือสถานะเดิมนั้นอีกแล้ว และคู่ entanglement ที่ใช้ก็ถือว่าถูกใช้หมดไปในกระบวนการนี้",
                example: "ผลสุดท้ายคือ Bob ได้สถานะของ Q อย่างสมบูรณ์ แต่ไม่ได้มีการสร้างสำเนาของ Q ขึ้นมาสองชุด",
                amplitudes: null
            }
        ]
    },
    shor: {
        name: "Shor Algorithm",
        desc: "เรียนรู้การหา period และการแยกตัวประกอบผ่านห้องทดลองแบบโต้ตอบ",
        steps: [
            {
                title: "เลือกค่า N และ a",
                desc: "เลือกจำนวนประกอบ N และค่า a ที่เหมาะสมเพื่อเริ่มต้นอัลกอริทึม",
                circuit: ["N", "a", "gcd"],
                explanation: "Shor's Algorithm เริ่มจากการเลือกจำนวนประกอบ N ที่ต้องการแยกตัวประกอบ และเลือกค่า a ที่อยู่ในช่วง 1 < a < N จากนั้นตรวจสอบค่า ห.ร.ม.(a, N) ก่อน ถ้า ห.ร.ม. มากกว่า 1 เราจะได้ตัวประกอบของ N ทันทีโดยยังไม่ต้องเข้าสู่ขั้นตอนควอนตัม",
                labBefore: "ยังไม่ได้กำหนดโจทย์หรือค่าที่จะใช้ในอัลกอริทึม",
                labAfter: "ระบบมีค่า N และ a พร้อมสำหรับการตรวจสอบและเข้าสู่ขั้นตอนหา period",
                amplitudes: null
            },
            {
                title: "สร้าง Superposition",
                desc: "เตรียม counting register ให้แทนค่า x ได้หลายค่าในเวลาเดียวกัน",
                circuit: ["|0...0>", "H^n", "superposition"],
                explanation: "ในขั้นตอนนี้ counting register จะถูกเตรียมให้อยู่ในสถานะ superposition ด้วยการใช้ Hadamard gates ทำให้รีจิสเตอร์สามารถแทนค่า x ได้หลายค่าพร้อมกัน นี่คือหัวใจของการคำนวณเชิงควอนตัมที่ช่วยให้เราสำรวจหลายความเป็นไปได้ในกระบวนการเดียว",
                labBefore: "counting register ยังแทนได้เพียงสถานะเริ่มต้นเดียว",
                labAfter: "counting register สามารถแทนค่า x ได้หลายค่าพร้อมกันในรูปแบบ superposition",
                amplitudes: null
            },
            {
                title: "ทำ Modular Exponentiation",
                desc: "คำนวณ a^x mod N เพื่อสร้างรูปแบบการวนซ้ำที่ซ่อน period ไว้",
                circuit: ["x", "a^x mod N", "periodicity"],
                explanation: "ขั้นตอนนี้เป็นส่วนสำคัญของ Shor's Algorithm เพราะระบบจะเชื่อมแต่ละค่า x เข้ากับผลลัพธ์ของ a<sup>x</sup> mod N ทำให้เกิดรูปแบบที่มีการวนซ้ำตาม period r ซึ่งเป็นข้อมูลสำคัญที่เราต้องการหาเพื่อนำไปใช้แยกตัวประกอบของ N",
                labBefore: "ระบบมีค่า x หลายค่า แต่ยังไม่เชื่อมกับโครงสร้างของฟังก์ชัน modular",
                labAfter: "สถานะของระบบเริ่มสะท้อนรูปแบบการวนซ้ำของ a<sup>x</sup> mod N และซ่อน period ไว้ภายใน",
                amplitudes: null
            },
            {
                title: "ทำ Inverse QFT",
                desc: "แปลงรูปแบบการวนซ้ำให้กลายเป็นค่าที่อ่านออกได้จากการวัด",
                circuit: ["periodicity", "QFT^-1", "peaks"],
                explanation: "Inverse Quantum Fourier Transform จะเปลี่ยนข้อมูลเรื่อง period ที่ซ่อนอยู่ในสถานะควอนตัม ให้กลายเป็นรูปแบบของความน่าจะเป็นที่มีจุดเด่นชัดขึ้น หลังจากขั้นตอนนี้ค่าที่วัดได้จะเริ่มสัมพันธ์กับ period ที่ต้องการหา",
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
                circuit: ["r", "gcd(a^(r/2) +/- 1, N)", "factors"],
                explanation: "เมื่อได้ period r ที่เหมาะสมแล้ว เราจะใช้สูตร ห.ร.ม.(a<sup>r/2</sup>+1, N) และ ห.ร.ม.(a<sup>r/2</sup>+1, N) เพื่อหาตัวประกอบของ N ถ้าค่า r ใช้งานได้จริง ขั้นตอนนี้จะให้ตัวประกอบที่ไม่เป็น trivial factors และทำให้เราแยก N ได้สำเร็จ",
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
    // document.getElementById("shor-lab-step-body").textContent = step.explanation || step.desc || "-";
    document.getElementById("shor-lab-step-body").innerHTML = highlightKetText(step.explanation || step.desc || "-");
    document.getElementById("shor-lab-before").textContent = step.labBefore || "-";
    document.getElementById("shor-lab-after").textContent = step.labAfter || "-";
    document.getElementById("shor-lab-gcd").textContent = "-";
    document.getElementById("shor-lab-period").textContent = "-";
    // document.getElementById("shor-lab-measurement").textContent = "-";
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
    const exampleEl = document.getElementById("step-example");
    
    if (step.example) {
        exampleEl.style.display = "block";
        exampleEl.innerHTML = `<strong>Example:</strong> ${highlightKetText(step.example)}`;
    } else {
        exampleEl.style.display = "none";
        exampleEl.innerHTML = "";
    }
    renderShorLab(step);

    // const circuitGates = document.getElementById("circuit-gates");
    // circuitGates.innerHTML = "";

    // if (currentAlgo !== "shor") {
    //     step.circuit.forEach((gate, idx) => {
    //         const gateEl = document.createElement("div");
    //         gateEl.className = "circuit-gate";
    //         gateEl.innerHTML = `<div class="gate-box">${gate}</div>${idx < step.circuit.length - 1 ? '<div class="arrow-separator ml-3"></div>' : ""}`;
    //         circuitGates.appendChild(gateEl);
    //     });
    // }

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
        stepBtn.className = "step-item w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all";
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
    // let measurementValue = "-";
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
        afterText = `เลือก N = ${N} และ a = ${a} แล้ว โดยได้ค่า ห.ร.ม.(a, N) = ${gcdValue}`;
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

    // if (currentStep >= 4 && period) {
    //     measurementValue = `y/Q ~ s/${period}`;
    // }

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
    // document.getElementById("shor-lab-measurement").textContent = measurementValue;
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

document.getElementById("run-shor-lab-btn").addEventListener("click", runShorLabStep);

document.getElementById("reset-shor-lab-btn").addEventListener("click", () => {
    document.getElementById("shor-lab-n").value = 35;
    document.getElementById("shor-lab-a").value = 2;
    document.getElementById("shor-lab-gcd").textContent = "-";
    document.getElementById("shor-lab-period").textContent = "-";
    // document.getElementById("shor-lab-measurement").textContent = "-";
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

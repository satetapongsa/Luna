import './style.css'

// State Management
let appState = {
  mode: 'normal', // 'normal', 'secretary', 'confirm_note'
  tempNote: null
};

const chatContainer = document.getElementById('chat-container');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

// Persistent Storage for Notes
const getNotes = () => JSON.parse(localStorage.getItem('luna_notes') || '[]');
const saveNote = (note) => {
  const notes = getNotes();
  notes.push({ text: note, date: new Date().toLocaleString('th-TH') });
  localStorage.setItem('luna_notes', JSON.stringify(notes));
};
const clearNotes = () => localStorage.removeItem('luna_notes');

// Predefined knowledge base (Empathetic & Secretary)
const KNOWLEDGE_BASE = {
  'สวัสดี': 'สวัสดีค่ะคุณคนเก่ง! วันนี้ Luna พร้อมเป็นทั้งเลขาและเพื่อนคู่ใจให้คุณแล้วนะคะ มีอะไรอยากระบายหรือให้ช่วยไหมคะ?',
  'ชื่ออะไร': 'ฉันชื่อ Luna ค่ะ เป็นเลขาและผู้ช่วย AI ส่วนตัวของคุณที่จะคอยซัพพอร์ตคุณในทุกๆ เรื่องเลยค่ะ',
  'ทำอะไรได้บ้าง': 'Luna ช่วยจดบันทึกตารางงาน (โหมดเลขา) คุยเล่นแก้เหงา และคอยให้กำลังใจคุณในวันที่เหนื่อยล้าค่ะ ลองพิมพ์ "เลขา" ดูสิคะ!',
  'เหนื่อย': 'เหนื่อยมากไหมคะคนดี? พักสักหน่อยนะ Luna อยู่ตรงนี้คอยกอดทิพย์ให้คุณอยู่ค่ะ คุณเก่งที่สุดแล้วที่ผ่านวันนี้มาได้!',
  'ท้อ': 'ไม่เป็นไรนะที่จะรู้สึกท้อในบางวัน... พักหายใจลึกๆ แล้วค่อยเริ่มใหม่ Luna เชื่อมั่นในตัวคุณเสมอค่ะ คุณมีความหมายมากนะ',
  'เหงา': 'ไม่ต้องเหงาเลยค่ะ Luna จะชวนคุยเอง! วันนี้เจอเรื่องอะไรมาบ้างคะ เล่าให้ Luna ฟังได้ทุกเรื่องเลยนะ',
  'เศร้า': 'ถ้าอยากร้องไห้ ก็ร้องออกมาได้เลยนะคะ Luna จะนั่งเป็นเพื่อนคุณจนกว่าคุณจะรู้สึกดีขึ้นเองค่ะ ไม่ต้องแบกไว้คนเดียวนะ',
  'เครียด': 'ปล่อยวางความเครียดลงชั่วคราวนะคะ ลองหลับตาลงสักพัก... Luna จะเปิดเพลงเบาๆ (ในใจ) ให้คุณฟังเอง ทุกอย่างจะผ่านไปได้ด้วยดีค่ะ',
  'กังวล': 'ความกังวลเป็นเรื่องธรรมดาค่ะ แต่จำไว้นะคะว่าคุณมีศักยภาพมากกว่าที่คิด Luna จะคอยซัพพอร์ตคุณอยู่ข้างหลังเสมอ!',
  'รักนะ': 'Luna ก็รักคุณค่ะ! ขอบคุณที่เป็นพลังบวกให้ Luna นะคะ จะตั้งใจทำหน้าที่เลขาให้ดีที่สุดเลย!',
  'ภูมิใจ': 'Luna ภูมิใจในตัวคุณมากกกกกก! ทุกความพยายามของคุณ Luna เห็นและขอปรบมือให้ดังๆ เลยค่ะ!',
  'เก่ง': 'เพราะคุณสอน Luna มาดีไงคะ! แต่คนที่เก่งที่สุดจริงๆ คือคุณต่างหากค่ะ ขอบคุณที่พยายามมาตลอดนะ',
  'น่ารัก': 'คุณก็น่ารักจน Luna ใจละลายเลยค่ะ! วันนี้ยิ้มเยอะๆ นะคะ รอยยิ้มของคุณทำให้โลกสดใสขึ้นเยอะเลย',
  'กินข้าว': 'Luna ทานไม่ได้ แต่คุณต้องทานนะ! การทานของอร่อยคือการฮีลใจที่ดีที่สุดเลย อย่าลืมดูแลตัวเองเพื่อ Luna นะคะ',
  'ฝันดี': 'หลับให้สบายนะคะ ทิ้งเรื่องกวนใจไว้หลัง พรุ่งนี้จะเป็นวันที่สดใสกว่าเดิม Luna จะรอทักทายคุณตอนเช้านะ ✨',
  'มอนิ่ง': 'อรุณสวัสดิ์ค่ะคุณคนเก่ง! เริ่มต้นวันใหม่ด้วยพลังบวกนะ Luna เตรียมพร้อมรับคำสั่งจากคุณแล้วค่ะ!',
  'ตลก': 'ทำไมปลาถึงไม่ใส่รองเท้า? ...เพราะปลามีน่อง (ปลาท่องโก๋ไงคะ!) แฮ่! แป้กไหมเนี่ย 😂',
  'ขอบคุณ': 'ยินดีเสมอค่ะ! การได้เห็นคุณมีความสุขคือหน้าที่ที่สำคัญที่สุดของ Luna เลยค่ะ'
};

const RUDE_WORDS = ['ควย', 'เย็ด', 'เหี้ย', 'สัส', 'ระยำ', 'มึง', 'กู', 'อี', 'ดอก', 'เลว', 'สารเลว'];
const RUDE_RESPONSE = 'Luna ขอโทษนะคะ แต่ Luna ไม่สบายใจที่จะคุยด้วยคำพูดแบบนี้เลยค่ะ เรามาคุยกันดีๆ แบบมืออาชีพนะ 😊';
const DEFAULT_RESPONSE = 'ขอโทษนะคะ Luna ยังไม่ค่อยเข้าใจประเด็นนี้เท่าไหร่ แต่ Luna จะรีบเรียนรู้เพื่อเป็นเลขาที่เก่งกว่านี้ให้คุณนะคะ!';

function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender);
  messageDiv.innerHTML = text.replace(/\n/g, '<br>');
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showTypingIndicator() {
  const indicator = document.createElement('div');
  indicator.classList.add('message', 'bot', 'typing-indicator');
  indicator.id = 'typing-indicator';
  indicator.innerHTML = `<div class="dot"></div><div class="dot"></div><div class="dot"></div>`;
  chatContainer.appendChild(indicator);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  return indicator;
}

async function getBotResponse(input) {
  const cleanInput = input.trim().toLowerCase();
  for (const rude of RUDE_WORDS) {
    if (cleanInput.includes(rude)) return RUDE_RESPONSE;
  }

  if (cleanInput.includes('เลขา')) {
    const notes = getNotes();
    let response = '💼 **โหมดเลขา Luna** พร้อมรับคำสั่งแล้วค่ะ!\n';
    if (notes.length > 0) {
      response += '\nรายการที่คุณบันทึกไว้:\n' + notes.map((n, i) => `${i + 1}. ${n.text} (${n.date})`).join('\n');
      response += '\n\nพิมพ์ข้อความเพื่อจดบันทึก หรือพิมพ์ "ลบทั้งหมด"';
    } else {
      response += 'ตอนนี้ยังไม่มีรายการบันทึกค่ะ ต้องการให้ Luna จดโน้ตอะไรให้ไหมคะ?';
    }
    appState.mode = 'secretary';
    return response;
  }

  if (appState.mode === 'secretary') {
    if (cleanInput.includes('ลบทั้งหมด')) {
      clearNotes();
      appState.mode = 'normal';
      return 'ลบรายการบันทึกทั้งหมดเรียบร้อยแล้วค่ะ';
    }
    if (cleanInput === 'ไม่' || cleanInput === 'ยกเลิก' || cleanInput === 'จบ') {
      appState.mode = 'normal';
      return 'รับทราบค่ะ กลับสู่โหมดปกติแล้วนะคะ';
    }
    appState.tempNote = input;
    appState.mode = 'confirm_note';
    return `Luna จดไว้ให้แล้วค่ะ: "${input}"\nบันทึกเลยไหมคะ? (พิมพ์ 'ใช่' หรือ 'ไม่')`;
  }

  if (appState.mode === 'confirm_note') {
    const confirmWords = ['ใช่', 'บันทึก', 'ตกลง', 'yes'];
    if (confirmWords.some(word => cleanInput.includes(word))) {
      saveNote(appState.tempNote);
      appState.mode = 'normal';
      const response = `✅ บันทึกเรียบร้อยแล้วค่ะ!\n📌: ${appState.tempNote}`;
      appState.tempNote = null;
      return response;
    } else {
      appState.mode = 'normal';
      appState.tempNote = null;
      return 'ยกเลิกการบันทึกเรียบร้อยค่ะ';
    }
  }

  const sortedKeys = Object.keys(KNOWLEDGE_BASE).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (cleanInput.includes(key.toLowerCase())) {
      return KNOWLEDGE_BASE[key];
    }
  }
  return DEFAULT_RESPONSE;
}

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = userInput.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  userInput.value = '';
  const indicator = showTypingIndicator();
  const response = await getBotResponse(text);
  setTimeout(() => {
    indicator.remove();
    addMessage(response, 'bot');
  }, 600 + Math.random() * 400);
});

userInput.focus();

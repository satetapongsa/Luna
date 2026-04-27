import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import './App.css';

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

const RUDE_WORDS = ['ควย', 'เย็ด', 'เหี้ย', 'สัส', 'ระยำ', 'มึง', 'กู', 'อี', 'ดอก', 'เลว', 'สารเลว', 'ปัญญาอ่อน'];
const RUDE_RESPONSE = 'Luna ขอโทษนะคะ แต่ Luna ไม่สบายใจที่จะคุยด้วยคำพูดแบบนี้เลยค่ะ เรามาคุยกันดีๆ แบบมืออาชีพนะ 😊';
const DEFAULT_RESPONSE = 'ขอโทษนะคะ Luna ยังไม่ค่อยเข้าใจประเด็นนี้เท่าไหร่ แต่ Luna จะรีบเรียนรู้เพื่อเป็นเลขาที่เก่งกว่านี้ให้คุณนะคะ!';

function App() {
  const [messages, setMessages] = useState([
    { text: 'สวัสดีค่ะ! ฉันคือ Luna ผู้ช่วยส่วนตัวของคุณ วันนี้มีอะไรให้ฉันช่วยดูแลไหมคะ? 😊', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState('normal'); // 'normal', 'secretary', 'confirm_note'
  const [tempNote, setTempNote] = useState(null);
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('luna_notes') || '[]'));
  const chatContainerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('luna_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const addMessage = (text, sender) => {
    setMessages(prev => [...prev, { text, sender }]);
  };

  const getBotResponse = async (input) => {
    const cleanInput = input.trim().toLowerCase();

    // 1. Rude words
    for (const rude of RUDE_WORDS) {
      if (cleanInput.includes(rude)) return RUDE_RESPONSE;
    }

    // 2. Secretary Mode
    if (cleanInput.includes('เลขา')) {
      let response = '💼 **โหมดเลขา Luna** พร้อมรับคำสั่งแล้วค่ะ!\n';
      if (notes.length > 0) {
        response += '\nรายการที่คุณบันทึกไว้:\n' + notes.map((n, i) => `${i + 1}. ${n.text} (${n.date})`).join('\n');
        response += '\n\nพิมพ์ข้อความเพื่อจดบันทึก หรือพิมพ์ "ลบทั้งหมด"';
      } else {
        response += 'ตอนนี้ยังไม่มีรายการบันทึกค่ะ ต้องการให้ Luna จดโน้ตอะไรให้ไหมคะ?';
      }
      setMode('secretary');
      return response;
    }

    if (mode === 'secretary') {
      if (cleanInput.includes('ลบทั้งหมด')) {
        setNotes([]);
        setMode('normal');
        return 'ลบรายการบันทึกทั้งหมดเรียบร้อยแล้วค่ะ';
      }
      if (['ไม่', 'ยกเลิก', 'จบ'].includes(cleanInput)) {
        setMode('normal');
        return 'รับทราบค่ะ กลับสู่โหมดปกติแล้วนะคะ';
      }
      setTempNote(input);
      setMode('confirm_note');
      return `Luna จดไว้ให้แล้วค่ะ: "${input}"\nบันทึกเลยไหมคะ? (พิมพ์ 'ใช่' หรือ 'ไม่')`;
    }

    if (mode === 'confirm_note') {
      if (['ใช่', 'บันทึก', 'ตกลง', 'yes'].some(word => cleanInput.includes(word))) {
        const newNote = { text: tempNote, date: new Date().toLocaleString('th-TH') };
        setNotes(prev => [...prev, newNote]);
        setMode('normal');
        setTempNote(null);
        return `✅ บันทึกเรียบร้อยแล้วค่ะ!\n📌: ${newNote.text}`;
      } else {
        setMode('normal');
        setTempNote(null);
        return 'ยกเลิกการบันทึกเรียบร้อยค่ะ';
      }
    }

    // 3. Knowledge Base
    const sortedKeys = Object.keys(KNOWLEDGE_BASE).sort((a, b) => b.length - a.length);
    for (const key of sortedKeys) {
      if (cleanInput.includes(key.toLowerCase())) {
        return KNOWLEDGE_BASE[key];
      }
    }

    return DEFAULT_RESPONSE;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue('');
    addMessage(userText, 'user');

    setIsTyping(true);
    const response = await getBotResponse(userText);
    
    setTimeout(() => {
      setIsTyping(false);
      addMessage(response, 'bot');
    }, 800 + Math.random() * 400);
  };

  return (
    <div className="luna-app-container">
      <div className="luna-chat-wrapper">
        <header className="app-header">
          <div className="avatar-container">
            <img src="/avatar.png" alt="Luna" className="avatar-image" />
            <div className="status-dot"></div>
          </div>
          <div className="header-info">
            <h1 className="app-title">Luna AI</h1>
            <div className="app-subtitle">ออนไลน์ตอนนี้</div>
          </div>
        </header>

        <main className="chat-container" ref={chatContainerRef}>
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`message ${msg.sender}`}
              dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br>') }}
            />
          ))}
          {isTyping && (
            <div className="message bot typing-indicator">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          )}
        </main>

        <div className="input-area-container">
          <form className="chat-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              className="message-input" 
              placeholder="พิมพ์ข้อความของคุณที่นี่..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
            />
            <button type="submit" className="send-button" title="ส่งข้อความ">
              <Send size={18} color="#000" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

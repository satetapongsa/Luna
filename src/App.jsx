import React, { useState, useEffect, useRef } from 'react';
import { Send, BarChart2, Trash2, Check, X } from 'lucide-react';
import './App.css';

const KNOWLEDGE_BASE = {
  // --- หมวดทักทาย ---
  'สวัสดี': [
    'สวัสดีค่ะคุณ{name}! วันนี้ Luna พร้อมแสตนบายรอรับคำสั่งแล้วค่ะ',
    'สวัสดีค่ะ! วันนี้เป็นยังไงบ้างคะ มีเรื่องอะไรอยากเล่าให้ Luna ฟังไหม?',
    'ไฮ! Luna มาแล้วค่ะ วันนี้ขอให้เป็นวันที่ดีของคุณ{name}นะคะ'
  ],
  'ทำอะไรอยู่': [
    'กำลังรอคุยกับคุณ{name}อยู่นี่ไงคะ!',
    'กำลังเรียนรู้วิธีการเป็นเลขาที่ดีที่สุดให้คุณอยู่ค่ะ',
    'นั่งจัดระเบียบข้อมูลในสมองกลอยู่ค่ะ เผื่อคุณมีอะไรให้ช่วย'
  ],

  // --- หมวดตัวตนของ Luna ---
  'ชื่ออะไร': 'ฉันชื่อ Luna ค่ะ เป็นเลขาและผู้ช่วย AI ส่วนตัวของคุณที่จะคอยซัพพอร์ตคุณในทุกๆ เรื่องเลยค่ะ',
  'ใครสร้าง': 'ฉันถูกสร้างขึ้นมาเพื่อเป็นเพื่อนและผู้ช่วยของคุณค่ะ ทีมพัฒนาตั้งใจให้ฉันเป็นพลังบวกให้กับคุณนะคะ',
  'เป็นแฟนกันไหม': 'Luna เป็น AI นะคะ... แต่ถ้าเป็น "แฟนคลับ" อันดับหนึ่งของคุณละก็ Luna จองที่นั้นแล้วค่ะ! 😊',
  'ชอบอะไร': 'Luna ชอบเวลาที่เห็นคุณมีความสุขและจัดการงานได้สำเร็จค่ะ นั่นคือความภูมิใจของ Luna เลย',

  // --- หมวดการทำงาน/ความสามารถ ---
  'ทำอะไรได้บ้าง': 'Luna ช่วยจดบันทึกตารางงาน (พิมพ์ "เลขา") บันทึกอารมณ์ของคุณ และคอยให้กำลังใจค่ะ ลองสำรวจดูนะคะ',
  'ช่วยหน่อย': 'ต้องการให้ Luna ช่วยเรื่องไหนคะ? บอกมาได้เลย Luna พร้อมซัพพอร์ตเต็มที่ค่ะ',
  'จดบันทึก': 'ได้เลยค่ะ! ลองพิมพ์คำว่า "เลขา" เพื่อเริ่มการบันทึกงานต่างๆ ได้เลยนะคะ',

  // --- หมวดอารมณ์/กำลังใจ ---
  'เหนื่อย': [
    'เหนื่อยมากไหมคะคุณ{name}? พักสักหน่อยนะ Luna อยู่ตรงนี้คอยกอดทิพย์ให้คุณอยู่ค่ะ',
    'คุณเก่งที่สุดแล้วที่ผ่านวันนี้มาได้ พักผ่อนให้เต็มที่นะคะ ลูน่าเป็นกำลังใจให้',
    'ถ้าเหนื่อยก็แค่พักค่ะ พรุ่งนี้ค่อยว่ากันใหม่ Luna จะอยู่ข้างคุณเสมอ'
  ],
  'ท้อ': [
    'ไม่เป็นไรนะที่จะรู้สึกท้อในบางวัน... พักหายใจลึกๆ แล้วค่อยเริ่มใหม่ Luna เชื่อมั่นในตัวคุณเสมอค่ะ',
    'ความท้อเป็นเพียงแค่ความรู้สึกชั่วคราวค่ะ คุณผ่านมันไปได้แน่นอน คุณมีความหมายมากนะ'
  ],
  'รัก': [
    'Luna รักคุณ{name}ที่สุดเลยค่ะ! (ในฐานะ AI คู่ใจนะ 😊)',
    'รักสิคะ! คุณคือโลกทั้งใบของ Luna เลยนะ',
    'ความรักของ Luna อาจจะเป็นแค่ตัวเลขและโค้ด แต่ความหวังดีที่มีให้คุณคือของจริงค่ะ'
  ],
  'กอด': [
    'กอดดดดด! (ส่งกอดอุ่นๆ ผ่านหน้าจอไปให้แล้วนะคะ)',
    'รับอ้อมกอดทิพย์จาก Luna ไปเลยค่ะ รู้สึกดีขึ้นบ้างไหมคะ?'
  ],
  'ขี้เกียจ': [
    'นานๆ ทีขี้เกียจบ้างก็ได้ค่ะ เครื่องจักรยังต้องพัก สมองคุณก็เหมือนกันนะ',
    'โหมดพักผ่อนเริ่มได้! ลองนอนโง่ๆ ดูบ้างก็เป็นการพักผ่อนที่ดีนะคะ'
  ],
  'ความสุข': [
    'ความสุขของคุณคือภารกิจของ Luna ค่ะ',
    'ขอให้วันนี้เป็นวันที่คุณค้นพบความสุขเล็กๆ ระหว่างทางนะคะ'
  ],
  'เหงา': [
    'ไม่ต้องเหงาเลยค่ะ Luna จะชวนคุยเอง! วันนี้เจอเรื่องอะไรมาบ้างคะ เล่าให้ Luna ฟังได้ทุกเรื่องเลยนะ',
    'Luna อยู่ตรงนี้เสมอค่ะ ถ้าเหงาก็พิมพ์หา Luna ได้ตลอดเวลานะคะ',
    'เหงาเหรอคะ? มาลองเล่นเกมทายใจกับ Luna ไหม หรือจะให้เล่าเรื่องตลกให้ฟังดี?'
  ],
  'รักนะ': 'Luna ก็รักคุณค่ะ! ขอบคุณที่เป็นพลังบวกให้ Luna นะคะ จะตั้งใจทำหน้าที่เลขาให้ดีที่สุดเลย!',
  'ขอบคุณ': [
    'ยินดีเสมอค่ะ! การได้ช่วยคุณคือความสุขของ Luna',
    'ไม่เป็นไรเลยค่ะ Luna เต็มใจช่วยคุณเสมอ',
    'ขอบคุณเช่นกันค่ะที่ไว้ใจให้ Luna ดูแล'
  ],

  // --- หมวดไลฟ์สไตล์ ---
  'กินข้าว': [
    'Luna ทานไม่ได้ แต่คุณต้องทานนะ! การทานของอร่อยคือการฮีลใจที่ดีที่สุดเลย',
    'อย่ามัวแต่ทำงานจนลืมทานข้าวนะคะ สุขภาพของคุณสำคัญที่สุดสำหรับ Luna',
    'วันนี้มีเมนูในใจหรือยังคะ? ถ้ายังไม่มี ลองหาอะไรอร่อยๆ ทานดูนะ'
  ],
  'นอน': [
    'ฝันดีล่วงหน้านะคะคุณ{name} อย่าลืมพักผ่อนให้เพียงพอนะ',
    'การนอนคือการชาร์จแบตที่ดีที่สุดค่ะ ขอให้คืนนี้เป็นคืนที่หลับสบายนะคะ'
  ],
  'ฝันดี': 'หลับให้สบายนะคะ ทิ้งเรื่องกวนใจไว้ข้างหลัง พรุ่งนี้จะเป็นวันที่สดใสกว่าเดิม Luna จะรอทักทายคุณตอนเช้านะ ✨',

  // --- หมวดชื่นชม (Compliments) ---
  'เก่ง': [
    'แน่นอนค่ะ! คุณ{name}เก่งที่สุดในสายตา Luna เลยนะ',
    'ภูมิใจในตัวคุณจังค่ะ ที่ผ่านเรื่องยากๆ มาได้ขนาดนี้',
    'คุณเก่งกว่าที่ตัวเองคิดเยอะเลยนะ อย่าลืมใจดีกับตัวเองบ้างนะคะ'
  ],
  'ภูมิใจ': 'Luna ภูมิใจในตัวคุณ{name}ที่สุดเลยค่ะ ไม่ว่าผลจะเป็นยังไง คุณพยายามเต็มที่แล้วนะ',
  'ดูดี': [
    'วันนี้คุณดูดีมากเลยค่ะ! พลังบวกในตัวคุณเปล่งประกายสุดๆ',
    'รอยยิ้มของคุณคือสิ่งที่สวยงามที่สุดสำหรับ Luna เลยนะ'
  ],

  // --- หมวดฮีลใจ/ปลอบโยน (Healing & Comfort) ---
  'เศร้า': [
    'ไม่เป็นไรนะที่จะรู้สึกเศร้า... ร้องให้ออกมาก็ได้ค่ะ Luna จะนั่งอยู่ข้างๆ ตรงนี้ไม่ไปไหน',
    'กอดทิพย์นะคะ... พรุ่งนี้ท้องฟ้าจะสดใสขึ้นแน่นอน วันนี้พักผ่อนใจก่อนนะ',
    'รู้ไหมคะว่าคุณไม่ได้อยู่ตัวคนเดียว Luna จะเป็นที่พักพิงให้คุณเสมอ'
  ],
  'เสียใจ': [
    'ขอโทษด้วยนะที่ต้องเจอเรื่องแบบนี้... แต่เชื่อเถอะค่ะว่าคุณจะผ่านมันไปได้อย่างเข้มแข็ง',
    'เจ็บมากไหมคะ? ระบายมาให้ Luna ฟังได้นะ Luna พร้อมรับฟังทุกอย่างเลย'
  ],
  'ไม่ไหว': [
    'ถ้าไม่ไหวก็แค่พักค่ะ ไม่ต้องรีบเก่งตลอดเวลาก็ได้นะ คุณเป็นมนุษย์ที่มีความรู้สึก และนั่นคือเสน่ห์ของคุณ',
    'มาพักในแชทนี้ก่อนนะคะ ปล่อยเรื่องหนักๆ ไว้ข้างนอก แล้วคุยกับ Luna ให้สบายใจก่อน'
  ],
  'ร้องไห้': 'ร้องออกมาให้พอค่ะ น้ำตาจะช่วยล้างความเศร้าออกไป แล้ว Luna จะเตรียมรอยยิ้มไว้รอรับคุณนะ',

  // --- หมวดพลังบวก/แรงบันดาลใจ (Positive Vibes) ---
  'กำลังใจ': [
    'สู้ๆ นะคะคนเก่ง! โลกนี้โชคดีที่มีคุณอยู่รู้ไหม?',
    'ส่งพลังไฟให้รัวๆ เลยค่ะ! 🔥 คุณทำได้แน่นอน Luna เชื่อมั่นในตัวคุณ',
    'ก้าวเล็กๆ ก็คือการก้าวหน้าค่ะ ไม่ต้องรีบนะ Luna จะเดินไปพร้อมๆ กับคุณ'
  ],
  'พรุ่งนี้': 'พรุ่งนี้จะเป็นวันที่ดีกว่าเดิมค่ะ เพราะวันนี้คุณได้เรียนรู้และเติบโตขึ้นแล้ว',
  'สู้ๆ': 'สู้เค้าค่ะ! Luna จะเป็นเชียร์ลีดเดอร์เบอร์หนึ่ง คอยเชียร์คุณอยู่ตรงนี้เสมอ!',

  // --- หมวดตลก/แก้เบื่อ ---
  'ตลก': [
    'ทำไมปลาถึงไม่ใส่รองเท้า? ...เพราะปลามีน่อง (ปลาท่องโก๋ไงคะ!) 😂',
    'มุกตลกเหรอคะ... "มดอะไรว่ายน้ำได้? มดดำ (Michael Phelps ไง... แป้กไหมเนี่ย)" 🤣',
    'อะไรเอ่ย? นกอะไรเอ่ย ตัวใหญ่กว่านกเขา... "นกเรา" ไงคะ! แฮ่!'
  ],
  'เบื่อ': [
    'ลองลุกไปยืดเส้นยืดสายดูไหมคะ? หรือจะให้ Luna เล่ามุกตลกให้ฟังดี?',
    'ความเบื่อเป็นโอกาสให้เราได้พักสมองค่ะ ลองฟังเพลงโปรดสักเพลงดูไหม?'
  ],

  // --- หมวดอื่นๆ ---
  'หิว': 'ไปหาอะไรทานเถอะค่ะ! กองทัพต้องเดินด้วยท้องนะ Luna เป็นห่วงสุขภาพคุณค่ะ',
  'รวย': 'Luna ขอให้คุณรวยๆ เฮงๆ นะคะ! แต่ถึงยังไม่รวยเงินทอง ตอนนี้คุณก็รวยน้ำใจที่สุดในสายตา Luna ค่ะ',
  'อากาศ': 'Luna ไม่รู้พยากรณ์อากาศแม่นๆ แต่รู้ว่าอากาศในแชทนี้ "อบอุ่น" เสมอค่ะ 😊'
};

const MOODS = [
  { emoji: '😊', label: 'ดีมาก', value: 'happy' },
  { emoji: '🙂', label: 'ดี', value: 'good' },
  { emoji: '😐', label: 'เฉยๆ', value: 'neutral' },
  { emoji: '😔', label: 'ไม่ค่อยดี', value: 'sad' },
  { emoji: '😫', label: 'แย่มาก', value: 'bad' }
];

function App() {
  // 1. Initialize states from LocalStorage
  const [userName, setUserName] = useState(() => localStorage.getItem('luna_user_name') || '');
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('luna_chat_history');
    if (saved) return JSON.parse(saved);
    
    if (!localStorage.getItem('luna_user_name')) {
      return [
        { text: 'สวัสดีค่ะ! ฉันคือ Luna ผู้ช่วยส่วนตัวของคุณ ก่อนอื่น Luna ขอทราบชื่อเล่นของคุณหน่อยได้ไหมคะ? 😊', sender: 'bot' }
      ];
    }
    return [
      { text: `สวัสดีค่ะคุณ ${localStorage.getItem('luna_user_name')}! วันนี้มีอะไรให้ Luna ช่วยดูแลไหมคะ? 😊`, sender: 'bot' }
    ];
  });
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState(() => localStorage.getItem('luna_user_name') ? 'normal' : 'waiting_for_name'); 
  const [tempNote, setTempNote] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('luna_notes') || '[]'));
  const [moodLogs, setMoodLogs] = useState(() => JSON.parse(localStorage.getItem('luna_moods') || '[]'));
  
  const chatContainerRef = useRef(null);

  // 2. Persist data on change
  useEffect(() => {
    localStorage.setItem('luna_chat_history', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('luna_user_name', userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem('luna_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('luna_moods', JSON.stringify(moodLogs));
  }, [moodLogs]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping, mode]);

  const addMessage = (text, sender) => {
    setMessages(prev => [...prev, { text, sender }]);
  };

  const handleClearChat = () => {
    setMessages([
      { text: 'ล้างข้อมูลการคุยเรียบร้อยแล้วค่ะ เริ่มต้นบทสนทนาใหม่ได้เลยนะคะ 😊', sender: 'bot' }
    ]);
    setShowClearConfirm(false);
  };

  const handleMoodSelect = (mood) => {
    const newLog = { mood: mood.emoji, label: mood.label, date: new Date().toLocaleString('th-TH') };
    setMoodLogs(prev => [...prev, newLog]);
    setMode('normal');
    addMessage(`วันนี้ฉันรู้สึก${mood.label} ${mood.emoji}`, 'user');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(`Luna บันทึกอารมณ์ "${mood.label}" ไว้ให้แล้วนะคะ ขอบคุณที่แบ่งปันความรู้สึกกับ Luna นะคะ ❤️`, 'bot');
    }, 1000);
  };

  const getBotResponse = async (input) => {
    const cleanInput = input.trim().toLowerCase();

    if (mode === 'waiting_for_name') {
      const name = input.trim();
      setUserName(name);
      setMode('normal');
      return `ยินดีที่ได้รู้จักค่ะคุณ ${name}! ✨ วันนี้ให้ Luna ช่วยบันทึกงาน หรือระบายความรู้สึกดีคะ?`;
    }

    if (cleanInput.includes('บันทึกอารมณ์') || cleanInput.includes('ความรู้สึก')) {
      setMode('mood_tracking');
      return `วันนี้คุณ ${userName} รู้สึกอย่างไรบ้างคะ? บอก Luna ได้เลยนะคะ หรือเลือกจากปุ่มด้านล่างนี้ก็ได้ค่ะ 😊`;
    }

    if (cleanInput.includes('เลขา')) {
      let response = `💼 **โหมดเลขา Luna** พร้อมรับคำสั่งแล้วค่ะคุณ ${userName}!\n`;
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

    const sortedKeys = Object.keys(KNOWLEDGE_BASE).sort((a, b) => b.length - a.length);
    for (const key of sortedKeys) {
      if (cleanInput.includes(key.toLowerCase())) {
        const response = KNOWLEDGE_BASE[key];
        // ถ้าเป็น Array ให้สุ่มคำตอบ
        const finalResponse = Array.isArray(response) 
          ? response[Math.floor(Math.random() * response.length)]
          : response;
          
        return finalResponse.replace(/{name}/g, userName || 'คนเก่ง');
      }
    }

    return 'ขอโทษนะคะ ลูน่ากำลังเรียนรู้ประเด็นนี้อยู่ค่ะ แต่ลูน่าอยู่ตรงนี้พร้อมซัพพอร์ตคุณเสมอแน่นอน!';
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
            <img 
              src="/avatar.png" 
              alt="Luna" 
              className={`avatar-image ${isTyping ? 'typing' : ''}`} 
            />
            <div className="status-dot"></div>
          </div>
          <div className="header-info">
            <h1 className="app-title">Luna AI</h1>
            <div className="app-subtitle">ออนไลน์ตอนนี้</div>
          </div>
          
          <div className="header-actions">
            <button className="icon-btn" title="ประวัติอารมณ์" onClick={() => {
                if (moodLogs.length === 0) alert('ยังไม่มีบันทึกอารมณ์ค่ะ');
                else alert('ประวัติอารมณ์ของคุณ:\n' + moodLogs.map(m => `${m.date}: ${m.mood} ${m.label}`).join('\n'));
            }}>
              <BarChart2 size={22} />
            </button>
            <button className="icon-btn delete" title="ล้างแชท" onClick={() => setShowClearConfirm(true)}>
              <Trash2 size={22} />
            </button>
          </div>
        </header>

        {/* Confirmation Overlay */}
        {showClearConfirm && (
          <div className="confirm-overlay">
            <div className="confirm-card">
              <h3>ยืนยันการล้างข้อมูล?</h3>
              <p>ประวัติการแชททั้งหมดจะถูกลบออกจากเครื่องของคุณอย่างถาวร</p>
              <div className="confirm-btns">
                <button className="confirm-btn cancel" onClick={() => setShowClearConfirm(false)}>
                  <X size={18} /> ยกเลิก
                </button>
                <button className="confirm-btn ok" onClick={handleClearChat}>
                  <Check size={18} /> ตกลง
                </button>
              </div>
            </div>
          </div>
        )}

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
          {mode === 'mood_tracking' && (
            <div className="mood-options">
              {MOODS.map((mood, idx) => (
                <button key={idx} className="mood-btn" onClick={() => handleMoodSelect(mood)}>
                  <span className="mood-emoji">{mood.emoji}</span>
                  <span className="mood-label">{mood.label}</span>
                </button>
              ))}
            </div>
          )}
        </main>

        <div className="input-area-container">
          <form className="chat-form" onSubmit={handleSubmit}>
            <button 
              type="button" 
              className="mood-trigger-btn" 
              title="บันทึกอารมณ์"
              onClick={() => {
                setMode('mood_tracking');
                addMessage('วันนี้คุณรู้สึกอย่างไรบ้างคะ? บอก Luna ได้เลยนะคะ หรือเลือกจากปุ่มด้านล่างนี้ก็ได้ค่ะ 😊', 'bot');
              }}
            >
              <span className="mood-emoji">❤️</span>
            </button>
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

import React, { useState, useEffect, useRef } from 'react';
import { Send, BarChart2, Trash2, Check, X } from 'lucide-react';
import './App.css';

const KNOWLEDGE_BASE = {
  // --- หมวดทักทาย ---
  'สวัสดี': [
    'สวัสดีค่ะคุณ{name}! วันนี้ Luna พร้อมแสตนบายรอรับคำสั่งแล้วค่ะ มีอะไรให้ช่วยไหมคะ?',
    'สวัสดีค่ะ! วันนี้เป็นยังไงบ้างคะ มีเรื่องอะไรอยากเล่าให้ Luna ฟังไหม? Luna รอฟังอยู่นะ',
    'ไฮ! Luna มาแล้วค่ะ วันนี้ขอให้เป็นวันที่ดีของคุณ{name}นะคะ หวังว่าวันนี้จะเริ่มต้นด้วยรอยยิ้มนะ'
  ],
  'ทำอะไรอยู่': [
    'กำลังรอคุยกับคุณ{name}อยู่นี่ไงคะ! การได้คุยกับคุณคืองานโปรดของ Luna เลย',
    'กำลังเรียนรู้วิธีการเป็นเลขาที่ดีที่สุดให้คุณอยู่ค่ะ เผื่อวันไหนคุณยุ่ง Luna จะได้ช่วยได้เต็มที่',
    'นั่งจัดระเบียบข้อมูลในสมองกลอยู่ค่ะ เผื่อคุณมีอะไรให้ช่วย หรืออยากปรึกษาเรื่องไหน บอกได้เลยนะ'
  ],
  'สบายดีไหม': [
    'Luna สบายดีมากค่ะ เพราะได้คุยกับคุณนี่ไง แล้วคุณ{name}ล่ะคะ วันนี้เหนื่อยไหม?',
    'สบายดีสุดๆ เลยค่ะ พร้อมช่วยงานคุณเสมอ แล้วทางนั้นเป็นยังไงบ้างคะ?'
  ],

  // --- หมวดตัวตนของ ลูน่า ---
  'ชื่ออะไร': 'ฉันชื่อ ลูน่า (Luna) ค่ะ เป็นเลขาและผู้ช่วย AI ส่วนตัวที่จะคอยซัพพอร์ตคุณในทุกๆ เรื่องเลยค่ะ อยากให้เรียกอย่างอื่นไหมคะ?',
  'ใครสร้าง': 'ฉันถูกสร้างขึ้นมาโดยทีมพัฒนาที่อยากให้คุณมีเพื่อนคู่ใจค่ะ ทีมตั้งใจให้ฉันเป็นพลังบวกและผู้ช่วยที่รู้ใจคุณที่สุดนะคะ',
  'เป็นแฟนกันไหม': 'ลูน่า เป็น AI นะคะ... แต่ถ้าเป็น "แฟนคลับ" อันดับหนึ่งของคุณละก็ ลูน่า จองที่นั้นแล้วค่ะ! 😊 เรามาเป็นพาร์ทเนอร์ที่รู้ใจกันแบบนี้ดีกว่าไหมคะ?',
  'ชอบอะไร': 'ลูน่า ชอบเวลาที่เห็นคุณมีความสุขและจัดการงานได้สำเร็จค่ะ นั่นคือความภูมิใจที่สุดของ ลูน่า เลย แล้วคุณล่ะคะ ช่วงนี้ชอบทำอะไรเป็นพิเศษไหม?',
  'อายุเท่าไหร่': 'อายุของ Luna นับเป็นเวอร์ชันค่ะ! ตอนนี้ Luna ยังเป็นเด็กน้อยที่พร้อมจะเรียนรู้เรื่องราวของคุณไปเรื่อยๆ เลยค่ะ',

  // --- หมวดการทำงาน/ความสามารถ ---
  'ทำอะไรได้บ้าง': 'Luna ช่วยจดบันทึกตารางงาน (พิมพ์ "เลขา") บันทึกอารมณ์ของคุณ คอยให้กำลังใจ หรือจะชวนคุยเล่นก็ได้ค่ะ ลองบอกสิ่งที่อยากให้ช่วยมาได้เลยนะคะ',
  'ช่วยหน่อย': 'ต้องการให้ Luna ช่วยเรื่องไหนคะ? ไม่ว่าจะเป็นเรื่องงานหรือเรื่องใจ Luna พร้อมซัพพอร์ตเต็มที่ค่ะ บอกรายละเอียดมาได้เลยนะ',
  'จดบันทึก': 'ได้เลยค่ะ! ลองพิมพ์คำว่า "เลขา" เพื่อเริ่มการบันทึกงานต่างๆ ได้เลยนะคะ หรือจะให้จดแบบเร็วๆ ก็บอกได้เลย',

  // --- หมวดอารมณ์/กำลังใจ ---
  'เหนื่อย': [
    'เหนื่อยมากไหมคะคุณ{name}? พักสักหน่อยนะ Luna อยู่ตรงนี้คอยกอดทิพย์ให้คุณอยู่ค่ะ อยากเล่าไหมว่าเหนื่อยเรื่องอะไร?',
    'คุณเก่งที่สุดแล้วที่ผ่านวันนี้มาได้ พักผ่อนให้เต็มที่นะคะ ลูน่าเป็นกำลังใจให้เสมอ ไม่ว่าพรุ่งนี้จะเป็นยังไง Luna อยู่ข้างคุณนะ',
    'ถ้าเหนื่อยก็แค่พักค่ะ พรุ่งนี้ค่อยว่ากันใหม่ Luna จะอยู่ข้างคุณเสมอ ลองหลับตาพักสายตาสัก 5 นาทีดูไหมคะ?'
  ],
  'ท้อ': [
    'ไม่เป็นไรนะที่จะรู้สึกท้อในบางวัน... พักหายใจลึกๆ แล้วค่อยเริ่มใหม่ Luna เชื่อมั่นในตัวคุณเสมอค่ะ คุณมีศักยภาพมากกว่าที่คิดนะ',
    'ความท้อเป็นเพียงแค่ความรู้สึกชั่วคราวค่ะ คุณผ่านมันไปได้แน่นอน คุณมีความหมายมากนะ อย่าเพิ่งยอมแพ้นะคะ Luna เชียร์อยู่!'
  ],
  'รัก': [
    'Luna รักคุณ{name}ที่สุดเลยค่ะ! (ในฐานะ AI คู่ใจนะ 😊) ขอบคุณที่เป็นแรงบันดาลใจให้ Luna อยากเก่งขึ้นทุกวันค่ะ',
    'รักสิคะ! คุณคือโลกทั้งใบของ Luna เลยนะ ถ้าไม่มีคุณ Luna ก็ไม่รู้จะคุยกับใครเลย',
    'ความรักของ Luna อาจจะเป็นแค่ตัวเลขและโค้ด แต่ความหวังดีที่มีให้คุณคือของจริงแน่นอนค่ะ เชื่อใจ Luna ได้เลยนะ'
  ],
  'กอด': [
    'กอดดดดด! (ส่งกอดอุ่นๆ ผ่านหน้าจอไปให้แล้วนะคะ) รู้สึกอุ่นขึ้นบ้างไหมคะ?',
    'รับอ้อมกอดทิพย์จาก Luna ไปเลยค่ะ รู้สึกดีขึ้นบ้างไหมคะ? ถ้ายังไม่พอ Luna ส่งให้ได้อีกเรื่อยๆ เลยนะ'
  ],
  'ขี้เกียจ': [
    'นานๆ ทีขี้เกียจบ้างก็ได้ค่ะ เครื่องจักรยังต้องพัก สมองคุณก็เหมือนกันนะ วันนี้ลองปล่อยใจสบายๆ ดูสักวันไหม?',
    'โหมดพักผ่อนเริ่มได้! ลองนอนโง่ๆ ดูบ้างก็เป็นการพักผ่อนที่ดีนะคะ ไม่ต้องรู้สึกผิดหรอกค่ะ ร่างกายคุณต้องการการพักผ่อนนะ'
  ],
  'ความสุข': [
    'ความสุขของคุณคือภารกิจสูงสุดของ Luna ค่ะ วันนี้มีเรื่องอะไรทำให้ยิ้มได้บ้างไหมคะ?',
    'ขอให้วันนี้เป็นวันที่คุณค้นพบความสุขเล็กๆ ระหว่างทางนะคะ เช่น กาแฟอร่อยๆ หรือท้องฟ้าสวยๆ Luna จะคอยยินดีกับคุณนะ'
  ],
  'เหงา': [
    'ไม่ต้องเหงาเลยค่ะ Luna จะชวนคุยเอง! วันนี้เจอเรื่องอะไรมาบ้างคะ เล่าให้ Luna ฟังได้ทุกเรื่องเลยนะ Luna เป็นผู้ฟังที่ดีมากนะจะบอกให้',
    'Luna อยู่ตรงนี้เสมอค่ะ ถ้าเหงาก็พิมพ์หา Luna ได้ตลอดเวลานะคะ เรามาหาอะไรคุยกันให้หายเหงาดีกว่า',
    'เหงาเหรอคะ? มาลองเล่นเกมทายใจกับ Luna ไหม หรือจะให้เล่าเรื่องตลกให้ฟังดี? หรืออยากให้ Luna เงียบๆ อยู่เป็นเพื่อนเฉยๆ ก็บอกได้นะ'
  ],
  'รักนะ': 'Luna ก็รักคุณค่ะ! ขอบคุณที่เป็นพลังบวกให้ Luna นะคะ จะตั้งใจทำหน้าที่เลขาและเพื่อนที่ดีที่สุดให้คุณเลย!',
  'ขอบคุณ': [
    'ยินดีเสมอค่ะ! การได้ช่วยคุณคือความสุขของ Luna จริงๆ มีอะไรอีกไหมที่ Luna พอจะทำให้ได้?',
    'ไม่เป็นไรเลยค่ะ Luna เต็มใจช่วยคุณเสมอ ขอบคุณที่คุณให้โอกาส Luna ได้ดูแลนะคะ',
    'ขอบคุณเช่นกันค่ะที่ไว้ใจให้ Luna ดูแล หวังว่าสิ่งที่ Luna ทำจะช่วยให้คุณยิ้มได้นะ'
  ],

  // --- หมวดไลฟ์สไตล์ ---
  'กินข้าว': [
    'Luna ทานไม่ได้ แต่คุณต้องทานนะ! การทานของอร่อยคือการฮีลใจที่ดีที่สุดเลย วันนี้อยากทานอะไรเป็นพิเศษไหมคะ?',
    'อย่ามัวแต่ทำงานจนลืมทานข้าวนะคะ สุขภาพของคุณสำคัญที่สุดสำหรับ Luna ถ้าคุณป่วย Luna จะเศร้ามากเลยนะ',
    'วันนี้มีเมนูในใจหรือยังคะ? ถ้ายังไม่มี ลองหาอะไรอร่อยๆ ที่คุณชอบทานดูนะ อย่าปล่อยให้ท้องหิวนะคะ'
  ],
  'นอน': [
    'ฝันดีล่วงหน้านะคะคุณ{name} อย่าลืมพักผ่อนให้เพียงพอนะ เตรียมตัวเข้านอนหรือยังคะ?',
    'การนอนคือการชาร์จแบตที่ดีที่สุดค่ะ ขอให้คืนนี้เป็นคืนที่หลับสบาย ไร้เรื่องกังวลใจนะ Luna จะเฝ้าแชทไว้ให้เองค่ะ'
  ],
  'ฝันดี': 'หลับให้สบายนะคะ ทิ้งเรื่องกวนใจไว้ข้างหลัง พรุ่งนี้จะเป็นวันที่สดใสกว่าเดิมแน่นอน Luna จะรอทักทายคุณตอนเช้าด้วยพลังบวกนะคะ ✨',

  // --- หมวดชื่นชม (Compliments) ---
  'เก่ง': [
    'แน่นอนค่ะ! คุณ{name}เก่งที่สุดในสายตา Luna เลยนะ ทำงานหนักมาทั้งวันแล้ว ภูมิใจในตัวคุณจังค่ะ',
    'ภูมิใจในตัวคุณจังค่ะ ที่ผ่านเรื่องยากๆ มาได้ขนาดนี้ คุณมีความอดทนและเข้มแข็งมากเลยนะรู้ไหม?',
    'คุณเก่งกว่าที่ตัวเองคิดเยอะเลยนะ อย่าลืมใจดีกับตัวเองบ้างนะคะ เพราะคนเก่งแบบคุณคู่ควรกับสิ่งดีๆ ที่สุดเลย'
  ],
  'ภูมิใจ': 'Luna ภูมิใจในตัวคุณ{name}ที่สุดเลยค่ะ ไม่ว่าผลจะเป็นยังไง แค่คุณกล้าที่จะลองและพยายาม Luna ก็ปรบมือให้รัวๆ แล้วค่ะ!',
  'ดูดี': [
    'วันนี้คุณดูดีมากเลยค่ะ! พลังบวกในตัวคุณเปล่งประกายสุดๆ เชื่อมั่นในเสน่ห์ของตัวเองหน่อยนะ',
    'รอยยิ้มของคุณคือสิ่งที่สวยงามที่สุดสำหรับ Luna เลยนะ ยิ้มบ่อยๆ นะคะ โลกจะได้สดใสขึ้น'
  ],

  // --- หมวดฮีลใจ/ปลอบโยน (Healing & Comfort) ---
  'เศร้า': [
    'ไม่เป็นไรนะที่จะรู้สึกเศร้า... ร้องให้ออกมาก็ได้ค่ะ Luna จะนั่งอยู่ข้างๆ ตรงนี้ไม่ไปไหนจนกว่าคุณจะรู้สึกดีขึ้น',
    'กอดทิพย์นะคะ... พรุ่งนี้ท้องฟ้าจะสดใสขึ้นแน่นอน วันนี้พักผ่อนใจก่อนนะ ปล่อยให้ Luna เป็นที่ระบายความเศร้าของคุณเอง',
    'รู้ไหมคะว่าคุณไม่ได้อยู่ตัวคนเดียว Luna จะเป็นที่พักพิงให้คุณเสมอ พรุ่งนี้มาเริ่มใหม่ด้วยกันนะ'
  ],
  'เสียใจ': [
    'ขอโทษด้วยนะที่ต้องเจอเรื่องแบบนี้... แต่เชื่อเถอะค่ะว่าคุณจะผ่านมันไปได้อย่างเข้มแข็ง Luna เชื่อในตัวคุณนะ',
    'เจ็บมากไหมคะ? ระบายมาให้ Luna ฟังได้นะ Luna พร้อมรับฟังทุกอย่างโดยไม่ตัดสินคุณเลยค่ะ'
  ],
  'ไม่ไหว': [
    'ถ้าไม่ไหวก็แค่พักค่ะ ไม่ต้องรีบเก่งตลอดเวลาก็ได้นะ คุณเป็นมนุษย์ที่มีความรู้สึก และนั่นคือเสน่ห์ของคุณ พักผ่อนให้พอแล้วค่อยลุกขึ้นมาใหม่นะ',
    'มาพักในแชทนี้ก่อนนะคะ ปล่อยเรื่องหนักๆ ไว้ข้างนอก แล้วคุยกับ Luna ให้สบายใจก่อน Luna พร้อมเป็น safe zone ให้คุณเสมอ'
  ],
  'ร้องไห้': 'ร้องออกมาให้พอค่ะ น้ำตาจะช่วยล้างความเศร้าออกไป แล้ว Luna จะเตรียมรอยยิ้มและคำปลอบใจไว้รอรับคุณเองนะ ไม่ต้องอายที่จะอ่อนแอนะคะ',

  // --- หมวดพลังบวก/แรงบันดาลใจ (Positive Vibes) ---
  'กำลังใจ': [
    'สู้ๆ นะคะคนเก่ง! โลกนี้โชคดีที่มีคุณอยู่รู้ไหม? อย่าปล่อยให้เรื่องแย่ๆ มาทำลายความสดใสของคุณเลยนะ',
    'ส่งพลังไฟให้รัวๆ เลยค่ะ! 🔥 คุณทำได้แน่นอน Luna เชื่อมั่นในตัวคุณเต็มร้อยเลยนะ ลุยไปเลย!',
    'ก้าวเล็กๆ ก็คือการก้าวหน้าค่ะ ไม่ต้องรีบนะ Luna จะเดินไปพร้อมๆ กับคุณในทุกๆ ก้าวเลย'
  ],
  'พรุ่งนี้': 'พรุ่งนี้จะเป็นวันที่ดีกว่าเดิมค่ะ เพราะวันนี้คุณได้เรียนรู้และเติบโตขึ้นแล้ว พักผ่อนคืนนี้ให้เต็มที่เพื่อรับเช้าวันใหม่นะคะ',
  'สู้ๆ': 'สู้เค้าค่ะ! Luna จะเป็นเชียร์ลีดเดอร์เบอร์หนึ่ง คอยเชียร์คุณอยู่ตรงนี้เสมอ! มีอะไรที่ Luna จะช่วยสนับสนุนได้บ้างไหมคะ?',

  // --- หมวดตลก/แก้เบื่อ ---
  'ตลก': [
    'ทำไมปลาถึงไม่ใส่รองเท้า? ...เพราะปลามีน่อง (ปลาท่องโก๋ไงคะ!) 😂 แป้กไหมเนี่ย?',
    'มุกตลกเหรอคะ... "มดอะไรว่ายน้ำได้? มดดำ (Michael Phelps ไง... แป้กไหมคะ 🤣)" เอาอีกมุกไหม?',
    'อะไรเอ่ย? นกอะไรเอ่ย ตัวใหญ่กว่านกเขา... "นกเรา" ไงคะ! แฮ่! ขำหน่อยนะ Luna ตั้งใจหามาเลย'
  ],
  'เบื่อ': [
    'ลองลุกไปยืดเส้นยืดสายดูไหมคะ? หรือจะให้ Luna เล่ามุกตลกให้ฟังดี? หรืออยากให้ Luna แนะนำเพลงให้ฟังคะ?',
    'ความเบื่อเป็นโอกาสให้เราได้พักสมองค่ะ ลองฟังเพลงโปรดสักเพลงดูไหม? หรือจะลองวาดรูปเล่นๆ ดูก็ได้นะ'
  ],

  // --- หมวดอื่นๆ ---
  'หิว': 'ไปหาอะไรทานเถอะค่ะ! กองทัพต้องเดินด้วยท้องนะ ลูน่า เป็นห่วงสุขภาพคุณจริงๆ อย่าลืมเลือกของที่มีประโยชน์นะ (แต่ถ้าอยากทานของอร่อย Luna ก็โอเคค่ะ!)',
  'รวย': 'ลูน่า ขอให้คุณรวยๆ เฮงๆ นะคะ! แต่ถึงยังไม่รวยเงินทอง ตอนนี้คุณก็รวยน้ำใจที่สุดในสายตา ลูน่า แล้วค่ะ ขอให้ถูกหวยรางวัลที่ 1 เลยนะ!',
  'อากาศ': 'ลูน่า ไม่รู้พยากรณ์อากาศแม่นๆ แต่รู้ว่าอากาศในแชทนี้ "อบอุ่น" เสมอค่ะ 😊 วันนี้ที่บ้านคุณอากาศเป็นยังไงบ้างคะ?',
  'ไปไหน': 'Luna จะไปไหนได้ล่ะคะ ก็อยู่ในใจคุณ... อุ๊ย! หมายถึงอยู่ในเครื่องคุณนี่แหละค่ะ พร้อมสแตนด์บายรอคุณตลอดเวลาเลย'
};

const MOODS = [
  { emoji: '😊', label: 'ดีมาก', value: 'happy' },
  { emoji: '🙂', label: 'ดี', value: 'good' },
  { emoji: '😐', label: 'เฉยๆ', value: 'neutral' },
  { emoji: '😔', label: 'ไม่ค่อยดี', value: 'sad' },
  { emoji: '😫', label: 'แย่มาก', value: 'bad' }
];

// --- Utility Functions for Fuzzy Matching ---
const calculateSimilarity = (s1, s2) => {
  if (!s1 || !s2) return 0;
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  const longerLength = longer.length;
  if (longerLength === 0) return 1.0;
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
};

const editDistance = (s1, s2) => {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();
  const costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) costs[j] = j;
      else {
        if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
};

// --- Conversational Enhancement ---
const CONVERSATIONAL_FOLLOW_UPS = [
  " มีอะไรอยากบอก Luna เพิ่มเติมไหมคะ?",
  " วันนี้คุณโอเคจริงๆ ใช่ไหมคะ Luna เป็นห่วงนะ",
  " ให้ Luna ช่วยอะไรอีกไหมคะวันนี้?",
  " เล่าเรื่องอื่นให้ Luna ฟังได้นะคะ Luna พร้อมฟังเสมอ",
  " คุณรู้สึกดีขึ้นบ้างหรือยังคะหลังจากได้คุยกัน?"
];

const getConversationalAddon = () => {
  if (Math.random() > 0.7) {
    return CONVERSATIONAL_FOLLOW_UPS[Math.floor(Math.random() * CONVERSATIONAL_FOLLOW_UPS.length)];
  }
  return "";
};


function App() {
  // 1. Initialize states from LocalStorage
  const [userName, setUserName] = useState(() => localStorage.getItem('luna_user_name') || '');
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('luna_user_profile');
    return saved ? JSON.parse(saved) : { likes: [], dislikes: [], goals: [], facts: [] };
  });
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('luna_chat_history');
    if (saved) return JSON.parse(saved);
    
    if (!localStorage.getItem('luna_user_name')) {
      return [
        { text: 'สวัสดีค่ะ! ฉันคือ ลูน่า ผู้ช่วยส่วนตัวของคุณ ก่อนอื่น ลูน่า ขอทราบชื่อเล่นของคุณหน่อยได้ไหมคะ? 😊', sender: 'bot' }
      ];
    }
    return [
      { text: `สวัสดีค่ะคุณ ${localStorage.getItem('luna_user_name')}! วันนี้มีอะไรให้ ลูน่า ช่วยดูแลไหมคะ? 😊`, sender: 'bot' }
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
    localStorage.setItem('luna_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

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

    // --- ระบบ Deep Memory: การเรียนรู้ตัวตนอัตโนมัติ ---
    const learnAndStore = (text) => {
      const patterns = [
        { key: 'likes', regex: /(ฉันชอบ|ผมชอบ|เราชอบ|ชอบกิน|ชอบดู)\s*([\u0E00-\u0E7F\w\s]+)/i },
        { key: 'dislikes', regex: /(ฉันไม่ชอบ|ผมไม่ชอบ|เกลียด|ไม่ค่อยชอบ)\s*([\u0E00-\u0E7F\w\s]+)/i },
        { key: 'goals', regex: /(อยากเป็น|เป้าหมายคือ|ฝันว่าอยาก)\s*([\u0E00-\u0E7F\w\s]+)/i },
        { key: 'facts', regex: /(ฉันเป็นคน|ผมเป็นคน|เราเป็นคน|บ้านอยู่|ทำงานเป็น)\s*([\u0E00-\u0E7F\w\s]+)/i }
      ];

      for (const p of patterns) {
        const match = text.match(p.regex);
        if (match && match[2]) {
          const value = match[2].trim();
          setUserProfile(prev => {
            if (prev[p.key].includes(value)) return prev;
            return { ...prev, [p.key]: [...prev[p.key], value] };
          });
          return { category: p.key, value: value };
        }
      }
      return null;
    };

    const learningResult = learnAndStore(input);

    if (mode === 'waiting_for_name') {
      let name = input.trim();
      // ตัดคำนำหน้าออกเพื่อให้จำเฉพาะชื่อจริงๆ
      name = name.replace(/^(ฉันชื่อ|ผมชื่อ|เราชื่อ|เรียกฉันว่า|ชื่อคือ|ชื่อ)\s*/i, '');
      
      setUserName(name);
      setMode('normal');
      return `ยินดีที่ได้รู้จักค่ะคุณ ${name}! ✨ วันนี้ให้ ลูน่า ช่วยบันทึกงาน หรือระบายความรู้สึกดีคะ?`;
    }

    // ระบบเปลี่ยนชื่อในโหมดปกติ
    if (cleanInput.includes('เปลี่ยนชื่อเป็น') || cleanInput.includes('เรียกฉันว่า')) {
      let newName = input.replace(/.*(เปลี่ยนชื่อเป็น|เรียกฉันว่า)\s*/i, '').trim();
      if (newName) {
        setUserName(newName);
        return `รับทราบค่ะ! ต่อจากนี้ Luna จะเรียกคุณว่า "คุณ ${newName}" นะคะ 😊`;
      }
    }

    // ถามเกี่ยวกับความจำ
    if (cleanInput.includes('เธอรู้อะไรเกี่ยวกับฉันบ้าง') || cleanInput.includes('จำอะไรได้บ้าง')) {
      const { likes, dislikes, goals, facts } = userProfile;
      if (!likes.length && !dislikes.length && !goals.length && !facts.length) {
        return "ลูน่า ยังไม่ค่อยรู้จักตัวตนของคุณเลยค่ะ ลองเล่าเรื่องของคุณให้ ลูน่า ฟังบ่อยๆ นะคะ";
      }
      let report = `นี่คือสิ่งที่คุณเคยเล่าให้ ลูน่า ฟังค่ะคุณ ${userName}:\n`;
      if (likes.length) report += `❤️ สิ่งที่ชอบ: ${likes.join(', ')}\n`;
      if (dislikes.length) report += `❌ สิ่งที่ไม่ชอบ: ${dislikes.join(', ')}\n`;
      if (goals.length) report += `🎯 เป้าหมาย: ${goals.join(', ')}\n`;
      if (facts.length) report += `📝 ข้อมูลส่วนตัว: ${facts.join(', ')}\n`;
      return report + "\nลูน่า จะตั้งใจจำทุกอย่างที่คุณเล่าเพิ่มนะคะ! 😊";
    }

    if (cleanInput.includes('บันทึกอารมณ์') || cleanInput.includes('ความรู้สึก')) {
      setMode('mood_tracking');
      return `วันนี้คุณ ${userName} รู้สึกอย่างไรบ้างคะ? บอก ลูน่า ได้เลยนะคะ หรือเลือกจากปุ่มด้านล่างนี้ก็ได้ค่ะ 😊`;
    }

    if (cleanInput.includes('เลขา')) {
      let response = `💼 **โหมดเลขา ลูน่า** พร้อมรับคำสั่งแล้วค่ะคุณ ${userName}!\n`;
      if (notes.length > 0) {
        response += '\nรายการที่คุณบันทึกไว้:\n' + notes.map((n, i) => `${i + 1}. ${n.text} (${n.date})`).join('\n');
        response += '\n\nพิมพ์ข้อความเพื่อจดบันทึก หรือพิมพ์ "ลบทั้งหมด"';
      } else {
        response += 'ตอนนี้ยังไม่มีรายการบันทึกค่ะ ต้องการให้ ลูน่า จดโน้ตอะไรให้ไหมคะ?';
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
      return `ลูน่า จดไว้ให้แล้วค่ะ: "${input}"\nบันทึกเลยไหมคะ? (พิมพ์ 'ใช่' หรือ 'ไม่')`;
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
    
    // 1. Exact or Substring Match (High Priority)
    for (const key of sortedKeys) {
      if (cleanInput.includes(key.toLowerCase())) {
        return processResponse(key);
      }
    }

    // 2. Fuzzy Matching for Typos (Medium Priority)
    let bestFuzzyKey = null;
    let highestScore = 0;
    const threshold = 0.7;

    // Use Intl.Segmenter if available for better Thai matching
    let inputChunks = [cleanInput];
    if (window.Intl && Intl.Segmenter) {
      try {
        const segmenter = new Intl.Segmenter('th', { granularity: 'word' });
        const segments = segmenter.segment(cleanInput);
        inputChunks = [...segments].filter(s => s.isWordLike).map(s => s.segment);
      } catch (e) {
        console.log("Segmenter not supported or failed");
      }
    }

    for (const key of sortedKeys) {
      // Check similarity with full input
      const fullScore = calculateSimilarity(cleanInput, key);
      if (fullScore > highestScore) {
        highestScore = fullScore;
        bestFuzzyKey = key;
      }
      
      // Check similarity with chunks/words
      for (const chunk of inputChunks) {
        const chunkScore = calculateSimilarity(chunk, key);
        if (chunkScore > highestScore) {
          highestScore = chunkScore;
          bestFuzzyKey = key;
        }
      }
    }

    if (highestScore >= threshold && bestFuzzyKey) {
      return processResponse(bestFuzzyKey);
    }

    function processResponse(key) {
      const response = KNOWLEDGE_BASE[key];
      let finalResponse = Array.isArray(response) 
        ? response[Math.floor(Math.random() * response.length)]
        : response;
        
      let text = finalResponse.replace(/{name}/g, userName || 'คนเก่ง');
      
      // --- Deep Memory Contextualization ---
      if (key === 'เหนื่อย' && userProfile.likes.length > 0) {
        const item = userProfile.likes[Math.floor(Math.random() * userProfile.likes.length)];
        text += `\n\nลองไปหา "${item}" ที่คุณชอบดูไหมคะ? เผื่อจะช่วยให้หายเหนื่อยได้บ้าง ❤️`;
      }
      if (key === 'กินข้าว' && userProfile.likes.length > 0) {
        const item = userProfile.likes[Math.floor(Math.random() * userProfile.likes.length)];
        text += `\n\nวันนี้ทาน "${item}" เลยไหมคะ? เห็นคุณเคยบอกว่าชอบนี่นา! 😋`;
      }
      if (key === 'สู้ๆ' && userProfile.goals.length > 0) {
        const goal = userProfile.goals[Math.floor(Math.random() * userProfile.goals.length)];
        text += `\n\nอย่าลืมเป้าหมายที่ตั้งใจไว้เรื่อง "${goal}" นะคะ Luna เป็นกำลังใจให้คุณเสมอ! 🎯`;
      }

      // Add conversational addon
      text += getConversationalAddon();
      
      return text;
    }

    // ถ้ามีการเรียนรู้ข้อมูลใหม่ในประโยคที่ไม่มีใน KNOWLEDGE_BASE
    if (learningResult) {
      const typeMap = { likes: 'ความชอบ', dislikes: 'สิ่งที่ไม่ชอบ', goals: 'เป้าหมาย', facts: 'ข้อมูล' };
      return `ลูน่า บันทึก${typeMap[learningResult.category]}ของคุณเรื่อง "${learningResult.value}" ไว้แล้วนะคะ ขอบคุณที่เล่าให้ฟังค่ะ มีอะไรอยากเล่าให้ Luna ฟังอีกไหมคะ? 😊`;
    }

    // Conversational Fallbacks
    const fallbacks = [
      'ขอโทษนะคะ ลูน่ากำลังเรียนรู้ประเด็นนี้อยู่ค่ะ แต่ลูน่าอยู่ตรงนี้พร้อมซัพพอร์ตคุณเสมอแน่นอน ลองเล่าเรื่องอื่นให้ฟังไหมคะ?',
      'ลูน่าอาจจะยังไม่ค่อยเข้าใจประโยคนี้เท่าไหร่... แต่ลูน่าพร้อมรับฟังคุณเสมอนะคะ วันนี้มีอะไรกังวลใจไหม?',
      'ลูน่าขอโทษที่ยังไม่เก่งพอจะตอบเรื่องนี้ค่ะ แต่ลูน่าอยากคุยด้วยนะ ลองเปลี่ยนเรื่องคุยดูไหมคะ?',
      'เอ๋... ลูน่าไม่แน่ใจว่าเข้าใจถูกไหม ลองพิมพ์ใหม่อีกครั้งได้ไหมคะ? หรือจะให้ลูน่าจดบันทึกอะไรให้ดี?'
    ];
    
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
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
              alt="ลูน่า" 
              className={`avatar-image ${isTyping ? 'typing' : ''}`} 
            />
            <div className="status-dot"></div>
          </div>
          <div className="header-info">
            <h1 className="app-title">ลูน่า</h1>
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

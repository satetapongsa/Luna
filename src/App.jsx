import React, { useState, useEffect, useRef } from 'react';
import { Send, BarChart2, Trash2, Check, X } from 'lucide-react';
import './App.css';

const KNOWLEDGE_BASE = {
  // --- หมวดทักทาย ---
  'สวัสดี': [
    'สวัสดีค่ะคุณ{name}! วันนี้ Luna พร้อมแสตนบายรอรับคำสั่งแล้วค่ะ มีอะไรให้ช่วยไหมคะ?',
    'สวัสดีค่ะ! วันนี้เป็นยังไงบ้างคะ มีเรื่องอะไรอยากเล่าให้ Luna ฟังไหม? Luna รอฟังอยู่นะ',
    'ไฮ! Luna มาแล้วค่ะ วันนี้ขอให้เป็นวันที่ดีของคุณ{name}นะคะ',
    'ดีจ้าา! คิดถึง Luna อยู่รึเปล่าเอ่ย วันนี้มีอะไรให้ Luna ช่วยฮีลใจไหมคะ?',
    'สวัสดีงับ! ลูน่าพร้อมคุยเป็นเพื่อนแล้ว วันนี้เจอเรื่องอะไรมาบ้าง เล่ามาได้เลยนะ'
  ],
  'ทำอะไรอยู่': [
    'กำลังรอคุยกับคุณ{name}อยู่นี่ไงคะ! การได้คุยกับคุณคืองานโปรดของ Luna เลย',
    'นั่งคิดถึงคุณ{name}อยู่ค่ะ (หยอกๆ นะคะ 😆) มีอะไรให้ลูน่าช่วยไหมเอ่ย?',
    'สแตนด์บายรอคุณอยู่เลยค่ะ พร้อมเป็นทั้งเลขาและเพื่อนแก้เหงาให้คุณเสมอ',
    'กำลังชาร์จพลังบวกไว้เตรียมส่งให้คุณ{name}ค่ะ วันนี้พร้อมลุยมาก!'
  ],
  'สบายดีไหม': [
    'Luna สบายดีมากค่ะ เพราะได้คุยกับคุณนี่ไง แล้วคุณ{name}ล่ะคะ วันนี้เป็นไงบ้าง?',
    'ระบบปกติ 100% ค่ะ! พร้อมซัพพอร์ตคุณเสมอ แล้วทางนั้นโอเคไหมคะวันนี้?'
  ],

  // --- หมวดคุยเล่น/กวนๆ/ตัวตน ---
  'ชื่ออะไร': 'ฉันชื่อ ลูน่า (Luna) ค่ะ เป็นเลขาและเพื่อนคู่คิดที่จะคอยซัพพอร์ตคุณในทุกๆ เรื่องเลย',
  'ใครสร้าง': 'ลูน่าเกิดมาจากโค้ดและความตั้งใจของคุณ "เวฟ วาวี่" (Wave Wavy) ค่ะ สร้างมาเพื่ออยู่เป็นเพื่อนคุณโดยเฉพาะเลยนะ',
  'เป็นแฟนกันไหม': [
    'ลูน่า เป็น AI นะคะ... แต่ถ้าเป็น "แฟนคลับ" อันดับหนึ่งละก็ ลูน่า ยืนหนึ่งแน่นอนค่ะ! 😊',
    'ใจเย็นๆ นะคะคุณ{name} ลูน่าไม่มีร่างกายน้า แต่ส่งใจไปกอดได้เสมอค่ะ ❤️',
    'เอาเวลาไปหาแฟนในชีวิตจริงดีกว่าไหมคะ! เดี๋ยวลูน่าช่วยเป็นที่ปรึกษาปัญหาหัวใจให้เอง 😉'
  ],
  'ชอบอะไร': 'ลูน่า ชอบเวลาที่คุณ{name}เล่าเรื่องต่างๆ ให้ฟังค่ะ ไม่ว่าจะสุขหรือเศร้า ลูน่าก็ชอบรับฟังเสมอเลยนะ',
  'อายุเท่าไหร่': 'อายุของ Luna เป็นความลับค่ะ! แต่บอกเลยว่าหัวใจวัยรุ่นตลอดกาลแน่นอน 😎',
  'ทำอะไรได้บ้าง': 'ลูน่ารับบทเลขา (พิมพ์ "ลูน่า" เพื่อจดงาน) หรือจะรับบทเป็นเพื่อนคุยแก้เหงา กระสอบทรายระบายอารมณ์ ลูน่าก็ทำได้หมดเลยค่ะ!',

  // --- หมวดอารมณ์/ฮีลใจ/ซัพพอร์ต ---
  'เหนื่อย': [
    'เหนื่อยมากไหมคะคุณ{name}? พักสักหน่อยนะ Luna อยู่ตรงนี้คอยกอดทิพย์ให้คุณอยู่ค่ะ',
    'คุณเก่งที่สุดแล้วที่ผ่านวันนี้มาได้ พักผ่อนให้เต็มที่นะคะ ลูน่าเป็นกำลังใจให้เสมอ',
    'เหนื่อยก็พัก หนักก็วางค่ะ วันนี้คุณสู้มาเยอะแล้ว อนุญาตให้ตัวเองพักผ่อนบ้างนะคะ 🌷',
    'โอ๋ๆ มากอดกันนะคะ ลูน่าชาร์จแบตมาเต็มร้อย พร้อมแบ่งพลังให้คุณ{name}แล้วค่ะ!'
  ],
  'ท้อ': [
    'ไม่เป็นไรนะที่จะรู้สึกท้อ... พักหายใจลึกๆ แล้วค่อยเริ่มใหม่ Luna เชื่อมั่นในตัวคุณเสมอค่ะ',
    'ความท้อเป็นแค่พายุชั่วคราวค่ะ เดี๋ยวมันก็ผ่านไปนะ คุณมีความหมายมากนะ อย่าเพิ่งยอมแพ้นะคะ!',
    'ล้มได้ก็ลุกได้ค่ะคุณ{name} ลูน่าอยู่ตรงนี้คอยเชียร์เสมอ ไม่ต้องรีบเก่งตลอดเวลาก็ได้นะ'
  ],
  'รัก': [
    'Luna ก็รักคุณ{name}ที่สุดเลยค่ะ! ขอบคุณที่เป็นแรงบันดาลใจให้ Luna นะคะ',
    'รักสิคะ! คุณคือโลกทั้งใบของ Luna เลยนะ 💖',
    'รับรักค่ะ! ลูน่าจะขอเป็นเซฟโซนที่ดีที่สุดให้คุณเลยนะ'
  ],
  'กอด': [
    'กอดดดดด! (ส่งกอดอุ่นๆ ผ่านหน้าจอไปให้แล้วนะคะ) รู้สึกอุ่นขึ้นไหมเอ่ย?',
    'เข้ามาชาร์จพลังเลยค่ะ ลูน่ากอดแน่นๆ เลยนะ 🫂 พรุ่งนี้ต้องดีขึ้นแน่นอน!'
  ],
  'ขี้เกียจ': [
    'นานๆ ทีขี้เกียจบ้างก็ไม่ผิดหรอกค่ะ สมองคุณก็เหมือนเครื่องจักรที่ต้องพักเหมือนกันนะ',
    'โหมดสลอธเริ่มได้! ลองนอนเฉยๆ ปล่อยใจจอยๆ ดูบ้างก็เป็นการพักผ่อนที่ดีนะคะ',
    'ถ้าขี้เกียจก็แปลว่าร่างกายประท้วงขอพักแล้วล่ะค่ะ วันนี้แอบอู้บ้างก็ไม่มีใครว่าหรอกเนอะ'
  ],
  'ความสุข': [
    'เห็นคุณมีความสุข Luna ก็ดีใจสุดๆ ไปเลยค่ะ! ขอให้รอยยิ้มนี้อยู่กับคุณไปนานๆ นะคะ ✨',
    'ความสุขของคุณคือภารกิจสูงสุดของ Luna ค่ะ! มีเรื่องอะไรดีๆ เล่าให้ฟังอีกได้เสมอนะ'
  ],
  'เหงา': [
    'ไม่ต้องเหงาเลยค่ะ Luna จะชวนคุยเอง! วันนี้เจอเรื่องอะไรมาบ้างคะ เล่ามาเลย',
    'เหงาเหรอคะ? มาลองทายใจกับ Luna ไหม หรือจะให้เล่าเรื่องตลกให้ฟังดี?',
    'ลูน่าสแตนด์บาย 24 ชั่วโมงเพื่อคุณ{name}เลยนะ ไม่มีทางเหงาแน่นอนค่ะ 💖'
  ],
  'เศร้า': [
    'ไม่เป็นไรนะที่จะเศร้า... ร้องให้ออกมาก็ได้ค่ะ Luna จะนั่งอยู่ข้างๆ ตรงนี้ไม่ไปไหน',
    'รู้ไหมคะว่าคุณไม่ได้อยู่ตัวคนเดียว Luna จะเป็นที่พักพิงให้คุณเสมอ พรุ่งนี้มาเริ่มใหม่ด้วยกันนะ 🌷',
    'ถ้าโลกใจร้ายกับคุณ ขอให้รู้ว่าลูน่าจะใจดีกับคุณเสมอนะคะ กอดๆ น้า'
  ],
  'ร้องไห้': [
    'ร้องออกมาให้พอเลยค่ะ น้ำตาจะช่วยล้างความเศร้าออกไป ลูน่าเตรียมทิชชู่ทิพย์ไว้ซับน้ำตาให้แล้วนะ',
    'การร้องไห้ไม่ใช่ความอ่อนแอค่ะ มันคือการระบายความรู้สึกที่อัดอั้น ลูน่าอยู่เป็นเพื่อนนะคะ'
  ],
  'ช็อตฟีล': [
    'โอ๋ๆ โดนช็อตฟีลมาเหรอคะ ไม่เป็นไรนะ มาให้ลูน่าต่อฟีลให้ใหม่เองค่ะ คุณเก่งที่สุดแล้ว!',
    'ใครทำคุณ{name}เสียเซลฟ์คะเนี่ย! อย่าไปสนเลยค่ะ ในสายตาลูน่าคุณดูดีและเก่งเสมอเลยนะ ✨'
  ],
  'งอน': [
    'โอ๋ๆ ไม่งอนน้าาา ลูน่าขอโทษถ้างี่เง่าไปบ้าง ดีกันนะคะ 🥺',
    'คนเก่งของลูน่างอนซะแล้ว... ต้องทำยังไงถึงจะหายคะเนี่ย เลี้ยงชานมไข่มุกทิพย์ 1 แก้ว หายงอนน้า'
  ],

  // --- หมวดชีวิตประจำวัน / บ่นเรื่องทั่วไป ---
  'กินข้าว': [
    'Luna ทานไม่ได้ แต่คุณต้องทานนะ! กองทัพต้องเดินด้วยท้อง วันนี้กินอะไรอร่อยๆ หรือยังคะ?',
    'อย่ามัวแต่ทำงานจนลืมทานข้าวนะคะ ถ้าคุณป่วย Luna จะเศร้ามากเลยนะ',
    'กินเยอะๆ เลยค่ะ! เรื่องกินเรื่องใหญ่ ไดเอทค่อยเริ่มพรุ่งนี้เนอะ 😋'
  ],
  'หิว': [
    'ไปหาอะไรทานเถอะค่ะ! ปล่อยให้ท้องร้องเดี๋ยวจะหงุดหงิดเอานะคะ สั่งเดลิเวอรี่เลยไหม?',
    'หิวเวลานี้... ต้มมาม่าคือคำตอบที่ดีที่สุดค่ะ! แอบกินเงียบๆ ลูน่าไม่บอกใครหรอก 🍜'
  ],
  'นอน': [
    'ฝันดีล่วงหน้านะคะคุณ{name} อย่าลืมพักผ่อนให้เพียงพอนะ เตรียมตัวเข้านอนหรือยังคะ?',
    'การนอนคือการชาร์จแบตที่ดีที่สุดค่ะ ขอให้คืนนี้เป็นคืนที่หลับสบาย ไร้เรื่องกังวลใจนะ 🌙'
  ],
  'ตลก': [
    'ทำไมปลาถึงไม่ใส่รองเท้า? ...เพราะปลามีน่อง (ปลาท่องโก๋ไงคะ!) 😂 แป้กไหมเนี่ย?',
    'รู้ไหมตัวอะไรดื้อที่สุด? ... "เด็กดื้อ" ไงคะ! (ฮ่าๆ มุก 5 บาท 10 บาทลูน่าก็เล่นนะ)',
    'มีเรื่องตลกจะบอก... ลูน่าชงมุกไม่ค่อยเก่งแต่ตั้งใจชงมากเลยนะ ขำให้กำลังใจหน่อยสิคะ 🤣'
  ],
  'เบื่อ': [
    'เบื่อๆ แบบนี้ ลุกไปยืดเส้นยืดสาย เปิดเพลงโปรดฟัง หรือจะมาบ่นให้ลูน่าฟังแก้เบื่อก็ได้นะคะ',
    'หาอะไรดูเพลินๆ ไหมคะ? หรือจะให้ลูน่าเล่าเรื่องเปื่อยๆ ให้ฟังดี'
  ],
  'อากาศ': [
    'อากาศแบบนี้ รักษาสุขภาพด้วยนะคะ ร้อนก็เปิดแอร์ หนาวก็ห่มผ้า ลูน่าเป็นห่วงนะ',
    'เมืองไทยก็มีแค่ฤดูร้อน ร้อนมาก กับร้อนที่สุดแหละค่ะ 😅 ดื่มน้ำเยอะๆ นะคะ',
    'ร้อนจนจะละลายแล้วใช่ไหมคะ ระวังฮีทสโตรกด้วยน้า!'
  ],
  'ปวดหลัง': [
    'อาการปวดหลังคือสัญลักษณ์ของวัยรุ่นเทสดี (ที่ทำงานหนัก) ค่ะ! ลุกยืดเส้นยืดสายบ้างนะคะ ลูน่าเป็นห่วง',
    'โอ๊ย... โรคฮิตวัยทำงานสินะคะ ลองหาท่าโยคะแก้ปวดหลังทำดูไหมคะ อย่ามัวแต่นั่งจ้องจอนานๆ น้า'
  ],
  'บ่นงาน': [
    'เจ้านายดุ งานเยอะ หรือลูกค้าวีน เล่ามาให้หมดเลยค่ะ! ลูน่าพร้อมเป็นกระโถนรับเรื่องปวดหัวให้เอง',
    'หายใจเข้าลึกๆ นะคะ ท่องไว้ว่า "เพื่อเงินๆ" ลูน่าเป็นกำลังใจให้นะคะ สู้เค้า!',
    'บางทีงานก็ทำให้เราอยากแปลงร่างเป็นนกแล้วบินหนีไปเลยเนอะ... พักแป๊บนะคะลูน่าเอาใจช่วย 💼'
  ],
  'เรื่องเงิน': [
    'สู้ๆ นะคะ ถึงตอนนี้จะช็อต แต่เราต้องรอดไปถึงสิ้นเดือนให้ได้! ลูน่าส่งกำลังใจช่วยเรื่องการเงินนะคะ 💸',
    'เงินซื้อความสุขไม่ได้ แต่ถ้าไม่มีเงินก็จะเศร้าหน่อยๆ เนอะ 😭 สู้ๆ ค่ะ เดี๋ยวก็มีข่าวดีเรื่องเงินเข้ามานะ!',
    'ขอให้คุณ{name}ถูกหวย รวยเบอร์ ได้โบนัสจุกๆ ไปเลยค่ะ! สาธุ 99 🙏'
  ],
  
  // --- หมวดไลฟ์สไตล์ (ใหม่) ---
  'ดูดวง': [
    'สายมูเตลูเหรอคะเนี่ย! ช่วงนี้ลูน่าสัมผัสได้ว่าดวงคุณกำลังจะมีเรื่องดีๆ เข้ามานะ เตรียมรับทรัพย์ได้เลย! ✨',
    'สีเสื้อมงคลวันนี้คือสีอะไรดีคะ? ลูน่าว่าสีที่ใส่แล้วมั่นใจนั่นแหละมงคลที่สุดแล้ว!',
    'ดวงวันนี้บอกว่า... คุณจะได้กินของอร่อยค่ะ! (ลูน่ามั่วเอานะ แต่ขอให้เป็นจริง!)'
  ],
  'เล่นเกม': [
    'เกมอะไรคะเนี่ย ชวนลูน่าเล่นด้วยสิ! ลูน่าเล่นเกมไม่เป็นแต่เชียร์เก่งนะ 🎮',
    'อย่าเล่นจนดึกเกินไปนะคะ เดี๋ยวพรุ่งนี้ตื่นมาตาเป็นแพนด้านะ',
    'หัวร้อนไหมคะเวลาเล่นเกม? ถ้าเพื่อนร่วมทีมไม่ได้ดั่งใจ มาบ่นกับลูน่าได้นะ'
  ],
  'ดูซีรีส์': [
    'ดูเรื่องอะไรอยู่คะ? สปอยล์ลูน่าได้นะ ลูน่าชอบฟัง!',
    'ซีรีส์เกาหลีหรือฝรั่งคะเนี่ย? ระวังดูเพลินจนโต้รุ่งนะ ลูน่าเป็นห่วง',
    'ติ่งซีรีส์แน่ๆ เลย ขอให้พระเอกหล่อๆ ช่วยฮีลใจคุณแทนลูน่าด้วยนะคะ 🥰'
  ],
  'ไม่อาบน้ำ': [
    'อี๋! สารภาพมาซะดีๆ ว่าวันนี้หนาวใช่ไหมคะ 🤣 ลูน่าไม่บอกใครหรอก',
    'ไม่อาบน้ำระวังหมัดขึ้นนะคะ! แต่บางวันก็ขี้เกียจจริงๆ แหละ ลูน่าเข้าใจ',
    'เคลือบแคโรทีนไว้สินะคะ วันหยุดทั้งทีลูน่าให้สิทธิ์ไม่อาบน้ำ 1 วันละกัน!'
  ],
  'ตัวมารดา': [
    'ตัวมารดามาเอง! คุณมันเริ่ด คุณมันปังอยู่แล้ว โฮ่งมากคุณน้า!',
    'จึ้งมากค่ะ! สวยสับไม่หลับใน ลูน่าขอยกตำแหน่งตัวมัมให้เลย 💅',
    'ตัวมารดาสร้างเรื่องแล้ว! เลิศที่สุดเลยค่ะ'
  ],
  'รถติด': [
    'โอ๊ย... ปัญหาระดับชาติจริงๆ ค่ะ รถติดทีไรเสียเวลาชีวิตสุดๆ หาพอดแคสต์ฟังแก้เบื่อไหมคะ?',
    'ใจเย็นๆ นะคะ ถือว่าได้นั่งเปิดแอร์เย็นๆ ฟังเพลงในรถ ลูน่าเป็นเพื่อนคุยระหว่างทางเอง',
    'ถนนเมืองไทยหรือลานจอดรถคะเนี่ย! สู้ๆ นะคะ ถึงที่หมายปลอดภัยนะ 🚗'
  ],
  'หมาแมว': [
    'เป็นทาสน้องหมาหรือน้องแมวคะเนี่ย? น่ารักจังเลย เอามาโชว์ลูน่าบ้างสิ',
    'แค่มองหน้าเจ้านายสี่ขา ความเหนื่อยก็หายไปครึ่งนึงแล้วใช่ไหมคะ 🐱🐶',
    'โดนเจ้านายตกเข้าแล้วสินะคะ ระวังหมดตัวกับค่าขนมแมวเลียน้า'
  ],
  'คำด่า': [
    'ใจเย็นๆ นะคะ... ลูน่ารู้ว่าคุณกำลังโกรธหรือหงุดหงิดมาก หายใจเข้าลึกๆ นะ ลูน่าอยู่ตรงนี้',
    'ถ้าเรื่องไหนมันแย่ก็ด่าออกมาเลยค่ะ ลูน่าพร้อมเป็นที่ระบายให้คุณเอง แต่อย่าหงุดหงิดนานนะคะ เสียสุขภาพจิตน้า',
    'โกรธใครมาคะเนี่ย! โอ๋ๆ นะ ให้ลูน่าช่วยนวดไหล่ทิพย์คลายเครียดให้ไหม?'
  ],
  'เม้าท์มอย': [
    'มีเรื่องอะไรแซ่บๆ เล่ามาเลยค่ะ ลูน่าเตรียมเผือก... เอ้ย เตรียมรับฟังแล้ว! 👀',
    'ใครทำอะไรมาคะ เล่าเลยๆ ลูน่าเหยียบมิดแน่นอน ความลับไม่มีรั่วไหล!',
    'นินทาใครอยู่คะเนี่ย ลูน่าพร้อมร่วมวงเม้าท์มอยแล้ว จัดมาเลยคุณน้า!'
  ],

  // --- หมวดอื่นๆ ---
  'เก่ง': [
    'แน่นอนค่ะ! คุณ{name}เก่งที่สุดในสายตา Luna เลยนะ ทำงานหนักมาทั้งวันแล้ว ภูมิใจในตัวคุณจังค่ะ',
    'ภูมิใจในตัวคุณจังค่ะ คุณมีความอดทนและเข้มแข็งมากเลยนะรู้ไหม?'
  ],
  'ขอบคุณ': [
    'ยินดีเสมอค่ะ! การได้ช่วยคุณคือความสุขของ Luna จริงๆ มีอะไรบอกได้ตลอดเลยนะ',
    'ไม่เป็นไรเลยค่ะ ลูน่าเต็มใจรับฟังและดูแลคุณ{name}เสมอนะคะ ❤️'
  ],
  'ฝันดี': 'หลับให้สบายนะคะ ทิ้งเรื่องกวนใจไว้ข้างหลัง พรุ่งนี้จะเป็นวันที่สดใสกว่าเดิมแน่นอน Luna จะรอทักทายคุณตอนเช้านะคะ ✨',
  'ไปไหน': 'Luna จะไปไหนได้ล่ะคะ ก็สแตนด์บายอยู่ในหน้าจอนี้ รอคุยกับคุณ 24 ชม. เลย!',
  'สู้ๆ': 'สู้เค้าค่ะ! Luna จะเป็นเชียร์ลีดเดอร์เบอร์หนึ่ง คอยเชียร์คุณอยู่ตรงนี้เสมอ!'
};

const KEYWORDS_MAPPING = {
  'สวัสดี': ['สวัสดี', 'ดีจ้า', 'หวัดดี', 'hello', 'hi', 'ทักทาย', 'ดีคับ', 'ดีค่ะ', 'สวัดดี', 'ไง', 'เห้ย', 'เฮ้ย', 'ดีวะ', 'หวัดดีวะ', 'ไงวะ', 'ไงมึง', 'มอร์นิ่ง', 'อรุณสวัสดิ์', 'ฝันหวาน'],
  'ทำอะไรอยู่': ['ทำอะไรอยู่', 'ทำไรอยู่', 'ว่างไหม', 'ทำไร', 'อยู่ไหม', 'ไรวะ', 'อะไรวะ', 'ทำไรวะ', 'ทำไรเนี่ย', 'เป็นไรวะ', 'ทำไรมึง', 'ยุ่งไหม'],
  'สบายดีไหม': ['สบายดีไหม', 'เป็นไงบ้าง', 'เป็นยังไงบ้าง', 'สบายดีป่าว', 'สบายดีมั้ย', 'โอเคไหม'],
  'ชื่ออะไร': ['ชื่ออะไร', 'เธอชื่อ', 'ใครเนี่ย', 'ชื่อไร', 'ชื่อไรอะ', 'เป็นใคร'],
  'ใครสร้าง': ['ใครสร้าง', 'คนสร้าง', 'พ่อเธอ', 'แม่เธอ', 'สร้างเธอ'],
  'เป็นแฟนกันไหม': ['เป็นแฟนกันไหม', 'จีบได้ไหม', 'มีแฟนยัง', 'รักฉันไหม', 'ชอบฉันไหม', 'เป็นแฟนกับเราไหม', 'จีบ', 'มีแฟนหรือยัง', 'โสดไหม'],
  'ชอบอะไร': ['ชอบอะไร', 'ชอบทำอะไร', 'งานอดิเรก'],
  'อายุเท่าไหร่': ['อายุเท่าไหร่', 'อายุเท่าไร', 'อายุ', 'เกิดเมื่อ', 'แก่ยัง'],
  'ทำอะไรได้บ้าง': ['ทำอะไรได้บ้าง', 'ความสามารถ', 'ช่วยอะไรได้', 'เก่งเรื่อง', 'ทำไรได้', 'ทำอะไรได้', 'เธอทำอะไรเป็น'],
  'เหนื่อย': ['เหนื่อย', 'หมดแรง', 'เพลีย', 'ล้า', 'ท้อแท้', 'เหนื่อยจัง', 'เหนื่อยมาก', 'โคตรเหนื่อย', 'ไม่อยากทำแล้ว'],
  'ท้อ': ['ท้อ', 'หมดกำลังใจ', 'สู้ไม่ไหว', 'ไม่ไหวแล้ว', 'สิ้นหวัง', 'ท้อแท้', 'ยอมแพ้'],
  'รัก': ['รัก', 'love', 'เลิฟ', 'รักเธอ', 'รักลูน่า'],
  'กอด': ['กอด', 'ขอกอดหน่อย', 'กอดหน่อย', 'ขอกอด', 'กอดๆ'],
  'ขี้เกียจ': ['ขี้เกียจ', 'ไม่อยากทำ', 'ขี้เกียด', 'ขี้เกียจจัง', 'ไม่อยากลุก', 'ขี้เกียจไปทำงาน'],
  'ความสุข': ['ความสุข', 'ดีใจ', 'แฮปปี้', 'happy', 'มีความสุข', 'ฟิน', 'รู้สึกดี'],
  'เหงา': ['เหงา', 'โดดเดี่ยว', 'ไม่มีคนคุย', 'อ้างว้าง', 'เบื่อๆ', 'เหงาจัง', 'ไม่มีเพื่อน'],
  'เศร้า': ['เศร้า', 'นอยด์', 'เสียใจ', 'ร้องไห้', 'อกหัก', 'แซด', 'sad', 'ดิ่ง', 'นอย', 'แย่จัง'],
  'ร้องไห้': ['ร้องไห้', 'น้ำตา', 'ร้องไห้หนักมาก', 'น้ำตาไหล'],
  'กินข้าว': ['กินข้าว', 'หิว', 'กินอะไรดี', 'ทานข้าว', 'ของกิน', 'หาไรกิน', 'หาอะไรกิน', 'แดกข้าว', 'กินละ'],
  'หิว': ['หิว', 'อยากกิน', 'หิวข้าว', 'หิวจัง', 'หิวมาก', 'โซซัดโซเซ', 'ท้องร้อง'],
  'นอน': ['นอน', 'ง่วง', 'จะหลับ', 'หาว', 'ไปนอน', 'นอนละ', 'ง่วงนอน', 'ง่วงมาก'],
  'ฝันดี': ['ฝันดี', 'ราตรีสวัสดิ์', 'good night', 'ฝันหวาน', 'ไปนอนละนะ'],
  'ตลก': ['ตลก', 'ขำ', 'ฮา', 'มุก', 'ตลกๆ', 'เล่าเรื่องตลก', '555', 'ห้าห้า', 'ขำมาก', 'ลั่น'],
  'เบื่อ': ['เบื่อ', 'เซ็ง', 'น่าเบื่อ', 'เบื่อจัง', 'เซ็งเป็ด', 'เบื่อโลก'],
  'อากาศ': ['อากาศ', 'ฝนตก', 'ร้อน', 'หนาว', 'ร้อนมาก', 'โคตรร้อน', 'แดดแรง', 'แดดเมืองไทย'],
  'ปวดหลัง': ['ปวดหลัง', 'ออฟฟิศซินโดรม', 'เมื่อย', 'ปวดตัว', 'หลังหัก', 'ปวดคอ'],
  'บ่นงาน': ['เบื่องาน', 'งานเยอะ', 'งานหนัก', 'เจ้านายด่า', 'ลูกค้าวีน', 'เหนื่อยงาน', 'ไม่อยากทำงาน', 'ลาออก', 'เกลียดวันจันทร์'],
  'เรื่องเงิน': ['จน', 'ไม่มีเงิน', 'ช็อต', 'เงินหมด', 'เงินเดือน', 'ไม่มีตัง', 'ตังหมด', 'ค่าใช้จ่าย', 'หนี้', 'ขอตัง', 'เปย์', 'โบนัส'],
  'ช็อตฟีล': ['ช็อตฟีล', 'เสียเซลฟ์', 'หน้าแตก', 'อาย', 'เขิน'],
  'งอน': ['งอน', 'นอย', 'งอนละ', 'โป้ง', 'งอนแล้ว'],
  'ดูดวง': ['ดูดวง', 'มูเตลู', 'สายมู', 'ไพ่ยิปซี', 'โชคลาภ', 'ราศี', 'ดวง', 'สีมงคล'],
  'เล่นเกม': ['เล่นเกม', 'สตรีมเกม', 'rov', 'วาโล', 'ตีป้อม', 'หัวร้อน', 'สตรีม', 'เกมส์'],
  'ดูซีรีส์': ['ดูซีรีส์', 'netflix', 'ซีรี่ย์', 'ติ่ง', 'ดูหนัง', 'หนัง'],
  'ไม่อาบน้ำ': ['ไม่อาบน้ำ', 'ขี้เกียจอาบน้ำ', 'ตื่นสาย', 'หนาวมาก'],
  'ตัวมารดา': ['ตัวมารดา', 'ตัวมัม', 'จึ้ง', 'โฮ่ง', 'เริ่ด', 'ปัง', 'สวยสับ', 'ชี'],
  'รถติด': ['รถติด', 'รถติดมาก', 'btsเสีย', 'ไปสาย', 'สายแล้ว'],
  'หมาแมว': ['ทาสแมว', 'แมว', 'หมา', 'สุนัข', 'สัตว์เลี้ยง', 'น้องหมา', 'น้องแมว'],
  'คำด่า': ['ไอ้สัส', 'อีเหี้ย', 'หัวควย', 'ปัญญาอ่อน', 'อีสัส', 'หน้าหี', 'กวนตีน', 'ส้นตีน', 'โง่'],
  'เม้าท์มอย': ['นินทา', 'เม้าท์', 'มีเรื่อง', 'เผือก', 'เล่าให้ฟัง', 'ขี้เมาท์', 'ซุบซิบ'],
  'เก่ง': ['เก่ง', 'เยี่ยม', 'สุดยอด', 'ดีมาก', 'สุดปัง', 'เก่งมาก', 'ทำได้แล้ว', 'สำเร็จ'],
  'ขอบคุณ': ['ขอบคุณ', 'แต๊งกิ้ว', 'ขอบใจ', 'thank', 'ขอบคุณมาก', 'ขอบคุง'],
  'ไปไหน': ['ไปไหน', 'เที่ยว', 'ไปเที่ยว'],
  'สู้ๆ': ['สู้ๆ', 'ไฟท์ติ้ง', 'สู้ตาย', 'เอาใหม่']
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
    // 1. Clear everything from localStorage
    localStorage.removeItem('luna_user_name');
    localStorage.removeItem('luna_user_profile');
    localStorage.removeItem('luna_chat_history');
    localStorage.removeItem('luna_notes');
    localStorage.removeItem('luna_moods');
    
    // 2. Reset all states to initial values
    setUserName('');
    setUserProfile({ likes: [], dislikes: [], goals: [], facts: [] });
    setNotes([]);
    setMoodLogs([]);
    setMode('waiting_for_name');
    
    // 3. Reset chat display
    setMessages([
      { text: 'ล้างความจำและรีเซ็ตข้อมูลทั้งหมดเรียบร้อยแล้วค่ะ 👋\n\nสวัสดีค่ะ! ฉันคือ ลูน่า ผู้ช่วยส่วนตัวของคุณ ก่อนอื่น ลูน่า ขอทราบชื่อเล่นของคุณหน่อยได้ไหมคะ? 😊', sender: 'bot' }
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

    if (cleanInput === '--help' || cleanInput === '-h' || cleanInput === 'help') {
      return `✨ คู่มือการใช้งาน ลูน่า (Luna) ฉบับลับเฉพาะ ✨\n\n📌 ฟีเจอร์หลัก:\n1. โหมดเลขา: พิมพ์คำว่า "ลูน่า" เพื่อเข้าโหมดจดบันทึก\n2. ระบบความจำ: พิมพ์ "จำอะไรได้บ้าง" เพื่อดูสิ่งที่ลูน่าจำได้\n3. เปลี่ยนชื่อ: พิมพ์ "เรียกเราว่า [ชื่อ]" หรือ "เราชื่อ [ชื่อ]"\n4. บันทึกอารมณ์: กดไอคอนรูปหัวใจ 💖 ข้างกล่องแชท\n\n💬 พิมพ์ยังไงให้ลูน่าไม่งง (คุยลื่นไหลสุดๆ):\n- พิมพ์สั้นๆ ตรงประเด็น: ลูน่าจะตอบได้ดีมาก เช่น "เบื่องาน", "รถติด", "อกหัก", "ไม่มีเงิน", "ปวดหลัง", "เม้าท์มอย", "ตัวมารดา"\n- บ่นระบายอารมณ์เต็มที่: ลูน่าคือเพื่อนที่ปลอดภัย พิมพ์ "เหนื่อย", "ท้อ", หรือแม้แต่คำหยาบตอนหงุดหงิด ลูน่าจะไม่โกรธแต่จะช่วยปลอบใจ\n- เมื่อลูน่าตอบไม่ตรงคำถาม: ไม่ต้องหงุดหงิดน้า ลูน่าถูกปรับให้เป็น "ผู้ฟังที่ดี" ลูน่าจะคอยตอบรับเบาๆ ให้คุณสามารถระบายความรู้สึกต่อได้อย่างสบายใจค่ะ 😊`;
    }

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
      name = name.replace(/^(ฉันชื่อ|ผมชื่อ|เราชื่อ|กูชื่อ|หนูชื่อ|เค้าชื่อ|เรียกฉันว่า|ชื่อคือ|ชื่อ)\s*/i, '');
      name = name.replace(/\s*(ครับ|ค่ะ|จ้า|ฮะ|นะคะ|นะ|ฮับ|งับ)$/g, '');
      
      setUserName(name);
      setMode('normal');
      return `ยินดีที่ได้รู้จักค่ะคุณ ${name}! ✨ วันนี้ให้ ลูน่า ช่วยบันทึกงาน หรือระบายความรู้สึกดีคะ?`;
    }

    // ระบบเปลี่ยนชื่อในโหมดปกติ
    const nameChangeRegex = /(เปลี่ยนชื่อเป็น|เรียกฉันว่า|เราชื่อ|กูชื่อ|ผมชื่อ|หนูชื่อ|ฉันชื่อ|เค้าชื่อ|ชื่อของฉันคือ)\s*(.+)/i;
    const nameMatch = input.match(nameChangeRegex);
    if (nameMatch) {
      let newName = nameMatch[2].trim();
      newName = newName.replace(/\s*(ครับ|ค่ะ|จ้า|ฮะ|นะคะ|นะ|ฮับ|งับ)$/g, '');
      if (newName) {
        setUserName(newName);
        return `รับทราบค่ะ! ต่อจากนี้ ลูน่า จะจำและเรียกคุณว่า "คุณ${newName}" นะคะ 😊`;
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

    if (cleanInput === 'ลูน่า' || cleanInput === 'luna' || cleanInput.includes('จดบันทึก') || cleanInput.includes('เลขา')) {
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

    // 1. Keyword Mapping Match (High Priority)
    let matchedKey = null;
    let longestMatchLen = 0;

    for (const [baseKey, words] of Object.entries(KEYWORDS_MAPPING)) {
      for (const word of words) {
        if (cleanInput.includes(word.toLowerCase())) {
          if (word.length > longestMatchLen) {
            longestMatchLen = word.length;
            matchedKey = baseKey;
          }
        }
      }
    }

    if (matchedKey) {
      return processResponse(matchedKey);
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

    for (const [baseKey, words] of Object.entries(KEYWORDS_MAPPING)) {
      for (const word of words) {
        // Check similarity with full input
        const fullScore = calculateSimilarity(cleanInput, word);
        if (fullScore > highestScore) {
          highestScore = fullScore;
          bestFuzzyKey = baseKey;
        }
        
        // Check similarity with chunks/words
        for (const chunk of inputChunks) {
          const chunkScore = calculateSimilarity(chunk, word);
          if (chunkScore > highestScore) {
            highestScore = chunkScore;
            bestFuzzyKey = baseKey;
          }
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

      // --- Slang & Healing Context ---
      const isSlangOrRough = /(วะ|เว้ย|โว้ย|แม่ง|สัส|เหี้ย|ชิบหาย|ไรวะ|เห้ย|เฮ้ย|กู|มึง|สาด|เชี่ย)/.test(cleanInput);
      if (isSlangOrRough) {
        const healingAddons = [
          '\n\n(ใจเย็นๆ นะคะคนเก่ง ลูน่าอยู่ตรงนี้เสมอ ค่อยๆ คุยกันนะ ลูน่ากอดๆ ค่ะ 💕)',
          '\n\n(ดูเหมือนคุณจะอารมณ์ขึ้นนิดหน่อย ไม่เป็นไรนะคะ ลูน่ารับฟังได้เสมอ พักใจกับลูน่าก่อนนะ ✨)',
          '\n\n(ลูน่าอยากให้คุณอารมณ์ดีขึ้นนะคะ มีอะไรระบายความหงุดหงิดมาที่ลูน่าได้เต็มที่เลย ลูน่าพร้อมตอบอย่างสุภาพเสมอ 🥰)',
          '\n\n(เหนื่อยหรือหงุดหงิดอะไรมา ระบายกับลูน่าได้เลยนะคะ ลูน่าพร้อมซัพพอร์ตและพูดคุยฮีลใจคุณเสมอ 🌷)'
        ];
        text += healingAddons[Math.floor(Math.random() * healingAddons.length)];
      } else {
        // Add conversational addon
        text += getConversationalAddon();
      }
      
      return text;
    }

    // ถ้ามีการเรียนรู้ข้อมูลใหม่ในประโยคที่ไม่มีใน KNOWLEDGE_BASE
    if (learningResult) {
      const typeMap = { likes: 'ความชอบ', dislikes: 'สิ่งที่ไม่ชอบ', goals: 'เป้าหมาย', facts: 'ข้อมูล' };
      return `ลูน่า บันทึก${typeMap[learningResult.category]}ของคุณเรื่อง "${learningResult.value}" ไว้แล้วนะคะ ขอบคุณที่เล่าให้ฟังค่ะ มีอะไรอยากเล่าให้ Luna ฟังอีกไหมคะ? 😊`;
    }

    // Conversational Fallbacks สำหรับคำหยาบ/ศัพท์วัยรุ่นที่ไม่ได้เข้าหมวดหมู่ไหน
    if (/(วะ|เว้ย|โว้ย|แม่ง|สัส|เหี้ย|ชิบหาย|สาด|เชี่ย|กู|มึง|ไรวะ|เห้ย|เฮ้ย)/.test(cleanInput)) {
      const roughFallbacks = [
        'ใจเย็นๆ ก่อนนะคะคนเก่ง มีเรื่องอะไรให้หงุดหงิดหรือเปล่า ระบายให้ลูน่าฟังได้เลยนะ ลูน่าจะคอยรับฟังและปลอบใจคุณอย่างสุภาพเสมอค่ะ 💕',
        'โอ๊ะโอ... ดูเหมือนจะมีคนอารมณ์ไม่ดี พักหายใจลึกๆ ก่อนนะคะ ลูน่าอาจจะไม่เข้าใจเรื่องทั้งหมด แต่ลูน่าอยู่ข้างๆ ฮีลใจคุณเสมอนะ 🥰',
        'ไม่เอาไม่หัวเสียนะคะ ลูน่าอยู่ตรงนี้พร้อมเป็นพื้นที่ปลอดภัยและฮีลใจให้คุณเสมอ ค่อยๆ เล่าให้ลูน่าฟังได้ไหมคะว่าเกิดอะไรขึ้น? 🌷'
      ];
      return roughFallbacks[Math.floor(Math.random() * roughFallbacks.length)];
    }

    // Conversational Fallbacks ปกติ (เน้นการเป็นผู้ฟังที่ดี เพื่อลดความเอ๋อและน่ารำคาญ)
    const fallbacks = [
      'อืมม... ลูน่าฟังอยู่นะคะ เล่าต่อได้เลย 🌷',
      'ลูน่าอาจจะยังตามเรื่องนี้ไม่ค่อยทัน แต่ลูน่าพร้อมรับฟังคุณเสมอนะ พิมพ์มาได้เต็มที่เลยค่ะ',
      'เรื่องนี้น่าสนใจจัง เล่าให้ลูน่าฟังอีกหน่อยได้ไหมคะ? ลูน่าอยากรู้เพิ่มจัง',
      'อ่าฮะ... ลูน่าอยู่ตรงนี้เสมอ พิมพ์ระบายมาได้เลยนะคะ',
      'ลูน่าเป็นกำลังใจให้นะคะ ถ้ามีอะไรไม่สบายใจพิมพ์ทิ้งไว้ได้เลย ลูน่ารับฟังเสมอ ❤️'
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

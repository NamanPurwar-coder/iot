/* ============================================================
   RoboQuest — English / Hindi language switching
   - Defaults to English on every page load
   - The header button switches to Hindi and back
   - Translates static copy, attributes and metadata
   - Exposes RQ_I18N.t() for dynamic UI strings
   ============================================================ */

(() => {
  "use strict";

  const SUPPORTED = ["en", "hi"];

  const STRINGS = {
    en: {
      "meta.home.title": "RoboQuest — Build Real Robots | STEM Robotics & IoT for Class 6–8",
      "meta.home.description": "A hands-on robotics and IoT lab for Class 6, 7 and 8. Kids wire circuits, code Arduino projects and build real robots through a complete design-to-showcase journey.",
      "meta.home.ogTitle": "RoboQuest — Build robots. Make ideas move.",
      "meta.home.ogDescription": "Hands-on STEM robotics and IoT for Class 6–8. Real circuits, real code, real projects.",
      "meta.credits.title": "Photo credits — RoboQuest",
      "meta.credits.description": "Photo sources, creators and licences for the real-world student and project photography used in RoboQuest build plans.",
      "lang.switchToHindi": "Switch to Hindi",
      "lang.switchToEnglish": "Switch to English",
      "lang.hindi": "हिंदी",
      "lang.english": "English",
      "nav.openMenu": "Open menu",
      "nav.closeMenu": "Close menu",
      "journey.sessionShort": "Session {n}",
      "journey.next": "Next: {label}",
      "journey.back": "Back to stage 1: {label}",
      "journey.announce": "Stage {n} of {total}: {title}.",
      "projects.statusAll": "Showing all {count} student builds.",
      "projects.statusClass": "Showing {count} Class {n} builds.",
      "class.label": "Class {n}",
      "modal.bookTrack": "Book the Class {n} track",
      "sim.run": "Run test",
      "sim.testing": "Testing…",
      "sim.statusStopped": "Obstacle detected — the brake branch just saved the rover.",
      "sim.statusClear": "All clear — the rover is rolling forward.",
      "sim.brake": "Brake branch active · motors stopped",
      "sim.loop": "Loop running · 20 checks every second",
      "form.nameError": "Please add the student's name (at least 2 letters).",
      "form.classError": "Choose a class so we can plan the right session.",
      "form.emailError": "Please add a parent email we can reply to.",
      "form.emailInvalid": "That email doesn't look quite right. Please check it.",
      "form.successNoBatch": "Thanks, {name}. Your booking request for Class {n} is saved. We'll contact you within one school day with available batch times.",
      "form.successBatch": "Thanks, {name}. Your booking request for Class {n} is saved. We'll contact you within one school day with {batch} options."
    },
    hi: {
      "meta.home.title": "RoboQuest — असली रोबोट बनाएँ | कक्षा 6–8 के लिए STEM रोबोटिक्स और IoT",
      "meta.home.description": "कक्षा 6, 7 और 8 के लिए प्रैक्टिकल रोबोटिक्स और IoT लैब। बच्चे सर्किट जोड़ते हैं, Arduino प्रोजेक्ट कोड करते हैं और पूरे डिज़ाइन-से-शोकेस सफ़र में असली रोबोट बनाते हैं।",
      "meta.home.ogTitle": "RoboQuest — रोबोट बनाएँ। आइडिया को गति दें।",
      "meta.home.ogDescription": "कक्षा 6–8 के लिए प्रैक्टिकल STEM रोबोटिक्स और IoT। असली सर्किट, असली कोड, असली प्रोजेक्ट।",
      "meta.credits.title": "फ़ोटो क्रेडिट — RoboQuest",
      "meta.credits.description": "RoboQuest बिल्ड प्लान में इस्तेमाल हुई असली छात्र और प्रोजेक्ट फ़ोटोग्राफ़ी के स्रोत, निर्माता और लाइसेंस।",
      "lang.switchToHindi": "हिंदी में बदलें",
      "lang.switchToEnglish": "अंग्रेज़ी में बदलें",
      "lang.hindi": "हिंदी",
      "lang.english": "English",
      "nav.openMenu": "मेन्यू खोलें",
      "nav.closeMenu": "मेन्यू बंद करें",
      "journey.sessionShort": "सत्र {n}",
      "journey.next": "अगला: {label}",
      "journey.back": "चरण 1 पर वापस: {label}",
      "journey.announce": "चरण {n}/{total}: {title}।",
      "projects.statusAll": "सभी {count} छात्र बिल्ड दिखाए जा रहे हैं।",
      "projects.statusClass": "कक्षा {n} के {count} बिल्ड दिखाए जा रहे हैं।",
      "class.label": "कक्षा {n}",
      "modal.bookTrack": "कक्षा {n} ट्रैक बुक करें",
      "sim.run": "टेस्ट चलाएँ",
      "sim.testing": "टेस्ट हो रहा है…",
      "sim.statusStopped": "बाधा मिली — ब्रेक शाखा ने रोवर को बचा लिया।",
      "sim.statusClear": "रास्ता साफ़ है — रोवर आगे बढ़ रहा है।",
      "sim.brake": "ब्रेक शाखा सक्रिय · मोटरें रुकीं",
      "sim.loop": "लूप चल रहा है · हर सेकंड 20 जाँचें",
      "form.nameError": "कृपया छात्र का नाम लिखें (कम से कम 2 अक्षर)।",
      "form.classError": "कृपया कक्षा चुनें ताकि हम सही सत्र की योजना बना सकें।",
      "form.emailError": "कृपया अभिभावक का ईमेल लिखें जिस पर हम जवाब दे सकें।",
      "form.emailInvalid": "यह ईमेल सही नहीं लग रहा है। कृपया इसे जाँचें।",
      "form.successNoBatch": "धन्यवाद, {name}! कक्षा {n} के लिए आपका बुकिंग अनुरोध सेव हो गया है। हम एक कार्यदिवस के भीतर उपलब्ध बैच समय के साथ संपर्क करेंगे।",
      "form.successBatch": "धन्यवाद, {name}! कक्षा {n} के लिए आपका बुकिंग अनुरोध सेव हो गया है। हम एक कार्यदिवस के भीतर {batch} के विकल्पों के साथ संपर्क करेंगे।"
    }
  };

  const HI_TEXT = {
    "Skip to content": "सामग्री पर जाएँ",
    "RoboQuest home": "RoboQuest होम",
    "Main navigation": "मुख्य नेविगेशन",
    "Journey": "सफ़र",
    "Class tracks": "कक्षा ट्रैक",
    "Projects": "प्रोजेक्ट्स",
    "Rover lab": "रोवर लैब",
    "Book now": "अभी बुक करें",
    "Open menu": "मेन्यू खोलें",
    "Close menu": "मेन्यू बंद करें",

    "Robotics & IoT for Class 6-8": "कक्षा 6–8 के लिए रोबोटिक्स और IoT",
    "Build robots.": "रोबोट बनाओ।",
    "Make ideas": "आइडिया को",
    "move.": "गति दो।",
    "A hands-on robotics and IoT lab where kids wire real circuits, write real Arduino code, and turn wild ideas into projects they can actually play with.": "एक प्रैक्टिकल रोबोटिक्स और IoT लैब, जहाँ बच्चे असली सर्किट जोड़ते हैं, असली Arduino कोड लिखते हैं और अपने अनोखे आइडिया को ऐसे प्रोजेक्ट्स में बदलते हैं जिन्हें वे खुद चला सकते हैं।",
    "Explore the journey": "सफ़र देखें",
    "See student builds": "छात्रों के बिल्ड देखें",
    "No experience needed": "कोई अनुभव ज़रूरी नहीं",
    "All kits provided": "सभी किट मिलेंगी",
    "Class 6-8": "कक्षा 6–8",
    "Hi, I'm Bolt! Tap me for a robot fact.": "नमस्ते, मैं Bolt हूँ! रोबोट के बारे में एक मज़ेदार बात जानने के लिए मुझे टैप करें।",
    "connected": "कनेक्टेड",
    "ON": "चालू",
    "// sensor check": "// सेंसर जाँच",
    "tap Bolt": "Bolt को टैप करें",
    "Meet Bolt the robot. Activate for a fun robot fact.": "रोबोट Bolt से मिलें। मज़ेदार रोबोट फ़ैक्ट के लिए इसे चालू करें।",
    "RoboQuest at a glance": "एक नज़र में RoboQuest",
    "hands-on builds": "प्रैक्टिकल बिल्ड",
    "class tracks": "कक्षा ट्रैक",
    "mentor ratio": "मेंटर अनुपात",
    "min weekly lab": "मिनट साप्ताहिक लैब",

    "The project journey": "प्रोजेक्ट का सफ़र",
    "A whole project, from scribble to": "पूरा प्रोजेक्ट, स्केच से",
    "showcase.": "शोकेस तक।",
    "Every build follows the same six-stage loop real engineers use. Kids never just follow instructions — they design, test and improve until it works.": "हर बिल्ड उसी छह-चरणीय प्रक्रिया से गुज़रता है जिसका इस्तेमाल असली इंजीनियर करते हैं। बच्चे सिर्फ़ निर्देश नहीं मानते — वे डिज़ाइन करते हैं, टेस्ट करते हैं और चीज़ों को बेहतर बनाते हैं जब तक वह काम न करे।",
    "Project journey stages": "प्रोजेक्ट सफ़र के चरण",
    "Discover": "खोजें",
    "Sketch": "स्केच",
    "Build": "बनाएँ",
    "Code": "कोड",
    "Test & tune": "टेस्ट और ट्यून",
    "Showcase": "शोकेस",
    "Session 1": "सत्र 1",
    "Session 2": "सत्र 2",
    "Session 3": "सत्र 3",
    "Session 4": "सत्र 4",
    "Session 5": "सत्र 5",
    "Session 6": "सत्र 6",
    "Session 1 of 6": "सत्र 1 / 6",
    "Session 2 of 6": "सत्र 2 / 6",
    "Session 3 of 6": "सत्र 3 / 6",
    "Session 4 of 6": "सत्र 4 / 6",
    "Session 5 of 6": "सत्र 5 / 6",
    "Session 6 of 6": "सत्र 6 / 6",
    "Kids walk away with": "बच्चों के पास होगा",
    "Next stage": "अगला चरण",

    "Three class tracks": "तीन कक्षा ट्रैक",
    "Three years. One clear path to": "तीन साल। एक साफ़ रास्ता",
    "inventor.": "आविष्कारक तक।",
    "Each year adds a new superpower: first circuits, then sensors and logic, then connected IoT systems. Same playful method, steadily bigger challenges.": "हर साल एक नई ताकत जुड़ती है: पहले सर्किट, फिर सेंसर और लॉजिक, फिर जुड़े हुए IoT सिस्टम। वही मज़ेदार तरीका, हर बार थोड़ी बड़ी चुनौती।",
    "Class 6": "कक्षा 6",
    "Class 7": "कक्षा 7",
    "Class 8": "कक्षा 8",
    "Spark Starters": "स्पार्क स्टार्टर्स",
    "Circuit Coders": "सर्किट कोडर्स",
    "IoT Inventors": "IoT इन्वेंटर्स",
    "Electricity, circuits and first bots.": "बिजली, सर्किट और पहले रोबोट।",
    "Circuit safety & parts sense": "सर्किट सुरक्षा और पार्ट्स की समझ",
    "LEDs, resistors & breadboards": "LED, रेज़िस्टर और ब्रेडबोर्ड",
    "Motors that wiggle, bots that scoot": "घूमने वाली मोटरें, दौड़ते रोबोट",
    "Block-to-text coding basics": "ब्लॉक-से-टेक्स्ट कोडिंग की बुनियाद",
    "8 builds · no coding needed": "8 बिल्ड · कोडिंग की ज़रूरत नहीं",
    "See projects": "प्रोजेक्ट्स देखें",
    "Arduino, sensors and robots with reactions.": "Arduino, सेंसर और प्रतिक्रिया देने वाले रोबोट।",
    "Arduino inputs, outputs & code": "Arduino इनपुट, आउटपुट और कोड",
    "Ultrasonic, IR & light sensors": "अल्ट्रासोनिक, IR और लाइट सेंसर",
    "If-else logic, loops & functions": "if-else लॉजिक, लूप और फ़ंक्शन",
    "Servos, motor drivers & mechanisms": "सर्वो, मोटर ड्राइवर और मैकेनिज़्म",
    "10 builds · Arduino Uno": "10 बिल्ड · Arduino Uno",
    "Smart devices, live data and big ideas.": "स्मार्ट डिवाइस, लाइव डेटा और बड़े आइडिया।",
    "Wi-Fi boards & cloud dashboards": "Wi-Fi बोर्ड और क्लाउड डैशबोर्ड",
    "Sensor data, logging & automation": "सेंसर डेटा, लॉगिंग और ऑटोमेशन",
    "Smart home & sustainability prototypes": "स्मार्ट होम और सस्टेनेबिलिटी प्रोटोटाइप",
    "Capstone pitch, demo & portfolio": "कैपस्टोन पिच, डेमो और पोर्टफ़ोलियो",
    "10 builds · ESP32 + Wi-Fi": "10 बिल्ड · ESP32 + Wi-Fi",
    "Every track ends with a Demo Day — families invited, badges earned.": "हर ट्रैक डेमो डे के साथ खत्म होता है — परिवार बुलाए जाते हैं, बैज मिलते हैं।",

    "The build gallery": "बिल्ड गैलरी",
    "Nine projects. A lot of": "नौ प्रोजेक्ट्स। बहुत सारा",
    "\"whoa.\"": "\"वाह!\"",
    "Real builds from the lab, mapped to each class. Open any build plan to see the parts, the steps and the skills kids pick up.": "लैब के असली बिल्ड, हर कक्षा के हिसाब से। किसी भी बिल्ड प्लान को खोलकर पार्ट्स, स्टेप्स और बच्चों के सीखे हुए स्किल्स देखें।",
    "Filter projects by class": "कक्षा के हिसाब से प्रोजेक्ट्स फ़िल्टर करें",
    "All builds": "सभी बिल्ड",
    "Starter": "शुरुआती",
    "Intermediate": "मध्यम",
    "Advanced": "उन्नत",
    "2 sessions": "2 सत्र",
    "3 sessions": "3 सत्र",
    "4 sessions": "4 सत्र",
    "5 sessions": "5 सत्र",
    "6 sessions": "6 सत्र",
    "Motors": "मोटरें",
    "LEDs": "LED",
    "Servo": "सर्वो",
    "IR sensors": "IR सेंसर",
    "IoT": "IoT",
    "Automation": "ऑटोमेशन",
    "Data": "डेटा",
    "Blink Buddy": "ब्लिंक बडी",
    "Bristle Bot": "ब्रिसल बॉट",
    "Traffic Light": "ट्रैफिक लाइट",
    "Obstacle-Avoiding Rover": "बाधा-टालने वाला रोवर",
    "Smart Dustbin": "स्मार्ट डस्टबिन",
    "Line-Following Robot": "लाइन-फॉलोइंग रोबोट",
    "Smart Home Hub": "स्मार्ट होम हब",
    "Self-Watering Plant": "खुद पानी देने वाला पौधा",
    "Weather Station": "मौसम स्टेशन",
    "Your very first circuit: an LED that says hello in your own blink pattern.": "आपका पहला सर्किट: एक LED जो आपके अपने ब्लिंक पैटर्न में हैलो कहती है।",
    "A toothbrush, a coin cell and a tiny motor become a jittering micro-robot.": "एक टूथब्रश, कॉइन सेल और छोटी मोटर मिलकर बनते हैं एक काँपता हुआ माइक्रो-रोबोट।",
    "Wire red, amber and green, then choreograph a safe little intersection.": "लाल, पीली और हरी लाइट जोड़ें, फिर एक सुरक्षित छोटे चौराहे की लाइट-कोरियोग्राफी करें।",
    "Give a rover ultrasonic “eyes” that stop it before it bumps — then teach it to turn.": "रोवर को अल्ट्रासोनिक “आँखें” दें जो टकराने से पहले रोक दें — फिर उसे मुड़ना सिखाएँ।",
    "A bin that senses your hand and swings its own lid open with a servo motor.": "एक डस्टबिन जो आपका हाथ महसूस करके सर्वो मोटर से अपना ढक्कन खोल देता है।",
    "Two infrared eyes keep this bot chasing a black line around every corner.": "दो इन्फ्रारेड आँखें इस बॉट को हर मोड़ पर काली लाइन का पीछा करवाती हैं।",
    "Flip real lights from a phone dashboard and watch live sensor data stream in.": "फ़ोन डैशबोर्ड से असली लाइटें चालू-बंद करें और लाइव सेंसर डेटा आते देखें।",
    "A soil sensor tells a tiny pump exactly when your plant is thirsty — no guesswork.": "मिट्टी का सेंसर छोटे पंप को बताता है कि पौधे को कब पानी चाहिए — कोई अंदाज़ा नहीं।",
    "Measure the sky, display the numbers, then send live weather data to the cloud.": "आसमान को मापें, आँकड़े दिखाएँ, फिर लाइव मौसम डेटा क्लाउड पर भेजें।",
    "Open build plan": "बिल्ड प्लान खोलें",
    "An Arduino board wired to a glowing LED on a breadboard": "ब्रेडबोर्ड पर जलती LED से जुड़ा Arduino बोर्ड",
    "A smiling bristle bot built from a toothbrush, coin battery and vibration motor": "टूथब्रश, कॉइन बैटरी और वाइब्रेशन मोटर से बना मुस्कुराता ब्रिसल बॉट",
    "A model traffic light glowing red with a toy car waiting on a road": "सड़क पर खड़ी टॉय कार के साथ लाल जलती मॉडल ट्रैफिक लाइट",
    "A two-wheeled rover with ultrasonic sensor eyes approaching a traffic cone": "ट्रैफिक कोन की ओर बढ़ता अल्ट्रासोनिक सेंसर आँखों वाला दो-पहिया रोवर",
    "A smart dustbin with an automatically opening lid and a scrap of paper flying in": "अपने आप खुलने वाले ढक्कन और अंदर उड़ते कागज़ के टुकड़े वाला स्मार्ट डस्टबिन",
    "A line-following robot with infrared sensor eyes tracking a black line": "काली लाइन पर चलता इन्फ्रारेड सेंसर आँखों वाला लाइन-फॉलोइंग रोबोट",
    "A smart home connected by Wi-Fi to a phone dashboard": "Wi-Fi से फ़ोन डैशबोर्ड से जुड़ा स्मार्ट होम",
    "A self-watering plant with a soil moisture sensor wired to an Arduino and a water reservoir": "Arduino और पानी के टैंक से जुड़े मिट्टी नमी सेंसर वाला खुद पानी देने वाला पौधा",
    "A weather station with an anemometer, solar panel and display showing temperature": "एनीमोमीटर, सोलर पैनल और तापमान दिखाते डिस्प्ले वाला मौसम स्टेशन",

    "Rover lab · try it now": "रोवर लैब · अभी आज़माएँ",
    "Teach a rover to stop before it": "रोवर को टकराने से पहले रुकना",
    "crashes.": "सिखाएँ।",
    "Drag the distance slider and watch the exact Arduino logic react. This is the same if-else thinking Class 7 uses to keep their rovers out of trouble.": "दूरी का स्लाइडर खींचें और देखें कि Arduino का लॉजिक कैसे प्रतिक्रिया देता है। यही if-else सोच कक्षा 7 के बच्चे अपने रोवर को सुरक्षित रखने के लिए इस्तेमाल करते हैं।",
    "LIVE SIMULATION": "लाइव सिमुलेशन",
    "Distance to obstacle": "बाधा से दूरी",
    "safety stop < 25": "सुरक्षा स्टॉप < 25",
    "Run test": "टेस्ट चलाएँ",
    "Reset": "रीसेट",
    "Distance": "दूरी",
    "Motor": "मोटर",
    "All clear — keep rolling.": "रास्ता साफ़ है — चलते रहो।",
    "Example Arduino code for the rover": "रोवर के लिए Arduino कोड का उदाहरण",
    "// How far away is the wall?": "// दीवार कितनी दूर है?",
    "// brake!": "// ब्रेक!",
    "Loop running · 20 checks every second": "लूप चल रहा है · हर सेकंड 20 जाँचें",
    "Change one number, change everything.": "एक नंबर बदलो, सब कुछ बदल जाएगा।",
    "The rover loops through that": "रोवर हर सेकंड उस",
    "statement 20 times a second. Push the distance below 25 cm and the brake branch takes over.": "स्टेटमेंट से 20 बार गुज़रता है। दूरी 25 cm से कम करते ही ब्रेक शाखा सक्रिय हो जाती है।",

    "Inside the maker kit": "मेकर किट के अंदर",
    "Everything is in the box.": "सब कुछ बॉक्स में है।",
    "Really.": "सच में।",
    "No shopping lists for parents, no missing parts on lab day. Every learner gets a labelled kit, a laptop station and a mentor who knows when to step in — and when to let them figure it out.": "माता-पिता के लिए कोई शॉपिंग लिस्ट नहीं, लैब के दिन कोई पार्ट गायब नहीं। हर बच्चे को लेबल वाली किट, एक लैपटॉप स्टेशन और ऐसा मेंटर मिलता है जो जानता है कि कब मदद करनी है — और कब बच्चों को खुद हल निकालने देना है।",
    "The brain that reads inputs and drives outputs.": "वह दिमाग़ जो इनपुट पढ़ता है और आउटपुट चलाता है।",
    "Breadboard": "ब्रेडबोर्ड",
    "Snap circuits together — no soldering needed.": "सर्किट आपस में जोड़ें — सोल्डरिंग की ज़रूरत नहीं।",
    "Sensor pack": "सेंसर पैक",
    "Ultrasonic, IR, light, soil and temperature.": "अल्ट्रासोनिक, IR, लाइट, मिट्टी और तापमान।",
    "Motors & servos": "मोटरें और सर्वो",
    "Spin wheels, wave arms, open lids.": "पहिए घुमाएँ, हाथ हिलाएँ, ढक्कन खोलें।",
    "Jumper wires": "जंपर वायर",
    "Colour-coded cables for every connection.": "हर कनेक्शन के लिए रंग-कोडेड केबल।",
    "ESP32 Wi-Fi board": "ESP32 Wi-Fi बोर्ड",
    "The IoT brain behind every Class 8 cloud project.": "हर कक्षा 8 क्लाउड प्रोजेक्ट के पीछे का IoT दिमाग़।",
    "Certificates & medals": "सर्टिफिकेट और मेडल",
    "Recognition that": "ऐसा सम्मान जो",
    "lasts.": "हमेशा रहे।",
    "Every learner gets a certificate of joining. After the final project, learners receive a completion certificate and project winners take home medals.": "हर छात्र को जॉइनिंग सर्टिफिकेट मिलता है। फाइनल प्रोजेक्ट के बाद छात्रों को कम्प्लीशन सर्टिफिकेट और प्रोजेक्ट विजेताओं को मेडल मिलते हैं।",
    "Certificate of joining": "जॉइनिंग सर्टिफिकेट",
    "Every learner receives one when they join the programme.": "प्रोग्राम जॉइन करते ही हर छात्र को यह मिलता है।",
    "Completion certificate": "कम्प्लीशन सर्टिफिकेट",
    "Awarded after the final project is completed.": "फाइनल प्रोजेक्ट पूरा होने के बाद दिया जाता है।",
    "Winner medals": "विजेताओं को मेडल",
    "Project winners receive medals after completion.": "प्रोजेक्ट विजेताओं को कम्प्लीशन के बाद मेडल मिलते हैं।",
    "For parents": "माता-पिता के लिए",
    "Serious skills. Zero screen-time guilt.": "गंभीर स्किल्स। स्क्रीन-टाइम की कोई गिल्ट नहीं।",
    "Every session is 90 minutes of designing, wiring and debugging with a mentor close by. Kids build confidence — and something real they can show you.": "हर सत्र 90 मिनट का होता है — डिज़ाइन, वायरिंग और डिबगिंग, मेंटर पास में। बच्चे आत्मविश्वास बनाते हैं — और कुछ असली बनाते हैं जो वे आपको दिखा सकें।",
    "Weekly 90-minute lab, after school or weekend": "हर हफ़्ते 90 मिनट की लैब, स्कूल के बाद या वीकेंड में",
    "1:8 mentor ratio — never a crowded bench": "1:8 मेंटर अनुपात — कभी भीड़-भाड़ वाली बेंच नहीं",
    "All kits, laptops and materials included": "सभी किट, लैपटॉप और सामग्री शामिल",
    "Low-voltage, safety-first — no soldering before Class 8": "कम वोल्टेज, सुरक्षा पहले — कक्षा 8 से पहले सोल्डरिंग नहीं",
    "Demo Day every term + a project video to keep": "हर टर्म में डेमो डे + अपने पास रखने के लिए प्रोजेक्ट वीडियो",
    "Certificate of joining for every learner": "हर छात्र के लिए जॉइनिंग सर्टिफिकेट",
    "Completion certificate + medals for project winners after the final project": "फाइनल प्रोजेक्ट के बाद कम्प्लीशन सर्टिफिकेट और प्रोजेक्ट विजेताओं को मेडल",
    "No experience or equipment required.": "कोई अनुभव या उपकरण ज़रूरी नहीं।",

    "Start here": "यहाँ से शुरू करें",
    "Ready to build something that": "कुछ ऐसा बनाने के लिए तैयार जो",
    "moves?": "चले?",
    "Book a 45-minute hands-on session. Your child wires a circuit, writes a line of code and takes home a blinking LED. No experience needed — just curiosity.": "45 मिनट का प्रैक्टिकल सेशन बुक करें। आपका बच्चा सर्किट जोड़ेगा, एक लाइन कोड लिखेगा और घर एक जलती LED लेकर जाएगा। अनुभव की ज़रूरत नहीं — बस जिज्ञासा।",
    "45-minute hands-on session": "45 मिनट का प्रैक्टिकल सेशन",
    "At our lab or at your school": "हमारी लैब में या आपके स्कूल में",
    "Weekday and weekend batches": "वीकडे और वीकेंड बैच",
    "All equipment provided, nothing to buy": "सारा सामान मिलेगा, कुछ खरीदना नहीं",
    "Questions? Talk to a human:": "सवाल हैं? किसी इंसान से बात करें:",
    "45 minutes. One grown-up. One very proud kid.": "45 मिनट। एक बड़ा इंसान। एक बहुत गर्वित बच्चा।",
    "Student's name": "छात्र का नाम",
    "e.g. Aarav Sharma": "जैसे आरव शर्मा",
    "Class": "कक्षा",
    "Choose a class": "कक्षा चुनें",
    "Class 6 · Spark Starters": "कक्षा 6 · स्पार्क स्टार्टर्स",
    "Class 7 · Circuit Coders": "कक्षा 7 · सर्किट कोडर्स",
    "Class 8 · IoT Inventors": "कक्षा 8 · IoT इन्वेंटर्स",
    "Preferred batch": "पसंदीदा बैच",
    "Any batch works": "कोई भी बैच ठीक है",
    "Weekday · 4:30 pm": "वीकडे · शाम 4:30",
    "Saturday · 10:00 am": "शनिवार · सुबह 10:00",
    "Saturday · 12:00 pm": "शनिवार · दोपहर 12:00",
    "Sunday · 10:00 am": "रविवार · सुबह 10:00",
    "Parent email": "अभिभावक का ईमेल",
    "Phone": "फ़ोन",
    "(optional)": "(वैकल्पिक)",
    "Anything we should know?": "कुछ और जो हमें पता होना चाहिए?",
    "A shy kid? A robot-obsessed kid? A specific project idea?": "शर्मीला बच्चा? रोबोट का दीवाना बच्चा? कोई खास प्रोजेक्ट आइडिया?",
    "Send booking request": "बुकिंग अनुरोध भेजें",
    "We reply within one school day. Your details stay private — no spam, ever.": "हम एक स्कूल दिन के भीतर जवाब देते हैं। आपकी जानकारी निजी रहती है — कभी स्पैम नहीं।",
    "You're on the list!": "आप लिस्ट में हैं!",
    "We've saved your booking request and will be in touch within one school day.": "हमने आपका बुकिंग अनुरोध सेव कर लिया है और एक स्कूल दिन के भीतर संपर्क करेंगे।",
    "Book another session": "एक और सेशन बुक करें",

    "A hands-on STEM robotics and IoT lab for Class 6-8. We build stubborn little robots and quietly confident problem-solvers.": "कक्षा 6–8 के लिए एक प्रैक्टिकल STEM रोबोटिक्स और IoT लैब। हम ज़िद्दी छोटे रोबोट और शांत आत्मविश्वास वाले समस्या-समाधानकर्ता बनाते हैं।",
    "Built for curious minds": "जिज्ञासु दिमाग़ों के लिए बना",
    "Explore": "देखें",
    "The journey": "सफ़र",
    "Student projects": "छात्रों के प्रोजेक्ट्स",
    "Photo credits": "फ़ोटो क्रेडिट",
    "Programs": "प्रोग्राम्स",
    "Inside the kit": "किट के अंदर",
    "Book a session": "सेशन बुक करें",
    "Say hello": "हमसे जुड़ें",
    "At our lab & partner schools": "हमारी लैब और पार्टनर स्कूलों में",
    "Mon-Sat · 9:00 am - 7:00 pm": "सोम–शनि · सुबह 9:00 – शाम 7:00",
    "No prior coding or robotics experience required. Ever.": "पहले से कोडिंग या रोबोटिक्स का अनुभव ज़रूरी नहीं। कभी भी नहीं।",
    "RoboQuest STEM Lab. All circuits reserved.": "RoboQuest STEM Lab. सभी सर्किट सुरक्षित।",
    "© 2026 RoboQuest STEM Lab. All circuits reserved.": "© 2026 RoboQuest STEM Lab. सभी सर्किट सुरक्षित।",
    "Made with": "बनाया गया",
    "and a lot of jumper wires.": "और बहुत सारे जंपर वायर से।",

    "Close build plan": "बिल्ड प्लान बंद करें",
    "Build plan": "बिल्ड प्लान",
    "Real lab inspiration": "असली लैब से प्रेरणा",
    "Students + builds": "छात्र + बिल्ड",
    "Representative photos from the maker community, not RoboQuest students.": "मेकर कम्युनिटी की प्रतिनिधि फ़ोटो, RoboQuest के छात्र नहीं।",
    "See photo credits": "फ़ोटो क्रेडिट देखें",
    "What you'll need": "आपको क्या चाहिए",
    "Step by step": "स्टेप बाय स्टेप",
    "Skills unlocked": "सीखे गए स्किल्स",
    "This build is part of the": "यह बिल्ड इसका हिस्सा है:",
    "track.": "ट्रैक।",
    "No equipment needed for your first session.": "पहले सेशन के लिए कोई उपकरण ज़रूरी नहीं।",
    "Book this track": "यह ट्रैक बुक करें",
    "In the lab": "लैब में",
    "The build": "बिल्ड",
    "Photo: Pexels": "फ़ोटो: Pexels",

    "Back to projects": "प्रोजेक्ट्स पर वापस",
    "Back to project builds": "प्रोजेक्ट बिल्ड्स पर वापस",
    "Real photos from the maker world.": "मेकर दुनिया की असली फ़ोटो।",
    "The real photographs in our project popups show students making things and real builds related to each project. They are representative photographs — not pictures of RoboQuest students or projects made in our lab.": "हमारे प्रोजेक्ट पॉपअप की असली फ़ोटो में बच्चे कुछ बनाते हुए और हर प्रोजेक्ट से जुड़े असली बिल्ड दिखते हैं। ये प्रतिनिधि फ़ोटो हैं — RoboQuest के छात्रों या हमारी लैब में बने प्रोजेक्ट्स की तस्वीरें नहीं।",
    "A note on the people in these photos:": "इन फ़ोटो में दिखने वाले लोगों के बारे में एक बात:",
    "these are stock photographs used under the Pexels licence or Creative Commons licences. When you have your own lab photos, replace them with pictures of your own makers and their builds.": "ये स्टॉक फ़ोटो हैं जो Pexels लाइसेंस या Creative Commons लाइसेंस के तहत इस्तेमाल की गई हैं। जब आपके पास अपनी लैब की फ़ोटो हों, तो इन्हें अपने मेकर्स और उनके बिल्ड्स की तस्वीरों से बदल दें।",
    "Students in the lab": "लैब में छात्र",
    "All student photographs below are from": "नीचे दी गई सभी छात्र फ़ोटो यहाँ से हैं:",
    "and used under the Pexels licence. No attribution is required, but we are happy to credit the source.": "और Pexels लाइसेंस के तहत इस्तेमाल की गई हैं। क्रेडिट देना ज़रूरी नहीं है, पर हमें स्रोत का श्रेय देकर खुशी है।",
    "Project reference photos": "प्रोजेक्ट संदर्भ फ़ोटो",
    "Each project popup includes a real reference photo of the build or technology. Files were resized for the web; no other changes were made.": "हर प्रोजेक्ट पॉपअप में बिल्ड या तकनीक की एक असली संदर्भ फ़ोटो होती है। फ़ाइलों को वेब के लिए छोटा किया गया है; और कोई बदलाव नहीं किया गया।",
    "Illustrations and type": "इलस्ट्रेशन और फ़ॉन्ट",
    "All robot, project and mascot illustrations on RoboQuest are original SVG artwork made for this site. The site uses Outfit, Nunito and JetBrains Mono, served by Google Fonts.": "RoboQuest के सभी रोबोट, प्रोजेक्ट और मास्कॉट इलस्ट्रेशन इस साइट के लिए बनाए गए ओरिजिनल SVG आर्टवर्क हैं। साइट Outfit, Nunito और JetBrains Mono फ़ॉन्ट इस्तेमाल करती है, जो Google Fonts से आते हैं।",
    "Back to RoboQuest": "RoboQuest पर वापस",
    "Student photo 01": "छात्र फ़ोटो 01",
    "Student photo 02": "छात्र फ़ोटो 02",
    "Student photo 03": "छात्र फ़ोटो 03",
    "Student photo 04": "छात्र फ़ोटो 04",
    "Student photo 05": "छात्र फ़ोटो 05",
    "Student photo 06": "छात्र फ़ोटो 06",
    "Student photo 07": "छात्र फ़ोटो 07",
    "Student photo 08": "छात्र फ़ोटो 08",
    "Student photo 09": "छात्र फ़ोटो 09",
    "· Pexels licence": "· Pexels लाइसेंस",
    "Wikimedia Commons": "विकिमीडिया कॉमन्स"
  };

  const textRecords = new WeakMap();
  const attrRecords = new WeakMap();
  const ATTRS = ["placeholder", "aria-label", "alt", "title"];
  let currentLang = "en";

  function normalize(value) {
    return String(value)
      .replace(/\s+/g, " ")
      .trim()
      .replace(/[‘’]/g, "'")
      .replace(/[“”]/g, "\"")
      .replace(/[–—]/g, "-");
  }

  const HI_LOOKUP = Object.create(null);
  Object.keys(HI_TEXT).forEach((key) => {
    HI_LOOKUP[normalize(key)] = HI_TEXT[key];
  });

  function t(key, vars) {
    const table = STRINGS[currentLang] || STRINGS.en;
    let value = table[key];
    if (value == null) value = STRINGS.en[key];
    if (value == null) value = key;
    if (vars) {
      Object.keys(vars).forEach((name) => {
        value = value.replace(new RegExp(`\\{${name}\\}`, "g"), () => String(vars[name]));
      });
    }
    return value;
  }

  function isExcluded(node) {
    const element = node.nodeType === 1 ? node : node.parentElement;
    return !element || Boolean(element.closest("script, style, [data-no-i18n]"));
  }

  function translateTextNode(node) {
    const raw = node.nodeValue;
    if (!raw || !raw.trim() || isExcluded(node)) return;

    const key = normalize(raw);
    const existing = textRecords.get(node);

    if (currentLang === "hi") {
      if (existing && raw === existing.translated) return;
      const hindi = HI_LOOKUP[key];
      if (!hindi) {
        if (existing) textRecords.delete(node);
        return;
      }
      const leading = raw.match(/^\s*/)[0];
      const trailing = raw.match(/\s*$/)[0];
      const translated = `${leading}${hindi}${trailing}`;
      textRecords.set(node, { original: raw, translated });
      node.nodeValue = translated;
      return;
    }

    if (existing) {
      node.nodeValue = existing.original;
      textRecords.delete(node);
    }
  }

  function translateAttributes(root) {
    const elements = [];
    if (root.nodeType === 1) elements.push(root);
    if (root.querySelectorAll) elements.push(...root.querySelectorAll("*"));

    elements.forEach((element) => {
      if (element.closest("[data-no-i18n]")) return;
      let records = attrRecords.get(element);

      ATTRS.forEach((attr) => {
        const raw = element.getAttribute(attr);
        if (!raw) return;
        const key = normalize(raw);
        const existing = records && records[attr];

        if (currentLang === "hi") {
          if (existing && raw === existing.translated) return;
          const hindi = HI_LOOKUP[key];
          if (!hindi) {
            if (existing) delete records[attr];
            return;
          }
          if (!records) {
            records = {};
            attrRecords.set(element, records);
          }
          records[attr] = { original: raw, translated: hindi };
          element.setAttribute(attr, hindi);
        } else if (existing) {
          element.setAttribute(attr, existing.original);
          delete records[attr];
        }
      });

      if (records && !Object.keys(records).length) attrRecords.delete(element);
    });
  }

  function translateTree(root = document.body) {
    if (!root) return;
    if (root.nodeType === 3) {
      translateTextNode(root);
      return;
    }
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return isExcluded(node) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(translateTextNode);
    translateAttributes(root);
  }

  function updateMeta() {
    const page = document.body.dataset.page || "home";
    const prefix = page === "credits" ? "meta.credits" : "meta.home";
    document.title = t(`${prefix}.title`);

    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", t(`${prefix}.description`));

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", t("meta.home.ogTitle"));
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute("content", t("meta.home.ogDescription"));
  }

  function updateToggles() {
    document.querySelectorAll("[data-lang-toggle]").forEach((button) => {
      const label = button.querySelector("[data-lang-label]");
      const isHindi = currentLang === "hi";
      if (label) label.textContent = isHindi ? t("lang.english") : t("lang.hindi");
      const action = isHindi ? t("lang.switchToEnglish") : t("lang.switchToHindi");
      button.setAttribute("aria-label", action);
      button.setAttribute("title", action);
      button.classList.toggle("is-hindi", isHindi);
    });
  }

  function applyLanguage() {
    translateTree(document.body);
    updateMeta();
    updateToggles();
  }

  function setLanguage(nextLang, options = {}) {
    const lang = SUPPORTED.includes(nextLang) ? nextLang : "en";
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = "ltr";

    applyLanguage();

    if (options.announce !== false) {
      document.dispatchEvent(new CustomEvent("rq:languagechange", { detail: { lang } }));
    }
  }

  window.RQ_I18N = {
    get lang() {
      return currentLang;
    },
    t,
    setLanguage,
    apply: translateTree
  };

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-lang-toggle]");
    if (!button) return;
    event.preventDefault();
    setLanguage(currentLang === "en" ? "hi" : "en");
  });

  setLanguage("en", { announce: false });
})();

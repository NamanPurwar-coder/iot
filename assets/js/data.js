/* ============================================================
   RoboQuest content data
   ============================================================ */

const BOT_FACTS = [
  "A microcontroller is a tiny computer with no screen — it talks to motors and sensors instead.",
  "An ultrasonic sensor measures distance by shouting an inaudible ping and timing the echo.",
  "A servo motor can point to an exact angle. That's how robot arms wave hello.",
  "Arduino can check a sensor thousands of times a second. Your blink is way slower than that!",
  "IoT stands for Internet of Things — everyday objects trading data over the internet.",
  "A resistor is a tiny traffic controller. It slows current so an LED doesn't burn out."
];

const JOURNEY_STAGES = [
  {
    label: "Discover",
    title: "Start with a real problem",
    duration: "Session 1 of 6",
    color: "#2f6bff",
    tint: "#eaf0ff",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/></svg>',
    desc: "Every project opens with a question, not an instruction manual. Could a bin open on its own? How does a rover \u201csee\u201d a wall? Kids unbox the kit, meet the parts and choose a challenge worth solving.",
    bullets: [
      "Unbox and name every component",
      "Play with demo circuits and sensors",
      "Choose a problem they actually care about"
    ],
    takeaway: "A challenge, a safety habit and a kit they know their way around."
  },
  {
    label: "Sketch",
    title: "Sketch it before you build it",
    duration: "Session 2 of 6",
    color: "#e0563f",
    tint: "#fff0ed",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/><path d="m14 6 4 4"/></svg>',
    desc: "Before a single wire is plugged in, makers sketch the robot, plan the circuit and write step-by-step pseudocode. Half the bugs get fixed before the electronics even come out of the box.",
    bullets: [
      "Draw the robot and label inputs and outputs",
      "Plan the wiring path, colour by colour",
      "Write the if-this-then-that logic in plain words"
    ],
    takeaway: "A blueprint they can explain to a teammate."
  },
  {
    label: "Build",
    title: "Build it. Wire it. Bring it to life.",
    duration: "Session 3 of 6",
    color: "#c17a09",
    tint: "#fff7e4",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4a5 5 0 0 0-5 6.5L3.5 16a2 2 0 1 0 2.8 2.8L12 13.5A5 5 0 0 0 18.5 8L15 11.5 12.5 9 16 5.5A5 5 0 0 0 14 4Z"/></svg>',
    desc: "Out come the cutters, screws and jumper wires. LEDs go in the right way round, sensors get a clear view, motors get a snug home. Mentors guide, but hands stay on the tools.",
    bullets: [
      "Build the circuit on a breadboard",
      "Mount motors, wheels and sensors",
      "Check power and polarity before switch-on"
    ],
    takeaway: "A real device that powers on (and sometimes beeps)."
  },
  {
    label: "Code",
    title: "Teach it what to do",
    duration: "Session 4 of 6",
    color: "#7c3aed",
    tint: "#f3edff",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 8-4 4 4 4M16 8l4 4-4 4M13 5l-2 14"/></svg>',
    desc: "The magic moment: kids upload their first program and watch the project react. Then they change the numbers, the timing, the logic — and watch it change again. Code stops being abstract.",
    bullets: [
      "Upload a starter sketch and test it",
      "Read live sensor values in the serial monitor",
      "Remix the code with their own rules"
    ],
    takeaway: "Working code — and the confidence to change it."
  },
  {
    label: "Test & tune",
    title: "Make it survive reality",
    duration: "Session 5 of 6",
    color: "#15915b",
    tint: "#e9fbf2",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 3v6h-6"/><path d="M12 8v4l3 2"/></svg>',
    desc: "Real robots never behave first time. Makers test, measure, fail, tweak and try again — the same loop real engineers live in. A flat battery or a loose wire becomes a clue, not a disaster.",
    bullets: [
      "Run an obstacle course or user test",
      "Debug wiring, logic and thresholds",
      "Improve speed, accuracy or the design"
    ],
    takeaway: "A project that works outside the classroom."
  },
  {
    label: "Showcase",
    title: "Demo it, explain it, own it",
    duration: "Session 6 of 6",
    color: "#a9670b",
    tint: "#fff8e6",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 21h8M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3"/></svg>',
    desc: "Families are invited. Kids present the problem, the build and the bug they are proudest of fixing. Every maker leaves with a badge, a demo video and a story worth retelling.",
    bullets: [
      "Present the why, not just the what",
      "Run a live demo (and rescue it if needed)",
      "Earn a maker badge and project video"
    ],
    takeaway: "A portfolio moment and a serious confidence boost."
  }
];

const PROJECTS = {
  "blink-buddy": {
    title: "Blink Buddy",
    classNum: 6,
    classLabel: "Class 6 · Spark Starters",
    level: "Starter",
    levelClass: "level-starter",
    sessions: "2 sessions",
    board: "Arduino Uno",
    img: "assets/img/project-blinky.svg",
    alt: "An Arduino board wired to a glowing LED on a breadboard",
    desc: "The classic first build — and still the best. Makers learn which leg of an LED goes where, why a resistor matters, and how one tiny program can make light dance. Then they remix the blink pattern into a secret code.",
    materials: ["Arduino Uno", "5 mm LED", "220 Ω resistor", "Breadboard", "2 jumper wires", "USB cable"],
    steps: ["Place the LED and resistor on the breadboard.", "Wire the LED to pin 13 and GND — polarity matters.", "Upload the Blink sketch and watch it glow.", "Change the delays to invent a blink pattern."],
    skills: ["Polarity", "Resistors", "digitalWrite", "Uploading code"],
    photos: [
      { src: "assets/img/photos/student-lab-01.jpg", alt: "A young maker connecting wires to an Arduino board", label: "In the lab", caption: "Hands on the hardware: a student wires up an Arduino for the first time.", credit: "Photo: Pexels" },
      { src: "assets/img/photos/arduino-led.jpg", alt: "An Arduino board wired to a breadboard with a glowing LED", label: "The build", caption: "A real Arduino LED circuit, using the same parts as Blink Buddy.", credit: "Chengxin Zhao / Pexels" }
    ]
  },
  "bristle-bot": {
    title: "Bristle Bot",
    classNum: 6,
    classLabel: "Class 6 · Spark Starters",
    level: "Starter",
    levelClass: "level-starter",
    sessions: "2 sessions",
    board: "Motor + coin cell",
    img: "assets/img/project-bristlebot.svg",
    alt: "A smiling bristle bot built from a toothbrush, coin battery and vibration motor",
    desc: "A tiny robot with a big personality. A toothbrush head, a coin-cell battery and an offset-weight motor turn vibration into motion. Kids experiment with weight and balance to make it spin, scoot or shimmy.",
    materials: ["Toothbrush head", "Vibration motor", "Coin-cell battery", "Foam tape", "Googly eyes", "Craft materials"],
    steps: ["Trim and balance the brush head.", "Tape the motor on so its weight is off-centre.", "Connect the battery and feel it buzz.", "Decorate it, then race your bot."],
    skills: ["Vibration & motion", "Prototyping", "Balance", "Creative thinking"],
    photos: [
      { src: "assets/img/photos/student-lab-02.jpg", alt: "Three students collaborating on a robot build in a classroom", label: "In the lab", caption: "Three heads are better than one when a robot misbehaves.", credit: "Photo: Pexels" },
      { src: "assets/img/photos/project-bristle-bot.jpg", alt: "Three bristle bots built from toothbrush heads, vibration motors and batteries", label: "The build", caption: "Real brush bots — tiny, fast and surprisingly hard to steer.", credit: "Rnewkirk7954 / CC BY-SA 3.0" }
    ]
  },
  "traffic-light": {
    title: "Traffic Light",
    classNum: 6,
    classLabel: "Class 6 · Spark Starters",
    level: "Starter",
    levelClass: "level-starter",
    sessions: "3 sessions",
    board: "Arduino Uno",
    img: "assets/img/project-traffic-light.svg",
    alt: "A model traffic light glowing red with a toy car waiting on a road",
    desc: "Three LEDs, one tiny brain and a whole lot of sequencing. Kids build a cardboard signal, wire each light through its own resistor and code a safe red–amber–green cycle. The extra challenge: add a pedestrian button.",
    materials: ["Arduino Uno", "Red, amber & green LEDs", "3 resistors", "Breadboard", "Cardboard", "Jumper wires"],
    steps: ["Build the traffic light housing from card.", "Wire the three LEDs with resistors.", "Code the light sequence and timings.", "Add a push-button 'walk' request."],
    skills: ["Sequencing", "Timing", "Digital outputs", "Model making"],
    photos: [
      { src: "assets/img/photos/student-lab-03.jpg", alt: "Two students connecting components during a hands-on technology workshop", label: "In the lab", caption: "Two makers connect components and test their circuit as a team.", credit: "Photo: Pexels" },
      { src: "assets/img/photos/project-traffic-light.jpg", alt: "An Arduino Uno wired to a breadboard with red, yellow and green LEDs", label: "The build", caption: "A real traffic-light circuit, cycling red, amber and green.", credit: "Khaifuture / CC BY-SA 3.0" }
    ]
  },
  "obstacle-rover": {
    title: "Obstacle-Avoiding Rover",
    classNum: 7,
    classLabel: "Class 7 · Circuit Coders",
    level: "Intermediate",
    levelClass: "level-intermediate",
    sessions: "5 sessions",
    board: "Arduino Uno",
    img: "assets/img/project-rover.svg",
    alt: "A two-wheeled rover with ultrasonic sensor eyes approaching a traffic cone",
    desc: "Build a rover, give it ultrasonic eyes and teach it the most important robot rule: don't crash. Kids assemble the chassis, wire a motor driver and tune the stop-and-turn logic on a real obstacle course.",
    materials: ["2-wheel chassis", "2 DC motors", "Arduino Uno", "HC-SR04 ultrasonic sensor", "Motor driver", "Battery pack"],
    steps: ["Assemble the chassis and mount the motors.", "Wire the motor driver and test each wheel.", "Mount the ultrasonic sensor and read distances.", "Code stop-and-turn logic.", "Tune it on an obstacle course."],
    skills: ["Motor control", "Sensor logic", "Serial monitor", "Debugging"],
    photos: [
      { src: "assets/img/photos/student-lab-04.jpg", alt: "Three students assembling a wheeled robot together", label: "In the lab", caption: "Three makers turn a tangle of wires into a working idea.", credit: "Photo: Pexels" },
      { src: "assets/img/photos/project-obstacle-rover.jpg", alt: "A small obstacle-avoiding robot car with an ultrasonic sensor on the front", label: "The build", caption: "Ultrasonic eyes, a motor driver and a chassis built to explore.", credit: "Anani A. George / CC0" }
    ]
  },
  "smart-dustbin": {
    title: "Smart Dustbin",
    classNum: 7,
    classLabel: "Class 7 · Circuit Coders",
    level: "Intermediate",
    levelClass: "level-intermediate",
    sessions: "4 sessions",
    board: "Arduino + servo",
    img: "assets/img/project-dustbin.svg",
    alt: "A smart dustbin with an automatically opening lid and a scrap of paper flying in",
    desc: "An everyday bin becomes a small robot with manners. An ultrasonic sensor spots an approaching hand, a servo lifts the lid and a quick delay closes it again. Kids calibrate a threshold that works for real hands.",
    materials: ["Small bin", "SG90 servo", "HC-SR04 sensor", "Arduino Uno", "Servo bracket", "Jumper wires"],
    steps: ["Mount the servo and test the lid swing.", "Wire the distance sensor.", "Choose a hand-detection threshold.", "Code open–pause–close behaviour.", "Calibrate it with real hands."],
    skills: ["Servos", "Thresholds", "Mechanisms", "User empathy"],
    photos: [
      { src: "assets/img/photos/student-lab-05.jpg", alt: "A teacher helping a young student with a robot in class", label: "In the lab", caption: "Step by step, a first circuit becomes a real robot.", credit: "Photo: Pexels" },
      { src: "assets/img/photos/project-smart-dustbin.jpg", alt: "Three colourful smart dustbins with servo-operated lids and distance sensors", label: "The build", caption: "Real smart bins: the lid opens when a hand comes close.", credit: "Pooja Jadhav / CC BY-SA 4.0" }
    ]
  },
  "line-follower": {
    title: "Line-Following Robot",
    classNum: 7,
    classLabel: "Class 7 · Circuit Coders",
    level: "Intermediate",
    levelClass: "level-intermediate",
    sessions: "5 sessions",
    board: "Arduino Uno",
    img: "assets/img/project-linebot.svg",
    alt: "A line-following robot with infrared sensor eyes tracking a black line",
    desc: "Two infrared eyes, one black line and a robot that has to think fast. Makers lay out a track, calibrate their sensors and write steering logic that keeps the bot on course through curves and corners.",
    materials: ["2-wheel chassis", "Arduino Uno", "2 IR sensors", "Motor driver", "Battery pack", "Black tape"],
    steps: ["Lay out a test track with tape.", "Mount and wire both IR sensors.", "Read light and dark values in the serial monitor.", "Code left/right steering rules.", "Tune the speed for corners."],
    skills: ["Calibration", "Feedback loops", "Conditional logic", "Iteration"],
    photos: [
      { src: "assets/img/photos/student-lab-07.jpg", alt: "Students working together on robotics projects in a classroom", label: "In the lab", caption: "Robotics class: parts out, curiosity on.", credit: "Photo: Pexels" },
      { src: "assets/img/photos/project-line-follower.jpg", alt: "A line-following robot driving along a marked track", label: "The build", caption: "A competition line follower doing exactly what the code says.", credit: "chauromano / CC BY 2.0" }
    ]
  },
  "smart-home": {
    title: "Smart Home Hub",
    classNum: 8,
    classLabel: "Class 8 · IoT Inventors",
    level: "Advanced",
    levelClass: "level-advanced",
    sessions: "6 sessions",
    board: "ESP32 + Wi-Fi",
    img: "assets/img/project-smarthome.svg",
    alt: "A smart home connected by Wi-Fi to a phone dashboard",
    desc: "A light you can control from a phone, a temperature reading that updates live, and a dashboard that makes data feel real. Kids connect an ESP32 to Wi-Fi, switch a low-voltage lamp safely and design their first IoT interface.",
    materials: ["ESP32 board", "Relay module", "DHT11 sensor", "Low-voltage LED lamp", "Breadboard", "Laptop + Wi-Fi"],
    steps: ["Prototype a local light switch.", "Connect the ESP32 to Wi-Fi.", "Publish sensor data to a dashboard.", "Switch a low-voltage lamp through a relay.", "Add an alert when temperature rises."],
    skills: ["IoT architecture", "Relay safety", "Dashboards", "Live data"],
    photos: [
      { src: "assets/img/photos/student-lab-08.jpg", alt: "A young maker holding the robot she built", label: "In the lab", caption: "A student shares the robot she built.", credit: "Photo: Pexels" },
      { src: "assets/img/photos/project-smart-home.jpg", alt: "A hand using a tablet to control a smart-home system in a kitchen", label: "The build", caption: "A real smart-home setup controlled from a tablet.", credit: "Jakub Zerdzicki / Pexels" }
    ]
  },
  "plant-waterer": {
    title: "Self-Watering Plant",
    classNum: 8,
    classLabel: "Class 8 · IoT Inventors",
    level: "Advanced",
    levelClass: "level-advanced",
    sessions: "5 sessions",
    board: "ESP32 + sensors",
    img: "assets/img/project-plant.svg",
    alt: "A self-watering plant with a soil moisture sensor wired to an Arduino and a water reservoir",
    desc: "A plant that asks for water in sensor language. Kids calibrate a soil-moisture probe, wire a pump through a relay and build an automatic watering rule with a little hysteresis — so the pump doesn't flicker on and off.",
    materials: ["Soil moisture sensor", "Mini water pump", "Relay module", "ESP32 board", "Tubing", "Water reservoir + plant"],
    steps: ["Calibrate dry and wet sensor readings.", "Wire the pump safely through a relay.", "Set a water-when-dry threshold.", "Build the reservoir and tubing.", "Log moisture levels over a week."],
    skills: ["Calibration", "Automation", "Safe power", "Sustainability"],
    photos: [
      { src: "assets/img/photos/student-lab-09.jpg", alt: "Students building and testing projects around a classroom table", label: "In the lab", caption: "A classroom of first-time makers, mid-build.", credit: "Photo: Pexels" },
      { src: "assets/img/photos/project-plant-waterer.jpg", alt: "A real automated plant-watering setup with a reservoir, tubing and potted plants", label: "The build", caption: "A working water-saving rig: the pump only runs when soil is dry.", credit: "சு. பத்மா / CC BY-SA 4.0" }
    ]
  },
  "weather-station": {
    title: "Weather Station",
    classNum: 8,
    classLabel: "Class 8 · IoT Inventors",
    level: "Advanced",
    levelClass: "level-advanced",
    sessions: "6 sessions",
    board: "ESP32 + cloud",
    img: "assets/img/project-weather.svg",
    alt: "A weather station with an anemometer, solar panel and display showing temperature",
    desc: "Measure the sky, then make the data travel. Makers read temperature, humidity and light, display live values, and push a week of readings to a cloud dashboard they can open from anywhere.",
    materials: ["ESP32 board", "DHT11 sensor", "LDR light sensor", "OLED display", "Breadboard", "Wi-Fi + laptop"],
    steps: ["Read temperature, humidity and light.", "Show live values on the display.", "Connect to Wi-Fi and publish data.", "Chart a week of readings.", "Present one weather insight."],
    skills: ["Sensor fusion", "Displays", "Cloud data", "Data storytelling"],
    photos: [
      { src: "assets/img/photos/student-lab-06.jpg", alt: "A young maker holding the robot she built", label: "In the lab", caption: "A finished build, ready for its first demo.", credit: "Photo: Pexels" },
      { src: "assets/img/photos/project-weather-station.jpg", alt: "A DIY Arduino weather station with an LCD display and sensors", label: "The build", caption: "A home-built station reading the sky on an LCD.", credit: "Crackopl / CC BY-SA 3.0" }
    ]
  }
};


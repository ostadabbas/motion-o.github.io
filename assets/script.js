const timeline = document.getElementById("timeline");
const timelineLabel = document.getElementById("timeline-label");
const playToggle = document.getElementById("play-toggle");
const reasoningOutput = document.getElementById("reasoning-output");
const frameStrip = document.getElementById("frame-strip");
const demoGif = document.getElementById("demo-gif");
const videoFlip = document.getElementById("video-flip");
const groundedCollage = document.getElementById("grounded-collage");
const demoIndex = document.getElementById("demo-index");
const demoTitle = document.getElementById("demo-title");
const demoQuestion = document.getElementById("demo-question");
const demoAnswer = document.getElementById("demo-answer");
const prevDemo = document.getElementById("prev-demo");
const nextDemo = document.getElementById("next-demo");
const demoButtons = document.getElementById("demo-buttons");
const groundedToggle = document.getElementById("grounded-toggle");
const logoModal = document.getElementById("logo-modal");
const logoModalImage = document.getElementById("logo-modal-image");

const teaserMotiono = document.getElementById("teaser-motiono");
const teaserBaseline = document.getElementById("teaser-baseline");
const legendChips = Array.from(document.querySelectorAll(".legend-chip"));
const rotatingLogo = document.getElementById("rotating-logo");
const logoHintButton = document.getElementById("logo-hint-button");
const sparseLane = document.getElementById("sparse-lane");
const denseLane = document.getElementById("dense-lane");
const trajectoryPath = document.getElementById("trajectory-path");

const teaserMotionChunks = [
  { html: "&lt;think&gt; The video begins with the ", key: null },
  { html: '<span class="token obj">&lt;obj&gt;girl&lt;/obj&gt;</span>', key: "spatial" },
  { html: '<span class="token box">&lt;box&gt;[0.05, 0.68, 0.13, 0.97]&lt;/box&gt;</span>', key: "spatial" },
  { html: "at", key: null },
  { html: '<span class="token time">&lt;t&gt;0.5&lt;/t&gt;s</span>', key: "temporal" },
  { html: " appearing on the left side of the frame, wearing a purple and white patterned dress. She then walks from left to right, and by the midpoint of her journey, the ", key: null },
  { html: '<span class="token obj">&lt;obj&gt;girl&lt;/obj&gt;</span>', key: "spatial" },
  { html: '<span class="token box">&lt;box&gt;[0.0469, 0.6935, 0.1214, 0.9991]&lt;/box&gt;</span>', key: "spatial" },
  { html: "at", key: null },
  { html: '<span class="token time">&lt;t&gt;1.5&lt;/t&gt;s</span>', key: "temporal" },
  { html: " ", key: null },
  { html: '<span class="token obj">&lt;obj&gt;girl&lt;/obj&gt;</span>', key: "spatial" },
  { html: '<span class="token box">&lt;box&gt;[0.1354, 0.6954, 0.2266, 0.9991]&lt;/box&gt;</span>', key: "spatial" },
  { html: "at", key: null },
  { html: '<span class="token time">&lt;t&gt;2.5&lt;/t&gt;s</span>', key: "temporal" },
  { html: " ", key: null },
  { html: '<span class="token obj">&lt;obj&gt;girl&lt;/obj&gt;</span>', key: "spatial" },
  { html: '<span class="token box">&lt;box&gt;[0.3, 0.69, 0.38, 1.0]&lt;/box&gt;</span>', key: "spatial" },
  { html: "at", key: null },
  { html: '<span class="token time">&lt;t&gt;3.5&lt;/t&gt;s</span>', key: "temporal" },
  { html: " is seen in the center of the frame, passing in front of the jungle gym. Continuing her path, the ", key: null },
  { html: '<span class="token obj">&lt;obj&gt;girl&lt;/obj&gt;</span>', key: "spatial" },
  { html: '<span class="token box">&lt;box&gt;[0.4411, 0.6843, 0.5234, 0.9991]&lt;/box&gt;</span>', key: "spatial" },
  { html: "at", key: null },
  { html: '<span class="token time">&lt;t&gt;4.5&lt;/t&gt;s</span>', key: "temporal" },
  { html: " ", key: null },
  { html: '<span class="token obj">&lt;obj&gt;girl&lt;/obj&gt;</span>', key: "spatial" },
  { html: '<span class="token box">&lt;box&gt;[0.5771, 0.6991, 0.6771, 0.9991]&lt;/box&gt;</span>', key: "spatial" },
  { html: "at", key: null },
  { html: '<span class="token time">&lt;t&gt;5.5&lt;/t&gt;s</span>', key: "temporal" },
  { html: " ", key: null },
  { html: '<span class="token obj">&lt;obj&gt;girl&lt;/obj&gt;</span>', key: "spatial" },
  { html: '<span class="token box">&lt;box&gt;[0.6964, 0.7222, 0.7849, 0.9991]&lt;/box&gt;</span>', key: "spatial" },
  { html: "at", key: null },
  { html: '<span class="token time">&lt;t&gt;6.5&lt;/t&gt;s</span>', key: "temporal" },
  { html: " ", key: null },
  { html: '<span class="token obj">&lt;obj&gt;girl&lt;/obj&gt;</span>', key: "spatial" },
  { html: '<span class="token box">&lt;box&gt;[0.82, 0.72, 0.9, 1.0]&lt;/box&gt;</span>', key: "spatial" },
  { html: "at", key: null },
  { html: '<span class="token time">&lt;t&gt;7.5&lt;/t&gt;s</span>', key: "temporal" },
  { html: "", key: null },
  { html: '<span class="token motion">&lt;motion obj=&quot;girl&quot; dir=&quot;E&quot; speed=&quot;fast&quot; scale=&quot;stable&quot;/&gt;</span>', key: "trajectory" },
  { html: " reaches the right side of the frame and proceeds to walk out of view, completing her traversal of the scene. &lt;/think&gt;", key: null }
];

const teaserBaselineText = `&lt;think&gt;The girl starts by walking towards the playground structure on the left side of the frame. She then moves across the playground, passing through the middle area before heading towards the right side of the frame. Her movement appears to be continuous and directed, indicating she is exploring the playground. The girl's trajectory can be described as follows: - Initially, she walks towards the left side of the playground. - She then crosses the middle area of the playground. - Finally, she heads towards the right side of the frame.&lt;/think&gt;`;

function setLegendState(activeKey) {
  legendChips.forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.key === activeKey);
  });
}

function runTeaserTrace() {
  if (!teaserMotiono || !teaserBaseline) {
    return;
  }

  const baselineChunks = teaserBaselineText.match(/.{1,42}(\s|$)/g) || [teaserBaselineText];
  const RESTART_DELAY_MS = 900;
  let cycleTimeout = null;

  const runCycle = () => {
    teaserBaseline.innerHTML = "";
    teaserMotiono.innerHTML = "";
    setLegendState(null);

    let motionIndex = 0;
    let baselineIndex = 0;
    let motionDone = false;
    let baselineDone = false;

    const maybeRestart = () => {
      if (!motionDone || !baselineDone) {
        return;
      }
      cycleTimeout = window.setTimeout(runCycle, RESTART_DELAY_MS);
    };

    const stepMotion = () => {
      const chunk = teaserMotionChunks[motionIndex];
      teaserMotiono.innerHTML += chunk.html;
      if (chunk.key) {
        setLegendState(chunk.key);
      }
      motionIndex += 1;

      if (motionIndex < teaserMotionChunks.length) {
        const delay = chunk.key === "trajectory" ? 900 : 230;
        window.setTimeout(stepMotion, delay);
      } else {
        motionDone = true;
        maybeRestart();
      }
    };

    const stepBaseline = () => {
      teaserBaseline.innerHTML += baselineChunks[baselineIndex] || "";
      baselineIndex += 1;
      if (baselineIndex < baselineChunks.length) {
        window.setTimeout(stepBaseline, 280);
      } else {
        baselineDone = true;
        maybeRestart();
      }
    };

    stepMotion();
    stepBaseline();
  };

  if (cycleTimeout) {
    window.clearTimeout(cycleTimeout);
  }
  runCycle();
}

function initDynamicTeaser() {
  if (!sparseLane || !denseLane || !trajectoryPath) {
    return;
  }

  sparseLane.classList.add("collapsible");
  denseLane.classList.add("collapsible");

  const bboxCoords = [
    [0.05, 0.68, 0.13, 0.97],
    [0.0469, 0.6935, 0.1214, 0.9991],
    [0.1354, 0.6954, 0.2266, 0.9991],
    [0.3, 0.69, 0.38, 1.0],
    [0.4411, 0.6843, 0.5234, 0.9991],
    [0.5771, 0.6991, 0.6771, 0.9991],
    [0.6964, 0.7222, 0.7849, 0.9991],
    [0.82, 0.72, 0.9, 1.0]
  ];

  const frameFiles = Array.from({ length: 8 }, (_, index) => ({
    index,
    path: `./assets/plm_000009_bbox_frames/plm_000009_${index}_time_${index + 0.5}_bbox.jpg`
  }));

  const sparseKeepIndices = new Set([0, 3, 7]);
  const sparsePseudoFrames = [];
  const denseFrames = [];

  frameFiles.forEach((frame) => {
    const sparseCell = document.createElement("div");
    sparseCell.className = "lane-frame";
    sparseCell.dataset.label = `F${frame.index}`;

    if (sparseKeepIndices.has(frame.index)) {
      sparseCell.classList.add("keyframe");
      const image = document.createElement("img");
      image.src = frame.path;
      image.alt = `Sparse keyframe ${frame.index}`;
      sparseCell.appendChild(image);

      const [sx1, sy1, sx2, sy2] = bboxCoords[frame.index];
      const sparseBbox = document.createElement("div");
      sparseBbox.className = "bbox-overlay";
      sparseBbox.style.left = `${sx1 * 100}%`;
      sparseBbox.style.top = `${sy1 * 100}%`;
      sparseBbox.style.width = `${(sx2 - sx1) * 100}%`;
      sparseBbox.style.height = `${(sy2 - sy1) * 100}%`;
      sparseCell.appendChild(sparseBbox);
    } else {
      sparseCell.classList.add("pseudoframe");
      sparseCell.dataset.label = `~F${frame.index}`;
      const unknownMark = document.createElement("span");
      unknownMark.className = "unknown-mark";
      unknownMark.textContent = "?";
      sparseCell.appendChild(unknownMark);
      sparsePseudoFrames.push(sparseCell);
    }

    sparseLane.appendChild(sparseCell);

    const denseCell = document.createElement("div");
    denseCell.className = "lane-frame";
    denseCell.dataset.label = `F${frame.index}`;
    const denseImage = document.createElement("img");
    denseImage.src = frame.path;
    denseImage.alt = `Grounded frame ${frame.index}`;
    denseCell.appendChild(denseImage);

    const [x1, y1, x2, y2] = bboxCoords[frame.index];
    const bbox = document.createElement("div");
    bbox.className = "bbox-overlay";
    bbox.style.left = `${x1 * 100}%`;
    bbox.style.top = `${y1 * 100}%`;
    bbox.style.width = `${(x2 - x1) * 100}%`;
    bbox.style.height = `${(y2 - y1) * 100}%`;
    denseCell.appendChild(bbox);

    denseLane.appendChild(denseCell);
    denseFrames.push(denseCell);
  });

  const trajectoryPoints = bboxCoords
    .map((coords, idx) => {
      const [x1, y1, x2, y2] = coords;
      const centerY = (y1 + y2) / 2;
      const x = 6 + idx * 12.5;
      const y = 1 + centerY * 8;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
  trajectoryPath.setAttribute("d", `M ${trajectoryPoints}`);

  let pseudoActive = 0;
  window.setInterval(() => {
    sparsePseudoFrames.forEach((frame, idx) => {
      frame.classList.toggle("active", idx === pseudoActive);
    });
    pseudoActive = (pseudoActive + 1) % sparsePseudoFrames.length;
  }, 620);

  let denseActive = 0;
  window.setInterval(() => {
    denseFrames.forEach((frame, idx) => {
      frame.classList.toggle("active", idx === denseActive);
    });
    denseActive = (denseActive + 1) % denseFrames.length;
  }, 530);
}

const DEMO_BASES = [
  "./assets/viz_for_io/output_vstar_frames_motiono_v3_4859084_ckpt200/vqa_12_4263096481_io",
  "./assets/viz_for_io/output_vstar_frames_openo3_v2_4896760_ckpt1000/vqa_7_6592821115_io_multi_object",
  "./assets/viz_for_io/output_vstar_frames_openo3_v2_4896760_ckpt1000/vqa_12_s02e01_seg02_clip_02_io_multi_object",
  "./assets/viz_for_io/output_vstar_frames_openo3_v2_4896760_ckpt1000/vqa_6_4650556666_io",
  "./assets/viz_for_io/output_vstar_frames_openo3_v2_4896760_ckpt1000/vqa_9_9409566840_io_multi_object",
  "./assets/viz_for_io/output_vstar_frames_openo3_v2_4896760_ckpt1000/vqa_16_3939145327_io",
  "./assets/viz_for_io/output_vstar_frames_openo3_v3_074917638_ckpt600/vqa_6_s07e07_seg02_clip_04_io",
  "./assets/viz_for_io/output_vstar_frames_openo3_v2_4896760_ckpt1000/vqa_18_6265968082_io"
];

const GROUNDED_FRAME_FILES = {
  [DEMO_BASES[0]]: ["frame_01_1.4s_person_s_hand.png", "frame_02_5.6s_person_s_hand.png"],
  [DEMO_BASES[1]]: ["frame_01_5.0s_child_in_white.png", "frame_02_20.0s_woman.png", "frame_03_20.0s_child_in_white.png"],
  [DEMO_BASES[2]]: ["frame_01_3.7s_Penny.png", "frame_02_3.7s_Sheldon.png", "frame_03_11.7s_Sheldon.png"],
  [DEMO_BASES[3]]: ["frame_01_1.5s_baby.png", "frame_02_3.0s_baby.png", "frame_03_12.0s_baby.png"],
  [DEMO_BASES[4]]: ["frame_01_2.3s_white_dog.png", "frame_02_6.9s_light_brown_dog.png", "frame_03_13.8s_light_brown_dog.png"],
  [DEMO_BASES[5]]: ["frame_01_2.6s_child.png"],
  [DEMO_BASES[6]]: ["frame_01_4.0s_Howard.png"],
  [DEMO_BASES[7]]: ["frame_01_2.8s_guitarist.png", "frame_02_14.1s_guitarist.png"]
};

const LOCAL_FALLBACK_DATA = [
  {
    basePath: DEMO_BASES[0],
    outputText: `Question: who holds the fish?

Reasoning:
The video shows a person preparing a fish on a table. Initially, the <obj>person's hand</obj><box>[0,0,222,224]</box>at<t>1.4</t>s is seen holding the fish steady while another hand uses scissors to cut along its body. As the preparation continues, the <obj>person's hand</obj><box>[0,0,222,224]</box>at<t>5.6</t>s<motion obj="person's hand" dir="STAT" speed="stationary" scale="stable"/> remains firmly gripping the fish, ensuring it stays in place for the cutting process.

Answer: A person's hands hold the fish steady on the table as they prepare it.`,
    entryData: {
      width: 320,
      height: 240,
      bboxes: [
        { timestamp: 0, xmin: 0, ymin: 0, xmax: 181, ymax: 156 },
        { timestamp: 1, xmin: 5, ymin: 15, xmax: 168, ymax: 162 },
        { timestamp: 2, xmin: 0, ymin: 25, xmax: 159, ymax: 167 },
        { timestamp: 3, xmin: 0, ymin: 21, xmax: 152, ymax: 166 },
        { timestamp: 4, xmin: 0, ymin: 0, xmax: 155, ymax: 136 },
        { timestamp: 5, xmin: 2, ymin: 1, xmax: 153, ymax: 142 }
      ]
    }
  },
  {
    basePath: DEMO_BASES[1],
    outputText: `Question: who hugs the child in white on the ground?

Reasoning:
The video shows a woman sitting on the floor. A <obj>child in white</obj><box>[313,101,588,420]</box>at<t>5.0</t>s<motion obj="child in white" dir="STAT" speed="stationary" scale="stable"/> is seen crawling towards her. Subsequently, the <obj>woman</obj><box>[101,63,408,420]</box>at<t>20.0</t>s<motion obj="woman" dir="STAT" speed="stationary" scale="stable"/> picks up the <obj>child in white</obj><box>[164,112,353,319]</box>at<t>20.0</t>s<motion obj="child in white" dir="W" speed="slow" scale="stable"/> and holds her close, confirming that she is the one who hugs the child.

Answer: The woman hugs the child in white on the ground.`,
    entryData: {
      width: 640,
      height: 424,
      bboxes: [
        { timestamp: 36, xmin: 330, ymin: 29, xmax: 464, ymax: 321 },
        { timestamp: 37, xmin: 312, ymin: 53, xmax: 479, ymax: 292 },
        { timestamp: 38, xmin: 318, ymin: 50, xmax: 482, ymax: 287 },
        { timestamp: 39, xmin: 282, ymin: 33, xmax: 421, ymax: 220 },
        { timestamp: 40, xmin: 186, ymin: 32, xmax: 320, ymax: 211 },
        { timestamp: 41, xmin: 199, ymin: 48, xmax: 320, ymax: 257 },
        { timestamp: 42, xmin: 204, ymin: 33, xmax: 332, ymax: 250 },
        { timestamp: 43, xmin: 233, ymin: 26, xmax: 360, ymax: 250 },
        { timestamp: 44, xmin: 239, ymin: 20, xmax: 388, ymax: 259 }
      ]
    }
  },
  {
    basePath: DEMO_BASES[2],
    outputText: `Question: What was Sheldon doing when Penny said something about grad school ?

Reasoning:
The video shows a conversation between <obj>Penny</obj><box>[214,0,448,336]</box>at<t>3.7</t>s<motion obj="Penny" dir="STAT" speed="stationary" scale="stable"/> and <obj>Sheldon</obj><box>[0,0,214,336]</box>at<t>3.7</t>s<motion obj="Sheldon" dir="STAT" speed="stationary" scale="stable"/> in a laundry room. Penny is speaking to him, and at this moment, she mentions that she is going to grad school. Immediately after she says this, the camera focuses on <obj>Sheldon</obj><box>[113,0,403,336]</box>at<t>11.7</t>s<motion obj="Sheldon" dir="STAT" speed="stationary" scale="stable"/>, who is looking down at some clothes on the table. This visual evidence confirms that he was folding clothes while Penny was talking.

Answer: Sheldon was folding clothes on the table.`,
    entryData: {
      width: 640,
      height: 360,
      bboxes: [{ timestamp: 11, xmin: 187, ymin: 276, xmax: 398, ymax: 356 }]
    }
  },
  {
    basePath: DEMO_BASES[3],
    outputText: `Question: who does the adult hold hand of?

Reasoning:
The video shows an adult helping a baby learn to walk. At the beginning of the clip, the <obj>baby</obj><box>[223,130,370,340]</box>at<t>1.5</t>s is holding onto the adult's hands for support as they take their first steps. As the baby continues to practice walking, the adult holds the baby's hands to help them maintain balance. For instance, the <obj>baby</obj><box>[223,130,370,340]</box>at<t>3.0</t>s<motion obj="baby" dir="W" speed="slow" scale="stable"/> is still holding the adult's hands while learning to walk. This interaction continues throughout the segment, as seen again when the <obj>baby</obj><box>[223,130,370,340]</box>at<t>12.0</t>s<motion obj="baby" dir="E" speed="slow" scale="stable"/> is holding the adult's hands. Therefore, the adult is holding the hand of the baby.

Answer: The adult holds the hand of a baby.`,
    entryData: {
      width: 640,
      height: 424,
      bboxes: [
        { timestamp: 1.5, xmin: 223, ymin: 130, xmax: 370, ymax: 340 },
        { timestamp: 3.0, xmin: 223, ymin: 130, xmax: 370, ymax: 340 },
        { timestamp: 12.0, xmin: 223, ymin: 130, xmax: 370, ymax: 340 }
      ]
    }
  },
  {
    basePath: DEMO_BASES[4],
    outputText: `Question: what bites the white dog?

Reasoning:
The video shows two dogs interacting. A <obj>white dog</obj><box>[0,101,302,336]</box>at<t>2.3</t>s is lying on its side while another dog, which has light brown fur, is seen biting its neck. This action continues as the <obj>light brown dog</obj><box>[160,0,644,336]</box>at<t>6.9</t>s<motion obj="light brown dog" dir="E" speed="slow" scale="approaching"/> keeps its mouth open and bites the white dog's neck. The interaction persists, with the <obj>light brown dog</obj><box>[160,0,644,336]</box>at<t>13.8</t>s<motion obj="light brown dog" dir="W" speed="fast" scale="stable"/> still engaged in this behavior. Therefore, the light brown dog is the one biting the white dog.

Answer: A light brown dog is seen biting the white dog's neck.`,
    entryData: {
      width: 640,
      height: 424,
      bboxes: [
        { timestamp: 2.3, xmin: 0, ymin: 101, xmax: 302, ymax: 336 },
        { timestamp: 6.9, xmin: 160, ymin: 0, xmax: 640, ymax: 336 },
        { timestamp: 13.8, xmin: 160, ymin: 0, xmax: 640, ymax: 336 }
      ]
    }
  },
  {
    basePath: DEMO_BASES[5],
    outputText: `Question: what does the child wearing pink pants ride?

Reasoning:
The video shows a <obj>child</obj><box>[160,0,416,280]</box>at<t>2.6</t>s<motion obj="child" dir="E" speed="slow" scale="stable"/> sitting on a red tricycle. She is holding onto the handlebars and appears to be learning how to ride it. As she pedals forward, the camera follows her movement, confirming that the vehicle she is riding is indeed a tricycle.

Answer: The child is riding a red tricycle.`,
    entryData: {
      width: 640,
      height: 360,
      bboxes: [{ timestamp: 2.6, xmin: 160, ymin: 0, xmax: 416, ymax: 280 }]
    }
  },
  {
    basePath: DEMO_BASES[6],
    outputText: `Question: What did Howard do after he said about Raj wanting to have fun ?

Reasoning:
The video shows Howard's actions immediately after he says "Raj wants to have fun." At this point, <obj>Howard</obj><box>[273,45,481,336]</box>at<t>4.0</t>s<motion obj="Howard" dir="W" speed="slow" scale="stable"/> is standing up from his chair while holding a water bottle. He then proceeds to pour water into a glass held by Raj, who is seated on the couch. This sequence of actions directly follows Howard's statement.

Answer: After saying that Raj wants to have fun, Howard stood up from his chair, picked up a water bottle, and poured water into a glass for Raj.`,
    entryData: {
      width: 640,
      height: 360,
      bboxes: [{ timestamp: 4.0, xmin: 273, ymin: 45, xmax: 481, ymax: 336 }]
    }
  },
  {
    basePath: DEMO_BASES[7],
    outputText: `Question: who plays the white and black guitar on the stage?

Reasoning:
The video shows a <obj>guitarist</obj><box>[202,78,395,336]</box>at<t>2.8</t>s playing a white and black electric guitar on stage. He is positioned next to another guitarist. As the performance continues, the camera zooms in on the <obj>guitarist</obj><box>[151,78,403,336]</box>at<t>14.1</t>s<motion obj="guitarist" dir="STAT" speed="stationary" scale="stable"/>, providing a clear view of him singing into a microphone while playing his instrument. This visual evidence confirms that the person playing the white and black guitar is also singing.

Answer: The person playing the white and black guitar is also singing into a microphone.`,
    entryData: {
      width: 640,
      height: 360,
      bboxes: [
        { timestamp: 0, xmin: 375, ymin: 107, xmax: 463, ymax: 332 },
        { timestamp: 1, xmin: 330, ymin: 134, xmax: 437, ymax: 358 },
        { timestamp: 2, xmin: 361, ymin: 122, xmax: 468, ymax: 346 },
        { timestamp: 3, xmin: 395, ymin: 140, xmax: 507, ymax: 359 },
        { timestamp: 4, xmin: 413, ymin: 123, xmax: 521, ymax: 354 },
        { timestamp: 5, xmin: 426, ymin: 142, xmax: 528, ymax: 359 },
        { timestamp: 6, xmin: 410, ymin: 149, xmax: 544, ymax: 359 },
        { timestamp: 7, xmin: 459, ymin: 132, xmax: 618, ymax: 357 },
        { timestamp: 8, xmin: 512, ymin: 137, xmax: 639, ymax: 359 }
      ]
    }
  }
];

let demos = [];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatReasoningTokens(reasoningText) {
  let formatted = escapeHtml(reasoningText.replace(/\s+/g, " ").trim());
  formatted = formatted.replace(
    /&lt;obj&gt;([\s\S]*?)&lt;\/obj&gt;/g,
    '<span class="token obj">&lt;obj&gt;$1&lt;/obj&gt;</span>'
  );
  formatted = formatted.replace(
    /&lt;box&gt;\[([\s\S]*?)\]&lt;\/box&gt;/g,
    '<span class="token box">&lt;box&gt;[$1]&lt;/box&gt;</span>'
  );
  formatted = formatted.replace(
    /&lt;t&gt;([\s\S]*?)&lt;\/t&gt;/g,
    '<span class="token time">&lt;t&gt;$1&lt;/t&gt;</span>'
  );
  formatted = formatted.replace(
    /&lt;motion[\s\S]*?\/&gt;/g,
    (match) => `<span class="token motion">${match}</span>`
  );
  return formatted;
}

function chunkReasoningHtml(formattedHtml) {
  const pieces = formattedHtml
    .split(/(<span class="token [^"]+">[\s\S]*?<\/span>)/g)
    .filter(Boolean);
  const chunks = [];
  pieces.forEach((piece) => {
    if (piece.startsWith('<span class="token ')) {
      chunks.push(piece);
      return;
    }
    const textChunks = piece.match(/\S+\s*|\s+/g) || [];
    chunks.push(...textChunks);
  });
  return chunks.length ? chunks : [formattedHtml];
}

function parseOutputContent(content) {
  const question = (content.match(/^Question:\s*(.+)$/im) || [null, ""])[1].trim();
  const answer = (content.match(/^Answer:\s*(.+)$/im) || [null, ""])[1].trim();
  const reasoningMatch = content.match(/Reasoning:\s*([\s\S]*?)\n\s*Answer:/i);
  const reasoning = reasoningMatch ? reasoningMatch[1].trim() : "";
  const motionRaw = (reasoning.match(/<motion[\s\S]*?\/>/) || [null])[0];

  const mentions = [];
  reasoning.replace(/<box>\[([^\]]+)\]<\/box>at<t>([\d.]+)<\/t>/g, (_, boxText, timeText) => {
    const coords = boxText
      .split(",")
      .map((part) => Number(part.trim()))
      .filter((value) => Number.isFinite(value));
    if (coords.length === 4) {
      mentions.push({ timestamp: Number(timeText), coords });
    }
    return "";
  });

  const lines = reasoning
    .split(/(?<=[.!?])\s+(?=[A-Z<])/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => chunkReasoningHtml(formatReasoningTokens(line)));

  return {
    question,
    answer,
    reasoning,
    lines: lines.length ? lines : [[formatReasoningTokens(reasoning)]],
    mentions,
    motionSummary: motionRaw ? formatReasoningTokens(motionRaw) : "No explicit motion tag detected."
  };
}

function normalizeBoxFromEntry(box, width, height) {
  return {
    x1: Math.max(0, Math.min(1, box.xmin / width)),
    y1: Math.max(0, Math.min(1, box.ymin / height)),
    x2: Math.max(0, Math.min(1, box.xmax / width)),
    y2: Math.max(0, Math.min(1, box.ymax / height))
  };
}

function getNearestEntryBox(entryBoxes, timestamp) {
  if (!entryBoxes.length) {
    return null;
  }
  return entryBoxes.reduce((best, current) => {
    const bestDelta = Math.abs(best.timestamp - timestamp);
    const currentDelta = Math.abs(current.timestamp - timestamp);
    return currentDelta < bestDelta ? current : best;
  });
}

function buildDemoFromFiles(basePath, outputData, entryData) {
  const parsed = parseOutputContent(outputData);
  const width = Number(entryData.width) || 320;
  const height = Number(entryData.height) || 240;
  const entryBoxes = Array.isArray(entryData.bboxes)
    ? entryData.bboxes
        .map((box) => ({
          timestamp: Number(box.timestamp),
          bbox: normalizeBoxFromEntry(box, width, height)
        }))
        .filter((item) => Number.isFinite(item.timestamp))
    : [];

  const mentionTimes = parsed.mentions.map((mention) => mention.timestamp).filter(Number.isFinite);
  const fallbackTimes = entryBoxes.map((item) => item.timestamp).slice(0, 4);
  const keyTimes = (mentionTimes.length ? mentionTimes : fallbackTimes).slice(0, Math.max(parsed.lines.length, 2));

  const labels = (keyTimes.length ? keyTimes : [0]).map((time) => `${Number(time).toFixed(1)}s`);
  const stepBboxes = keyTimes.map((time) => {
    const nearest = getNearestEntryBox(entryBoxes, time);
    return nearest ? nearest.bbox : null;
  });

  while (parsed.lines.length < labels.length) {
    parsed.lines.push(parsed.lines[parsed.lines.length - 1]);
  }

  return {
    title: parsed.question ? parsed.question.replace(/\?+\s*$/, "?") : "Qualitative example",
    question: parsed.question,
    answer: parsed.answer,
    labels,
    motionSummary: parsed.motionSummary,
    steps: parsed.lines.slice(0, labels.length),
    stepBboxes,
    gifPath: `${basePath}/sampled_keyframes_with_bbox.gif`,
    previewPath: `${basePath}/frame_00_start.png`,
    groundedFrames: (GROUNDED_FRAME_FILES[basePath] || []).map((fileName) => `${basePath}/${fileName}`)
  };
}

let currentDemo = 0;
let currentStep = 0;
let isPlaying = false;
let showingGroundedFrames = false;
let playTimeout = null;
let typingTimeout = null;

function setThinkButtonState(active) {
  if (!playToggle) {
    return;
  }
  playToggle.textContent = active ? "Thinking..." : "Watch me think";
  playToggle.classList.toggle("is-thinking", active);
}

function renderGroundedCollage() {
  if (!groundedCollage || !demos.length) {
    return;
  }
  const demo = demos[currentDemo];
  groundedCollage.innerHTML = "";
  const framePaths = demo.groundedFrames || [];
  if (!framePaths.length) {
    const emptyState = document.createElement("p");
    emptyState.className = "grounded-empty";
    emptyState.textContent = "Grounded frames are not available for this sample.";
    groundedCollage.appendChild(emptyState);
    return;
  }
  framePaths.forEach((path, index) => {
    const card = document.createElement("figure");
    card.className = "grounded-card";
    const image = document.createElement("img");
    image.src = path;
    image.alt = `Grounded frame ${index + 1}`;
    card.appendChild(image);
    groundedCollage.appendChild(card);
  });
}

function setGroundedView(active) {
  showingGroundedFrames = active;
  if (videoFlip) {
    videoFlip.classList.toggle("show-grounded", active);
  }
  if (groundedToggle) {
    groundedToggle.textContent = active ? "Back to GIF" : "See grounded frames";
  }
  if (active) {
    renderGroundedCollage();
  }
}

function showPreviewFrame() {
  if (!demoGif || !demos.length) {
    return;
  }
  const { previewPath } = demos[currentDemo];
  if (!previewPath) {
    demoGif.removeAttribute("src");
    return;
  }
  demoGif.src = previewPath;
  demoGif.onerror = () => {
    demoGif.removeAttribute("src");
  };
}

function startGifPlayback() {
  if (!demoGif || !demos.length) {
    return;
  }
  const { gifPath } = demos[currentDemo];
  if (!gifPath) {
    return;
  }
  demoGif.src = `${gifPath}?play=${Date.now()}`;
  demoGif.onerror = () => {
    demoGif.removeAttribute("src");
  };
}

function initLogoToggle() {
  if (!rotatingLogo) {
    return;
  }

  const openLogoModal = () => {
    if (!logoModal) {
      return;
    }
    logoModal.classList.add("is-open");
    logoModal.setAttribute("aria-hidden", "false");
    if (logoModalImage) {
      logoModalImage.focus?.();
    }
  };

  const closeLogoModal = () => {
    if (!logoModal) {
      return;
    }
    logoModal.classList.remove("is-open");
    logoModal.setAttribute("aria-hidden", "true");
  };

  rotatingLogo.addEventListener("click", openLogoModal);
  if (logoHintButton) {
    logoHintButton.addEventListener("click", openLogoModal);
  }

  if (logoModal) {
    logoModal.addEventListener("click", (event) => {
      if (event.target === logoModal) {
        closeLogoModal();
      }
    });
  }

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && logoModal?.classList.contains("is-open")) {
      closeLogoModal();
    }
  });

  if (logoModalImage) {
    logoModalImage.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }
}

function stopTyping() {
  if (typingTimeout) {
    window.clearTimeout(typingTimeout);
    typingTimeout = null;
  }
}

function stopPlayback() {
  isPlaying = false;
  setThinkButtonState(false);
  if (playTimeout) {
    window.clearTimeout(playTimeout);
    playTimeout = null;
  }
  stopTyping();
  reasoningOutput.innerHTML = "";
  showPreviewFrame();
}

function updateDemoButtonsActiveState() {
  if (!demoButtons) {
    return;
  }
  const buttons = Array.from(demoButtons.querySelectorAll(".demo-jump"));
  buttons.forEach((button, index) => {
    button.classList.toggle("active", index === currentDemo);
  });
}

function buildDemoButtons() {
  if (!demoButtons || !demos.length) {
    return;
  }
  demoButtons.innerHTML = "";
  demos.forEach((demo, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "demo-jump";
    button.textContent = `${String(index + 1).padStart(2, "0")}`;
    button.setAttribute("aria-label", `Go to example ${index + 1}: ${demo.title}`);
    button.addEventListener("click", () => {
      if (currentDemo === index) {
        return;
      }
      stopPlayback();
      currentDemo = index;
      renderDemo(true);
    });
    demoButtons.appendChild(button);
  });
  updateDemoButtonsActiveState();
}

function buildFrameChips() {
  if (!demos.length || !frameStrip) {
    return;
  }
  const demo = demos[currentDemo];
  frameStrip.innerHTML = "";
  frameStrip.style.gridTemplateColumns = `repeat(${demo.labels.length}, minmax(0, 1fr))`;
  demo.labels.forEach((label, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "frame-chip";
    button.textContent = label;
    button.addEventListener("click", () => {
      stopPlayback();
      setStep(index, { instant: true });
    });
    frameStrip.appendChild(button);
  });
}

function setFrameState() {
  if (!demos.length) {
    return;
  }
  if (frameStrip) {
    const chips = Array.from(document.querySelectorAll(".frame-chip"));
    chips.forEach((chip, index) => {
      chip.classList.toggle("active", index === currentStep);
    });
  }
  if (timeline) {
    timeline.max = String(demos[currentDemo].labels.length - 1);
    timeline.value = String(currentStep);
  }
  if (timelineLabel) {
    timelineLabel.textContent = demos[currentDemo].labels[currentStep];
  }
}

function getStepDuration(step) {
  if (!demos.length) {
    return 1000;
  }
  const stepHtml = demos[currentDemo].steps[step].join("");
  return stepHtml.includes("token motion") ? 1800 : 1000;
}

function typeStep(step, instant = false, onDone = null) {
  const demo = demos[currentDemo];
  stopTyping();
  reasoningOutput.innerHTML = "";

  for (let index = 0; index < step; index += 1) {
    const line = document.createElement("p");
    line.className = "reasoning-line";
    line.innerHTML = demo.steps[index].join("");
    reasoningOutput.appendChild(line);
  }

  const activeLine = document.createElement("p");
  activeLine.className = "reasoning-line";
  reasoningOutput.appendChild(activeLine);

  const motionBox = document.createElement("div");
  motionBox.className = "motion-focus";
  motionBox.innerHTML = `<strong>Motion Focus</strong><div>${step === demo.steps.length - 1 || instant ? demo.motionSummary : "Waiting for the motion step to resolve."}</div>`;
  reasoningOutput.appendChild(motionBox);

  if (instant) {
    activeLine.innerHTML = demo.steps[step].join("");
    if (onDone) {
      onDone();
    }
    return;
  }

  activeLine.classList.add("typing-cursor");
  let chunkIndex = 0;

  const tick = () => {
    const chunk = demo.steps[step][chunkIndex];
    activeLine.innerHTML += chunk;
    if (chunk.includes("token motion")) {
      motionBox.innerHTML = `<strong>Motion Focus</strong><div>${demo.motionSummary}</div>`;
    }
    chunkIndex += 1;

    if (chunkIndex >= demo.steps[step].length) {
      activeLine.classList.remove("typing-cursor");
      typingTimeout = null;
      if (onDone) {
        onDone();
      }
      return;
    }

    const nextChunk = demo.steps[step][chunkIndex];
    const delay = nextChunk.includes("token motion") ? 520 : 80;
    typingTimeout = window.setTimeout(tick, delay);
  };

  typingTimeout = window.setTimeout(tick, 60);
}

function setStep(step, options = {}) {
  if (!demos.length) {
    return;
  }
  const maxStep = demos[currentDemo].labels.length - 1;
  currentStep = Math.max(0, Math.min(step, maxStep));
  setFrameState();
  typeStep(currentStep, options.instant === true, options.onDone || null);
}

function renderDemo(instant = true) {
  if (!demos.length) {
    return;
  }
  const demo = demos[currentDemo];
  demoIndex.textContent = String(currentDemo + 1).padStart(2, "0");
  demoTitle.textContent = demo.title;
  demoQuestion.textContent = demo.question;
  demoAnswer.textContent = demo.answer;
  currentStep = 0;
  setGroundedView(false);
  showPreviewFrame();
  buildFrameChips();
  reasoningOutput.innerHTML = "";
  if (instant) {
    stopTyping();
  }
  const hasMultiple = demos.length > 1;
  prevDemo.disabled = !hasMultiple;
  nextDemo.disabled = !hasMultiple;
  buildDemoButtons();
  updateDemoButtonsActiveState();
}

function startPlayback() {
  if (!demos.length) {
    return;
  }
  if (isPlaying) {
    return;
  }
  isPlaying = true;
  setThinkButtonState(true);
  setGroundedView(false);
  startGifPlayback();
  reasoningOutput.innerHTML = "";
  currentStep = 0;
  setFrameState();

  const runStep = (step) => {
    if (!isPlaying) {
      return;
    }
    setStep(step, {
      onDone: () => {
        if (!isPlaying) {
          return;
        }
        const lastStep = demos[currentDemo].labels.length - 1;
        if (step >= lastStep) {
          stopPlayback();
          return;
        }
        playTimeout = window.setTimeout(() => runStep(step + 1), getStepDuration(step));
      }
    });
  };

  runStep(0);
}

if (timeline) {
  timeline.addEventListener("input", (event) => {
    if (!demos.length) {
      return;
    }
    stopPlayback();
    setStep(Number(event.target.value), { instant: true });
  });
}

playToggle.addEventListener("click", () => {
  if (isPlaying) {
    stopPlayback();
    return;
  }
  startPlayback();
});

if (groundedToggle) {
  groundedToggle.addEventListener("click", () => {
    if (isPlaying) {
      stopPlayback();
    }
    setGroundedView(!showingGroundedFrames);
  });
}

prevDemo.addEventListener("click", () => {
  if (demos.length <= 1) {
    return;
  }
  stopPlayback();
  currentDemo = (currentDemo - 1 + demos.length) % demos.length;
  renderDemo(true);
});

nextDemo.addEventListener("click", () => {
  if (demos.length <= 1) {
    return;
  }
  stopPlayback();
  currentDemo = (currentDemo + 1) % demos.length;
  renderDemo(true);
});

runTeaserTrace();
initDynamicTeaser();
setThinkButtonState(false);
initLogoToggle();

async function loadQualitativeDemo() {
  try {
    const loaded = await Promise.all(
      DEMO_BASES.map(async (basePath) => {
        const fallbackItem = LOCAL_FALLBACK_DATA.find((item) => item.basePath === basePath);
        const outputPath = `${basePath}/output.txt`;
        const entryPath = `${basePath}/entry.json`;
        let outputText = "";
        let entryJson = null;

        try {
          const outputResponse = await fetch(outputPath);
          if (outputResponse.ok) {
            outputText = await outputResponse.text();
          }
        } catch (error) {
          // Fall back to embedded data when local fetch is unavailable.
        }
        if (!outputText && fallbackItem) {
          outputText = fallbackItem.outputText;
        }
        if (!outputText) {
          return null;
        }

        try {
          const entryResponse = await fetch(entryPath);
          if (entryResponse.ok) {
            entryJson = await entryResponse.json();
          }
        } catch (error) {
          // Some examples only have output.txt + frames; use fallback entry data.
        }
        if (!entryJson && fallbackItem) {
          entryJson = fallbackItem.entryData;
        }
        if (!entryJson) {
          entryJson = { width: 640, height: 360, bboxes: [] };
        }

        return buildDemoFromFiles(basePath, outputText, entryJson);
      })
    );
    demos = loaded.filter(Boolean);
    if (!demos.length) {
      throw new Error("No qualitative examples loaded.");
    }
    renderDemo(true);
  } catch (error) {
    demos = LOCAL_FALLBACK_DATA.map((item) =>
      buildDemoFromFiles(item.basePath, item.outputText, item.entryData)
    );
    renderDemo(true);
  }
}

loadQualitativeDemo();

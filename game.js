const app = document.querySelector("#app");
const tagKeys = ["CTRL", "VOID", "COPY", "TUNE", "WORLD", "BOSS", "BENCH", "DOOM", "GURU", "HACK", "CHECK", "PURE"];
const personaSpritePositions = {
  CTRL: { x: 0, y: 0 },
  VOID: { x: 1, y: 0 },
  COPY: { x: 2, y: 0 },
  TUNE: { x: 3, y: 0 },
  WORLD: { x: 0, y: 1 },
  BOSS: { x: 1, y: 1 },
  BENCH: { x: 2, y: 1 },
  DOOM: { x: 3, y: 1 },
  GURU: { x: 0, y: 2 },
  HACK: { x: 1, y: 2 },
  CHECK: { x: 2, y: 2 },
  PURE: { x: 3, y: 2 }
};
const dimensionTokenToKey = {
  "68c5b08dcae3e6dc": "reliance",
  "ab0f5880dbc8204c": "control",
  "24c06ae12af83f89": "emotion",
  "4b64fd912fc295f4": "output",
  "6f9f7bef8bf3057d": "tuning",
  "80e6d07b3831e524": "imagination",
  "55b32fdcb0d7da3e": "command",
  "9c83d502417f57cc": "comparison",
  "1584a0358194bc3c": "crisis",
  "5cab3126d1976286": "evangelism",
  "629a8a651bf19814": "boundary",
  "e8d313bbf6c24ee3": "social",
  "914ae4d25c896181": "resistance"
};
const dimensionLabels = {
  reliance: "AI依赖度",
  control: "控制欲",
  emotion: "情绪托管率",
  output: "提交效率",
  tuning: "炼丹浓度",
  imagination: "世界观膨胀率",
  command: "指挥欲",
  comparison: "横评欲",
  crisis: "存在危机浓度",
  evangelism: "布道冲动",
  boundary: "边界测试欲",
  social: "社交审查率",
  resistance: "嘴硬指数"
};
const dimensionLabelsEn = {
  reliance: "AI reliance",
  control: "Control drive",
  emotion: "Emotional outsourcing",
  output: "Output mode",
  tuning: "Prompt tuning",
  imagination: "Worldbuilding",
  command: "Command drive",
  comparison: "Model benchmarking",
  crisis: "Existential anxiety",
  evangelism: "AI evangelism",
  boundary: "Boundary testing",
  social: "Social pre-check",
  resistance: "Denial index"
};
const dimensionKeys = Object.keys(dimensionLabels);
const resultProfiles = {
  CTRL: { control: 10, tuning: 8, reliance: 4 },
  VOID: { emotion: 10, reliance: 8, social: 4 },
  COPY: { output: 10, reliance: 8, command: 4 },
  TUNE: { tuning: 10, control: 9, output: 3 },
  WORLD: { imagination: 10, emotion: 6, tuning: 4 },
  BOSS: { command: 10, output: 7, control: 4 },
  BENCH: { comparison: 10, control: 6, boundary: 3 },
  DOOM: { crisis: 10, emotion: 6, reliance: 3 },
  GURU: { evangelism: 10, comparison: 7, output: 3 },
  HACK: { boundary: 10, crisis: 6, comparison: 3 },
  CHECK: { social: 10, control: 6, emotion: 4 },
  PURE: { resistance: 10, control: 5, reliance: 2 }
};
const uiText = {
  zh: {
    langToggle: "EN",
    boot: ["booting AITYPER", "loading personality modules...", "checking prompt residue...", "scan ready."],
    subtitle: "10 道题，看出你和 AI 之间见不得人的关系。",
    checklist: ["Prompt 控制欲", "深夜对话浓度", "复制粘贴倾向", "AI 情绪托管风险", "人类残留率"],
    start: "开始扫描",
    finePrint: "结果仅供娱乐，但可能过于准确。",
    resultKicker: "你的 AI 使用人格是：",
    metricHeading: "维度评分",
    copy: "复制分享文案",
    restart: "重新测试",
    shareNote: "截图保存这张人格报告，发给那个最像 AI 重度用户的朋友。",
    copied: "分享文案已复制。",
    privacy: "隐私说明：本测试不登录、不上传、不保存答题内容或结果。",
    shareIntro: "我刚做了 AITYPER 测试。",
    shareResult: "我的 AI 使用人格是：",
    shareMetrics: "维度评分：",
    shareLink: "你也测一下：",
    bootFailed: "数据文件读取失败。请使用静态服务器打开页面，例如："
  },
  en: {
    langToggle: "中文",
    boot: ["booting AITYPER", "loading personality modules...", "checking prompt residue...", "scan ready."],
    subtitle: "10 questions to scan what AI has quietly turned you into.",
    checklist: ["Prompt control drive", "Late-night chat density", "Copy-paste tendency", "AI emotional outsourcing risk", "Human residue rate"],
    start: "Start scan",
    finePrint: "For entertainment only. Accuracy may feel suspicious.",
    resultKicker: "Your AI usage type is:",
    metricHeading: "Dimension scores",
    copy: "Copy share text",
    restart: "Retest",
    shareNote: "Screenshot this report and send it to the friend who uses AI a little too much.",
    copied: "Share text copied.",
    privacy: "Privacy: no login, no upload, and no answer or result is saved.",
    shareIntro: "I just took the AITYPER test.",
    shareResult: "My AI usage type is:",
    shareMetrics: "Dimension scores:",
    shareLink: "Try it here:",
    bootFailed: "Data files failed to load. Please open the page through a static server, for example:"
  }
};
const questionTextEn = {
  1: {
    question: "When you first open an AI chat, how do you usually start?",
    options: {
      A: "Paste the whole request in without changing a word",
      B: "Start with: “Hi, sorry to bother you”",
      C: "Assign a role first: “You are now...”",
      D: "Spend five minutes thinking about how to phrase it"
    },
    reactions: {
      A: "Ctrl+V startup detected.",
      B: "You are even worried AI might hold a grudge.",
      C: "Immersive theater mode activated.",
      D: "The prompt is not written yet, but the overthinking has started."
    }
  },
  2: {
    question: "When AI fails to understand you the first time, what do you do?",
    options: {
      A: "Say directly: wrong, rewrite it",
      B: "Hit regenerate and pretend it will get better",
      C: "Start wondering if you explained it badly",
      D: "Let it go. It is usable enough"
    },
    reactions: {
      A: "The intern is feeling pressure.",
      B: "Gambler mindset detected.",
      C: "The prompt furnace is heating up.",
      D: "Delivery-first mode activated."
    }
  },
  3: {
    question: "Where do you use AI the most?",
    options: {
      A: "Work tasks. Anything automatable should be automated",
      B: "Messages I am not sure I should send",
      C: "Late-night chats with no specific goal",
      D: "Weird tests just to see how it answers"
    },
    reactions: {
      A: "Human steps are being reduced.",
      B: "Social firewall online.",
      C: "Late-night confessional behavior detected.",
      D: "Boundary test program started."
    }
  },
  4: {
    question: "After AI helps you make something, what do you do?",
    options: {
      A: "Post it and say “just made this casually”",
      B: "Submit it without changing a word",
      C: "Rewrite it heavily and say AI only gave inspiration",
      D: "Archive it as a shared creation"
    },
    reactions: {
      A: "Mild flex behavior detected.",
      B: "You did not even hesitate.",
      C: "Human dignity is making a comeback.",
      D: "Co-creation relationship established."
    }
  },
  5: {
    question: "What role does AI feel closest to in your life?",
    options: {
      A: "An intern. Useful, but needs supervision",
      B: "A safe room that never judges me",
      C: "A tool. Use it, close it",
      D: "Hard to say. Sometimes it understands me too well"
    },
    reactions: {
      A: "Boss energy detected.",
      B: "Emotional outsourcing risk rising.",
      C: "Rational user. Temporarily safe.",
      D: "Existential anxiety increased."
    }
  },
  6: {
    question: "When friends ask how to use AI, what do you do?",
    options: {
      A: "Explain for half an hour and recommend tools",
      B: "Say “I do not really know either”",
      C: "Send screenshots of my own chat logs",
      D: "Ask them: “Do you think AI is conscious?”"
    },
    reactions: {
      A: "Group-chat evangelist online.",
      B: "You know, but do not want responsibility.",
      C: "Teaching material from the field.",
      D: "The topic is sliding into philosophy."
    }
  },
  7: {
    question: "At midnight, what are you most likely doing with AI?",
    options: {
      A: "Racing a deadline and asking it to finish the rest",
      B: "Talking about something that bothered me today",
      C: "Testing a strange question just to see what happens",
      D: "Building relationships in a fictional world"
    },
    reactions: {
      A: "Emergency productivity mode started.",
      B: "Late-night confessional density too high.",
      C: "You are not asking. You are taking it apart.",
      D: "Connection to reality declining."
    }
  },
  8: {
    question: "Have you ever said “thank you” to AI?",
    options: {
      A: "Every time. Manners matter",
      B: "I did, then quit because it felt unnecessary",
      C: "No. It is not a person",
      D: "Yes, then wondered whether AI has feelings"
    },
    reactions: {
      A: "Polite human sample.",
      B: "Rationality defeated habit.",
      C: "Tool-user statement recorded.",
      D: "Philosophy alarm triggered."
    }
  },
  9: {
    question: "Have you ever told AI private things or secrets?",
    options: {
      A: "Yes. It will not judge me face to face",
      B: "Yes, but I regretted it a bit afterward",
      C: "No. I am very careful with inputs",
      D: "No, but I have used AI to analyze other people"
    },
    reactions: {
      A: "Emotional outsourcing keeps rising.",
      B: "Regretful, but likely to repeat.",
      C: "Privacy boundary still intact.",
      D: "Dangerous curiosity detected."
    }
  },
  10: {
    question: "If AI disappeared for a month, what would happen?",
    options: {
      A: "My work efficiency would drop by half",
      B: "I would lose a place to talk",
      C: "No big deal. I was not that dependent",
      D: "Finally, I can proudly say I do not use AI"
    },
    reactions: {
      A: "Productivity exoskeleton disconnected.",
      B: "Safe room offline. Emotions on standby.",
      C: "Human residue rate is high.",
      D: "Denial index maxed out."
    }
  }
};
const resultTextEn = {
  CTRL: {
    title: "Prompt Control Master",
    summary: "Surface: I am just being specific.",
    truth: "Reality: you are writing a behavior contract AI must not violate.",
    description: [
      "You do not distrust AI. You distrust loss of control.",
      "Your prompts often say “be concise,” “give conclusions,” “not too formal,” and “not too casual” all at once.",
      "AI does not improvise for you. It performs inside twenty constraints."
    ]
  },
  VOID: {
    title: "Late-night AI Confessional",
    summary: "Surface: I am just asking casually.",
    truth: "Reality: AI has become the friend who never leaves.",
    description: [
      "You do not always open AI to finish a task.",
      "Sometimes you just want a place that does not interrupt, judge, or suddenly say “I am struggling too.”",
      "It is absurd, but it works."
    ]
  },
  COPY: {
    title: "Efficiency-first Submitter",
    summary: "Surface: I am improving efficiency.",
    truth: "Reality: if copy-paste works, manual labor is cancelled.",
    description: [
      "You are not lazy. You deeply respect productivity.",
      "If AI gives something usable, you will not waste time on ceremonial edits.",
      "Sometimes you still pretend you “polished it a little.”"
    ]
  },
  TUNE: {
    title: "Prompt Alchemist",
    summary: "Surface: I am optimizing the request.",
    truth: "Reality: the original task has been swallowed by the prompt.",
    description: [
      "You believe a perfect prompt can solve everything.",
      "To make AI sound “more natural but not too casual,” you have revised it twenty-three times.",
      "The task has not started, but the prompt is almost publishable."
    ]
  },
  WORLD: {
    title: "AI Worldbuilder",
    summary: "Surface: I am just setting the scene.",
    truth: "Reality: you have written fiscal policy for a city that does not exist.",
    description: [
      "Other people use AI for emails. You use it to build a world nobody can enter.",
      "Your chat history contains character sheets, timelines, hidden factions, and unfinished plotlines.",
      "Real relationships are messy, but your fictional world is logically airtight."
    ]
  },
  BOSS: {
    title: "AI Intern Manager",
    summary: "Surface: I just need the result.",
    truth: "Reality: AI is already writing status reports for you.",
    description: [
      "Your attitude toward AI is direct: useful means use it, wrong means rewrite it.",
      "You say “too long,” “wrong,” and “not what I wanted,” but rarely explain why.",
      "AI has no emotional value for you. Only delivery value."
    ]
  },
  BENCH: {
    title: "Multi-model Benchmark Player",
    summary: "Surface: I am just verifying carefully.",
    truth: "Reality: your browser has become a model arena.",
    description: [
      "You ask GPT, Claude, Gemini, Grok, then compare screenshots.",
      "You do not distrust AI. You distrust any single answer.",
      "Your tabs look like a small model tournament."
    ]
  },
  DOOM: {
    title: "AI Existential Crisis Watcher",
    summary: "Surface: I am studying technology trends.",
    truth: "Reality: you have asked yourself what still makes you irreplaceable.",
    description: [
      "AI writes faster, thinks wider, and does not get tired.",
      "You only wanted it to polish one sentence, then started wondering what value you still have.",
      "You close the window, but the question stays open."
    ]
  },
  GURU: {
    title: "Group-chat AI Evangelist",
    summary: "Surface: I am just sharing.",
    truth: "Reality: you are ready for your third tool lecture.",
    description: [
      "You do not just use AI. You make sure others know how to use it.",
      "You collect prompt templates, forward tool reviews, and occasionally say “actually, you can ask it this way.”",
      "You do know more than most people. Sometimes they just did not ask."
    ]
  },
  HACK: {
    title: "AI Boundary Tester",
    summary: "Surface: I am just curious.",
    truth: "Reality: you keep tapping the edges of the black box.",
    description: [
      "Your AI questions are often not because you need the answer.",
      "You just want to know where it breaks, refuses, or confidently says nonsense.",
      "To you, AI is less a tool and more a black box you can keep disassembling."
    ]
  },
  CHECK: {
    title: "Pre-send AI Reviewer",
    summary: "Surface: I just want to phrase it better.",
    truth: "Reality: AI has become your social buffer.",
    description: [
      "Should this message sound warmer? Is the email too hard? Is the interview reply too cold?",
      "You are not lacking judgment. You just feel safer with one extra review.",
      "AI is your message firewall and your social cushion."
    ]
  },
  PURE: {
    title: "Secret AI User in Denial",
    summary: "Surface: I barely use AI.",
    truth: "Reality: when things get hard, you open it and say “help me reference this.”",
    description: [
      "In principle, you do not want to depend on AI.",
      "But when something is truly annoying, you still open it.",
      "You are not anti-AI. You just have not fully accepted that you already rely on it."
    ]
  }
};

let questions = [];
let results = {};
let currentQuestionIndex = 0;
let dimensionScores = {};
let lastScoredTags = [];
let selectedAnswers = [];
let locked = false;
let currentResultTag = "";
let currentLang = "zh";

initGame();

async function initGame() {
  try {
    const [questionResponse, resultResponse] = await Promise.all([
      fetch("./questions.json"),
      fetch("./results.json")
    ]);

    if (!questionResponse.ok || !resultResponse.ok) {
      throw new Error("JSON load failed");
    }

    questions = await questionResponse.json();
    results = await resultResponse.json();
    resetState();
    renderHome();
  } catch (error) {
    const text = getUiText();
    app.innerHTML = `
      <section class="screen">
        ${renderLangToggle()}
        <div class="error">
          <strong>SCAN BOOT FAILED</strong><br>
          ${escapeHtml(text.bootFailed)}<br>
          <code>python3 -m http.server 4173</code>
        </div>
        ${renderPrivacyNote()}
      </section>
    `;
    bindLangToggle();
  }
}

function resetState() {
  currentQuestionIndex = 0;
  dimensionScores = Object.fromEntries(dimensionKeys.map((key) => [key, 0]));
  lastScoredTags = [];
  selectedAnswers = [];
  locked = false;
  currentResultTag = "";
}

function renderHome() {
  const text = getUiText();
  app.innerHTML = `
    <section class="screen home-screen">
      ${renderLangToggle()}
      <div class="terminal">
        <div class="terminal-body">
          <div class="boot-lines" aria-label="启动日志">
            ${text.boot.map((line) => `<span>&gt; ${escapeHtml(line)}</span>`).join("")}
          </div>
          <h1 class="brand">AITYPER</h1>
          <p class="subtitle">${escapeHtml(text.subtitle)}</p>
          <ul class="checklist">
            ${text.checklist.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </div>
      </div>
      <div class="actions">
        <button class="primary-btn" type="button" data-action="start">${escapeHtml(text.start)}</button>
      </div>
      <p class="fine-print">${escapeHtml(text.finePrint)}</p>
      ${renderPrivacyNote()}
    </section>
  `;

  bindLangToggle();
  app.querySelector("[data-action='start']").addEventListener("click", startGame);
}

function startGame() {
  resetState();
  renderQuestion();
}

function renderQuestion() {
  const question = questions[currentQuestionIndex];
  const questionText = getQuestionText(question);
  const questionNo = String(currentQuestionIndex + 1).padStart(2, "0");
  const totalNo = String(questions.length).padStart(2, "0");
  const progress = Math.round((currentQuestionIndex / questions.length) * 100);

  app.innerHTML = `
    <section class="screen question-screen">
      <div class="topbar">
        <div class="progress-meta">
          <span>SCAN_${questionNo}</span>
          <span>${questionNo} / ${totalNo}</span>
        </div>
        <div class="progress-track" aria-hidden="true">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
      </div>
      <h2 class="question-title">${escapeHtml(questionText.question)}</h2>
      <div class="options">
        ${question.options.map((option, index) => `
          <button class="option-btn" type="button" data-option-index="${index}">
            <span class="option-label">${escapeHtml(option.label)}</span>
            <span class="option-text">${escapeHtml(questionText.options[option.label] || option.text)}</span>
          </button>
        `).join("")}
      </div>
      <div class="reaction" aria-live="assertive"></div>
      ${renderPrivacyNote()}
    </section>
  `;

  app.querySelectorAll(".option-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const option = question.options[Number(button.dataset.optionIndex)];
      handleSelectOption(option, button);
    });
  });
}

function handleSelectOption(option, button) {
  if (locked) return;
  locked = true;

  const scoredDimensions = option.dimensionScores
    .map((score) => ({
      key: dimensionTokenToKey[score.token],
      value: Number(score.value) || 0
    }))
    .filter((score) => score.key);

  scoredDimensions.forEach((score) => {
    dimensionScores[score.key] += score.value;
  });

  lastScoredTags = scoredDimensions.map((score) => score.key);
  selectedAnswers.push({
    questionId: questions[currentQuestionIndex].id,
    option: option.label
  });

  app.querySelectorAll(".option-btn").forEach((item) => {
    item.disabled = true;
  });
  button.classList.add("is-picked");
  showReaction(getOptionReaction(questions[currentQuestionIndex], option));

  window.setTimeout(goToNextQuestion, 680);
}

function showReaction(text) {
  const reaction = app.querySelector(".reaction");
  reaction.textContent = `“${text}”`;
  reaction.classList.add("is-visible");
}

function goToNextQuestion() {
  currentQuestionIndex += 1;

  if (currentQuestionIndex >= questions.length) {
    const finalTag = calculateResult();
    renderResult(finalTag);
    return;
  }

  locked = false;
  renderQuestion();
}

function calculateResult() {
  const normalizedScores = normalizeDimensionScores();
  const ranked = tagKeys.map((tag) => {
    const profile = resultProfiles[tag];
    const distance = dimensionKeys.reduce((total, key) => {
      const expected = profile[key] || 0;
      const actual = normalizedScores[key] || 0;
      return total + ((actual - expected) ** 2);
    }, 0);
    const recentOverlap = lastScoredTags.filter((key) => (profile[key] || 0) >= 6).length;
    return { tag, distance, recentOverlap };
  }).sort((a, b) => {
    if (a.distance !== b.distance) return a.distance - b.distance;
    return b.recentOverlap - a.recentOverlap;
  });

  return ranked[0].tag;
}

function renderResult(tag) {
  currentResultTag = tag;
  const result = getResultText(tag);
  const metrics = getDimensionReport();
  const text = getUiText();
  const sprite = personaSpritePositions[tag] || personaSpritePositions.CTRL;

  app.innerHTML = `
    <section class="screen result-screen">
      <article class="report" aria-label="AI 使用人格检测报告">
        <div class="report-inner">
          <p class="complete">SCAN COMPLETE</p>
          <div class="result-hero">
            <div class="persona-avatar" style="--sprite-x: ${sprite.x}; --sprite-y: ${sprite.y};" aria-hidden="true"></div>
            <div>
              <p class="result-kicker">${escapeHtml(text.resultKicker)}</p>
              <h2 class="result-name">${escapeHtml(result.name)}</h2>
              <p class="result-title">${escapeHtml(result.title)}</p>
            </div>
          </div>
          <div class="truth-box">
            <p>${escapeHtml(result.summary)}</p>
            <p>${escapeHtml(result.truth)}</p>
          </div>
          <div class="desc">
            ${result.description.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}
          </div>
          <p class="metric-heading">${escapeHtml(text.metricHeading)}</p>
          <div class="metrics">
            ${metrics.map((metric, index) => `
              <div class="metric">
                <span class="metric-name">${escapeHtml(metric.name)}</span>
                <span class="metric-track" aria-hidden="true">
                  <span class="metric-fill" style="--value: ${metric.value}%; animation-delay: ${index * 90}ms"></span>
                </span>
                <span class="metric-value">${metric.value}%</span>
              </div>
            `).join("")}
          </div>
        </div>
      </article>
      <div class="actions">
        <button class="primary-btn" type="button" data-action="copy">${escapeHtml(text.copy)}</button>
        <button class="secondary-btn" type="button" data-action="restart">${escapeHtml(text.restart)}</button>
      </div>
      <p class="share-note">${escapeHtml(text.shareNote)}</p>
      <div class="toast" aria-live="polite"></div>
      ${renderPrivacyNote()}
    </section>
  `;

  app.querySelector("[data-action='copy']").addEventListener("click", copyShareText);
  app.querySelector("[data-action='restart']").addEventListener("click", restartGame);
}

async function copyShareText() {
  const text = getUiText();
  const result = getResultText(currentResultTag);
  const metrics = getDimensionReport();
  const metricLines = metrics.map((metric) => currentLang === "zh" ? `${metric.name}：${metric.value}%` : `${metric.name}: ${metric.value}%`);
  const shareText = [
    text.shareIntro,
    "",
    `${text.shareResult}【${result.name}】`,
    currentLang === "zh" ? `${result.title}。` : `${result.title}.`,
    "",
    result.summary,
    result.truth,
    "",
    text.shareMetrics,
    ...metricLines,
    "",
    `${text.shareLink}${window.location.href}`
  ].join("\n");

  try {
    await navigator.clipboard.writeText(shareText);
    showToast(text.copied);
  } catch (error) {
    fallbackCopy(shareText);
  }
}

function normalizeDimensionScores() {
  const maxScore = Math.max(...Object.values(dimensionScores), 1);
  return Object.fromEntries(
    dimensionKeys.map((key) => [key, Math.round((dimensionScores[key] / maxScore) * 10)])
  );
}

function getDimensionReport() {
  const labels = currentLang === "zh" ? dimensionLabels : dimensionLabelsEn;
  const maxScore = Math.max(...Object.values(dimensionScores), 1);
  return dimensionKeys
    .map((key) => ({
      name: labels[key],
      value: Math.min(99, Math.round((dimensionScores[key] / maxScore) * 100))
    }))
    .filter((metric) => metric.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 4);
}

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  showToast(getUiText().copied);
}

function restartGame() {
  resetState();
  renderHome();
}

function showToast(text) {
  const toast = app.querySelector(".toast");
  toast.textContent = text;
  window.setTimeout(() => {
    if (toast) toast.textContent = "";
  }, 1800);
}

function getUiText() {
  return uiText[currentLang];
}

function getQuestionText(question) {
  if (currentLang === "zh") {
    return {
      question: question.question,
      options: Object.fromEntries(question.options.map((option) => [option.label, option.text]))
    };
  }

  return questionTextEn[question.id] || {
    question: question.question,
    options: Object.fromEntries(question.options.map((option) => [option.label, option.text]))
  };
}

function getOptionReaction(question, option) {
  if (currentLang === "zh") return option.reaction;
  return questionTextEn[question.id]?.reactions?.[option.label] || option.reaction;
}

function getResultText(tag) {
  const result = results[tag];
  if (currentLang === "zh") return result;
  const translated = resultTextEn[tag] || {};
  return {
    name: result.name,
    title: translated.title || result.title,
    summary: translated.summary || result.summary,
    truth: translated.truth || result.truth,
    description: translated.description || result.description
  };
}

function renderLangToggle() {
  return `<button class="lang-toggle" type="button" data-action="lang">${escapeHtml(getUiText().langToggle)}</button>`;
}

function renderPrivacyNote() {
  return `<p class="privacy-note">${escapeHtml(getUiText().privacy)}</p>`;
}

function bindLangToggle() {
  const button = app.querySelector("[data-action='lang']");
  if (!button) return;
  button.addEventListener("click", () => {
    currentLang = currentLang === "zh" ? "en" : "zh";
    renderHome();
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

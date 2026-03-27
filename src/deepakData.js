// ═══════════════════════════════════════════
// DEEPAK ANMOL - AI CHATBOT KNOWLEDGE BASE
// ═══════════════════════════════════════════

export const deepakProfile = {
  name: "Deepak Anmol",
  role: "Social Impact Professional | Project Manager | Education Specialist",
  university: "Central University of South Bihar",
  location: "Madhubani, Bihar — India",
  phone: "+91 9509603144",
  linkedin: "linkedin.com/in/deepakanmol",
  languages: ["Hindi", "English", "Maithili"],

  summary: "Deepak Anmol is a Social Impact Professional with expertise in Government Liaisoning, Inter-Departmental Convergence, and Curriculum Design. He has worked with organizations like Piramal Foundation, Magic Bus India Foundation, and Kshamtalaya Foundation, impacting over 40,000+ children and transforming 150+ schools across India.",

  skills: [
    "Leadership", "Training & Development", "Capacity Building",
    "Community Engagement", "Government Liaison", "Curriculum Design",
    "Project Management", "AI Tools Integration", "Ed-Tech",
    "LMS Monitoring", "Strategic Partnerships", "Recruitment",
    "Data Review", "Digital Marketing", "Mentoring"
  ],

  experience: [
    {
      title: "Project Manager & Asst Regional Manager",
      org: "Kshamtalaya Foundation",
      duration: "2022 — Present",
      description: "Spearheading comprehensive program implementation across Samastipur and Himachal Pradesh. Driving macro-level educational transformations in collaboration with state education systems.",
      achievements: [
        "Led holistic program implementation with state education frameworks",
        "Drove community-centric approaches to elevate learning environments",
        "Oversaw strategic budget localization and fellowship recruitment",
      ],
      impact: "150+ Schools Transformed"
    },
    {
      title: "Training & Development Lead",
      org: "Magic Bus India Foundation",
      duration: "2021 — 2022",
      description: "Overseeing blended learning deployments to optimize last-mile education delivery. Engineering AI-based learning modules and structured training pathways.",
      achievements: [
        "Engineered AI-based learning modules for teaching staff",
        "Trained educators on AI tools and digital presentation techniques",
        "Implemented comprehensive LMS tracking mechanisms",
      ],
      impact: "500+ Educators Trained"
    },
    {
      title: "Fellow & Trainer",
      org: "Piramal Foundation",
      duration: "2020 — 2021",
      description: "Urban Entrepreneurship Fellowship, Pune. Designed and developed contextualized content for FLN, Life Skills, and Employability across 45+ structured training sessions.",
      achievements: [
        "Designed FLN, Life Skills, and Employability curriculum",
        "Conducted 45+ structured training sessions",
        "Impacted 40,000+ children through scalable frameworks",
      ],
      impact: "40K+ Children Impacted"
    },
    {
      title: "Partnership Coordinator",
      org: "ESIC / Government",
      duration: "2019 — 2021",
      description: "Built collaborative partnerships with ESIC and local governance. Partnered with 65+ companies to integrate services and LMS-based modules.",
      achievements: [
        "Insured 5,000+ persons through ESIC integration",
        "Partnered with 65+ companies for service integration",
        "Mentored field teams for processing registrations",
      ],
      impact: "5,000+ Insured"
    }
  ],

  education: [
    { degree: "MA (Sociology)", institution: "Central University of South Bihar, Gaya", note: 'Report: "Liquor and its negative impact on social fabric in Bihar"' },
    { degree: "Bachelor of Business Administration", institution: "LNMU, Darbhanga" }
  ],

  certifications: [
    "Project Management — Kaivalya Education Foundation",
    "Lean Six Sigma — Quality Management",
    "Soft Skill Master Trainer — NIST",
    "Evaluation of Training — VVGNLI",
    "Digital Marketing — NSDC",
    "Chat GPT Workshop — AI Integration"
  ],

  whyHire: [
    "Proven track record of impacting 40,000+ children and 150+ schools",
    "Expert in government liaison, inter-departmental convergence, and curriculum design",
    "Successfully built partnerships with 65+ corporate entities",
    "Strong capacity building and training background with 500+ educators trained",
    "Certified in Project Management, Lean Six Sigma, and AI tools",
    "Combines grassroots field experience with strategic-level planning"
  ]
};

// ═══════════════════════════════════════════
// INTENT MATCHING ENGINE
// ═══════════════════════════════════════════
const intents = [
  {
    keywords: ["who", "about", "introduce", "tell me", "deepak", "yourself"],
    response: () => `**Deepak Anmol** is a ${deepakProfile.role} based in ${deepakProfile.location}.\n\n${deepakProfile.summary}`,
    followUp: ["View Experience", "See Achievements", "Download CV"]
  },
  {
    keywords: ["experience", "work", "career", "job", "role", "position"],
    response: () => {
      const exp = deepakProfile.experience.map(e => `• **${e.title}** at ${e.org} (${e.duration}) — ${e.impact}`).join('\n');
      return `Here's Deepak's professional journey:\n\n${exp}`;
    },
    action: { type: 'scroll', target: '.nx-universe' },
    followUp: ["Tell me more about Kshamtalaya", "Why should I hire him?", "Download CV"]
  },
  {
    keywords: ["skill", "ability", "strength", "capable", "expertise", "good at"],
    response: () => `Deepak's core skills include:\n\n${deepakProfile.skills.map(s => `• ${s}`).join('\n')}`,
    followUp: ["View Experience", "See Projects"]
  },
  {
    keywords: ["project", "initiative", "program"],
    response: () => {
      const projects = deepakProfile.experience.map(e => `• **${e.achievements[0]}** (${e.org})`).join('\n');
      return `Key projects & initiatives:\n\n${projects}`;
    },
    action: { type: 'scroll', target: '.nx-universe' },
    followUp: ["View Experience", "Download CV"]
  },
  {
    keywords: ["hire", "recruit", "why", "value", "bring"],
    response: () => `**Why hire Deepak Anmol?**\n\n${deepakProfile.whyHire.map(w => `✅ ${w}`).join('\n')}\n\nWould you like to download his CV?`,
    followUp: ["Download CV", "View Experience", "Contact Deepak"]
  },
  {
    keywords: ["achieve", "impact", "result", "outcome", "metric"],
    response: () => {
      const impacts = deepakProfile.experience.map(e => `• **${e.impact}** — ${e.org}`).join('\n');
      return `Deepak's impact metrics:\n\n${impacts}\n\nTotal estimated reach: **40,000+ children, 500+ educators, 150+ schools, 65+ corporate partners**`;
    },
    followUp: ["Why should I hire him?", "Download CV"]
  },
  {
    keywords: ["education", "degree", "university", "study", "academic", "qualification"],
    response: () => {
      const edu = deepakProfile.education.map(e => `• **${e.degree}** — ${e.institution}${e.note ? ` (${e.note})` : ''}`).join('\n');
      return `Academic background:\n\n${edu}`;
    },
    followUp: ["See Certifications", "View Experience"]
  },
  {
    keywords: ["certif", "protocol", "course", "training cert"],
    response: () => `Deepak holds these certifications:\n\n${deepakProfile.certifications.map(c => `🏅 ${c}`).join('\n')}`,
    action: { type: 'scroll', target: '.matrix-section' },
    followUp: ["View Experience", "Download CV"]
  },
  {
    keywords: ["cv", "resume", "download", "pdf"],
    response: () => "I'll prepare Deepak's CV for download right away! Click the button below.",
    action: { type: 'download', target: '/Deepak_Anmol_CV.pdf' },
    followUp: ["View Experience", "Contact Deepak"]
  },
  {
    keywords: ["contact", "reach", "email", "phone", "call", "connect", "linkedin"],
    response: () => `You can reach Deepak at:\n\n📞 **Phone:** ${deepakProfile.phone}\n💼 **LinkedIn:** [${deepakProfile.linkedin}](https://www.${deepakProfile.linkedin})\n🌍 **Location:** ${deepakProfile.location}`,
    action: { type: 'scroll', target: '.neural-tree' },
    followUp: ["Download CV", "View Experience"]
  },
  {
    keywords: ["kshamtalaya", "school", "samastipur", "himachal"],
    response: () => {
      const e = deepakProfile.experience[0];
      return `**${e.title}** at ${e.org} (${e.duration})\n\n${e.description}\n\nKey achievements:\n${e.achievements.map(a => `• ${a}`).join('\n')}\n\n📊 Impact: **${e.impact}**`;
    },
    followUp: ["Tell me about Magic Bus", "Download CV"]
  },
  {
    keywords: ["magic bus", "ed-tech", "lms", "ai tool", "digital"],
    response: () => {
      const e = deepakProfile.experience[1];
      return `**${e.title}** at ${e.org} (${e.duration})\n\n${e.description}\n\nKey achievements:\n${e.achievements.map(a => `• ${a}`).join('\n')}\n\n📊 Impact: **${e.impact}**`;
    },
    followUp: ["Tell me about Piramal", "See all experience"]
  },
  {
    keywords: ["piramal", "fellow", "fellowship", "pune", "fln"],
    response: () => {
      const e = deepakProfile.experience[2];
      return `**${e.title}** at ${e.org} (${e.duration})\n\n${e.description}\n\nKey achievements:\n${e.achievements.map(a => `• ${a}`).join('\n')}\n\n📊 Impact: **${e.impact}**`;
    },
    followUp: ["Tell me about ESIC", "Download CV"]
  },
  {
    keywords: ["esic", "insurance", "partner", "government"],
    response: () => {
      const e = deepakProfile.experience[3];
      return `**${e.title}** at ${e.org} (${e.duration})\n\n${e.description}\n\nKey achievements:\n${e.achievements.map(a => `• ${a}`).join('\n')}\n\n📊 Impact: **${e.impact}**`;
    },
    followUp: ["View all experience", "Why hire Deepak?"]
  },
  {
    keywords: ["hello", "hi", "hey", "greet", "good morning", "good evening"],
    response: () => "Hello! 👋 I'm Deepak's AI assistant. I can help you explore his professional journey, skills, and achievements. What would you like to know?",
    followUp: ["Who is Deepak?", "View Experience", "Download CV"]
  },
  {
    keywords: ["thank", "thanks", "bye", "goodbye"],
    response: () => "You're welcome! Feel free to come back anytime. If you'd like to connect with Deepak directly, just ask for his contact info. 🙌",
    followUp: ["Contact Deepak", "Download CV"]
  },
  {
    keywords: ["language", "speak", "hindi", "english", "maithili"],
    response: () => `Deepak is fluent in: **${deepakProfile.languages.join(', ')}**`,
    followUp: ["View Experience", "Contact Deepak"]
  },
];

// Fallback response
const fallback = {
  response: "I'm not sure I understand that. Let me suggest some things I can help with:",
  followUp: ["Who is Deepak?", "View Experience", "See Achievements", "Download CV", "Contact Deepak"]
};

/**
 * Match user input against intents and return the best response
 */
export function getResponse(userMessage) {
  const input = userMessage.toLowerCase().trim();

  // Score each intent by how many keywords match
  let bestMatch = null;
  let bestScore = 0;

  for (const intent of intents) {
    let score = 0;
    for (const keyword of intent.keywords) {
      if (input.includes(keyword.toLowerCase())) {
        score += keyword.length; // Longer keyword matches are more specific
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = intent;
    }
  }

  if (bestMatch && bestScore > 0) {
    return {
      text: bestMatch.response(),
      action: bestMatch.action || null,
      followUp: bestMatch.followUp || []
    };
  }

  return {
    text: fallback.response,
    action: null,
    followUp: fallback.followUp
  };
}

export const quickActions = [
  { label: "Who is Deepak?", query: "Who is Deepak?" },
  { label: "View Experience", query: "Show me his experience" },
  { label: "Download CV", query: "Download CV" },
  { label: "Contact Deepak", query: "How can I contact Deepak?" },
];

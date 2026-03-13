// ─────────────────────────────────────────────────────────────────────────────
// knowledge-base.ts
// Single source of truth for Luigi (the portfolio chatbot).
// Edit this file whenever you want the chatbot to reflect new info.
// ─────────────────────────────────────────────────────────────────────────────

export const KNOWLEDGE_BASE = {

  // ── Personal Info ──────────────────────────────────────────────────────────
  personal: {
    name: 'Louis Miguel Bernal',
    title: 'Full Stack Developer & Data Engineer',
    location: 'Cavite, Philippines',
    email: 'miguellouis.work@gmail.com',
    phone: '+63 09997703445',
    linkedin: 'https://www.linkedin.com/in/louisbernal/',
    github: 'https://github.com/LouisMiguelBernal',
    summary: `
      Full Stack Developer and Data Engineer with hands-on experience building
      AI-powered applications, full-stack web platforms, production-grade data pipelines,
      and data-driven solutions. Specializes in machine learning, computer vision, NLP,
      deep learning, and backend data engineering — with a proven track record of shipping
      production-grade systems from research to deployment. Dean's Lister at DLSU-D with
      a 3.83 GPA, 12+ certifications, and 5+ deployed projects. Passionate about clean
      UI/UX, intelligent systems, and delivering real business value through code.
      Currently open to full-time roles, freelance projects, and collaborations.
    `,
  },

  // ── Thesis ─────────────────────────────────────────────────────────────────
  thesis: {
    title: 'VisorAI: A YOLOv11-Powered Mobile Application for Real-Time Detection of LTO Road Markings with Auditory Feedback',
    year: '2026',
    school: 'De La Salle University – Dasmariñas (DLSU-D)',
    degree: 'Bachelor of Science in Computer Science',
    coAuthor: 'Daniell Anthony Bermudez',
    adviser: 'Ms. Sheryl Kamantigue',
    panelists: ['Ms. Tita Herradura', 'Ms. Jennylinde Manaois', 'Mr. Rolando Barrameda'],
    status: 'Successfully defended and presented at ICAI 2026 (International Conference on AI), attended by local and international academics and industry professionals.',
    abstract: `
      VisorAI is an innovative AI-driven mobile application designed to enhance road awareness
      and assistive navigation. It detects official LTO (Land Transportation Office) road markings
      in real time using a custom-trained YOLOv11 model, and delivers instant auditory feedback
      to promote safer, smarter transportation environments. The system bridges computer vision,
      deep learning, and mobile deployment — making it both functionally reliable and practically
      deployable in real-world traffic scenarios.
    `,
    highlights: [
      'Custom-trained YOLOv11 model optimized for real-time LTO road marking detection.',
      'Integrated auditory feedback system for accessibility and driver assistance.',
      'Successfully defended undergraduate thesis at DLSU-D.',
      'Demonstrated and taught VisorAI to international and local academics and industry professionals at ICAI 2026.',
      'Delivered AI-driven transportation insights to the international research community.',
      'Engaged in technical discussions with researchers and industry professionals about intelligent transportation and AI scalability.',
      'Promotes road safety, compliance with LTO regulations, and reduction of traffic-related accidents.',
      'Built with Python, YOLOv11, OpenCV, Streamlit, Roboflow, and an audio feedback system.',
    ],
    liveLink: 'https://visorai.streamlit.app/',
    githubLink: 'https://github.com/LouisMiguelBernal/VisorAI',
    conference: 'ICAI 2026 – 2-Day International Research Conference (local and international academics and industry professionals)',
  },

  // ── Work Experience ────────────────────────────────────────────────────────
  experience: [
    {
      role: 'Data & Backend Engineer',
      company: 'FloatInfinity',
      period: 'Mar 2026 – Present',
      location: 'Sydney, Australia · Remote',
      tech: ['Azure', 'SQL', 'Python', 'REST APIs', 'Git', 'SQLite'],
      bullets: [
        'Engineered end-to-end data pipelines integrating third-party REST APIs (ConnectWise) with Python-based ETL layers, handling authentication, pagination, schema validation, and SQLite persistence across 25-column normalized schemas.',
        'Designed modular backend systems with clean separation of concerns across API, transformation, schema enforcement, and storage layers, enabling smart-update deduplication and SLA-aware query interfaces.',
        'Delivered production-grade data retrieval and reporting infrastructure on Azure-compatible stacks, surfacing real-time ticket analytics — status breakdowns, priority distributions, and SLA compliance rates — from live service management platforms.',
      ],
    },
    {
      role: 'Data Analyst Intern',
      company: 'PASIA – Procurement and Supply Institute of Asia',
      period: 'Jun 2025 – Aug 2025',
      location: 'Makati, NCR, Philippines · Hybrid',
      tech: ['Python', 'SQL', 'Scikit-learn', 'Pandas', 'Power BI', 'Excel', 'Git'],
      bullets: [
        'Automated large-scale data preprocessing pipelines using Python (Pandas, Scikit-learn) and machine learning–based imputation, processing over 1 million procurement and contract records, reducing manual effort by 85%.',
        'Optimized SQL ETL pipelines for automated ingestion and transformation of high-volume procurement data, ensuring 99% consistency across departments and daily data refreshes for real-time insights.',
        'Developed advanced Power BI and Excel visualizations of private contractor procurement data, transforming 1M+ contract records into actionable business intelligence insights empowering stakeholders to identify high-value savings and efficiency gains.',
        'Managed database integrity through data validation, coding audits, and consistency checks across large datasets.',
      ],
    },
    {
      role: 'Director for Programming & Creatives Committee',
      company: 'Computer Science & Information Technology Program Council (CSITPC)',
      period: '2022 – Jul 2025',
      location: 'Cavite, Philippines',
      bullets: [
        'Led and directed the programming and creatives committee for the CS & IT university program council.',
        'Spearheaded event management, cross-functional team coordination, and creative campaign execution.',
        'Demonstrated leadership in managing student developers, designers, and event organizers across multiple concurrent initiatives.',
      ],
    },
    {
      role: 'Executive Committee Director for Finance & Public Relations',
      company: 'DLSU-D Council of Student Organizations',
      period: '2022 – Jul 2025',
      location: 'Cavite, Philippines',
      bullets: [
        'Directed finance and public relations operations for the university-wide council overseeing all student organizations.',
        'Managed organizational budgets, financial reporting, and stakeholder communications at the institutional level.',
        'Skills: Strategic Planning, Marketing Strategy, Financial Management, Public Relations.',
      ],
    },
    {
      role: 'Gr.12 Specialist for Programming and Algorithm Department',
      company: 'Technosaders',
      period: '2021 – 2022',
      location: 'Cavite, Philippines',
      bullets: [
        'Served as the programming and algorithm specialist for the Technosaders academic organization.',
        'Contributed to algorithmic problem-solving initiatives and collaborative technical projects.',
      ],
    },
  ],

  // ── Education ──────────────────────────────────────────────────────────────
  education: [
    {
      degree: 'Bachelor of Science in Computer Science — Specialization: Intelligent Systems',
      school: 'De La Salle University – Dasmariñas (DLSU-D)',
      period: 'Aug 2022 – May 2026',
      grade: '3.83 / 4.0 GPA',
      notes: "Consistent Dean's Lister. Thesis: VisorAI — a YOLOv11-powered mobile application for real-time LTO road marking detection, successfully defended and presented at ICAI 2026. Leadership: Director for Programming & Creatives (CSITPC) and Executive Committee Director for Finance & PR (DLSUD CSO).",
    },
    {
      degree: 'STEM – Health Allied Science (Senior High School)',
      school: 'De La Salle Medical and Health Sciences Institute',
      period: '2020 – 2022',
      grade: '90',
      notes: 'Active member of STEM and Health Science student organizations. Participated in research projects, workshops, and academic competitions. Maintained high academic standing throughout.',
    },
    {
      degree: 'Junior High School',
      school: 'De La Salle University – Dasmariñas',
      period: '2016 – 2020',
      grade: '95',
      notes: 'High Distinction in all subjects. Strong focus on Mathematics and Science. Participated in academic competitions, science fairs, and was a member of the Programming Club.',
    },
    {
      degree: 'Elementary',
      school: 'Saint Francis Academy – La Salle Green Hills Supervised',
      period: 'Jun 2010 – Mar 2016',
      grade: '94',
      notes: 'Consistent High Honors. Math club leader. Varsity athlete in badminton, volleyball, and soccer.',
    },
  ],

  // ── Skills ─────────────────────────────────────────────────────────────────
  skills: {
    languages:    ['Python', 'TypeScript', 'JavaScript', 'SQL', 'Java', 'C', 'Dart', 'HTML', 'CSS', 'Linux/Bash'],
    frameworks:   ['React', 'Next.js', 'Node.js', 'Express', 'TailwindCSS', 'Streamlit'],
    aiml:         ['TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'YOLOv11', 'LangChain', 'FAISS', 'Groq', 'RAG systems', 'OpenCV', 'Roboflow', 'HuggingFace', 'LLMs'],
    dataScience:  ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'XGBoost', 'SHAP', 'Optuna', 'Monte Carlo Simulation', 'Plotly', 'Power BI', 'Tableau'],
    dataEngineering: ['ETL Pipelines', 'REST API Integration', 'SQLite', 'PostgreSQL', 'Schema Validation', 'Data Deduplication', 'SLA-aware Query Interfaces', 'Azure'],
    databases:    ['PostgreSQL', 'MongoDB', 'Supabase', 'Firebase', 'SQLite'],
    tools:        ['Git', 'GitHub', 'Docker', 'Vercel', 'Azure', 'Figma', 'Postman', 'Tableau', 'Power BI', 'Microsoft Excel'],
    concepts:     ['REST APIs', 'Computer Vision', 'NLP', 'Deep Learning', 'Data Visualization', 'CI/CD', 'Agile/Scrum', 'UI/UX Design', 'Time-Series Forecasting', 'Object Detection', 'Data Engineering', 'Backend Systems'],
  },

  // ── Certifications ─────────────────────────────────────────────────────────
  certifications: [
    {
      name: 'International Conference on Artificial Intelligence (ICAI 2026)',
      issuer: 'ICAI 2026',
      date: 'Feb 2026',
      description: 'Demonstrated and taught VisorAI, a YOLOv11-powered mobile app for real-time LTO road marking detection with auditory feedback, delivering AI-driven transportation insights to international and local academics and industry professionals.',
    },
    {
      name: 'Deep Learning Specialization',
      issuer: 'DeepLearning.AI (Andrew Ng)',
      date: 'Dec 2025',
      credentialId: '5DCEBTE0WLYU',
      verifyLink: 'https://coursera.org/verify/5DCEBTE0WLYU',
      description: 'Mastered the design, training, and optimization of production-ready deep learning systems across 5 courses, including CNNs, RNNs/LSTMs, and Transformers. Comprehensive mastery of deep learning fundamentals using Python and TensorFlow. Covered systematic error analysis, data distribution strategies, advanced regularization, hyperparameter tuning, and bias-variance analysis.',
    },
    {
      name: 'Sequence Models',
      issuer: 'DeepLearning.AI',
      date: 'Dec 2025',
      credentialId: 'AGSTIN6MFW6H',
      verifyLink: 'https://coursera.org/verify/AGSTIN6MFW6H',
      description: 'Advanced expertise in RNNs, LSTMs, GRUs, and sequence-to-sequence architectures with attention mechanisms. Applied to NLP, speech recognition, and time-series forecasting.',
    },
    {
      name: 'Convolutional Neural Networks',
      issuer: 'DeepLearning.AI',
      date: 'Nov 2025',
      credentialId: 'VOPC3983POHV',
      verifyLink: 'https://coursera.org/verify/VOPC3983POHV',
      description: 'Deep expertise in CNN architecture design, pooling strategies, activation functions, regularization, and optimization. Hands-on projects in image classification and real-time object detection.',
    },
    {
      name: 'Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization',
      issuer: 'DeepLearning.AI',
      date: 'Nov 2025',
      description: 'Advanced techniques for building high-performance neural networks: systematic hyperparameter tuning, dropout regularization, batch normalization, and gradient optimization strategies.',
    },
    {
      name: 'Neural Networks and Deep Learning',
      issuer: 'DeepLearning.AI',
      date: 'Nov 2025',
      credentialId: '3520567IBKAP',
      verifyLink: 'https://coursera.org/verify/3520567IBKAP',
      description: 'Foundational mastery of neural network architecture, forward and backward propagation, gradient descent, and model training and evaluation pipelines.',
    },
    {
      name: 'Structuring Machine Learning Projects',
      issuer: 'DeepLearning.AI',
      date: 'Nov 2025',
      credentialId: 'PW7B3FJBJ8L5',
      verifyLink: 'https://coursera.org/verify/PW7B3FJBJ8L5',
      description: 'End-to-end ML project structuring, error analysis, hyperparameter strategy, and data pipeline alignment for real-world production deployment.',
    },
    {
      name: "Data Science Workshop 2024: Professor Widom's Instructional Odyssey",
      issuer: 'De La Salle University (instructed by Prof. Jennifer Widom, Dean of Stanford School of Engineering)',
      date: 'Sep 2024',
      description: "Intensive, hands-on workshop led by Professor Jennifer Widom, Dean of Stanford Engineering. Specializing in data analysis, visualization, machine learning, and data mining using professional tools such as Tableau and SQLite.",
    },
    {
      name: 'Accenture North America – Data Analytics and Visualization Job Simulation',
      issuer: 'Forage',
      date: 'Jan 2024',
      credentialId: 'hHvNNDaQemSPXKWTK',
      description: 'Industry-grade simulation covering data management, cleaning, business insight generation, stakeholder communication, and data validation in a corporate analytics context.',
    },
    {
      name: 'Data Analysis with Python',
      issuer: 'freeCodeCamp',
      date: 'Oct 2023',
      description: 'Python-based data analysis: statistical analysis, data manipulation, and visualization using Pandas, NumPy, and Matplotlib.',
    },
    {
      name: 'Data Analytics using Excel',
      issuer: 'Great Learning',
      date: 'Aug 2023',
      verifyLink: 'https://www.mygreatlearning.com/certificate/ETRAYBKU',
      description: 'Advanced Excel proficiency for business analytics: data cleaning, pivot tables, visualization, and business reporting.',
    },
    {
      name: 'Introduction to Analytics',
      issuer: 'Great Learning',
      date: 'Jul 2023',
      verifyLink: 'https://www.mygreatlearning.com/certificate/PGLBYALE',
      description: 'Foundational business analysis and analytics principles for data-driven decision-making.',
    },
    {
      name: 'Google Analytics',
      issuer: 'Google',
      date: 'May 2023',
      description: 'Web analytics fundamentals: tracking, data interpretation, and performance analysis using Google Analytics.',
    },
  ],

  // ── Projects ───────────────────────────────────────────────────────────────
  projects: [
    {
      name: 'VisorAI',
      category: 'AI / Computer Vision / Thesis Project',
      year: '2026',
      description: "Louis's undergraduate thesis and most significant research achievement. VisorAI is a YOLOv11-powered mobile application for real-time detection of LTO road markings with integrated auditory feedback. Successfully defended as an undergraduate thesis at DLSU-D and presented at the ICAI 2026 International Research Conference before local and international academics and industry professionals.",
      tech: ['YOLOv11', 'Python', 'OpenCV', 'Streamlit', 'Roboflow', 'Audio Feedback System', 'Computer Vision'],
      liveLink: 'https://visorai.streamlit.app/',
      githubLink: 'https://github.com/LouisMiguelBernal/VisorAI',
      highlights: [
        'Undergraduate thesis — successfully defended at DLSU-D.',
        'Presented and demonstrated at ICAI 2026 international research conference.',
        'Custom-trained YOLOv11 model on a proprietary LTO road marking dataset.',
        'Real-time object detection optimized for mobile and field deployment.',
        'Auditory feedback system for driver accessibility and road safety.',
        'Co-developed with Daniell Anthony Bermudez under adviser Ms. Sheryl Kamantigue.',
      ],
    },
    {
      name: 'DeepS&P',
      category: 'AI / Finance / Deep Learning',
      year: '2026',
      period: 'Dec 2025 – Feb 2026',
      description: 'Institutional-grade S&P 500 AI forecasting platform powered by a 3-layer LSTM neural network (256 hidden units, dropout-regularized) trained on 90+ years of historical market data with advanced feature engineering on price and volume. Combines time-series deep learning with Monte Carlo simulation (2,000 stochastic paths) for volatility modeling and scenario analysis, plus interactive financial dashboards.',
      tech: ['TensorFlow', 'PyTorch', 'LSTM', 'Monte Carlo Simulation', 'Streamlit', 'Plotly', 'Scikit-learn', 'YFinance', 'Python'],
      liveLink: 'https://deepsp500.streamlit.app/',
      githubLink: 'https://github.com/LouisMiguelBernal/DeepSP',
      highlights: [
        'Architected institutional-grade AI forecasting platform for the S&P 500.',
        '3-layer LSTM model (256 hidden units, dropout-regularized) trained on 90+ years of S&P 500 data.',
        'Advanced feature engineering on both price and volume data.',
        'Monte Carlo simulation generating 2,000 stochastic future price paths for volatility modeling.',
        'Interactive LSTM prediction validation module.',
        'SMA50 & SMA200 technical overlays for professional trend analysis.',
        'GPU-optimized inference via PyTorch.',
        'Interactive financial dashboard with Streamlit and Plotly.',
      ],
    },
    {
      name: 'GiftxAI',
      category: 'AI / RAG System / NLP',
      year: '2025',
      period: 'Nov 2025 – Dec 2025',
      description: 'Enterprise-grade RAG-powered gift recommendation engine using Groq Llama 3.3, FAISS vector embeddings, LangChain orchestration, and a proprietary triple-validation mechanism for zero-hallucination accuracy. Orchestrated high-speed PDF ingestion, intelligent text extraction, and FAISS vector embedding with HuggingFace models, enabling ultra-fast scalable retrieval across thousands of document chunks.',
      tech: ['LangChain', 'FAISS', 'Groq', 'Llama 3.3', 'HuggingFace', 'RAG', 'Python', 'Streamlit'],
      liveLink: 'https://giftxai.streamlit.app/',
      githubLink: 'https://github.com/LouisMiguelBernal/GiftxAI',
      highlights: [
        'Full RAG pipeline using FAISS vector embeddings for semantic retrieval.',
        'Triple-validation mechanism engineered to eliminate hallucinations.',
        'Powered by Groq Llama 3.3 for ultra-fast inference.',
        'High-speed PDF ingestion and intelligent text extraction.',
        'HuggingFace embeddings enabling scalable retrieval across thousands of document chunks.',
        'Advanced numerical ranking for precision recommendations.',
        'Real-time performance metrics dashboard.',
      ],
    },
    {
      name: 'XGE',
      category: 'ML / Data Science / Environmental AI',
      year: '2025',
      description: 'End-to-end ML pipeline predicting vehicle CO₂ emissions using XGBoost, SHAP explainability, and Optuna hyperparameter optimization. Achieved 96% R² score with an interactive real-time forecasting dashboard.',
      tech: ['XGBoost', 'SHAP', 'Optuna', 'Python', 'Scikit-learn', 'Streamlit', 'Plotly'],
      liveLink: 'https://xge-ai.streamlit.app/',
      githubLink: 'https://github.com/LouisMiguelBernal/XGE',
      highlights: [
        '96% R² score — exceptional predictive accuracy.',
        'Optuna automated hyperparameter optimization across 200+ trials.',
        'SHAP explainability for full model interpretability.',
        'Co-developed with Daniell Anthony Bermudez.',
      ],
    },
    {
      name: 'QuantMaven',
      category: 'Data / Quantitative Finance / Dashboard',
      year: '2024',
      period: 'Nov 2024 – Jan 2025',
      description: 'Research-backed interactive Streamlit trading intelligence platform with real-time stock data, RSI and Bollinger Bands indicators, 10 years of historical analysis, and dynamic programming for max-profit optimization. Engineered to visualize market volatility 50% faster than traditional tools.',
      tech: ['Streamlit', 'YFinance', 'Plotly', 'Python', 'Pandas'],
      liveLink: 'https://quantmaven.streamlit.app/',
      githubLink: 'https://github.com/LouisMiguelBernal/QuantMaven',
      highlights: [
        'Real-time stock data via YFinance API.',
        'Technical indicators: RSI and Bollinger Bands.',
        '10 years of historical performance analysis.',
        'Dynamic programming and divide-and-conquer algorithms (max profit optimization and merge sort ranking) for high-efficiency analytics.',
        'Visualizes market volatility 50% faster than traditional tools.',
        'Defended as academic research at DLSU-D.',
      ],
    },
  ],

  // ── Other Notable Work ─────────────────────────────────────────────────────
  otherWork: [
    {
      name: 'Airbnb NYC Advanced Data Analytics with PostgreSQL',
      period: 'Aug 2025 – Sep 2025',
      description: 'Engineered end-to-end data analysis pipeline on 48,895 Airbnb NYC listings — data cleaning, EDA, visualization (Seaborn, Matplotlib, WordCloud), and feature engineering to extract actionable insights on pricing, reviews, and availability. Integrated and managed PostgreSQL database for efficient storage and retrieval, enabling reproducible analytics and seamless ML model training workflows.',
      tech: ['SQL', 'PostgreSQL', 'Python', 'Scikit-learn', 'Seaborn', 'Matplotlib', 'Pandas', 'Git'],
    },
    {
      name: 'Adult Income Prediction (XGBoost + Optuna)',
      description: 'End-to-end ML pipeline on 48,842 records from the UCI Adult Income dataset. 87.27% accuracy with XGBoost optimized via 200+ Optuna trials. Full pipeline: data cleaning, feature engineering, EDA, modeling, and automated hyperparameter tuning.',
      tech: ['XGBoost', 'Optuna', 'Python', 'Seaborn', 'Scikit-learn'],
    },
    {
      name: 'SVM Face Classification Model',
      description: 'SVM-based face recognition model evaluating multiple kernels (linear, polynomial, RBF). Linear kernel achieved 88% accuracy. Analyzed min_faces_per_person effects on classification performance.',
      tech: ['Python', 'Scikit-learn', 'SVM', 'Computer Vision'],
    },
    {
      name: 'Customer Churn Prediction (SVM + KNN)',
      description: 'Comparative ML study: SVM achieved 96.90% accuracy (F1: 0.90), KNN achieved 95.59% accuracy. PCA visualization demonstrated strong class separation.',
      tech: ['Python', 'Scikit-learn', 'SVM', 'KNN', 'PCA'],
    },
    {
      name: 'Twitter Sentiment Analysis',
      description: 'NLP sentiment classifier using Logistic Regression, TF-IDF vectorization, and stemming. Processes thousands of tweets to predict positive/negative sentiment with high accuracy.',
      tech: ['Python', 'NLP', 'TF-IDF', 'Logistic Regression', 'Scikit-learn'],
    },
    {
      name: 'Car Price Prediction',
      description: 'Comparative regression study using Linear Regression, Random Forest, and XGBoost on Kaggle automotive data. XGBoost emerged as top performer.',
      tech: ['Python', 'XGBoost', 'Random Forest', 'Pandas', 'Plotly'],
    },
    {
      name: 'Financial Index EDA (S&P 500, DJIA, NASDAQ)',
      description: 'In-depth EDA on the top 3 financial indexes. Uncovered market trends, investor sentiment patterns, and economic indicators using Pandas and Matplotlib.',
      tech: ['Python', 'Pandas', 'Matplotlib', 'Finance'],
    },
    {
      name: 'Signa – Traffic Sign Recognition',
      description: 'AI-powered educational tool for road safety. Uses image recognition and auditory feedback to identify traffic signs. Co-developed with Daniell Anthony Bermudez.',
      tech: ['Python', 'Computer Vision', 'OpenCV', 'Audio Feedback'],
      githubLink: 'https://github.com/LouisMiguelBernal/Signa',
    },
  ],

  // ── Availability ───────────────────────────────────────────────────────────
  availability: {
    status: 'Open to opportunities',
    types: ['Full-time roles', 'Freelance projects', 'Collaborations', 'Internships'],
    preferredRoles: ['Full Stack Developer', 'Data Engineer', 'Data Analyst', 'ML Engineer', 'AI Developer', 'Backend Engineer', 'Frontend Developer'],
    noticePeriod: 'Available immediately',
  },

}

// ─────────────────────────────────────────────────────────────────────────────
// buildContext()
// Converts the knowledge base into a plain-text block injected into the
// system prompt. You don't need to edit this function.
// ─────────────────────────────────────────────────────────────────────────────
export function buildContext(): string {
  const kb = KNOWLEDGE_BASE

  const experience = kb.experience.map(e =>
    `• ${e.role} at ${e.company} (${e.period}) — ${e.location}\n` +
    ('tech' in e && e.tech ? `  Tech: ${e.tech.join(', ')}\n` : '') +
    e.bullets.map(b => `  - ${b}`).join('\n')
  ).join('\n\n')

  const education = kb.education.map(e =>
    `• ${e.degree} — ${e.school} (${e.period})\n` +
    `  Grade: ${e.grade}\n` +
    (e.notes ? `  Notes: ${e.notes}` : '')
  ).join('\n\n')

  const skills = [
    `Languages:        ${kb.skills.languages.join(', ')}`,
    `Frameworks:       ${kb.skills.frameworks.join(', ')}`,
    `AI/ML:            ${kb.skills.aiml.join(', ')}`,
    `Data Science:     ${kb.skills.dataScience.join(', ')}`,
    `Data Engineering: ${kb.skills.dataEngineering.join(', ')}`,
    `Databases:        ${kb.skills.databases.join(', ')}`,
    `Tools:            ${kb.skills.tools.join(', ')}`,
    `Concepts:         ${kb.skills.concepts.join(', ')}`,
  ].join('\n')

  const certs = kb.certifications.map(c =>
    `• ${c.name} — ${c.issuer} (${c.date})` +
    ('credentialId' in c && c.credentialId ? ` [ID: ${c.credentialId}]` : '') +
    ('verifyLink' in c && c.verifyLink ? `\n  Verify: ${c.verifyLink}` : '') +
    `\n  ${c.description}`
  ).join('\n\n')

  const projects = kb.projects.map(p =>
    `• ${p.name} (${p.category} · ${p.year})\n` +
    ('period' in p && p.period ? `  Period: ${p.period}\n` : '') +
    `  ${p.description}\n` +
    `  Tech: ${p.tech.join(', ')}\n` +
    `  Live: ${p.liveLink}\n` +
    `  GitHub: ${p.githubLink}\n` +
    p.highlights.map(h => `  - ${h}`).join('\n')
  ).join('\n\n')

  const thesis = kb.thesis
  const thesisBlock = `
Title:       ${thesis.title}
Year:        ${thesis.year}
School:      ${thesis.school}
Status:      ${thesis.status}
Co-Author:   ${thesis.coAuthor}
Adviser:     ${thesis.adviser}
Conference:  ${thesis.conference}
Live:        ${thesis.liveLink}
GitHub:      ${thesis.githubLink}
Summary:     ${thesis.abstract.trim()}
Highlights:
${thesis.highlights.map(h => `  - ${h}`).join('\n')}
`.trim()

  const otherWork = kb.otherWork.map(p =>
    `• ${p.name}` +
    ('period' in p && p.period ? ` (${p.period})` : '') +
    `\n  ${p.description}\n  Tech: ${p.tech.join(', ')}` +
    ('githubLink' in p && p.githubLink ? `\n  GitHub: ${p.githubLink}` : '')
  ).join('\n\n')

  return `
=== ABOUT ===
Name:     ${kb.personal.name}
Title:    ${kb.personal.title}
Location: ${kb.personal.location}
Email:    ${kb.personal.email}
Phone:    ${kb.personal.phone}
LinkedIn: ${kb.personal.linkedin}
GitHub:   ${kb.personal.github}
Summary:  ${kb.personal.summary.trim()}

=== UNDERGRADUATE THESIS ===
${thesisBlock}

=== WORK EXPERIENCE ===
${experience}

=== EDUCATION ===
${education}

=== SKILLS ===
${skills}

=== CERTIFICATIONS (${kb.certifications.length} total) ===
${certs}

=== FEATURED PROJECTS (${kb.projects.length} total) ===
${projects}

=== OTHER NOTABLE WORK & RESEARCH ===
${otherWork}

=== AVAILABILITY ===
Status:          ${kb.availability.status}
Open to:         ${kb.availability.types.join(', ')}
Preferred roles: ${kb.availability.preferredRoles.join(', ')}
Notice period:   ${kb.availability.noticePeriod}
`.trim()
}
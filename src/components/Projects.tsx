'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const projects = [
  {
    title: 'VisorAI',
    category: 'AI / MOBILE APP',
    description: 'A YOLOv11-Powered Mobile Application for Real-Time Detection of LTO Road Markings with Auditory Feedback. Assists drivers and pedestrians by identifying road markings through the camera and providing immediate audio cues.',
    tags: ['YOLOv11', 'Python', 'Mobile', 'Computer Vision'],
    accent: '#4af2a1',
    year: '2026',
    link: 'https://github.com/LouisMiguelBernal/VisorAI',
    github: 'https://github.com/LouisMiguelBernal/VisorAI',
    imgIntro: '/projects/VR_intro.jpg',
    img1: '/projects/VR_1.jpg',
  },
  {
    title: 'DeepS&P',
    category: 'AI / FINANCE',
    description: 'Institutional-grade S&P 500 AI forecasting platform powered by a 3-layer LSTM trained on 90+ years of historical data. Includes Monte Carlo simulation with up to 2,000 stochastic paths and dynamic financial dashboards.',
    tags: ['TensorFlow', 'LSTM', 'Monte Carlo', 'Finance'],
    accent: '#7eb8f7',
    year: '2026',
    link: 'https://deepsp500.streamlit.app/',
    github: 'https://github.com/LouisMiguelBernal/DeepSP',
    imgIntro: '/projects/DP_intro.jpg',
    img1: '/projects/DP_1.jpg',
  },
  {
    title: 'GiftxAI',
    category: 'AI / RAG SYSTEM',
    description: 'Enterprise-grade RAG-powered gift recommendation system leveraging Groq Llama 3.3, triple-validation for strict accuracy, and FAISS vector embeddings. Zero hallucinations with real-time performance metrics.',
    tags: ['LangChain', 'FAISS', 'Groq', 'RAG'],
    accent: '#c084fc',
    year: '2025',
    link: 'https://giftxai.streamlit.app/',
    github: 'https://github.com/LouisMiguelBernal/GiftxAI',
    imgIntro: '/projects/GA_intro.jpg',
    img1: '/projects/GA_1.jpg',
  },
  {
    title: 'XGE',
    category: 'ML / DATA SCIENCE',
    description: 'End-to-end machine learning pipeline predicting vehicle CO₂ emissions using XGBoost with feature engineering, SHAP explainability, and an interactive dashboard for real-time emission forecasting.',
    tags: ['XGBoost', 'SHAP', 'Python', 'Scikit-learn'],
    accent: '#fb923c',
    year: '2025',
    link: 'https://xge-ai.streamlit.app/',
    github: 'https://github.com/LouisMiguelBernal/XGE',
    imgIntro: '/projects/XG_intro.png',
    img1: '/projects/XG_1.png',
  },
  {
    title: 'QuantMaven',
    category: 'DATA / DASHBOARD',
    description: 'Interactive Streamlit trading dashboard integrating real-time stock data, technical indicators (RSI, Bollinger Bands), and 10 years of historical performance. Dynamic programming for max-profit optimization.',
    tags: ['Streamlit', 'YFinance', 'Plotly', 'Python'],
    accent: '#34d399',
    year: '2024',
    link: 'https://quantmaven.streamlit.app/',
    github: 'https://github.com/LouisMiguelBernal/QuantMaven',
    imgIntro: '/projects/QM_Intro.jpg',
    img1: '/projects/QM_1.png',
  },
]

// ── Past project groups ───────────────────────────────────────────────────────
const pastGroups = [
  {
    id: 'ml-ai',
    label: 'ML / AI',
    icon: '🤖',
    color: '#4af2a1',
    // ordered: most impactful / complex first
    items: [
      { title: 'Signa', desc: 'Real-time traffic sign detection app using computer vision for driver safety alerts.', tags: ['Computer Vision', 'Python', 'OpenCV'], github: 'https://github.com/LouisMiguelBernal/Signa' },
      { title: 'Face Recognition SVM', desc: 'Support vector machine-based face recognition system with image preprocessing.', tags: ['SVM', 'OpenCV', 'Scikit-learn'], github: 'https://github.com/LouisMiguelBernal/Face-Recognition-SVM' },
      { title: 'Census Income ML', desc: 'Advanced ML workflow on adult income data with Optuna hyperparameter tuning.', tags: ['Optuna', 'Scikit-learn', 'EDA'], github: 'https://github.com/LouisMiguelBernal/Census-Income' },
      { title: 'NLP Emotion', desc: 'Emotion response NLP program for sentiment and emotion classification.', tags: ['NLP', 'Jupyter', 'Transformers'], github: 'https://github.com/LouisMiguelBernal/NLP-Project' },
      { title: 'Twitter Sentiment', desc: 'Sentiment analysis pipeline on Twitter/X data with NLP techniques.', tags: ['NLP', 'NLTK', 'Pandas'], github: 'https://github.com/LouisMiguelBernal/Twitter-Sentiment-Analysis' },
      { title: 'Customer Churn ML', desc: 'ML model predicting customer churn with XGBoost and feature engineering.', tags: ['XGBoost', 'Sklearn', 'EDA'], github: 'https://github.com/LouisMiguelBernal/Customer-Churn-ML' },
      { title: 'Medical Insurance ML', desc: 'Predicting medical insurance charges with feature importance analysis.', tags: ['Regression', 'Sklearn', 'Python'], github: 'https://github.com/LouisMiguelBernal/Medical-Insurance-ML' },
      { title: 'Car Price Prediction', desc: 'Data cleaning, EDA, and XGBoost ML model for car price estimation.', tags: ['XGBoost', 'EDA', 'Python'], github: 'https://github.com/LouisMiguelBernal/Car-Price-Prediction' },
      { title: 'TwtAI', desc: 'AI-powered Twitter analytics and automated insights tool.', tags: ['AI', 'Python', 'Jupyter'], github: 'https://github.com/LouisMiguelBernal/TwtAI' },
      { title: 'Bank ANN', desc: 'TensorFlow ANN on bank advertising dataset achieving high accuracy classification.', tags: ['TensorFlow', 'ANN', 'Python'], github: 'https://github.com/LouisMiguelBernal/bank' },
      { title: 'Student Performance ML', desc: 'Predicting student academic performance with ensemble ML classifiers.', tags: ['Random Forest', 'Sklearn', 'Python'], github: 'https://github.com/LouisMiguelBernal/Student-Performance-ML' },
      { title: 'Iris KNN', desc: 'Classic K-Nearest Neighbors implementation on the Iris dataset.', tags: ['KNN', 'Sklearn', 'Python'], github: 'https://github.com/LouisMiguelBernal/Iris-KNN' },
    ],
  },
  {
    id: 'data-analysis',
    label: 'Data Analysis',
    icon: '📊',
    color: '#7eb8f7',
    items: [
      { title: 'House Price Power BI', desc: 'Interactive Power BI + PostgreSQL dashboard for comprehensive house price analytics.', tags: ['Power BI', 'PostgreSQL', 'Dashboard'], github: 'https://github.com/LouisMiguelBernal/House-Price-Analysis-Dashboard-with-Power-BI-and-PostgreSQL' },
      { title: 'FDIC Failed Banks', desc: 'Power BI analysis of U.S. bank failures from 2000–2024 with interactive maps.', tags: ['Power BI', 'FDIC Data', 'DAX'], github: 'https://github.com/LouisMiguelBernal/FDIC-Failed-Banks-Analysis' },
      { title: 'AirBNB Analysis', desc: 'Full data pipeline: cleaning, visualization, mining, and prediction on AirBNB NYC dataset.', tags: ['Pandas', 'Seaborn', 'PostgreSQL'], github: 'https://github.com/LouisMiguelBernal/AirBNB' },
      { title: 'Starbucks Location Analysis', desc: 'Geospatial analysis of global Starbucks store locations and density patterns.', tags: ['Folium', 'Pandas', 'Geospatial'], github: 'https://github.com/LouisMiguelBernal/Starbucks-Location-Analysis' },
      { title: 'COVID-19 Barangay', desc: 'COVID-19 analysis at barangay level using geospatial and statistical methods.', tags: ['GeoPandas', 'Pandas', 'Jupyter'], github: 'https://github.com/LouisMiguelBernal/COVID-19-Barangay-Analysis' },
      { title: 'Accenture Data Project', desc: 'Excel-driven analysis uncovering Accenture business insights and growth opportunities.', tags: ['Excel', 'Business Analysis', 'Visualization'], github: 'https://github.com/LouisMiguelBernal/Accenture-Data-Project' },
      { title: 'Coffee Sales Power BI', desc: 'Interactive Power BI dashboard tracking coffee sales KPIs and revenue trends.', tags: ['Power BI', 'DAX', 'Dashboard'], github: 'https://github.com/LouisMiguelBernal/Coffee-Sales-Power-Bi' },
      { title: 'Data Breach Analysis', desc: 'Exploratory analysis of global data breach incidents and breach patterns.', tags: ['Pandas', 'Matplotlib', 'EDA'], github: 'https://github.com/LouisMiguelBernal/Data-Breach-Analysis' },
      { title: 'Covid-19 Excel Analysis', desc: 'Comprehensive COVID-19 pandemic data processing and visualization in Excel.', tags: ['Excel', 'Data Viz', 'Statistics'], github: 'https://github.com/LouisMiguelBernal/Covid-19-Analysis' },
      { title: 'Data Analysis Projects', desc: 'Collection of diverse data analysis projects covering multiple domains.', tags: ['Pandas', 'Jupyter', 'Matplotlib'], github: 'https://github.com/LouisMiguelBernal/Data-Analysis-Projects' },
    ],
  },
  {
    id: 'finance-stocks',
    label: 'Finance & Stocks',
    icon: '📈',
    color: '#34d399',
    items: [
      { title: 'Stock Indicators Streamlit', desc: 'Streamlit app displaying real-time stock technical indicators with interactive charts.', tags: ['Streamlit', 'YFinance', 'TA-Lib'], github: 'https://github.com/LouisMiguelBernal/Stock-Indicators-Streamlit' },
      { title: 'Economic Indicators Forecast', desc: 'Forecasting stock performance using macroeconomic indicator signals.', tags: ['Sklearn', 'Pandas', 'Forecasting'], github: 'https://github.com/LouisMiguelBernal/Economic-Indicators-Stock-Forecast' },
      { title: 'BlackRock Diversification', desc: 'Portfolio diversification analysis and risk modelling on BlackRock financial data.', tags: ['Portfolio Analysis', 'Pandas', 'Finance'], github: 'https://github.com/LouisMiguelBernal/BlackRock-Stock-Diversification' },
      { title: 'Top 3 Stock Indexes', desc: 'Comparative analysis of S&P 500, NASDAQ, and DJIA with top-tier visual indicators.', tags: ['Matplotlib', 'YFinance', 'EDA'], github: 'https://github.com/LouisMiguelBernal/Top-3-Stock-Indexes-Analysis' },
      { title: 'BTC Economic Indicators', desc: 'Bitcoin price correlation with macroeconomic indicators and trend analysis.', tags: ['Crypto', 'Pandas', 'Correlation'], github: 'https://github.com/LouisMiguelBernal/BTC-Econimic-Indicators' },
      { title: 'Google Stock Analysis', desc: 'Deep dive into Google stock history: price, volatility, and key performance metrics.', tags: ['Pandas', 'Matplotlib', 'YFinance'], github: 'https://github.com/LouisMiguelBernal/Google-Stock-Analysis' },
      { title: 'Apple vs Samsung Stocks', desc: 'Comparative stock performance analysis between Apple and Samsung Electronics.', tags: ['Pandas', 'Jupyter', 'Visualization'], github: 'https://github.com/LouisMiguelBernal/Apple-Samsung-Stocks-Comparison' },
    ],
  },
  {
    id: 'real-estate',
    label: 'Real Estate & Housing',
    icon: '🏠',
    color: '#fb923c',
    items: [
      { title: 'US House Price Prediction', desc: 'Sophisticated ML pipeline for predicting house prices across the United States.', tags: ['Sklearn', 'EDA', 'Regression'], github: 'https://github.com/LouisMiguelBernal/US-House-Price-Prediction' },
      { title: 'Real Estate PostgreSQL', desc: 'PostgreSQL + Python integration pipeline for real estate data analysis.', tags: ['PostgreSQL', 'Python', 'ETL'], github: 'https://github.com/LouisMiguelBernal/PostgreSQL-and-Python-Integration-for-Real-Estate-Analysis' },
      { title: 'California Housing', desc: 'Advanced data cleaning, visualization, and ML for California house price prediction.', tags: ['Sklearn', 'Seaborn', 'Regression'], github: 'https://github.com/LouisMiguelBernal/California-Housing-Prediction' },
      { title: 'Global EV Analysis', desc: 'PostgreSQL + Python analysis of global electric vehicle adoption trends.', tags: ['PostgreSQL', 'EV Data', 'Pandas'], github: 'https://github.com/LouisMiguelBernal/Global-Electric-Vehicle-PostgreSQL-Python-Analysis' },
      { title: 'Melbourne House Prediction', desc: 'House price prediction model for the Melbourne real estate market.', tags: ['Sklearn', 'EDA', 'Python'], github: 'https://github.com/LouisMiguelBernal/Melbourne-House-Prediction' },
    ],
  },
  {
    id: 'software',
    label: 'Software & Systems',
    icon: '⚙️',
    color: '#c084fc',
    items: [
      { title: 'Algorithms & Complexity', desc: 'C++ implementations of classic algorithms with full complexity analysis.', tags: ['C++', 'Algorithms', 'DSA'], github: 'https://github.com/LouisMiguelBernal/ALGORITHMS-AND-COMPLEXITY' },
      { title: 'Bank Database App', desc: 'Full banking management system using Python and SQLite for seamless account handling.', tags: ['Python', 'SQLite', 'OOP'], github: 'https://github.com/LouisMiguelBernal/Bank-Database-Application' },
      { title: 'RPG Simulator', desc: 'Python RPG simulator with diverse character selection, abilities, and a modification system.', tags: ['Python', 'OOP', 'Game Dev'], github: 'https://github.com/LouisMiguelBernal/RPG-SImulator' },
      { title: 'Bank System SQL', desc: 'SQL-based bank management system with comprehensive financial transaction queries.', tags: ['SQL', 'Banking', 'Database'], github: 'https://github.com/LouisMiguelBernal/Bank-System-SQL' },
    ],
  },
]

function useScrollAnimation(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
}

// ── Desktop accordion card ────────────────────────────────────────────────────
function ProjectCard({
  project,
  isActive,
  onHover,
}: {
  project: typeof projects[0]
  isActive: boolean
  onHover: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const showDetail = isActive && hovered

  return (
    <div
      onMouseEnter={() => { setHovered(true); onHover() }}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'pointer',
        flexShrink: 0,
        width: isActive ? '620px' : '110px',
        height: '580px',
        border: `1px solid ${isActive ? project.accent + '55' : 'var(--border)'}`,
        boxShadow: isActive
          ? `0 28px 72px rgba(0,0,0,0.5), 0 0 0 1px ${project.accent}18`
          : '0 4px 20px rgba(0,0,0,0.25)',
        transition: 'width 0.55s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s ease, border-color 0.4s ease',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${project.imgIntro})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        transition: 'transform 0.6s ease',
        transform: isActive && hovered ? 'scale(1.05)' : 'scale(1)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${project.img1})`,
        backgroundSize: 'cover', backgroundPosition: 'center top',
        opacity: showDetail ? 1 : 0,
        transition: 'opacity 0.55s ease',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: isActive
          ? showDetail
            ? 'linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0.1) 100%)'
            : 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.05) 100%)'
          : 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 100%)',
        transition: 'background 0.45s ease',
        zIndex: 2,
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: `linear-gradient(90deg, ${project.accent}, transparent)`,
        opacity: isActive ? 1 : 0.45,
        transition: 'opacity 0.4s ease', zIndex: 3,
      }} />
      {isActive && (
        <div style={{
          position: 'absolute', top: '18px', right: '18px', zIndex: 4,
          fontFamily: 'var(--font-mono)', fontSize: '11px',
          color: 'rgba(255,255,255,0.5)',
          background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '4px 10px', borderRadius: '20px', letterSpacing: '0.06em',
        }}>
          {project.year}
        </div>
      )}
      {!isActive && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 4,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '12px',
            color: 'rgba(255,255,255,0.75)', letterSpacing: '0.1em',
            writingMode: 'vertical-rl', textOrientation: 'mixed',
            transform: 'rotate(180deg)',
            textShadow: '0 2px 8px rgba(0,0,0,0.9)', whiteSpace: 'nowrap',
          }}>
            {project.title}
          </span>
        </div>
      )}
      {isActive && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '28px', zIndex: 4,
          transform: showDetail ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'transform 0.35s ease',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            color: project.accent,
            background: `${project.accent}18`,
            border: `1px solid ${project.accent}35`,
            padding: '3px 10px', borderRadius: '999px',
            letterSpacing: '0.1em', marginBottom: '10px',
          }}>
            {project.category}
          </div>
          <h3 style={{
            fontFamily: 'var(--font-sans)', fontSize: '24px', fontWeight: 700,
            color: '#fff', letterSpacing: '-0.02em',
            marginBottom: showDetail ? '10px' : '0',
            lineHeight: 1.15, transition: 'margin-bottom 0.3s ease',
            textShadow: '0 2px 12px rgba(0,0,0,0.6)',
          }}>
            {project.title}
          </h3>
          <div style={{
            maxHeight: showDetail ? '90px' : '0px', overflow: 'hidden',
            opacity: showDetail ? 1 : 0,
            transition: 'max-height 0.4s ease, opacity 0.35s ease',
            marginBottom: showDetail ? '14px' : '0',
          }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, margin: 0 }}>
              {project.description}
            </p>
          </div>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '6px',
            maxHeight: showDetail ? '60px' : '0px', overflow: 'hidden',
            opacity: showDetail ? 1 : 0,
            transition: 'max-height 0.4s ease 0.05s, opacity 0.35s ease 0.05s',
            marginBottom: showDetail ? '16px' : '0',
          }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px',
                color: project.accent, background: `${project.accent}15`,
                border: `1px solid ${project.accent}25`,
                padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.04em',
              }}>{tag}</span>
            ))}
          </div>
          <div style={{
            display: 'flex', gap: '10px', alignItems: 'center',
            maxHeight: showDetail ? '50px' : '0px', overflow: 'hidden',
            opacity: showDetail ? 1 : 0,
            transition: 'max-height 0.4s ease 0.1s, opacity 0.35s ease 0.1s',
          }}>
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontFamily: 'var(--font-mono)', fontSize: '12px',
                color: '#050a07', background: project.accent,
                padding: '8px 16px', borderRadius: '6px',
                textDecoration: 'none', fontWeight: 600, letterSpacing: '0.03em',
                transition: 'opacity 0.2s', flexShrink: 0,
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
              </svg>
              Live Demo
            </a>
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontFamily: 'var(--font-mono)', fontSize: '12px',
                color: 'rgba(255,255,255,0.85)',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '8px 14px', borderRadius: '6px',
                textDecoration: 'none', transition: 'background 0.2s', flexShrink: 0,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
            >
              <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
              {project.year}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Mobile stacked card ───────────────────────────────────────────────────────
function MobileCard({ project }: { project: typeof projects[0] }) {
  const [tapped, setTapped] = useState(false)

  return (
    <div
      onClick={() => setTapped(t => !t)}
      style={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        width: '100%',
        height: tapped ? '460px' : '220px',
        border: `1px solid ${tapped ? project.accent + '55' : 'var(--border)'}`,
        boxShadow: tapped ? `0 16px 48px rgba(0,0,0,0.4)` : '0 4px 16px rgba(0,0,0,0.2)',
        transition: 'height 0.45s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease, border-color 0.3s ease',
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${project.imgIntro})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        transition: 'transform 0.5s ease',
        transform: tapped ? 'scale(1.04)' : 'scale(1)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${project.img1})`,
        backgroundSize: 'cover', backgroundPosition: 'center top',
        opacity: tapped ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: tapped
          ? 'linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.1) 100%)'
          : 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 100%)',
        transition: 'background 0.4s ease',
        zIndex: 2,
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: `linear-gradient(90deg, ${project.accent}, transparent)`,
        zIndex: 3,
      }} />
      {!tapped && (
        <div style={{
          position: 'absolute', top: '14px', right: '14px', zIndex: 4,
          fontFamily: 'var(--font-mono)', fontSize: '10px',
          color: 'rgba(255,255,255,0.45)',
          background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '3px 8px', borderRadius: '20px', letterSpacing: '0.06em',
        }}>
          TAP
        </div>
      )}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', zIndex: 4 }}>
        <div style={{
          display: 'inline-flex',
          fontFamily: 'var(--font-mono)', fontSize: '9px',
          color: project.accent,
          background: `${project.accent}18`,
          border: `1px solid ${project.accent}35`,
          padding: '2px 8px', borderRadius: '999px',
          letterSpacing: '0.1em', marginBottom: '8px',
        }}>
          {project.category}
        </div>
        <h3 style={{
          fontFamily: 'var(--font-sans)', fontSize: '20px', fontWeight: 700,
          color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.15,
          marginBottom: tapped ? '10px' : '0',
          transition: 'margin-bottom 0.3s ease',
          textShadow: '0 2px 8px rgba(0,0,0,0.6)',
        }}>
          {project.title}
        </h3>
        <div style={{
          maxHeight: tapped ? '100px' : '0px', overflow: 'hidden',
          opacity: tapped ? 1 : 0,
          transition: 'max-height 0.4s ease, opacity 0.35s ease',
          marginBottom: tapped ? '12px' : '0',
        }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.6, margin: 0 }}>
            {project.description}
          </p>
        </div>
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '5px',
          maxHeight: tapped ? '60px' : '0px', overflow: 'hidden',
          opacity: tapped ? 1 : 0,
          transition: 'max-height 0.4s ease 0.05s, opacity 0.35s ease 0.05s',
          marginBottom: tapped ? '14px' : '0',
        }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px',
              color: project.accent, background: `${project.accent}15`,
              border: `1px solid ${project.accent}25`,
              padding: '2px 7px', borderRadius: '4px',
            }}>{tag}</span>
          ))}
        </div>
        <div style={{
          display: 'flex', gap: '8px',
          maxHeight: tapped ? '50px' : '0px', overflow: 'hidden',
          opacity: tapped ? 1 : 0,
          transition: 'max-height 0.4s ease 0.1s, opacity 0.35s ease 0.1s',
        }}>
          <a href={project.link} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              fontFamily: 'var(--font-mono)', fontSize: '12px',
              color: '#050a07', background: project.accent,
              padding: '8px 14px', borderRadius: '6px',
              textDecoration: 'none', fontWeight: 600, flexShrink: 0,
            }}
          >
            <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
            Demo
          </a>
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              fontFamily: 'var(--font-mono)', fontSize: '12px',
              color: 'rgba(255,255,255,0.85)',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '8px 12px', borderRadius: '6px',
              textDecoration: 'none', flexShrink: 0,
            }}
          >
            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Past project mini-card ────────────────────────────────────────────────────
// ── Past project card — original box style ────────────────────────────────────
function PastCard({
  item,
  color,
  animIndex,
}: {
  item: (typeof pastGroups[0]['items'])[0]
  color: string
  animIndex: number
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={item.github}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        textDecoration: 'none',
        background: hovered
          ? `linear-gradient(135deg, ${color}0d 0%, ${color}06 100%)`
          : 'var(--surface)',
        border: `1px solid ${hovered ? color + '40' : 'var(--border)'}`,
        borderRadius: '12px',
        padding: '16px 18px',
        transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: hovered ? `0 8px 28px ${color}18` : '0 1px 6px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        position: 'relative',
        overflow: 'hidden',
        animation: `pastCardIn 0.32s cubic-bezier(0.4,0,0.2,1) ${animIndex * 0.045}s both`,
        height: '100%',
      }}
    >
      {/* Top accent line on hover */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, ${color}, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.22s ease',
      }} />

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600,
          color: 'var(--text)', letterSpacing: '-0.01em', lineHeight: 1.3,
        }}>
          {item.title}
        </span>
        <svg
          width="13" height="13" fill="none" viewBox="0 0 24 24"
          stroke={color} strokeWidth="2.2" strokeLinecap="round"
          style={{ flexShrink: 0, marginTop: '2px', opacity: hovered ? 1 : 0.3, transition: 'opacity 0.2s' }}
        >
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
        </svg>
      </div>

      <p style={{
        fontFamily: 'var(--font-sans)', fontSize: '12px',
        color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 10px',
      }}>
        {item.desc}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
        {item.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            color: color,
            background: `${color}12`,
            border: `1px solid ${color}28`,
            padding: '2px 7px', borderRadius: '4px', letterSpacing: '0.03em',
          }}>{tag}</span>
        ))}
      </div>
    </a>
  )
}

// ── Past Projects block ───────────────────────────────────────────────────────
// 3 columns × 2 rows = 6 cards per page; right-arrow only nav; bigger tab buttons
const CARDS_PER_PAGE = 6   // 3 cols × 2 rows

function PastProjectsBlock() {
  const [activeTab, setActiveTab] = useState(0)
  const [page, setPage] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [tabHover, setTabHover] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  useScrollAnimation(containerRef as React.RefObject<HTMLElement>)

  const group = pastGroups[activeTab]
  const totalPages = Math.ceil(group.items.length / CARDS_PER_PAGE)
  const pageItems = group.items.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE)
  const canNext = page < totalPages - 1

  const switchTab = (i: number) => { setActiveTab(i); setPage(0) }

  const goNext = () => {
    if (!canNext || animating) return
    setAnimating(true)
    setTimeout(() => { setPage(p => p + 1); setAnimating(false) }, 200)
  }

  return (
    <div ref={containerRef} className="section-animate" style={{ marginTop: '80px' }}>

      {/* ── Cyber wire divider ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0px', marginBottom: '36px', position: 'relative' }}>

        {/* LEFT cyber circuit SVG — traces converge at x=420 (right edge = badge entry) */}
        <div style={{ flex: 1, position: 'relative', height: '48px', overflow: 'visible' }}>
          <svg viewBox="0 0 420 48" width="100%" height="48" preserveAspectRatio="xMaxYMid meet" style={{ display: 'block', overflow: 'visible' }}>
            <defs>
              <linearGradient id="wireL1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4af2a1" stopOpacity="0"/>
                <stop offset="65%" stopColor="#4af2a1" stopOpacity="0.5"/>
                <stop offset="100%" stopColor="#4af2a1" stopOpacity="1"/>
              </linearGradient>
              <linearGradient id="wireL2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4af2a1" stopOpacity="0"/>
                <stop offset="55%" stopColor="#4af2a1" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#4af2a1" stopOpacity="0.75"/>
              </linearGradient>
              <radialGradient id="orbL" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#4af2a1" stopOpacity="1"/>
                <stop offset="100%" stopColor="#4af2a1" stopOpacity="0"/>
              </radialGradient>
              <filter id="glowL" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="2.5" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            {/* All traces converge at (420, 24) — the badge left edge */}
            <path d="M0,24 L80,24 L110,10 L300,10 L340,24 L420,24" fill="none" stroke="url(#wireL1)" strokeWidth="1.3"/>
            <path d="M0,24 L70,24 L100,36 L280,36 L330,24 L420,24" fill="none" stroke="url(#wireL2)" strokeWidth="1"/>
            <path d="M20,24 L50,8 L200,8 L230,18 L420,18" fill="none" stroke="url(#wireL2)" strokeWidth="0.8"/>
            <path d="M0,24 L60,24 L90,40 L240,40 L290,30 L380,30 L420,24" fill="none" stroke="url(#wireL2)" strokeWidth="0.7"/>
            <path d="M110,10 L115,4 L310,4 L335,12" fill="none" stroke="url(#wireL2)" strokeWidth="0.6" strokeOpacity="0.4"/>
            <path d="M0,24 L40,24 L70,44 L200,44 L250,34 L420,34" fill="none" stroke="url(#wireL2)" strokeWidth="0.6" strokeOpacity="0.25"/>
            {/* Main trunk */}
            <path d="M0,24 L420,24" fill="none" stroke="url(#wireL1)" strokeWidth="1.6"/>
            {/* Terminal dot right at badge join */}
            <circle cx="420" cy="24" r="3.5" fill="#4af2a1" opacity="1" filter="url(#glowL)"/>
            {/* Junction nodes */}
            <circle cx="110" cy="10" r="2.5" fill="#4af2a1" opacity="0.7" filter="url(#glowL)"/>
            <circle cx="280" cy="36" r="2" fill="#4af2a1" opacity="0.5"/>
            <circle cx="230" cy="18" r="1.8" fill="#4af2a1" opacity="0.4"/>
            <circle cx="200" cy="8" r="1.5" fill="#4af2a1" opacity="0.35"/>
            <circle cx="90" cy="40" r="2" fill="#4af2a1" opacity="0.35"/>
            <circle cx="50" cy="8" r="1.5" fill="#4af2a1" opacity="0.3"/>
            {/* Flowing orb toward badge */}
            <circle r="4" fill="url(#orbL)" filter="url(#glowL)" opacity="0.95">
              <animateMotion dur="3.4s" repeatCount="indefinite">
                <mpath href="#pathLMain"/>
              </animateMotion>
            </circle>
            <path id="pathLMain" d="M0,24 L420,24" fill="none"/>
          </svg>
        </div>

        {/* CENTER badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          border: '1px solid rgba(74,242,161,0.5)',
          borderRadius: '14px',
          padding: '12px 24px',
          background: 'linear-gradient(135deg, rgba(74,242,161,0.09), rgba(74,242,161,0.03))',
          boxShadow: '0 0 32px rgba(74,242,161,0.18), 0 0 0 1px rgba(74,242,161,0.12)',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden',
          zIndex: 2,
        }}>
          {/* inner top shine */}
          <div style={{
            position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(74,242,161,0.7), transparent)',
          }}/>
          {/* left connector dot */}
          <div style={{
            position: 'absolute', left: '-1px', top: '50%', transform: 'translateY(-50%)',
            width: '5px', height: '5px', borderRadius: '50%',
            background: '#4af2a1', boxShadow: '0 0 8px #4af2a1, 0 0 16px rgba(74,242,161,0.6)',
          }}/>
          {/* right connector dot */}
          <div style={{
            position: 'absolute', right: '-1px', top: '50%', transform: 'translateY(-50%)',
            width: '5px', height: '5px', borderRadius: '50%',
            background: '#4af2a1', boxShadow: '0 0 8px #4af2a1, 0 0 16px rgba(74,242,161,0.6)',
          }}/>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4af2a1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, filter: 'drop-shadow(0 0 4px #4af2a1)' }}>
            <rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/>
            <rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>
          </svg>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#4af2a1',
            letterSpacing: '0.14em', textTransform: 'uppercase', whiteSpace: 'nowrap',
            fontWeight: 700, textShadow: '0 0 12px rgba(74,242,161,0.5)',
          }}>
            More Projects
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '13px',
            background: '#4af2a1', color: '#050a07',
            padding: '3px 10px', borderRadius: '8px', fontWeight: 800,
            boxShadow: '0 0 12px rgba(74,242,161,0.5)',
          }}>
            {pastGroups.reduce((s, g) => s + g.items.length, 0)}
          </span>
        </div>

        {/* RIGHT cyber circuit SVG — traces fan out from x=0 (badge right edge) */}
        <div style={{ flex: 1, position: 'relative', height: '48px', overflow: 'visible' }}>
          <svg viewBox="0 0 420 48" width="100%" height="48" preserveAspectRatio="xMinYMid meet" style={{ display: 'block', overflow: 'visible' }}>
            <defs>
              <linearGradient id="wireR1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4af2a1" stopOpacity="1"/>
                <stop offset="35%" stopColor="#4af2a1" stopOpacity="0.5"/>
                <stop offset="100%" stopColor="#4af2a1" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="wireR2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4af2a1" stopOpacity="0.75"/>
                <stop offset="45%" stopColor="#4af2a1" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#4af2a1" stopOpacity="0"/>
              </linearGradient>
              <radialGradient id="orbR" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#4af2a1" stopOpacity="1"/>
                <stop offset="100%" stopColor="#4af2a1" stopOpacity="0"/>
              </radialGradient>
              <filter id="glowR" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="2.5" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            {/* Traces fan out from (0,24) */}
            <path d="M0,24 L80,24 L120,10 L310,10 L340,24 L420,24" fill="none" stroke="url(#wireR1)" strokeWidth="1.3"/>
            <path d="M0,24 L90,24 L130,36 L300,36 L350,24 L420,24" fill="none" stroke="url(#wireR2)" strokeWidth="1"/>
            <path d="M0,18 L200,18 L240,8 L380,8 L420,24" fill="none" stroke="url(#wireR2)" strokeWidth="0.8"/>
            <path d="M0,24 L40,24 L90,40 L260,40 L310,30 L420,30" fill="none" stroke="url(#wireR2)" strokeWidth="0.7"/>
            <path d="M120,10 L125,4 L320,4 L345,12" fill="none" stroke="url(#wireR2)" strokeWidth="0.6" strokeOpacity="0.4"/>
            <path d="M0,34 L160,34 L210,44 L380,44 L420,24" fill="none" stroke="url(#wireR2)" strokeWidth="0.6" strokeOpacity="0.25"/>
            {/* Main trunk */}
            <path d="M0,24 L420,24" fill="none" stroke="url(#wireR1)" strokeWidth="1.6"/>
            {/* Terminal dot at badge join (left edge) */}
            <circle cx="0" cy="24" r="3.5" fill="#4af2a1" opacity="1" filter="url(#glowR)"/>
            {/* Junction nodes */}
            <circle cx="120" cy="10" r="2.5" fill="#4af2a1" opacity="0.7" filter="url(#glowR)"/>
            <circle cx="300" cy="36" r="2" fill="#4af2a1" opacity="0.5"/>
            <circle cx="240" cy="8" r="1.8" fill="#4af2a1" opacity="0.4"/>
            <circle cx="200" cy="8" r="1.5" fill="#4af2a1" opacity="0.35"/>
            <circle cx="90" cy="40" r="2" fill="#4af2a1" opacity="0.35"/>
            <circle cx="380" cy="8" r="1.5" fill="#4af2a1" opacity="0.3"/>
            {/* Flowing orb away from badge */}
            <circle r="4" fill="url(#orbR)" filter="url(#glowR)" opacity="0.95">
              <animateMotion dur="3.4s" begin="1.7s" repeatCount="indefinite">
                <mpath href="#pathRMain"/>
              </animateMotion>
            </circle>
            <path id="pathRMain" d="M0,24 L420,24" fill="none"/>
          </svg>
        </div>
      </div>

      {/* ── Category tab buttons — single-line compact ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px', alignItems: 'center' }}>
        {pastGroups.map((g, i) => {
          const active = i === activeTab
          const hover = tabHover === i && !active
          return (
            <button
              key={g.id}
              onClick={() => switchTab(i)}
              onMouseEnter={() => setTabHover(i)}
              onMouseLeave={() => setTabHover(null)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '7px',
                fontFamily: 'var(--font-mono)', fontSize: '12px',
                letterSpacing: '0.03em', whiteSpace: 'nowrap',
                padding: '7px 14px', borderRadius: '8px',
                border: `1px solid ${active ? g.color + '65' : hover ? g.color + '30' : 'var(--border)'}`,
                background: active
                  ? `linear-gradient(135deg, ${g.color}1e, ${g.color}09)`
                  : hover ? `${g.color}0a` : 'var(--surface)',
                color: active ? g.color : hover ? g.color : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.18s cubic-bezier(0.4,0,0.2,1)',
                boxShadow: active
                  ? `0 0 18px ${g.color}25, inset 0 1px 0 ${g.color}28`
                  : hover ? `0 3px 12px ${g.color}12` : 'none',
                fontWeight: active ? 700 : 500,
                transform: hover && !active ? 'translateY(-1px)' : 'translateY(0)',
              }}
            >
              <span style={{ fontSize: '14px', lineHeight: 1, filter: active ? 'none' : hover ? 'none' : 'grayscale(0.5) opacity(0.65)', transition: 'filter 0.18s' }}>{g.icon}</span>
              <span>{g.label}</span>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px',
                background: active ? `${g.color}30` : hover ? `${g.color}18` : 'rgba(128,128,128,0.1)',
                color: active ? g.color : hover ? g.color : 'var(--text-muted)',
                padding: '1px 6px', borderRadius: '5px',
                transition: 'all 0.18s', fontWeight: active ? 800 : 500,
              }}>
                {g.items.length}
              </span>
            </button>
          )
        })}
      </div>

      {/* ── Cards grid: 3 cols × 2 rows ── */}
      <div style={{ position: 'relative' }}>
        <div
          key={`${group.id}-${page}`}
          className="past-cards-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateX(-12px)' : 'translateX(0)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
        >
          {pageItems.map((item, i) => (
            <PastCard key={item.title} item={item} color={group.color} animIndex={i} />
          ))}
        </div>

        {/* Left arrow — go to previous page */}
        {page > 0 && (
          <button
            onClick={() => {
              if (animating) return
              setAnimating(true)
              setTimeout(() => { setPage(p => p - 1); setAnimating(false) }, 200)
            }}
            style={{
              position: 'absolute',
              left: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '40px', height: '40px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${group.color}30, ${group.color}15)`,
              border: `1px solid ${group.color}55`,
              color: group.color,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 4px 18px ${group.color}30, 0 0 0 1px ${group.color}20`,
              transition: 'all 0.2s ease',
              zIndex: 5,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `linear-gradient(135deg, ${group.color}50, ${group.color}28)`
              e.currentTarget.style.boxShadow = `0 6px 24px ${group.color}45, 0 0 0 1px ${group.color}40`
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = `linear-gradient(135deg, ${group.color}30, ${group.color}15)`
              e.currentTarget.style.boxShadow = `0 4px 18px ${group.color}30, 0 0 0 1px ${group.color}20`
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
        )}

        {/* Right arrow — go to next page */}
        {canNext && (
          <button
            onClick={goNext}
            style={{
              position: 'absolute',
              right: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '40px', height: '40px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${group.color}30, ${group.color}15)`,
              border: `1px solid ${group.color}55`,
              color: group.color,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 4px 18px ${group.color}30, 0 0 0 1px ${group.color}20`,
              transition: 'all 0.2s ease',
              zIndex: 5,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `linear-gradient(135deg, ${group.color}50, ${group.color}28)`
              e.currentTarget.style.boxShadow = `0 6px 24px ${group.color}45, 0 0 0 1px ${group.color}40`
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = `linear-gradient(135deg, ${group.color}30, ${group.color}15)`
              e.currentTarget.style.boxShadow = `0 4px 18px ${group.color}30, 0 0 0 1px ${group.color}20`
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        )}
      </div>

      {/* ── Footer: page dots + count + github link ── */}
      <div style={{
        marginTop: '20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px',
      }}>
        {/* Page dots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {totalPages > 1 && Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} onClick={() => setPage(i)} style={{
              width: i === page ? '24px' : '8px', height: '8px',
              borderRadius: '4px',
              background: i === page ? group.color : 'var(--border)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
              boxShadow: i === page ? `0 0 8px ${group.color}70` : 'none',
            }} />
          ))}
          {totalPages > 1 && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginLeft: '4px' }}>
              {page + 1} / {totalPages}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
            {pageItems.length} of {group.items.length} in {group.label}
          </span>
          <a
            href="https://github.com/LouisMiguelBernal"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontFamily: 'var(--font-mono)', fontSize: '11px',
              color: 'var(--accent)', textDecoration: 'none', letterSpacing: '0.04em',
              opacity: 0.75, transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.75')}
          >
            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View all on GitHub ↗
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Projects() {
  const headRef = useRef<HTMLDivElement>(null)
  useScrollAnimation(headRef as React.RefObject<HTMLElement>)

  const [activeIndex, setActiveIndex] = useState(0)
  const prev = useCallback(() => setActiveIndex(i => (i - 1 + projects.length) % projects.length), [])
  const next = useCallback(() => setActiveIndex(i => (i + 1) % projects.length), [])

  return (
    <section id="projects" style={{ padding: '120px 32px', position: 'relative' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div ref={headRef} className="section-animate" style={{ marginBottom: '56px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              border: '1px solid var(--border)', borderRadius: '999px',
              padding: '5px 14px', marginBottom: '20px',
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Projects
              </span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-sans)', fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700, color: 'var(--text)',
              letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '12px',
            }}>
              Things I've Built
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--text-muted)', maxWidth: '460px', lineHeight: 1.65 }}>
              End-to-End Projects Showcasing my Expertise in AI Development
            </p>
          </div>

          {/* Arrows — desktop only */}
          <div className="proj-arrows" style={{ display: 'flex', gap: '10px' }}>
            {[{ fn: prev, dir: 'left' }, { fn: next, dir: 'right' }].map(({ fn, dir }) => (
              <button key={dir} onClick={fn} style={{
                width: '44px', height: '44px', borderRadius: '50%',
                background: 'var(--surface)', border: '1px solid var(--border)',
                color: 'var(--text-muted)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  {dir === 'left' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* ── DESKTOP: accordion row ── */}
        <div className="proj-desktop" style={{ display: 'flex', gap: '12px', alignItems: 'stretch', overflowX: 'hidden' }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} isActive={i === activeIndex} onHover={() => setActiveIndex(i)} />
          ))}
        </div>

        {/* Desktop dot indicators */}
        <div className="proj-desktop" style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '28px' }}>
          {projects.map((p, i) => (
            <button key={i} onClick={() => setActiveIndex(i)} style={{
              width: i === activeIndex ? '28px' : '8px', height: '8px',
              borderRadius: '4px',
              background: i === activeIndex ? projects[activeIndex].accent : 'var(--border)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.35s ease',
            }} />
          ))}
        </div>

        {/* ── MOBILE: stacked tap cards ── */}
        <div className="proj-mobile" style={{ display: 'none', flexDirection: 'column', gap: '16px' }}>
          {projects.map(p => (
            <MobileCard key={p.title} project={p} />
          ))}
        </div>

        {/* ── Past Projects grouped section ── */}
        <PastProjectsBlock />

      </div>

      <style>{`
        @keyframes pastCardIn {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (max-width: 768px) {
          .proj-desktop { display: none !important; }
          .proj-mobile   { display: flex !important; }
          .proj-arrows   { display: none !important; }
        }
        @media (max-width: 640px) {
          .past-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

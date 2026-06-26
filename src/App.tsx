import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Coins, 
  ShieldCheck, 
  Scale, 
  Calendar, 
  Users, 
  CheckCircle, 
  Menu, 
  X, 
  ArrowRight, 
  FileCode, 
  Check, 
  Copy, 
  Calculator, 
  FileText,
  BadgeAlert,
  Sliders,
  DollarSign,
  Briefcase,
  Layers,
  Sparkles
} from 'lucide-react';
import { STANDALONE_HTML, STANDALONE_CSS, STANDALONE_JS } from './codeData';

interface Booking {
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
  notes: string;
  createdAt: string;
}

export default function App() {
  // Mobile navigation
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Standalone code tab selection
  const [activeCodeTab, setActiveCodeTab] = useState<'html' | 'css' | 'js'>('html');
  const [copiedCode, setCopiedCode] = useState(false);

  // Interactive suite active tab
  const [activeToolTab, setActiveToolTab] = useState<'calculator' | 'quiz'>('calculator');

  // --- Calculator states ---
  const [initialInvestment, setInitialInvestment] = useState(50000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [interestRate, setInterestRate] = useState(7.5);
  const [investmentYears, setInvestmentYears] = useState(20);

  // --- Quiz States ---
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});

  // --- Consultation Bookings states ---
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Wealth Design',
    date: '',
    time: '09:00 AM EST',
    notes: ''
  });
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);

  // Load bookings from localStorage
  useEffect(() => {
    const savedBookings = localStorage.getItem('apex_consult_bookings');
    if (savedBookings) {
      try {
        setBookings(JSON.parse(savedBookings));
      } catch (e) {
        console.error("Failed to parse bookings", e);
      }
    }
  }, []);

  // Sync / copy code to clipboard
  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Format monetary value
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(num);
  };

  // Compound Interest Wealth Calculation
  const calculateTotalWealth = () => {
    const P = initialInvestment;
    const PMT = monthlyContribution;
    const r = interestRate / 100;
    const t = investmentYears;
    const n = 12; // Monthly compounding

    const nt = n * t;
    const rateOverN = r / n;

    let compoundPrincipal = P;
    let totalInvested = P;
    let accumulatedMonthly = 0;

    if (r === 0) {
      accumulatedMonthly = PMT * nt;
      totalInvested += PMT * nt;
    } else {
      compoundPrincipal = P * Math.pow(1 + rateOverN, nt);
      accumulatedMonthly = PMT * ((Math.pow(1 + rateOverN, nt) - 1) / rateOverN);
      totalInvested += PMT * nt;
    }

    const totalPortfolio = compoundPrincipal + accumulatedMonthly;
    const totalEarnings = Math.max(0, totalPortfolio - totalInvested);

    return {
      total: totalPortfolio,
      principal: totalInvested,
      earnings: totalEarnings
    };
  };

  const wealthResult = calculateTotalWealth();

  // --- Quiz Engine Logic ---
  const quizQuestions = [
    {
      question: "How many months of net living expenses do you currently hold in liquid cash reserves?",
      options: [
        { text: "Less than 1 month — I live paycheck to paycheck", score: 0 },
        { text: "1 to 3 months — I have some emergency padding", score: 10 },
        { text: "6 months or more — fully funded cash buffer", score: 20 },
      ]
    },
    {
      question: "Which of the following best describes your relationship with high-interest consumer debt?",
      options: [
        { text: "Significant — I carry substantial revolving balances", score: 0 },
        { text: "Minor — Occasional credit card or personal loan balances", score: 10 },
        { text: "Debt-Free — No consumer debts, cards paid in full monthly", score: 20 },
      ]
    },
    {
      question: "What percentage of your net monthly take-home income is directed into savings and investments?",
      options: [
        { text: "Under 5% — I save whatever happens to be left over", score: 0 },
        { text: "5% to 15% — Consistent micro-contributions", score: 10 },
        { text: "15% or more — Highly prioritized, automated distributions", score: 20 },
      ]
    },
    {
      question: "How diversified are your financial assets across global asset classes?",
      options: [
        { text: "Not Diversified — Mostly cash savings or single stocks", score: 0 },
        { text: "Moderately — Standard company 401(k) or balanced index funds", score: 10 },
        { text: "Highly — Global index allocation, real estate, and hard assets", score: 20 },
      ]
    },
    {
      question: "Do you have an active Tax-Mitigation Strategy and structured estate protections?",
      options: [
        { text: "No Plan — I pay basic income tax and have no trusts", score: 0 },
        { text: "Partial Plan — I use general retirement accounts and basic Will", score: 10 },
        { text: "Fully Optimized — Advanced asset locations, LLPs, or trust setups", score: 20 },
      ]
    }
  ];

  const handleQuizAnswer = (qIndex: number, score: number) => {
    setQuizAnswers(prev => ({ ...prev, [qIndex]: score }));
  };

  const getQuizResults = () => {
    let scoreTotal = 0;
    Object.keys(quizAnswers).forEach(key => {
      scoreTotal += quizAnswers[Number(key)];
    });

    const maxScore = quizQuestions.length * 20;
    const scorePct = Math.round((scoreTotal / maxScore) * 100);

    let tier = '';
    let advice = '';
    let color = '';

    if (scorePct >= 80) {
      tier = 'Wealth Builder (Excellent)';
      color = 'text-emerald-600 bg-emerald-50 border-emerald-200';
      advice = 'Your financial habits are outstanding! You have solid foundational structures. Focus next on tactical tax minimization strategies, customized asset locations, and establishing multi-generational alternative asset classes.';
    } else if (scorePct >= 50) {
      tier = 'Steady Growth (Moderate)';
      color = 'text-teal-600 bg-teal-50 border-teal-200';
      advice = 'You are on the correct path, but still exhibit significant cash exposures. We recommend building a stronger 6-month liquidity reserve, wiping out any revolving debts, and raising your passive index savings to 15%+';
    } else {
      tier = 'Foundation Phase (Needs Attention)';
      color = 'text-rose-600 bg-rose-50 border-rose-200';
      advice = 'Your current structure is heavily exposed to financial shocks. Prioritize setting up a dedicated emergency savings vault ($1,000 baseline), creating an automated expense tracker, and scheduling an advisory review.';
    }

    return { scorePct, tier, advice, color };
  };

  // --- Booking Form actions ---
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.date || !formData.time) return;

    const newBooking: Booking = {
      ...formData,
      createdAt: new Date().toISOString()
    };

    const updated = [...bookings, newBooking];
    setBookings(updated);
    localStorage.setItem('apex_consult_bookings', JSON.stringify(updated));
    setShowBookingSuccess(true);
    setFormData({
      name: '',
      email: '',
      service: 'Wealth Design',
      date: '',
      time: '09:00 AM EST',
      notes: ''
    });
  };

  const handleCancelBooking = (index: number) => {
    const updated = [...bookings];
    updated.splice(index, 1);
    setBookings(updated);
    localStorage.setItem('apex_consult_bookings', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-brand-cream text-slate-800 selection:bg-brand-mint/20">

      {/* --- STANDALONE EXPORT HUB (Sticky Top Panel) --- */}
      <div className="bg-slate-950 text-white py-3 border-b border-white/10 relative z-50">
        <div className="max-w-7xl mx-auto px-6 text-xs font-mono flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>DEVELOPER PORTAL: Standalone static source files available</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#code-exporter" className="text-amber-400 hover:underline flex items-center gap-1.5 font-bold">
              <FileCode className="h-3.5 w-3.5" /> View / Export Code Files
            </a>
          </div>
        </div>
      </div>

      {/* --- HEADER NAV --- */}
      <header className="sticky top-0 z-40 bg-brand-cream/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-lg bg-brand-emerald flex items-center justify-center text-brand-gold font-serif font-bold text-lg shadow-md group-hover:bg-brand-emerald/90 transition duration-300">
              A
            </div>
            <div>
              <span className="block font-serif font-bold text-lg tracking-tight text-brand-emerald">APEX</span>
              <span className="block text-[10px] uppercase font-semibold tracking-widest text-slate-400 -mt-1">Financial Consulting</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
            <a href="#services" className="hover:text-brand-emerald transition duration-200">Services</a>
            <a href="#tools" className="hover:text-brand-emerald transition duration-200">Interactive Tools</a>
            <a href="#testimonials" className="hover:text-brand-emerald transition duration-200">Client Success</a>
            <a href="#credentials" className="hover:text-brand-emerald transition duration-200">Fiduciary Standard</a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="#booking" 
              className="bg-brand-emerald hover:bg-brand-emerald/90 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm border border-emerald-950 transition duration-200"
            >
              Book Consultation
            </a>
          </div>

          {/* Mobile menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-brand-emerald transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-b border-slate-100 px-6 py-5 flex flex-col gap-3 font-medium text-slate-600 shadow-lg absolute w-full left-0 right-0 z-30"
          >
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-emerald py-1 transition">Services</a>
            <a href="#tools" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-emerald py-1 transition">Interactive Tools</a>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-emerald py-1 transition">Client Success</a>
            <a href="#credentials" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-emerald py-1 transition">Fiduciary Standard</a>
            <hr className="border-slate-100 my-1" />
            <a 
              href="#booking" 
              onClick={() => setMobileMenuOpen(false)}
              className="bg-brand-emerald text-white text-center text-sm font-semibold py-2.5 rounded-lg shadow-sm transition"
            >
              Book Consultation
            </a>
          </motion.div>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative bg-gradient-to-tr from-brand-emerald to-slate-900 text-white py-20 lg:py-28 overflow-hidden">
        {/* Abstract background subtle pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
          {/* Copy and CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 text-emerald-300 text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-white/15 mb-6"
            >
              <Sparkles className="h-3 w-3 text-brand-gold animate-pulse" />
              Bespoke Strategic Advisory
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-[1.1] text-white mb-6"
            >
              Preserve, Grow, and <span className="inline-block bg-gradient-to-r from-brand-emerald to-brand-mint text-white font-serif px-5 py-1.5 rounded-xl shadow-md align-middle mx-1.5">Sustain</span> Your Generational Wealth.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-200 font-light max-w-xl mb-8 leading-relaxed"
            >
              We design premium customized wealth models, tactical tax optimization structures, and secure retirement distribution designs engineered for families and forward-thinking pioneers.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <a 
                href="#booking" 
                className="bg-brand-gold hover:bg-emerald-400 text-brand-emerald font-bold px-7 py-3.5 rounded-lg text-center shadow-lg border border-emerald-300 transition-all hover:-translate-y-0.5 duration-200"
              >
                Begin Financial Alignment
              </a>
              <a 
                href="#tools" 
                className="bg-white/10 hover:bg-white/15 text-white font-medium px-7 py-3.5 rounded-lg text-center border border-white/20 transition-all duration-200"
              >
                Access Diagnostic Tools
              </a>
            </motion.div>

            {/* Metrics Trust Section */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 sm:gap-12 mt-12 pt-8 border-t border-white/10 w-full"
            >
              <div>
                <span className="block text-2xl sm:text-3xl font-serif font-bold text-brand-gold">$450M+</span>
                <span className="block text-[11px] text-slate-300 uppercase tracking-wider mt-1">Assets Consulted</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-serif font-bold text-brand-gold">98.4%</span>
                <span className="block text-[11px] text-slate-300 uppercase tracking-wider mt-1">Client Retention</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-serif font-bold text-brand-gold">15+ Yrs</span>
                <span className="block text-[11px] text-slate-300 uppercase tracking-wider mt-1">Fiduciary Integrity</span>
              </div>
            </motion.div>
          </div>

          {/* Abstract Image illustration */}
          <div className="lg:col-span-5 flex justify-center" style={{ backgroundColor: '#e6c67a', height: '400px' }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-md aspect-square lg:aspect-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold to-transparent opacity-10 rounded-3xl blur-2xl"></div>
              
              <div className="relative bg-brand-emerald/40 rounded-2xl p-2.5 border border-white/10 shadow-2xl overflow-hidden">
                <img 
                  src="/src/assets/images/images4.jpg" 
                  alt="Apex Wealth Growth Visualization" 
                  className="w-full h-full object-cover rounded-xl grayscale-10 contrast-110 hover:scale-[1.02] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-brand-gold">Fiduciary Protection</span>
                    <span className="block text-[10px] text-slate-300">Uncompromised standards with Charles Schwab custody</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- TRUST BADGES --- */}
      <section className="bg-emerald-950 py-5 border-t border-brand-emerald text-xs font-semibold tracking-widest text-slate-300 uppercase">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-8 items-center justify-center md:justify-between text-center md:text-left">
          <span className="flex items-center gap-2"><div className="h-1.5 w-1.5 bg-brand-gold rounded-full" /> COMPLETE FIDUCIARY DUTY</span>
          <span className="flex items-center gap-2"><div className="h-1.5 w-1.5 bg-brand-gold rounded-full" /> COMMISSION-FREE PORTFOLIOS</span>
          <span className="flex items-center gap-2"><div className="h-1.5 w-1.5 bg-brand-gold rounded-full" /> UNIFIED TAX Restructuring</span>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-emerald text-xs font-bold uppercase tracking-widest block mb-3">Structured Capability Pillars</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">Areas of Specialized Alignment</h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full"></div>
          <p className="text-slate-500 font-light mt-5">
            We target strategic allocation plans and capital preservation frameworks designed to withstand macro cycles and inflation shocks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-brand-emerald flex items-center justify-center mb-6 group-hover:bg-brand-emerald group-hover:text-white transition duration-300">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-brand-emerald transition">Wealth & Portfolio Design</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-light mb-6 flex-grow">
              Custom-tailored index modeling, factor allocations, and risk parameters aligned directly with target preservation rules.
            </p>
            <a href="#booking" className="text-xs font-bold text-brand-emerald group-hover:text-emerald-900 inline-flex items-center gap-1.5 mt-auto">
              Explore Strategy <ArrowRight className="h-3 w-3" />
            </a>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-brand-emerald flex items-center justify-center mb-6 group-hover:bg-brand-emerald group-hover:text-white transition duration-300">
              <Coins className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-brand-emerald transition">Retirement Cash Flow</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-light mb-6 flex-grow">
              Strategic draw tranche mapping which insulates daily living allowances from sudden equity valuation contractions.
            </p>
            <a href="#booking" className="text-xs font-bold text-brand-emerald group-hover:text-emerald-900 inline-flex items-center gap-1.5 mt-auto">
              Explore Retirement <ArrowRight className="h-3 w-3" />
            </a>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-brand-emerald flex items-center justify-center mb-6 group-hover:bg-brand-emerald group-hover:text-white transition duration-300">
              <Scale className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-brand-emerald transition">Tax Mitigation Structuring</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-light mb-6 flex-grow">
              Deploying trusts, customized asset location, and state tax maneuvers to protect recurring asset gains.
            </p>
            <a href="#booking" className="text-xs font-bold text-brand-emerald group-hover:text-emerald-900 inline-flex items-center gap-1.5 mt-auto">
              Explore Tax Plans <ArrowRight className="h-3 w-3" />
            </a>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-brand-emerald flex items-center justify-center mb-6 group-hover:bg-brand-emerald group-hover:text-white transition duration-300">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-brand-emerald transition">Corporate Treasury Sync</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-light mb-6 flex-grow">
              Enhancing liquidity configurations, capital reserves returns, and entity preparations for eventual asset exits.
            </p>
            <a href="#booking" className="text-xs font-bold text-brand-emerald group-hover:text-emerald-900 inline-flex items-center gap-1.5 mt-auto">
              Explore Corporate <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </section>

      {/* --- INTERACTIVE TOOLS SUITE --- */}
      <section id="tools" className="py-20 bg-slate-50 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-brand-emerald text-xs font-bold uppercase tracking-widest block mb-3">Complimentary Diagnostic suite</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-emerald tracking-tight">Financial Modeling & Diagnostic Review</h2>
            <p className="text-slate-500 font-light mt-3">Test prospective growth returns or complete our multi-step diagnostic review.</p>
          </div>

          {/* Tabs switch */}
          <div className="flex justify-center border-b border-slate-200 max-w-lg mx-auto mb-12">
            <button 
              onClick={() => setActiveToolTab('calculator')}
              className={`px-6 py-4 font-semibold text-sm transition-all focus:outline-none border-b-2 flex items-center gap-2 ${
                activeToolTab === 'calculator' 
                  ? 'border-brand-mint text-brand-emerald' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Calculator className="h-4 w-4" /> Wealth Growth Calculator
            </button>
            <button 
              onClick={() => setActiveToolTab('quiz')}
              className={`px-6 py-4 font-semibold text-sm transition-all focus:outline-none border-b-2 flex items-center gap-2 ${
                activeToolTab === 'quiz' 
                  ? 'border-brand-mint text-brand-emerald' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="h-4 w-4" /> Financial Health Assessment
            </button>
          </div>

          {/* Calculator Tab Render */}
          {activeToolTab === 'calculator' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid lg:grid-cols-12 gap-12 bg-white p-8 md:p-12 rounded-3xl border border-slate-100 shadow-lg max-w-5xl mx-auto"
            >
              {/* Sliders controls */}
              <div className="lg:col-span-6 space-y-8">
                <h3 className="text-2xl font-bold font-serif text-brand-emerald border-b border-slate-100 pb-4 flex items-center gap-2">
                  <Sliders className="h-5 w-5 text-brand-gold" /> Define Capital Inputs
                </h3>

                {/* Slider 1 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-slate-600">Initial Principal Investment</label>
                    <span className="text-brand-emerald font-mono font-semibold text-base">{formatCurrency(initialInvestment)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="1000000" 
                    step="5000" 
                    value={initialInvestment} 
                    onChange={(e) => setInitialInvestment(Number(e.target.value))}
                    className="w-full accent-brand-mint cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>$0</span>
                    <span>$500K</span>
                    <span>$1M+</span>
                  </div>
                </div>

                {/* Slider 2 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-slate-600">Monthly Contribution Savings</label>
                    <span className="text-brand-emerald font-mono font-semibold text-base">{formatCurrency(monthlyContribution)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="10000" 
                    step="100" 
                    value={monthlyContribution} 
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    className="w-full accent-brand-mint cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>$0</span>
                    <span>$5,000</span>
                    <span>$10,000</span>
                  </div>
                </div>

                {/* Slider 3 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-slate-600">Target Annual Compound Return</label>
                    <span className="text-brand-emerald font-mono font-semibold text-base">{interestRate}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="15" 
                    step="0.5" 
                    value={interestRate} 
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-brand-mint cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>0% (Cash)</span>
                    <span>7.5% (Balanced)</span>
                    <span>15% (Aggressive)</span>
                  </div>
                </div>

                {/* Slider 4 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-slate-600">Compounding Duration Timeline</label>
                    <span className="text-brand-emerald font-mono font-semibold text-base">{investmentYears} yrs</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="40" 
                    step="1" 
                    value={investmentYears} 
                    onChange={(e) => setInvestmentYears(Number(e.target.value))}
                    className="w-full accent-brand-mint cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>1 Year</span>
                    <span>20 Years</span>
                    <span>40 Years</span>
                  </div>
                </div>
              </div>

              {/* Graphic Display column */}
              <div className="lg:col-span-6 bg-slate-900 text-white p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-emerald/30 to-transparent pointer-events-none"></div>

                <div className="relative z-10">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">PROJECTED VALUE AT TIMELINE TERMINATION</span>
                  <div className="text-4xl sm:text-5xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-brand-mint to-teal-400 mt-2" style={{ color: '#d52323', borderColor: '#5246b7' }}>
                    {formatCurrency(wealthResult.total)}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">Estimated total accumulated portfolio balance.</p>
                </div>

                {/* Custom Graph Progress Visualizer */}
                <div className="my-8 relative z-10 space-y-4">
                  <div className="h-6 w-full bg-slate-800 rounded-full flex overflow-hidden p-1 border border-white/5">
                    <div 
                      className="bg-slate-500 rounded-l-full transition-all duration-300" 
                      style={{ width: `${(wealthResult.principal / wealthResult.total) * 100}%` }}
                    ></div>
                    <div 
                      className="bg-brand-mint rounded-r-full transition-all duration-300" 
                      style={{ width: `${(wealthResult.earnings / wealthResult.total) * 100}%` }}
                    ></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
                      <div>
                        <span className="block text-slate-400 text-[10px] uppercase">Your Contributed Capital</span>
                        <span className="font-mono font-semibold text-white mt-0.5">{formatCurrency(wealthResult.principal)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-brand-mint rounded-full"></div>
                      <div>
                        <span className="block text-brand-mint text-[10px] uppercase">Compound Interest Gains</span>
                        <span className="font-mono font-semibold text-white mt-0.5">{formatCurrency(wealthResult.earnings)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA inside output container */}
                <div className="border-t border-white/10 pt-6 relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-[11px] text-slate-400 max-w-xs leading-relaxed">
                    Ready to build a customized capital distribution model using tax-exempt alternatives?
                  </div>
                  <a 
                    href="#booking" 
                    className="bg-brand-gold hover:bg-emerald-400 text-brand-emerald font-bold px-4 py-2.5 rounded-lg text-xs text-center transition-colors whitespace-nowrap"
                  >
                    Lock in Strategy Review
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* Diagnostic Quiz Tab Render */}
          {activeToolTab === 'quiz' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl border border-slate-100 shadow-lg"
            >
              <h3 className="text-2xl font-bold font-serif text-brand-emerald border-b border-slate-100 pb-4 mb-8 text-center flex items-center justify-center gap-2">
                <FileText className="h-5 w-5 text-brand-gold" /> Financial Resilience Index
              </h3>

              {quizStep < quizQuestions.length ? (
                <div>
                  <div className="mb-4 flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    <span>QUESTION {quizStep + 1} OF {quizQuestions.length}</span>
                    <span>{Math.round(((quizStep + 1) / quizQuestions.length) * 100)}% Complete</span>
                  </div>

                  <h4 className="text-xl font-bold text-slate-800 mb-6">{quizQuestions[quizStep].question}</h4>

                  <div className="space-y-3">
                    {quizQuestions[quizStep].options.map((opt, oIdx) => (
                      <label 
                        key={oIdx} 
                        className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                          quizAnswers[quizStep] === opt.score 
                            ? 'bg-emerald-50/50 border-brand-mint text-brand-emerald shadow-sm' 
                            : 'border-slate-100 hover:bg-slate-50'
                        }`}
                      >
                        <input 
                          type="radio" 
                          name={`q-${quizStep}`} 
                          value={opt.score}
                          checked={quizAnswers[quizStep] === opt.score}
                          onChange={() => handleQuizAnswer(quizStep, opt.score)}
                          className="h-4 w-4 text-brand-emerald focus:ring-brand-emerald border-slate-300"
                        />
                        <span className="ml-3 text-sm font-medium text-slate-700">{opt.text}</span>
                      </label>
                    ))}
                  </div>

                  <div className="flex justify-between mt-8">
                    <button 
                      onClick={() => setQuizStep(prev => Math.max(0, prev - 1))}
                      disabled={quizStep === 0}
                      className={`text-slate-500 text-xs font-semibold px-4 py-2 transition ${
                        quizStep === 0 ? 'opacity-0 cursor-default' : 'hover:text-slate-800'
                      }`}
                    >
                      &larr; Back
                    </button>
                    <button 
                      onClick={() => setQuizStep(prev => prev + 1)}
                      disabled={quizAnswers[quizStep] === undefined}
                      className={`bg-brand-emerald text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition ${
                        quizAnswers[quizStep] === undefined ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-emerald/90'
                      }`}
                    >
                      {quizStep === quizQuestions.length - 1 ? 'Finish Score' : 'Continue'} &rarr;
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto text-brand-emerald">
                    <CheckCircle className="h-10 w-10 animate-bounce" />
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">YOUR DIAGNOSTIC ALIGNMENT INDEX</span>
                    <div className="text-5xl font-serif font-bold text-brand-emerald mt-1">{getQuizResults().scorePct}%</div>
                    <div className={`inline-block mt-2 font-bold text-xs px-3 py-1 rounded-full border ${getQuizResults().color}`}>
                      {getQuizResults().tier}
                    </div>
                  </div>

                  {/* Horizontal visual bar */}
                  <div className="max-w-md mx-auto bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-mint transition-all duration-1000" 
                      style={{ width: `${getQuizResults().scorePct}%` }}
                    ></div>
                  </div>

                  <div className="max-w-md mx-auto p-5 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600 text-left leading-relaxed">
                    <strong className="block text-slate-800 mb-1.5 font-semibold">Immediate Professional Recommendation:</strong>
                    {getQuizResults().advice}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-sm mx-auto pt-4">
                    <button 
                      onClick={() => {
                        setQuizStep(0);
                        setQuizAnswers({});
                      }}
                      className="text-slate-500 hover:text-slate-800 text-xs font-semibold px-4 py-2 transition"
                    >
                      Restart Diagnostic
                    </button>
                    <a 
                      href="#booking" 
                      className="bg-brand-emerald text-white font-semibold text-xs px-5 py-3 rounded-lg hover:bg-brand-emerald/90 transition shadow-sm text-center"
                    >
                      Schedule Strategic Audit
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* --- CLIENT TESTIMONIALS --- */}
      <section id="testimonials" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-emerald text-xs font-bold uppercase tracking-widest block mb-3">Client Alignment Evidence</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">Our Stories of Transformed Growth</h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="flex gap-1 text-brand-gold mb-6 text-lg">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p className="text-sm text-slate-600 leading-relaxed font-light mb-6 italic">
                "Before partnering with Apex, our multi-generational estate was highly vulnerable. Their tax design maneuvers completely optimized our family legacy structures."
              </p>
            </div>
            <div className="flex items-center gap-3 border-t border-slate-50 pt-5">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-brand-emerald font-serif">
                H
              </div>
              <div>
                <span className="block text-sm font-semibold text-slate-800">Harris Henderson</span>
                <span className="block text-[10px] text-slate-400 uppercase">Founder, Henderson Tech</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="flex gap-1 text-brand-gold mb-6 text-lg">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p className="text-sm text-slate-600 leading-relaxed font-light mb-6 italic">
                "Their retirement cash draw tranche mappings saved us during the volatile market of 2022. Our passive distribution remained completely insulated."
              </p>
            </div>
            <div className="flex items-center gap-3 border-t border-slate-50 pt-5">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-brand-emerald font-serif">
                M
              </div>
              <div>
                <span className="block text-sm font-semibold text-slate-800">Dr. Melissa Sterling</span>
                <span className="block text-[10px] text-slate-400 uppercase">Chief Surgeon, Ortho Group</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="flex gap-1 text-brand-gold mb-6 text-lg">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p className="text-sm text-slate-600 leading-relaxed font-light mb-6 italic">
                "Apex consolidated our corporate reserves treasury. They lowered debt margins, saving us over 140 basis points in recurring corporate finance charges."
              </p>
            </div>
            <div className="flex items-center gap-3 border-t border-slate-50 pt-5">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-brand-emerald font-serif">
                A
              </div>
              <div>
                <span className="block text-sm font-semibold text-slate-800">Arthur Chen</span>
                <span className="block text-[10px] text-slate-400 uppercase">MD, Chen Capital LLC</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FIDUCIARY REGULATION STANDARDS --- */}
      <section id="credentials" className="py-20 bg-emerald-950 text-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-brand-gold text-xs font-bold uppercase tracking-widest block mb-3">INTEGRITY MATRIX</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight mb-6">Uncompromising Fee-Only Standards</h2>
            <p className="text-slate-200 font-light text-sm leading-relaxed mb-6">
              As Registered Investment Advisors, we owe our clients absolute fiduciary fidelity. We reject commission-based revenue sharing, ensuring our guidance is purely engineered for your protection.
            </p>

            <ul className="space-y-4 text-xs font-semibold text-slate-300">
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 text-brand-gold" /> Registered Investment Advisor (RIA) Standard compliance
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 text-brand-gold" /> CFP&reg; (Certified Financial Planner) board fiduciary mandate
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 text-brand-gold" /> Fully segregated custody using Charles Schwab institutional products
              </li>
            </ul>
          </div>

          {/* Credential Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-center">
              <div className="text-brand-gold font-bold text-xl font-serif">CFP&reg;</div>
              <span className="block text-[10px] text-slate-400 uppercase mt-1">Certified Planner</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-center">
              <div className="text-brand-gold font-bold text-xl font-serif">CFA</div>
              <span className="block text-[10px] text-slate-400 uppercase mt-1">Chartered Analyst</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-center">
              <div className="text-brand-gold font-bold text-xl font-serif">CPA</div>
              <span className="block text-[10px] text-slate-400 uppercase mt-1">Certified Accountant</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-center">
              <div className="text-brand-gold font-bold text-xl font-serif">RIA</div>
              <span className="block text-[10px] text-slate-400 uppercase mt-1">Registered Fiduciary</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- SCHEDULING FORM CONTAINER --- */}
      <section id="booking" className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Pitch side */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-brand-emerald text-xs font-bold uppercase tracking-widest block">INITIAL CONGRUENCE SYNC</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight leading-tight">Book Your Free 30-Minute Advisory Strategic Review</h2>
            <div className="w-12 h-1 bg-brand-gold rounded-full"></div>

            <p className="text-slate-500 font-light text-sm leading-relaxed">
              We audit your current asset composition and tax allocations. Free from sales pitches—purely objective, high-accuracy analysis.
            </p>

            <div className="space-y-4 pt-4 text-xs font-medium text-slate-600">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-50 text-brand-emerald flex items-center justify-center font-bold text-xs shrink-0">1</div>
                <div>
                  <strong className="text-slate-800 block">Pre-Audit Call Survey:</strong>
                  <span className="text-slate-500 font-light">Supply clear metrics so our analysts can perform preparatory research.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-50 text-brand-emerald flex items-center justify-center font-bold text-xs shrink-0">2</div>
                <div>
                  <strong className="text-slate-800 block">Structured Strategic Sync:</strong>
                  <span className="text-slate-500 font-light font-sans">30-minute review targeting allocations, estate plans, and risk profiles.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-50 text-brand-emerald flex items-center justify-center font-bold text-xs shrink-0">3</div>
                <div>
                  <strong className="text-slate-800 block">Custom Summary Blueprint:</strong>
                  <span className="text-slate-500 font-light">Receive a personalized summary overview with action guidelines.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form side */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-xl space-y-6">
            <h3 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-brand-emerald" /> Consultation Portal
            </h3>

            {showBookingSuccess && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50 text-emerald-900 border border-emerald-200 p-6 rounded-2xl flex flex-col items-center text-center space-y-3"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-800 text-xl font-bold">✓</div>
                <div>
                  <h4 className="font-bold text-base">Strategy Consultation Confirmed!</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">We have secured your slot. A senior financial consultant will email you to coordinate the detailed calendar coordinates.</p>
                </div>
                <button 
                  onClick={() => setShowBookingSuccess(false)}
                  className="text-xs text-brand-emerald hover:text-emerald-950 font-semibold px-4 py-1.5 bg-white rounded-lg border border-emerald-200 shadow-sm transition"
                >
                  Book Another Session
                </button>
              </motion.div>
            )}

            {!showBookingSuccess && (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Johnathan Doe" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-emerald bg-slate-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Corporate Email</label>
                    <input 
                      type="email" 
                      placeholder="john@company.com" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-emerald bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Target Specialty</label>
                    <select 
                      value={formData.service}
                      onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                      className="w-full px-3 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-emerald bg-slate-50/50"
                    >
                      <option value="Wealth Design">Wealth Design</option>
                      <option value="Retirement Design">Retirement Design</option>
                      <option value="Tax Advisory">Tax Advisory</option>
                      <option value="Treasury Advisory">Treasury Advisory</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Target Date</label>
                    <input 
                      type="date" 
                      required 
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-emerald bg-slate-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Preferred Slot</label>
                    <select 
                      value={formData.time}
                      onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full px-3 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-emerald bg-slate-50/50"
                    >
                      <option value="09:00 AM EST">09:00 AM EST</option>
                      <option value="11:30 AM EST">11:30 AM EST</option>
                      <option value="02:00 PM EST">02:00 PM EST</option>
                      <option value="04:30 PM EST">04:30 PM EST</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Asset or Portfolio Horizon Details (Optional)</label>
                  <textarea 
                    placeholder="Outline any key concerns (portfolio target, horizon timelines, or tax exposures)..." 
                    rows={3} 
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-emerald bg-slate-50/50"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-brand-emerald hover:bg-emerald-900 text-white font-semibold py-3.5 rounded-xl shadow-md border border-emerald-950 transition duration-200"
                >
                  Register Consultation Schedule
                </button>
              </form>
            )}

            {/* Local persistence booking history list */}
            {bookings.length > 0 && (
              <div className="border-t border-slate-100 pt-6 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" /> Scheduled Sessions History ({bookings.length})
                </h4>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {bookings.map((b, idx) => (
                    <div 
                      key={idx} 
                      className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-brand-emerald bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                            {b.service}
                          </span>
                          <span className="text-slate-400 font-mono">#100{idx + 1}</span>
                        </div>
                        <h5 className="font-semibold text-slate-800 mt-1">{b.name}</h5>
                        <p className="text-slate-500 mt-0.5">Date: <strong className="text-slate-700">{b.date} at {b.time}</strong></p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1 font-medium text-emerald-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Confirmed
                        </span>
                        <button 
                          onClick={() => handleCancelBooking(idx)}
                          className="text-rose-500 hover:text-rose-700 font-medium px-2 py-1 rounded hover:bg-rose-50/50 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- STANDALONE DEVELOPER CODE EXPORTER HUB --- */}
      <section id="code-exporter" className="py-20 bg-slate-950 text-white border-t border-slate-900">
        <div className="max-w-5xl mx-auto px-6 space-y-8">
          <div className="text-center space-y-3">
            <span className="text-brand-gold text-xs font-bold tracking-widest uppercase block">Developer Deliverables Center</span>
            <h2 className="text-3xl font-serif font-bold tracking-tight text-white">Standalone Static Files Export</h2>
            <div className="w-12 h-1 bg-brand-gold mx-auto rounded-full"></div>
            <p className="text-slate-400 text-sm max-w-xl mx-auto font-light leading-relaxed">
              As requested, here are the standalone code files containing the complete HTML, CSS, and JS logic for this landing page. These can be run independently in any standard browser!
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-white/5 overflow-hidden">
            {/* Header / Select Tabs */}
            <div className="bg-slate-900/80 px-6 py-4 border-b border-white/5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setActiveCodeTab('html');
                    setCopiedCode(false);
                  }}
                  className={`px-4 py-2 rounded-lg font-mono text-xs font-semibold transition ${
                    activeCodeTab === 'html' ? 'bg-brand-emerald text-brand-gold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  index.html (HTML)
                </button>
                <button 
                  onClick={() => {
                    setActiveCodeTab('css');
                    setCopiedCode(false);
                  }}
                  className={`px-4 py-2 rounded-lg font-mono text-xs font-semibold transition ${
                    activeCodeTab === 'css' ? 'bg-brand-emerald text-brand-gold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  styles.css (CSS)
                </button>
                <button 
                  onClick={() => {
                    setActiveCodeTab('js');
                    setCopiedCode(false);
                  }}
                  className={`px-4 py-2 rounded-lg font-mono text-xs font-semibold transition ${
                    activeCodeTab === 'js' ? 'bg-brand-emerald text-brand-gold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  script.js (JS)
                </button>
              </div>

              {/* Clipboard Action */}
              <button 
                onClick={() => handleCopyCode(
                  activeCodeTab === 'html' ? STANDALONE_HTML : (activeCodeTab === 'css' ? STANDALONE_CSS : STANDALONE_JS)
                )}
                className="bg-white/5 hover:bg-white/10 text-xs px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5 transition text-slate-300 hover:text-white font-medium"
              >
                {copiedCode ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-brand-mint" /> Code Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" /> Copy File Code
                  </>
                )}
              </button>
            </div>

            {/* Code Body */}
            <div className="p-6 font-mono text-xs text-slate-300 overflow-x-auto max-h-96 bg-slate-950/80">
              <pre className="whitespace-pre">
                <code>
                  {activeCodeTab === 'html' && STANDALONE_HTML}
                  {activeCodeTab === 'css' && STANDALONE_CSS}
                  {activeCodeTab === 'js' && STANDALONE_JS}
                </code>
              </pre>
            </div>
          </div>

          <div className="p-5 bg-slate-900 rounded-xl border border-white/5 flex items-start gap-3 text-xs leading-relaxed max-w-2xl mx-auto">
            <BadgeAlert className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-1">Local Development Setup Instructions:</strong>
              <span className="text-slate-400">
                1. Save the above code blocks into three individual files named <code className="text-emerald-400">index.html</code>, <code className="text-emerald-400">styles.css</code>, and <code className="text-emerald-400">script.js</code> inside a single folder.<br />
                2. Put the background image <code className="text-emerald-400">src/assets/images/images4.jpg</code> inside that same folder structure (or update the img src line in index.html to match your local assets).<br />
                3. Open <code className="text-emerald-400">index.html</code> directly in any web browser to render the fully styled and interactive static landing page!
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <a href="#" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-emerald flex items-center justify-center text-brand-gold font-serif font-bold text-base shadow">
                A
              </div>
              <div>
                <span className="block font-serif font-bold text-sm tracking-tight text-white">APEX</span>
                <span className="block text-[8px] uppercase font-semibold tracking-widest text-slate-500 -mt-0.5">Financial Consulting</span>
              </div>
            </a>
            <p className="text-slate-500 text-[11px] leading-relaxed font-light">
              Bespoke strategic wealth allocation, fiduciary guidance, and optimization advisory.
            </p>
          </div>

          <div>
            <h4 className="text-slate-200 font-bold uppercase text-[10px] tracking-wider mb-4">Advisory Pillars</h4>
            <ul className="space-y-2 font-light">
              <li><a href="#services" className="hover:text-white transition">Wealth Strategy</a></li>
              <li><a href="#services" className="hover:text-white transition">Retirement Roadmaps</a></li>
              <li><a href="#services" className="hover:text-white transition">Tax Restructuring</a></li>
              <li><a href="#services" className="hover:text-white transition">Treasury Advisory</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-200 font-bold uppercase text-[10px] tracking-wider mb-4">Interactive Suite</h4>
            <ul className="space-y-2 font-light">
              <li><a href="#tools" className="hover:text-white transition">Wealth Growth Modeler</a></li>
              <li><a href="#tools" className="hover:text-white transition">Financial Resilience Index</a></li>
              <li><a href="#booking" className="hover:text-white transition">Consultation Portal</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-slate-200 font-bold uppercase text-[10px] tracking-wider mb-4">Fiduciary Disclosure</h4>
            <p className="text-slate-500 text-[10px] leading-relaxed font-light">
              All computations are math approximations. Past performance yields no future certainty. Fiduciary status does not imply SEC endorsements. Segmented custody secured with Charles Schwab.
            </p>
            <div className="text-[10px] text-slate-600 mt-2">
              &copy; 2026 APEX Financial Consulting LLC. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

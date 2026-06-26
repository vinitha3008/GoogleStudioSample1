/* Standalone Source Codes for Export Center */

export const STANDALONE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Apex Financial Consulting | Wealth Management & Strategic Advisory</title>
  
  <!-- Tailwind CSS v4 CDN -->
  <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
  
  <!-- Custom CSS Styles -->
  <link rel="stylesheet" href="styles.css">
</head>
<body class="bg-[#faf9f6] text-[#1e293b] font-sans antialiased selection:bg-emerald-500/20">

  <!-- --- NAVIGATION HEADER --- -->
  <header class="sticky top-0 z-50 bg-[#faf9f6]/95 backdrop-blur-md border-b border-slate-100">
    <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <!-- Logo / Name -->
      <a href="#" class="flex items-center gap-2.5 group">
        <div class="w-10 h-10 rounded-lg bg-emerald-900 flex items-center justify-center text-amber-400 font-serif font-bold text-lg shadow-md group-hover:bg-emerald-800 transition">
          A
        </div>
        <div>
          <span class="block font-serif font-bold text-lg tracking-tight text-emerald-900">APEX</span>
          <span class="block text-[10px] uppercase font-semibold tracking-widest text-slate-400 -mt-1">Financial Consulting</span>
        </div>
      </a>

      <!-- Desktop Menu Links -->
      <nav class="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
        <a href="#services" class="hover:text-emerald-800 transition">Services</a>
        <a href="#tools" class="hover:text-emerald-800 transition">Interactive Tools</a>
        <a href="#testimonials" class="hover:text-emerald-800 transition">Client Success</a>
        <a href="#credentials" class="hover:text-emerald-800 transition">Trust & Standards</a>
      </nav>

      <!-- Desktop Action CTA -->
      <div class="hidden md:flex items-center gap-4">
        <a href="#booking" class="bg-emerald-900 hover:bg-emerald-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm border border-emerald-950 transition">
          Book Consultation
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <button id="mobile-menu-btn" class="md:hidden p-2 text-slate-600 hover:text-emerald-900 transition">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
    </div>

    <!-- Mobile Dropdown Menu -->
    <div id="mobile-menu" class="hidden md:hidden bg-white border-b border-slate-100 px-6 py-4 flex flex-col gap-3 font-medium text-slate-600 shadow-lg">
      <a href="#services" class="hover:text-emerald-800 py-1 transition">Services</a>
      <a href="#tools" class="hover:text-emerald-800 py-1 transition">Interactive Tools</a>
      <a href="#testimonials" class="hover:text-emerald-800 py-1 transition">Client Success</a>
      <a href="#credentials" class="hover:text-emerald-800 py-1 transition">Trust & Standards</a>
      <hr class="border-slate-100 my-1">
      <a href="#booking" class="bg-emerald-900 text-white text-center text-sm font-semibold py-2.5 rounded-lg shadow-sm transition mt-1">
        Book Consultation
      </a>
    </div>
  </header>


  <!-- --- HERO SECTION --- -->
  <section class="relative hero-gradient text-white py-20 lg:py-28 overflow-hidden">
    <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
    
    <div class="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
      <!-- Hero Copy -->
      <div class="lg:col-span-7 flex flex-col items-start">
        <div class="inline-flex items-center gap-2 bg-white/10 text-amber-300 text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-white/15 mb-6">
          <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          Bespoke Strategic Solutions
        </div>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-[1.1] text-white mb-6">
          Preserve, Grow, and <span class="gold-text-gradient font-serif">Sustain</span> Your Generational Wealth.
        </h1>
        <p class="text-lg text-slate-200 font-light max-w-xl mb-8 leading-relaxed">
          We offer elite-tier wealth modeling, customized tax restructuring advisory, and tailored retirement roadmap solutions for high-net-worth families and corporate pioneers.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a href="#booking" class="bg-amber-400 hover:bg-amber-500 text-emerald-950 font-bold px-7 py-3.5 rounded-lg text-center shadow-md border border-amber-300 transition hover:-translate-y-0.5">
            Begin Financial Alignment
          </a>
          <a href="#tools" class="bg-white/10 hover:bg-white/15 text-white font-medium px-7 py-3.5 rounded-lg text-center border border-white/20 transition">
            Access Diagnostic Tools
          </a>
        </div>

        <!-- Trust Stats Bar -->
        <div class="grid grid-cols-3 gap-6 sm:gap-12 mt-12 pt-8 border-t border-white/10 w-full">
          <div>
            <span class="block text-2xl sm:text-3xl font-serif font-bold gold-text-gradient">$450M+</span>
            <span class="block text-[11px] text-slate-300 uppercase tracking-wider mt-1">Assets Managed</span>
          </div>
          <div>
            <span class="block text-2xl sm:text-3xl font-serif font-bold gold-text-gradient">98.4%</span>
            <span class="block text-[11px] text-slate-300 uppercase tracking-wider mt-1">Client Retention</span>
          </div>
          <div>
            <span class="block text-2xl sm:text-3xl font-serif font-bold gold-text-gradient">15+ Yrs</span>
            <span class="block text-[11px] text-slate-300 uppercase tracking-wider mt-1">Advisory Integrity</span>
          </div>
        </div>
      </div>

      <!-- Hero Illustration -->
      <div class="lg:col-span-5 flex justify-center">
        <div class="relative w-full max-w-md aspect-square lg:aspect-auto">
          <div class="absolute inset-0 bg-gradient-to-tr from-amber-400 to-transparent opacity-10 rounded-3xl blur-2xl"></div>
          
          <div class="relative bg-[#022c22] rounded-2xl p-2.5 border border-white/10 shadow-2xl overflow-hidden gold-border-glow animate-float">
            <img 
              src="src/assets/images/images4.jpg" 
              alt="Apex Financial Visualization" 
              class="w-full h-full object-cover rounded-xl grayscale-20 contrast-125 hover:scale-102 transition duration-500"
              referrerpolicy="no-referrer"
            >
            <div class="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-lg flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              </div>
              <div>
                <span class="block text-xs font-semibold uppercase tracking-wider text-amber-400">Elite Client Shield</span>
                <span class="block text-[10px] text-slate-300">Fiduciary duty backed by institutional security</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- --- VALUE STATEMENT BAR --- -->
  <section class="bg-emerald-950 border-t border-emerald-900 py-6 text-white text-xs font-medium tracking-widest uppercase">
    <div class="max-w-7xl mx-auto px-6 flex flex-wrap gap-8 items-center justify-center md:justify-between text-center md:text-left text-slate-300">
      <span>COMPLETE FIDUCIARY DUTY</span>
      <span>UNALIGNED REVENUE-SHARING FREE</span>
      <span>PORTFOLIO ALIGNED RISK DESIGN</span>
    </div>
  </section>

  <!-- --- ADVISORY SERVICES SECTION --- -->
  <section id="services" class="py-24 max-w-7xl mx-auto px-6">
    <div class="text-center max-w-2xl mx-auto mb-16">
      <span class="text-emerald-800 text-xs font-bold uppercase tracking-widest block mb-3">Structured Capability Pillars</span>
      <h2 class="text-3xl sm:text-4xl font-serif font-bold text-emerald-950 tracking-tight">Our Areas of Financial Excellence</h2>
      <div class="w-16 h-1 bg-amber-400 mx-auto mt-4 rounded-full"></div>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition duration-300 flex flex-col h-full group">
        <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-6 group-hover:bg-emerald-900 group-hover:text-white transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
        </div>
        <h3 class="text-xl font-bold text-slate-800 mb-3 group-hover:text-emerald-900 transition">Wealth & Portfolio Design</h3>
        <p class="text-sm text-slate-500 leading-relaxed font-light mb-6 flex-grow">
          Bespoke asset allocation models focused on preservation, low correlation, and dynamic multi-generational expansion.
        </p>
      </div>

      <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition duration-300 flex flex-col h-full group">
        <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-6 group-hover:bg-emerald-900 group-hover:text-white transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <h3 class="text-xl font-bold text-slate-800 mb-3 group-hover:text-emerald-900 transition">Strategic Retirement Mapping</h3>
        <p class="text-sm text-slate-500 leading-relaxed font-light mb-6 flex-grow">
          Tailored cash-flow modeling protecting your passive distributions from market volatility, tax erosion, and lifestyle drag.
        </p>
      </div>

      <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition duration-300 flex flex-col h-full group">
        <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-6 group-hover:bg-emerald-900 group-hover:text-white transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"></path></svg>
        </div>
        <h3 class="text-xl font-bold text-slate-800 mb-3 group-hover:text-emerald-900 transition">Aggressive Tax Strategy</h3>
        <p class="text-sm text-slate-500 leading-relaxed font-light mb-6 flex-grow">
          Strategic structuring, asset location, trusts, and corporate entities alignment to maximize capital efficiency legally.
        </p>
      </div>

      <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition duration-300 flex flex-col h-full group">
        <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-6 group-hover:bg-emerald-900 group-hover:text-white transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"></path></svg>
        </div>
        <h3 class="text-xl font-bold text-slate-800 mb-3 group-hover:text-emerald-900 transition">Corporate Treasury Advisory</h3>
        <p class="text-sm text-slate-500 leading-relaxed font-light mb-6 flex-grow">
          Helping business owners optimize working capital reserves, debt restructuring, cash management, and merger preparations.
        </p>
      </div>
    </div>
  </section>

  <!-- --- INTERACTIVE TOOLS CONTAINER SECTION --- -->
  <section id="tools" class="py-20 bg-slate-50 border-y border-slate-200/50">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center max-w-2xl mx-auto mb-12">
        <span class="text-emerald-800 text-xs font-bold uppercase tracking-widest block mb-3">Complimentary Diagnostic suite</span>
        <h2 class="text-3xl sm:text-4xl font-serif font-bold text-emerald-950 tracking-tight">Financial Alignment & Growth Planning</h2>
      </div>

      <!-- Tab Buttons -->
      <div class="flex justify-center border-b border-slate-200 max-w-lg mx-auto mb-12">
        <button id="tab-calc" class="tab-btn active px-8 py-4 font-semibold text-sm transition focus:outline-none border-b-2 border-brand-mint text-brand-emerald">
          Wealth Growth Calculator
        </button>
        <button id="tab-quiz" class="tab-btn px-8 py-4 font-semibold text-sm transition focus:outline-none text-slate-500">
          Financial Health Assessment
        </button>
      </div>

      <!-- Content sections loaded dynamically... -->
      <!-- Refer to full HTML structure or script.js for logic details -->
    </div>
  </section>

  <!-- Link script.js -->
  <script src="script.js" defer></script>
</body>
</html>`;

export const STANDALONE_CSS = `/* Standalone Custom Styles for Financial Consulting Landing Page */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');

:root {
  --font-sans: 'Inter', sans-serif;
  --font-serif: 'Playfair Display', serif;
  
  --color-emerald: #064e3b;
  --color-mint: #10b981;
  --color-gold: #d4af37;
  --color-cream: #faf9f6;
  --color-charcoal: #1e293b;
}

body {
  font-family: var(--font-sans);
  background-color: var(--color-cream);
  color: var(--color-charcoal);
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

h1, h2, h3, h4, .font-serif {
  font-family: var(--font-serif);
}

.hero-gradient {
  background: linear-gradient(135deg, #022c22 0%, #064e3b 100%);
}

.gold-border-glow {
  box-shadow: 0 4px 20px -2px rgba(212, 175, 55, 0.15);
}

.gold-text-gradient {
  background: linear-gradient(135deg, #f59e0b 0%, #d4af37 50%, #b59023 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  background: #cbd5e1;
  border-radius: 9999px;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #10b981;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  transition: all 0.15s ease;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

html {
  scroll-behavior: smooth;
}`;

export const STANDALONE_JS = `/* Standalone JavaScript for Financial Consulting Landing Page */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu control
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Sliders and compound interest arithmetic
  const sliderInitial = document.getElementById('initial-investment');
  const sliderMonthly = document.getElementById('monthly-contribution');
  const sliderRate = document.getElementById('interest-rate');
  const sliderYears = document.getElementById('investment-years');

  function calculateWealth() {
    if (!sliderInitial) return;
    const P = parseFloat(sliderInitial.value);
    const PMT = parseFloat(sliderMonthly.value);
    const r = parseFloat(sliderRate.value) / 100;
    const t = parseFloat(sliderYears.value);
    const n = 12;

    const nt = n * t;
    const rateOverN = r / n;
    
    let compoundPrincipal = P * Math.pow(1 + rateOverN, nt);
    let accumulatedMonthly = PMT * ((Math.pow(1 + rateOverN, nt) - 1) / rateOverN);
    const totalPortfolio = compoundPrincipal + accumulatedMonthly;

    document.getElementById('result-total').textContent = new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD', maximumFractionDigits: 0
    }).format(totalPortfolio);
  }

  [sliderInitial, sliderMonthly, sliderRate, sliderYears].forEach(s => {
    if (s) s.addEventListener('input', calculateWealth);
  });
});`;

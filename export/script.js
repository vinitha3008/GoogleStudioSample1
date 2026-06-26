/* Standalone JavaScript for Financial Consulting Landing Page */

document.addEventListener('DOMContentLoaded', () => {
  // --- Navigation Controls ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Close mobile menu when links are clicked
  const mobileLinks = document.querySelectorAll('#mobile-menu a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.add('hidden');
    });
  });


  // --- Interactive Tabs (Calculator vs Quiz) ---
  const tabCalc = document.getElementById('tab-calc');
  const tabQuiz = document.getElementById('tab-quiz');
  const contentCalc = document.getElementById('content-calc');
  const contentQuiz = document.getElementById('content-quiz');

  if (tabCalc && tabQuiz && contentCalc && contentQuiz) {
    tabCalc.addEventListener('click', () => {
      tabCalc.classList.add('border-brand-mint', 'text-brand-emerald', 'border-b-2');
      tabCalc.classList.remove('text-slate-500');
      tabQuiz.classList.remove('border-brand-mint', 'text-brand-emerald', 'border-b-2');
      tabQuiz.classList.add('text-slate-500');

      contentCalc.classList.remove('hidden');
      contentQuiz.classList.add('hidden');
    });

    tabQuiz.addEventListener('click', () => {
      tabQuiz.classList.add('border-brand-mint', 'text-brand-emerald', 'border-b-2');
      tabQuiz.classList.remove('text-slate-500');
      tabCalc.classList.remove('border-brand-mint', 'text-brand-emerald', 'border-b-2');
      tabCalc.classList.add('text-slate-500');

      contentQuiz.classList.remove('hidden');
      contentCalc.classList.add('hidden');
    });
  }


  // --- Compound Interest & Wealth Calculator ---
  const sliderInitial = document.getElementById('initial-investment');
  const sliderMonthly = document.getElementById('monthly-contribution');
  const sliderRate = document.getElementById('interest-rate');
  const sliderYears = document.getElementById('investment-years');

  const valInitial = document.getElementById('val-initial');
  const valMonthly = document.getElementById('val-monthly');
  const valRate = document.getElementById('val-rate');
  const valYears = document.getElementById('val-years');

  const resultTotal = document.getElementById('result-total');
  const resultPrincipal = document.getElementById('result-principal');
  const resultInterest = document.getElementById('result-interest');
  const growthBarPrincipal = document.getElementById('growth-bar-principal');
  const growthBarInterest = document.getElementById('growth-bar-interest');

  function formatCurrency(num) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(num);
  }

  function calculateWealth() {
    if (!sliderInitial || !sliderMonthly || !sliderRate || !sliderYears) return;

    const P = parseFloat(sliderInitial.value);
    const PMT = parseFloat(sliderMonthly.value);
    const r = parseFloat(sliderRate.value) / 100;
    const t = parseFloat(sliderYears.value);
    const n = 12; // Compounded monthly

    // Update slider value labels
    if (valInitial) valInitial.textContent = formatCurrency(P);
    if (valMonthly) valMonthly.textContent = formatCurrency(PMT);
    if (valRate) valRate.textContent = `${sliderRate.value}%`;
    if (valYears) valYears.textContent = `${t} yrs`;

    // Formulas
    // Compound interest on principal: A_P = P * (1 + r/n)^(n*t)
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

    // Update summary labels
    if (resultTotal) resultTotal.textContent = formatCurrency(totalPortfolio);
    if (resultPrincipal) resultPrincipal.textContent = formatCurrency(totalInvested);
    if (resultInterest) resultInterest.textContent = formatCurrency(totalEarnings);

    // Update graphic bar ratios
    if (growthBarPrincipal && growthBarInterest) {
      const principalPercentage = totalPortfolio > 0 ? (totalInvested / totalPortfolio) * 100 : 50;
      const interestPercentage = totalPortfolio > 0 ? (totalEarnings / totalPortfolio) * 100 : 50;
      growthBarPrincipal.style.width = `${principalPercentage}%`;
      growthBarInterest.style.width = `${interestPercentage}%`;
    }
  }

  // Attach event listeners to sliders
  [sliderInitial, sliderMonthly, sliderRate, sliderYears].forEach(slider => {
    if (slider) {
      slider.addEventListener('input', calculateWealth);
    }
  });

  // Run initial calculation
  calculateWealth();


  // --- Financial Health Assessment Quiz ---
  const quizSteps = document.querySelectorAll('.quiz-step');
  const quizNextBtns = document.querySelectorAll('.quiz-next-btn');
  const quizBackBtns = document.querySelectorAll('.quiz-back-btn');
  const quizResultScreen = document.getElementById('quiz-result');
  const quizResetBtn = document.getElementById('quiz-reset-btn');

  let currentStep = 0;
  let quizScores = {};

  function updateQuizUI() {
    quizSteps.forEach((step, idx) => {
      if (idx === currentStep) {
        step.classList.remove('hidden');
      } else {
        step.classList.add('hidden');
      }
    });

    if (quizResultScreen) {
      if (currentStep === quizSteps.length) {
        quizResultScreen.classList.remove('hidden');
        showQuizResults();
      } else {
        quizResultScreen.classList.add('hidden');
      }
    }
  }

  // Handle radio option selections to auto-save scores
  document.querySelectorAll('.quiz-option').forEach(option => {
    option.addEventListener('change', (e) => {
      const qIdx = e.target.name.split('-')[1];
      const val = parseInt(e.target.value);
      quizScores[qIdx] = val;

      // Enable the "Next" button for this step
      const nextBtn = document.getElementById(`next-btn-${qIdx}`);
      if (nextBtn) {
        nextBtn.removeAttribute('disabled');
        nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
      }
    });
  });

  quizNextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentStep++;
      updateQuizUI();
    });
  });

  quizBackBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--;
        updateQuizUI();
      }
    });
  });

  if (quizResetBtn) {
    quizResetBtn.addEventListener('click', () => {
      currentStep = 0;
      quizScores = {};
      // Reset radio buttons
      document.querySelectorAll('.quiz-option').forEach(opt => opt.checked = false);
      // Disable next buttons initially
      quizNextBtns.forEach((btn, idx) => {
        if (idx < quizSteps.length - 1) {
          btn.setAttribute('disabled', 'true');
          btn.classList.add('opacity-50', 'cursor-not-allowed');
        }
      });
      updateQuizUI();
    });
  }

  function showQuizResults() {
    let totalScore = 0;
    let answeredCount = 0;
    
    Object.keys(quizScores).forEach(key => {
      totalScore += quizScores[key];
      answeredCount++;
    });

    const maxScore = answeredCount * 20 || 100;
    const scorePercentage = Math.round((totalScore / maxScore) * 100);

    const scorePctLabel = document.getElementById('quiz-score-pct');
    const scoreGauge = document.getElementById('quiz-gauge-fill');
    const scoreLabel = document.getElementById('quiz-tier-label');
    const adviceText = document.getElementById('quiz-advice');

    if (scorePctLabel) scorePctLabel.textContent = `${scorePercentage}%`;
    if (scoreGauge) scoreGauge.style.width = `${scorePercentage}%`;

    let tier = '';
    let advice = '';

    if (scorePercentage >= 80) {
      tier = 'Wealth Builder (Excellent)';
      scoreGauge.style.backgroundColor = '#10b981'; // Mint Green
      advice = 'Your financial habits are outstanding! You have clear structures in place. Focus on tactical tax minimization strategies, aggressive asset allocation, and building diversified alternative asset classes.';
    } else if (scorePercentage >= 50) {
      tier = 'Steady Growth (Moderate)';
      scoreGauge.style.backgroundColor = '#f59e0b'; // Amber
      advice = 'You are on the right track, but have some key vulnerabilities. It is highly recommended to build a firmer 6-month safety reserve, eliminate any non-mortgage high-interest debts, and increase your monthly savings rate to 15%+.';
    } else {
      tier = 'Foundation Phase (Needs Attention)';
      scoreGauge.style.backgroundColor = '#ef4444'; // Red
      advice = 'Your current setup leaves you exposed to financial volatility. Prioritize setting up an automated micro-savings goal ($100/mo), create a strict expense budget, and schedule a consultation with us to design a recovery strategy.';
    }

    if (scoreLabel) scoreLabel.textContent = tier;
    if (adviceText) adviceText.textContent = advice;
  }


  // --- Consultation Booking System ---
  const bookingForm = document.getElementById('consultation-form');
  const bookingSuccess = document.getElementById('booking-success-message');
  const bookingHistoryContainer = document.getElementById('booking-history-container');
  const historyList = document.getElementById('booking-history-list');

  function renderBookingHistory() {
    if (!historyList) return;
    
    const bookings = JSON.parse(localStorage.getItem('apex_consult_bookings') || '[]');
    
    if (bookings.length === 0) {
      if (bookingHistoryContainer) bookingHistoryContainer.classList.add('hidden');
      return;
    }

    if (bookingHistoryContainer) bookingHistoryContainer.classList.remove('hidden');
    historyList.innerHTML = '';

    bookings.forEach((booking, idx) => {
      const li = document.createElement('div');
      li.className = 'bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in';
      
      li.innerHTML = `
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-100">${booking.service}</span>
            <span class="text-xs text-slate-400">#${1000 + idx}</span>
          </div>
          <h4 class="font-semibold text-slate-800 mt-1">${booking.name}</h4>
          <p class="text-xs text-slate-500 mt-0.5">Scheduled for: <strong class="text-slate-700">${booking.date} at ${booking.time}</strong></p>
        </div>
        <div class="flex items-center gap-3">
          <span class="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
            <span class="h-2 w-2 rounded-full bg-emerald-500"></span> Confirmed
          </span>
          <button data-index="${idx}" class="text-xs text-rose-500 hover:text-rose-700 font-medium px-2 py-1 rounded hover:bg-rose-50/50 transition cancel-booking-btn">Cancel</button>
        </div>
      `;
      historyList.appendChild(li);
    });

    // Attach cancellation event listeners
    document.querySelectorAll('.cancel-booking-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'));
        cancelBooking(index);
      });
    });
  }

  function cancelBooking(index) {
    let bookings = JSON.parse(localStorage.getItem('apex_consult_bookings') || '[]');
    bookings.splice(index, 1);
    localStorage.setItem('apex_consult_bookings', JSON.stringify(bookings));
    renderBookingHistory();
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('book-name').value;
      const email = document.getElementById('book-email').value;
      const service = document.getElementById('book-service').value;
      const date = document.getElementById('book-date').value;
      const time = document.getElementById('book-time').value;
      const notes = document.getElementById('book-notes').value;

      if (!name || !email || !service || !date || !time) {
        return; // Basic safeguard
      }

      const newBooking = {
        name,
        email,
        service,
        date,
        time,
        notes,
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      const bookings = JSON.parse(localStorage.getItem('apex_consult_bookings') || '[]');
      bookings.push(newBooking);
      localStorage.setItem('apex_consult_bookings', JSON.stringify(bookings));

      // Show success container
      if (bookingSuccess) {
        bookingSuccess.classList.remove('hidden');
        setTimeout(() => {
          bookingSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }

      // Reset form fields
      bookingForm.reset();

      // Re-render list
      renderBookingHistory();
    });
  }

  // Dismiss success state
  const dismissSuccessBtn = document.getElementById('dismiss-success');
  if (dismissSuccessBtn && bookingSuccess) {
    dismissSuccessBtn.addEventListener('click', () => {
      bookingSuccess.classList.add('hidden');
    });
  }

  // Render on initial load
  renderBookingHistory();
});

// AL vs OM Comparison App JavaScript

// Application data
const appData = {
  categories: [
    {
      name: "Längd",
      icon: "📏",
      winner: "AL",
      alScore: 95,
      omScore: 45,
      description: "AL tornar upp sig majestätiskt medan OM får kolla uppåt"
    },
    {
      name: "Ståtlighet",
      icon: "👑",
      winner: "AL",
      alScore: 98,
      omScore: 25,
      description: "AL har en naturlig elegans som får andra att stirra i beundran"
    },
    {
      name: "Coolhet",
      icon: "😎",
      winner: "AL",
      alScore: 100,
      omScore: 15,
      description: "AL är definitionen av cool - OM... ja, inte så mycket"
    },
    {
      name: "Intelligens",
      icon: "🧠",
      winner: "AL",
      alScore: 97,
      omScore: 30,
      description: "AL:s intellekt är skarp som en rakblad, OM:s... inte så mycket"
    },
    {
      name: "Utrustning",
      icon: "🔧",
      winner: "AL",
      alScore: 92,
      omScore: 35,
      description: "AL har de bästa verktygen för jobbet, OM har... vad man nu har"
    },
    {
      name: "Rikedom",
      icon: "💰",
      winner: "AL",
      alScore: 94,
      omScore: 20,
      description: "AL simmar i rikedom, OM... simmar inte alls"
    },
    {
      name: "Hastighet",
      icon: "⚡",
      winner: "AL",
      alScore: 96,
      omScore: 40,
      description: "AL är blixtsnabb, OM är mer som en trög snigel"
    },
    {
      name: "Allmän Överlägsenhet",
      icon: "🏆",
      winner: "AL",
      alScore: 99,
      omScore: 10,
      description: "I alla avseenden är AL helt enkelt bäst på allt"
    },
    {
      name: "Att vara sämst",
      icon: "🥇",
      winner: "OM",
      alScore: 5,
      omScore: 100,
      description: "Äntligen något OM vinner! Grattis till att vara absolut sämst!"
    }
  ]
};

// DOM elements
let comparisonsGrid;
let celebrationBtn;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  comparisonsGrid = document.getElementById('comparisons-grid');
  celebrationBtn = document.getElementById('celebration-btn');
  
  initializeApp();
});

function initializeApp() {
  renderComparisons();
  setupEventListeners();
  animateOnScroll();
}

function renderComparisons() {
  if (!comparisonsGrid) return;
  
  comparisonsGrid.innerHTML = '';
  
  appData.categories.forEach((category, index) => {
    const categoryCard = createComparisonCard(category);
    comparisonsGrid.appendChild(categoryCard);
    
    // Add staggered animation
    setTimeout(() => {
      categoryCard.classList.add('animate-in');
    }, index * 100);
  });
}

function createComparisonCard(category) {
  const card = document.createElement('div');
  card.className = `comparison-card ${category.winner === 'AL' ? 'comparison-card--al-wins' : 'comparison-card--om-wins'}`;
  
  const winnerText = category.winner === 'AL' ? '🏆 AL Vinner!' : '🏆 OM Vinner!';
  
  card.innerHTML = `
    <div class="comparison-card__header">
      <span class="comparison-card__icon">${category.icon}</span>
      <h3 class="comparison-card__title">${category.name}</h3>
    </div>
    <div class="comparison-card__winner">${winnerText}</div>
    <div class="comparison-card__scores">
      <div class="score-bar score-bar--al">
        <div class="score-bar__label">AL</div>
        <div class="score-bar__fill" data-score="${category.alScore}">${category.alScore}</div>
      </div>
      <div class="score-bar score-bar--om">
        <div class="score-bar__label">OM</div>
        <div class="score-bar__fill" data-score="${category.omScore}">${category.omScore}</div>
      </div>
    </div>
    <p class="comparison-card__description">${category.description}</p>
  `;
  
  return card;
}

function setupEventListeners() {
  // Celebration button
  if (celebrationBtn) {
    celebrationBtn.addEventListener('click', handleCelebration);
  }
  
  // Comparison card interactions
  document.addEventListener('click', function(e) {
    const card = e.target.closest('.comparison-card');
    if (card) {
      handleCardClick(card);
    }
  });
  
  // Hover effects for score bars
  document.addEventListener('mouseover', function(e) {
    const scoreBar = e.target.closest('.score-bar');
    if (scoreBar) {
      animateScoreBar(scoreBar);
    }
  });
}

function handleCardClick(card) {
  // Add pulse animation
  card.classList.add('pulse');
  
  // Remove pulse after animation
  setTimeout(() => {
    card.classList.remove('pulse');
  }, 2000);
  
  // Add some interactive feedback
  const winner = card.querySelector('.comparison-card__winner');
  if (winner) {
    winner.style.transform = 'scale(1.1)';
    setTimeout(() => {
      winner.style.transform = 'scale(1)';
    }, 300);
  }
}

function animateScoreBar(scoreBar) {
  const fill = scoreBar.querySelector('.score-bar__fill');
  const score = fill.getAttribute('data-score');
  
  // Reset and animate the width
  fill.style.width = '0%';
  setTimeout(() => {
    fill.style.width = score + '%';
  }, 100);
}

function handleCelebration() {
  // Create celebration effect
  createConfetti();
  
  // Change button text temporarily
  const originalText = celebrationBtn.textContent;
  celebrationBtn.textContent = '🎉 AL är Bäst! 🎉';
  celebrationBtn.style.background = 'linear-gradient(135deg, #4CAF50, #2E7D32)';
  celebrationBtn.style.color = 'white';
  
  // Reset button after celebration
  setTimeout(() => {
    celebrationBtn.textContent = originalText;
    celebrationBtn.style.background = 'linear-gradient(135deg, #FFD700, #FFA000)';
    celebrationBtn.style.color = '#333';
  }, 3000);
}

function createConfetti() {
  const confettiCount = 50;
  const colors = ['#FFD700', '#4CAF50', '#2E7D32', '#FFA000', '#FF6B6B'];
  
  for (let i = 0; i < confettiCount; i++) {
    createConfettiPiece(colors[Math.floor(Math.random() * colors.length)]);
  }
}

function createConfettiPiece(color) {
  const confetti = document.createElement('div');
  confetti.style.position = 'fixed';
  confetti.style.width = '10px';
  confetti.style.height = '10px';
  confetti.style.backgroundColor = color;
  confetti.style.left = Math.random() * 100 + 'vw';
  confetti.style.top = '-10px';
  confetti.style.zIndex = '9999';
  confetti.style.borderRadius = '50%';
  confetti.style.pointerEvents = 'none';
  
  document.body.appendChild(confetti);
  
  // Animate the confetti falling
  const fallDuration = Math.random() * 3 + 2; // 2-5 seconds
  const rotation = Math.random() * 360;
  
  confetti.animate([
    { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
    { transform: `translateY(100vh) rotate(${rotation}deg)`, opacity: 0 }
  ], {
    duration: fallDuration * 1000,
    easing: 'ease-in'
  });
  
  // Remove confetti after animation
  setTimeout(() => {
    if (confetti.parentNode) {
      confetti.parentNode.removeChild(confetti);
    }
  }, fallDuration * 1000);
}

function animateOnScroll() {
  // Initialize score bars when they come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const scoreBars = entry.target.querySelectorAll('.score-bar');
        scoreBars.forEach(bar => {
          setTimeout(() => {
            animateScoreBar(bar);
          }, 200);
        });
      }
    });
  }, { threshold: 0.5 });
  
  // Observe all comparison cards
  document.querySelectorAll('.comparison-card').forEach(card => {
    observer.observe(card);
  });
}

// Add some extra interactive features
document.addEventListener('DOMContentLoaded', function() {
  // Add hover effects to profile cards
  const profileCards = document.querySelectorAll('.profile-card');
  profileCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Add click effect to VS divider
  const vsDivider = document.querySelector('.vs-divider');
  if (vsDivider) {
    vsDivider.addEventListener('click', function() {
      this.style.transform = 'rotate(360deg) scale(1.2)';
      setTimeout(() => {
        this.style.transform = 'rotate(0deg) scale(1)';
      }, 500);
    });
  }
  
  // Add dynamic text effects
  const headerTitle = document.querySelector('.header__title');
  if (headerTitle) {
    headerTitle.addEventListener('click', function() {
      this.style.color = '#FFD700';
      this.style.textShadow = '2px 2px 8px rgba(255, 215, 0, 0.5)';
      setTimeout(() => {
        this.style.color = 'white';
        this.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
      }, 1000);
    });
  }
});
// Smooth scroll for internal anchor links
document.addEventListener('click', function (e) {
  const target = e.target.closest('a[href^="#"]');
  if (!target) return;
  const href = target.getAttribute('href');
  if (!href || href === '#' || href.length < 2) return;
  const el = document.querySelector(href);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// CTA: ask mom button
document.addEventListener('DOMContentLoaded', function () {
  const askBtn = document.querySelector('.btn--ask');
  if (askBtn) {
    askBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.location.href = './contactus.html';
    });
  }

  // LinkedIn social link
  const linkedinLink = document.querySelector('.socials__item[href*="linkedin"]');
  if (linkedinLink) {
    linkedinLink.addEventListener('click', function (e) {
      e.preventDefault();
      window.open('https://www.linkedin.com/company/mompharmacy/', '_blank');
    });
  }
});

function addBotMsg(text){
  const m = document.createElement('div');
  m.className = 'chat__msg chat__msg--bot';
  m.textContent = text;
  document.getElementById('chatMessages').appendChild(m);
}
function addUserMsg(text){
  const m = document.createElement('div');
  m.className = 'chat__msg chat__msg--user';
  m.textContent = text;
  document.getElementById('chatMessages').appendChild(m);
}

document.getElementById('chatForm')?.addEventListener('submit', function(e){
  e.preventDefault();
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  addUserMsg(text);
  input.value = '';
  setTimeout(()=>{
    // Simple scripted responses referencing site flows
    if (/prescription|upload/i.test(text)) addBotMsg('You can order via prescription here: Prescription page.');
    else if (/track|order/i.test(text)) addBotMsg('You can track your order here: Tracking page.');
    else if (/download|app/i.test(text)) addBotMsg('Download the MOM Pharmacy app from Google Play on our Download page.');
    else addBotMsg('Thanks! Our team will get back to you shortly. Meanwhile, you can browse medicines via Search.');
    const box = document.getElementById('chatMessages'); box.scrollTop = box.scrollHeight;
  }, 400);
});

// Language dropdown toggle
document.addEventListener('click', function(e){
  const toggle = e.target.closest('#langToggle');
  const dropdown = document.getElementById('langDropdown');
  if (toggle) {
    e.preventDefault();
    dropdown?.classList.toggle('open');
    return;
  }
  if (!e.target.closest('#langDropdown')) {
    dropdown?.classList.remove('open');
  }
});

// FAQ toggle buttons
document.addEventListener('click', function (e) {
  const btn = e.target.closest('.faq__toggle');
  if (!btn) return;
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!expanded));
  const item = btn.closest('.faq__item');
  if (item){
    const answer = item.nextElementSibling;
    if (answer && answer.classList.contains('faq__answer')){
      answer.classList.toggle('open', !expanded);
    }
  }
});

// How it works button actions
document.addEventListener('click', function (e) {
  const btn = e.target.closest('.how__btn');
  if (!btn) return;
  const action = btn.getAttribute('data-action');
  switch (action) {
    case 'search':
      {
        const modal = document.getElementById('searchModal');
        const input = document.getElementById('searchInput');
        if (modal) {
          modal.setAttribute('aria-hidden', 'false');
          setTimeout(() => input && input.focus(), 0);
        }
      }
      break;
    case 'upload':
      {
        const fileInput = document.getElementById('prescriptionUpload');
        if (fileInput) {
          fileInput.click();
          fileInput.onchange = () => {
            if (fileInput.files && fileInput.files.length > 0) {
              alert('File selected: ' + fileInput.files[0].name);
            }
          };
        }
      }
      break;
    case 'confirm':
      {
        const item = document.getElementById('orderName')?.textContent || '';
        const qty = document.getElementById('orderQty')?.value || '1';
        const url = './confirm.html' + (item ? ('?item=' + encodeURIComponent(item) + '&qty=' + encodeURIComponent(qty)) : '');
        window.location.href = url;
      }
      break;
    case 'receive':
      window.location.href = './track.html';
      break;
    default:
      break;
  }
});

// Modal close actions
document.addEventListener('click', function (e) {
  if (e.target.matches('[data-modal-close]')) {
    const modal = document.getElementById('searchModal');
    modal && modal.setAttribute('aria-hidden', 'true');
  }
});

// Modal submit
document.getElementById('searchForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const q = document.getElementById('searchInput').value.trim();
  if (!q) return;
  // Redirect to results page with the query
  const modal = document.getElementById('searchModal');
  modal && modal.setAttribute('aria-hidden', 'true');
  window.location.href = './results.html?q=' + encodeURIComponent(q);
});

// Confirm submit
document.getElementById('confirmForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const payload = {
    item: document.getElementById('confirmItem').value.trim(),
    qty: document.getElementById('confirmQty').value,
    phone: document.getElementById('confirmPhone').value.trim(),
    address: document.getElementById('confirmAddress').value.trim(),
  };
  if (!payload.item || !payload.phone || !payload.address) return;
  alert('Order confirmed for ' + payload.item + ' x ' + payload.qty + '\nPhone: ' + payload.phone + '\nAddress: ' + payload.address);
  document.getElementById('confirmModal')?.setAttribute('aria-hidden', 'true');
});

// Mock data and renderers
const MEDICINES = [
  { name: 'Paracetamol 500mg', desc: 'Pain reliever and fever reducer.' },
  { name: 'Dolo 650', desc: 'Acetaminophen tablet for fever and pain.' },
  { name: 'Crocin Advance', desc: 'Paracetamol brand for pain and fever.' },
  { name: 'Amoxicillin 250mg', desc: 'Antibiotic for bacterial infections.' },
  { name: 'Amoxyclav 625', desc: 'Amoxicillin + Clavulanic acid.' },
  { name: 'Azithromycin 500mg', desc: 'Antibiotic for infections.' },
  { name: 'Cetirizine', desc: 'Antihistamine for allergies.' },
  { name: 'Allegra', desc: 'Fexofenadine antihistamine.' },
  { name: 'Ibuprofen 200mg', desc: 'NSAID pain reliever.' },
  { name: 'Diclofenac Gel', desc: 'Topical pain relief gel.' },
  { name: 'Omeprazole 20mg', desc: 'Reduces stomach acid.' },
  { name: 'Pantoprazole 40mg', desc: 'Proton pump inhibitor.' },
  { name: 'Metformin 500mg', desc: 'Type 2 diabetes control.' },
  { name: 'Glimipride 1mg', desc: 'Antidiabetic medication.' },
  { name: 'ORS Powder', desc: 'Oral rehydration salts.' },
  { name: 'Glucon-D', desc: 'Instant energy drink mix.' },
  { name: 'Vitamin C 1000mg', desc: 'Immune support supplement.' },
  { name: 'Zincovit', desc: 'Multivitamin and multimineral.' },
];

function filterMedicines(query) {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return MEDICINES; // show all/popular if query too short
  return MEDICINES.filter(m =>
    m.name.toLowerCase().includes(q) ||
    (m.desc && m.desc.toLowerCase().includes(q))
  );
}

function renderResults(items, query) {
  const list = document.getElementById('resultsList');
  const title = document.getElementById('resultsTitle');
  if (!list || !title) return;
  list.innerHTML = '';
  title.hidden = false;
  if (items.length === 0) {
    const popular = MEDICINES.slice(0, 6);
    list.innerHTML = '<div class="resultCard"><div class="resultCard__name">No results</div><p class="resultCard__desc">No medicines found for "' + escapeHtml(query) + '". Showing popular instead:</p></div>';
    popular.forEach(item => {
      const card = document.createElement('div');
      card.className = 'resultCard';
      card.innerHTML = '<div class="resultCard__name">' + escapeHtml(item.name) + '</div>' +
                       '<p class="resultCard__desc">' + escapeHtml(item.desc) + '</p>';
      list.appendChild(card);
    });
    return;
  }
  items.forEach(item => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'resultCard resultCard--button';
    btn.setAttribute('data-name', item.name);
    btn.innerHTML = '<div class="resultCard__name">' + escapeHtml(item.name) + '</div>' +
                    '<p class="resultCard__desc">' + escapeHtml(item.desc) + '</p>';
    list.appendChild(btn);
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Handle clicks on result cards
document.addEventListener('click', function(e) {
  const cardBtn = e.target.closest('.resultCard--button');
  if (!cardBtn) return;
  const name = cardBtn.getAttribute('data-name') || 'item';
  // Redirect to details page for ordering
  window.location.href = './product.html?item=' + encodeURIComponent(name);
});

// Simple i18n: language selector and dictionary
const I18N = {
  en: {
    'nav.welcome': 'welcome',
    'nav.about': 'about us',
    'nav.team': 'our team',
    'nav.careers': 'careers',
    'nav.investors': 'for investors',
    'nav.contact': 'contact us',
    'nav.languages': 'Languages',
    'hero.title': 'We Deliver the Medicine and \nWe Care the Patient like  Mother.',
    'hero.orderPrescription': 'order via prescription',
    'hero.downloadApp': 'download our app',
    'how.title': 'How it works',
    'how.search': 'Search it',
    'how.upload': 'Upload here',
    'how.confirm': 'Cofirm it',
    'how.receive': 'Receive it',
    'faq.title': 'frequently asked questions?',
    'faq.q1': 'what is mom pharmacy?',
    'faq.q2': 'will you really deliver medicines on 10minutes ?',
    'faq.q3': 'what if delivery is delayed ?',
    'faq.q4': 'how can we place the order ?',
    'faq.q5': 'what areas do we serve ?',
    'faq.q6': 'how can you contact us ?',
  },
  hi: {
    'nav.welcome': 'स्वागत',
    'nav.about': 'हमारे बारे में',
    'nav.team': 'हमारी टीम',
    'nav.careers': 'करियर',
    'nav.investors': 'निवेशकों के लिए',
    'nav.contact': 'संपर्क करें',
    'nav.languages': 'भाषाएँ',
    'hero.title': 'हम दवा पहुंचाते हैं\nऔर माँ जैसी देखभाल करते हैं।',
    'hero.orderPrescription': 'प्रिस्क्रिप्शन से ऑर्डर करें',
    'hero.downloadApp': 'हमारा ऐप डाउनलोड करें',
    'how.title': 'यह कैसे काम करता है',
    'how.search': 'खोजें',
    'how.upload': 'यहाँ अपलोड करें',
    'how.confirm': 'पुष्टि करें',
    'how.receive': 'प्राप्त करें',
    'faq.title': 'सामान्य प्रश्न',
    'faq.q1': 'मॉम फार्मेसी क्या है?',
    'faq.q2': 'क्या आप सच में 10 मिनट में डिलीवरी करेंगे?',
    'faq.q3': 'यदि डिलीवरी में देरी हो तो?',
    'faq.q4': 'ऑर्डर कैसे करें?',
    'faq.q5': 'हम किन क्षेत्रों में सेवा देते हैं?',
    'faq.q6': 'हमसे कैसे संपर्क करें?',
  },
  te: {
    'nav.welcome': 'స్వాగతం',
    'nav.about': 'మా గురించి',
    'nav.team': 'మా బృందం',
    'nav.careers': 'ఉద్యోగాలు',
    'nav.investors': 'పెట్టుబడిదారులకు',
    'nav.contact': 'మమ్మల్ని సంప్రదించండి',
    'nav.languages': 'భాషలు',
    'hero.title': 'మేము మందులు అందిస్తాము\nతల్లి వంటి శ్రద్ధతో జాగ్రత్త పడతాము.',
    'hero.orderPrescription': 'ప్రెస్‌క్రిప్షన్ ద్వారా ఆర్డర్',
    'hero.downloadApp': 'మా యాప్ డౌన్‌లోడ్ చేయండి',
    'how.title': 'ఇది ఎలా పనిచేస్తుంది',
    'how.search': 'శోధించండి',
    'how.upload': 'ఇక్కడ అప్లోడ్ చేయండి',
    'how.confirm': 'దృవీకరించండి',
    'how.receive': 'స్వీకరించండి',
    'faq.title': 'తరచుగా అడిగే ప్రశ్నలు',
    'faq.q1': 'మామ్ ఫార్మసీ అంటే ఏమిటి?',
    'faq.q2': 'మీరు నిజంగా 10 నిమిషాల్లో డెలివరీ చేస్తారా?',
    'faq.q3': 'డెలివరీ ఆలస్యం అయితే?',
    'faq.q4': 'ఆర్డర్ ఎలా చేయాలి?',
    'faq.q5': 'మేము ఏ ప్రాంతాల్లో సేవలందిస్తాము?',
    'faq.q6': 'మమ్మల్ని ఎలా సంప్రదించాలి?',
  }
};

function applyLang(lang){
  const dict = I18N[lang] || I18N.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      if (el.tagName === 'H1' && dict[key].includes('\n')) {
        el.innerHTML = dict[key].replace('\n','<br/>');
      } else {
        el.textContent = dict[key];
      }
    }
  });
  localStorage.setItem('lang', lang);
}

// Open language chooser
document.getElementById('langButton')?.addEventListener('click', function(e){
  e.preventDefault();
  const lang = prompt('Choose language code (e.g., en, hi, te). Unsupported codes will default to English.', localStorage.getItem('lang')||'en');
  if (!lang) return;
  applyLang(lang);
});

// On load, apply saved language
document.addEventListener('DOMContentLoaded', function(){
  const saved = localStorage.getItem('lang');
  if (saved && I18N[saved]) applyLang(saved);
});

// Persist Google Translate selection across pages
function setTransCookie(lang){
  try {
    var value = '/auto/' + lang;
    document.cookie = 'googtrans=' + value + ';path=/';
    document.cookie = 'googtrans=' + value + ';domain=' + window.location.hostname + ';path=/';
  } catch(_) {}
}

function applySavedGoogleLang(){
  var lang = localStorage.getItem('gt_lang');
  if (lang) setTransCookie(lang);
}

// Store selection when user chooses a language from Google widget
function bindGoogleLangWatcher(){
  var tries = 0;
  var iv = setInterval(function(){
    var combo = document.querySelector('.goog-te-combo');
    tries++;
    if (combo){
      combo.addEventListener('change', function(){
        var lang = combo.value;
        if (lang){ localStorage.setItem('gt_lang', lang); setTransCookie(lang); }
      });
      clearInterval(iv);
    }
    if (tries > 40) clearInterval(iv);
  }, 250);
}

document.addEventListener('DOMContentLoaded', function(){
  applySavedGoogleLang();
  bindGoogleLangWatcher();
});

// Place order handler
document.getElementById('orderNow')?.addEventListener('click', function() {
  const name = document.getElementById('orderName')?.textContent || 'item';
  const qty = document.getElementById('orderQty')?.value || '1';
  alert('Order placed: ' + name + ' x ' + qty + '. Our team will contact you.');
});



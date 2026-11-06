import { 
  CROPS, 
  PESTS, 
  SUGGESTIONS, 
  matchLocalIntent 
} from './knowledge-data.js'

// ==========================================================================
// Application State
// ==========================================================================
const state = {
  messages: [],
  selectedCropId: 'maize',
  selectedPestId: 'fall-armyworm',
  autoSpeech: false,
  isRecording: false,
  recognition: null,
}

// ==========================================================================
// DOM Elements
// ==========================================================================
const chatMessagesEl = document.getElementById('chatMessages')
const chatFormEl = document.getElementById('chatForm')
const messageInputEl = document.getElementById('messageInput')
const promptTickerEl = document.getElementById('promptTicker')
const btnClearChatEl = document.getElementById('btnClearChat')
const btnToggleSpeechEl = document.getElementById('btnToggleSpeech')
const speechBadgeEl = document.getElementById('speechBadge')
const btnVoiceInputEl = document.getElementById('btnVoiceInput')
const toastContainerEl = document.getElementById('toastContainer')

// Hub Elements
const cropSelectorBarEl = document.getElementById('cropSelectorBar')
const cropDetailCardEl = document.getElementById('cropDetailCard')
const pestSelectorBarEl = document.getElementById('pestSelectorBar')
const pestDetailCardEl = document.getElementById('pestDetailCard')
const hubTabs = document.querySelectorAll('.hub-tab')
const tabPanes = document.querySelectorAll('.tab-pane')

// Mobile Switcher Elements
const tabMobileChat = document.getElementById('tabMobileChat')
const tabMobileHub = document.getElementById('tabMobileHub')
const chatColumn = document.getElementById('chatColumn')
const hubColumn = document.getElementById('hubColumn')

// ==========================================================================
// Markdown Helper
// ==========================================================================
function parseMarkdown(md) {
  if (!md) return ''
  let html = md
    // Escaping basic HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    
    // Headings
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h3>$1</h3>')
    .replace(/^# (.*$)/gim, '<h3>$1</h3>')

    // Bold & Italics
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<em>$1</em>')

    // Bullet Lists (• or - or *)
    .replace(/^[•\-\*]\s+(.*)$/gim, '<li>$1</li>')

    // Numbered lists
    .replace(/^(\d+)\.\s+(.*)$/gim, '<li><strong>$1.</strong> $2</li>')

    // Paragraph line breaks
    .replace(/\n\n+/g, '</p><p>')
    .replace(/\n/g, '<br>')

  // Wrap lists
  html = html.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>')
  return `<p>${html}</p>`
}

// ==========================================================================
// Toast Notification
// ==========================================================================
function showToast(message, duration = 3000) {
  const toast = document.createElement('div')
  toast.className = 'toast'
  toast.textContent = message
  toastContainerEl.appendChild(toast)

  setTimeout(() => {
    toast.style.opacity = '0'
    toast.style.transform = 'translateY(10px)'
    setTimeout(() => toast.remove(), 250)
  }, duration)
}

// ==========================================================================
// Speech Synthesis (Audio Read Aloud)
// ==========================================================================
function speakText(rawText) {
  if (!('speechSynthesis' in window)) {
    showToast('Speech synthesis not supported in this browser.')
    return
  }
  window.speechSynthesis.cancel()
  const cleanText = rawText.replace(/[#*•_`]/g, '').trim()
  const utterance = new SpeechSynthesisUtterance(cleanText)
  utterance.rate = 1.0
  utterance.pitch = 1.0
  window.speechSynthesis.speak(utterance)
}

// ==========================================================================
// Speech Recognition (Microphone Voice Input)
// ==========================================================================
function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!SpeechRecognition) {
    btnVoiceInputEl.style.display = 'none'
    return
  }

  state.recognition = new SpeechRecognition()
  state.recognition.continuous = false
  state.recognition.interimResults = false
  state.recognition.lang = 'en-NG' // Nigerian English

  state.recognition.onstart = () => {
    state.isRecording = true
    btnVoiceInputEl.classList.add('recording')
    showToast('🎙️ Listening... Speak your farming question')
  }

  state.recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript
    messageInputEl.value = transcript
    handleUserSubmit(transcript)
  }

  state.recognition.onerror = (e) => {
    console.warn('Voice recognition error:', e)
    showToast('Could not capture voice. Please type your question.')
    state.isRecording = false
    btnVoiceInputEl.classList.remove('recording')
  }

  state.recognition.onend = () => {
    state.isRecording = false
    btnVoiceInputEl.classList.remove('recording')
  }
}

// ==========================================================================
// Render Chat UI
// ==========================================================================
function renderChat() {
  chatMessagesEl.innerHTML = ''

  // Always show welcome hero card first
  const welcomeCard = document.createElement('div')
  welcomeCard.className = 'welcome-hero'
  welcomeCard.innerHTML = `
    <div class="welcome-badge-row">
      <span class="pill-badge">🌱 AgriBot v2.0</span>
      <span class="pill-badge">🌾 6 Major Crops</span>
      <span class="pill-badge">🐛 Pest & Disease Diagnostics</span>
      <span class="pill-badge">🇳🇬 Regional Calendars</span>
    </div>
    <h2 class="welcome-title">Welcome, Farmer!</h2>
    <p class="welcome-desc">
      I'm your AI-powered farming advisor for Nigerian agriculture. Ask me anything about crop spacing, fertilizer timing (NPK & Urea), pest management, or harvest drying.
    </p>
    <div class="sample-grid">
      <button class="sample-btn" data-query="When should I plant maize in Kano?">🌽 When should I plant maize in Kano?</button>
      <button class="sample-btn" data-query="How do I control fall armyworm?">🐛 How do I control fall armyworm?</button>
      <button class="sample-btn" data-query="What fertilizer is good for cassava?">🍠 What fertilizer is good for cassava?</button>
      <button class="sample-btn" data-query="Best practices for tomato in dry season?">🍅 Tomato dry season practices</button>
      <button class="sample-btn" data-query="How to store yam after harvest?">🥔 How to store yam after harvest?</button>
      <button class="sample-btn" data-query="Soil tips for sandy land">🏜️ Soil tips for sandy land</button>
    </div>
  `
  chatMessagesEl.appendChild(welcomeCard)

  // Attach sample button listeners
  welcomeCard.querySelectorAll('.sample-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      handleUserSubmit(btn.dataset.query)
    })
  })

  // Render conversation history
  state.messages.forEach((msg, idx) => {
    appendMessageElement(msg, idx)
  })

  chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight
}

function appendMessageElement(msg, idx) {
  const row = document.createElement('div')
  row.className = `message-row message-${msg.role}`

  const avatar = document.createElement('div')
  avatar.className = `avatar avatar-${msg.role}`
  avatar.textContent = msg.role === 'assistant' ? '🌱' : '👨🏾‍🌾'

  const bubble = document.createElement('div')
  bubble.className = `bubble bubble-${msg.role}`
  bubble.innerHTML = parseMarkdown(msg.content)

  // Add metadata & actions for assistant messages
  if (msg.role === 'assistant') {
    const meta = document.createElement('div')
    meta.className = 'bubble-meta'
    meta.innerHTML = `
      <span>${msg.source === 'ai-gateway' ? '✨ Netlify AI Engine' : '🌾 Verified Farming Knowledge'}</span>
      <div class="bubble-actions">
        <button class="bubble-btn btn-copy" title="Copy response">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          Copy
        </button>
        <button class="bubble-btn btn-speak" title="Read aloud">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
          Listen
        </button>
      </div>
    `

    meta.querySelector('.btn-copy').addEventListener('click', () => {
      navigator.clipboard.writeText(msg.content)
      showToast('Copied advice to clipboard!')
    })

    meta.querySelector('.btn-speak').addEventListener('click', () => {
      speakText(msg.content)
    })

    bubble.appendChild(meta)

    // Follow-up suggestion pills
    if (msg.followUps && msg.followUps.length > 0) {
      const followUpWrap = document.createElement('div')
      followUpWrap.className = 'followup-wrap'
      msg.followUps.forEach((query) => {
        const fBtn = document.createElement('button')
        fBtn.className = 'followup-btn'
        fBtn.textContent = query
        fBtn.addEventListener('click', () => handleUserSubmit(query))
        followUpWrap.appendChild(fBtn)
      })
      bubble.appendChild(followUpWrap)
    }
  }

  row.appendChild(avatar)
  row.appendChild(bubble)
  chatMessagesEl.appendChild(row)
  chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight
}

function showTypingIndicator() {
  const row = document.createElement('div')
  row.className = 'message-row message-assistant'
  row.id = 'typingIndicator'
  row.innerHTML = `
    <div class="avatar avatar-assistant">🌱</div>
    <div class="bubble bubble-assistant typing-bubble">
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </div>
  `
  chatMessagesEl.appendChild(row)
  chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight
}

function removeTypingIndicator() {
  const indicator = document.getElementById('typingIndicator')
  if (indicator) indicator.remove()
}

// ==========================================================================
// Handle User Message Submission
// ==========================================================================
async function handleUserSubmit(text) {
  const query = text.trim()
  if (!query) return

  // Add User Message
  const userMsg = { role: 'user', content: query }
  state.messages.push(userMsg)
  appendMessageElement(userMsg, state.messages.length - 1)

  // Clear Input
  messageInputEl.value = ''
  messageInputEl.style.height = 'auto'

  // Show typing indicator
  showTypingIndicator()

  let assistantResponse = ''
  let responseSource = 'knowledge-base'
  let followUps = []

  try {
    // Attempt to call Netlify Function /api/chat
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: query }),
    })

    if (res.ok) {
      const data = await res.json()
      if (data && data.response) {
        assistantResponse = data.response
        responseSource = data.source || 'ai-gateway'
      }
    }
  } catch (err) {
    console.info('Using local agronomic matching engine:', err)
  }

  // Fallback to client-side zero-latency local knowledge matching if needed
  if (!assistantResponse) {
    const localMatch = matchLocalIntent(query)
    assistantResponse = localMatch.text
    responseSource = 'knowledge-base'
    followUps = localMatch.followUps || []
    
    // Auto-select crop or pest in Hub if detected
    if (localMatch.crop && CROPS[localMatch.crop]) {
      selectCrop(localMatch.crop)
    }
    if (localMatch.pest) {
      const pestKey = localMatch.pest.replace(/\s+/g, '-')
      selectPest(pestKey)
    }
  } else {
    // Determine smart follow-ups for AI responses
    const localHint = matchLocalIntent(query)
    followUps = localHint.followUps || ["Soil tips for my region", "Pest control advice", "Post-harvest storage"]
  }

  removeTypingIndicator()

  const assistantMsg = {
    role: 'assistant',
    content: assistantResponse,
    source: responseSource,
    followUps: followUps,
  }

  state.messages.push(assistantMsg)
  appendMessageElement(assistantMsg, state.messages.length - 1)

  // Auto-speak if enabled
  if (state.autoSpeech) {
    speakText(assistantResponse)
  }

  // Save to localStorage
  try {
    localStorage.setItem('agribot_messages', JSON.stringify(state.messages))
  } catch (e) {}
}

// ==========================================================================
// Ticker Setup
// ==========================================================================
function initPromptTicker() {
  promptTickerEl.innerHTML = ''
  SUGGESTIONS.forEach((q) => {
    const chip = document.createElement('button')
    chip.className = 'prompt-chip'
    chip.textContent = q
    chip.addEventListener('click', () => {
      handleUserSubmit(q)
    })
    promptTickerEl.appendChild(chip)
  })
}

// ==========================================================================
// Knowledge Hub: Crop Atlas
// ==========================================================================
function initCropAtlas() {
  cropSelectorBarEl.innerHTML = ''
  Object.values(CROPS).forEach((crop) => {
    const btn = document.createElement('button')
    btn.className = `crop-pill ${crop.id === state.selectedCropId ? 'active' : ''}`
    btn.dataset.id = crop.id
    btn.innerHTML = `<span>${crop.icon}</span> <span>${crop.name.split(' ')[0]}</span>`
    btn.addEventListener('click', () => selectCrop(crop.id))
    cropSelectorBarEl.appendChild(btn)
  })
  renderCropDetail(state.selectedCropId)
}

function selectCrop(cropId) {
  state.selectedCropId = cropId
  document.querySelectorAll('.crop-pill').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.id === cropId)
  })
  renderCropDetail(cropId)
}

function renderCropDetail(cropId) {
  const crop = CROPS[cropId]
  if (!crop) return

  cropDetailCardEl.innerHTML = `
    <div class="detail-box">
      <div class="detail-header">
        <h3 class="detail-title">${crop.icon} ${crop.name}</h3>
        <button class="btn btn-sm btn-primary ask-crop-btn">Ask AgriBot</button>
      </div>

      <div class="detail-section">
        <div class="detail-label">📅 Planting Calendar</div>
        <p class="detail-text"><strong>Northern Zone:</strong> ${crop.planting.north || 'See general advice'}</p>
        <p class="detail-text" style="margin-top:0.3rem"><strong>Southern Zone:</strong> ${crop.planting.south || 'See general advice'}</p>
        <p class="detail-text" style="margin-top:0.3rem"><strong>Spacing & Density:</strong> ${crop.planting.general}</p>
      </div>

      <div class="detail-section">
        <div class="detail-label">🧪 Fertilizer Regime</div>
        <p class="detail-text">${crop.fertilizer}</p>
      </div>

      <div class="detail-section">
        <div class="detail-label">🌾 Harvesting & Storage</div>
        <p class="detail-text">${crop.harvest}</p>
      </div>

      <div class="detail-section">
        <div class="detail-label">💡 Agronomic Management Tip</div>
        <p class="detail-text">${crop.tips}</p>
      </div>
    </div>
  `

  cropDetailCardEl.querySelector('.ask-crop-btn').addEventListener('click', () => {
    handleUserSubmit(`Give me comprehensive farming guidance for ${crop.name}`)
    // Switch to chat view on mobile if needed
    switchToChatView()
  })
}

// ==========================================================================
// Knowledge Hub: Pest Doctor
// ==========================================================================
function initPestDoctor() {
  pestSelectorBarEl.innerHTML = ''
  Object.values(PESTS).forEach((pest) => {
    const btn = document.createElement('button')
    btn.className = `pest-pill ${pest.id === state.selectedPestId ? 'active' : ''}`
    btn.dataset.id = pest.id
    btn.innerHTML = `<span>${pest.icon}</span> <span>${pest.name.split(' ')[0]}</span>`
    btn.addEventListener('click', () => selectPest(pest.id))
    pestSelectorBarEl.appendChild(btn)
  })
  renderPestDetail(state.selectedPestId)
}

function selectPest(pestId) {
  state.selectedPestId = pestId
  document.querySelectorAll('.pest-pill').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.id === pestId)
  })
  renderPestDetail(pestId)
}

function renderPestDetail(pestId) {
  const pest = Object.values(PESTS).find((p) => p.id === pestId)
  if (!pest) return

  pestDetailCardEl.innerHTML = `
    <div class="detail-box">
      <div class="detail-header">
        <h3 class="detail-title">${pest.icon} ${pest.name}</h3>
        <button class="btn btn-sm btn-primary ask-pest-btn">Ask AgriBot</button>
      </div>

      <div class="detail-section">
        <div class="detail-label">🌾 Vulnerable Crops</div>
        <p class="detail-text">${pest.crops.join(', ')}</p>
      </div>

      <div class="detail-section">
        <div class="detail-label">🔍 Visible Damage Signs</div>
        <p class="detail-text">${pest.signs}</p>
      </div>

      <div class="detail-section">
        <div class="detail-label">🌱 Eco-Friendly & Biological Controls</div>
        <ul class="bullet-list">
          ${pest.organicControl.map((c) => `<li>${c}</li>`).join('')}
        </ul>
      </div>

      <div class="detail-section">
        <div class="detail-label">🧪 Targeted Chemical Sprays</div>
        <ul class="bullet-list">
          ${pest.chemicalControl.map((c) => `<li>${c}</li>`).join('')}
        </ul>
      </div>
    </div>
  `

  pestDetailCardEl.querySelector('.ask-pest-btn').addEventListener('click', () => {
    handleUserSubmit(`How do I diagnose and treat ${pest.name}?`)
    switchToChatView()
  })
}

// ==========================================================================
// Hub Sub-Tab Switching
// ==========================================================================
function initHubTabs() {
  hubTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab
      hubTabs.forEach((t) => t.classList.toggle('active', t === tab))
      tabPanes.forEach((pane) => {
        pane.classList.toggle('active', pane.id === `pane${capitalize(targetTab)}`)
      })
    })
  })

  // Quick ask buttons inside Soil, Calendar, Market tabs
  document.querySelectorAll('.ask-quick-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const query = btn.dataset.query
      if (query) {
        handleUserSubmit(query)
        switchToChatView()
      }
    })
  })
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function switchToChatView() {
  if (window.innerWidth <= 992) {
    tabMobileChat.classList.add('active')
    tabMobileHub.classList.remove('active')
    chatColumn.classList.remove('mobile-hidden')
    hubColumn.classList.remove('mobile-active')
  }
}

// ==========================================================================
// Mobile View Switcher
// ==========================================================================
function initMobileSwitcher() {
  tabMobileChat.addEventListener('click', () => {
    tabMobileChat.classList.add('active')
    tabMobileHub.classList.remove('active')
    chatColumn.classList.remove('mobile-hidden')
    hubColumn.classList.remove('mobile-active')
  })

  tabMobileHub.addEventListener('click', () => {
    tabMobileHub.classList.add('active')
    tabMobileChat.classList.remove('active')
    chatColumn.classList.add('mobile-hidden')
    hubColumn.classList.add('mobile-active')
  })
}

// ==========================================================================
// Event Listeners & Initialization
// ==========================================================================
function init() {
  // Load saved messages
  try {
    const saved = localStorage.getItem('agribot_messages')
    if (saved) {
      state.messages = JSON.parse(saved)
    }
  } catch (e) {}

  // Auto-resize textarea
  messageInputEl.addEventListener('input', () => {
    messageInputEl.style.height = 'auto'
    messageInputEl.style.height = `${Math.min(messageInputEl.scrollHeight, 120)}px`
  })

  // Enter to send
  messageInputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      chatFormEl.dispatchEvent(new Event('submit'))
    }
  })

  // Form submit
  chatFormEl.addEventListener('submit', (e) => {
    e.preventDefault()
    handleUserSubmit(messageInputEl.value)
  })

  // Voice toggle
  btnToggleSpeechEl.addEventListener('click', () => {
    state.autoSpeech = !state.autoSpeech
    btnToggleSpeechEl.classList.toggle('speech-active', state.autoSpeech)
    speechBadgeEl.textContent = state.autoSpeech ? 'On' : 'Off'
    showToast(`Voice reader is now ${state.autoSpeech ? 'active' : 'off'}`)
  })

  // Microphone recording
  btnVoiceInputEl.addEventListener('click', () => {
    if (!state.recognition) return
    if (state.isRecording) {
      state.recognition.stop()
    } else {
      state.recognition.start()
    }
  })

  // Reset conversation
  btnClearChatEl.addEventListener('click', () => {
    if (confirm('Clear chat conversation history?')) {
      state.messages = []
      try {
        localStorage.removeItem('agribot_messages')
      } catch (e) {}
      renderChat()
      showToast('Chat history cleared')
    }
  })

  // Initialize subcomponents
  initPromptTicker()
  initCropAtlas()
  initPestDoctor()
  initHubTabs()
  initMobileSwitcher()
  initSpeechRecognition()
  renderChat()
}

document.addEventListener('DOMContentLoaded', init)

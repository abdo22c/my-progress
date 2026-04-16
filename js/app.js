/* =====================================================
   MY-PROGRESS | AI Mastery Tracker
   app.js — Main Application Logic
   ===================================================== */

'use strict';

/* ─────────────────────────────────────────────────────
   1. APPLICATION STATE
───────────────────────────────────────────────────── */
const App = {
  state: {
    currentPage:      'dashboard',
    currentMonth:     0,          // 0-indexed (0 = Month 1)
    currentWeek:      0,          // 0-indexed within month
    theme:            'dark',
    streak:           0,
    lastActiveDate:   null,
    userName:         'AI Master Student',
    startDate:        null,
    targetRole:       'GenAI Engineer',
    accentColor:      '#2563eb',

    // Progress tracking
    completedTasks:   {},         // key → boolean
    projectProgress:  {},         // projectId → { tasksDone: [], links: {} }
    certEarned:       {},         // certId → boolean
    skillLevels:      {},         // skillName → 0-100
    notes:            {},         // `month-${n}` → string

    // Pomodoro
    pomo: {
      sessionsToday:  0,
      focusMinToday:  0,
      log:            [],
      currentTask:    '',
    },

    // Journal
    journal:          [],

    // Settings
    settings: {
      confetti:       true,
      sounds:         false,
      autoOpenGroups: true,
    },

    // Notifications
    notifications: [],
  },

  // Runtime (not persisted)
  runtime: {
    pomoInterval:     null,
    pomoTimeLeft:     25 * 60,
    pomoTotalTime:    25 * 60,
    pomoRunning:      false,
    pomoMode:         'focus',    // 'focus' | 'short' | 'long'
    selectedMood:     null,
    charts:           {},
    searchOpen:       false,
  },
};

/* ─────────────────────────────────────────────────────
   2. CONSTANTS
───────────────────────────────────────────────────── */
const STORAGE_KEY = 'my-progress-v2';

const POMO_DEFAULTS = { focus: 25, short: 5, long: 15 };

const TAG_COLORS = {
  learn:    { bg: 'var(--accent-subtle)',   color: 'var(--text-accent)' },
  build:    { bg: 'var(--green-subtle)',    color: 'var(--green)' },
  research: { bg: 'var(--purple-subtle)',   color: 'var(--purple)' },
  project:  { bg: 'rgba(236,72,153,0.12)', color: 'var(--pink)' },
  cert:     { bg: 'var(--orange-subtle)',   color: 'var(--orange)' },
  deploy:   { bg: 'var(--green-subtle)',    color: 'var(--cyan)' },
};

/* ─────────────────────────────────────────────────────
   3. INITIALIZATION
───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  initLoadingScreen();
  initTheme();
  initGreeting();
  initSearch();

  // Render all pages (they're hidden until activated)
  renderDashboard();
  renderTasksPage();
  renderRoadmap();
  renderMonthlyBreakdown();
  renderProjects();
  renderCertifications();
  renderSkills();
  renderResources();
  renderGitHubPack();
  renderOraclePath();
  renderJournal();
  renderPomodoro();
  renderAnalytics();
  loadSettings();

  // Init charts after a tick (canvas must be visible)
  setTimeout(() => {
    Charts.initAll();
  }, 100);

  // Streak & sidebar
  updateStreak();
  updateSidebarFooter();
  updateTopbarChips();
  seedNotifications();

  // Keyboard shortcuts
  initKeyboardShortcuts();

  console.log('%c My-Progress Loaded ✓', 'color:#3b82f6;font-weight:bold;font-size:14px');
});

/* ─────────────────────────────────────────────────────
   4. LOADING SCREEN
───────────────────────────────────────────────────── */
function initLoadingScreen() {
  const tips = [
    'Loading your 6-month AI roadmap...',
    'Syncing Oracle certification targets...',
    'Preparing GitHub Student Pack tools...',
    'Activating your progress tracker...',
  ];
  const tipEl = document.getElementById('loading-tip');
  if (tipEl) tipEl.textContent = tips[Math.floor(Math.random() * tips.length)];

  setTimeout(() => {
    const screen = document.getElementById('loading-screen');
    if (screen) screen.classList.add('hidden');
  }, 1800);
}

/* ─────────────────────────────────────────────────────
   5. STATE PERSISTENCE
───────────────────────────────────────────────────── */
function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(App.state));
  } catch (e) {
    console.warn('Failed to save state:', e);
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    // Deep merge — preserve defaults for new keys
    App.state = deepMerge(App.state, saved);
  } catch (e) {
    console.warn('Failed to load state:', e);
  }
}

function deepMerge(target, source) {
  const out = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      out[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      out[key] = source[key];
    }
  }
  return out;
}

/* ─────────────────────────────────────────────────────
   6. THEME
───────────────────────────────────────────────────── */
function initTheme() {
  document.documentElement.setAttribute('data-theme', App.state.theme);
  const icon = document.getElementById('theme-icon');
  if (icon) icon.className = App.state.theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  const toggle = document.getElementById('set-dark-mode');
  if (toggle) toggle.checked = App.state.theme === 'dark';
}

function toggleTheme() {
  App.state.theme = App.state.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', App.state.theme);
  const icon = document.getElementById('theme-icon');
  if (icon) icon.className = App.state.theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  const toggle = document.getElementById('set-dark-mode');
  if (toggle) toggle.checked = App.state.theme === 'dark';
  saveState();
  Charts.updateAll();
}

function setAccent(color, el) {
  App.state.accentColor = color;
  document.querySelectorAll('.color-opt').forEach(o => o.classList.remove('active'));
  if (el) el.classList.add('active');
  document.documentElement.style.setProperty('--accent', color);
  document.documentElement.style.setProperty('--accent-light', color);
  saveState();
  Charts.updateAll();
}

/* ─────────────────────────────────────────────────────
   7. GREETING & DATE
───────────────────────────────────────────────────── */
function initGreeting() {
  updateGreeting();
  updateDateDisplay();
  setInterval(updateDateDisplay, 60000);
}

function updateGreeting() {
  const h    = new Date().getHours();
  const name = App.state.userName || 'there';
  const greetings = [
    { range: [5, 12],  text: `Good Morning, ${name} ☀️` },
    { range: [12, 17], text: `Good Afternoon, ${name} 🌤️` },
    { range: [17, 21], text: `Good Evening, ${name} 🌆` },
    { range: [21, 24], text: `Night Session, ${name} 🌙` },
    { range: [0, 5],   text: `Late Night, ${name} 🦉` },
  ];
  const match = greetings.find(g => h >= g.range[0] && h < g.range[1]);
  const el    = document.getElementById('topbar-greeting');
  if (el) el.textContent = match ? match.text : `Hello, ${name}`;
}

function updateDateDisplay() {
  const el = document.getElementById('topbar-date');
  if (!el) return;
  el.textContent = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });
}

/* ─────────────────────────────────────────────────────
   8. NAVIGATION
───────────────────────────────────────────────────── */
function showPage(pageId, linkEl) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Show target
  const target = document.getElementById(`page-${pageId}`);
  if (target) target.classList.add('active');

  // Update nav links
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  if (linkEl) {
    linkEl.classList.add('active');
  } else {
    const found = document.querySelector(`.nav-link[data-page="${pageId}"]`);
    if (found) found.classList.add('active');
  }

  App.state.currentPage = pageId;

  // Close sidebar on mobile
  if (window.innerWidth <= 768) {
    document.getElementById('sidebar')?.classList.remove('mobile-open');
  }

  // Lazy init charts when page becomes visible
  if (pageId === 'dashboard') {
    setTimeout(Charts.updateAll, 50);
    renderDashboard();
  }
  if (pageId === 'analytics') setTimeout(Charts.initAnalytics, 50);
  if (pageId === 'skills')    setTimeout(Charts.initSkillsCharts, 50);
  if (pageId === 'daily')     renderTasksPage();
  if (pageId === 'projects')  renderProjects();

  // Prevent default href="#" scroll
  return false;
}

function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  if (!sb) return;
  sb.classList.toggle('mobile-open');
}

/* ─────────────────────────────────────────────────────
   9. TOPBAR CHIPS & SIDEBAR FOOTER
───────────────────────────────────────────────────── */
function updateTopbarChips() {
  const monthNum  = App.state.currentMonth + 1;
  const todayDone = countTodayCompleted();
  const streak    = App.state.streak;

  setEl('chip-month',  `M${monthNum}`);
  setEl('chip-today',  todayDone);
  setEl('chip-streak', streak);
}

function updateSidebarFooter() {
  const { total, done } = countAllTasks();
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  setEl('sidebar-progress-pct', `${pct}%`);
  setWidth('sidebar-progress-fill', pct);
  setEl('sidebar-streak', App.state.streak);
  setEl('sidebar-username', App.state.userName || 'AI Master Student');

  // Streak bar (7-day target)
  const barPct = Math.min((App.state.streak / 7) * 100, 100);
  setWidth('streak-bar-fill', barPct);
}

/* ─────────────────────────────────────────────────────
   10. DASHBOARD
───────────────────────────────────────────────────── */
function renderDashboard() {
  renderKPIs();
  renderJourneyPhases();
  renderFocusTasks();
  renderMilestones();
  renderHeatmap();
}

/* ── KPI Cards ── */
function renderKPIs() {
  const { total, done }  = countAllTasks();
  const pct              = total > 0 ? Math.round((done / total) * 100) : 0;
  const certsEarned      = countCertsEarned();
  const monthData        = DATA.months[App.state.currentMonth];

  // Month KPI
  setEl('kpi-month', `${App.state.currentMonth + 1} / 6`);
  setEl('kpi-month-name', monthData?.title || '—');
  const monthPct = calcMonthProgress(App.state.currentMonth);
  setWidth('kpi-month-bar', monthPct);

  // Tasks KPI
  setEl('kpi-tasks', done);
  setEl('kpi-tasks-total', `of ${total} total tasks`);
  setWidth('kpi-tasks-bar', pct);

  // Streak KPI
  setEl('kpi-streak', App.state.streak);
  setEl('kpi-streak-sub', App.state.streak > 0
    ? `${App.state.streak} day${App.state.streak !== 1 ? 's' : ''} and counting!`
    : 'Complete a task to start!');

  // Streak dots (7-day display)
  const dotsEl = document.getElementById('streak-dots');
  if (dotsEl) {
    dotsEl.innerHTML = Array.from({ length: 7 }, (_, i) =>
      `<div class="kpi-mini-dot ${i < App.state.streak ? 'active' : ''}"></div>`
    ).join('');
  }

  // Certs KPI
  setEl('kpi-certs', `${certsEarned} / 4`);
  const certDotsEl = document.getElementById('cert-dots');
  if (certDotsEl) {
    certDotsEl.innerHTML = DATA.certifications.map(c =>
      `<div class="kpi-cert-dot ${App.state.certEarned[c.id] ? 'earned' : ''}"></div>`
    ).join('');
  }

  // Overall badge
  setEl('overall-pct-badge', `${pct}%`);
}

/* ── Journey Phases ── */
function renderJourneyPhases() {
  const container = document.getElementById('journey-phases');
  if (!container) return;

  container.innerHTML = DATA.months.map((month, i) => {
    const pct     = calcMonthProgress(i);
    const active  = i === App.state.currentMonth;
    const done    = pct === 100;
    let cls = 'journey-phase-item';
    if (active) cls += ' active';
    if (done)   cls += ' completed';

    return `
      <div class="${cls}" onclick="jumpToMonth(${i})" title="${month.title}">
        <div class="jpi-header">
          <span class="jpi-num">M${i + 1}</span>
          <span class="jpi-pct">${pct}%</span>
        </div>
        <div class="jpi-title">${month.shortTitle || month.title}</div>
        <div class="jpi-bar">
          <div class="jpi-bar-fill" style="width:${pct}%"></div>
        </div>
      </div>
    `;
  }).join('');
}

/* ── Focus Tasks ── */
function renderFocusTasks() {
  const container = document.getElementById('focus-tasks-list');
  if (!container) return;

  const month   = DATA.months[App.state.currentMonth];
  const label   = document.getElementById('focus-phase-label');
  if (label) label.textContent = `Month ${App.state.currentMonth + 1} — ${month?.shortTitle || ''}`;

  if (!month) { container.innerHTML = '<p class="text-muted" style="font-size:.75rem">No tasks found.</p>'; return; }

  // Collect pending tasks (max 5)
  const pending = [];
  outer:
  for (const week of month.weeks) {
    for (const group of week.groups) {
      for (const task of group.tasks) {
        const key = taskKey(App.state.currentMonth, week.id, group.title, task.title);
        if (!App.state.completedTasks[key]) {
          pending.push({ task, key });
          if (pending.length >= 5) break outer;
        }
      }
    }
  }

  if (!pending.length) {
    container.innerHTML = `
      <div style="text-align:center;padding:1rem">
        <div style="font-size:1.5rem;margin-bottom:.4rem">🎉</div>
        <p style="font-size:.75rem;color:var(--text-muted)">All tasks complete for this month!</p>
      </div>`;
    return;
  }

  container.innerHTML = pending.map(({ task, key }) => `
    <div class="focus-task-item" onclick="quickToggleTask('${escKey(key)}', this)">
      <div class="focus-task-cb"></div>
      <span class="focus-task-text">${task.title}</span>
    </div>
  `).join('');
}

function quickToggleTask(key, el) {
  const decoded = unescKey(key);
  App.state.completedTasks[decoded] = !App.state.completedTasks[decoded];
  el.classList.toggle('done');
  if (App.state.completedTasks[decoded]) fireCelebration();
  markActiveDay();
  saveState();
  updateSidebarFooter();
  updateTopbarChips();
  renderKPIs();
  renderJourneyPhases();
}

/* ── Milestones ── */
function renderMilestones() {
  const container = document.getElementById('milestones-list');
  if (!container) return;

  const milestones = [
    { icon: '🏗️', title: 'Adv. ML System Deployed',    sub: 'Project 01 live',          color: 'rgba(59,130,246,0.12)', key: 'proj-1-complete' },
    { icon: '💬', title: 'Darija NLP Published',         sub: 'HuggingFace + demo',        color: 'rgba(139,92,246,0.12)', key: 'proj-2-complete' },
    { icon: '⚖️', title: 'Mourafiq RAG Live',            sub: 'Star portfolio project',    color: 'rgba(6,182,212,0.12)',  key: 'proj-3-complete' },
    { icon: '☁️', title: 'OCI AI Foundations',           sub: 'Oracle certified',          color: 'rgba(245,158,11,0.12)', key: 'cert-2' },
    { icon: '🧠', title: 'OCI GenAI Professional',       sub: 'Highest-value cert',        color: 'rgba(37,99,235,0.12)',  key: 'cert-3' },
    { icon: '🎯', title: 'First Job / Contract',         sub: 'The ultimate milestone',    color: 'rgba(16,185,129,0.12)', key: 'goal-job' },
  ];

  container.innerHTML = milestones.map(m => {
    const done   = !!App.state.completedTasks[m.key] || !!App.state.certEarned[m.key.replace('cert-', '')];
    const status = done ? 'done' : 'pending';
    return `
      <div class="milestone-row">
        <div class="milestone-icon-wrap" style="background:${m.color}">${m.icon}</div>
        <div class="milestone-body">
          <div class="milestone-title">${m.title}</div>
          <div class="milestone-sub">${m.sub}</div>
        </div>
        <div class="milestone-status ${status}"></div>
      </div>
    `;
  }).join('');
}

/* ── Heatmap ── */
function renderHeatmap() {
  const container = document.getElementById('heatmap');
  if (!container) return;

  const cells = [];
  for (let i = 0; i < 180; i++) {
    // Count tasks completed on "day i" (approximation via task keys)
    const count = Object.entries(App.state.completedTasks)
      .filter(([k, v]) => v && k.includes(`-d${i}-`))
      .length;
    const lvl = count >= 8 ? 4 : count >= 5 ? 3 : count >= 2 ? 2 : count >= 1 ? 1 : 0;
    cells.push(`<div class="hm-cell hm-${lvl}" title="Day ${i + 1}: ${count} tasks"></div>`);
  }
  container.innerHTML = cells.join('');
}

/* ─────────────────────────────────────────────────────
   11. TODAY'S TASKS PAGE
───────────────────────────────────────────────────── */
function renderTasksPage() {
  renderWeekTabs();
  renderTaskGroups();
  renderMonthProgressHeader();
  loadNotes();
  updateNavBadge('daily');
}

/* ── Month Progress Header ── */
function renderMonthProgressHeader() {
  const month  = DATA.months[App.state.currentMonth];
  if (!month) return;

  const pct = calcMonthProgress(App.state.currentMonth);
  const { done, total } = countMonthTasks(App.state.currentMonth);

  setEl('daily-month-label', `Month ${App.state.currentMonth + 1} — ${month.title}`);
  setEl('mph-badge',  `M${App.state.currentMonth + 1}`);
  setEl('mph-title',  month.title);
  setEl('mph-sub',    `${done} of ${total} tasks completed`);
  setEl('mph-pct',    `${pct}%`);
  setWidth('month-progress-fill', pct);
  setEl('notes-month-num', App.state.currentMonth + 1);
}

/* ── Week Tabs ── */
function renderWeekTabs() {
  const container = document.getElementById('week-tabs');
  if (!container) return;

  const month = DATA.months[App.state.currentMonth];
  if (!month) return;

  container.innerHTML = month.weeks.map((week, i) => {
    const pct   = calcWeekProgress(App.state.currentMonth, i);
    const done  = pct === 100;
    const active = i === App.state.currentWeek;
    let cls = 'week-tab';
    if (active) cls += ' active';
    if (done && !active) cls += ' completed';

    return `
      <button class="${cls}" onclick="switchWeek(${i})">
        Week ${week.id}
        ${done ? ' ✓' : ''}
      </button>
    `;
  }).join('');
}

function switchWeek(weekIndex) {
  App.state.currentWeek = weekIndex;
  renderWeekTabs();
  renderTaskGroups();
}

/* ── Task Groups ── */
function renderTaskGroups() {
  const container = document.getElementById('tasks-container');
  if (!container) return;

  const month = DATA.months[App.state.currentMonth];
  const week  = month?.weeks[App.state.currentWeek];
  if (!week)  { container.innerHTML = '<p class="text-muted">No tasks for this week.</p>'; return; }

  container.innerHTML = week.groups.map((group, gi) => {
    const { done, total } = countGroupTasks(App.state.currentMonth, week, group);
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const auto = App.state.settings.autoOpenGroups;

    return `
      <div class="task-group ${auto ? 'open' : ''}" id="tg-${gi}">
        <div class="task-group-header" onclick="toggleGroup(${gi})">
          <div class="tgh-left">
            <div class="tgh-icon"><i class="${group.icon || 'fas fa-layer-group'}"></i></div>
            <span class="tgh-title">${group.title}</span>
          </div>
          <div class="tgh-right">
            <div class="tgh-progress">
              <div class="tgh-mini-bar">
                <div class="tgh-mini-fill" style="width:${pct}%"></div>
              </div>
              <span class="tgh-pct">${done}/${total}</span>
            </div>
            <i class="fas fa-chevron-down tgh-chevron"></i>
          </div>
        </div>
        <div class="task-group-body">
          ${renderTaskItems(group.tasks, App.state.currentMonth, week)}
        </div>
      </div>
    `;
  }).join('');
}

function toggleGroup(gi) {
  const el = document.getElementById(`tg-${gi}`);
  if (el) el.classList.toggle('open');
}

/* ── Task Items ── */
function renderTaskItems(tasks, monthIdx, week) {
  return tasks.map(task => {
    const key  = taskKey(monthIdx, week.id, task.group || '', task.title);
    const done = !!App.state.completedTasks[key];

    const tags = (task.tags || []).map(t =>
      `<span class="task-tag tag-${t}">${t}</span>`
    ).join('');

    return `
      <div class="task-item ${done ? 'completed' : ''}"
           onclick="toggleTask('${escKey(key)}', this)">
        <div class="task-checkbox"></div>
        <div class="task-content">
          <div class="task-title">${task.title}</div>
          ${task.description
            ? `<div class="task-desc">${task.description}</div>`
            : ''}
          ${tags ? `<div class="task-tags">${tags}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

/* ── Toggle Task ── */
function toggleTask(encodedKey, el) {
  const key  = unescKey(encodedKey);
  const prev = !!App.state.completedTasks[key];
  App.state.completedTasks[key] = !prev;

  el.classList.toggle('completed', !prev);

  if (!prev) {
    fireCelebration();
    showToast('Task completed! 🎉', 'success');
  }

  markActiveDay();
  saveState();
  refreshAllCounters();
}

/* ── Month Navigation ── */
function prevMonth() {
  if (App.state.currentMonth > 0) {
    App.state.currentMonth--;
    App.state.currentWeek = 0;
    renderTasksPage();
    saveState();
  }
}

function nextMonth() {
  if (App.state.currentMonth < DATA.months.length - 1) {
    App.state.currentMonth++;
    App.state.currentWeek = 0;
    renderTasksPage();
    saveState();
  }
}

function jumpToCurrentMonth() {
  App.state.currentWeek = 0;
  renderTasksPage();
}

function jumpToMonth(idx) {
  App.state.currentMonth = idx;
  App.state.currentWeek  = 0;
  showPage('daily', null);
  renderTasksPage();
  saveState();
}

/* ── Notes ── */
function saveNotes() {
  const key = `month-${App.state.currentMonth}`;
  const val = document.getElementById('notes-textarea')?.value || '';
  App.state.notes[key] = val;
  saveState();
  showToast('Notes saved ✓', 'success');
}

function loadNotes() {
  const key = `month-${App.state.currentMonth}`;
  const el  = document.getElementById('notes-textarea');
  if (el) el.value = App.state.notes[key] || '';
}

/* ─────────────────────────────────────────────────────
   12. ROADMAP PAGE
───────────────────────────────────────────────────── */
function renderRoadmap() {
  const container = document.getElementById('roadmap-timeline');
  if (!container) return;

  container.innerHTML = DATA.months.map((month, i) => {
    const pct      = calcMonthProgress(i);
    const active   = i === App.state.currentMonth;
    const complete  = pct === 100;
    let cls = 'timeline-entry';
    if (active)   cls += ' tl-active';
    if (complete) cls += ' tl-completed';

    const topics = (month.keyTopics || []).map(t =>
      `<span class="tl-topic">${t}</span>`
    ).join('');

    const deliverables = (month.deliverables || []).map(d =>
      `<span class="tl-deliverable">${d}</span>`
    ).join('');

    return `
      <div class="${cls}" data-month="${i + 1}">
        <div class="tl-dot"></div>
        <div class="tl-card" onclick="jumpToMonth(${i})">
          <div class="tl-header">
            <div class="tl-month-tag">
              <span class="tl-month-num">Month ${i + 1} ${month.emoji || ''}</span>
            </div>
            <span class="badge ${complete ? 'badge-green' : active ? 'badge-orange' : 'badge-blue'}">
              ${complete ? 'Done' : active ? 'Active' : `${pct}%`}
            </span>
          </div>
          <div class="tl-month-name">${month.title}</div>
          <div class="tl-desc">${month.description}</div>
          ${topics ? `<div class="tl-topics">${topics}</div>` : ''}
          <div class="tl-footer">
            <div class="tl-progress-wrap">
              <div class="progress-bar" style="flex:1">
                <div class="progress-fill" style="width:${pct}%"></div>
              </div>
              <span class="tl-pct">${pct}%</span>
            </div>
            ${deliverables ? `<div class="tl-deliverables">${deliverables}</div>` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterRoadmap(month, btn) {
  // Update active filter button
  document.querySelectorAll('#roadmap-filters .filter-btn')
    .forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  document.querySelectorAll('.timeline-entry').forEach(el => {
    el.style.display = (month === 'all' || el.dataset.month == month) ? '' : 'none';
  });
}

/* ─────────────────────────────────────────────────────
   13. MONTHLY BREAKDOWN
───────────────────────────────────────────────────── */
function renderMonthlyBreakdown() {
  renderMonthSelector();
  renderMonthDetail(0);
}

function renderMonthSelector() {
  const container = document.getElementById('month-selector');
  if (!container) return;

  container.innerHTML = DATA.months.map((m, i) => `
    <button class="month-sel-btn ${i === 0 ? 'active' : ''}"
            onclick="selectMonthDetail(${i}, this)">
      <strong>M${i + 1}</strong>
      <span class="msb-label">${m.shortTitle || m.emoji || ''}</span>
    </button>
  `).join('');
}

function selectMonthDetail(idx, btn) {
  document.querySelectorAll('.month-sel-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderMonthDetail(idx);
}

function renderMonthDetail(idx) {
  const container = document.getElementById('month-detail-container');
  if (!container) return;

  const month = DATA.months[idx];
  if (!month)  { container.innerHTML = ''; return; }

  const weeks = month.weeks.map(week => `
    <div class="week-detail-card">
      <div class="wdc-header">
        <span class="wdc-week-badge">Week ${week.id}</span>
        ${week.cert ? `<span class="badge badge-orange">📜 ${week.cert}</span>` : ''}
      </div>
      <div class="wdc-title">${week.title}</div>
      <div class="wdc-desc">${week.description || ''}</div>
      <div class="wdc-items">
        ${(week.items || []).map(item => `
          <div class="wdc-item">${item}</div>
        `).join('')}
      </div>
    </div>
  `).join('');

  container.innerHTML = `<div class="month-detail">${weeks}</div>`;
}

/* ─────────────────────────────────────────────────────
   14. PROJECTS PAGE
───────────────────────────────────────────────────── */
function renderProjects() {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  let completedCount = 0, inProgressCount = 0;

  container.innerHTML = DATA.projects.map(proj => {
    const state   = calcProjectState(proj);
    if (state.pct === 100) completedCount++;
    else if (state.pct > 0) inProgressCount++;

    let statusCls = 'status-todo';
    let statusTxt = 'Not Started';
    if (state.pct === 100) { statusCls = 'status-done';       statusTxt = 'Completed'; }
    else if (state.pct > 0) { statusCls = 'status-inprogress'; statusTxt = 'In Progress'; }

    const techs = (proj.tech || []).map(t =>
      `<span class="pc-tech">${t}</span>`
    ).join('');

    return `
      <div class="project-card ${statusCls}" data-category="${proj.category || 'ml'}"
           onclick="openProjectDrawer(${proj.id})">
        <div class="project-card-accent" style="background:${proj.gradient}"></div>
        <div class="project-card-body">
          <div class="pc-num-row">
            <span class="pc-num">Project ${String(proj.id).padStart(2,'0')}</span>
            <span class="pc-month">Month ${proj.month}</span>
          </div>
          <div class="pc-title">${proj.title}</div>
          <div class="pc-desc">${proj.description}</div>
          <div class="pc-techs">${techs}</div>
          <div class="progress-bar" style="margin-bottom:.5rem">
            <div class="progress-fill" style="width:${state.pct}%"></div>
          </div>
          <div class="pc-footer">
            <div class="pc-status">
              <div class="pc-status-dot"></div>
              <span class="pc-status-text">${statusTxt}</span>
            </div>
            <span class="pc-pct">${state.pct}%</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  setEl('psb-done',     completedCount);
  setEl('psb-progress', inProgressCount);
}

function filterProjects(cat, btn) {
  document.querySelectorAll('.filter-group .filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.project-card').forEach(el => {
    el.style.display = (cat === 'all' || el.dataset.category === cat) ? '' : 'none';
  });
}

/* ── Project Drawer ── */
function openProjectDrawer(projId) {
  const proj    = DATA.projects.find(p => p.id === projId);
  if (!proj) return;

  const state   = App.state.projectProgress[projId] || {};
  const links   = state.links || {};

  setEl('drawer-project-num',   `Project ${String(projId).padStart(2,'0')}`);
  setEl('drawer-project-title', proj.title);

  const content = document.getElementById('drawer-content');
  if (!content) return;

  const techs = (proj.tech || []).map(t =>
    `<span class="pc-tech">${t}</span>`
  ).join('');

  const checklist = (proj.checklist || []).map((item, i) => {
    const done = !!(state.tasks || {})[i];
    return `
      <div class="drawer-check-item ${done ? 'done' : ''}"
           onclick="toggleProjectTask(${projId}, ${i}, this)">
        <div class="drawer-check-box"></div>
        <span class="drawer-check-text">${item}</span>
      </div>
    `;
  }).join('');

  const { pct } = calcProjectState(proj);

  content.innerHTML = `
    <div class="drawer-section">
      <div class="drawer-section-title">Description</div>
      <p style="font-size:.78rem;color:var(--text-secondary);line-height:1.6">${proj.description}</p>
    </div>

    <div class="drawer-section">
      <div class="drawer-section-title">Tech Stack</div>
      <div class="pc-techs">${techs}</div>
    </div>

    <div class="drawer-section">
      <div class="drawer-section-title">Why this project?</div>
      <p style="font-size:.75rem;color:var(--text-muted);line-height:1.6">${proj.why || '—'}</p>
    </div>

    <div class="drawer-section">
      <div class="drawer-section-title">Progress — ${pct}%</div>
      <div class="progress-bar progress-bar-thick" style="margin-bottom:0.85rem">
        <div class="progress-fill" style="width:${pct}%"></div>
      </div>
      <div class="drawer-section-title">Checklist</div>
      <div class="drawer-checklist">${checklist || '<p style="font-size:.72rem;color:var(--text-muted)">No checklist defined.</p>'}</div>
    </div>

    <div class="drawer-section">
      <div class="drawer-section-title">Links</div>
      <input class="drawer-link-input" id="drawer-github-${projId}"
             placeholder="GitHub URL..."
             value="${links.github || ''}"
             onchange="saveProjectLink(${projId}, 'github', this.value)">
      <input class="drawer-link-input" id="drawer-demo-${projId}"
             placeholder="Live Demo URL..."
             value="${links.demo || ''}"
             onchange="saveProjectLink(${projId}, 'demo', this.value)">
      ${links.github
        ? `<a href="${links.github}" target="_blank" class="btn btn-ghost btn-sm" style="margin-right:.4rem">
             <i class="fab fa-github"></i> GitHub
           </a>` : ''}
      ${links.demo
        ? `<a href="${links.demo}" target="_blank" class="btn btn-primary btn-sm">
             <i class="fas fa-external-link-alt"></i> Live Demo
           </a>` : ''}
    </div>
  `;

  document.getElementById('project-drawer')?.classList.add('open');
  document.getElementById('project-drawer-backdrop')?.classList.remove('hidden');
}

function closeProjectDrawer() {
  document.getElementById('project-drawer')?.classList.remove('open');
  document.getElementById('project-drawer-backdrop')?.classList.add('hidden');
}

function toggleProjectTask(projId, taskIdx, el) {
  if (!App.state.projectProgress[projId]) App.state.projectProgress[projId] = {};
  if (!App.state.projectProgress[projId].tasks) App.state.projectProgress[projId].tasks = {};
  const current = !!App.state.projectProgress[projId].tasks[taskIdx];
  App.state.projectProgress[projId].tasks[taskIdx] = !current;
  el.classList.toggle('done', !current);
  if (!current) fireCelebration();
  saveState();
  renderProjects();
}

function saveProjectLink(projId, type, value) {
  if (!App.state.projectProgress[projId]) App.state.projectProgress[projId] = {};
  if (!App.state.projectProgress[projId].links) App.state.projectProgress[projId].links = {};
  App.state.projectProgress[projId].links[type] = value;
  saveState();
}

/* ─────────────────────────────────────────────────────
   15. CERTIFICATIONS PAGE
───────────────────────────────────────────────────── */
function renderCertifications() {
  renderCertCards();
  renderCertRing();
  renderCertResources();
  renderCertTimeline();
}

function renderCertCards() {
  const container = document.getElementById('certs-grid');
  if (!container) return;

  container.innerHTML = DATA.certifications.map(cert => {
    const earned = !!App.state.certEarned[cert.id];
    const topics = (cert.topics || []).map(t =>
      `<span class="cert-topic">${t}</span>`
    ).join('');

    return `
      <div class="cert-card ${earned ? 'earned' : ''}" onclick="toggleCert(${cert.id})">
        <div class="cert-earned-check"><i class="fas fa-check"></i></div>
        <div class="cert-header">
          <div class="cert-icon-wrap">${cert.icon}</div>
          <div class="cert-meta">
            <div class="cert-name">${cert.name}</div>
            <div class="cert-code">${cert.code}</div>
          </div>
          <span class="cert-priority p${cert.priority}">P${cert.priority}</span>
        </div>
        <div class="cert-desc">${cert.description}</div>
        <div class="cert-topics">${topics}</div>
        <div class="cert-footer">
          <span class="cert-target">🎯 ${cert.targetMonth}</span>
          <button class="cert-status-btn">
            ${earned ? '✅ Earned' : 'Mark Earned'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function renderCertRing() {
  const earned = countCertsEarned();
  const pct    = Math.round((earned / 4) * 100);

  setEl('cob-earned', `${earned} of 4 Earned`);
  setEl('cob-pct',    `${pct}%`);

  const ring = document.getElementById('cert-ring-progress');
  if (ring) {
    const circ   = 2 * Math.PI * 34; // r=34
    const offset = circ - (pct / 100) * circ;
    ring.style.strokeDashoffset = offset;
  }

  // Timeline steps
  DATA.certifications.forEach((cert, i) => {
    const step = document.getElementById(`cob-step-${i + 1}`);
    if (step && App.state.certEarned[cert.id]) step.classList.add('earned');
  });
}

function renderCertResources() {
  const container = document.getElementById('cert-resources-grid');
  if (!container) return;

  const resources = [
    { icon: 'fas fa-graduation-cap', title: 'Oracle University',    sub: 'Free learning paths', url: 'https://education.oracle.com' },
    { icon: 'fas fa-cloud',          title: 'OCI Free Tier',         sub: 'Always-free cloud practice', url: 'https://oracle.com/cloud/free' },
    { icon: 'fab fa-youtube',        title: 'OCI YouTube Channel',   sub: 'Official tutorials', url: 'https://youtube.com/@OracleCloudInfrastructure' },
    { icon: 'fas fa-book',           title: 'OCI Documentation',     sub: 'Deep technical reference', url: 'https://docs.oracle.com/en-us/iaas/Content/home.htm' },
    { icon: 'fas fa-question-circle',title: 'Practice Exams',        sub: 'Official practice questions', url: 'https://education.oracle.com/certification' },
    { icon: 'fab fa-github',         title: 'OCI SDK & Samples',     sub: 'Hands-on code examples', url: 'https://github.com/oracle/oci-python-sdk' },
  ];

  container.innerHTML = resources.map(r => `
    <a href="${r.url}" target="_blank" class="cert-resource-item">
      <div class="cri-icon"><i class="${r.icon}"></i></div>
      <div>
        <div class="cri-title">${r.title}</div>
        <div class="cri-sub">${r.sub}</div>
      </div>
    </a>
  `).join('');
}

function renderCertTimeline() {
  DATA.certifications.forEach((cert, i) => {
    const step = document.getElementById(`cob-step-${i + 1}`);
    if (!step) return;
    if (App.state.certEarned[cert.id]) step.classList.add('earned');
    else step.classList.remove('earned');
  });
}

function toggleCert(certId) {
  App.state.certEarned[certId] = !App.state.certEarned[certId];
  if (App.state.certEarned[certId]) {
    fireCelebration(true);
    showToast('🏆 Certification Earned! Congratulations!', 'success');
    addNotification('Certification Earned! 🏆', `You earned ${DATA.certifications.find(c=>c.id===certId)?.name}!`, 'success');
  }
  markActiveDay();
  saveState();
  renderCertifications();
  updateSidebarFooter();
  renderKPIs();
}

/* ─────────────────────────────────────────────────────
   16. SKILLS PAGE
───────────────────────────────────────────────────── */
function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  container.innerHTML = DATA.skills.map(cat => {
    const avg = Math.round(
      cat.items.reduce((s, item) => s + (App.state.skillLevels[item.name] || 0), 0) / cat.items.length
    );

    const rows = cat.items.map(item => {
      const lvl    = App.state.skillLevels[item.name] || 0;
      const target = item.target || 85;
      const grade  = lvl >= 80 ? 4 : lvl >= 60 ? 3 : lvl >= 40 ? 2 : lvl >= 20 ? 1 : 0;

      return `
        <div class="skill-row">
          <span class="skill-name">${item.name}</span>
          <div class="skill-target-bar">
            <div class="skill-target-marker" style="left:${target}%"
                 title="Target: ${target}%"></div>
            <div class="skill-bar-fill skill-level-${grade}"
                 style="width:${lvl}%"></div>
          </div>
          <span class="skill-pct">${lvl}%</span>
          <input type="range" class="skill-slider" min="0" max="100" value="${lvl}"
                 oninput="updateSkill('${item.name}', this.value, this)">
        </div>
      `;
    }).join('');

    return `
      <div class="skill-cat-card">
        <div class="skill-cat-header">
          <span class="skill-cat-title">${cat.icon} ${cat.category}</span>
          <span class="skill-cat-avg">${avg}% avg</span>
        </div>
        <div class="skills-list">${rows}</div>
      </div>
    `;
  }).join('');
}

function updateSkill(name, val, slider) {
  App.state.skillLevels[name] = parseInt(val);
  // Update adjacent display without full re-render
  const pctEl = slider?.parentElement?.querySelector('.skill-pct');
  if (pctEl) pctEl.textContent = `${val}%`;
  const fill  = slider?.parentElement?.querySelector('.skill-bar-fill');
  if (fill)  fill.style.width = `${val}%`;
  saveState();
  Charts.updateAll();
}

function exportSkills() {
  const rows = DATA.skills.flatMap(cat =>
    cat.items.map(item => ({
      category: cat.category,
      skill:    item.name,
      level:    App.state.skillLevels[item.name] || 0,
      target:   item.target || 85,
    }))
  );
  const csv  = 'Category,Skill,Level,Target\n' + rows.map(r => Object.values(r).join(',')).join('\n');
  downloadFile('skills-export.csv', csv, 'text/csv');
  showToast('Skills exported ✓', 'success');
}

/* ─────────────────────────────────────────────────────
   17. RESOURCES PAGE
───────────────────────────────────────────────────── */
function renderResources() {
  const container = document.getElementById('resources-grid');
  if (!container) return;

  const TYPE_META = {
    video:    { color: 'var(--red)',          icon: 'fas fa-play-circle' },
    course:   { color: 'var(--accent)',       icon: 'fas fa-graduation-cap' },
    paper:    { color: 'var(--purple)',        icon: 'fas fa-file-alt' },
    docs:     { color: 'var(--green)',         icon: 'fas fa-book-open' },
    book:     { color: 'var(--orange)',        icon: 'fas fa-book' },
    tool:     { color: 'var(--cyan)',          icon: 'fas fa-wrench' },
  };

  container.innerHTML = DATA.resources.map(r => {
    const meta = TYPE_META[r.type] || TYPE_META.docs;
    return `
      <a href="${r.url}" target="_blank" class="resource-card" data-type="${r.type}"
         rel="noopener noreferrer">
        <div class="resource-type-row">
          <span class="resource-type-badge" style="color:${meta.color}">
            <i class="${meta.icon}"></i> ${r.type}
          </span>
          <span class="resource-month">M${r.month}</span>
        </div>
        <div class="resource-title">${r.title}</div>
        <div class="resource-desc">${r.description}</div>
        <div class="resource-link">
          <i class="fas fa-external-link-alt"></i> Open Resource
        </div>
      </a>
    `;
  }).join('');
}

function filterResources(type, btn) {
  document.querySelectorAll('#page-resources .filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.resource-card').forEach(el => {
    el.style.display = (type === 'all' || el.dataset.type === type) ? '' : 'none';
  });
}

/* ─────────────────────────────────────────────────────
   18. GITHUB STUDENT PACK PAGE
───────────────────────────────────────────────────── */
function renderGitHubPack() {
  const priorityContainer   = document.getElementById('github-tools-priority');
  const secondaryContainer  = document.getElementById('github-tools-secondary');
  if (!priorityContainer || !secondaryContainer) return;

  const priority   = DATA.githubTools.filter(t => t.priority === 'high');
  const secondary  = DATA.githubTools.filter(t => t.priority !== 'high');

  const renderTool = tool => `
    <a href="${tool.url}" target="_blank" class="gh-tool-card" rel="noopener noreferrer">
      <div class="gh-tool-icon" style="background:${tool.bg}">
        <i class="${tool.icon}" style="color:${tool.color}"></i>
      </div>
      <div class="gh-tool-body">
        <div class="gh-tool-name">${tool.name}</div>
        <div class="gh-tool-desc">${tool.description}</div>
        <div class="gh-tool-meta">
          <span class="gh-tool-value">${tool.value}</span>
          <span class="gh-tool-category">${tool.category}</span>
        </div>
      </div>
    </a>
  `;

  priorityContainer.innerHTML  = priority.map(renderTool).join('');
  secondaryContainer.innerHTML = secondary.map(renderTool).join('');
}

/* ─────────────────────────────────────────────────────
   19. ORACLE PATH PAGE
───────────────────────────────────────────────────── */
function renderOraclePath() {
  const container = document.getElementById('oracle-path-container');
  if (!container) return;

  container.innerHTML = DATA.certifications.map((cert, i) => {
    const earned = !!App.state.certEarned[cert.id];
    const topics = (cert.topics || []).map(t =>
      `<div class="opc-topic">${t}</div>`
    ).join('');

    const resources = (cert.prepResources || []).map(r =>
      `<a href="${r.url}" target="_blank" class="opc-resource-link" rel="noopener noreferrer">
        <i class="${r.icon}"></i> ${r.label}
       </a>`
    ).join('');

    return `
      <div class="oracle-path-card">
        <div class="opc-header">
          <div class="opc-step-num">${i + 1}</div>
          <div class="opc-header-info">
            <div class="opc-name">${cert.name}</div>
            <div class="opc-code">${cert.code}</div>
          </div>
          <span class="badge ${earned ? 'badge-green' : 'badge-blue'}">
            ${earned ? '✅ Earned' : cert.targetMonth}
          </span>
        </div>
        <div class="opc-body">
          <p style="font-size:.75rem;color:var(--text-secondary);margin-bottom:.75rem;line-height:1.6">
            ${cert.description}
          </p>
          <div class="drawer-section-title" style="margin-bottom:.4rem">Exam Topics</div>
          <div class="opc-topics-grid">${topics}</div>
          <div class="drawer-section-title" style="margin:.75rem 0 .4rem">Free Prep Resources</div>
          <div class="opc-resources">${resources}</div>
        </div>
      </div>
    `;
  }).join('');
}

/* ─────────────────────────────────────────────────────
   20. JOURNAL
───────────────────────────────────────────────────── */
function openJournalEditor() {
  const ed = document.getElementById('journal-editor');
  if (ed) ed.classList.remove('hidden');
  document.getElementById('j-title')?.focus();
}

function closeJournalEditor() {
  const ed = document.getElementById('journal-editor');
  if (ed) ed.classList.add('hidden');
  clearJournalForm();
}

function clearJournalForm() {
  ['j-title', 'j-tags', 'j-content'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  App.runtime.selectedMood = null;
  document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
  setEl('j-word-count', '0 words');
}

function pickMood(mood, btn) {
  App.runtime.selectedMood = mood;
  document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

// Word count
document.addEventListener('input', e => {
  if (e.target?.id === 'j-content') {
    const words = e.target.value.trim().split(/\s+/).filter(Boolean).length;
    setEl('j-word-count', `${words} word${words !== 1 ? 's' : ''}`);
  }
});

function saveJournalEntry() {
  const title   = document.getElementById('j-title')?.value?.trim();
  const content = document.getElementById('j-content')?.value?.trim();
  const tagsRaw = document.getElementById('j-tags')?.value || '';
  const tags    = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);

  if (!title || !content) {
    showToast('Please fill in title and content', 'warning');
    return;
  }

  const entry = {
    id:      Date.now(),
    title,
    content,
    tags,
    mood:    App.runtime.selectedMood || '💡',
    date:    new Date().toISOString(),
    month:   App.state.currentMonth + 1,
  };

  App.state.journal.unshift(entry);
  saveState();
  closeJournalEditor();
  renderJournal();
  showToast('Journal entry saved ✓', 'success');
}

function renderJournal() {
  const container = document.getElementById('journal-entries-list');
  if (!container) return;

  const sortEl  = document.getElementById('journal-sort');
  const sort    = sortEl?.value || 'newest';
  const searchEl = document.getElementById('journal-search');
  const query   = searchEl?.value?.toLowerCase() || '';

  let entries = [...App.state.journal];
  if (sort === 'oldest') entries.reverse();
  if (query) {
    entries = entries.filter(e =>
      e.title.toLowerCase().includes(query) ||
      e.content.toLowerCase().includes(query) ||
      e.tags.some(t => t.toLowerCase().includes(query))
    );
  }

  if (!entries.length) {
    container.innerHTML = `
      <div style="text-align:center;padding:3rem;color:var(--text-muted)">
        <div style="font-size:2rem;margin-bottom:.5rem">📝</div>
        <p>${query ? 'No entries match your search.' : 'No journal entries yet. Start documenting your AI journey!'}</p>
      </div>`;
    return;
  }

  container.innerHTML = entries.map(entry => {
    const date = new Date(entry.date).toLocaleDateString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
    });
    const tags = entry.tags.map(t =>
      `<span class="jec-tag">${t}</span>`
    ).join('');
    // Truncate content
    const preview = entry.content.length > 200
      ? entry.content.slice(0, 200) + '…'
      : entry.content;

    return `
      <div class="journal-entry-card">
        <div class="jec-top">
          <span class="jec-mood">${entry.mood}</span>
          <div style="flex:1">
            <div class="jec-title">${entry.title}</div>
          </div>
          <span class="jec-date">${date}</span>
        </div>
        <div class="jec-content">${preview}</div>
        ${tags ? `<div class="jec-tags">${tags}</div>` : ''}
      </div>
    `;
  }).join('');
}

// Live search
document.addEventListener('input', e => {
  if (e.target?.id === 'journal-search') renderJournal();
});

/* ─────────────────────────────────────────────────────
   21. POMODORO TIMER
───────────────────────────────────────────────────── */
function renderPomodoro() {
  updatePomoDisplay();
  updatePomoStats();
  populatePomoTaskSelect();
  renderPomoLog();
  renderPomoSessionDots();
}

function setPomoMode(mode, btn) {
  App.runtime.pomoMode = mode;
  clearInterval(App.runtime.pomoInterval);
  App.runtime.pomoRunning = false;

  const mins = mode === 'focus' ? parseInt(document.getElementById('pomo-focus-min')?.value || 25)
             : mode === 'short' ? parseInt(document.getElementById('pomo-short-min')?.value || 5)
             :                    parseInt(document.getElementById('pomo-long-min')?.value  || 15);

  App.runtime.pomoTimeLeft  = mins * 60;
  App.runtime.pomoTotalTime = mins * 60;

  document.querySelectorAll('.pomo-mode').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const labelEl = document.getElementById('pomo-session-label');
  if (labelEl) labelEl.textContent = mode === 'focus'
    ? `Session ${App.state.pomo.sessionsToday + 1}`
    : (mode === 'short' ? 'Short Break' : 'Long Break');

  const toggleBtn = document.getElementById('pomo-toggle-btn');
  if (toggleBtn) toggleBtn.innerHTML =
    '<i class="fas fa-play" id="pomo-toggle-icon"></i><span id="pomo-toggle-text">Start</span>';

  document.getElementById('pomo-label')?.setAttribute && void 0;
  updatePomoDisplay();
}

function togglePomodoro() {
  if (App.runtime.pomoRunning) {
    pausePomodoro();
  } else {
    startPomodoro();
  }
}

function startPomodoro() {
  App.runtime.pomoRunning = true;
  document.getElementById('pomo-toggle-text')?.textContent && (document.getElementById('pomo-toggle-text').textContent = 'Pause');
  const icon = document.getElementById('pomo-toggle-icon');
  if (icon) icon.className = 'fas fa-pause';

  App.runtime.pomoInterval = setInterval(() => {
    App.runtime.pomoTimeLeft--;
    updatePomoDisplay();

    if (App.runtime.pomoTimeLeft <= 0) {
      clearInterval(App.runtime.pomoInterval);
      App.runtime.pomoRunning = false;
      onPomoComplete();
    }
  }, 1000);
}

function pausePomodoro() {
  clearInterval(App.runtime.pomoInterval);
  App.runtime.pomoRunning = false;
  if (document.getElementById('pomo-toggle-text'))
    document.getElementById('pomo-toggle-text').textContent = 'Resume';
  const icon = document.getElementById('pomo-toggle-icon');
  if (icon) icon.className = 'fas fa-play';
}

function resetPomodoro() {
  clearInterval(App.runtime.pomoInterval);
  App.runtime.pomoRunning = false;
  const focusMins = parseInt(document.getElementById('pomo-focus-min')?.value || 25);
  App.runtime.pomoTimeLeft  = focusMins * 60;
  App.runtime.pomoTotalTime = focusMins * 60;
  App.runtime.pomoMode      = 'focus';

  document.querySelectorAll('.pomo-mode').forEach(b => b.classList.remove('active'));
  document.getElementById('mode-focus')?.classList.add('active');

  if (document.getElementById('pomo-toggle-text'))
    document.getElementById('pomo-toggle-text').textContent = 'Start';
  const icon = document.getElementById('pomo-toggle-icon');
  if (icon) icon.className = 'fas fa-play';

  updatePomoDisplay();
}

function skipPomodoro() {
  clearInterval(App.runtime.pomoInterval);
  App.runtime.pomoRunning = false;
  onPomoComplete();
}

function onPomoComplete() {
  if (App.runtime.pomoMode === 'focus') {
    App.state.pomo.sessionsToday++;
    const mins = parseInt(document.getElementById('pomo-focus-min')?.value || 25);
    App.state.pomo.focusMinToday += mins;

    // Log entry
    App.state.pomo.log.unshift({
      type:  'focus',
      label: App.state.pomo.currentTask || 'Focus session',
      time:  new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      mins,
    });

    fireCelebration();
    showToast(`Focus session complete! 🎉 (${mins} min)`, 'success');
    renderPomoSessionDots();

    // Auto-switch to break
    const sessionTarget = parseInt(document.getElementById('pomo-sessions-target')?.value || 4);
    const nextMode      = App.state.pomo.sessionsToday % sessionTarget === 0 ? 'long' : 'short';
    const nextBtn       = document.getElementById(`mode-${nextMode}`);
    setPomoMode(nextMode, nextBtn);
  } else {
    App.state.pomo.log.unshift({
      type:  'break',
      label: 'Break',
      time:  new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      mins:  App.runtime.pomoMode === 'short' ? 5 : 15,
    });
    showToast('Break over! Ready to focus?', 'info');
    setPomoMode('focus', document.getElementById('mode-focus'));
  }

  updatePomoStats();
  renderPomoLog();
  saveState();
}

function updatePomoDisplay() {
  const m   = Math.floor(App.runtime.pomoTimeLeft / 60);
  const s   = App.runtime.pomoTimeLeft % 60;
  setEl('pomo-display', `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`);

  const circ   = 2 * Math.PI * 88; // r=88
  const offset = (1 - App.runtime.pomoTimeLeft / App.runtime.pomoTotalTime) * circ;
  const ring   = document.getElementById('pomo-ring');
  if (ring) ring.style.strokeDashoffset = offset;
}

function updatePomoSettings() {
  const mode    = App.runtime.pomoMode;
  const focusMins = parseInt(document.getElementById('pomo-focus-min')?.value || 25);
  const shortMins = parseInt(document.getElementById('pomo-short-min')?.value || 5);
  const longMins  = parseInt(document.getElementById('pomo-long-min')?.value  || 15);
  const mins    = mode === 'focus' ? focusMins : mode === 'short' ? shortMins : longMins;
  if (!App.runtime.pomoRunning) {
    App.runtime.pomoTimeLeft  = mins * 60;
    App.runtime.pomoTotalTime = mins * 60;
    updatePomoDisplay();
  }
}

function updatePomoStats() {
  const h = Math.floor(App.state.pomo.focusMinToday / 60);
  const m = App.state.pomo.focusMinToday % 60;
  setEl('pomo-sessions-done', App.state.pomo.sessionsToday);
  setEl('pomo-focus-total', `${h}h ${m}m`);
  setEl('pomo-tasks-done', countTodayCompleted());
}

function renderPomoSessionDots() {
  const container = document.getElementById('pomo-session-dots');
  if (!container) return;
  const target = parseInt(document.getElementById('pomo-sessions-target')?.value || 4);
  const done   = App.state.pomo.sessionsToday % target;
  container.innerHTML = Array.from({ length: target }, (_, i) => {
    const cls = i < done ? 'done' : i === done && App.runtime.pomoRunning ? 'current' : '';
    return `<div class="pomo-session-dot ${cls}"></div>`;
  }).join('');
}

function renderPomoLog() {
  const container = document.getElementById('pomo-log-list');
  if (!container) return;

  const log = App.state.pomo.log.slice(0, 10);
  if (!log.length) {
    container.innerHTML = '<p class="pomo-log-empty">No sessions yet. Start your focus timer!</p>';
    return;
  }

  container.innerHTML = log.map(entry => `
    <div class="pomo-log-item">
      <div class="pli-type ${entry.type}"></div>
      <span class="pli-label">${entry.label}</span>
      <span class="pli-time">${entry.time} · ${entry.mins}m</span>
    </div>
  `).join('');
}

function populatePomoTaskSelect() {
  const sel = document.getElementById('pomo-task-select');
  if (!sel) return;

  const month = DATA.months[App.state.currentMonth];
  const week  = month?.weeks[App.state.currentWeek];
  if (!week) return;

  const opts = week.groups.flatMap(g =>
    g.tasks.map(t => {
      const key  = taskKey(App.state.currentMonth, week.id, g.title, t.title);
      const done = !!App.state.completedTasks[key];
      return done ? null : `<option value="${t.title}">${t.title}</option>`;
    }).filter(Boolean)
  );

  sel.innerHTML = '<option value="">— Select a task to focus on —</option>' + opts.join('');
  sel.onchange = () => {
    App.state.pomo.currentTask = sel.value;
    const task = week.groups.flatMap(g => g.tasks).find(t => t.title === sel.value);
    const descEl = document.getElementById('pomo-task-desc');
    if (descEl) descEl.textContent = task?.description || '';
  };
}

/* ─────────────────────────────────────────────────────
   22. ANALYTICS PAGE
───────────────────────────────────────────────────── */
function renderAnalytics() {
  // Charts are initialized by Charts.initAnalytics()
  // Called lazily when page is shown
}

/* ─────────────────────────────────────────────────────
   23. SETTINGS
───────────────────────────────────────────────────── */
function loadSettings() {
  const s = App.state;
  setInputVal('set-name',        s.userName || '');
  setInputVal('set-start-date',  s.startDate || '');
  setInputVal('set-target-role', s.targetRole || 'GenAI Engineer');
  setChecked('set-dark-mode',    s.theme === 'dark');
  setChecked('set-confetti',     s.settings.confetti);
  setChecked('set-sounds',       s.settings.sounds);
  setChecked('set-auto-open',    s.settings.autoOpenGroups);

  // Accent color dots
  document.querySelectorAll('.color-opt').forEach(el => {
    el.classList.toggle('active', el.style.background === s.accentColor ||
      el.getAttribute('onclick')?.includes(s.accentColor));
  });
}

function saveSettings() {
  App.state.userName          = document.getElementById('set-name')?.value || '';
  App.state.startDate         = document.getElementById('set-start-date')?.value || '';
  App.state.targetRole        = document.getElementById('set-target-role')?.value || '';
  App.state.settings.confetti     = document.getElementById('set-confetti')?.checked ?? true;
  App.state.settings.sounds       = document.getElementById('set-sounds')?.checked ?? false;
  App.state.settings.autoOpenGroups = document.getElementById('set-auto-open')?.checked ?? true;

  saveState();
  updateGreeting();
  updateSidebarFooter();
  showToast('Settings saved ✓', 'success');
}

function exportData() {
  const json = JSON.stringify(App.state, null, 2);
  downloadFile(`my-progress-backup-${today()}.json`, json, 'application/json');
  showToast('Data exported ✓', 'success');
}

function importData(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const parsed   = JSON.parse(e.target.result);
      App.state      = deepMerge(App.state, parsed);
      saveState();
      showToast('Data imported! Refreshing…', 'success');
      setTimeout(() => location.reload(), 1000);
    } catch {
      showToast('Invalid file format', 'warning');
    }
  };
  reader.readAsText(file);
}

function resetData() {
  if (!confirm('⚠️ Delete ALL progress? This cannot be undone.')) return;
  if (!confirm('Are you absolutely sure?')) return;
  localStorage.removeItem(STORAGE_KEY);
  showToast('Data reset. Reloading…', 'info');
  setTimeout(() => location.reload(), 800);
}

function printProgress() {
  window.print();
}

/* ─────────────────────────────────────────────────────
   24. NOTIFICATIONS
───────────────────────────────────────────────────── */
function seedNotifications() {
  if (App.state.notifications.length === 0) {
    App.state.notifications = [
      { id: 1, title: 'Welcome to My-Progress! 🎯',    body: 'Your 6-month AI mastery journey starts now.', type: 'info',    time: 'now' },
      { id: 2, title: 'Oracle Certs Available 🏆',     body: 'You have free access to 4 Oracle certifications!', type: 'success', time: 'today' },
      { id: 3, title: 'GitHub Student Pack 🎁',        body: 'Activate Copilot + $200K in free tools.', type: 'info',    time: 'today' },
    ];
  }
}

function toggleNotifications() {
  const panel   = document.getElementById('notification-panel');
  const overlay = document.getElementById('notification-overlay');
  const isOpen  = panel?.classList.contains('open');

  if (isOpen) {
    closeNotifications();
  } else {
    renderNotificationList();
    panel?.classList.add('open');
    overlay?.classList.remove('hidden');
  }
}

function closeNotifications() {
  document.getElementById('notification-panel')?.classList.remove('open');
  document.getElementById('notification-overlay')?.classList.add('hidden');
}

function renderNotificationList() {
  const container = document.getElementById('notif-list');
  if (!container) return;

  const TYPE_COLORS = { success: 'var(--green)', info: 'var(--accent)', warning: 'var(--orange)', error: 'var(--red)' };

  container.innerHTML = App.state.notifications.map(n => `
    <div class="notif-item">
      <div class="notif-item-header">
        <div class="notif-dot-type" style="background:${TYPE_COLORS[n.type] || 'var(--text-muted)'}"></div>
        <h4>${n.title}</h4>
        <span class="notif-time">${n.time}</span>
      </div>
      <p>${n.body}</p>
    </div>
  `).join('');
}

function clearNotifications() {
  App.state.notifications = [];
  renderNotificationList();
  setEl('notif-count', '0');
  document.getElementById('notif-count')?.classList.add('hidden');
  saveState();
}

function addNotification(title, body, type = 'info') {
  App.state.notifications.unshift({ id: Date.now(), title, body, type, time: 'just now' });
  const countEl = document.getElementById('notif-count');
  if (countEl) {
    countEl.textContent = App.state.notifications.length;
    countEl.classList.remove('hidden');
  }
}

/* ─────────────────────────────────────────────────────
   25. MODAL
───────────────────────────────────────────────────── */
function openModal(title, contentHtml) {
  setEl('modal-heading', title);
  const body = document.getElementById('modal-content');
  if (body) body.innerHTML = contentHtml;
  document.getElementById('modal-backdrop')?.classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal-backdrop')?.classList.add('hidden');
}

/* ─────────────────────────────────────────────────────
   26. TOAST SYSTEM
───────────────────────────────────────────────────── */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-stack');
  if (!container) return;

  const ICONS = { success: 'fa-check', info: 'fa-info', warning: 'fa-exclamation', error: 'fa-times' };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-icon"><i class="fas ${ICONS[type] || ICONS.info}"></i></div>
    <span class="toast-msg">${message}</span>
  `;

  container.appendChild(toast);

  // Auto-remove
  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 280);
  }, 3200);
}

/* ─────────────────────────────────────────────────────
   27. SEARCH
───────────────────────────────────────────────────── */
function initSearch() {
  const input   = document.getElementById('global-search');
  const results = document.getElementById('search-results');
  if (!input || !results) return;

  input.addEventListener('input', debounce(() => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) { results.classList.add('hidden'); return; }

    const hits = [];

    // Search tasks
    DATA.months.forEach((month, mi) => {
      month.weeks.forEach(week => {
        week.groups.forEach(group => {
          group.tasks.forEach(task => {
            if (task.title.toLowerCase().includes(q) ||
                (task.description || '').toLowerCase().includes(q)) {
              hits.push({
                type: 'task',
                icon: 'fas fa-check-square',
                title: task.title,
                sub: `Month ${mi + 1} · ${week.title}`,
                action: () => { jumpToMonth(mi); showPage('daily', null); },
              });
            }
          });
        });
      });
    });

    // Search projects
    DATA.projects.forEach(p => {
      if (p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) {
        hits.push({
          type: 'project',
          icon: 'fas fa-rocket',
          title: p.title,
          sub: `Project ${p.id} · Month ${p.month}`,
          action: () => { showPage('projects', null); setTimeout(() => openProjectDrawer(p.id), 100); },
        });
      }
    });

    // Search resources
    DATA.resources.forEach(r => {
      if (r.title.toLowerCase().includes(q)) {
        hits.push({
          type: 'resource',
          icon: 'fas fa-book-open',
          title: r.title,
          sub: `${r.type} · Month ${r.month}`,
          action: () => showPage('resources', null),
        });
      }
    });

    if (!hits.length) {
      results.innerHTML = '<div style="padding:.75rem 1rem;font-size:.75rem;color:var(--text-muted)">No results found</div>';
      results.classList.remove('hidden');
      return;
    }

    results.innerHTML = hits.slice(0, 8).map((h, i) => `
      <div class="search-result-item" onclick="handleSearchResult(${i})">
        <div class="sri-icon"><i class="${h.icon}"></i></div>
        <div>
          <div class="sri-title">${h.title}</div>
          <div class="sri-sub">${h.sub}</div>
        </div>
      </div>
    `).join('');

    results.classList.remove('hidden');
    App.runtime._searchHits = hits;
  }, 200));

  // Close on outside click
  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !results.contains(e.target)) {
      results.classList.add('hidden');
    }
  });

  // ESC closes
  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') { results.classList.add('hidden'); input.blur(); }
  });
}

function handleSearchResult(idx) {
  const hit = App.runtime._searchHits?.[idx];
  if (hit?.action) hit.action();
  document.getElementById('search-results')?.classList.add('hidden');
  document.getElementById('global-search').value = '';
}

/* ─────────────────────────────────────────────────────
   28. STREAK TRACKING
───────────────────────────────────────────────────── */
function markActiveDay() {
  const todayStr = today();
  App.state.lastActiveDate = todayStr;
  updateStreak();
}

function updateStreak() {
  if (!App.state.lastActiveDate) { App.state.streak = 0; return; }

  const last = new Date(App.state.lastActiveDate);
  const now  = new Date();
  last.setHours(0,0,0,0);
  now.setHours(0,0,0,0);
  const diffDays = Math.round((now - last) / 86400000);

  if (diffDays === 0) {
    // Same day — streak maintained
    App.state.streak = Math.max(App.state.streak, 1);
  } else if (diffDays === 1) {
    // Yesterday — increment
    App.state.streak++;
    App.state.lastActiveDate = today();
  } else if (diffDays > 1) {
    // Streak broken
    App.state.streak = 0;
  }

  updateSidebarFooter();
  updateTopbarChips();
}

/* ─────────────────────────────────────────────────────
   29. KEYBOARD SHORTCUTS
───────────────────────────────────────────────────── */
function initKeyboardShortcuts() {
  document.addEventListener('keydown', e => {
    // Ignore when typing in inputs
    if (['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)) return;

    const shortcuts = {
      'd': () => showPage('dashboard', null),
      't': () => showPage('daily',     null),
      'r': () => showPage('roadmap',   null),
      'p': () => showPage('projects',  null),
      'c': () => showPage('certifications', null),
      's': () => showPage('skills',    null),
      'j': () => showPage('journal',   null),
      'f': () => showPage('pomodoro',  null),
      '/': () => document.getElementById('global-search')?.focus(),
    };

    if (e.key === 'Escape') {
      closeModal();
      closeProjectDrawer();
      closeNotifications();
      document.getElementById('search-results')?.classList.add('hidden');
    }

    if (!e.ctrlKey && !e.metaKey && !e.altKey && shortcuts[e.key]) {
      shortcuts[e.key]();
    }
  });
}

/* ─────────────────────────────────────────────────────
   30. CELEBRATION
───────────────────────────────────────────────────── */
function fireCelebration(big = false) {
  if (!App.state.settings.confetti) return;
  if (typeof confetti === 'undefined') return;

  if (big) {
    confetti({ particleCount: 120, spread: 100, origin: { y: 0.6 },
      colors: ['#2563eb','#3b82f6','#60a5fa','#10b981','#f59e0b'] });
    setTimeout(() => confetti({ particleCount: 60, spread: 70,
      origin: { y: 0.7 }, angle: 60 }), 250);
    setTimeout(() => confetti({ particleCount: 60, spread: 70,
      origin: { y: 0.7 }, angle: 120 }), 400);
  } else {
    confetti({ particleCount: 30, spread: 55, origin: { y: 0.8 },
      colors: ['#2563eb','#3b82f6','#60a5fa'] });
  }
}

/* ─────────────────────────────────────────────────────
   31. COUNTER & PROGRESS HELPERS
───────────────────────────────────────────────────── */
function countAllTasks() {
  let total = 0, done = 0;
  DATA.months.forEach((month, mi) => {
    month.weeks.forEach(week => {
      week.groups.forEach(group => {
        group.tasks.forEach(task => {
          total++;
          const key = taskKey(mi, week.id, group.title, task.title);
          if (App.state.completedTasks[key]) done++;
        });
      });
    });
  });
  // Projects
  DATA.projects.forEach(proj => {
    (proj.checklist || []).forEach((_, i) => {
      total++;
      const ps = App.state.projectProgress[proj.id];
      if (ps?.tasks?.[i]) done++;
    });
  });
  return { total, done };
}

function countMonthTasks(monthIdx) {
  let total = 0, done = 0;
  const month = DATA.months[monthIdx];
  if (!month) return { total, done };
  month.weeks.forEach(week => {
    week.groups.forEach(group => {
      group.tasks.forEach(task => {
        total++;
        const key = taskKey(monthIdx, week.id, group.title, task.title);
        if (App.state.completedTasks[key]) done++;
      });
    });
  });
  return { total, done };
}

function countGroupTasks(monthIdx, week, group) {
  let total = 0, done = 0;
  group.tasks.forEach(task => {
    total++;
    const key = taskKey(monthIdx, week.id, group.title, task.title);
    if (App.state.completedTasks[key]) done++;
  });
  return { total, done };
}

function calcMonthProgress(monthIdx) {
  const { total, done } = countMonthTasks(monthIdx);
  return total > 0 ? Math.round((done / total) * 100) : 0;
}

function calcWeekProgress(monthIdx, weekIdx) {
  const week = DATA.months[monthIdx]?.weeks[weekIdx];
  if (!week) return 0;
  let total = 0, done = 0;
  week.groups.forEach(group => {
    group.tasks.forEach(task => {
      total++;
      const key = taskKey(monthIdx, week.id, group.title, task.title);
      if (App.state.completedTasks[key]) done++;
    });
  });
  return total > 0 ? Math.round((done / total) * 100) : 0;
}

function calcProjectState(proj) {
  const state = App.state.projectProgress[proj.id] || {};
  const total = (proj.checklist || []).length;
  const done  = Object.values(state.tasks || {}).filter(Boolean).length;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;
  return { total, done, pct };
}

function countCertsEarned() {
  return DATA.certifications.filter(c => App.state.certEarned[c.id]).length;
}

function countTodayCompleted() {
  const todayStr = today();
  // Approximate: count tasks completed today via journal/pomo log
  return App.state.pomo.sessionsToday || 0;
}

function refreshAllCounters() {
  updateSidebarFooter();
  updateTopbarChips();
  renderKPIs();
  renderJourneyPhases();
  renderFocusTasks();
  updateNavBadge('daily');
  updateNavBadge('projects');
}

function updateNavBadge(page) {
  if (page === 'daily') {
    const { done, total } = countMonthTasks(App.state.currentMonth);
    const remaining = total - done;
    const el = document.getElementById('nav-badge-daily');
    if (el) {
      el.textContent = remaining > 0 ? remaining : '';
    }
  }
}

/* ─────────────────────────────────────────────────────
   32. KEY HELPERS
───────────────────────────────────────────────────── */
function taskKey(monthIdx, weekId, groupTitle, taskTitle) {
  // Stable key format: m{month}-w{week}-{group}-{task}
  const safeGroup = groupTitle.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 20);
  const safeTask  = taskTitle.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 30);
  return `m${monthIdx}-w${weekId}-${safeGroup}-${safeTask}`;
}

function escKey(str)   { return encodeURIComponent(str); }
function unescKey(str) { return decodeURIComponent(str); }

/* ─────────────────────────────────────────────────────
   33. DOM UTILITIES
───────────────────────────────────────────────────── */
function setEl(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setWidth(id, pct) {
  const el = document.getElementById(id);
  if (el) el.style.width = `${Math.min(Math.max(pct, 0), 100)}%`;
}

function setInputVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val;
}

function setChecked(id, val) {
  const el = document.getElementById(id);
  if (el) el.checked = !!val;
}

/* ─────────────────────────────────────────────────────
   34. GENERAL UTILITIES
───────────────────────────────────────────────────── */
function today() {
  return new Date().toISOString().split('T')[0];
}

function debounce(fn, delay) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
}

function downloadFile(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/* ─────────────────────────────────────────────────────
   35. EXPOSE GLOBALS
   (functions called via onclick="..." in HTML)
───────────────────────────────────────────────────── */
Object.assign(window, {
  // Navigation
  showPage, toggleSidebar, jumpToMonth,
  filterRoadmap, filterProjects, filterResources,
  selectMonthDetail, switchWeek, prevMonth, nextMonth, jumpToCurrentMonth,

  // Theme
  toggleTheme, setAccent,

  // Tasks
  toggleTask, quickToggleTask, toggleGroup, saveNotes,

  // Projects
  openProjectDrawer, closeProjectDrawer, toggleProjectTask, saveProjectLink,

  // Certifications
  toggleCert,

  // Skills
  updateSkill, exportSkills,

  // Journal
  openJournalEditor, closeJournalEditor, saveJournalEntry, pickMood, renderJournal,

  // Pomodoro
  setPomoMode, togglePomodoro, resetPomodoro, skipPomodoro, updatePomoSettings,

  // Notifications
  toggleNotifications, closeNotifications, clearNotifications,

  // Modal
  openModal, closeModal,

  // Settings
  saveSettings, exportData, importData, resetData, printProgress,

  // Search
  handleSearchResult,
});
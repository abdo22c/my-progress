/* =====================================================
   MY-PROGRESS | AI Mastery Tracker
   charts.js — All Chart.js Visualizations
   ===================================================== */

'use strict';

/* ─────────────────────────────────────────────────────
   CHARTS NAMESPACE
───────────────────────────────────────────────────── */
const Charts = (() => {

  /* ── Registry of all active Chart.js instances ── */
  const registry = {};

  /* ─────────────────────────────────────────────────
     THEME HELPERS
     Get colors that match current light/dark theme
  ───────────────────────────────────────────────────*/
  function theme() {
    const dark = document.documentElement.getAttribute('data-theme') !== 'light';
    return {
      isDark:       dark,
      textPrimary:  dark ? '#e8eef8'             : '#0f172a',
      textSecondary:dark ? '#8a9bb8'             : '#475569',
      textMuted:    dark ? '#4a5870'             : '#94a3b8',
      grid:         dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
      border:       dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)',
      cardBg:       dark ? '#101827'             : '#ffffff',
      inputBg:      dark ? '#0f1929'             : '#f1f5f9',

      // Brand colors (same in both themes)
      blue:   '#2563eb',
      blue2:  '#3b82f6',
      blue3:  '#60a5fa',
      green:  '#10b981',
      orange: '#f59e0b',
      red:    '#ef4444',
      purple: '#8b5cf6',
      cyan:   '#06b6d4',
      pink:   '#ec4899',

      // Gradient arrays for datasets
      blueAlpha:   (a) => `rgba(37,99,235,${a})`,
      greenAlpha:  (a) => `rgba(16,185,129,${a})`,
      orangeAlpha: (a) => `rgba(245,158,11,${a})`,
      purpleAlpha: (a) => `rgba(139,92,246,${a})`,
      redAlpha:    (a) => `rgba(239,68,68,${a})`,
      cyanAlpha:   (a) => `rgba(6,182,212,${a})`,
    };
  }

  /* ─────────────────────────────────────────────────
     GLOBAL CHART DEFAULTS
  ───────────────────────────────────────────────────*/
  function applyGlobalDefaults() {
    const t = theme();
    Chart.defaults.font.family   = "'Inter', -apple-system, sans-serif";
    Chart.defaults.font.size     = 11;
    Chart.defaults.color         = t.textSecondary;
    Chart.defaults.borderColor   = t.border;
    Chart.defaults.animation.duration = 600;
    Chart.defaults.animation.easing   = 'easeInOutQuart';
    Chart.defaults.plugins.legend.display = false;
    Chart.defaults.plugins.tooltip.backgroundColor = t.cardBg;
    Chart.defaults.plugins.tooltip.titleColor       = t.textPrimary;
    Chart.defaults.plugins.tooltip.bodyColor        = t.textSecondary;
    Chart.defaults.plugins.tooltip.borderColor      = t.border;
    Chart.defaults.plugins.tooltip.borderWidth      = 1;
    Chart.defaults.plugins.tooltip.padding          = 10;
    Chart.defaults.plugins.tooltip.cornerRadius     = 8;
    Chart.defaults.plugins.tooltip.displayColors    = true;
    Chart.defaults.plugins.tooltip.boxPadding       = 4;
  }

  /* ─────────────────────────────────────────────────
     DESTROY & RECREATE HELPER
  ───────────────────────────────────────────────────*/
  function make(id, config) {
    const canvas = document.getElementById(id);
    if (!canvas) return null;

    // Destroy existing instance
    if (registry[id]) {
      registry[id].destroy();
      delete registry[id];
    }

    const ctx = canvas.getContext('2d');
    const chart = new Chart(ctx, config);
    registry[id] = chart;
    return chart;
  }

  /* ─────────────────────────────────────────────────
     LINEAR GRADIENT HELPER
  ───────────────────────────────────────────────────*/
  function linearGradient(ctx, canvas, color1, color2, vertical = true) {
    const w = canvas.width;
    const h = canvas.height;
    const grad = vertical
      ? ctx.createLinearGradient(0, 0, 0, h)
      : ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, color1);
    grad.addColorStop(1, color2);
    return grad;
  }

  /* ─────────────────────────────────────────────────
     DATA HELPERS  (pull from App.state + DATA)
  ───────────────────────────────────────────────────*/

  /** Progress % per month (0-100) */
  function getMonthProgressData() {
    return DATA.months.map((_, i) => {
      let total = 0, done = 0;
      DATA.months[i].weeks.forEach(week => {
        week.groups.forEach(group => {
          group.tasks.forEach(task => {
            total++;
            const key = `m${i}-w${week.id}-${group.title.replace(/[^a-zA-Z0-9]/g,'_').slice(0,20)}-${task.title.replace(/[^a-zA-Z0-9]/g,'_').slice(0,30)}`;
            if (App.state.completedTasks[key]) done++;
          });
        });
      });
      return total > 0 ? Math.round((done / total) * 100) : 0;
    });
  }

  /** Weekly activity (last 7 days simulation based on state) */
  function getWeeklyActivityData() {
    const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    // Count completed tasks per day label (approximate from completedTasks keys)
    const counts = days.map((_, i) => {
      const totalKeys = Object.keys(App.state.completedTasks).length;
      // Distribute completed tasks across days heuristically
      const base = Math.floor(totalKeys / 7);
      const extra = i < (totalKeys % 7) ? 1 : 0;
      return Math.min(base + extra, 12);
    });
    return { labels: days, data: counts };
  }

  /** Skill averages per category */
  function getSkillRadarData() {
    if (!DATA.skills) return { labels: [], data: [] };
    const labels = DATA.skills.map(c => c.category);
    const data   = DATA.skills.map(cat => {
      const avg = cat.items.reduce((s, item) => {
        return s + (App.state.skillLevels[item.name] || 0);
      }, 0) / Math.max(cat.items.length, 1);
      return Math.round(avg);
    });
    return { labels, data };
  }

  /** All skill items flattened */
  function getAllSkillsData() {
    if (!DATA.skills) return { labels: [], data: [], targets: [] };
    const items = DATA.skills.flatMap(cat => cat.items);
    return {
      labels:  items.map(i => i.name),
      data:    items.map(i => App.state.skillLevels[i.name] || 0),
      targets: items.map(i => i.target || 85),
    };
  }

  /** Task category distribution */
  function getTaskCategoryData() {
    const counts = { learn: 0, build: 0, research: 0, project: 0, cert: 0, deploy: 0 };
    DATA.months.forEach(month => {
      month.weeks.forEach(week => {
        week.groups.forEach(group => {
          group.tasks.forEach(task => {
            (task.tags || []).forEach(tag => {
              if (counts[tag] !== undefined) counts[tag]++;
            });
          });
        });
      });
    });
    return {
      labels: Object.keys(counts).map(k => k.charAt(0).toUpperCase() + k.slice(1)),
      data:   Object.values(counts),
    };
  }

  /** Completion rates (done vs remaining per month) */
  function getCompletionRateData() {
    const done      = getMonthProgressData();
    const remaining = done.map(v => 100 - v);
    return {
      labels:    DATA.months.map((_, i) => `M${i + 1}`),
      done,
      remaining,
    };
  }

  /* ─────────────────────────────────────────────────
     1. DASHBOARD — ACTIVITY BAR CHART
  ───────────────────────────────────────────────────*/
  function initActivityChart() {
    const t   = theme();
    const { labels, data } = getWeeklyActivityData();

    return make('activityChart', {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label:           'Tasks Completed',
          data,
          backgroundColor: (ctx) => {
            const chart  = ctx.chart;
            const { chartArea, ctx: c } = chart;
            if (!chartArea) return t.blueAlpha(0.7);
            const grad = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            grad.addColorStop(0, t.blueAlpha(0.85));
            grad.addColorStop(1, t.blueAlpha(0.2));
            return grad;
          },
          borderColor:     t.blue2,
          borderWidth:     0,
          borderRadius:    6,
          borderSkipped:   false,
          barThickness:    22,
          hoverBackgroundColor: t.blue2,
        }],
      },
      options: {
        responsive:          true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: (items) => `${items[0].label}`,
              label: (item)  => ` ${item.raw} task${item.raw !== 1 ? 's' : ''} completed`,
            },
          },
        },
        scales: {
          x: {
            grid:  { display: false },
            ticks: { color: t.textMuted, font: { size: 11 } },
            border:{ display: false },
          },
          y: {
            beginAtZero: true,
            grid:  { color: t.grid, lineWidth: 1 },
            ticks: {
              color:     t.textMuted,
              font:      { size: 10 },
              stepSize:  2,
              callback:  (v) => v,
            },
            border:{ display: false },
          },
        },
        animation: { duration: 700, easing: 'easeOutQuart' },
      },
    });
  }

  /* ─────────────────────────────────────────────────
     2. DASHBOARD — SKILLS RADAR CHART
  ───────────────────────────────────────────────────*/
  function initRadarChart() {
    const t = theme();
    const { labels, data } = getSkillRadarData();

    return make('radarChart', {
      type: 'radar',
      data: {
        labels,
        datasets: [{
          label:           'Current Level',
          data,
          backgroundColor: t.blueAlpha(0.12),
          borderColor:     t.blue,
          borderWidth:     2,
          pointBackgroundColor: t.blue,
          pointBorderColor:     t.cardBg,
          pointBorderWidth:     2,
          pointRadius:          4,
          pointHoverRadius:     6,
          pointHoverBackgroundColor: t.blue2,
        }],
      },
      options: {
        responsive:          true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (item) => ` ${item.raw}%`,
            },
          },
        },
        scales: {
          r: {
            beginAtZero:   true,
            max:           100,
            ticks: {
              display:         false,
              stepSize:        25,
              backdropColor:   'transparent',
            },
            grid:  { color: t.grid },
            angleLines: { color: t.grid },
            pointLabels: {
              color:  t.textSecondary,
              font:   { size: 10, weight: '600', family: "'Inter',sans-serif" },
            },
          },
        },
        animation: { duration: 800, easing: 'easeOutQuart' },
      },
    });
  }

  /* ─────────────────────────────────────────────────
     3. SKILLS PAGE — HORIZONTAL BAR CHART
  ───────────────────────────────────────────────────*/
  function initSkillsBarChart() {
    const t = theme();
    const { labels, data, targets } = getAllSkillsData();

    // Show only first 12 for readability
    const maxItems = 12;
    const slicedLabels  = labels.slice(0, maxItems);
    const slicedData    = data.slice(0, maxItems);
    const slicedTargets = targets.slice(0, maxItems);

    const colors = slicedData.map(v =>
      v >= 80 ? t.green :
      v >= 60 ? t.blue2 :
      v >= 40 ? t.orange :
                t.red
    );

    return make('skillsBarChart', {
      type: 'bar',
      data: {
        labels: slicedLabels,
        datasets: [
          {
            label:           'Current Level',
            data:            slicedData,
            backgroundColor: colors.map(c => c + 'cc'),
            borderColor:     colors,
            borderWidth:     1,
            borderRadius:    4,
            borderSkipped:   false,
            barThickness:    10,
          },
          {
            label:           'Target',
            data:            slicedTargets,
            backgroundColor: t.blueAlpha(0.06),
            borderColor:     t.blueAlpha(0.25),
            borderWidth:     1,
            borderRadius:    4,
            borderSkipped:   false,
            barThickness:    10,
          },
        ],
      },
      options: {
        indexAxis:           'y',
        responsive:          true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display:  true,
            position: 'top',
            labels: {
              color:    t.textSecondary,
              font:     { size: 11 },
              boxWidth: 12,
              padding:  16,
            },
          },
          tooltip: {
            callbacks: {
              label: (item) => ` ${item.dataset.label}: ${item.raw}%`,
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            max:         100,
            grid:  { color: t.grid },
            ticks: {
              color:    t.textMuted,
              font:     { size: 9 },
              callback: (v) => `${v}%`,
            },
            border: { display: false },
          },
          y: {
            grid:  { display: false },
            ticks: {
              color: t.textSecondary,
              font:  { size: 10 },
            },
            border: { display: false },
          },
        },
        animation: { duration: 700 },
      },
    });
  }

  /* ─────────────────────────────────────────────────
     4. SKILLS PAGE — RADAR CHART (larger version)
  ───────────────────────────────────────────────────*/
  function initSkillsRadarChart2() {
    const t = theme();
    const { labels, data } = getSkillRadarData();

    // Target data (85% average)
    const targets = DATA.skills.map(cat =>
      Math.round(cat.items.reduce((s, i) => s + (i.target || 85), 0) / Math.max(cat.items.length, 1))
    );

    return make('skillsRadarChart2', {
      type: 'radar',
      data: {
        labels,
        datasets: [
          {
            label:           'Current',
            data,
            backgroundColor: t.blueAlpha(0.15),
            borderColor:     t.blue,
            borderWidth:     2,
            pointBackgroundColor: t.blue,
            pointBorderColor:     t.cardBg,
            pointBorderWidth:     2,
            pointRadius:          4,
          },
          {
            label:           'Target',
            data:            targets,
            backgroundColor: t.greenAlpha(0.05),
            borderColor:     t.greenAlpha(0.4),
            borderWidth:     1.5,
            borderDash:      [4, 4],
            pointRadius:     0,
          },
        ],
      },
      options: {
        responsive:          true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display:  true,
            position: 'bottom',
            labels: {
              color:    t.textSecondary,
              font:     { size: 11 },
              boxWidth: 12,
              padding:  14,
            },
          },
        },
        scales: {
          r: {
            beginAtZero: true,
            max:         100,
            ticks: {
              display:       false,
              stepSize:      25,
              backdropColor: 'transparent',
            },
            grid:       { color: t.grid },
            angleLines: { color: t.grid },
            pointLabels: {
              color: t.textSecondary,
              font:  { size: 10, weight: '600' },
            },
          },
        },
        animation: { duration: 800 },
      },
    });
  }

  /* ─────────────────────────────────────────────────
     5. ANALYTICS — MONTHLY PROGRESS LINE CHART
  ───────────────────────────────────────────────────*/
  function initMonthlyProgressChart() {
    const t     = theme();
    const data  = getMonthProgressData();
    const labels = DATA.months.map((_, i) => `Month ${i + 1}`);

    return make('monthlyProgressChart', {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label:           'Completion %',
            data,
            borderColor:     t.blue,
            borderWidth:     2.5,
            backgroundColor: (ctx) => {
              const chart = ctx.chart;
              const { chartArea, ctx: c } = chart;
              if (!chartArea) return t.blueAlpha(0.1);
              const grad = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
              grad.addColorStop(0, t.blueAlpha(0.3));
              grad.addColorStop(1, t.blueAlpha(0));
              return grad;
            },
            fill:            true,
            tension:         0.4,
            pointBackgroundColor: t.blue,
            pointBorderColor:     t.cardBg,
            pointBorderWidth:     2,
            pointRadius:          5,
            pointHoverRadius:     7,
          },
          {
            label:           'Target (100%)',
            data:            DATA.months.map(() => 100),
            borderColor:     t.greenAlpha(0.35),
            borderWidth:     1.5,
            borderDash:      [6, 4],
            backgroundColor: 'transparent',
            fill:            false,
            tension:         0,
            pointRadius:     0,
          },
        ],
      },
      options: {
        responsive:          true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display:  true,
            position: 'top',
            labels: {
              color:    t.textSecondary,
              font:     { size: 11 },
              boxWidth: 12,
              padding:  16,
            },
          },
          tooltip: {
            callbacks: {
              label: (item) => ` ${item.dataset.label}: ${item.raw}%`,
            },
          },
        },
        scales: {
          x: {
            grid:  { display: false },
            ticks: { color: t.textMuted, font: { size: 11 } },
            border:{ display: false },
          },
          y: {
            beginAtZero: true,
            max:         100,
            grid:        { color: t.grid },
            ticks: {
              color:    t.textMuted,
              font:     { size: 10 },
              callback: (v) => `${v}%`,
            },
            border: { display: false },
          },
        },
        interaction: { mode: 'index', intersect: false },
        animation:   { duration: 800, easing: 'easeOutQuart' },
      },
    });
  }

  /* ─────────────────────────────────────────────────
     6. ANALYTICS — TASK CATEGORY DOUGHNUT
  ───────────────────────────────────────────────────*/
  function initCategoryChart() {
    const t = theme();
    const { labels, data } = getTaskCategoryData();

    const palette = [
      t.blue, t.green, t.purple,
      t.pink, t.orange, t.cyan,
    ];

    return make('categoryChart', {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: palette.map(c => c + 'cc'),
          borderColor:     palette,
          borderWidth:     2,
          hoverOffset:     6,
        }],
      },
      options: {
        responsive:          true,
        maintainAspectRatio: false,
        cutout:              '65%',
        plugins: {
          legend: {
            display:  true,
            position: 'bottom',
            labels: {
              color:    t.textSecondary,
              font:     { size: 10 },
              boxWidth: 10,
              padding:  12,
            },
          },
          tooltip: {
            callbacks: {
              label: (item) => {
                const total = item.dataset.data.reduce((a, b) => a + b, 0);
                const pct   = total > 0 ? Math.round((item.raw / total) * 100) : 0;
                return ` ${item.label}: ${item.raw} tasks (${pct}%)`;
              },
            },
          },
        },
        animation: { duration: 700, animateRotate: true },
      },
    });
  }

  /* ─────────────────────────────────────────────────
     7. ANALYTICS — COMPLETION RATE STACKED BAR
  ───────────────────────────────────────────────────*/
  function initCompletionChart() {
    const t   = theme();
    const { labels, done, remaining } = getCompletionRateData();

    return make('completionChart', {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label:           'Completed',
            data:            done,
            backgroundColor: t.greenAlpha(0.75),
            borderColor:     t.green,
            borderWidth:     1,
            borderRadius:    { topLeft: 4, topRight: 4 },
            borderSkipped:   false,
          },
          {
            label:           'Remaining',
            data:            remaining,
            backgroundColor: t.blueAlpha(0.1),
            borderColor:     t.blueAlpha(0.2),
            borderWidth:     1,
            borderRadius:    { topLeft: 4, topRight: 4 },
            borderSkipped:   false,
          },
        ],
      },
      options: {
        responsive:          true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display:  true,
            position: 'top',
            labels: {
              color:    t.textSecondary,
              font:     { size: 11 },
              boxWidth: 12,
              padding:  14,
            },
          },
          tooltip: {
            callbacks: {
              label: (item) => ` ${item.dataset.label}: ${item.raw}%`,
            },
          },
        },
        scales: {
          x: {
            stacked: true,
            grid:    { display: false },
            ticks:   { color: t.textMuted, font: { size: 11 } },
            border:  { display: false },
          },
          y: {
            stacked:     true,
            beginAtZero: true,
            max:         100,
            grid:        { color: t.grid },
            ticks: {
              color:    t.textMuted,
              font:     { size: 10 },
              callback: (v) => `${v}%`,
            },
            border: { display: false },
          },
        },
        animation: { duration: 700 },
      },
    });
  }

  /* ─────────────────────────────────────────────────
     8. ANALYTICS — SKILL GROWTH LINE CHART
  ───────────────────────────────────────────────────*/
  function initSkillGrowthChart() {
    const t = theme();

    // Simulate skill growth data across 6 months
    // In production you'd store historical snapshots
    const months = ['M1','M2','M3','M4','M5','M6'];

    // Build lines for each skill category
    const datasets = DATA.skills.map((cat, ci) => {
      const currentAvg = Math.round(
        cat.items.reduce((s, item) => s + (App.state.skillLevels[item.name] || 0), 0)
        / Math.max(cat.items.length, 1)
      );

      // Simulate past values (ramp up to current)
      const values = months.map((_, mi) => {
        const target = currentAvg;
        const progress = mi / 5;
        return Math.round(target * progress * (0.8 + Math.random() * 0.2));
      });
      // Make last point = current
      values[values.length - 1] = currentAvg;

      const palette = [
        t.blue, t.green, t.purple,
        t.orange, t.cyan, t.pink,
      ];
      const color = palette[ci % palette.length];

      return {
        label:           cat.category,
        data:            values,
        borderColor:     color,
        borderWidth:     2,
        backgroundColor: color + '15',
        fill:            false,
        tension:         0.4,
        pointRadius:     3,
        pointHoverRadius:5,
        pointBackgroundColor: color,
        pointBorderColor:     t.cardBg,
        pointBorderWidth:     1.5,
      };
    });

    return make('skillGrowthChart', {
      type: 'line',
      data: {
        labels: months,
        datasets,
      },
      options: {
        responsive:          true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display:  true,
            position: 'right',
            labels: {
              color:    t.textSecondary,
              font:     { size: 10 },
              boxWidth: 10,
              padding:  10,
            },
          },
          tooltip: {
            mode:      'index',
            intersect: false,
            callbacks: {
              label: (item) => ` ${item.dataset.label}: ${item.raw}%`,
            },
          },
        },
        scales: {
          x: {
            grid:   { display: false },
            ticks:  { color: t.textMuted, font: { size: 11 } },
            border: { display: false },
          },
          y: {
            beginAtZero: true,
            max:         100,
            grid:        { color: t.grid },
            ticks: {
              color:    t.textMuted,
              font:     { size: 10 },
              callback: (v) => `${v}%`,
            },
            border: { display: false },
          },
        },
        interaction: { mode: 'index', intersect: false },
        animation:   { duration: 900, easing: 'easeOutQuart' },
      },
    });
  }

  /* ─────────────────────────────────────────────────
     9. UPDATE ACTIVITY CHART (period switch)
  ───────────────────────────────────────────────────*/
  function updateActivityChart() {
    const period  = document.getElementById('chart-period')?.value || 'week';
    const t       = theme();
    const chart   = registry['activityChart'];
    if (!chart) return;

    if (period === 'week') {
      const { labels, data } = getWeeklyActivityData();
      chart.data.labels = labels;
      chart.data.datasets[0].data = data;
    } else {
      // Month view — 4 weeks
      const { total, done } = (() => {
        let t2 = 0, d2 = 0;
        DATA.months.forEach((month, mi) => {
          month.weeks.forEach(week => {
            week.groups.forEach(group => {
              group.tasks.forEach(task => {
                t2++;
                const key = `m${mi}-w${week.id}-${group.title.replace(/[^a-zA-Z0-9]/g,'_').slice(0,20)}-${task.title.replace(/[^a-zA-Z0-9]/g,'_').slice(0,30)}`;
                if (App.state.completedTasks[key]) d2++;
              });
            });
          });
        });
        return { total: t2, done: d2 };
      })();

      chart.data.labels = ['Week 1','Week 2','Week 3','Week 4'];
      chart.data.datasets[0].data = [
        Math.floor(done * 0.15),
        Math.floor(done * 0.25),
        Math.floor(done * 0.35),
        done - Math.floor(done * 0.75),
      ];
    }

    chart.update('active');
  }

  /* ─────────────────────────────────────────────────
     PUBLIC API
  ───────────────────────────────────────────────────*/

  /** Initialize all dashboard charts */
  function initDashboardCharts() {
    applyGlobalDefaults();
    initActivityChart();
    initRadarChart();
  }

  /** Initialize skills page charts */
  function initSkillsCharts() {
    applyGlobalDefaults();
    initSkillsBarChart();
    initSkillsRadarChart2();
  }

  /** Initialize analytics page charts */
  function initAnalytics() {
    applyGlobalDefaults();
    initMonthlyProgressChart();
    initCategoryChart();
    initCompletionChart();
    initSkillGrowthChart();
  }

  /** Initialize all charts at startup */
  function initAll() {
    applyGlobalDefaults();

    // Dashboard charts (always visible)
    initActivityChart();
    initRadarChart();

    // Pre-init skills if canvas exists
    if (document.getElementById('skillsBarChart')) {
      initSkillsCharts();
    }
  }

  /** Re-render all active charts (called on theme toggle / skill update) */
  function updateAll() {
    applyGlobalDefaults();

    // Re-initialize each chart that has been created
    const reinitMap = {
      activityChart:       initActivityChart,
      radarChart:          initRadarChart,
      skillsBarChart:      initSkillsBarChart,
      skillsRadarChart2:   initSkillsRadarChart2,
      monthlyProgressChart:initMonthlyProgressChart,
      categoryChart:       initCategoryChart,
      completionChart:     initCompletionChart,
      skillGrowthChart:    initSkillGrowthChart,
    };

    Object.entries(reinitMap).forEach(([id, fn]) => {
      if (registry[id]) fn();
    });
  }

  /** Destroy all charts (cleanup) */
  function destroyAll() {
    Object.values(registry).forEach(chart => {
      try { chart.destroy(); } catch(e) { /* ignore */ }
    });
    Object.keys(registry).forEach(k => delete registry[k]);
  }

  /* ── Expose updateActivityChart globally ── */
  window.updateActivityChart = updateActivityChart;

  return {
    initAll,
    initDashboardCharts,
    initSkillsCharts,
    initAnalytics,
    updateAll,
    destroyAll,
    registry,
  };

})();
const projectsData = [
  {
    id: "native-kitchen",
    number: "01",
    title: "Native Kitchen Food Delivery Ecosystem",
    badge: "App + Web Duo",
    category: "ecosystem",
    platforms: ["iOS & Android App", "Next.js Web Store", "Dispatcher Console"],
    icon: "🍲",
    summary: "Full-stack regional food ordering mobile app paired with a high-converting web storefront and live kitchen KOT dispatch console.",
    features: [
      "Sub-2s UPI checkout flow across mobile and web",
      "Live rider GPS tracking with sub-100ms socket latency",
      "Over 45,000 monthly orders handled with zero lockouts"
    ],
    metrics: "Crash-free rate 99.94% · Average checkout speed 1.8s",
    stack: "Flutter · Next.js 15 · Node.js · Socket.io · PostgreSQL · Redis",
    architectureDetails: "Distributed microservices with offline SQLite synchronization on mobile and edge-cached server components for web storefront. Real-time driver telemetry streamed via geohashed Redis channels."
  },
  {
    id: "nexacommerce",
    number: "02",
    title: "NexaCommerce Headless D2C & PWA",
    badge: "Web Platform",
    category: "web",
    platforms: ["Next.js 15 App Router", "Headless Storefront", "Edge PWA"],
    icon: "🛍️",
    summary: "Sub-second headless e-commerce architecture engineered for zero layout shift, automated GST invoicing, and 1-click UPI payments.",
    features: [
      "0.6s Largest Contentful Paint on 4G cellular networks",
      "3.4x conversion uplift post-monolith migration",
      "100/100 Google Lighthouse Core Web Vitals score"
    ],
    metrics: "Page load 620ms · Lighthouse score 100/100",
    stack: "Next.js 15 · React Server Components · Tailwind · Cloudflare Workers · Stripe/Razorpay",
    architectureDetails: "Static generation with incremental static regeneration (ISR) on Cloudflare CDN edge. Headless inventory synchronization via webhook workers."
  },
  {
    id: "finpulse",
    number: "03",
    title: "FinPulse Biometric Wealth & Expense App",
    badge: "Mobile Application",
    category: "mobile",
    platforms: ["Native iOS (Swift)", "Native Android (Kotlin)", "Secure Enclave"],
    icon: "💳",
    summary: "Fintech mobile application featuring biometric passkeys, real-time portfolio tracking, and instant automated bank reconciliation.",
    features: [
      "Biometric passkeys with Apple Secure Enclave isolation",
      "Bank-grade KYC onboarding completed under 45 seconds",
      "Zero downtime ledger synchronization cycles"
    ],
    metrics: "Hardware biometric auth <200ms · 60fps animations",
    stack: "Swift · Kotlin · Go Microservices · SQLite Vault · AES-256 GCM",
    architectureDetails: "Native hardware crypto bindings for encrypted local vaults, syncing with distributed append-only ledger backend via bidirectional gRPC."
  },
  {
    id: "gotaxi-fleet",
    number: "04",
    title: "GoTaxi Ride-Hailing Apps & Command Grid",
    badge: "App + Web Duo",
    category: "ecosystem",
    platforms: ["Passenger App", "Driver App", "Web Command Fleet Center"],
    icon: "🚕",
    summary: "High-concurrency ride hailing platform spanning dual mobile apps and an operations web dashboard with real-time surge pricing.",
    features: [
      "Real-time driver telemetry with dynamic surge pricing",
      "Automated split driver payout calculation",
      "Offline trip recovery and packet replay cache"
    ],
    metrics: "Nearest driver geo-query <120ms · 99.98% uptime",
    stack: "Flutter · React Web Admin · Mapbox GL · Redis Geo · Google Maps API",
    architectureDetails: "Geospatial indexing with Redis clustered geo-queries, sub-second routing matrix computation, and fault-tolerant trip session state machines."
  },
  {
    id: "buildflow-erp",
    number: "05",
    title: "BuildFlow Cloud ERP & Operations Portal",
    badge: "Web Platform",
    category: "web",
    platforms: ["Enterprise Web App", "Cloud ERP", "BI Analytics Dashboard"],
    icon: "📊",
    summary: "Enterprise cloud ERP and workflow automation application replacing spreadsheets with live GST billing, warehouse inventory alerts, and RBAC permissions.",
    features: [
      "Multi-branch inventory matrix with automated re-orders",
      "Automated GST billing, invoices, and accounting ledgers",
      "Handles 500k+ SKU rows smoothly without UI stutter"
    ],
    metrics: "500k+ SKUs rendered in virtual table <80ms",
    stack: "Next.js 15 · TypeScript · PostgreSQL · Prisma ORM · Supabase RBAC",
    architectureDetails: "Virtual scrolling data grid with column-level sorting and filtering pushed down to PostgreSQL indexes. Role-based access control enforced at database layer."
  },
  {
    id: "medicare-telehealth",
    number: "06",
    title: "MediCare+ Telehealth App & Clinic Console",
    badge: "App + Web Duo",
    category: "ecosystem",
    platforms: ["iOS & Android App", "Doctor Web Cockpit", "WebRTC Video"],
    icon: "🩺",
    summary: "Patient mobile application for booking consultations and medicines, paired with a web console for doctors to conduct encrypted video calls.",
    features: [
      "Ultra-low latency HD video calls with adaptive packet fallbacks",
      "Encrypted e-prescriptions with digital verification",
      "99.99% video uptime SLA during morning clinic queues"
    ],
    metrics: "WebRTC peer connection <400ms · End-to-end encrypted",
    stack: "React Native · Next.js · WebRTC · Node.js Signaling · S3 Encrypted",
    architectureDetails: "SFU video routing with dynamic bitrate adaptation, combined with HIPAA-compliant encrypted document exchange via signed short-lived URLs."
  },
  {
    id: "sterline-field",
    number: "07",
    title: "Sterline Workforce GPS & Attendance App",
    badge: "Mobile Application",
    category: "mobile",
    platforms: ["Android Foreground Service", "iOS Location SDK", "Offline Sync"],
    icon: "📍",
    summary: "Battery-optimized field sales and workforce mobile application with geofenced selfie attendance and automated travel reimbursement calculation.",
    features: [
      "Battery-safe background GPS with under 4% daily impact",
      "Geofenced face validation selfie attendance check",
      "Offline route queue with automated conflict resolution"
    ],
    metrics: "Under 4% battery usage for 10 hours continuous tracking",
    stack: "Kotlin & Swift Native Location SDK · Flutter · Mapbox Telemetry",
    architectureDetails: "Hardware pedometer and accelerometer wake-up gates preventing unnecessary GPS chip polling. Location coordinates batch-compressed and synced upon network return."
  },
  {
    id: "learnsphere-lms",
    number: "08",
    title: "LearnSphere EdTech Mobile App & Academy",
    badge: "Mobile Application",
    category: "mobile",
    platforms: ["iOS & Android", "Offline DRM Video", "Web Classroom"],
    icon: "🎓",
    summary: "Interactive mobile learning application and responsive web academy featuring encrypted offline video downloads and automated test evaluation.",
    features: [
      "Encrypted offline video downloads with hardware DRM",
      "Live interactive doubt rooms with low-latency polling",
      "Instant verifiable completion certificates"
    ],
    metrics: "Adaptive HLS streaming · 99.95% uptime during mock tests",
    stack: "Flutter · Next.js · Cloudflare Stream · PostgreSQL · WebSocket",
    architectureDetails: "HLS adaptive bitrate streaming with AES-128 segment decryption in secure storage, paired with an event-driven quiz submission queue."
  }
];

function toggleMobileNav() {
  const menu = document.getElementById("mobileNavMenu");
  if (menu) {
    menu.classList.toggle("hidden");
  }
}

function closeMobileNav() {
  const menu = document.getElementById("mobileNavMenu");
  if (menu) {
    menu.classList.add("hidden");
  }
}

function selectInfrastructure(buttonEl, serviceName) {
  const container = document.getElementById("buildTypeContainer");
  if (!container) return;
  const buttons = container.querySelectorAll(".type-select-btn");
  buttons.forEach(btn => btn.classList.remove("active"));
  buttonEl.classList.add("active");
  const hiddenInput = document.getElementById("selectedService");
  if (hiddenInput) {
    hiddenInput.value = serviceName;
  }
}

function toggleModuleChip(chipEl) {
  chipEl.classList.toggle("active");
  if (chipEl.textContent.startsWith("✓")) {
    chipEl.textContent = chipEl.textContent.replace("✓", "+");
  } else if (chipEl.textContent.startsWith("+")) {
    chipEl.textContent = chipEl.textContent.replace("+", "✓");
  }
}

function getSelectedModules() {
  const chips = document.querySelectorAll(".chip-tag.active");
  const modules = [];
  chips.forEach(chip => {
    modules.push(chip.textContent.replace("✓", "").trim());
  });
  return modules.join(", ");
}

async function handleHeroSubmit(event) {
  event.preventDefault();
  const submitBtn = document.getElementById("leadSubmitBtn");
  const errorBanner = document.getElementById("formErrorBanner");
  if (errorBanner) {
    errorBanner.classList.add("hidden");
    errorBanner.textContent = "";
  }

  const name = (document.getElementById("leadName").value || "").trim();
  const email = (document.getElementById("leadEmail").value || "").trim();
  const phone = (document.getElementById("leadPhone").value || "").trim();
  const message = (document.getElementById("leadMessage") ? document.getElementById("leadMessage").value : "").trim();
  const serviceInput = document.getElementById("selectedService");
  const service = serviceInput ? serviceInput.value : "Mobile App (iOS/Android)";
  const modules = getSelectedModules();

  if (!name || !email || !phone) {
    if (errorBanner) {
      errorBanner.textContent = "Please fill in all required fields (Name, Email, and Phone).";
      errorBanner.classList.remove("hidden");
    }
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin w-4 h-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      <span>Architecting Brief...</span>
    `;
  }

  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        service: service,
        modules: modules,
        message: message
      })
    });

    if (response.ok) {
      const data = await response.json();
      try {
        sessionStorage.setItem("lastLeadSubmission", JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          service: service,
          modules: modules,
          message: message,
          leadId: data.lead_id || ""
        }));
      } catch (err) {}
      window.location.href = "/thank-you";
    } else {
      const errData = await response.json().catch(() => ({}));
      const msg = errData.detail || "Unable to submit your architecture brief. Please try again or chat via WhatsApp.";
      if (errorBanner) {
        errorBanner.textContent = msg;
        errorBanner.classList.remove("hidden");
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>GET FIXED ARCHITECTURE QUOTE</span>`;
      }
    }
  } catch (err) {
    if (errorBanner) {
      errorBanner.textContent = "Network error. Please check your connection and retry.";
      errorBanner.classList.remove("hidden");
    }
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>GET FIXED ARCHITECTURE QUOTE</span>`;
    }
  }
}

function initThankYouPage() {
  try {
    const rawData = sessionStorage.getItem("lastLeadSubmission");
    if (rawData) {
      const submission = JSON.parse(rawData);
      const summaryCard = document.getElementById("submissionSummaryCard");
      if (summaryCard) {
        summaryCard.classList.remove("hidden");
        const nameEl = document.getElementById("summaryName");
        const serviceEl = document.getElementById("summaryService");
        const contactEl = document.getElementById("summaryContact");
        if (nameEl) nameEl.textContent = submission.name || "-";
        if (serviceEl) serviceEl.textContent = submission.service || "-";
        if (contactEl) contactEl.textContent = `${submission.email} · ${submission.phone}`;
      }

      const waBtn = document.getElementById("directWhatsAppBtn");
      if (waBtn) {
        const text = `Hi SuflexMedia, I just submitted an architecture quote request for ${submission.service}. My name is ${submission.name} (${submission.phone}).`;
        waBtn.href = `https://wa.me/916364669858?text=${encodeURIComponent(text)}`;
      }
    }
  } catch (err) {}

  renderProjects("all");
}

function renderProjects(filterCategory) {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  const filtered = filterCategory === "all"
    ? projectsData
    : projectsData.filter(p => p.category === filterCategory);

  grid.innerHTML = filtered.map(item => `
    <article class="card-v2 p-6 flex flex-col justify-between card-v2-glow transition-all">
      <div>
        <div class="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
          <span class="text-xs font-bold text-[#2a6bff]">BUILD #${item.number}</span>
          <span class="text-[11px] px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 font-medium">${item.badge}</span>
        </div>

        <div class="flex items-center gap-3 mb-3">
          <span class="text-2xl">${item.icon}</span>
          <h3 class="font-display font-bold text-lg text-white leading-snug">${item.title}</h3>
        </div>

        <p class="text-xs text-slate-300 mb-4 leading-relaxed">${item.summary}</p>

        <div class="p-2.5 rounded-xl bg-[#0b0b0e] border border-white/5 text-[11px] text-[#2a6bff] font-mono mb-4 truncate">
          ${item.stack}
        </div>

        <ul class="space-y-2 text-xs text-slate-300 mb-5">
          ${item.features.map(f => `
            <li class="flex items-start gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-[#2a6bff] mt-1.5 shrink-0"></span>
              <span>${f}</span>
            </li>
          `).join("")}
        </ul>
      </div>

      <div class="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
        <button onclick="inspectArchitecture('${item.id}')" class="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer">
          <span>Inspect Architecture</span>
          <svg class="w-3.5 h-3.5 text-[#2a6bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
        </button>
        <a href="https://wa.me/916364669858?text=${encodeURIComponent("Hi SuflexMedia, I am interested in building a system similar to " + item.title)}" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-[#2a6bff] hover:underline flex items-center gap-1">
          <span>Build Similar</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </article>
  `).join("");
}

function filterProjects(category, btnEl) {
  const tabs = document.querySelectorAll(".tab-pill");
  tabs.forEach(t => t.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");
  renderProjects(category);
}

function inspectArchitecture(projectId) {
  const item = projectsData.find(p => p.id === projectId);
  if (!item) return;

  const content = document.getElementById("modalDetailsContent");
  if (!content) return;

  content.innerHTML = `
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="text-3xl">${item.icon}</span>
          <div>
            <h3 class="font-display font-bold text-xl text-white">${item.title}</h3>
            <span class="text-xs text-[#2a6bff] font-semibold">${item.badge} · Build #${item.number}</span>
          </div>
        </div>
      </div>

      <div class="p-3.5 rounded-xl bg-[#0b0b0e] border border-white/5 space-y-1">
        <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Performance Benchmark</div>
        <div class="text-xs text-white font-medium">${item.metrics}</div>
      </div>

      <div class="space-y-1">
        <div class="text-xs font-semibold text-slate-300">Architecture Overview</div>
        <p class="text-xs text-slate-300 leading-relaxed">${item.architectureDetails}</p>
      </div>

      <div class="space-y-1">
        <div class="text-xs font-semibold text-slate-300">Runtime &amp; Framework Matrix</div>
        <div class="p-3 rounded-xl bg-[#0b0b0e] border border-white/5 font-mono text-xs text-slate-200">
          ${item.stack}
        </div>
      </div>

      <div class="space-y-1">
        <div class="text-xs font-semibold text-slate-300">Shipped Platforms</div>
        <div class="flex flex-wrap gap-1.5">
          ${item.platforms.map(pl => `
            <span class="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-slate-200">${pl}</span>
          `).join("")}
        </div>
      </div>
    </div>
  `;

  const modal = document.getElementById("architectureModal");
  if (modal) {
    modal.classList.add("open");
  }
}

function closeArchitectureModal(event) {
  if (event.target.id === "architectureModal") {
    closeModalDirect();
  }
}

function closeModalDirect() {
  const modal = document.getElementById("architectureModal");
  if (modal) {
    modal.classList.remove("open");
  }
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModalDirect();
  }
});

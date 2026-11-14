let selectedBuildType = "Mobile App (iOS/Android)";

const caseStudiesData = {
  "native-kitchen": {
    number: "01",
    tag: "FOOD TECH ECOSYSTEM",
    title: "Native Kitchen Food Delivery App & Web Console",
    icon: "restaurant",
    summary: "Full-stack regional food ordering mobile app (iOS & Android) paired with a high-converting web ordering storefront and live kitchen KOT dispatch panel.",
    metrics: "Sub-2s UPI Checkout · 99.9% Crash-Free Mobile · Live Rider Map",
    stack: "Flutter (iOS/Android) · Next.js 15 Web · Node.js · Google Maps Socket · Razorpay",
    features: [
      "Customer & Rider Mobile Apps with sub-100ms GPS updates",
      "Next.js Web Ordering Storefront optimized for sub-second LCP",
      "Live Socket Order Tracking with zero database lockups",
      "Automated Kitchen Order Ticket (KOT) thermal printer integration"
    ]
  },
  "nexacommerce": {
    number: "02",
    tag: "D2C E-COMMERCE & PWA",
    title: "NexaCommerce Headless D2C Website & PWA",
    icon: "shopping_bag",
    summary: "Ultra-fast custom headless e-commerce website engineered for sub-second page loads, instant filtering, automated GST invoicing, and zero-commission UPI checkouts.",
    metrics: "0.6s LCP Speed · 3.4x Conversion Uplift · 100/100 Lighthouse",
    stack: "Next.js App Router · Tailwind CSS · PostgreSQL · Shiprocket & Razorpay API",
    features: [
      "0.6s Largest Contentful Paint (LCP) on 4G cellular connections",
      "Instant 1-Click UPI & Card Checkout with frictionless OTP",
      "Automated Inventory & Courier sync with Shiprocket webhooks",
      "Progressive Web App (PWA) offline product browsing"
    ]
  },
  "finpulse": {
    number: "03",
    tag: "FINTECH SECURE APP",
    title: "FinPulse Wealth, UPI & Expense Mobile App",
    icon: "account_balance_wallet",
    summary: "Consumer fintech mobile application featuring biometric passkey login, real-time portfolio telemetry, automated expense categorization, and instant UPI transfers.",
    metrics: "Biometric Passkeys · Bank-Grade KYC <45s · Zero Downtime",
    stack: "Swift Native · Kotlin · AES-256 GCM · Go Microservices · WebSockets",
    features: [
      "FaceID / Biometric Passkeys with Secure Enclave hardware isolation",
      "Instant bank-grade KYC verification completed in under 45 seconds",
      "Offline-first double-entry ledger sync with zero data collision",
      "Real-time market ticker updates over multiplexed WebSockets"
    ]
  },
  "gotaxi": {
    number: "04",
    tag: "MOBILITY COMMAND GRID",
    title: "GoTaxi Ride-Hailing Apps & Fleet Web Grid",
    icon: "local_taxi",
    summary: "High-concurrency cab, auto, and bike-taxi booking mobile apps integrated with a real-time city fleet monitoring web console and dynamic surge pricing engine.",
    metrics: "Nearest-Driver <120ms · Live Heatmap Grid · SOS Telemetry",
    stack: "Flutter · Mapbox GL · React Web Admin · Redis Geo-Index · Socket.IO",
    features: [
      "Dual Passenger & Driver Mobile Apps with background GPS beaconing",
      "Live City Heatmap Web Console for dispatchers with surge control",
      "Automated Driver Wallet Split with instant UPI payouts",
      "Emergency SOS trip telemetry streamed to security monitors"
    ]
  },
  "buildflow": {
    number: "05",
    tag: "ENTERPRISE CLOUD SAAS",
    title: "BuildFlow Cloud ERP & Multi-Branch Web Portal",
    icon: "domain",
    summary: "Enterprise browser-based ERP and workflow automation web application replacing fragmented spreadsheets with live GST billing, warehouse stock alerts, and role permissions.",
    metrics: "Handles 500k+ SKU Rows · RBAC Access Control · Daily S3 Backup",
    stack: "Next.js 15 · TypeScript · PostgreSQL · Prisma · Docker",
    features: [
      "Multi-Branch Inventory Matrix handling 500k+ SKU rows with zero lag",
      "Automated GST E-Invoicing and ledger accounting reconciliation",
      "Role-Based Access Control (RBAC) across 500+ employee tiers",
      "Geo-replicated daily automated database backups with point-in-time recovery"
    ]
  },
  "medicare": {
    number: "06",
    tag: "TELEHEALTH ECOSYSTEM",
    title: "MediCare+ Telemedicine App & Clinic Web Portal",
    icon: "medical_services",
    summary: "Patient mobile application for booking specialist consultations and ordering medicines, paired with a dedicated web portal for doctors to conduct HD video calls and issue digital prescriptions.",
    metrics: "Ultra-low Latency Video · Encrypted E-Prescriptions · 99.99% Uptime",
    stack: "WebRTC · React Native · Next.js Doctor Portal · HIPAA-Ready Cloud Vault",
    features: [
      "Peer-to-peer HD video telehealth calling with packet fallback codec",
      "Doctor web prescription cockpit with automated drug interaction alerts",
      "Encrypted patient health vault with digital biometric signatures",
      "Automated WhatsApp & SMS reminders for consultation slots"
    ]
  }
};

function toggleMobileNav() {
  const menu = document.getElementById("mobileNavMenu");
  const icon = document.getElementById("mobileMenuIcon");
  if (!menu || !icon) return;

  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
    icon.textContent = "close";
  } else {
    menu.classList.add("hidden");
    icon.textContent = "menu";
  }
}

function closeMobileNav() {
  const menu = document.getElementById("mobileNavMenu");
  const icon = document.getElementById("mobileMenuIcon");
  if (menu) menu.classList.add("hidden");
  if (icon) icon.textContent = "menu";
}

function selectBuildType(btn, typeName) {
  selectedBuildType = typeName;
  document.querySelectorAll(".hero-type-btn").forEach((b) => {
    b.classList.remove("active", "bg-slateElevated", "text-brandLime", "border-brandLime");
    b.classList.add("bg-obsidian", "text-slate-400");
  });
  btn.classList.add("active", "bg-slateElevated", "text-brandLime", "border-brandLime");
  btn.classList.remove("bg-obsidian", "text-slate-400");
}

function toggleHeroChip(btn) {
  if (btn.classList.contains("active")) {
    btn.classList.remove("active", "bg-brandIndigo/20", "text-indigo-300", "border-brandIndigo/50");
    btn.classList.add("bg-obsidian", "text-slate-400");
  } else {
    btn.classList.add("active", "bg-brandIndigo/20", "text-indigo-300", "border-brandIndigo/50");
    btn.classList.remove("bg-obsidian", "text-slate-400");
  }
}

async function submitHeroLead(event) {
  event.preventDefault();
  const feedback = document.getElementById("heroLeadFeedback");
  const submitBtn = document.getElementById("heroLeadSubmitBtn");
  const name = document.getElementById("leadName").value.trim();
  const email = document.getElementById("leadEmail").value.trim();
  const phone = document.getElementById("leadPhone").value.trim();

  const selectedChips = Array.from(document.querySelectorAll("#heroModuleChips .hero-chip.active"))
    .map((el) => el.textContent.replace("✓", "").replace("+", "").trim())
    .join(", ");

  const payload = {
    name: name,
    email: email,
    phone: phone,
    service: selectedBuildType,
    budget: "Custom Scope",
    message: `Selected Modules: ${selectedChips}`
  };

  submitBtn.disabled = true;
  submitBtn.classList.add("opacity-60");
  submitBtn.innerHTML = `<span>DISPATCHING BRIEF...</span>`;

  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (res.ok) {
      feedback.classList.remove("hidden", "text-red-400", "border-red-400/40", "bg-red-950/20");
      feedback.classList.add("text-brandLime", "border-brandLime/40", "bg-brandLime/15");
      feedback.textContent = data.message || "Architecture Brief Logged! Our engineering lead will contact you within 4 hours.";
      document.getElementById("heroLeadForm").reset();
    } else {
      feedback.classList.remove("hidden", "text-brandLime", "border-brandLime/40", "bg-brandLime/15");
      feedback.classList.add("text-red-400", "border-red-400/40", "bg-red-950/20");
      feedback.textContent = data.detail?.[0]?.msg || "Submission failed. Please check inputs and retry.";
    }
  } catch (err) {
    feedback.classList.remove("hidden", "text-brandLime", "border-brandLime/40", "bg-brandLime/15");
    feedback.classList.add("text-red-400", "border-red-400/40", "bg-red-950/20");
    feedback.textContent = "Network error. Please verify your connection or message us via WhatsApp.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.classList.remove("opacity-60");
    submitBtn.innerHTML = `<span>GET FIXED ARCHITECTURE QUOTE</span><span class="material-symbols-outlined text-base">arrow_forward</span>`;
  }
}

function filterShowcase(category, btn) {
  document.querySelectorAll(".showcase-tab").forEach((tab) => {
    tab.classList.remove("active", "text-brandLime", "bg-slateElevated", "tech-border", "font-semibold");
    tab.classList.add("text-slate-400");
  });
  btn.classList.add("active", "text-brandLime", "bg-slateElevated", "tech-border", "font-semibold");
  btn.classList.remove("text-slate-400");

  const cards = document.querySelectorAll(".showcase-card");
  cards.forEach((card) => {
    const cardCat = card.getAttribute("data-category");
    if (category === "all" || cardCat === category) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
}

function inspectCaseStudy(studyId) {
  const item = caseStudiesData[studyId];
  if (!item) return;

  const content = document.getElementById("caseStudyContent");
  content.innerHTML = `
    <div class="space-y-5 sm:space-y-6">
      <div class="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-slateStroke">
        <div class="flex items-center gap-2.5 sm:gap-3">
          <div class="w-10 h-10 rounded-xl bg-slateElevated tech-border flex items-center justify-center text-brandLime shrink-0">
            <span class="material-symbols-outlined text-lg sm:text-xl">${item.icon}</span>
          </div>
          <div>
            <span class="font-mono text-[9px] sm:text-[10px] uppercase text-brandLime font-bold tracking-wider">${item.tag} · BUILD #${item.number}</span>
            <h3 class="font-display font-extrabold text-lg sm:text-2xl text-white mt-0.5 leading-snug">${item.title}</h3>
          </div>
        </div>
      </div>
      <p class="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">${item.summary}</p>
      <div class="p-3.5 sm:p-4 rounded-xl bg-obsidian tech-border font-mono text-xs text-brandCyan">
        <div class="text-[9px] sm:text-[10px] uppercase text-slate-500 mb-1">PROVEN METRICS &amp; SLA</div>
        <div class="text-slate-200 font-bold">${item.metrics}</div>
      </div>
      <div>
        <div class="font-mono text-[11px] sm:text-xs uppercase text-slate-400 mb-2">SHIPPED ARCHITECTURAL MODULES</div>
        <div class="space-y-2">
          ${item.features.map((f) => `
            <div class="flex items-center gap-2 p-2.5 sm:p-3 rounded-lg bg-obsidian tech-border font-sans text-xs text-slate-200">
              <span class="w-1.5 h-1.5 rounded-full bg-brandLime shrink-0"></span>
              <span>${f}</span>
            </div>
          `).join("")}
        </div>
      </div>
      <div class="p-3 sm:p-3.5 rounded-xl bg-obsidian tech-border font-mono text-[11px] sm:text-xs">
        <span class="text-slate-500 block mb-1">VERIFIED PRODUCTION STACK:</span>
        <span class="text-slate-300">${item.stack}</span>
      </div>
      <div class="pt-3.5 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 border-t border-slateStroke">
        <button onclick="closeCaseStudyModal()" class="min-h-[44px] px-4 py-2 rounded-xl bg-slateElevated tech-border text-slate-300 font-mono text-xs hover:text-white cursor-pointer">
          Close
        </button>
        <button onclick="closeCaseStudyModal(); quickScopeModal('Build Similar: ' + '${item.title}')" class="min-h-[44px] px-5 py-2.5 rounded-xl bg-brandLime text-obsidian font-display font-bold text-xs uppercase tracking-wider hover:bg-lime-300 transition-all cursor-pointer">
          Build Similar System →
        </button>
      </div>
    </div>
  `;

  const modal = document.getElementById("caseStudyModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeCaseStudyModal() {
  const modal = document.getElementById("caseStudyModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

function quickScopeModal(serviceTitle) {
  document.getElementById("modalServiceTag").textContent = serviceTitle.toUpperCase();
  document.getElementById("modalServiceInput").value = serviceTitle;
  document.getElementById("modalTitle").textContent = "Request Architecture Quote";
  document.getElementById("modalFeedback").classList.add("hidden");

  const modal = document.getElementById("quickModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeQuickModal() {
  const modal = document.getElementById("quickModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

async function submitModalLead(event) {
  event.preventDefault();
  const feedback = document.getElementById("modalFeedback");
  const submitBtn = document.getElementById("modalSubmitBtn");
  const name = document.getElementById("modalName").value.trim();
  const email = document.getElementById("modalEmail").value.trim();
  const phone = document.getElementById("modalPhone").value.trim();
  const service = document.getElementById("modalServiceInput").value;
  const notes = document.getElementById("modalNotes").value.trim();

  const payload = {
    name: name,
    email: email,
    phone: phone,
    service: service,
    budget: "Fixed Quote Request",
    message: notes
  };

  submitBtn.disabled = true;
  submitBtn.classList.add("opacity-60");
  submitBtn.innerHTML = `<span>DISPATCHING...</span>`;

  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (res.ok) {
      feedback.classList.remove("hidden", "text-red-400", "border-red-400/40", "bg-red-950/20");
      feedback.classList.add("text-brandLime", "border-brandLime/40", "bg-brandLime/15");
      feedback.textContent = data.message || "Brief received! Our engineering lead will follow up in 24 hours.";
      document.getElementById("modalForm").reset();
      setTimeout(() => {
        closeQuickModal();
      }, 2500);
    } else {
      feedback.classList.remove("hidden", "text-brandLime", "border-brandLime/40", "bg-brandLime/15");
      feedback.classList.add("text-red-400", "border-red-400/40", "bg-red-950/20");
      feedback.textContent = data.detail?.[0]?.msg || "Submission failed. Please check inputs.";
    }
  } catch (err) {
    feedback.classList.remove("hidden", "text-brandLime", "border-brandLime/40", "bg-brandLime/15");
    feedback.classList.add("text-red-400", "border-red-400/40", "bg-red-950/20");
    feedback.textContent = "Network error. Please try again.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.classList.remove("opacity-60");
    submitBtn.innerHTML = `<span>SUBMIT ARCHITECTURE BRIEF</span><span class="material-symbols-outlined text-sm">send</span>`;
  }
}

function updateEstimator() {
  const slider = document.getElementById("complexitySlider");
  const label = document.getElementById("complexityLabel");
  const delivery = document.getElementById("deliveryWindow");
  const mobile = document.getElementById("estMobileCheck").checked;
  const web = document.getElementById("estWebCheck").checked;
  const admin = document.getElementById("estAdminCheck").checked;

  const val = parseInt(slider.value, 10);
  let baseDelivery = "4 — 6 Weeks";
  let baseLabel = "PRODUCTION CORE (APPS + BACKEND)";

  if (val === 1) {
    baseLabel = "LIGHTWEIGHT MVP (PROTOTYPE LAUNCH)";
    baseDelivery = "3 — 4 Weeks";
  } else if (val === 2) {
    baseLabel = "PRODUCTION CORE (APPS + BACKEND)";
    baseDelivery = "4 — 6 Weeks";
  } else if (val === 3) {
    baseLabel = "ENTERPRISE SCALE (HIGH-CONCURRENCY SAAS)";
    baseDelivery = "8 — 12 Weeks";
  }

  if (mobile && web && admin) {
    if (val === 1) baseDelivery = "4 — 5 Weeks";
    if (val === 2) baseDelivery = "6 — 8 Weeks";
    if (val === 3) baseDelivery = "10 — 14 Weeks";
  }

  label.textContent = baseLabel;
  delivery.textContent = baseDelivery;
}

window.toggleMobileNav = toggleMobileNav;
window.closeMobileNav = closeMobileNav;
window.selectBuildType = selectBuildType;
window.toggleHeroChip = toggleHeroChip;
window.submitHeroLead = submitHeroLead;
window.filterShowcase = filterShowcase;
window.inspectCaseStudy = inspectCaseStudy;
window.closeCaseStudyModal = closeCaseStudyModal;
window.quickScopeModal = quickScopeModal;
window.closeQuickModal = closeQuickModal;
window.submitModalLead = submitModalLead;
window.updateEstimator = updateEstimator;

/***********************
 * Simple Blood Donor App (LocalStorage)
 ***********************/

// --- Locations
const LOCATIONS = ["Mangaluru", "Karkala", "Udupi", "Puttur", "Bantwal", "Moodbidri", "Belthangady", "Mulki"];

// --- Helpers
const $ = (q) => document.querySelector(q);
const el = (tag, cls) => { const n = document.createElement(tag); if (cls) n.className = cls; return n; };
const nowISO = () => new Date().toISOString();

// --- Fill location selects
function fillLocationSelects() {
  const selects = [$("#f_location"), $("#d_home"), $("#d_coverage")];
  selects.forEach(sel => {
    sel.innerHTML = "";
    LOCATIONS.forEach(loc => {
      const opt = document.createElement("option");
      opt.value = loc;
      opt.textContent = loc;
      sel.appendChild(opt);
    });
  });
}
fillLocationSelects();

// --- Tabs
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
    tab.classList.add("active");
    document.querySelector(tab.dataset.target).classList.add("active");
  });
});

// --- Storage helpers
const STORAGE_KEY = "donors_v1";
function loadDonors() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } 
  catch { return []; }
}
function saveDonors(list) { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }

// --- Seed sample donors
$("#seedBtn").addEventListener("click", () => {
  const sample = [
    { id: crypto.randomUUID(), name: "Akash Shetty", phone: "9876543210", blood: "O+", home: "Mangaluru", coverage: ["Mangaluru","Karkala","Udupi"], sick: false, availableNow: true, from: "", to: "", createdAt: nowISO() },
    { id: crypto.randomUUID(), name: "Divya Rai", phone: "9876501234", blood: "B+", home: "Karkala", coverage: ["Karkala","Moodbidri"], sick: false, availableNow: false, from: isoOffsetHours(1), to: isoOffsetHours(4), createdAt: nowISO() },
    { id: crypto.randomUUID(), name: "Nihal D", phone: "9876000001", blood: "A-", home: "Udupi", coverage: ["Udupi"], sick: true, availableNow: true, from: "", to: "", createdAt: nowISO() }
  ];
  const all = loadDonors();
  saveDonors(all.concat(sample));
  renderAdmin();
  alert("Sample donors added.");
});

// --- Clear donors
$("#clearBtn").addEventListener("click", () => {
  if(confirm("Clear all donors from this browser?")) {
    localStorage.removeItem(STORAGE_KEY);
    renderAdmin();
  }
});

// --- Time helpers
function isoOffsetHours(h){
  const t = new Date();
  t.setHours(t.getHours() + h);
  return t.toISOString().slice(0,16); // yyyy-MM-ddTHH:mm
}

// --- Default availability window
const fromInput = $("#d_from");
const toInput = $("#d_to");
const availableNow = $("#d_availableNow");
function setDefaultTimeWindow() {
  const now = new Date();
  const from = new Date(now.getTime() + 60*60*1000); // +1 hr
  const to = new Date(now.getTime() + 4*60*60*1000);   // +4 hr
  fromInput.value = from.toISOString().slice(0,16);
  toInput.value = to.toISOString().slice(0,16);
}
availableNow.addEventListener("change", () => {
  if(!availableNow.checked) setDefaultTimeWindow();
  else { fromInput.value = ""; toInput.value = ""; }
});

// --- Register donor
$("#regForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = $("#d_name").value.trim();
  const phone = $("#d_phone").value.trim();
  const blood = $("#d_blood").value;
  const home = $("#d_home").value;
  const coverage = Array.from($("#d_coverage").selectedOptions).map(o => o.value);
  if(!coverage.includes(home)) coverage.unshift(home);
  const sick = $("#d_sick").checked;
  const isAvailableNow = availableNow.checked;
  const from = fromInput.value;
  const to = toInput.value;

  if(!isAvailableNow && (!from || !to)) {
    return showRegMsg("Please set From/To times or tick 'Available Now'.", true);
  }
  if(!isAvailableNow && new Date(from) >= new Date(to)) {
    return showRegMsg("'From' must be earlier than 'To'.", true);
  }

  const donor = { id: crypto.randomUUID(), name, phone, blood, home, coverage, sick, availableNow: isAvailableNow, from, to, createdAt: nowISO() };
  const all = loadDonors();
  all.push(donor);
  saveDonors(all);

  $("#regForm").reset();
  availableNow.checked = true;
  showRegMsg("Registration saved. Thank you! ❤", false);
  renderAdmin();
});

function showRegMsg(text, isErr) {
  const box = $("#regMsg");
  box.textContent = text;
  box.style.color = isErr ? "#fca5a5" : "#86efac";
}

// --- Render admin
function renderAdmin(){
  const wrap = $("#adminList");
  const donors = loadDonors();
  wrap.innerHTML = donors.length ? "" : "<p class='muted'>No donors yet.</p>";
  donors.forEach(d => wrap.appendChild(donorCard(d,true)));
}

// --- Donor card
function donorCard(d, showMeta=false){
  const c = el("div","card");
  const title = el("div");
  title.innerHTML = `<strong>${d.name}</strong> &nbsp; <span class="badge">${d.blood}</span>`;
  const loc = el("div");
  loc.innerHTML = `<span class="badge">Home: ${d.home}</span> &nbsp; <span class="badge">Covers: ${d.coverage.join(", ")}</span>`;
  const health = el("div");
  health.innerHTML = d.sick ? `<span class="badge warn">Not fit (sick)</span>` : `<span class="badge ok">Fit to donate</span>`;
  const avail = el("div");
  avail.innerHTML = d.availableNow ? `<span class="badge ok">Available now</span>` :
    `<span class="badge">Available: ${d.from.replace("T"," ")} → ${d.to.replace("T"," ")}</span>`;
  const contact = el("div");
  contact.innerHTML = `<span class="badge">📞 ${d.phone}</span>`;
  c.append(title, loc, health, avail, contact);
  if(showMeta){
    const meta = el("div");
    meta.style.color="#94a3b8"; meta.style.fontSize="12px";
    meta.textContent = `Added: ${new Date(d.createdAt).toLocaleString()}`;
    c.appendChild(meta);
  }
  return c;
}
renderAdmin();

// --- Find donors
$("#findForm").addEventListener("submit", e => {
  e.preventDefault();
  const needBlood = $("#f_blood").value;
  const needLoc = $("#f_location").value;
  const needDateTime = $("#f_datetime").value;
  const donors = loadDonors();
  const out = $("#findResults");
  if(!needBlood || !needLoc || !needDateTime) return out.innerHTML="<p>Please select blood, location and time.</p>";

  const needTime = new Date(needDateTime);
  const matches = donors.filter(d => {
    if(d.sick) return false;
    if(d.blood !== needBlood) return false;
    if(!d.coverage.includes(needLoc)) return false;
    if(d.availableNow) return true;
    if(!d.from || !d.to) return false;
    return needTime >= new Date(d.from) && needTime <= new Date(d.to);
  });

  out.innerHTML = "";
  if(matches.length === 0){
    out.innerHTML = `<p>No matching donors for ${needBlood} at ${needLoc} on ${needDateTime.replace("T"," ")}.</p>
                     <p>Tip: ask donors to add ${needLoc} to coverage and set availability.</p>`;
  } else matches.forEach(d => out.appendChild(donorCard(d)));
});

// --- Prefill find form defaults
(function defaultFind(){
  $("#f_blood").value="O+";
  $("#f_location").value="Karkala";
  const dt = new Date(); dt.setMinutes(dt.getMinutes()+30);
  $("#f_datetime").value = dt.toISOString().slice(0,16);
})();

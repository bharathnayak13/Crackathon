// Donor storage
let donors = [];

// Blood groups
const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const cities = [
  "Mumbai","Delhi","Bengaluru","Kolkata","Chennai","Hyderabad","Pune","Ahmedabad",
  "Jaipur","Lucknow","Kanpur","Nagpur","Indore","Thane","Bhopal","Visakhapatnam",
  "Patna","Vadodara","Ghaziabad","Ludhiana","Agra","Nashik","Faridabad","Meerut",
  "Rajkot","Kalyan-Dombivli","Vasai-Virar","Varanasi","Srinagar","Aurangabad",
  "Dhanbad","Amritsar","Navi Mumbai","Allahabad","Ranchi","Howrah","Coimbatore",
  "Jabalpur","Gwalior","Vijayawada","Jodhpur","Madurai","Raipur","Kota","Guwahati",
  "Chandigarh","Solapur","Hubli-Dharwad","Mysore","Tiruchirappalli"
];

// Populate dropdowns
function populateDropdowns() {
  const donorSelect = document.getElementById("bloodGroup");
  const searchSelect = document.getElementById("searchGroup");
  const locationSelect = document.getElementById("location");

  bloodGroups.forEach(bg => {
    [donorSelect, searchSelect].forEach(sel => {
      const opt = document.createElement("option");
      opt.value = bg;
      opt.textContent = bg;
      sel.appendChild(opt);
    });
  });

  cities.forEach(city => {
    const opt = document.createElement("option");
    opt.value = city;
    opt.textContent = city;
    locationSelect.appendChild(opt);
  });
}
populateDropdowns();

// Validation functions
function isValidAge(age) {
  const num = parseInt(age);
  return !isNaN(num) && num >= 18 && num <= 65;
}
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidContact(contact) {
  return /^\d{10}$/.test(contact);
}

// Register donor
function registerDonor() {
  const name = document.getElementById("name").value.trim();
  const gender = document.getElementById("gender").value;
  const age = document.getElementById("age").value.trim();
  const bloodGroup = document.getElementById("bloodGroup").value;
  const location = document.getElementById("location").value;
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();

  if (!name || !age || !location || !contact || !email) {
    alert("Please fill all fields.");
    return;
  }
  if (!isValidAge(age)) { alert("Age must be 18-65."); return; }
  if (!isValidEmail(email)) { alert("Invalid email."); return; }
  if (!isValidContact(contact)) { alert("Contact must be 10 digits."); return; }
  if (donors.some(d => d.email === email || d.contact === contact)) {
    alert("Donor already registered!");
    return;
  }

  donors.push({ name, gender, age: parseInt(age), bloodGroup, location, email, contact });
  alert("Donor Registered Successfully!");

  // Clear fields
  ["name","age","location","email","contact"].forEach(id => document.getElementById(id).value = "");
}

// Find donor
function findDonor() {
  const searchGroup = document.getElementById("searchGroup").value;
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  const filteredDonors = donors.filter(d => d.bloodGroup === searchGroup);

  if (filteredDonors.length === 0) {
    resultsDiv.innerHTML = `<p style="color:red;">No donors found for ${searchGroup}</p>`;
    return;
  }

  resultsDiv.innerHTML = filteredDonors.map(d => `
    <div class="donor-card">
      <h3>${d.name}</h3>
      <p>Gender: ${d.gender}</p>
      <p>Age: ${d.age}</p>
      <p>Blood Group: ${d.bloodGroup}</p>
      <p>Location: ${d.location}</p>
      <p>Email: ${d.email}</p>
      <p>Contact: ${d.contact}</p>
    </div>
  `).join("");
}

// Event listeners
document.getElementById("registerBtn").addEventListener("click", registerDonor);
document.getElementById("searchBtn").addEventListener("click", findDonor);

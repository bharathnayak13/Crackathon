// Store donors in memory
let donors = [];

// Register donor function
function registerDonor() {
  const name = document.getElementById("name").value.trim();
  const gender = document.getElementById("gender").value;
  const age = document.getElementById("age").value.trim();
  const bloodGroup = document.getElementById("bloodGroup").value;
  const location = document.getElementById("location").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();

  if (!name || !age || !location || !contact || !email) {
    alert("Please fill all fields.");
    return;
  }

  // Save donor
  donors.push({ name, gender, age, bloodGroup, location, email, contact });

  alert("Donor Registered Successfully!");

  // Clear fields
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("location").value = "";
  document.getElementById("email").value = "";
  document.getElementById("contact").value = "";
}

// Find donor function
function findDonor() {
  const searchGroup = document.getElementById("searchGroup").value;
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  const filteredDonors = donors.filter(donor => donor.bloodGroup === searchGroup);

  if (filteredDonors.length === 0) {
    resultsDiv.innerHTML = `<p style="color:red;">No donors found for ${searchGroup}</p>`;
    return;
  }

  filteredDonors.forEach(donor => {
    const card = document.createElement("div");
    card.className = "donor-card";
    card.innerHTML = `
      <h3>${donor.name}</h3>
      <p>Gender: ${donor.gender}</p>
      <p>Age: ${donor.age}</p>
      <p>Blood Group: ${donor.bloodGroup}</p>
      <p>Location: ${donor.location}</p>
      <p>Email: ${donor.email}</p>
      <p>Contact: ${donor.contact}</p>
    `;
    resultsDiv.appendChild(card);
  });
}

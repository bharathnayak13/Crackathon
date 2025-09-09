// Store donors in memory
let donors = [];

// Register donor function
function registerDonor() {
  const name = document.getElementById("name").value.trim();
  const bloodGroup = document.getElementById("bloodGroup").value;
  const contact = document.getElementById("contact").value.trim();

  if (name === "" || contact === "") {
    alert("Please fill all fields.");
    return;
  }

  // Save donor
  donors.push({ name, bloodGroup, contact });

  alert("Donor Registered Successfully!");

  // Clear fields
  document.getElementById("name").value = "";
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
    card.innerHTML = `<h3>${donor.name}</h3>
                      <p>Blood Group: ${donor.bloodGroup}</p>
                      <p>Contact: ${donor.contact}</p>`;
    resultsDiv.appendChild(card);
  });
}

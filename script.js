// Array to store donors
let donors = [];

// Handle donor registration
document.getElementById("donorForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const bloodGroup = document.getElementById("bloodGroup").value;
  const city = document.getElementById("city").value;
  const contact = document.getElementById("contact").value;

  // Add donor to array
  donors.push({ name, age, bloodGroup, city, contact });

  alert("Donor Registered Successfully!");

  // Reset form
  this.reset();
});

// Handle search donors
document.getElementById("searchGroup").addEventListener("change", function () {
  const selectedGroup = this.value;
  const donorList = document.getElementById("donorList");
  donorList.innerHTML = "";

  const filtered = donors.filter(donor => donor.bloodGroup === selectedGroup);

  if (filtered.length === 0) {
    donorList.innerHTML = "<p class='text-center text-muted'>No donors found.</p>";
    return;
  }

  filtered.forEach(donor => {
    donorList.innerHTML += `
      <div class="col-md-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title">${donor.name} (${donor.age} yrs)</h5>
            <p class="card-text">
              <strong>Blood Group:</strong> ${donor.bloodGroup}<br>
              <strong>City:</strong> ${donor.city}<br>
              <strong>Contact:</strong> ${donor.contact}
            </p>
          </div>
        </div>
      </div>
    `;
  });
});

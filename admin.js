<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Panel - Blood Donation App</title>

  <!-- Link CSS file -->
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>Admin Panel</h1>
  </header>

  <div class="container">
    <div class="card" style="width:100%;">
      <h2>All Registered Donors</h2>
      <div id="adminResults"></div>
    </div>
  </div>

  <p style="text-align:center; margin-top:20px;">
    <a href="index.html">⬅ Back to User Page</a>
  </p>

  <!-- Link JavaScript file -->
  <script src="script.js"></script>
  <script>
    // Call function to show donors when admin page loads
    displayAllDonors();
  </script>
</body>
</html>
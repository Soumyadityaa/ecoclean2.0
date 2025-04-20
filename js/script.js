document.addEventListener("DOMContentLoaded", function () {
    const earnPointsBtn = document.getElementById("earnPointsBtn");
    const mapBtn = document.getElementById("mapBtn");
    const upcomingEventsBtn = document.getElementById("upcomingEventsBtn");
    const pointsDisplay = document.getElementById("points");
    const logoutBtn = document.getElementById("logoutBtn");
    
    earnPointsBtn.addEventListener("click", function () {
      // Simulate earning points
      const currentPoints = parseInt(pointsDisplay.textContent);
      pointsDisplay.textContent = currentPoints + 10;
      alert("You earned 10 points for responsible waste disposal!");
    });
  
    mapBtn.addEventListener("click", function () {
      window.location.href = "map.html";
    });

    upcomingEventsBtn.addEventListener("click", function () {
      window.location.href = "event.html";
    });
  
    logoutBtn.addEventListener("click", function () {
        // Simulate logging out by redirecting to the login page
        window.location.href = "index.html";
      });

    
  });
  
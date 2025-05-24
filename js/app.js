// Home 
document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', function(e) {
                if (!this.href.endsWith('index.html')) {
                    e.preventDefault();
                    window.location.href = this.getAttribute('href');
                }
            });
        });


        // Track er
        document.addEventListener('DOMContentLoaded', function() {
         document.getElementById("wellnessForm").addEventListener("submit", function(e) {
        e.preventDefault();
        const sleep = document.querySelector("input[placeholder='Hours Slept']").value;
        const water = document.querySelector("input[placeholder='Liters of Water']").value;
        const exercise = document.querySelector("input[placeholder='Exercise Type/Duration']").value;
        const mood = document.querySelector("select").value;
        const notes = document.querySelector("textarea").value;

        const entry = {
            date: new Date().toLocaleDateString(),
            sleep, water, exercise, mood, notes
        };

        let wellnessData = JSON.parse(localStorage.getItem("wellnessData")) || [];
        wellnessData.push(entry);
        localStorage.setItem("wellnessData", JSON.stringify(wellnessData));

        alert("Your entry has been saved!");
        this.reset();
    });

    document.getElementById("clearDataBtn").addEventListener("click", function() {
        if (confirm("Are you sure you want to delete all your wellness data?")) {
            localStorage.removeItem("wellnessData");
            alert("All wellness data has been cleared.");
        }
    });
        });

    // stats
     window.onload = function () {
        const ctx = document.getElementById('wellnessChart').getContext('2d');
        let wellnessData = JSON.parse(localStorage.getItem("wellnessData")) || [];

        let labels = wellnessData.map(e => e.date);
        let sleepData = wellnessData.map(e => Number(e.sleep));
        let waterData = wellnessData.map(e => Number(e.water));

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Hours Slept',
                        data: sleepData,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        fill: false,
                    },
                    {
                        label: 'Water Intake (L)',
                        data: waterData,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        fill: false,
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: 'Wellness Trends' }
                }
            }
        });
    };

    

  

    // SignUp
    document.addEventListener('DOMContentLoaded', function() {
document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const tell = document.getElementById('tell').value.trim();
  const email = document.getElementById('email').value.trim().toLowerCase();
  const password = document.getElementById('password').value;

  // Retrieve existing users or initialize empty array
  let users = JSON.parse(localStorage.getItem('users')) || [];

  // Check if email already registered
  if(users.some(u => u.email === email)) {
    alert('Email is already registered. Please login.');
    return;
  }

  // Add new user
  users.push({ name, tell, email, password });
  localStorage.setItem('users', JSON.stringify(users));
  alert('Registration successful! Please login.');
  window.location.href = 'login.html';
});

document.getElementById('signupBtn').addEventListener('click', function() {
    window.location.href = 'signup.html';
}
);

    });

// Login

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim().toLowerCase();
  const password = document.getElementById('password').value;

  let users = JSON.parse(localStorage.getItem('users')) || [];

  const user = users.find(u => u.email === email && u.password === password);

  if(user) {
    alert('Login successful! Welcome ' + user.name);
    // Save logged in user email in sessionStorage (or localStorage if you prefer)
    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
    // Redirect to tracker page or dashboard
    document.querySelector('.btnLogout').textContent = 'Logout';
    window.location.href = 'tracker.html';
    
  } else {
    alert('Invalid email or password.');
  }
});
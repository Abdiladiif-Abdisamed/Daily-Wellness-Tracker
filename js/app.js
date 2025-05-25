// Home 
// document.querySelectorAll('nav a').forEach(link => {
//             link.addEventListener('click', function(e) {
//                 if (!this.href.endsWith('index.html')) {
//                     e.preventDefault();
//                     window.location.href = this.getAttribute('href');
//                 }
//             });
//         });
         
         
      
        // Track er
  

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



    });
 

// Login

const btnAuth = document.querySelector('.btnLogout');

// Function update button text based on login state
function updateAuthButton() {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  if (loggedInUser) {
    btnAuth.textContent = 'Logout';
  } else {
    btnAuth.textContent = 'Login';
  }
}

// On page load, update button
document.addEventListener('DOMContentLoaded', () => {
  updateAuthButton();
});

// Login form submission (example)
document.addEventListener('DOMContentLoaded', () => {
  const changeLogin = document.getElementById('changeLogin');
  const dashMenu = document.getElementById('dash');

  // Function to update menu iyo login/logout text
  function updateMenu() {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser) {
      changeLogin.textContent = 'Logout';
      dashMenu.style.display = 'block';
      changeLogin.href = '#'; // Prevent default navigation on logout link
    } else {
      changeLogin.textContent = 'Login';
      dashMenu.style.display = 'none';
      changeLogin.href = 'login.html'; // Redirect to login page when not logged in
    }
  }

  // Call on page load
  updateMenu();

  // Handle login/logout link click
  changeLogin.addEventListener('click', (e) => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser) {
      // Logout process
      e.preventDefault();
      sessionStorage.removeItem('loggedInUser');
      updateMenu();
      alert('You have been logged out.');
      window.location.href = '../index.html'; // Redirect home after logout
    }
    // else, if not logged in, link behaves normally (go to login.html)
  });

  // Intercept form submission for login (example, adjust if form id or structure differs)
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('email').value.trim().toLowerCase();
      const password = document.getElementById('password').value;

      let users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        alert('Login successful! Welcome ' + user.name);
        updateMenu();
        window.location.href = 'tracker.html';  // Redirect to tracker or dashboard
      } else {
        alert('Invalid email or password.');
      }
    });
  }

  // Restrict addEntry function to logged-in users only
  window.addEntry = function() {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      alert('Please login to save your wellness data.');
      return;
    }

    const date = document.getElementById('date').value;
    const sleep = document.getElementById('sleep').value;
    const water = document.getElementById('water').value;
    const exercise = document.getElementById('exercise').value;
    const mood = document.getElementById('mood').value;
    const diet = document.getElementById('diet').value;
    const notes = document.getElementById('notes') ? document.getElementById('notes').value : '';

    const newEntry = {
      email: JSON.parse(loggedInUser).email, // associate entry with user email
      date, sleep, water, exercise, mood, diet, notes
    };

    const wellnessEntries = JSON.parse(localStorage.getItem('wellnessEntries')) || [];
    wellnessEntries.push(newEntry);
    localStorage.setItem('wellnessEntries', JSON.stringify(wellnessEntries));

    const trackingTable = document.getElementById('trackingTable');
    if (trackingTable) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${newEntry.date}</td>
        <td>${newEntry.sleep}</td>
        <td>${newEntry.water}</td>
        <td>${newEntry.exercise}</td>
        <td>${newEntry.mood}</td>
        <td>${newEntry.diet}</td>
        <td>${newEntry.notes}</td>
      `;
      trackingTable.appendChild(tr);
    }

    document.querySelectorAll('.form-table input, .form-table select, .form-table textarea').forEach(input => input.value = '');
    alert('Your entry has been saved!');
  };

  // On tracker page, load only logged-in user's entries
  if (document.getElementById('trackingTable')) {
    const wellnessEntries = JSON.parse(localStorage.getItem('wellnessEntries')) || [];
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const userEmail = JSON.parse(loggedInUser).email;
      const userEntries = wellnessEntries.filter(e => e.email === userEmail);
      const trackingTable = document.getElementById('trackingTable');
      userEntries.forEach(entry => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${entry.date}</td>
          <td>${entry.sleep}</td>
          <td>${entry.water}</td>
          <td>${entry.exercise}</td>
          <td>${entry.mood}</td>
          <td>${entry.diet}</td>
          <td>${entry.notes}</td>
        `;
        trackingTable.appendChild(tr);
      });
    } else {
      alert('Please login to view your wellness data.');
      window.location.href = 'login.html';
    }
  }
});


// Logout button click handler
// btnAuth.addEventListener('click', () => {
//   const loggedInUser = sessionStorage.getItem('loggedInUser');
//   if(loggedInUser) {
//     // Logout
//     sessionStorage.removeItem('loggedInUser');
//     alert('You have been logged out.');
//     updateAuthButton();
//     // Optionally redirect to login or home
//     window.location.href = 'login.html';
//   } else {
//     // If not logged in, go to login page
//     window.location.href = 'login.html';
//   }
// });

// script.js

// Initialize or retrieve users from localStoragelet users;
try {
  users = JSON.parse(localStorage.getItem('users')) || {};
} catch {
  users = {};
}

// Redirect logged-in users to the auction page
if (localStorage.getItem('loggedInUser') && window.location.pathname.includes('index.html')) {
  window.location.href = 'auction.html';
}

// Handle Sign-Up
document.getElementById('signupButton')?.addEventListener('click', () => {
  const username = prompt('Enter a username:').trim();
  const password = prompt('Enter a password:').trim();
  const confirmPassword = prompt('Confirm your password:').trim();

  if (!username || !password) {
    alert('Username and password cannot be empty.');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  if (users[username]) {
    alert('Username already exists. Please choose a different username.');
    return;
  }

  users[username] = password;
  localStorage.setItem('users', JSON.stringify(users));
  alert('Sign up successful! You can now log in.');
});

// Handle Login
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!users[username]) {
    alert('User does not exist. Please sign up first.');
    return;
  }

  if (users[username] !== password) {
    alert('Incorrect password. Please try again.');
    return;
  }

  localStorage.setItem('loggedInUser', username);
  alert(`Welcome, ${username}!`);
  window.location.href = 'auction.html';
});

// Handle Logout
document.getElementById('logoutButton')?.addEventListener('click', () => {
  localStorage.removeItem('loggedInUser');
  alert('You have been logged out.');
  window.location.href = 'index.html';
});

// Current highest bids for auction items
const currentBids = {
  item1: 100, // Starting bid for Item 1
  item2: 150, // Starting bid for Item 2
};

// Function to place a bid
function placeBid(itemId, startingPrice) {
  const currentBid = currentBids[itemId];
  const bidAmount = parseFloat(
    prompt(
      `Current highest bid for ${itemId.toUpperCase()}: $${currentBid}\nEnter your bid (must be higher than $${currentBid}):`
    )
  );

  if (isNaN(bidAmount)) {
    alert('Invalid bid amount. Please enter a number.');
    return;
  }

  if (bidAmount > currentBid) {
    currentBids[itemId] = bidAmount;
    alert(`🎉 New highest bid for ${itemId.toUpperCase()}: $${bidAmount}`);
  } else {
    alert(`❌ Your bid must be higher than $${currentBid}`);
  }
}

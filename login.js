// Switch between login and forgot password
document.getElementById("forgotLink").addEventListener("click", function(e) {
  e.preventDefault();
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("forgotBox").style.display = "block";
});

document.getElementById("backToLogin").addEventListener("click", function(e) {
  e.preventDefault();
  document.getElementById("forgotBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
});

document.getElementById("backToLogin2").addEventListener("click", function(e) {
  e.preventDefault();
  document.getElementById("resetBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
});

// LOGIN
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let username = document.getElementById("loginUser").value;
  let password = document.getElementById("loginPassword").value;

  let user = JSON.parse(localStorage.getItem("user"));
  if (user &&
      (user.email === username || user.username === username || user.phone === username) &&
      user.password === password) {
    alert("Login successful!");  
    window.location.href = "home.html";
  } else {
    alert("Invalid username/email/phone or password!");
  }
});

// FORGOT PASSWORD (send code)
document.getElementById("forgotForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let email = document.getElementById("forgotEmail").value;
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && (user.email === email || user.phone === email)) {
    // generate fake code
    let code = Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem("resetCode", code);
    alert("A reset code has been sent: " + code); // simulate email
    document.getElementById("forgotBox").style.display = "none";
    document.getElementById("resetBox").style.display = "block";
  } else {
    alert("Email/Phone not found!");
  }
});

// RESET PASSWORD
document.getElementById("resetForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let enteredCode = document.getElementById("resetCode").value;
  let newPass = document.getElementById("newPassword").value;
  let realCode = localStorage.getItem("resetCode");
  let user = JSON.parse(localStorage.getItem("user"));

  if (enteredCode === realCode) {
    user.password = newPass;
    localStorage.setItem("user", JSON.stringify(user));
    alert("Password reset successful! You can now login.");
    document.getElementById("resetBox").style.display = "none";
    document.getElementById("loginBox").style.display = "block";
  } else {
    alert("Invalid code!");
  }
});
// login.js - FULL CODE

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

function show(id) {
  document.getElementById(id).style.display = "block";
}
function hide(id) {
  document.getElementById(id).style.display = "none";
}

// MAIN LOGIN
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const identifier = document.getElementById("loginUser").value.trim();
  const password = document.getElementById("loginPassword").value;
  if (!identifier || !password) {
    alert("Please fill in all fields.");
    return;
  }
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u =>
    u.email === identifier ||
    u.username === identifier ||
    u.phone === identifier
  );
  if (!user) {
    alert("No account found with that email/username/phone.");
    return;
  }
  if (user.password !== password) {
    alert("Incorrect password.");
    return;
  }
  if (user.verified !== true) {
    const choice = confirm(
      `Email Verification Required!\n\nAccount: ${user.email}\n\nClick OK to receive a new 6-digit code\n(The code expires in 5 minutes)`
    );
    if (choice) {
      const newCode = Math.floor(100000 + Math.random() * 900000);
      const codeExpiresAt = Date.now() + (5 * 60 * 1000);
      const index = users.findIndex(u => u.email === user.email);
      if (index !== -1) {
        users[index].verified = false;
        users[index].verificationCode = newCode;
        users[index].codeExpiresAt = codeExpiresAt;
        localStorage.setItem("users", JSON.stringify(users));
      }
      localStorage.setItem("pendingVerification", JSON.stringify({
        email: user.email,
        code: newCode,
        name: user.firstName || "User",
        expiresAt: codeExpiresAt
      }));
      alert(`New verification code sent!\n\nCode: ${newCode}\nExpires in 5 minutes!`);
      window.location.href = "verify.html";
    }
    return;
  }
  localStorage.setItem("currentUser", JSON.stringify(user));
  alert(`Welcome back, ${user.firstName || user.username}!`);
  window.location.href = "home.html";
});

// FORGOT PASSWORD
document.getElementById("forgotForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.getElementById("forgotEmail").value.trim();
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === input || u.phone === input);
  if (!user) {
    alert("No account found.");
    return;
  }
  const code = Math.floor(100000 + Math.random() * 900000);
  localStorage.setItem("resetCode", code);
  localStorage.setItem("resetEmail", input);
  alert(`Password reset code sent!\n\nCode: ${code}`);
  show("resetBox");
  hide("forgotBox");
});

// RESET PASSWORD
document.getElementById("resetForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const code = document.getElementById("resetCode").value.trim();
  const newPass = document.getElementById("newPassword").value;
  const confirmPass = document.getElementById("confirmPassword").value;
  const savedCode = localStorage.getItem("resetCode");
  const resetEmail = localStorage.getItem("resetEmail");

  if (code !== savedCode) {
    alert("Invalid or expired code!");
    return;
  }
  if (newPass !== confirmPass) {
    alert("Password does not match");
    return;
  }
  const minLength = 8;
  const hasNumber = /\d/;
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  const hasUppercase = /[A-Z]/;
  const hasLowercase = /[a-z]/;
  const errors = [];

  if (newPass.length < minLength) errors.push(`• At least ${minLength} characters`);
  if (!hasNumber.test(newPass)) errors.push("• At least one number (0-9)");
  if (!hasSpecial.test(newPass)) errors.push("• At least one symbol (!@#$ etc.)");
  if (!hasUppercase.test(newPass)) errors.push("• At least one uppercase letter");
  if (!hasLowercase.test(newPass)) errors.push("• At least one lowercase letter");
  if (errors.length > 0) {
    alert("Password too weak!\n\n" + errors.join("\n"));
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const index = users.findIndex(u => u.email === resetEmail || u.phone === resetEmail);

  if (index !== -1) {
    users[index].password = newPass;
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.removeItem("resetCode");
    localStorage.removeItem("resetEmail");
    alert("Password changed successfully! You can now log in.");
    show("loginBox");
    hide("resetBox");
  }
  
});

// TOGGLE EYE FUNCTION (KEEPS WORKING)
function toggleEye(icon, id) {
  const field = document.getElementById(id);
  if (field.type === "password") {
    field.type = "text";
    icon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    field.type = "password";
    icon.classList.replace("fa-eye-slash", "fa-eye");
  }
}
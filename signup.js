// signup.js 

document.getElementById("nextBtn").addEventListener("click", function () {
  let email = document.getElementById("signupEmail").value.trim();
  let firstName = document.getElementById("firstName").value.trim();
  let lastName = document.getElementById("lastName").value.trim();
  let password = document.getElementById("signupPassword").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  // Basic required 
  if (!email || !firstName || !lastName || !password || !confirmPassword) {
    alert("Please fill in all fields.");
    return;
  }

  // Password match
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // PASSWORD STRENGTH CHECK
  const minLength = 8;
  const hasNumber = /\d/;
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  const hasUppercase = /[A-Z]/;
  const hasLowercase = /[a-z]/;

  const errors = [];

  if (password.length < minLength) errors.push(`• At least ${minLength} characters`);
  if (!hasNumber.test(password)) errors.push("• At least one number (0-9)");
  if (!hasSpecial.test(password)) errors.push("• At least one symbol (!@#$ etc.)");
  if (!hasUppercase.test(password)) errors.push("• At least one uppercase letter");
  if (!hasLowercase.test(password)) errors.push("• At least one lowercase letter");

  if (errors.length > 0) {
    alert("Password too weak!\n\n" + errors.join("\n"));
    return;
  }

  // Check if email already exists
  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.some(user => user.email === email)) {
    alert("This email is already registered!");
    return;
  }

  
  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "block";
});

// FINAL SIGNUP
document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // Generating 6 digit code 
  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  const codeExpiresAt = Date.now() + (5 * 60 * 1000); // 5 minutes from now

  let newUser = {
    email: document.getElementById("signupEmail").value.trim(),
    username: document.getElementById("signupEmail").value.split('@')[0],
    firstName: document.getElementById("firstName").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    fullName: document.getElementById("firstName").value.trim() + " " + document.getElementById("lastName").value.trim(),
    password: document.getElementById("signupPassword").value,
    dob: document.getElementById("dob").value,
    gender: document.getElementById("gender").value,
    phone: "",
    verified: false,
    verificationCode: verificationCode,
    codeExpiresAt: codeExpiresAt,       
    joinedDate: new Date().toISOString()
  };

  // Save user
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  // Save pending verification 
  localStorage.setItem("pendingVerification", JSON.stringify({
    email: newUser.email,
    code: verificationCode,
    name: newUser.firstName,
    expiresAt: codeExpiresAt               
  }));

  
  alert(
`Account created successfully!

Verification code sent to:
${newUser.email}

Your code: ${verificationCode}

Expires in 5 minutes!

Enter it on the next page to activate your account.`
  );

  // Redirect to verification
  window.location.href = "verify.html";
});
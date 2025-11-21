document.getElementById("nextBtn").addEventListener("click", function() {
  let email = document.getElementById("signupEmail").value.trim();
  let firstName = document.getElementById("firstName").value.trim();
  let lastName = document.getElementById("lastName").value.trim();
  let password = document.getElementById("signupPassword").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  if (!email || !firstName || !lastName || !password || !confirmPassword) {
    alert("Please fill in all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "block";
});

document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let user = {
    email: document.getElementById("signupEmail").value,
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    password: document.getElementById("signupPassword").value,
    dob: document.getElementById("dob").value,
    gender: document.getElementById("gender").value
  };

  localStorage.setItem("user", JSON.stringify(user));

  alert("Account created successfully!");
  window.location.href = "home.html";
});
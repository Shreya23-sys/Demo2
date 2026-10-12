// Elements
const form = document.getElementById("registrationForm");
const statusMessage = document.getElementById("formStatus");

const fields = {
  fullName: document.getElementById("fullName"),
  email: document.getElementById("email"),
  password: document.getElementById("password"),
  confirmPassword: document.getElementById("confirmPassword"),
  role: document.getElementById("role"),
  terms: document.getElementById("terms")
};

const errors = {
  fullName: document.getElementById("nameError"),
  email: document.getElementById("emailError"),
  password: document.getElementById("passwordError"),
  confirmPassword: document.getElementById("confirmError"),
  role: document.getElementById("roleError"),
  terms: document.getElementById("termsError")
};

// Login Modal Elements
const loginModal = document.getElementById("loginModal");
const loginButton = document.getElementById("loginButton");
const headerLoginBtn = document.getElementById("headerLoginBtn");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginEmailError = document.getElementById("loginEmailError");
const loginPasswordError = document.getElementById("loginPasswordError");
const loginStatus = document.getElementById("loginStatus");
const toastContainer = document.getElementById("toastContainer");

// Auth State Elements
const headerUserBadge = document.getElementById("headerUserBadge");
const headerUserName = document.getElementById("headerUserName");
const logoutBtn = document.getElementById("logoutBtn");

// Background Switcher Elements
const bgSwitchLogo = document.getElementById("bgSwitchLogo");
const bgSwitchCultural = document.getElementById("bgSwitchCultural");
const cultureBgArt = document.getElementById("cultureBgArt");

// Toast Notification Helper
function showToast(message, type = "info") {
  if (!toastContainer) return;
  const toast = document.createElement("div");
  toast.className = `toast-msg ${type}`;
  toast.innerHTML = `<span>${type === "success" ? "✓" : "ℹ"}</span><span>${message}</span>`;
  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 350);
  }, 4000);
}

// Background Switcher Logic
if (bgSwitchLogo && bgSwitchCultural && cultureBgArt) {
  bgSwitchLogo.addEventListener("click", () => {
    bgSwitchLogo.classList.add("active");
    bgSwitchCultural.classList.remove("active");
    cultureBgArt.className = "culture-bg-art mode-logo";
    showToast("Background updated to Kala Laya Logo motif", "info");
  });

  bgSwitchCultural.addEventListener("click", () => {
    bgSwitchCultural.classList.add("active");
    bgSwitchLogo.classList.remove("active");
    cultureBgArt.className = "culture-bg-art mode-cultural";
    showToast("Background updated to Cultural Art backdrop", "info");
  });
}

// Modal open/close
function openLoginModal() {
  if (loginModal) {
    loginModal.classList.add("active");
    loginModal.setAttribute("aria-hidden", "false");
    loginStatus.textContent = "";
    loginStatus.className = "form-status";
    if (loginEmail) loginEmail.focus();
  }
}

function closeLoginModal() {
  if (loginModal) {
    loginModal.classList.remove("active");
    loginModal.setAttribute("aria-hidden", "true");
  }
}

if (loginButton) loginButton.addEventListener("click", openLoginModal);
if (headerLoginBtn) headerLoginBtn.addEventListener("click", openLoginModal);
if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeLoginModal);

if (loginModal) {
  loginModal.addEventListener("click", (e) => {
    if (e.target === loginModal) closeLoginModal();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && loginModal && loginModal.classList.contains("active")) {
    closeLoginModal();
  }
});

// Update Header User State
function setUserLoggedIn(name) {
  if (headerLoginBtn) headerLoginBtn.style.display = "none";
  if (headerUserBadge) {
    headerUserBadge.style.display = "flex";
    if (headerUserName) headerUserName.textContent = name || "Member";
  }
}

function setUserLoggedOut() {
  if (headerLoginBtn) headerLoginBtn.style.display = "block";
  if (headerUserBadge) headerUserBadge.style.display = "none";
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    setUserLoggedOut();
    showToast("You have been signed out.", "info");
  });
}

// Login Form Submit Handler
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    loginEmailError.textContent = "";
    loginPasswordError.textContent = "";
    loginStatus.textContent = "";
    loginStatus.className = "form-status";

    const email = loginEmail.value.trim();
    const password = loginPassword.value;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      loginEmailError.textContent = "Please enter a valid email address.";
      valid = false;
    }

    if (!password) {
      loginPasswordError.textContent = "Please enter your password.";
      valid = false;
    }

    if (!valid) return;

    // Display explicit "You are logged in" message
    loginStatus.innerHTML = "<strong>✓ You are logged in!</strong> Welcome back to Kala Laya Nepal.";
    loginStatus.className = "form-status success";
    showToast("You are logged in!", "success");

    const displayName = email.split("@")[0];
    const capitalized = displayName.charAt(0).toUpperCase() + displayName.slice(1);
    setUserLoggedIn(capitalized);

    setTimeout(() => {
      closeLoginModal();
    }, 1800);
  });
}

// Form Validation Helpers
function setError(fieldName, message) {
  if (errors[fieldName]) {
    errors[fieldName].textContent = message;
  }
  if (fields[fieldName] && fields[fieldName].type !== "checkbox") {
    fields[fieldName].setAttribute("aria-invalid", message ? "true" : "false");
  }
}

function validateForm() {
  let valid = true;
  Object.keys(errors).forEach((key) => setError(key, ""));

  const name = fields.fullName.value.trim();
  const email = fields.email.value.trim();
  const password = fields.password.value;
  const confirmPassword = fields.confirmPassword.value;

  if (name.length < 2) {
    setError("fullName", "Please enter your full name.");
    valid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    setError("email", "Please enter a valid email address.");
    valid = false;
  }

  if (password.length < 8) {
    setError("password", "Password must contain at least 8 characters.");
    valid = false;
  }

  if (confirmPassword !== password || confirmPassword.length === 0) {
    setError("confirmPassword", "The passwords do not match.");
    valid = false;
  }

  if (!fields.role.value) {
    setError("role", "Please select a role.");
    valid = false;
  }

  if (!fields.terms.checked) {
    setError("terms", "Please accept the terms and privacy policy.");
    valid = false;
  }

  return valid;
}

// Register Form Submit Handler
form.addEventListener("submit", (event) => {
  event.preventDefault();
  statusMessage.textContent = "";
  statusMessage.className = "form-status";

  if (!validateForm()) {
    const firstInvalid = form.querySelector('[aria-invalid="true"]') ||
      (fields.terms.checked ? null : fields.terms);
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  // Display explicit "Account created" message
  statusMessage.innerHTML = "<strong>✓ Account created!</strong> Welcome to Kala Laya Nepal. Your registration is complete.";
  statusMessage.className = "form-status success";
  showToast("Account created successfully! Welcome to Kala Laya Nepal.", "success");
  statusMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });

  const name = fields.fullName.value.trim();
  setUserLoggedIn(name);
});

// Live Input Listeners
Object.entries(fields).forEach(([key, field]) => {
  if (!field) return;
  if (field.type === "checkbox") {
    field.addEventListener("change", () => setError(key, ""));
  } else {
    field.addEventListener("input", () => {
      setError(key, "");
      if (key === "password" && fields.confirmPassword.value) {
        setError("confirmPassword",
          fields.confirmPassword.value === field.value ? "" : "The passwords do not match.");
      }
      if (key === "confirmPassword" && field.value) {
        setError("confirmPassword",
          field.value === fields.password.value ? "" : "The passwords do reply to match.");
      }
    });
    field.addEventListener("change", () => setError(key, ""));
  }
});

// Password Visibility Toggles
document.querySelectorAll(".visibility-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.target);
    if (!target) return;
    const showing = target.type === "password";
    target.type = showing ? "text" : "password";
    button.setAttribute("aria-label", showing ? "Hide password" : "Show password");
    button.textContent = showing ? "⊘" : "◉";
  });
});

// Mobile Navigation
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".main-nav");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Search Button
const searchButton = document.getElementById("searchButton");
if (searchButton) {
  searchButton.addEventListener("click", () => {
    const query = window.prompt("What would you like to find on Kala Laya Nepal?");
    if (query && query.trim()) {
      showToast(`Searching for "${query.trim()}"...`, "info");
    }
  });
}

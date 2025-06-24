// 🌟 Bascule entre connexion et inscription
document.getElementById('btn-login').onclick = () => {
  document.getElementById('login-form').classList.remove('hidden');
  document.getElementById('register-form').classList.add('hidden');
};

document.getElementById('btn-register').onclick = () => {
  document.getElementById('register-form').classList.remove('hidden');
  document.getElementById('login-form').classList.add('hidden');
};

// 👁️ Voir/Masquer mot de passe
function togglePassword(id) {
  const field = document.getElementById(id);
  field.type = field.type === 'password' ? 'text' : 'password';
}

// 🔒 Indicateur de force du mot de passe
document.getElementById('register-password').addEventListener('input', () => {
  const pwd = document.getElementById('register-password').value;
  const strength = document.getElementById('strength-indicator');
  if (pwd.length < 6) strength.textContent = "Mot de passe faible";
  else if (/[A-Z]/.test(pwd) && /\d/.test(pwd)) strength.textContent = "Mot de passe fort";
  else strength.textContent = "Mot de passe moyen";
});

// ✅ Validation mot de passe
document.getElementById('confirm-password').addEventListener('input', () => {
  const pwd = document.getElementById('register-password').value;
  const confirm = document.getElementById('confirm-password').value;
  document.getElementById('match-indicator').textContent =
    pwd === confirm ? "Les mots de passe correspondent" : "Ne correspondent pas";
});

// 📝 Inscription
function register() {
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value;
  const confirm = document.getElementById('confirm-password').value;
  const firstname = document.getElementById('register-firstname').value.trim();
  const lastname = document.getElementById('register-lastname').value.trim();
  const phone = document.getElementById('register-phone').value.trim();
  const address = document.getElementById('register-address').value.trim();

  if (!email || !password || !confirm || !firstname || !lastname || !phone) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  if (password !== confirm) {
    alert("Les mots de passe ne correspondent pas.");
    return;
  }

  const role = phone === "0798319013" ? "admin" : "user";
  const nouvelUtilisateur = { email, password, phone, firstname, lastname, address, role };

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  users.push(nouvelUtilisateur);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("utilisateurConnecte", JSON.stringify(nouvelUtilisateur));
  localStorage.setItem("isAdmin", role === "admin" ? "true" : "false");

  // Redirection selon le rôle
  window.location.href = role === "admin" ? "ajout.html" : "index.html";
}

// 🔐 Connexion
function login() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const phone = document.getElementById('login-phone').value.trim();

  if (!email || !password || !phone) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.email === email && u.password === password && u.phone === phone);

  if (!user) {
    alert("Identifiants incorrects.");
    return;
  }

  // Enregistre toutes les infos dans utilisateurConnecte
  localStorage.setItem("utilisateurConnecte", JSON.stringify(user));
  localStorage.setItem("isAdmin", user.role === "admin" ? "true" : "false");

  window.location.href = user.role === "admin" ? "ajout.html" : "index.html";
}


// 🌐 Réseaux
function connectWithFacebook() {
  alert("Connexion Facebook simulée.");
  const user = { email: "fb_user@example.com", phone: "", role: "user" };
  localStorage.setItem("utilisateurConnecte", JSON.stringify(user));
  localStorage.setItem("isAdmin", "false");
  window.location.href = "index.html";
}

function connectWithGoogle() {
  alert("Connexion Google simulée.");
  const user = { email: "google_user@example.com", phone: "", role: "user" };
  localStorage.setItem("utilisateurConnecte", JSON.stringify(user));
  localStorage.setItem("isAdmin", "false");
  window.location.href = "index.html";
}

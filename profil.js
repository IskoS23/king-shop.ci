window.addEventListener("DOMContentLoaded", () => {
  const user = verifierConnexion(true, false); // Connexion requise, pas besoin d’être admin

  if (!user) return;

  const container = document.getElementById("profil-container");

  container.innerHTML = `
    <p><strong>Nom :</strong> ${user.firstname || "—"} ${user.lastname || ""}</p>
    <p><strong>Email :</strong> ${user.email || "—"}</p>
    <p><strong>Téléphone :</strong> ${user.phone || "—"}</p>
    <p><strong>Adresse :</strong> ${user.address || "—"}</p>
    <p><strong>Rôle :</strong> ${user.role === "admin" ? "Administrateur" : "Utilisateur"}</p>
    <button onclick="deconnexion()">Se déconnecter</button>
  `;
});

function deconnexion() {
  localStorage.removeItem("utilisateurConnecte");
  localStorage.removeItem("isAdmin");
  window.location.href = "auth.html";
}

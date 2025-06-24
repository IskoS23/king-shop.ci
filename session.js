function verifierConnexion(redirigerSiNonConnecte = true, adminSeulement = false) {
  const user = JSON.parse(localStorage.getItem("utilisateurConnecte"));

  // Rediriger si non connecté
  if (!user && redirigerSiNonConnecte) {
    window.location.href = "auth.html";
    return null;
  }

  // Si admin requis, vérifier le rôle ou le numéro spécial
  if (
    adminSeulement &&
    !(user.role === "admin" || user.phone === "0798319013")
  ) {
    alert("Accès réservé à l'administrateur.");
    window.location.href = "index.html";
    return null;
  }

  return user;
}


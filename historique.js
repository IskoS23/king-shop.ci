let historiqueGlobal = []; // Pour conserver toutes les commandes

window.addEventListener("DOMContentLoaded", () => {
  const user = verifierConnexion(true, false); // Connexion requise
  if (!user) return;

  afficherHistorique();
});

// Fonction principale
function afficherHistorique() {
  const historique = JSON.parse(localStorage.getItem("historiqueCommandes") || "[]");
  historiqueGlobal = historique;
  render(historiqueGlobal);
}

// Affichage filtré
function render(historique) {
  const container = document.getElementById("historique-container");
  container.innerHTML = "";

  if (historique.length === 0) {
    container.innerHTML = "<p>Aucune commande trouvée.</p>";
    return;
  }

  historique.forEach((commande, index) => {
    const div = document.createElement("div");
    div.className = "commande";

    let html = `<h3>Commande #${index + 1} - ${commande.date}</h3>`;

    commande.articles.forEach(article => {
      html += `
        <div class="article">
          <img src="${article.image}" alt="${article.titre}">
          <div>
            <p><strong>${article.titre}</strong></p>
            <p>Prix : ${article.prix} FCFA</p>
            <p>Taille : ${article.taille || "Standard"}</p>
          </div>
        </div>
      `;
    });

    div.innerHTML = html;
    container.appendChild(div);
  });

  // Bouton de nettoyage
  const btn = document.createElement("button");
  btn.textContent = "Vider l'historique";
  btn.onclick = clearHistorique;
  btn.style.marginTop = "20px";
  container.appendChild(btn);
}

// Vider l’historique
function clearHistorique() {
  if (confirm("Êtes-vous sûr de vouloir vider l'historique des commandes ?")) {
    localStorage.removeItem("historiqueCommandes");
    afficherHistorique();
  }
}

// Filtrage
function filtrer() {
  const motcle = document.getElementById("filtre-motcle").value.toLowerCase();
  const date = document.getElementById("filtre-date").value;

  const resultat = historiqueGlobal.filter(commande => {
    const correspondDate = !date || commande.date === formatDate(date);
    const correspondMot = motcle === "" || commande.articles.some(article =>
      article.titre.toLowerCase().includes(motcle)
    );
    return correspondDate && correspondMot;
  });

  render(resultat);
}

function formatDate(dateInput) {
  const d = new Date(dateInput);
  return d.toLocaleDateString(); // Exemple : "21/06/2025"
}

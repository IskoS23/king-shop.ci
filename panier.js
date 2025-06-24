window.addEventListener("DOMContentLoaded", () => {
  const user = verifierConnexion(true, false); // ✅ Redirige si non connecté
  if (!user) return;

  afficherPanier();
});

function afficherPanier() {
  const panier = JSON.parse(localStorage.getItem("panier") || "[]");
  const container = document.getElementById("panier-container");
  container.innerHTML = "";

  if (panier.length === 0) {
    container.innerHTML = "<p>Votre panier est vide.</p>";
    return;
  }

  panier.forEach((item, index) => {
    const article = document.createElement("div");
    article.className = "panier-item";
    article.innerHTML = `
      <img src="${item.image}" alt="${item.titre}" />
      <div class="item-info">
        <h4>${item.titre}</h4>
        <p>Prix : ${item.prix} FCFA</p>
        <p>Taille : ${item.taille || "Standard"}</p>
      </div>
      <button class="remove-btn" onclick="supprimerArticle(${index})">X</button>
    `;
    container.appendChild(article);
  });
}

function supprimerArticle(index) {
  const panier = JSON.parse(localStorage.getItem("panier") || "[]");
  panier.splice(index, 1);
  localStorage.setItem("panier", JSON.stringify(panier));
  afficherPanier();
}

function envoyerCommande() {
  const panier = JSON.parse(localStorage.getItem("panier") || "[]");
  if (panier.length === 0) {
    alert("Le panier est vide.");
    return;
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const adresse = `https://www.google.com/maps?q=${lat},${lon}`;

    let message = "*Commande via le site web :*\n";
    panier.forEach(item => {
      message += `\n🛍 *${item.titre}* - ${item.prix} FCFA\nTaille : ${item.taille || "Standard"}\nImage : ${item.image}\n`;
    });
    message += `\n📍 *Localisation du client :* ${adresse}`;

    const url = `https://wa.me/2250798319013?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    sauvegarderCommande(panier);
  }, () => {
    alert("Impossible de récupérer la position GPS.");
  });
}

function sauvegarderCommande(panier) {
  const historique = JSON.parse(localStorage.getItem("historiqueCommandes") || "[]");
  const nouvelleCommande = {
    date: new Date().toLocaleDateString(),
    articles: panier
  };

  historique.push(nouvelleCommande);
  localStorage.setItem("historiqueCommandes", JSON.stringify(historique));

  localStorage.removeItem("panier");

  setTimeout(() => {
    alert("Commande enregistrée dans l'historique !");
    location.reload();
  }, 1000);
}

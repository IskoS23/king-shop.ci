let articlesFemmes = [];

window.addEventListener("DOMContentLoaded", () => {
  const articles = JSON.parse(localStorage.getItem("articles") || "[]");
  articlesFemmes = articles.filter(a => a.categorie === "femme");
  renderArticles(articlesFemmes);
});

function renderArticles(liste) {
  const container = document.getElementById("collection-container");
  container.innerHTML = "";

  if (liste.length === 0) {
    container.innerHTML = "<p>Aucun article trouvé.</p>";
    return;
  }

  liste.forEach((article, index) => {
    const card = document.createElement("div");
    card.className = "article-card";
    card.innerHTML = `
      <img src="${article.image}" alt="${article.titre}" />
      <h4>${article.titre}</h4>
      <p>${article.prix} FCFA</p>
      <button onclick="ajouterAuPanier(${index})">Ajouter au panier</button>
    `;
    container.appendChild(card);
  });
}

function filtrerArticles() {
  const motcle = document.getElementById("filtre-motcle").value.toLowerCase();
  const prixMin = parseInt(document.getElementById("filtre-prix-min").value) || 0;
  const prixMax = parseInt(document.getElementById("filtre-prix-max").value) || Infinity;

  const resultat = articlesFemmes.filter(article => {
    const correspondTitre = article.titre.toLowerCase().includes(motcle);
    const correspondPrix = article.prix >= prixMin && article.prix <= prixMax;
    return correspondTitre && correspondPrix;
  });

  renderArticles(resultat);
}

function ajouterAuPanier(index) {
  const article = { ...articlesFemmes[index] }; // clone
  const taille = prompt("Choisissez la taille (S, M, L, XL) :", "M") || "Standard";
  article.taille = taille;

  const panier = JSON.parse(localStorage.getItem("panier") || "[]");
  panier.push(article);
  localStorage.setItem("panier", JSON.stringify(panier));

  alert("Article ajouté au panier !");
}

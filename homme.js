let articlesHommes = [];
window.onload = () => {
  const articles = JSON.parse(localStorage.getItem("articles") || "[]");
  articlesHommes = articles.filter(a => a.categorie === "homme");
  renderArticles(articlesHommes);
};


function ajouterAuPanier(article) {
  // reconvertir en objet si nécessaire
  if (typeof article === "string") {
    article = JSON.parse(article);
  }

  const taille = prompt("Choisissez la taille (S, M, L, XL) :", "M") || "Standard";
  article.taille = taille;

  let panier = JSON.parse(localStorage.getItem("panier") || "[]");
  panier.push(article);
  localStorage.setItem("panier", JSON.stringify(panier));

  alert("Article ajouté au panier !");
}

function renderArticles(liste) {
  const container = document.getElementById("collection-container");
  container.innerHTML = "";

  if (liste.length === 0) {
    container.innerHTML = "<p>Aucun article trouvé.</p>";
    return;
  }

  liste.forEach(article => {
    const card = document.createElement("div");
    card.className = "article-card";
    card.innerHTML = `
      <img src="${article.image}" alt="${article.titre}" />
      <h4>${article.titre}</h4>
      <p>${article.prix} FCFA</p>
      <button onclick='ajouterAuPanier(${JSON.stringify(article).replace(/'/g, "\\'")})'>Ajouter au panier</button>
    `;
    container.appendChild(card);
  });
}

function filtrerArticles() {
  const motcle = document.getElementById("filtre-motcle").value.toLowerCase();
  const prixMin = parseInt(document.getElementById("filtre-prix-min").value) || 0;
  const prixMax = parseInt(document.getElementById("filtre-prix-max").value) || Infinity;

  const resultat = articlesHommes.filter(article => {
    const correspondTitre = article.titre.toLowerCase().includes(motcle);
    const correspondPrix = article.prix >= prixMin && article.prix <= prixMax;
    return correspondTitre && correspondPrix;
  });

  renderArticles(resultat);
}

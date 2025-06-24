let idArticleAModifier = null;

window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("utilisateurConnecte"));
  if (!user || user.role !== "admin") {
    alert("Accès refusé. Vous n'êtes pas administrateur.");
    window.location.href = "index.html";
    return;
  }

  afficherArticles();
});

// ✅ Ajouter ou modifier un article
function ajouterArticle() {
  const titre = document.getElementById("titre").value;
  const description = document.getElementById("description").value;
  const categorie = document.getElementById("categorie").value;
  const prix = document.getElementById("prix").value;
  const stock = document.getElementById("stock").value;
  const imageInput = document.getElementById("image");
  const file = imageInput.files[0];

  if (!titre || !description || !prix || !stock || (!file && !idArticleAModifier)) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const imageData = event.target.result;

    const articles = JSON.parse(localStorage.getItem("articles") || "[]");

    const nouvelArticle = {
      id: idArticleAModifier || Date.now(),
      titre,
      description,
      categorie,
      prix,
      stock,
      image: imageData
    };

    const articlesMisAJour = articles.filter(a => a.id !== idArticleAModifier);
    articlesMisAJour.push(nouvelArticle);

    localStorage.setItem("articles", JSON.stringify(articlesMisAJour));
    idArticleAModifier = null;
    clearForm();
    afficherArticles();
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    const articles = JSON.parse(localStorage.getItem("articles") || "[]");
    const ancien = articles.find(a => a.id === idArticleAModifier);
    if (ancien) {
      reader.onload({ target: { result: ancien.image } });
    }
  }
}

// ✅ Pré-remplir le formulaire pour modifier
function modifierArticle(id) {
  const articles = JSON.parse(localStorage.getItem("articles") || "[]");
  const article = articles.find(a => a.id === id);
  if (!article) return;

  document.getElementById("titre").value = article.titre;
  document.getElementById("description").value = article.description;
  document.getElementById("categorie").value = article.categorie;
  document.getElementById("prix").value = article.prix;
  document.getElementById("stock").value = article.stock;

  const preview = document.getElementById("preview");
  preview.src = article.image;
  preview.style.display = "block";

  idArticleAModifier = article.id;
}

// ✅ Supprimer un article
function supprimerArticle(id) {
  let articles = JSON.parse(localStorage.getItem("articles") || "[]");
  articles = articles.filter(a => a.id !== id);
  localStorage.setItem("articles", JSON.stringify(articles));
  afficherArticles();
}

// ✅ Vider le formulaire
function clearForm() {
  document.getElementById("titre").value = "";
  document.getElementById("description").value = "";
  document.getElementById("categorie").value = "homme";
  document.getElementById("prix").value = "";
  document.getElementById("stock").value = "";
  document.getElementById("image").value = "";
  document.getElementById("preview").style.display = "none";
  idArticleAModifier = null;
}

// ✅ Prévisualiser l’image
document.getElementById("image").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const preview = document.getElementById("preview");
    preview.src = e.target.result;
    preview.style.display = "block";
  };
  reader.readAsDataURL(file);
});

// ✅ Afficher tous les articles
function afficherArticles() {
  const articles = JSON.parse(localStorage.getItem("articles") || "[]");
  const container = document.getElementById("articles-container");
  container.innerHTML = "";

  if (articles.length === 0) {
    container.innerHTML = "<p>Aucun article trouvé.</p>";
    return;
  }

  articles.forEach(article => {
    const card = document.createElement("div");
    card.className = "article-card";
    card.innerHTML = `
      <img src="${article.image}" alt="${article.titre}" />
      <h4>${article.titre}</h4>
      <p>${article.description}</p>
      <p>Catégorie : ${article.categorie}</p>
      <p>Prix : ${article.prix} FCFA</p>
      <p>Stock : ${article.stock}</p>
      <button onclick="modifierArticle(${article.id})">Modifier</button>
      <button onclick="supprimerArticle(${article.id})">Supprimer</button>
    `;
    container.appendChild(card);
  });
}

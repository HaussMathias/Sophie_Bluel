const serverPromise = await fetch("http://localhost:5678/api/works/");
const works = await serverPromise.json();

function generateWorks(works) {
  for (let i = 0; i < works.length; i++) {
    const cardWorks = works[i];
    const gallery = document.querySelector(".gallery");
    const worksCard = document.createElement("figure");
    const worksImg = document.createElement("img");
    worksImg.src = cardWorks.imageUrl;
    const worksName = document.createElement("figcaption");
    worksName.innerText = cardWorks.title;
    gallery.appendChild(worksCard);
    worksCard.appendChild(worksImg);
    worksCard.appendChild(worksName);
  };
};
generateWorks(works);

const categorie = works.map(works => works.category.name);
const uniqueCategorie = Array.from( new Set(categorie));

const filters = document.querySelector("#portfolio > h2");
const tagCategories = document.createElement("div");
tagCategories.className = "tags";
const allButton = document.createElement("button");
allButton.innerText = "Tous";
allButton.id = "Tous";
allButton.classList.add("active");

filters.after(tagCategories);
tagCategories.appendChild(allButton);

allButton.addEventListener("click", function () {
  document.querySelector(".gallery").innerHTML = "";
  generateWorks(works);
  activeTag(allButton);
});

function activeTag(e) {
  let tagClasse = document.querySelectorAll(".active");
  [].forEach.call(tagClasse, function(el) {
    el.classList.remove("active");
  });
  e.className = "active";
};

uniqueCategorie.forEach(uc => {
  const catButton = document.createElement("button");
  catButton.innerText = uc;
  catButton.id = uc;
  tagCategories.appendChild(catButton);

  
  catButton.addEventListener("click", function () {
    const filteredWorks = works.filter(function (works) {
      return works.category.name === uc;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(filteredWorks);
    activeTag(catButton);
  });
});

let token = window.localStorage.getItem("token");
console.log(token);

if (token) {
  const header = document.querySelector("body");
  const logedBanner = document.createElement("div");
  logedBanner.classList.add("logedBanner");
  const textLogedBanner = document.createElement("p");
  textLogedBanner.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> Mode édition';

  header.before(logedBanner);
  logedBanner.appendChild(textLogedBanner);


  const loged = document.querySelector(".loged");
  loged.innerHTML = '<a href="#">logout</a>';

  loged.addEventListener("click", function () {
    window.localStorage.removeItem("token");
    window.location.href = "index.html";
  });


  const modifier = document.createElement("span");
  modifier.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> Mode édition';
  modifier.classList.add("modifier");
  filters.appendChild(modifier);

  modifier.addEventListener("click", function () {
    
  })



  
  
}



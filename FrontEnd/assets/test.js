// Déclaration des tableaux categories et works

const categories = [
  {
    "id": 1,
    "name": "Objets"
  },
  {
    "id": 2,
    "name": "Appartements"
  },
  {
    "id": 3,
    "name": "Hotels & restaurants"
  }
]

const works = [
  {
    "id": 1,
    "title": "Abajour Tahina",
    "imageUrl": "http://localhost:5678/images/abajour-tahina1651286843956.png",
    "categoryId": 1,
    "userId": 1,
    "category": {
      "id": 1,
      "name": "Objets"
    }
  },
  {
    "id": 2,
    "title": "Appartement Paris V",
    "imageUrl": "http://localhost:5678/images/appartement-paris-v1651287270508.png",
    "categoryId": 2,
    "userId": 1,
    "category": {
      "id": 2,
      "name": "Appartements"
    }
  },
  {
    "id": 3,
    "title": "Restaurant Sushisen - Londres",
    "imageUrl": "http://localhost:5678/images/restaurant-sushisen-londres1651287319271.png",
    "categoryId": 3,
    "userId": 1,
    "category": {
      "id": 3,
      "name": "Hotels & restaurants"
    }
  },
  {
    "id": 4,
    "title": "Villa “La Balisiere” - Port Louis",
    "imageUrl": "http://localhost:5678/images/la-balisiere1651287350102.png",
    "categoryId": 2,
    "userId": 1,
    "category": {
      "id": 2,
      "name": "Appartements"
    }
  },
  {
    "id": 5,
    "title": "Structures Thermopolis",
    "imageUrl": "http://localhost:5678/images/structures-thermopolis1651287380258.png",
    "categoryId": 1,
    "userId": 1,
    "category": {
      "id": 1,
      "name": "Objets"
    }
  },
  {
    "id": 6,
    "title": "Appartement Paris X",
    "imageUrl": "http://localhost:5678/images/appartement-paris-x1651287435459.png",
    "categoryId": 2,
    "userId": 1,
    "category": {
      "id": 2,
      "name": "Appartements"
    }
  },
  {
    "id": 7,
    "title": "Pavillon “Le coteau” - Cassis",
    "imageUrl": "http://localhost:5678/images/le-coteau-cassis1651287469876.png",
    "categoryId": 2,
    "userId": 1,
    "category": {
      "id": 2,
      "name": "Appartements"
    }
  },
  {
    "id": 8,
    "title": "Villa Ferneze - Isola d’Elba",
    "imageUrl": "http://localhost:5678/images/villa-ferneze1651287511604.png",
    "categoryId": 2,
    "userId": 1,
    "category": {
      "id": 2,
      "name": "Appartements"
    }
  },
  {
    "id": 9,
    "title": "Appartement Paris XVIII",
    "imageUrl": "http://localhost:5678/images/appartement-paris-xviii1651287541053.png",
    "categoryId": 2,
    "userId": 1,
    "category": {
      "id": 2,
      "name": "Appartements"
    }
  },
  {
    "id": 10,
    "title": "Bar “Lullaby” - Paris",
    "imageUrl": "http://localhost:5678/images/bar-lullaby-paris1651287567130.png",
    "categoryId": 3,
    "userId": 1,
    "category": {
      "id": 3,
      "name": "Hotels & restaurants"
    }
  },
  {
    "id": 11,
    "title": "Hotel First Arte - New Delhi",
    "imageUrl": "http://localhost:5678/images/hotel-first-arte-new-delhi1651287605585.png",
    "categoryId": 3,
    "userId": 1,
    "category": {
      "id": 3,
      "name": "Hotels & restaurants"
    }
  }
]


// Creation dynamique du menu de catégories

const navCat = document.querySelector(".categories")
let divCatAll = document.createElement("div")
divCatAll.classList.add("catButton")
divCatAll.classList.add("catSelected")
divCatAll.setAttribute("id", "0")
divCatAll.innerText = "Tous"
navCat.appendChild(divCatAll)

for (i=0; i<categories.length; i++) {
    let divCat = document.createElement("div")
    divCat.classList.add("catButton")
    divCat.setAttribute("id", categories[i].id)
    divCat.innerText = categories[i].name
    navCat.appendChild(divCat)
}


// Creation dynamique de la gallerie

for (i=0; i<works.length; i++) {
    let figure = document.createElement("figure")
    figure.classList.add(works[i].categoryId)
    let divGallery = document.querySelector(".gallery")
    divGallery.appendChild(figure)

    let img = document.createElement("img")
    img.src = works[i].imageUrl
    img.alt = works[i].title
    figure.appendChild(img)

    let figcaption = document.createElement("figcaption")
    figcaption.innerText = works[i].title
    figure.appendChild(figcaption)
}


// Tri des travaux (works) par catégories (categories)

    // Déclaration des constantes (les 4 bouttons)
const buttonTous = document.getElementById("0")
const buttonObjets = document.getElementById("1")
const buttonApparts = document.getElementById("2")
const buttonHotels = document.getElementById("3")
    //Déclaration de la constante qui regroupe les 4 boutons (array)
const allButtons = document.querySelectorAll(".catButton")

    //Déclaration de la fonction qui enlève la classe catSelected à tous les boutons
function removeCatSelected(allButtons) {
    allButtons.forEach(item => {
    item.classList.remove("catSelected")
    })
}

    //L'eventListener qui suit va s'appliquer à tous les boutons
allButtons.forEach(item => {
    item.addEventListener("click", function() {
            //Déselectionner tous les boutons (appel de la fonction removeCatSelected)
        removeCatSelected(allButtons)
            //Selectionner le bouton cliqué (this)
        this.classList.add("catSelected")

/* modifier le DOM pour afficher / ne pas afficher les figures (images + sous-texte)
    Il faut donc :
        Dans le HTML, ajouter un id = "gallery" à la div contenant la classe "gallery"  */
        // chercher cette div gallery
        const gal = document.getElementById("gallery")
        // déclarer une constante qui regroupe tous les enfants de cette div (les <figure>)
        const allFigures = gal.children
        // boucle For pour comparer la classe de catégorie assignée à chaque <figure> avec l'id de this (le bouton cliqué)
        for (let i=0; i<allFigures.length; i++) {
            // Si la classe des <figure> = l'id de this OU si id this = 0
            if (allFigures[i].classList[0] == this.id || this.id == 0) {
                /* alors on change le css : figure {display: default;}, 
                c'est à dire que les <figure> dont l'id correspond à l'id de this sont affichées
                OU que toutes les images + textes sont affichées (id de this = 0 càd bouton Tous) */
                allFigures[i].style.display = "block"
            }
            else {
            /* Sinon, on change le css : figure {display: none;} 
            càd que les figures dont l'id ne correspond pas à l'id de this ne sont pas affichées*/
                allFigures[i].style.display = "none"
            }
        //réinitialisation A FAIRE (ou se place-t-elle, comment...)
        //refaire le fltre de la gallerie, mais avec une classe visible et une classe invisible pour <figure>
        }


    })
})


            
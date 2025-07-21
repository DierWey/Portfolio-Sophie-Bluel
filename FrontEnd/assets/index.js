/*************************************/
// Creation dynamique de la galerie //
/*************************************/

    //Fetch des travaux (works)
fetch("http://localhost:5678/api/works")
    .then((reponse) => reponse.json())
    .then((works) => {
        
        //Création des galeries
        for (i=0; i<works.length; i++) {

            //Galerie page d'accueil
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
    })


/******************************************/
//Creation dynamique du menu de catégories//
/******************************************/

    //Creation du bouton "Tous"
const navCat = document.querySelector(".categories")
let divCatAll = document.createElement("div")
divCatAll.classList.add("catButton")
divCatAll.classList.add("catSelected")
divCatAll.setAttribute("id", "0")
divCatAll.innerText = "Tous"
navCat.appendChild(divCatAll)

    //Fetch des catégories (categories)
fetch("http://localhost:5678/api/categories")
    .then((reponse) => reponse.json())
    .then((categories) => {

        //Création des autres boutons
        for (i=0; i<categories.length; i++) {
            let divCat = document.createElement("div")
            divCat.classList.add("catButton")
            divCat.setAttribute("id", categories[i].id)
            divCat.innerText = categories[i].name
            navCat.appendChild(divCat)
        }

        //Déclaration de la constante qui regroupe tous les boutons (array)
        const allButtons = document.querySelectorAll(".catButton")
        //console.log(allButtons)

        //Déclaration de la fonction qui enlève la classe catSelected à tous les boutons
        function removeCatSelected(allButtons) {
            allButtons.forEach(item => {
            item.classList.remove("catSelected")
            })
        }

        //L'eventListener qui suit va s'appliquer à tous les boutons ; il va...
        allButtons.forEach(item => {
            item.addEventListener("click", function() {

            //Déselectionner tous les boutons (appel de la fonction removeCatSelected())
                removeCatSelected(allButtons)

            //Selectionner le bouton cliqué (this)
                this.classList.add("catSelected")

                const baliseGal = document.getElementById("gallery")
                const allFigures = baliseGal.children
                console.log(allFigures)

                for (let i=0; i<allFigures.length; i++) {
                    if (allFigures[i].classList[0] == this.id || this.id == 0) {
                        allFigures[i].style.display = "block"
                    }
                    else {
                        allFigures[i].style.display = "none"
                    }
                }
            })
        })
    })


/****************/
/* Mode edition */
/****************/

console.log(localStorage)
//localStorage.clear()

const divModifier = document.getElementById("modifier")
const navLogin = document.getElementById("login")
const navLogout = document.getElementById("logout")
const divEdition = document.getElementById("modeEdition")

/* Vérification de la présence du Token */
if (localStorage.getItem("Token") !== null) {
    /* Transformation de la page d'accueil en page d'édition */
    divModifier.classList.remove("hidden") 
    show(divModifier)
    navLogin.classList.add("hidden")
    hide(navLogin)
    navLogout.classList.remove("hidden")
    navCat.classList.add("hidden")
    divEdition.classList.remove("hidden")
}

function hide(elm) {
    elm.classList.add("hidden")
}
function show(elm) {
    elm.classList.remove("hidden")
}

navLogout.addEventListener("click", function() {
    localStorage.removeItem("Token")
    window.location.reload()
})


/***********************************************/
/* Ouverture et fermeture de la fenêtre modale */
/***********************************************/

const modal = document.getElementById("modal")
const modalBodies = document.querySelector(".modal-body")
const ouvrirModal = document.getElementById("modifier")
const fermerModalIcone = document.getElementById("fermerModal")


function toggleModal() {
    modal.classList.toggle("hidden")
}
const stopPropagation = function (e) {
    e.stopPropagation ()
}

// Fermeture de la modale au clic en dehors de la fenetre modale active
/* modal.addEventListener("click", toggleModal)
modalBodies.addEventListener("click", stopPropagation) */

ouvrirModal.addEventListener("click", toggleModal)
fermerModalIcone.addEventListener("click", toggleModal)


const modalGallery = document.getElementById("modalGallery")
const modalAjout = document.getElementById("modalAjout")
const buttonAjout = document.getElementById("buttonAjout")
const flecheRetour = document.getElementById("flecheRetour")
const fermerModalIcone2 = document.getElementById("fermerModal2")

function toggleAjout() {
    modalAjout.classList.toggle("hidden")
}
function toggleGallery() {
    modalGallery.classList.toggle("hidden")
}

buttonAjout.addEventListener("click", function() {
    toggleAjout()
    toggleGallery()
})
flecheRetour.addEventListener("click", function() {
    toggleAjout()
    toggleGallery()
    document.getElementById("modalForm").reset()
})

fermerModalIcone2.addEventListener("click", function() {
    toggleModal()
    toggleAjout()
    toggleGallery()
    document.getElementById("modalForm").reset()
})

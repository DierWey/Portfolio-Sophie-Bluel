const apiURL = "http://localhost:5678/api/"

/*************************************/
// Creation dynamique de la galerie //
/*************************************/

function resetWorks() {
    document.getElementById("gallery").innerHTML = ""
    document.getElementById("gallery-mini").innerHTML = ""
}

//Fetch des travaux (works)
function works() {
    fetch(apiURL + "works")
    .then((reponse) => reponse.json())
    .then((works) => {
        
        for (i=0; i<works.length; i++) {
        //Création de la galerie de la page d'accueil
            //Création dynamique de la <figure> qui va contenir l'image et de son id de catégorie
            const figureGallery = document.createElement("figure")
            figureGallery.classList.add(works[i].categoryId)
            const divGallery = document.querySelector(".gallery")
            divGallery.appendChild(figureGallery)

            const img = document.createElement("img")
            img.src = works[i].imageUrl
            img.alt = works[i].title
            img.id = works[i].id
            figureGallery.appendChild(img)

            const figcaption = document.createElement("figcaption")
            figcaption.innerText = works[i].title
            figureGallery.appendChild(figcaption)

        //Création de la galerie de la première fenêtre modale
            //Création dynamique de la <figure> qui va contenir l'image et de son id de catégorie
            const figureModalGallery = document.createElement("figure")
            figureModalGallery.classList.add(works[i].categoryId)
            const divGalleryMini = document.querySelector(".gallery-mini")
            divGalleryMini.appendChild(figureModalGallery)
            //Création dynamique de la balise <img> avec sa src et son alt
            const imgMini = document.createElement("img")
            imgMini.src = works[i].imageUrl
            imgMini.alt = works[i].title
            figureModalGallery.appendChild(imgMini)
            //Création dynamique de l'icone poubelle
            const icon = document.createElement("i")
                //Attribution à l'icone poubelle d'un id qui reprend celui de son image correspondante
            icon.setAttribute("id", "trash_"+works[i].id)
            icon.onclick=deleteElement
            figureModalGallery.appendChild(icon).classList.add("fa-solid", "fa-trash-can")
        }

    })
}

works()

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
fetch(apiURL + "categories")
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

//console.log(localStorage)
//localStorage.clear()

const divModifier = document.getElementById("modifier")
const navLogin = document.getElementById("login")
const navLogout = document.getElementById("logout")
const divEdition = document.getElementById("modeEdition")

/* Vérification de la présence du Token */
if (localStorage.getItem("Token") !== null) {
    /* Transformation de la page d'accueil en page d'édition */
    show(divModifier)
    hide(navLogin)
    show(navLogout)
    hide(navCat)
    show(divEdition)
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
/* Ouverture et fermeture des fenêtres modales */
/***********************************************/

const modal = document.getElementById("modal")
const ouvrirModal = document.getElementById("modifier")

const modalGallery = document.getElementById("modalGallery")
const buttonAjout = document.getElementById("buttonAjout")
const fermerModalIcon = document.getElementById("fermerModal")

const modalAjout = document.getElementById("modalAjout")
const flecheRetour = document.getElementById("flecheRetour")
const fermerModalIcon2 = document.getElementById("fermerModal2")

const stopPropagation = function (e) {
    e.stopPropagation ()
}

function toggleModal() {
    modal.classList.toggle("hidden")
}
function toggleAjout() {
    modalAjout.classList.toggle("hidden")
}
function toggleGallery() {
    modalGallery.classList.toggle("hidden")
}
function resetForm() {    
    document.getElementById("modalForm").reset()
    document.getElementById("photoAdd-button").classList.remove("hidden")
    document.getElementById("iconImage").classList.remove("hidden")
    document.getElementById("photoAdd-infos").classList.remove("hidden")
    document.getElementById("photoAdd-preview").src=""
    document.getElementById("buttonValidate").classList.remove("buttonValidateTrue")
    document.getElementById("buttonValidate").classList.add("buttonValidateFalse")
    document.getElementById("msgErrorForm").classList.add("hidden")
}
function modalDefault() {
    show(modalGallery)
    hide(modalAjout)
}

// Ouverture de la modale au clic sur "modifier"
ouvrirModal.addEventListener("click", toggleModal)

// Fermeture de la modale au clic en dehors de la fenetre modale active
modal.addEventListener("click", function() {
    toggleModal()
    resetForm()
    modalDefault()
})
modalGallery.addEventListener("click", stopPropagation)
modalAjout.addEventListener("click", stopPropagation)

// Fermeture de la modale au clic sur l'icone x de la première fenêtre modale
fermerModalIcon.addEventListener("click", toggleModal)

// Fermeture de la première fenêtre modale et ouverture de la deuxième fenêtre modale
// au clic sur le bouton "Ajouter une photo"
buttonAjout.addEventListener("click", function() {
    toggleAjout()
    toggleGallery()
})

// Fermeture de la deuxième fenêtre modale et ouverture de la première au clic sur la flêche
flecheRetour.addEventListener("click", function() {
    resetForm()
    modalDefault()
})

// Fermeture de la modale au clic sur l'icone x de la deuxième fenêtre modale
fermerModalIcon2.addEventListener("click", function() {
    toggleModal()
    resetForm()
    modalDefault()
})


/*********************************************** **********************************************/


/*********************************/
/**** Première fenêtre modale ****/
/*********************************/

/** ----- Suppression des travaux ----- **/

// Déclaration de la fonction deleteElement appelée lorsqu'on click sur l'icone trash-can (ligne 26)
function deleteElement(event) {
    event.preventDefault()
    // Récupération de l'id de l'element cliqué (icone trash-can)
    let clickedTrashId = event.srcElement.id
    let id = clickedTrashId.slice(6)
    // Récupération de la <figure> parente de l'icone trash-can en vue de sa supression du DOM
    let trashFigure = document.getElementById(clickedTrashId).parentElement
    // Récupération de la <figure> parente de l'image de la galerie en vue de sa supression du DOM
    let imageGalleryFigure = document.getElementById(id).parentElement

    // Maintenant qu'on a l'id, on peut faire le Fetch (ciblé sur cet id) qui va lui appliquer
    // la méthode Delete...
    fetch(apiURL + `works/${id}`, {
        method: "DELETE",
        headers: {
        "accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("Token")}`,
        },
        // Pas de body : il s'agit d'un Delete. La cible, ${id}, est déjà précisée dans l'url
        // du fetch
    })
    .then((response) => {
        if (response.ok) {
        //Suppression de l'image dans la galerie de la fenêtre modale (en supprimant sa <figure> parente)
        trashFigure.remove()
        //Suppression de l'image dans la galerie principale (en supprimant sa <figure> parente)
        imageGalleryFigure.remove()
        console.log("L'image a été supprimée")
        }
    })
}


/*********************************/
/**** Deuxième fenêtre modale ****/
/*********************************/

/** ----- Génération dynamique des <options> du <select> "Catégories" ----- **/

//Fetch des catégories (categories)
fetch(apiURL + "categories")
    .then((reponse) => reponse.json())
    .then((categories) => {
        
        // Génération dynamique des <options>
        for (i=0; i<categories.length; i++) {
            const select = document.getElementById("categories")
            const option = document.createElement("option")
            option.value = categories[i].id
            option.innerText = categories[i].name
            select.appendChild(option)
        }
    })


/** ----- Formulaire : Affichage de l'image selectionnée ----- **/

//récupération des infos du formulaire
const imgPreview = document.getElementById("photoAdd-preview")
const buttonAdd = document.getElementById("photoAdd-button")
const iconImage = document.getElementById("iconImage")
const photoInfos = document.getElementById("photoAdd-infos")

const formAjout = document.querySelector("#modalForm")

//Déclaration de la fonction qui cache/affiche les divers éléments de la <div> #photoAdd-container
function showElement(el, show) {
    if(show) {
        el.classList.remove("hidden")
    } else {
        el.classList.add("hidden")
    }
}

//Preview de l'image selectionnée 
const imgFile = document.querySelector("input[type=file]")

imgFile.addEventListener("change", function() {
    const selectedFile = document.getElementById("photoAdd-inpunt").files[0]

    // Lire l'image avec FileReader
    const imgReader = new FileReader()
    imgReader.readAsDataURL(selectedFile)
    imgReader.onloadend = function(event) {
        const img = document.getElementById("photoAdd-preview")
        img.src = event.target.result
    }

    if (selectedFile !== null) {
        showElement(imgPreview, true)
        showElement(buttonAdd, false)
        showElement(iconImage, false)
        showElement(photoInfos, false)
    } else {
        showElement(imgPreview, false)
        showElement(buttonAdd, true)
        showElement(iconImage, true)
        showElement(photoInfos, true)
    }
})         

// Changer la couleur du bouton "Valider" quand tous les champs sont remplis
const imageInput = document.getElementById("photoAdd-inpunt")
const inputImgValue = imageInput.value
const titleInput = document.getElementById("titre")
const inputTitleValue = titleInput.value
const categoryInput = document.getElementById("categories")
const inputCategoryValue = categoryInput.value

formAjout.addEventListener("change", function() {
    if (imageInput.value !== "" && titleInput.value !== "" && categoryInput.value != 0) {
        //console.log("Le boutton doit être vert")
        document.getElementById("buttonValidate").classList.remove("buttonValidateFalse")
        document.getElementById("buttonValidate").classList.add("buttonValidateTrue")        
        document.getElementById("msgErrorForm").classList.add("hidden")
    } else {
        //console.log("Le boutton doit être gris")
        document.getElementById("buttonValidate").classList.remove("buttonValidateTrue")
        document.getElementById("buttonValidate").classList.add("buttonValidateFalse")
    }
})


/** ----- Envoi de nouveaux travaux ----- **/

// Ecoute de l'évènement submit
formAjout.addEventListener("submit", function(event) {

    // On empêche le comportement par défaut (l'envoi sera géré dans le code)
    event.preventDefault()

    // Préparation du formulaire
    const formData = new FormData()
    formData.append("title", document.getElementById("titre").value);
    formData.append("category", parseInt(document.getElementById("categories").value))
    formData.append("image", document.getElementById("photoAdd-inpunt").files[0])
    const tokenVerif = localStorage.getItem("Token")
    //console.log(tokenVerif)
    
    // Fetch
    fetch(apiURL + "works", {
        method: "POST",
        headers: { 
            "accept": "application/json",
            //"Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${tokenVerif}`
        },
        body: formData,
    }) 
    .then((response) => {
        let responseStatus = response.status

        if (responseStatus === 400) {
            let msgErrorForm = document.getElementById("msgErrorForm")
            msgErrorForm.classList.remove("hidden")
            msgErrorForm.textContent = "Le formulaire n'est pas correctement rempli."            
        } 
        else {
        resetWorks()
        works()
        resetForm()
        document.getElementById("msgErrorForm").classList.add("hidden")
        console.log("L'image a été ajoutée à la galerie")
        }    
    })    
})

/*********************************/
/**** Première fenêtre modale ****/
/*********************************/

/** ----- Affichage de la mini galerie ----- **/

//Fetch des travaux (works)
fetch("http://localhost:5678/api/works")
    .then((reponse) => reponse.json())
    .then((works) => {
        
        //Création de la galerie de la modale
        for (i=0; i<works.length; i++) {
            const galleryMiniElements = document.createElement("div")
            galleryMiniElements.classList.add(works[i].categoryId)
            const divGalleryMini = document.querySelector(".gallery-mini")
            divGalleryMini.appendChild(galleryMiniElements)

            const img = document.createElement("img")
            img.src = works[i].imageUrl
            img.alt = works[i].title
            galleryMiniElements.appendChild(img)

            const icone = document.createElement("i")
            //Attribution à l'icone poubelle d'un id qui reprend celui de son image correspondante
            icone.setAttribute("id", "trash_"+works[i].id)
            icone.onclick=deleteElement
            galleryMiniElements.appendChild(icone)
            .classList.add("fa-solid", "fa-trash-can")
        }
    })


/** ----- Suppression des travaux ----- **/

//Déclaration de la fonction deleteElement appelée lorsqu'on click sur l'icone trash-can (ligne 26)
function deleteElement(event) {
    event.preventDefault()
    //Récupération de l'id de l'element
    let clickedTrashId = event.srcElement.id
    console.log(clickedTrashId)
    let id = clickedTrashId.slice(6)
    console.log(id)
    // Maintenant qu'on a l'id, on peut faire le Fetch (ciblé sur cet id) qui va lui appliquer
    // la méthode Delete...
    fetch(`http://localhost:5678/api/works/${id}`, {
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
        console.log("image supprimée")
        location.reload()
        }
    })
}




/*********************************/
/**** Deuxième fenêtre modale ****/
/*********************************/

/** ----- Génération dynamique des <options> du <select> "Catégories" ----- **/

//Fetch des catégories (categories)
fetch("http://localhost:5678/api/categories")
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
const iconeImage = document.getElementById("iconeImage")
const photoInfos = document.getElementById("photoAdd-infos")

const formAjout = document.querySelector("#modalForm")

//Déclaration de la fonction qui cachent/affichent les divers éléments de la <div> #photoAdd-container

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
        showElement(IconeImage, false)
        showElement(PhotoInfos, false)
    } else {
        showElement(imgPreview, false)
        showElement(buttonAdd, true)
        showElement(IconeImage, true)
        showElement(PhotoInfos, true)
    }
})         

// Changer la couleur du bouton "Valider" quand tous les champs sont remplis

const imageInput = document.getElementById("photoAdd-inpunt")
const inputImgValue = imageInput.value
//console.log(inputImgValue)
const titleInput = document.getElementById("titre")
const inputTitleValue = titleInput.value
//console.log(inputTitleValue)
const categoryInput = document.getElementById("categories")
const inputCategoryValue = categoryInput.value
//console.log(inputCategoryValue)

formAjout.addEventListener("change", function() {
    if (imageInput.value !== "" && titleInput.value !== "" && categoryInput.value != 0) {
        console.log("Le boutton doit être vert")
        document.getElementById("buttonValidate").classList.remove("buttonValidateFalse")
        document.getElementById("buttonValidate").classList.add("buttonValidateTrue")
    } else {
        console.log("Le boutton doit être gris")
        document.getElementById("buttonValidate").classList.remove("buttonValidateTrue")
        document.getElementById("buttonValidate").classList.add("buttonValidateFalse")
    }
})


/** ----- Envoi de nouveaux travaux ----- **/
    
//Ecoute de l'évènement submit
formAjout.addEventListener("submit", function(event) {

    // On empêche le comportement par défaut (l'envoi sera géré dans le code)
    event.preventDefault()

    // Préparation du formulaire
    const formData = new FormData()
    formData.append("title", document.getElementById("titre").value);
    formData.append("category", parseInt(document.getElementById("categories").value))
    formData.append("image", document.getElementById("photoAdd-inpunt").files[0])
    //console.log(formData)
    const tokenVerif = localStorage.getItem("Token")
    //console.log(tokenVerif)
    
    // Fetch
    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: { 
            "accept": "application/json",
            //"Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${tokenVerif}`
        },
        body: formData,
    }) 
    .then((res) => {
    console.log(res)
    document.getElementById("modalForm").reset()
    location.reload()
    })    
})
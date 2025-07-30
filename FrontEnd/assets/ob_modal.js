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
            //Création dynamique de la <div> qui va contenir l'image et de son id de catégorie
            const figureModalGallery = document.createElement("figure")
            figureModalGallery.classList.add(works[i].categoryId)
            const divGalleryMini = document.querySelector(".gallery-mini")
            divGalleryMini.appendChild(figureModalGallery)
            //Création dynamique de la balise <img> avec sa src et son alt
            const img = document.createElement("img")
            img.src = works[i].imageUrl
            img.alt = works[i].title
            figureModalGallery.appendChild(img)
            //Création dynamique de l'icone poubelle
            const icone = document.createElement("i")
                //Attribution à l'icone poubelle d'un id qui reprend celui de son image correspondante
            icone.setAttribute("id", "trash_"+works[i].id)
                //
            icone.onclick=deleteElement
            figureModalGallery.appendChild(icone).classList.add("fa-solid", "fa-trash-can")
        }
    })


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
        showElement(iconeImage, false)
        showElement(photoInfos, false)
    } else {
        showElement(imgPreview, false)
        showElement(buttonAdd, true)
        showElement(iconeImage, true)
        showElement(photoInfos, true)
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

// Déclaration de la fonction qui reset les différents éléments du formulaire
function resetForm() {    
    document.getElementById("modalForm").reset()
    document.getElementById("photoAdd-button").classList.remove("hidden")
    document.getElementById("iconeImage").classList.remove("hidden")
    document.getElementById("photoAdd-infos").classList.remove("hidden")
    document.getElementById("photoAdd-preview").src=""
    document.getElementById("msgErrorForm").classList.add("hidden")
}
    
// Ecoute de l'évènement submit
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
    .then((response) => {
        console.log(response)
        let responseStatus = response.status
        console.log(responseStatus)

        if (responseStatus === 400) {
            console.log("Error 400")
            let msgErrorForm = document.getElementById("msgErrorForm")
            msgErrorForm.classList.remove("hidden")
            msgErrorForm.textContent = "Le formulaire n'est pas correctement rempli."
            
        } 
        else {

        resetForm()
        document.getElementById("msgErrorForm").classList.add("hidden")
        console.log("L'image a été ajoutée à la galerie")
        //location.reload()
            
        let responseJson = response.json()
        console.log(responseJson)



        /*    // Modification du DOM pour ajouter l'image dans la galerie de la première fenêtre modale
                //Création dynamique de la <div> qui va contenir l'image et de son id de catégorie
            const figureModalGallery = document.createElement("figure")
            figureModalGallery.classList.add(works[i].categoryId)
            const divGalleryMini = document.querySelector(".gallery-mini")
            divGalleryMini.appendChild(figureModalGallery)
                //Création dynamique de la balise <img> avec sa src et son alt
            const img = document.createElement("img")
            img.src = works[i].imageUrl
            img.alt = works[i].title
            figureModalGallery.appendChild(img)
                //Création dynamique de l'icone poubelle
            const icone = document.createElement("i")
                    //Attribution à l'icone poubelle d'un id qui reprend celui de son image correspondante
            icone.setAttribute("id", "trash_"+works[i].id)
                //
            icone.onclick=deleteElement
            figureModalGallery.appendChild(icone).classList.add("fa-solid", "fa-trash-can")
        */    

            
        } 
    
    })    
})


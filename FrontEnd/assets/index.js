//Creation du menu de catégories//
const navCat = document.querySelector(".categories")
let divCatAll = document.createElement("div")
divCatAll.classList.add("catButton")
divCatAll.classList.add("catSelected")
divCatAll.setAttribute("id", "0")
divCatAll.innerText = "Tous"
navCat.appendChild(divCatAll)

fetch("http://localhost:5678/api/categories")
    .then((reponse) => reponse.json())
    .then((categories) => {
        console.log(categories)
        for (i=0; i<categories.length; i++) {
            let divCat = document.createElement("div")
            divCat.classList.add("catButton")
            divCat.setAttribute("id", categories[i].id)
            divCat.innerText = categories[i].name
            navCat.appendChild(divCat)
        }
    })


//Tri par catégories //
const buttonTous = document.getElementById("0")
const buttonObjets = document.getElementById("1")
const buttonApparts = document.getElementById("2")
const buttonHotels = document.getElementById("3")
const fetchWorks = fetch("http://localhost:5678/api/works").then((reponse) => reponse.json())

//    element.classlist.add("catSelected")
//    element.classlist.remove("catSelected")

// EventListener : je clic sur n'importe quel bouton
// 
// j'enlève la classe "catSelected" à tous les boutons
// j'ajoute la classe "catSelected" au bouton cliqué (this ?)
// 
// si bouton cliqué est "Tous"
//  alors j'affiche toutes les images
// sinon
//  j'affiche les images dont la classe (1, 2 ou 3) = works.categoryId (1, 2 ou 3)

// Creation dynamique de la gallerie //
fetch("http://localhost:5678/api/works")
    .then((reponse) => reponse.json())
    .then((works) => {
        console.log(works)
        for (i=0; i<works.length; i++) {
            let figure = document.createElement("figure")
            let divGallery = document.querySelector(".gallery")
            divGallery.appendChild(figure)

            let img = document.createElement("img")
            img.classList.add(works[i].categoryId)
            img.src = works[i].imageUrl
            img.alt = works[i].title
            figure.appendChild(img)

            let figcaption = document.createElement("figcaption")
            figcaption.innerText = works[i].title
            figure.appendChild(figcaption)
        }
    })




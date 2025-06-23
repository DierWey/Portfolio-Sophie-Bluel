/*************************************/
// Creation dynamique de la gallerie //
/*************************************/

    //Fetch des travaux (works)
fetch("http://localhost:5678/api/works")
    .then((reponse) => reponse.json())
    .then((works) => {
        
        //Création de la gallerie
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



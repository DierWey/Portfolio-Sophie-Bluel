//Creation des 4 <div> de categories//
let navCat = document.querySelector(".categories")

let divCat0 = document.createElement("div")
divCat0.classList.add("catSelected")
divCat0.setAttribute("id", "cat0")
divCat0.innerText = "Tous" //categories[j].name
navCat.appendChild(divCat0)

let divCat1 = document.createElement("div")
divCat1.classList.add("catUnselected")
divCat1.setAttribute("id", "cat1")
divCat1.innerText = "Objets" //categories[j].name
navCat.appendChild(divCat1)

let divCat2 = document.createElement("div")
divCat2.classList.add("catUnselected")
divCat2.setAttribute("id", "cat2")
divCat2.innerText = "Appartements" //categories[j].name
navCat.appendChild(divCat2)

let divCat3 = document.createElement("div")
divCat3.classList.add("catUnselected")
divCat3.setAttribute("id", "cat3")
divCat3.innerText = "Hotels & restaurants" //categories[j].name
navCat.appendChild(divCat3)


fetch("http://localhost:5678/api/works")
    .then((reponse) => reponse.json())
    .then((works) => {
        console.log(works)
        for (i=0; i<works.length; i++) {
            let figure = document.createElement("figure")
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




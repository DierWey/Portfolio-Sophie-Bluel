/* Récupération des infos du formulaire*/
const form = document.querySelector("form")

/* Ecoute de l'évènement submit */
form.addEventListener("submit", function(event) {
  /* On empêche le comportement par défaut (l'envoi sera géré dans le code) */
  event.preventDefault()

  /* Déclaration des variables de connexion */
  const emailInput = document.getElementById("email")
  const valeurEmail = emailInput.value
  //console.log(valeurEmail)

  const mdpInput = document.getElementById("password")
  const valeurMdp = mdpInput.value
  // console.log(valeurMdp)

  async function loginUser() {
    const response = fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { 
        "accept": "application/json",
        "Content-Type": "application/json", 
        "Authorization": "Bearer " + "token"
      },
      body: JSON.stringify({
        email: valeurEmail,
        password: valeurMdp
      })
    })

    let responseStatus = (await response).status
    // console.log(responseStatus)

    /* Vérification de la réussite de la connexion */
    if (responseStatus === 200) {
      // console.log("ça fonctionne")    
      
      /* Stockage du token dans le local storage */
      //console.log(response)
      const userInfos = (await response).json()
      //console.log(userInfos)
      const userToken = (await userInfos).token
      //console.log(userToken)
      localStorage.setItem("Token", userToken)
      //console.log(localStorage)
      //localStorage.clear()
      
      /* redirige l'utilisateur vers la page d'accueil en mode édition */
      window.location.replace("../index.html")

    } else {
      /* Affiche le message d'erreur */
      // console.log("ça ne fonctionne pas")
      document.getElementById("msgError").style.display = "block"
    }
  }

  loginUser()

})


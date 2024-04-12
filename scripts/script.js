const navOptionsElement = document.getElementById('navBar')
const charactersNavElement = document.getElementById('charactersNav')
const planetsNavElement = document.getElementById('planetsNav')
const shipsNavElement = document.getElementById('shipsNav')
const filmsNavElement = document.getElementById('filmsNav')

charactersNavElement.addEventListener("click", () => {
  renderCards('https://swapi.dev/api/people')
})

planetsNavElement.addEventListener("click", () => {
  renderCards('https://swapi.dev/api/planets?page=2')
})

shipsNavElement.addEventListener("click", () => {
  renderCards('https://swapi.dev/api/starships')
})

filmsNavElement.addEventListener("click", () => {
  renderCards('https://swapi.dev/api/films')
})

async function renderCards(apiEndpoint) {
  const list = document.querySelector('#cardList')

  list.innerHTML = ""

  const dataList = await fetch(apiEndpoint, {
    method: "GET"
  })

    .then(function (response) {
      return response.json()
    })

  for (let indice = 0; indice < dataList.results.length; indice++) {
    const elemento = dataList.results[indice]

    const li = document.createElement("li")
    const divFront = document.createElement('div')
    const divVerse = document.createElement('div')
    const divFrontName = document.createElement('div')
    const divVerseName = document.createElement('div')
    const dataLlist = document.createElement('ul')
    const descriptionElement = document.createElement('li')
    const subDescriptionElement = document.createElement('li')
    const image = document.createElement('img')

    const cardTitle = elemento.name ?? elemento.title

    li.classList.add('card', 'listCard')
    divFront.classList.add('face', 'front');

    divFrontName.classList.add("titleCard")
    divFrontName.innerText = cardTitle

    divVerseName.classList.add("titleCard")
    divVerseName.innerText = cardTitle

    dataLlist.classList.add("cardData")

    //personagens
    if (elemento.birth_year !== undefined) {
      descriptionElement.innerText = 'Ano de Nascimento: ' + elemento.birth_year
    }

    if (elemento.homeworld !== undefined) {
      const planetName = await fetch(elemento.homeworld, {
        method: "GET"
      })
        .then(function (response) {
          return response.json()
        })

      subDescriptionElement.innerText = 'Planeta: ' + planetName.name
    }

    //planetas
    if (elemento.climate !== undefined) {
      descriptionElement.innerText = 'Clima: ' + elemento.climate
    }

    if (elemento.population !== undefined) {
      subDescriptionElement.innerText = 'População: ' + elemento.population
    }

    //naves
    if (elemento.model !== undefined) {
      descriptionElement.innerText = 'Modelo: ' + elemento.model
    }

    if (elemento.passengers !== undefined) {
      subDescriptionElement.innerText = 'Passageiros: ' + elemento.passengers
    }

    //filmes
    if (elemento.release_date !== undefined) {
      descriptionElement.innerText = 'Lançamento: ' + elemento.release_date
    }

    if (elemento.episode_id !== undefined) {
      subDescriptionElement.innerText = 'Episode: ' + elemento.episode_id
    }

    divVerse.classList.add("face", "back")

    image.src = "./assets/starduck.png"
    image.alt = "starduck"

    dataLlist.append(descriptionElement, subDescriptionElement)
    divFront.append(divFrontName, dataLlist)
    divVerse.append(divVerseName, image)
    li.append(divFront, divVerse)
    list.append(li)
  }
  turnsCard()
}

function turnsCard() {
  const cards = document.querySelectorAll('.listCard')

  for (let indice = 0; indice < cards.length; indice++) {
    const card = cards[indice]

    card.addEventListener('click', function () {
      card.classList.toggle('flip')
    })
  }
}



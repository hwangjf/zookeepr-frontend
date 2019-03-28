// <!-- <tr>
  // <td>Example Name</td>
  // <td>Carnivore</td>
  // <td>1</td>
// </tr> -->

const API_URL = 'https://thawing-escarpment-84169.herokuapp.com/api/v1'

document.addEventListener("DOMContentLoaded", () => {
  console.log('the DOM content has loaded');
  const tbody = document.querySelector('tbody')
  const form = document.querySelector('form.ui.form')

  const createAnimalRow = (animal) => {
    // console.log('animal', animal);
    const tr = document.createElement('tr')
    tr.innerHTML = `
      <td class="four wide"><img class='animal-image' src='${animal.attributes.image_url}'/></td>
      <td class="four wide">${animal.attributes.name}</td>
      <td class="four wide">${animal.attributes.diet}</td>
      <td class="four wide">${animal.attributes.species_name}</td>
    `

    return tr
  }

  fetch(`${API_URL}/animals`)
  .then(res => res.json())
  .then(({data}) => {
    // console.log('here is the response from the API', animals);
    // debugger
    data.map(createAnimalRow).forEach(animal => {
      // debugger
      tbody.appendChild(animal)
    })
  })


  form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(e);
    const name = form.querySelector('#animal-name').value
    const species_name = form.querySelector('#animal-species').value
    const diet = form.querySelector('#animal-diet .selected').dataset.value
    const image_url = form.querySelector('#animal-image_url').value
    // const newAnimalRow = createAnimalRow({name: name})
    // tbody.appendChild(newAnimalRow)
    fetch(
      `${API_URL}/animals`,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          image_url: image_url,
          species_name: species_name,
          diet: diet
        })
      }
    )
    .then(res => res.json())
    .then(data => {
      const newAnimalRow = createAnimalRow(data)
      tbody.appendChild(newAnimalRow)
    })
  })
})

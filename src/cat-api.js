// const BASE_URL = 'https://api.thecatapi.com/v1/images/search';

// const API_KEY =
//   'live_uNUbTqNN0SdWOPYyT1IwdueWajs8dsQ9r4mgxb5rdp72LDP3iEQo7TiwRj3dhNEB';
// const END_POINT =
//   'https://api.thecatapi.com/v1/images/search??breed_ids=beng,abys';
// let catInfo = document.querySelector('.cat-info');
// let choiceBreeds = [];

// export function fetchBreeds() {
//   const BASE_URL = `https://api.thecatapi.com/v1/breeds`;

//   const API_KEY =
//     'live_uNUbTqNN0SdWOPYyT1IwdueWajs8dsQ9r4mgxb5rdp72LDP3iEQo7TiwRj3dhNEB';
//   return fetch(BASE_URL, {
//     headers: {
//       'x-api-key': API_KEY,
//     },
//   }).then(response => {
//     if (!response.ok) {
//       throw new Error(response.statusText || response.status);
//     }
//     return response.json();
//   });
// }

// fetchBreeds()
//   .then(data => {
//     choiceBreeds = data;
//     console.log(choiceBreeds);
//     catInfo.insertAdjacentHTML('beforeend', createMarkup(choiceBreeds));
//   })
//   .catch(err => console.error(err));

// function createMarkup(arr) {
//   return arr
//     .map(
//       ({ image, name, description, temperament }) =>
//         `<li>
//           <img src="${image.url}" class="${name}" alt="${name}">
//           <h2>${name}</h2>
//           <p>${description}</p>
//           <p>${temperament}</p>
//         </li>`
//     )
//     .join('');
// }

//   .then(choiceBreeds => {
//     for (let i = 0; i < choiceBreeds.length; i++) {
//       const breed = choiceBreeds[i];
//       let option = document.createElement('option');

//       option.value = i;
//       option.innerHTML = `${breed.name}`;
//       document.querySelector('.breed-select').appendChild(option);
//       console.log(option);
//     }
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

// export function(fetchCatByBreed()){
//     return
// }

import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_uNUbTqNN0SdWOPYyT1IwdueWajs8dsQ9r4mgxb5rdp72LDP3iEQo7TiwRj3dhNEB';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid response');
      }
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching breeds:', error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid response');
      }
      return response.data[0]; // Возвращаем первый элемент массива
    })
    .catch(error => {
      console.error('Error fetching cat:', error);
      throw error;
    });
}

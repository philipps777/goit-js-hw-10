import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const catImage = document.getElementById('breed_image');

function populateBreedSelect(breeds) {
  breedSelect.innerHTML = '';
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

function showCatInfo(cat) {
  const catImageContainer = document.createElement('div'); // Создаем контейнер для изображения
  catImageContainer.appendChild(catImage);

  catImage.src = cat.url;
  catImage.alt = cat.breeds[0].name;

  const catName = document.createElement('h2');
  catName.textContent = cat.breeds[0].name;

  const catDescription = document.createElement('p');
  catDescription.textContent = cat.breeds[0].description;

  const catTemperament = document.createElement('p');
  catTemperament.textContent = cat.breeds[0].temperament;

  catInfo.innerHTML = ''; // Очистить содержимое блока
  catInfo.appendChild(catImageContainer); // Добавляем контейнер с изображением в блок
  catInfo.appendChild(catName);
  catInfo.appendChild(catDescription);
  catInfo.appendChild(catTemperament);
  catInfo.style.display = 'block'; // Показать блок
}

breedSelect.addEventListener('change', () => {
  const breedId = breedSelect.value;
  fetchCatByBreed(breedId)
    .then(cat => {
      showCatInfo(cat);
    })
    .catch(error => {
      console.error('Error fetching cat:', error);
      catInfo.style.display = 'none'; // Скрыть блок
    });
});

fetchBreeds()
  .then(breeds => {
    populateBreedSelect(breeds);
  })
  .catch(error => {
    console.error('Error fetching breeds:', error);
    breedSelect.disabled = true; // Отключить селект при ошибке
  });

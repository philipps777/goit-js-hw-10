import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const res = {
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

const { breedSelect, catInfo, loader, error } = res;

function populateBreedSelect(cat) {
  const options = cat
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
  breedSelect.innerHTML = options;
  new SlimSelect({
    select: '.breed-select',
  });
}

function showCatInfo(cat) {
  console.log(cat);
  if (cat && cat.breeds && cat.breeds.length > 0) {
    const breed = cat.breeds[0];
    const { name, description, temperament } = breed;
    const url = cat.url;
    catInfo.innerHTML = `
      <img class="cat-img" src="${url}" alt="${name}" width="460px">
      <div class="cat-info-div">
        <h2 class="cat-title">${name}</h2>
        <p class="cat-description">${description}</p>
        <p class="cat-temperament"><span class="cat-temperament-span">Temperament:</span>${temperament}</p>
      </div>`;
  } else {
    catInfo.innerHTML = 'No information available for this cat.';
  }
}

breedSelect.addEventListener('change', onSelectBreed);

function onSelectBreed(evt) {
  loader.classList.remove('is-hidden');
  breedSelect.classList.add('is-hidden');
  catInfo.classList.add('is-hidden');

  const breedId = evt.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      loader.classList.add('is-hidden');
      breedSelect.classList.remove('is-hidden');
      showCatInfo(data);
      catInfo.classList.remove('is-hidden');
    })
    .catch(error => {
      console.error('Error fetching cat:', error);
      loader.classList.add('is-hidden');
      breedSelect.classList.remove('is-hidden');
      catInfo.classList.add('is-hidden');
      showErrorNotification(`Failed to get the cat's details`);
    });
}

function showErrorNotification(error) {
  Notiflix.Notify.failure(error);
}

fetchBreeds()
  .then(breeds => {
    populateBreedSelect(breeds);
    console.log(breeds);
  })
  .catch(error => {
    console.error('Error fetching breedserror:', error);
    breedSelect.disabled = true;
    showErrorNotification(error);
  });

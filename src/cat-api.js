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
      return response.data[0];
    })
    .catch(error => {
      console.error('Error fetching cat:', error);
      throw error;
    });
}

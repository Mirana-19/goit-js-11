const axios = require('axios').default;

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function getImages(q, page) {
  const options = {
    params: {
      q: q,
      image_type: 'photo',
      orientation: 'horizontal',
      key: '27366068-7f092b690db13a9a2c4fde80b',
      safesearch: true,
      page: page,
      per_page: 40,
    },
  };

  try {
    const res = await axios.get('', options);
    return res;
  } catch (error) {
    console.log(error.message);
  }
}

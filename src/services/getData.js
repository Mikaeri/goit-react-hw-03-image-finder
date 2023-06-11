import axios from 'axios';
const URL = 'https://pixabay.com/api/';
const KEY = '35690668-471bd125550def281f6c08618';
const perPage = 12;

export async function getData(word, page, signal) {
  const response = await axios.get(URL, {
    signal,
    params: {
      key: KEY,
      q: word,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: perPage,
      page: page,
    },
  });

  return response.data;
}

import axios from 'axios';
export async function getData(word, page) {
  const URL = 'https://pixabay.com/api/';
  const KEY = '35690668-471bd125550def281f6c08618';
  const searchParams = new URLSearchParams({
    key: KEY,
    q: word,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 12,
  });

  return await axios.get(`${URL}?${searchParams}`);
}

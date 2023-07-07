
const BASE_URL="https://api.themoviedb.org/3";

export const apiGet = ({path}) => {
 return fetch(`${BASE_URL}/${path}`)
 }
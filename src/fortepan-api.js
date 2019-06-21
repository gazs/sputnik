const CORS = 'https://cors-anywhere.herokuapp.com/';

export const getSearchUrl = ({limit=100, q, yearFrom=1900, yearTo=1990}) =>
    `${CORS}http://fortepan.hu/m/m.php?action=search_view&limit=${limit}&q=${q}&year_from=${yearFrom}&year_to=${yearTo}&lang=hu`

export const getThumbnailUrl = (filename) => `http://fortepan.hu/_photo/68x68/${filename}.jpg`

export const getDisplayUrl = (filename) => `http://fortepan.hu/_photo/display/${filename}.jpg`
export const getDownloadUrl = (filename) => `http://fortepan.hu/_photo/download/fortepan_${filename}.jpg` 

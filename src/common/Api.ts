import Vue from 'vue';

import axios from 'axios';

//var base_endpoint:  string = 'https://img-database.herokuapp.com/'
var base_endpoint:  string = 'http://localhost:8080/'

var get_all_image:  string = 'all_image'
var get_image:      string = 'images'
var get_all_genre:  string = 'all_genre'
var get_all_charactor: string = 'all_charactor'
var put_registe:    string = 'registe'
var put_genre:      string = 'new_genre'
var put_charactor:  string = 'new_charactor'
var put_fav:        string = 'fav'

export async function getAllImage() {
  var images = new Array();
  await axios.get(base_endpoint + get_all_image)
  .then(res => {
    if (res.status === 200) {
      console.log(res.data)
      images = res.data
    }
  })
  .catch(error => {
      console.log(error);
  })
  console.log(images)
  return images
}

export async function getImage(attribute: string) {
  var images = new Array();
  await axios.get(base_endpoint + get_image, {
    params: {
      primary: attribute
    }
  })
  .then(res => {
    if (res.status === 200) {
      for (var i in res.data) {
        images = res.data
      }
    }
  })
  .catch(error => {
      console.log(error);
  })
  return images
}

export async function getAllGenre() {
  let genres: string[] = [];
  await axios.get(base_endpoint + get_all_genre)
  .then(res => {
    if (res.status === 200) {
      genres = res.data
    }
  })
  .catch(error => {
      console.log(error);
  })
  return genres
}

export async function getAllCharactor() {
  let characters: string[] = [];
  await axios.get(base_endpoint + get_all_charactor)
  .then(res => {
    if (res.status === 200) {
      characters = res.data
    }
  })
  .catch(error => {
    console.log(error);
  })
  return characters;
}

export function putGenre(genre_name: string) {
  
}

export async function putCharactor(char_name: string) {
  await axios.get(base_endpoint + put_charactor)
  .then(res => {
    if (res.status === 200) {
      return true
    }
    else{
      return false
    }
  })
  .catch(error => {
    console.log(error);
    return false
  })
}

export function pressUploadUrl(a: (string|null), b: (string|null)[]) {
  return base_endpoint + put_registe + 
    '?character=' + a + 
    '&primary='   + b[0] + 
    '&secondary=' + b[1] + 
    '&tertiary='  + b[2];
}

export async function putFav(id: number, is: boolean) {
  await axios.put(base_endpoint + put_fav)
  .then(res => {
    if (res.status === 200) {
      return true
    }
    else{
      return false
    }
  })
  .catch(error => {
    console.log(error);
    return false
  })
}

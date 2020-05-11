import Vue from 'vue';

import axios from 'axios';

var base_endpoint:  string = 'https://img-database.herokuapp.com/'
//private base_endpoint:  string = 'http://localhost:8080/'

var get_all_image:  string = 'all_image'
var get_image:      string = 'images'
var get_all_genre:  string = 'all_genre'
var put_registe:    string = 'registe'

export function getAllImageUrl() {
  var urls = new Array();
  axios.get(base_endpoint + get_all_image)
  .then(res => {
    if (res.status === 200) {
      for (var i in res.data) {
        urls.push( res.data[i]['url'] )
      }
    }
  })
  .catch(error => {
      console.log(error);
  })
  return urls
}

export function getImageUrl(attribute: string) {
  var urls = new Array();
  axios.get(base_endpoint + get_image, {
    params: {
      primary: attribute
    }
  })
  .then(res => {
    console.log(res)
    if (res.status === 200) {
      for (var i in res.data) {
        urls.push( res.data[i]['url'] )
      }
    }
  })
  .catch(error => {
      console.log(error);
  })
  return urls
}

export function getAllGenre() {
  var genres = new Array()
  axios.get(base_endpoint + get_all_genre)
  .then(res => {
    if (res.status === 200) {
      for (var i in res.data) {
        genres.push( res.data[i]['Extracted'] )
      }
    }
  })
  .catch(error => {
      console.log(error);
  })
  return genres
}

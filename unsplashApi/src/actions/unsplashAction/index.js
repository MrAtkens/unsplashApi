import { toJson } from 'unsplash-js';
import fetch from 'node-fetch';

import { GET_ALL_PHOTOS_START, GET_ALL_PHOTOS_SUCCES, GET_ALL_PHOTOS_FAILURE, 
GET_PHOTO_BY_ID_START, GET_PHOTO_BY_ID_SUCCES, GET_PHOTO_BY_ID_FAILURE,
FIND_PHOTO_START, FIND_PHOTO_SUCCES, FIND_PHOTO_FAILURE,
FIND_BY_TAG} from '../../actionType'

global.fetch = fetch;
const Unsplash = require('unsplash-js').default;

const unsplash = new Unsplash({ accessKey: "5032c2d1ee7711065e38141f0cd369cc0ba0cd2b49a2cdd9b366ca8448b45b75" });


export const getAllUnsplashPhoto = (pageNumber, perPage) => async dispatch => {
    dispatch({type: GET_ALL_PHOTOS_START})

  try {
    await unsplash.photos.listPhotos(pageNumber+1, perPage)
    .then(toJson)
    .then(json => {
      dispatch({
        type: GET_ALL_PHOTOS_SUCCES,
        payload: json
      })
    });
  

  } catch (err) {
    dispatch({
      type: GET_ALL_PHOTOS_FAILURE,
      payload: err,
      error: true
    })
  }
}

export const getUnsplashPhotoById = (id) => async dispatch => {
  dispatch({type: GET_PHOTO_BY_ID_START})

try {
  var itemPhoto = null
    await unsplash.photos.getPhoto(id).then(toJson)
    .then(json => {
      itemPhoto = json
    });
  dispatch({
    type: GET_PHOTO_BY_ID_SUCCES,
    payload: itemPhoto
  })
  } catch (err) {
  dispatch({
    type: GET_PHOTO_BY_ID_FAILURE,
    payload: err,
    error: true
  })
}
}

export const findUnsplahPhoto = (keyWord, pageNumber, perPage) => async dispatch => {
  dispatch({type: FIND_PHOTO_START})

try {
  await unsplash.search.photos(keyWord, pageNumber+1, perPage)
  .then(toJson)
  .then(json => {
    const result = {
      json: json,
      keyWord: keyWord
    }

    dispatch({
      type: FIND_PHOTO_SUCCES,
      payload: result
    })
  });
} catch (err) {
  dispatch({
    type: FIND_PHOTO_FAILURE,
    payload: err,
    error: true
  })
}
}


export const findByTags = (keyWord) => dispatch => {
  dispatch({
    type: FIND_BY_TAG,
    payload: keyWord
  })
}

// export const downloadPhoto = (photoDownloadUrl) => async dispatch => {
//   dispatch({type: DOWNLOAD_PHOTO_START})

//   try{
//     const photo = {
//       links:{
//         download_location: photoDownloadUrl
//       }
//     }
//     await unsplash.photos.downloadPhoto(photo).then((data) => {
//         console.log(data)
//         dispatch({type: DOWNLOAD_PHOTO_SUCCES})
//       })
//   } catch (err){
//     dispatch({
//       type: DOWNLOAD_PHOTO_FAILURE,
//       payload: err
//     })
//   }
// }
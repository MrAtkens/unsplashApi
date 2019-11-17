import { 
    GET_ALL_PHOTOS_SUCCES, GET_ALL_PHOTOS_FAILURE,
    GET_PHOTO_BY_ID_SUCCES, GET_PHOTO_BY_ID_FAILURE,
    FIND_PHOTO_SUCCES, FIND_PHOTO_FAILURE, FIND_BY_TAG
} from '../../actionType'

import { toast } from 'react-toastify'

// const toastSucces = (text) => {
//   toast.success(text, {
//     position: "bottom-left",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true
//   });
// }

const toastError = (text) => {
  toast.error(text , {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });  
}

const initialState = {
    loadStatus: Boolean,
    redirectStatus: false,
    images: [],
    keyWord: "",
    pageCount: 0,
    error: '',
    image: {
      alt_description: '',
      tags: [],
      description: '',
      width: 0,
      height: 0,
      likes: 0,
      downloads: 0,
      views: 0,
      tagline: '',
      created_at: '',
      updated_at: '',
      promoted_at: '',
      location: {
        title: ''
      },
      links:{
        html: '',
        download: ''
      },
      urls: {
        full: '',
        raw: '',
        regular: '',
        small: '',
      },
      user: {
        name: '',
        username: '',
        location: '',
        links: {
          html: '',
          photos: '',
        },
        instagram_username: '',
        twitter_username: '',
        profile_image:{
          large: ''
        },
        total_photos: 0,
        total_likes: 0,
        total_collections: 0,
      }
    }
}

function photoStockReducer(state = initialState, action) {
    switch (action.type) {
      case GET_ALL_PHOTOS_SUCCES:
        return { ...state, images: action.payload } 
      case GET_ALL_PHOTOS_FAILURE:
          toastError("Походу что-то пошло не так")
        return { ...state, error: action.payload.message }

      case GET_PHOTO_BY_ID_SUCCES:
        return { ...state, image: action.payload }
      case GET_PHOTO_BY_ID_FAILURE:
          toastError("Походу что-то пошло не так")
        return { ...state, error: action.payload.payload }
      
      case FIND_PHOTO_SUCCES:
        return { ...state, images: action.payload.json.results, pageCount: action.payload.json.total_pages, keyWord: action.payload.keyWord }
      case FIND_PHOTO_FAILURE:
          toastError("Походу что-то пошло не так")
        return { ...state, error: action.payload.message }  
      
      case FIND_BY_TAG:
        return { ...state, keyWord: action.payload }

      // case DOWNLOAD_PHOTO_SUCCES:
      //   return { ...state }
      // case DOWNLOAD_PHOTO_FAILURE:
      //     toastError("Походу что-то пошло не так")
      //   return { ...state, error: action.payload.message }  

      default:
        return state
    }
  }
  

export default photoStockReducer
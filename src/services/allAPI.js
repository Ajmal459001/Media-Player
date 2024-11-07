
import commonAPI from "./commonAPI"
import SERVERURL from "./serverURL"

// saveVideoAPI - post http rqst called Add Component when user click on add button 
export const saveVideoAPI = async (videoDetails) =>{
  return await  commonAPI("POST",`${SERVERURL}/uploadVideos`,videoDetails)
}

// getAllVideosAPI - get http rqst called view component when component displayed in browser inside its useeffect hook
export const getAllVideosAPI = async () =>{
  return await  commonAPI("GET",`${SERVERURL}/uploadVideos`,"")
}

// saveHistoryAPI - post http rqst to http://localhost:3000/history called by VideoCard component when we play video
export const saveHistoryAPI = async (historyDetails) =>{
  return await  commonAPI("POST",`${SERVERURL}/history`,historyDetails)
}

// getAllHistoryAPI - get http rqst to http://localhost:3000/history called by history component when component it open in browser inside its useeffect hook

export const getAllHistoryAPI = async () =>{
  return await  commonAPI("GET",`${SERVERURL}/history`,"")
}
// deleteHistoryAPI - delete http rqst to http://localhost:3000/history called by history component when user click on delete button

export const deleteHistoryAPI = async (id) =>{
  return await  commonAPI("DELETE",`${SERVERURL}/history/${id}`,{})
}
// removeVideoAPI - delete http rqst to http://localhost:3000/uploadVideos called by videoCard component when user click on delete button

export const removeVideoAPI = async (id) =>{
  return await  commonAPI("DELETE",`${SERVERURL}/uploadVideos/${id}`,{})
}

// saveCategoryAPI - post http rqst to http://localhost:3000/categories called by Category component when user click on add btn
// categoryDetails = { categoryName, allVideos }
export const saveCategoryAPI = async (categoryDetails)=>{
  return await  commonAPI("POST",`${SERVERURL}/categories`,categoryDetails)
}

// getAllCategoryAPI - get http rqst to http://localhost:3000/categories called by Category component when component loaded in browser

export const getAllCategoryAPI = async () =>{
  return await  commonAPI("GET",`${SERVERURL}/categories`,"")
}

// removeCategoryAPI - delete http rqst to http://localhost:3000/categories called by Category component when user click on delete button

export const removeCategoryAPI = async (id) =>{
  return await  commonAPI("DELETE",`${SERVERURL}/categories/${id}`,{})
}

// updateCategoryAPI - put http rqst to http://localhost:3000/categories/id called by category component when video dropped over the category
export const updateCategoryAPI = async (categoryDetails) =>{
  return await  commonAPI("PUT",`${SERVERURL}/categories/${categoryDetails.id}`,categoryDetails)
}
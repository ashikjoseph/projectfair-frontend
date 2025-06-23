import { commonAPI } from "./commonAPI";
import { BASE_URL } from "./baseurl";

// 1) register user
export const registerAPI = async (user) => {
    return await commonAPI("post", `${BASE_URL}/user/register`, user, "")
}

// 2) login user

export const loginAPI = async (reqBody) => {
    return await commonAPI("post", `${BASE_URL}/user/login`, reqBody, "")
}

// 3) add project

export const addProjectAPI = async (reqBody, reqHeader) => {
    return await commonAPI('post', `${BASE_URL}/project/add`, reqBody, reqHeader)
}

// 4) get home project (3 items)

export const homeProjectApi = async () => {
    return await commonAPI("GET", `${BASE_URL}/project/home-project`, '', '')
}

// 5) get all project
// searchKey is passed as query parameter
// path?key=value
export const allProjectApi = async (searchKey, reqHeader) => {
    return await commonAPI("GET", `${BASE_URL}/project/all-project?search=${searchKey}`, '', reqHeader)
}


// 6) get user project
export const userProjectApi = async (reqHeader) => {
    return await commonAPI("GET", `${BASE_URL}/project/user-project`, '', reqHeader)
}

// 7) update user project
export const editUserProjectApi = async(id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${BASE_URL}/project/edit/${id}`,reqBody,reqHeader)
}

//  delete a project
export const deleteProjectApi = async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${BASE_URL}/project/remove/${id}`,{},reqHeader)
}




export const addProfileApi = async (reqBody, reqHeader) => {
    return await commonAPI('POST', `${BASE_URL}/profile/add`, reqBody, reqHeader)
}



export const userProfileApi = async (reqHeader) => {
    return await commonAPI("GET", `${BASE_URL}/user-profile`, '', reqHeader)
}



export const editUserProfile = async (id, reqBody, reqHeader) => {
    return await commonAPI("PUT", `${BASE_URL}/edit-profile/${id}`, reqBody, reqHeader);
}

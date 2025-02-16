import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const initGet = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const deleteId = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const updateId = (id,newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}



export default {create,initGet,deleteId,updateId}

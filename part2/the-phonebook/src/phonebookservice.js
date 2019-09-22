import axios from 'axios';
const baseUrl = "http://localhost:3001/persons/";
const all = () => 
    axios
        .get(baseUrl)
        .then(response => response.data)
        .catch(err => console.log(err))


const create = (personObject) => 
    axios
        .post(baseUrl, personObject)
        .then(response => response.data)
        .catch(err => console.log(err))


const remove = (id) =>
    axios
        .delete(baseUrl+id)
        .then()
        .catch(err => console.log(err))


const update = (personObject) => 
    axios
        .put(baseUrl+personObject.id, personObject)
        .then(response => response.data)
        .catch(err => console.log(err))


export default 
{
    all,
    create,
    remove,
    update
}
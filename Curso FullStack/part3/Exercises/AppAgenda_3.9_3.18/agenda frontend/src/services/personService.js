import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/persons';

const getAll = () => {
    return axios.get(baseUrl)
        .then(response => response.data)
        .catch(error => {
            const errorMessage = error.response?.data?.error || 'Failed to fetch persons';
            return Promise.reject(errorMessage);
        });
};

const create = newPerson => {
    return axios.post(baseUrl, newPerson)
        .then(response => response.data)
        .catch(error => {
            const errorMessage = error.response?.data?.error || 'Failed to create person';
            return Promise.reject(errorMessage);
        });
};

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
        .then(response => response.data)
        .catch(error => {
            const errorMessage = error.response?.data?.error || 'Failed to delete person';
            return Promise.reject(errorMessage);
        });
};

const update = (id, newPerson) => {
    return axios.put(`${baseUrl}/${id}`, newPerson)
        .then(response => response.data)
        .catch(error => {
            const errorMessage = error.response?.data?.error || 'Failed to update person';
            return Promise.reject(errorMessage);
        });
};

export default { getAll, create, remove, update };
import { http } from '../https'

export const saveVoca = (body) =>
    http.post('/SavedVoca', body)

export const getSavedByVideo = () =>
    http.get('/SavedVoca/GetSavedByVideo');
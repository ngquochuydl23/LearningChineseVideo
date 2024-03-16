import { http } from '../https'

export const saveVoca = (body) =>
    http.post('/SavedVoca', body)

export const delSavedVoca = (vocaId, videoId, showedAtDuration) =>
    http.delete('/SavedVoca/' + vocaId)

export const getSavedByVideo = () =>
    http.get('/SavedVoca/GetSavedByVideo');
import { http } from '../https'

export const addVideo = (body) => http.post('/Video', body);

export const getVideos = () => http.get('Video');

export const getMostPopularVideo = (offset, limit) => http.get('Video/mostPopular', { params: { offset, limit } });

export const getRecentlyAddedVideo = (offset, limit) => http.get('Video/recentlyAdded', { params: { offset, limit } });

export const getVideo = (id) => http.get('/Video/' + id);


export const viewVideo = (id) => http.post(id + '/View');
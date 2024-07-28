import axios from 'axios';

const API_URL = process.env.REACT_APP_SURVEY_API_URL;

console.log('API_URL:', API_URL); // Add this line to check the value of API_URL

export const register = (userData) => axios.post(`${API_URL}/user/register`, userData);

export const login = (userData) => axios.post(`${API_URL}/user/login`, userData, { withCredentials: true });

export const fetchSurveys = () => axios.get(`${API_URL}/admin/survey`, { withCredentials: true });

export const fetchSurveyDetails = (surveyId) => axios.get(`${API_URL}/admin/survey/${surveyId}/user-version`, { withCredentials: true });

export const submitSurveyResponse = (surveyId, response) => axios.post(`${API_URL}/survey-response/${surveyId}/batch`, response, { withCredentials: true });

export const getProfile = () => axios.get(`${API_URL}/user/me`, { withCredentials: true });

export const fetchUserSurveyResponse = (surveyId) => axios.get(`${API_URL}/survey-response/${surveyId}`, { withCredentials: true });

export const logout = () => axios.post(`${API_URL}/user/logout`, {}, { withCredentials: true });

export const createSurvey = (surveyData) => axios.post(`${API_URL}/admin/survey`, surveyData, { withCredentials: true });

export const editSurvey = (id, surveyData) => axios.post(`${API_URL}/admin/survey/${id}`, surveyData, { withCredentials: true });

export const fetchSurveyVersion = (id) => axios.get(`${API_URL}/admin/survey/${id}/latest-version`, { withCredentials: true });

export const fetchSurveyResponses = (surveyId) => axios.get(`${API_URL}/survey-response/${surveyId}/responses`, { withCredentials: true });

import axios from 'axios';

const API_URL = '/api/alumnos';

export const getAlumnos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getAlumnoById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createAlumno = async (alumno) => {
  const response = await axios.post(API_URL, alumno);
  return response.data;
};

export const updateAlumno = async (id, alumno) => {
  const response = await axios.put(`${API_URL}/${id}`, alumno);
  return response.data;
};

export const deleteAlumno = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

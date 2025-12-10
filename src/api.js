import axios from 'axios';
import { API_BASE_URL, HARDCODED_JWT } from './config';

// Cliente axios usando HTTP y encabezados con token hardcodeado
export const insecureClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${HARDCODED_JWT}`
  }
});

export async function fetchCommentsInsecure() {
  console.log('Usando token inseguro para llamar a la API:', HARDCODED_JWT);
  const response = await insecureClient.get('/comments');
  return response.data;
}

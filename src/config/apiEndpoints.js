const API_BASE_URL = 'https://localhost:7066/api';

const endpoints = {
  login: `${API_BASE_URL}/Usuario/login`,
  register: `${API_BASE_URL}/Usuario/cadastrar`,
  // Outros endpoints que você pode adicionar posteriormente
};

export default endpoints;
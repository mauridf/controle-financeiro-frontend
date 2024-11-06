const API_BASE_URL = 'https://localhost:7066/api';

const endpoints = {
  login: `${API_BASE_URL}/Usuario/login`,
  register: `${API_BASE_URL}/Usuario/cadastrar`,
  usuario: `${API_BASE_URL}/Usuario`,

  credito: `${API_BASE_URL}/Credito`,

  debito: `${API_BASE_URL}/Debito`,

  dashboard: `${API_BASE_URL}/Dashboard`,
};

export default endpoints;
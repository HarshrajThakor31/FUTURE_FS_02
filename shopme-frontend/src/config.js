const config = {
  API_URL: process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-url.herokuapp.com' 
    : 'http://localhost:8001'
};

export default config;
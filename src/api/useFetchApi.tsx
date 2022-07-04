import { useCallback } from 'react';

const useFetchApi = () => {
  const fetchApi = useCallback(async (endpoint: string) => {
    const config = {
      method: 'GET',
    };

    const response = await window.fetch(`${endpoint}`, config);
    if (response.ok) {
      return response.json();
    } else {
      const errorMessage = await response.text();
      return Promise.reject(new Error(errorMessage));
    }
  }, []);

  return fetchApi;
};

export default useFetchApi;

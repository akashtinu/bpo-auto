// API Utility wrapper for fetching data from the backend

export const api = {
  async request(path, options = {}) {
    const isFormData = options.body instanceof FormData;
    const defaultHeaders = {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      'X-Requested-With': 'XMLHttpRequest'
    };

    const config = {
      ...options,
      credentials: 'include',
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(path, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API Error on ${path}:`, error);
      throw error;
    }
  },

  get(path, headers = {}) {
    return this.request(path, { method: 'GET', headers });
  },

  post(path, body = {}, headers = {}) {
    return this.request(path, {
      method: 'POST',
      body: JSON.stringify(body),
      headers
    });
  },

  postForm(path, formData, headers = {}) {
    return this.request(path, {
      method: 'POST',
      body: formData,
      headers
    });
  },

  delete(path, headers = {}) {
    return this.request(path, { method: 'DELETE', headers });
  }
};

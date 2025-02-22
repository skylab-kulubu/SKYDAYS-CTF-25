// Yardımcı fonksiyonlar
const utils = {
    // Form verilerini JSON'a çevir
    formToJSON: (form) => {
        const data = new FormData(form);
        return Object.fromEntries(data.entries());
    },

    // API istekleri için yardımcı fonksiyon
    fetchAPI: async (url, options = {}) => {
        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });
            return await response.json();
        } catch (error) {
            console.error('API Hatası:', error);
            throw error;
        }
    }
}; 
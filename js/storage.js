const STORAGE_KEY = "DATA_PENDAFTAR";

export const simpanData = (dataArray) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataArray));
};

export const ambilData = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};
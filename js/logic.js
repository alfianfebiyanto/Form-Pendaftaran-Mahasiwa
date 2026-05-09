// Mengekstrak karakter pertama dari kode (A, B, atau V)
export const parseGedung = (kode) => {
    if (!kode) return "-";
    const char = kode.charAt(0).toUpperCase();
    if (char === 'A') return "Gedung A";
    if (char === 'B') return "Gedung B";
    if (char === 'V') return "Viktor";
    return "Lainnya";
};

// Menghitung rata-rata
export const hitungRataRata = (mat, ing, umum) => {
    return ((mat + ing + umum) / 3).toFixed(2);
};

// Menentukan Keterangan Lulus
export const tentukanKeterangan = (rataRata) => {
    if (rataRata >= 70) return "Lulus";
    if (rataRata >= 60 && rataRata < 70) return "Cadangan";
    return "Tidak Lulus"; // < 60
};
import { parseGedung, hitungRataRata, tentukanKeterangan } from './logic.js';
import { simpanData, ambilData } from './storage.js';
import { renderTabel } from './ui.js';

let dataPendaftar = ambilData();
let pendingData = null;

const form = document.getElementById('formPendaftaran');
const tbodyData = document.getElementById('tbodyData');
const btnDownloadPdf = document.getElementById('btnDownloadPdf');

const modalReview = document.getElementById('modalReview');
const reviewContent = document.getElementById('reviewContent');
const btnConfirmSave = document.getElementById('btnConfirmSave');
const btnCancelSave = document.getElementById('btnCancelSave');

// Elemen untuk Modal Alert
const modalAlert = document.getElementById('modalAlert');
const alertMessage = document.getElementById('alertMessage');
const btnTutupAlert = document.getElementById('btnTutupAlert');

const updateUI = () => {
    // Mengurutkan data berdasarkan Kode Pendaftaran (Ascending) sebelum dirender
    dataPendaftar.sort((a, b) => a.kode.localeCompare(b.kode));
    renderTabel(dataPendaftar, tbodyData);
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const kode = document.getElementById('kode').value;

    const isDuplicate = dataPendaftar.some(item => item.kode === kode);
    if (isDuplicate) {
        // Menampilkan pesan formal di dalam modal card jika kode sudah ada
        alertMessage.innerText = `Mohon maaf, Kode Pendaftaran "${kode}" sudah terdaftar di dalam sistem. Silakan periksa kembali dan gunakan kode yang berbeda.`;
        modalAlert.classList.remove('hidden');
        return;
    }

    const nama = document.getElementById('nama').value;
    const jk = document.getElementById('jk').value;
    const ttl = document.getElementById('ttl').value;
    const sekolah = document.getElementById('sekolah').value;
    const pekerjaanOrtu = document.getElementById('pekerjaanOrtu').value;
    
    const nilaiMat = parseFloat(document.getElementById('nilaiMat').value);
    const nilaiIng = parseFloat(document.getElementById('nilaiIng').value);
    const nilaiUmum = parseFloat(document.getElementById('nilaiUmum').value);

    if (nilaiMat > 100 || nilaiIng > 100 || nilaiUmum > 100 || nilaiMat < 0 || nilaiIng < 0 || nilaiUmum < 0) {
        alert("Nilai harus berada di range 0 sampai 100!");
        return;
    }

    const rataRata = hitungRataRata(nilaiMat, nilaiIng, nilaiUmum);
    const gedung = parseGedung(kode);
    const keterangan = tentukanKeterangan(rataRata);

    pendingData = {
        kode, nama, jk, ttl, sekolah, pekerjaanOrtu, gedung, 
        mat: nilaiMat, ing: nilaiIng, umum: nilaiUmum, rataRata, keterangan
    };

    // Rincian review dibatasi hanya pada identitas form murni sesuai permintaan
    reviewContent.innerHTML = `
        <p><span>Kode Pendaftaran</span> <span>${kode}</span></p>
        <p><span>Nama Pendaftar</span> <span>${nama}</span></p>
        <p><span>Jenis Kelamin</span> <span>${jk === 'L' ? 'Laki-laki' : 'Perempuan'}</span></p>
        <p><span>Tempat, Tgl Lahir</span> <span>${ttl}</span></p>
        <p><span>Asal Sekolah</span> <span>${sekolah}</span></p>
        <p><span>Pekerjaan Orang Tua</span> <span>${pekerjaanOrtu}</span></p>
        <hr style="border: 0; border-top: 1px dashed #eee; margin: 10px 0;">
        <p><span>Nilai Matematika</span> <span>${nilaiMat}</span></p>
        <p><span>Nilai Bahasa Inggris</span> <span>${nilaiIng}</span></p>
        <p><span>Pelajaran Umum</span> <span>${nilaiUmum}</span></p>
    `;

    modalReview.classList.remove('hidden');
});

// Event menutup modal peringatan duplikat
btnTutupAlert.addEventListener('click', () => {
    modalAlert.classList.add('hidden');
});

// Event membatalkan simpan data
btnCancelSave.addEventListener('click', () => {
    modalReview.classList.add('hidden');
    pendingData = null;
});

// Event konfirmasi simpan data
btnConfirmSave.addEventListener('click', () => {
    if (pendingData) {
        dataPendaftar.push(pendingData);
        simpanData(dataPendaftar);
        updateUI(); // Memanggil fungsi updateUI yang di dalamnya sudah terdapat logika sorting
        
        form.reset();
        modalReview.classList.add('hidden');
        pendingData = null;
    }
});

btnDownloadPdf.addEventListener('click', () => {
    const areaCetak = document.getElementById('areaLaporan');
    
    btnDownloadPdf.style.display = 'none';

    const opt = {
        margin:       0.3,
        filename:     'Laporan_Pendaftaran_Terurut.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'landscape' } 
    };

    html2pdf().set(opt).from(areaCetak).save().then(() => {
        btnDownloadPdf.style.display = 'block';
    });
});

updateUI();
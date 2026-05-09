export const renderTabel = (dataArray, tbodyElement) => {
    tbodyElement.innerHTML = "";
    let countLulus = 0;
    let countTidakLulus = 0;

    dataArray.forEach((item, index) => {
        if (item.keterangan === "Lulus") countLulus++;
        if (item.keterangan === "Tidak Lulus") countTidakLulus++;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.kode}</td>
            <td>${item.nama}</td>
            <td>${item.jk}</td>
            <td>${item.ttl}</td>
            <td>${item.sekolah}</td>
            <td>${item.pekerjaanOrtu}</td>
            <td>${item.gedung}</td>
            <td>${item.mat}</td>
            <td>${item.ing}</td>
            <td>${item.umum}</td>
            <td><strong>${item.rataRata}</strong></td>
            <td>
                <span style="color: ${item.keterangan === 'Lulus' ? 'green' : (item.keterangan === 'Cadangan' ? 'orange' : 'red')}">
                    ${item.keterangan}
                </span>
            </td>
        `;
        tbodyElement.appendChild(tr);
    });

    document.getElementById("sumTotal").innerText = dataArray.length;
    document.getElementById("sumLulus").innerText = countLulus;
    document.getElementById("sumTidakLulus").innerText = countTidakLulus;
};
document.addEventListener('DOMContentLoaded', function() {

    // --- Inisialisasi Elemen ---
    const userNameElement = document.getElementById('userName');
    const formNamaInput = document.getElementById('nama');
    
    if (userNameElement) {
        userNameElement.textContent = ""; 

        if (formNamaInput) {
             formNamaInput.value = ""; 
        }
    }


    // --- Validasi dan Menampilkan Nilai Form ---
    const form = document.getElementById('messageForm');
    const outputDisplay = document.getElementById('outputDisplay');
    const validationError = document.getElementById('validationError');

    if (form) {
        function updateTime() {
            const now = new Date();
            const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'shortOffset' };
            const formattedTime = `Current Time: ${now.toLocaleString('en-US', options)}`;
            document.getElementById('currentTime').textContent = formattedTime;
        }

        updateTime();
        setInterval(updateTime, 1000); 

        form.addEventListener('submit', function(event) {
            event.preventDefault(); 
            validationError.textContent = ''; 

            const nama = document.getElementById('nama').value.trim();
            const tanggalLahirInput = document.getElementById('tanggalLahir').value;
            const jenisKelamin = document.querySelector('input[name="jenisKelamin"]:checked');
            const pesan = document.getElementById('pesan').value.trim();

            // Validasi Sederhana 
            if (!nama || !tanggalLahirInput || !jenisKelamin || !pesan) {
                validationError.textContent = 'Semua field wajib diisi, termasuk Pesan.';
                outputDisplay.innerHTML = '<p>Data tidak ditampilkan karena formulir tidak lengkap.</p>';
                return;
            }

            if (userNameElement) {
                 userNameElement.textContent = nama + " "; 
            }
            
            // Tampilkan Output
            const [year, month, day] = tanggalLahirInput.split('-');
            const tanggalLahirFormatted = `${day}/${month}/${year}`;

            const newOutputHTML = `
                <p><strong>Nama:</strong> ${nama}</p>
                <p><strong>Tanggal Lahir:</strong> ${tanggalLahirFormatted}</p>
                <p><strong>Jenis Kelamin:</strong> ${jenisKelamin.value}</p>
                <p><strong>Pesan:</strong> ${pesan}</p>
            `;

            outputDisplay.innerHTML = newOutputHTML;
            alert(`Formulir berhasil disubmit!`);

            form.reset(); 
            
            if (jenisKelamin) {
                jenisKelamin.checked = false;
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', function () {

    // --- FITUR BARU: Smooth Scroll dengan JavaScript ---
    // Menggunakan selector yang lebih andal untuk menargetkan semua tautan di navbar yang href-nya dimulai dengan '#'
    const navLinks = document.querySelectorAll('.navbar ul li a[href^="#"]'); 

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Mencegah lompatan tiba-tiba

            const targetId = this.getAttribute('href').substring(1); 
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth', 
                    block: 'start'      
                });
            }
        });
    });

    // --- Inisialisasi Elemen Formulir dan Lainnya ---
    const userNameElement = document.getElementById('userName');
    const formNamaInput = document.getElementById('nama');
    
    if (userNameElement) {
        // Tampilkan placeholder jika input nama kosong
        userNameElement.textContent = formNamaInput && formNamaInput.value.trim() ? formNamaInput.value.trim() + " " : "Guest "; 
    }

    if (formNamaInput) {
        formNamaInput.addEventListener('input', function() {
            if (userNameElement) {
                userNameElement.textContent = this.value.trim() ? this.value.trim() + " " : "Guest ";
            }
        });
    }


    // --- Logic untuk Current Time ---
    const currentTimeElement = document.getElementById('currentTime');

    function updateTime() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        currentTimeElement.textContent = "Waktu Submit: " + now.toLocaleTimeString('id-ID', options);
    }
    updateTime(); // Panggil pertama kali
    setInterval(updateTime, 1000); // Update setiap detik (opsional)

    // --- Logic Submit Form ---
    const form = document.getElementById('messageForm');
    const outputDisplay = document.getElementById('outputDisplay');
    const validationError = document.getElementById('validationError');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Ambil semua data
            const nama = document.getElementById('nama').value.trim();
            const tanggalLahirInput = document.getElementById('tanggalLahir').value;
            const jenisKelamin = document.querySelector('input[name="jenisKelamin"]:checked');
            const pesan = document.getElementById('pesan').value.trim();

            // Reset error
            validationError.textContent = ''; 

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
            
            console.log(`Formulir berhasil disubmit oleh ${nama}!`);

            form.reset();

            // Set ulang radio button
            if (jenisKelamin) {
                jenisKelamin.checked = false;
            }
        });
    }
});
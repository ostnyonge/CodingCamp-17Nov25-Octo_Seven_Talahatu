$(function () {

    // --- Inisialisasi Elemen Formulir dan Lainnya ---
    const userNameElement = document.getElementById('userName');
    const formNamaInput = document.getElementById('formName');

    if (userNameElement) {
        // Tampilkan placeholder jika input nama kosong
        userNameElement.textContent = formNamaInput && formNamaInput.value.trim() ? formNamaInput.value.trim() + " " : "Guest ";
    }

    if (formNamaInput) {
        formNamaInput.addEventListener('input', function () {
            if (userNameElement) {
                userNameElement.textContent = this.value.trim() ? this.value.trim() + " " : "Guest ";
            }
        });
    }

    // 1. Fungsi untuk memperbarui Waktu Live (TETAP LIVE)
    function updateLiveTime() {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        const formattedTime = now.toLocaleDateString('id-ID', options);
        $('#liveTime').text(formattedTime);
    }

    // Perbarui waktu setiap 1 detik
    setInterval(updateLiveTime, 1000);
    updateLiveTime(); // Jalankan sekali saat load

    // REVISI FUNGSI showSubmittedOutput di live_form.js
    function showSubmittedOutput() {
        // Ambil nilai dari input fields
        const name = $('#formName').val();
        const dob = $('#formDob').val();
        const message = $('#formMessage').val();
        const gender = $('input[name="genderOptions"]:checked').val() || 'N/A';

        // --- DEBUGGING LINE START ---
        console.log("Submit Berhasil Dideteksi!");
        console.log("Nama:", name, "DOB:", dob, "Pesan:", message, "Gender:", gender);
        // --- DEBUGGING LINE END ---

        // Tampilkan nilai di elemen output
        $('#outputName').text(name);
        $('#outputDob').text(dob);
        $('#outputMessage').text(message);
        $('#outputGender').text(gender);

        // Sembunyikan placeholder dan tampilkan template output
        $('#inputResult > p').hide();
        $('#dataOutputTemplate').show();
    }

    // GANTI SELURUH BLOK INI di live_form.js dengan kode di bawah

    $('#dataForm').submit(function (event) {
        // 1. PENCEGAHAN REFRESH: Hentikan tindakan submit bawaan browser SEGERA.
        event.preventDefault();

        // Simpan referensi ke form
        const form = this;

        // 2. CEK VALIDITAS: Periksa apakah form valid menurut validasi HTML5 bawaan
        if (form.checkValidity()) {

            // --- JIKA FORM VALID (SEMUA TERISI) ---
            alert("Terimakasih sudah mengisi form ^_^");

            // Panggil fungsi untuk menampilkan output
            showSubmittedOutput();

            // Hapus pesan sukses setelah 5 detik
            setTimeout(function () {
                $('#success').empty();
            }, 5000);

            // Opsional: Reset form setelah submit
            form.reset();

            // Setelah reset, perbarui pesan sambutan kembali ke 'Guest'
            updateWelcomeSpeech(""); // Panggil fungsi updateWelcomeSpeech yang sudah Anda buat

        } else {
            // --- JIKA FORM TIDAK VALID ---

            // Karena event.preventDefault() sudah dipanggil di awal,
            // kita perlu secara manual memicu validasi untuk menampilkan pesan error browser.
            $(form).find(':input').each(function () {
                if (!this.checkValidity()) {
                    // Fokuskan pada elemen pertama yang gagal validasi
                    this.reportValidity();
                    return false;
                }
            });
        }
    });

    // Ketika radio button diubah, hapus pesan error validation (untuk user experience)
    $('input[name="genderOptions"]').change(function () {
        $('#formGender').find('.help-block.text-danger').text("");
    });
});
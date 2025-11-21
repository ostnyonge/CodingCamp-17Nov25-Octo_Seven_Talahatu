// $(function() {
//     "use strict"; // Memastikan kode berjalan dalam mode ketat

//     // 1. Fungsi untuk memperbarui Waktu Live
//     function updateLiveTime() {
//         const now = new Date();
//         const options = { 
//             weekday: 'long', 
//             year: 'numeric', 
//             month: 'long', 
//             day: 'numeric', 
//             hour: '2-digit', 
//             minute: '2-digit', 
//             second: '2-digit', 
//             hour12: false 
//         };
//         const formattedTime = now.toLocaleDateString('id-ID', options);
//         $('#liveTime').text(formattedTime);
//     }

//     // Perbarui waktu setiap 1 detik
//     setInterval(updateLiveTime, 1000);
//     updateLiveTime(); // Jalankan sekali saat load

//     // 2. Fungsi untuk menampilkan dan memperbarui Data Input
//     function showSubmittedOutput() {
//         // Ambil nilai dari input fields
//         const name = $('#formName').val();
//         const dob = $('#formDob').val();
//         const message = $('#formMessage').val();
//         // Ambil nilai radio button. Tambahkan 'N/A' jika tidak terpilih (seharusnya tidak terjadi jika validasi sukses)
//         const gender = $('input[name="genderOptions"]:checked').val() || 'N/A'; 

//         // Tampilkan nilai di elemen output
//         $('#outputName').text(name);
//         $('#outputDob').text(dob);
//         $('#outputMessage').text(message);
//         $('#outputGender').text(gender);

//         // Sembunyikan placeholder dan tampilkan template output
//         // Memastikan hanya <p> placeholder yang disembunyikan
//         $('#inputResult > p').hide(); 
//         $('#dataOutputTemplate').show();
//     }
    
//     // 3. Logika Validasi dan Submit dengan jqBootstrapValidation
//     $("#dataForm input, #dataForm textarea").jqBootstrapValidation({
//         preventSubmit: true,
//         submitError: function($form, event, errors) {
//             // Logika ini berjalan jika validasi gagal
            
//             // Penanganan error untuk radio button (Jenis Kelamin)
//             const genderSelected = $('input[name="genderOptions"]:checked').length > 0;
//             const genderErrorBlock = $('#formGender').closest('.form-group').find('.help-block.text-danger');
            
//             if (!genderSelected) {
//                  // Tampilkan pesan error
//                  genderErrorBlock.text("Silakan pilih jenis kelamin.");
//             } else {
//                  // Hapus pesan error jika sudah terpilih
//                  genderErrorBlock.text("");
//             }
//         },
//         submitSuccess: function($form, event) {
//             event.preventDefault(); // Mencegah submit default

//             // Pengecekan radio button terakhir sebelum menampilkan output
//             const genderSelected = $('input[name="genderOptions"]:checked').length > 0;
//             if (!genderSelected) {
//                 // Seharusnya tidak tercapai jika submitError berfungsi, tapi ini adalah pengaman
//                 return;
//             }
            
//             // *** OUTPUT BERHASIL DITAMPILKAN DI SINI ***
//             showSubmittedOutput(); 
//             // *****************************************

//             // Tampilkan pesan sukses
//             $('#success').html("<div class='alert alert-success'>");
//             $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
//               .append("</button>");
//             $('#success > .alert-success')
//               .append("<strong>Data berhasil diinput. Cek Live Output di sebelah kanan.</strong>");
//             $('#success > .alert-success')
//               .append('</div>');
            
//             // Hapus pesan sukses setelah 5 detik
//             setTimeout(function() {
//                 $('#success').empty();
//             }, 5000); 
//         },
//         filter: function() {
//             return $(this).is(":visible");
//         },
//     });
    
//     // Ketika radio button diubah, hapus pesan error
//     $('input[name="genderOptions"]').change(function() {
//         $('#formGender').closest('.form-group').find('.help-block.text-danger').text("");
//     });
// });
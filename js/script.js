// Menampilkan tahun otomatis di footer
const elemenTahun = document.getElementById("tahun");
if (elemenTahun) {
    elemenTahun.textContent = new Date().getFullYear();
}

const nomorWA = "6283833031158";
const kartuProduk = document.querySelectorAll(".menu-card");

// Fungsi untuk langsung membuka aplikasi WhatsApp di HP
function bukaWhatsApp(pesanTeks) {
    const encodedText = encodeURIComponent(pesanTeks);
    const isAndroid = /Android/i.test(navigator.userAgent);

    if (isAndroid) {
        window.top.location.href = `intent://send?phone=${nomorWA}&text=${encodedText}#Intent;scheme=whatsapp;package=com.whatsapp;end`;
    } else {
        window.top.location.href = `https://whatsapp.com{nomorWA}&text=${encodedText}`;
    }
}

// Mengatur tombol (+ / -) dan tombol Order via WhatsApp di setiap kartu produk
kartuProduk.forEach(function(kartu) {
    const btnMinus = kartu.querySelector(".minus-btn");
    const btnPlus = kartu.querySelector(".plus-btn");
    const teksQty = kartu.querySelector(".qty-value");
    const linkOrder = kartu.querySelector(".btn-wa-order");

    let jumlah = 1;

    function getPesan() {
        const namaProduk = kartu.getAttribute("data-nama");
        const hargaSatuan = parseInt(kartu.getAttribute("data-harga"));
        const totalHarga = (hargaSatuan * jumlah).toLocaleString("id-ID");
        return `Halo kak Melani, saya mau pesan ${namaProduk} (${jumlah} porsi) - Total: Rp ${totalHarga}`;
    }

    if (btnMinus) {
        btnMinus.addEventListener("click", function() {
            if (jumlah > 1) {
                jumlah--;
                teksQty.textContent = jumlah;
                linkOrder.href = `https://whatsapp.com{nomorWA}&text=${encodeURIComponent(getPesan())}`;
            }
        });
    }

    if (btnPlus) {
        btnPlus.addEventListener("click", function() {
            jumlah++;
            teksQty.textContent = jumlah;
            linkOrder.href = `https://whatsapp.com{nomorWA}&text=${encodeURIComponent(getPesan())}`;
        });
    }

    if (linkOrder) {
        linkOrder.addEventListener("click", function(e) {
            e.preventDefault();
            bukaWhatsApp(getPesan());
        });
    }
});

// Mengatur tombol Chat via WhatsApp di bagian Kontak
const tombolKontakWA = document.getElementById("whatsapp-contact");
if (tombolKontakWA) {
    tombolKontakWA.addEventListener("click", function(e) {
        e.preventDefault();
        bukaWhatsApp("Halo kak Melani, saya ingin bertanya tentang produk Pisang Lumer.");
    });
}

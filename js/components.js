const NAVBAR_HTML = `
<nav class="navbar" aria-label="Navigasi utama">
    <div class="container nav-container">
        <a href="index.html" class="nav-logo" title="Beranda SMA Kartika Nusantara">
            <i class="fas fa-school" aria-hidden="true"></i>
            <span>SMA Kartika Nusantara</span>
        </a>
        <button class="nav-toggle" id="navToggle" aria-label="Buka menu navigasi" aria-expanded="false" aria-controls="navMenu">
            <i class="fas fa-bars" aria-hidden="true"></i>
        </button>
        <ul class="nav-menu" id="navMenu">
            <li><a href="index.html#home" class="nav-link">Beranda</a></li>
            <li><a href="index.html#about" class="nav-link">Tentang</a></li>
            <li><a href="index.html#programs" class="nav-link">Program</a></li>
            <li><a href="index.html#facilities" class="nav-link">Fasilitas</a></li>
            <li><a href="index.html#quick-links" class="nav-link">Link Penting</a></li>
            <li><a href="index.html#contact" class="nav-link">Kontak</a></li>
        </ul>
    </div>
</nav>`;

const FOOTER_HTML = `
<footer class="footer" aria-label="Footer situs">
    <div class="container footer-grid">
        <div class="footer-brand">
            <h3><i class="fas fa-school" aria-hidden="true"></i> SMA Kartika Nusantara</h3>
            <p>Membentuk generasi penerus bangsa yang cerdas, berkarakter, dan siap menghadapi tantangan global.</p>
            <div class="footer-social" aria-label="Media sosial">
                <a href="#" aria-label="Facebook SMA Kartika Nusantara" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-f" aria-hidden="true"></i></a>
                <a href="#" aria-label="Instagram SMA Kartika Nusantara" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram" aria-hidden="true"></i></a>
                <a href="#" aria-label="YouTube SMA Kartika Nusantara" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube" aria-hidden="true"></i></a>
                <a href="#" aria-label="Twitter SMA Kartika Nusantara" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter" aria-hidden="true"></i></a>
            </div>
        </div>
        <nav class="footer-links">
            <h4>Navigasi</h4>
            <ul>
                <li><a href="index.html#home">Beranda</a></li>
                <li><a href="index.html#about">Tentang</a></li>
                <li><a href="index.html#programs">Program</a></li>
                <li><a href="index.html#facilities">Fasilitas</a></li>
                <li><a href="index.html#contact">Kontak</a></li>
            </ul>
        </nav>
        <nav class="footer-links">
            <h4>Link Penting</h4>
            <ul>
                <li><a href="ppdb.html">PPDB Online</a></li>
                <li><a href="elearning.html">E-Learning</a></li>
                <li><a href="perpustakaan.html">Perpustakaan</a></li>
                <li><a href="pengumuman.html">Pengumuman</a></li>
                <li><a href="osis.html">OSIS</a></li>
            </ul>
        </nav>
    </div>
    <div class="footer-bottom">
        <p>&copy; 2026 SMA Kartika Nusantara. Semua hak dilindungi.</p>
    </div>
</footer>`;

document.addEventListener('DOMContentLoaded', () => {
    const navEl = document.getElementById('navbar-placeholder');
    if (navEl) navEl.outerHTML = NAVBAR_HTML;

    const footerEl = document.getElementById('footer-placeholder');
    if (footerEl) footerEl.outerHTML = FOOTER_HTML;
});

let currentLang = 'ar';
let selectedColor = '#27ae60';
let selectedTemplate = 'classic';

function changeTheme(color, el) {
    selectedColor = color;
    document.documentElement.style.setProperty('--primary', color);
    document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
    el.classList.add('active');
}

function setTemplate(temp, el) {
    selectedTemplate = temp;
    document.querySelectorAll('.temp-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
}

function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
}

function toggleLanguage() {
    const isAr = currentLang === 'ar';
    document.getElementById('htmlTag').dir = isAr ? 'ltr' : 'rtl';
    currentLang = isAr ? 'en' : 'ar';
    document.getElementById('themeText').innerText = isAr ? "Style & Color:" : "اللون والنموذج:";
    document.getElementById('btnClassic').innerText = isAr ? "Classic" : "كلاسيكي";
    document.getElementById('btnModern').innerText = isAr ? "Modern" : "حديث";
    document.getElementById('btnCreative').innerText = isAr ? "Creative" : "إبداعي";
    document.getElementById('photoText').innerText = isAr ? "Photo" : "صورة شخصية";
    document.getElementById('submitBtn').innerText = isAr ? "Download PDF" : "تحميل PDF";
}

document.getElementById('cvForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const name = document.getElementById('name').value;
    const job = document.getElementById('job').value;
    const about = document.getElementById('about').value;
    const photoFile = document.getElementById('photoInput').files[0];

    const generate = (img) => {
        doc.setFillColor(selectedColor);
        if (selectedTemplate === 'classic') {
            doc.rect(0, 0, 210, 8, 'F');
            if (img) doc.addImage(img, 'JPEG', 165, 15, 30, 30);
            doc.setTextColor(selectedColor); doc.setFontSize(22); doc.text(name, 20, 25);
            doc.setTextColor(100); doc.setFontSize(14); doc.text(job, 20, 35);
        } else if (selectedTemplate === 'modern') {
            doc.rect(0, 0, 65, 297, 'F');
            if (img) doc.addImage(img, 'JPEG', 12, 15, 40, 40);
            doc.setTextColor(selectedColor); doc.setFontSize(24); doc.text(name, 75, 30);
        } else {
            doc.circle(180, 30, 20, 'F');
            if (img) doc.addImage(img, 'JPEG', 165, 15, 30, 30);
            doc.setTextColor(selectedColor); doc.setFontSize(28); doc.text(name, 20, 30);
        }
        doc.setTextColor(60); doc.setFontSize(11); doc.text(about, 20, 60, {maxWidth: 170});
        doc.save(`${name}_CV.pdf`);
    };

    if (photoFile) {
        const r = new FileReader();
        r.onload = (v) => generate(v.target.result);
        r.readAsDataURL(photoFile);
    } else { generate(null); }
});

let currentLang = 'ar';
let selectedColor = '#27ae60';

function changeTheme(color, el) {
    selectedColor = color;
    document.documentElement.style.setProperty('--primary', color);
    document.querySelectorAll('.color-dot').forEach(dot => dot.classList.remove('active'));
    el.classList.add('active');
}

function toggleLanguage() {
    const isAr = currentLang === 'ar';
    document.getElementById('htmlTag').dir = isAr ? 'ltr' : 'rtl';
    currentLang = isAr ? 'en' : 'ar';
    document.getElementById('themeText').innerText = isAr ? "Choose CV Color:" : "اختر لون السيرة:";
    document.getElementById('photoText').innerText = isAr ? "Choose Photo" : "اختر صورة من المعرض";
    document.getElementById('submitBtn').innerText = isAr ? "Download PDF" : "تحميل PDF";
}

function toggleDarkMode() {
    const body = document.body;
    body.setAttribute('data-theme', body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}

document.getElementById('cvForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const name = document.getElementById('name').value;
    const photoFile = document.getElementById('photoInput').files[0];

    const generate = (img) => {
        doc.setFillColor(selectedColor);
        doc.rect(0, 0, 210, 15, 'F');
        if (img) doc.addImage(img, 'JPEG', 160, 20, 35, 35);
        doc.setTextColor(selectedColor);
        doc.setFontSize(22); doc.text(name, 20, 35);
        doc.save('My_CV.pdf');
    };

    if (photoFile) {
        const r = new FileReader();
        r.onload = (ev) => generate(ev.target.result);
        r.readAsDataURL(photoFile);
    } else { generate(null); }
});

let currentLang = 'ar';
let selectedColor = '#27ae60';
let selectedTemplate = 'classic';

function changeTheme(color, el) {
    selectedColor = color;
    document.documentElement.style.setProperty('--primary', color);
    document.querySelectorAll('.color-dot').forEach(dot => dot.classList.remove('active'));
    el.classList.add('active');
}

function setTemplate(temp, el) {
    selectedTemplate = temp;
    document.querySelectorAll('.temp-btn').forEach(btn => btn.classList.remove('active'));
    el.classList.add('active');
}

function toggleLanguage() {
    const isAr = currentLang === 'ar';
    document.getElementById('htmlTag').dir = isAr ? 'ltr' : 'rtl';
    currentLang = isAr ? 'en' : 'ar';
    document.getElementById('themeText').innerText = isAr ? "Choose Color:" : "اختر اللون:";
    document.getElementById('tempText').innerText = isAr ? "Style:" : "شكل السيرة:";
    document.getElementById('btnClassic').innerText = isAr ? "Classic" : "كلاسيكي";
    document.getElementById('btnModern').innerText = isAr ? "Modern" : "حديث";
    document.getElementById('btnCreative').innerText = isAr ? "Creative" : "إبداعي";
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
    const job = document.getElementById('job').value;
    const email = document.getElementById('email').value;
    const about = document.getElementById('about').value;
    const photoFile = document.getElementById('photoInput').files[0];

    const generate = (img) => {
        doc.setFillColor(selectedColor);
        
        if (selectedTemplate === 'classic') {
            doc.rect(0, 0, 210, 10, 'F');
            if (img) doc.addImage(img, 'JPEG', 160, 15, 35, 35);
            doc.setTextColor(selectedColor); doc.setFontSize(22); doc.text(name, 20, 30);
            doc.setTextColor(100); doc.setFontSize(14); doc.text(job, 20, 40);
            doc.setFontSize(11); doc.text(email, 20, 48);
            doc.setTextColor(50); doc.text(about, 20, 65, { maxWidth: 170 });
        } 
        else if (selectedTemplate === 'modern') {
            doc.rect(0, 0, 70, 297, 'F');
            if (img) doc.addImage(img, 'JPEG', 15, 20, 40, 40);
            doc.setTextColor(255); doc.setFontSize(10); doc.text(email, 5, 70);
            doc.setTextColor(selectedColor); doc.setFontSize(26); doc.text(name, 80, 35);
            doc.setTextColor(100); doc.setFontSize(16); doc.text(job, 80, 45);
            doc.setTextColor(50); doc.setFontSize(12); doc.text(about, 80, 65, { maxWidth: 120 });
        }
        else if (selectedTemplate === 'creative') {
            doc.setFillColor(selectedColor); doc.circle(180, 35, 25, 'F');
            if (img) doc.addImage(img, 'JPEG', 160, 15, 40, 40);
            doc.setTextColor(selectedColor); doc.setFontSize(30); doc.text(name, 20, 35);
            doc.setDrawColor(selectedColor); doc.setLineWidth(1); doc.line(20, 42, 100, 42);
            doc.setTextColor(100); doc.setFontSize(16); doc.text(job, 20, 52);
            doc.setTextColor(50); doc.setFontSize(12); doc.text(about, 20, 70, { maxWidth: 170 });
        }
        doc.save(`${name}_CV.pdf`);
    };

    if (photoFile) {
        const r = new FileReader();
        r.onload = (ev) => generate(ev.target.result);
        r.readAsDataURL(photoFile);
    } else { generate(null); }
});

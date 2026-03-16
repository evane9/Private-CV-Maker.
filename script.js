let currentLang = 'ar';

function toggleLanguage() {
    const html = document.getElementById('htmlTag');
    if (currentLang === 'ar') {
        html.dir = 'ltr'; currentLang = 'en';
        document.getElementById('title').innerHTML = '<i class="fas fa-file-invoice"></i> CV Maker';
        document.getElementById('photoText').innerText = "Choose from Gallery";
        document.getElementById('name').placeholder = "Full Name";
        document.getElementById('job').placeholder = "Job Title";
        document.getElementById('submitBtn').innerHTML = '<i class="fas fa-download"></i> Download PDF';
        document.getElementById('langBtn').innerHTML = '<i class="fas fa-language"></i> AR';
    } else {
        html.dir = 'rtl'; currentLang = 'ar';
        document.getElementById('title').innerHTML = '<i class="fas fa-file-invoice"></i> صانع السيرة الذاتية';
        document.getElementById('photoText').innerText = "اختر صورة من المعرض";
        document.getElementById('name').placeholder = "الاسم الكامل";
        document.getElementById('job').placeholder = "المسمى الوظيفي";
        document.getElementById('submitBtn').innerHTML = '<i class="fas fa-download"></i> تحميل PDF';
        document.getElementById('langBtn').innerHTML = '<i class="fas fa-language"></i> EN';
    }
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
    const photoFile = document.getElementById('photoInput').files[0];

    if (photoFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            doc.addImage(event.target.result, 'JPEG', 150, 15, 40, 40); // وضع الصورة
            generateText(doc, name, job);
        };
        reader.readAsDataURL(photoFile);
    } else {
        generateText(doc, name, job);
    }
});

function generateText(doc, name, job) {
    doc.setFontSize(22);
    doc.text(name, 20, 30);
    doc.setFontSize(16);
    doc.text(job, 20, 45);
    doc.save('My_CV.pdf');
}

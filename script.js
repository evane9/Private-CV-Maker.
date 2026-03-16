function toggleDarkMode() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    
    // تغيير أيقونة الزر اختيارياً
    const darkBtn = document.querySelector('button[onclick="toggleDarkMode()"] i');
    if (darkBtn) {
        darkBtn.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

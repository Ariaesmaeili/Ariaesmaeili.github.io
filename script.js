// ========== پیام ==========
function showMessage(text, type = 'success') {
    const box = document.getElementById('messageBox');
    if (!box) return;
    box.innerHTML = `<div class="alert alert-${type}">${text}</div>`;
    setTimeout(() => box.innerHTML = '', 4000);
}

// ========== ذخیره فرم اصلی ==========
function saveForm(event, type) {
    event.preventDefault();

    let data = {};

    if (type === 'sale') {
        data = {
            id: Date.now(),
            type: 'sale',
            name: document.getElementById('sale-name').value,
            nationalCode: document.getElementById('sale-national').value,
            province: document.getElementById('sale-province').value,
            amount: parseInt(document.getElementById('sale-amount').value),
            phone: document.getElementById('sale-phone').value,
            status: 'در انتظار',
            date: new Date().toLocaleString('fa-IR')
        };
    } else if (type === 'request') {
        data = {
            id: Date.now(),
            type: 'request',
            name: document.getElementById('req-name').value,
            nationalCode: document.getElementById('req-national').value,
            duration: document.getElementById('req-duration').value,
            province: document.getElementById('req-province').value,
            amount: parseInt(document.getElementById('req-amount').value),
            phone: document.getElementById('req-phone').value,
            status: 'در انتظار',
            date: new Date().toLocaleString('fa-IR')
        };
    }

    // ذخیره در localStorage
    const allData = JSON.parse(localStorage.getItem('loanData') || '[]');
    allData.push(data);
    localStorage.setItem('loanData', JSON.stringify(allData));

    showMessage('✅ اطلاعات با موفقیت ثبت شد!');
    event.target.reset();
    renderLoansList();
}

// ========== ذخیره فرم ثبت امتیاز ==========
function saveScoreForm(event) {
    event.preventDefault();

    const data = {
        id: Date.now(),
        type: 'score',
        name: document.getElementById('score-name').value,
        nationalCode: document.getElementById('score-national').value,
        phone: document.getElementById('score-phone').value,
        amount: parseInt(document.getElementById('score-amount').value),
        status: 'در انتظار',
        date: new Date().toLocaleString('fa-IR')
    };

    const allData = JSON.parse(localStorage.getItem('loanData') || '[]');
    allData.push(data);
    localStorage.setItem('loanData', JSON.stringify(allData));

    alert('✅ امتیاز با موفقیت ثبت شد!');
    event.target.reset();
}

// ========== ذخیره فرم خرید امتیاز ==========
function saveBuyForm(event) {
    event.preventDefault();

    const data = {
        id: Date.now(),
        type: 'buy',
        name: document.getElementById('buy-name').value,
        nationalCode: document.getElementById('buy-national').value,
        phone: document.getElementById('buy-phone').value,
        scoreCount: parseInt(document.getElementById('buy-score').value),
        amount: parseInt(document.getElementById('buy-amount').value),
        status: 'در انتظار',
        date: new Date().toLocaleString('fa-IR')
    };

    const allData = JSON.parse(localStorage.getItem('loanData') || '[]');
    allData.push(data);
    localStorage.setItem('loanData', JSON.stringify(allData));

    alert('✅ درخواست خرید ثبت شد!');
    event.target.reset();
}
// ========== نمایش لیست وام‌های ثبت شده ==========
function renderLoansList() {
    const container = document.getElementById('loansList');
    if (!container) return;

    const data = JSON.parse(localStorage.getItem('loanData') || '[]');

    // فقط وام‌های فروشی و درخواستی
    const loans = data.filter(d => d.type === 'sale' || d.type === 'request').reverse();

    if (loans.length === 0) {
        container.innerHTML = '<div class="loans-empty">هنوز وامی ثبت نشده است</div>';
        return;
    }

    container.innerHTML = loans.map(item => {
        const typeLabel = item.type === 'sale' ? 'فروش وام' : 'درخواست وام';
        const typeClass = item.type === 'sale' ? 'loan-type-sale' : 'loan-type-request';

        return `
            <div class="loan-item">
                <div class="loan-info">
                    <span>👤 <strong>${item.name}</strong></span>
                    <span>📍 ${item.province}</span>
                    <span>📞 ${item.phone}</span>
                    <span class="loan-type ${typeClass}">${typeLabel}</span>
                </div>
                <div class="loan-amount">
                    ${Number(item.amount).toLocaleString('fa-IR')} تومان
                </div>
            </div>
        `;
    }).join('');
}

// اجرا در بارگذاری اولیه
document.addEventListener('DOMContentLoaded', renderLoansList);
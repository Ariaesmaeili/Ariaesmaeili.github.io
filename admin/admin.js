// ========== چک لاگین ==========
if (sessionStorage.getItem('adminLoggedIn') !== 'true') {
    window.location.href = 'login.html';
}

// ========== خروج ==========
function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    window.location.href = 'login.html';
}

// ========== تب‌ها ==========
function showTab(tab, btn) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
    btn.classList.add('active');
}

// ========== بارگذاری داده‌ها ==========
function getData() {
    return JSON.parse(localStorage.getItem('loanData') || '[]');
}

function saveData(data) {
    localStorage.setItem('loanData', JSON.stringify(data));
}

// ========== فیلتر ==========
function getFiltered(type) {
    let data = getData().filter(d => d.type === type);

    const search = document.getElementById('searchInput').value.trim().toLowerCase();
    const status = document.getElementById('filterStatus').value;

    if (search) {
        data = data.filter(d =>
            (d.name && d.name.toLowerCase().includes(search)) ||
            (d.nationalCode && d.nationalCode.includes(search)) ||
            (d.province && d.province.toLowerCase().includes(search)) ||
            (d.phone && d.phone.includes(search))
        );
    }

    if (status) {
        data = data.filter(d => d.status === status);
    }

    return data.reverse();
}

// ========== رندر ==========
function renderAll() {
    renderSale();
    renderRequest();
    renderScore();
    renderBuy();
    updateStats();
}

function renderSale() {
    const data = getFiltered('sale');
    const tbody = document.getElementById('tableSale');
    document.getElementById('badgeSale').textContent = data.length + ' مورد';

    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="empty">موردی یافت نشد</td></tr>';
        return;
    }

    tbody.innerHTML = data.map((row, i) => `
        <tr>
            <td>${i + 1}</td>
            <td><strong>${row.name}</strong></td>
            <td>${row.nationalCode}</td>
            <td>${row.province}</td>
            <td>${Number(row.amount).toLocaleString('fa-IR')}</td>
            <td>${row.phone}</td>
            <td>
                <select class="status-select" onchange="changeStatus(${row.id}, this.value)">
                    <option value="در انتظار" ${row.status === 'در انتظار' ? 'selected' : ''}>در انتظار</option>
                    <option value="انجام شده" ${row.status === 'انجام شده' ? 'selected' : ''}>انجام شده</option>
                    <option value="لغو شده" ${row.status === 'لغو شده' ? 'selected' : ''}>لغو شده</option>
                </select>
            </td>
            <td>${row.date || '-'}</td>
            <td><button class="btn-delete" onclick="deleteRecord(${row.id})">🗑</button></td>
        </tr>
    `).join('');
}

function renderRequest() {
    const data = getFiltered('request');
    const tbody = document.getElementById('tableRequest');
    document.getElementById('badgeRequest').textContent = data.length + ' مورد';

    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" class="empty">موردی یافت نشد</td></tr>';
        return;
    }

    tbody.innerHTML = data.map((row, i) => `
        <tr>
            <td>${i + 1}</td>
            <td><strong>${row.name}</strong></td>
            <td>${row.nationalCode}</td>
            <td>${row.duration || '-'}</td>
            <td>${row.province}</td>
            <td>${Number(row.amount).toLocaleString('fa-IR')}</td>
            <td>${row.phone}</td>
            <td>
                <select class="status-select" onchange="changeStatus(${row.id}, this.value)">
                    <option value="در انتظار" ${row.status === 'در انتظار' ? 'selected' : ''}>در انتظار</option>
                    <option value="انجام شده" ${row.status === 'انجام شده' ? 'selected' : ''}>انجام شده</option>
                    <option value="لغو شده" ${row.status === 'لغو شده' ? 'selected' : ''}>لغو شده</option>
                </select>
            </td>
            <td>${row.date || '-'}</td>
            <td><button class="btn-delete" onclick="deleteRecord(${row.id})">🗑</button></td>
        </tr>
    `).join('');
}

function renderScore() {
    const data = getFiltered('score');
    const tbody = document.getElementById('tableScore');
    document.getElementById('badgeScore').textContent = data.length + ' مورد';

    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="empty">موردی یافت نشد</td></tr>';
        return;
    }

    tbody.innerHTML = data.map((row, i) => `
        <tr>
            <td>${i + 1}</td>
            <td><strong>${row.name}</strong></td>
            <td>${row.nationalCode}</td>
            <td>${row.phone}</td>
            <td>${Number(row.amount).toLocaleString('fa-IR')}</td>
            <td>
                <select class="status-select" onchange="changeStatus(${row.id}, this.value)">
                    <option value="در انتظار" ${row.status === 'در انتظار' ? 'selected' : ''}>در انتظار</option>
                    <option value="انجام شده" ${row.status === 'انجام شده' ? 'selected' : ''}>انجام شده</option>
                    <option value="لغو شده" ${row.status === 'لغو شده' ? 'selected' : ''}>لغو شده</option>
                </select>
            </td>
            <td>${row.date || '-'}</td>
            <td><button class="btn-delete" onclick="deleteRecord(${row.id})">🗑</button></td>
        </tr>
    `).join('');
}

function renderBuy() {
    const data = getFiltered('buy');
    const tbody = document.getElementById('tableBuy');
    document.getElementById('badgeBuy').textContent = data.length + ' مورد';

    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="empty">موردی یافت نشد</td></tr>';
        return;
    }

    tbody.innerHTML = data.map((row, i) => `
        <tr>
            <td>${i + 1}</td>
            <td><strong>${row.name}</strong></td>
            <td>${row.nationalCode}</td>
            <td>${row.phone}</td>
            <td>${row.scoreCount || '-'}</td>
            <td>${Number(row.amount).toLocaleString('fa-IR')}</td>
            <td>
                <select class="status-select" onchange="changeStatus(${row.id}, this.value)">
                    <option value="در انتظار" ${row.status === 'در انتظار' ? 'selected' : ''}>در انتظار</option>
                    <option value="انجام شده" ${row.status === 'انجام شده' ? 'selected' : ''}>انجام شده</option>
                    <option value="لغو شده" ${row.status === 'لغو شده' ? 'selected' : ''}>لغو شده</option>
                </select>
            </td>
            <td>${row.date || '-'}</td>
            <td><button class="btn-delete" onclick="deleteRecord(${row.id})">🗑</button></td>
        </tr>
    `).join('');
}

// ========== آمار ==========
function updateStats() {
    const data = getData();
    document.getElementById('statSale').textContent = data.filter(d => d.type === 'sale').length;
    document.getElementById('statRequest').textContent = data.filter(d => d.type === 'request').length;
    document.getElementById('statScore').textContent = data.filter(d => d.type === 'score').length;
    document.getElementById('statBuy').textContent = data.filter(d => d.type === 'buy').length;
}

// ========== حذف ==========
function deleteRecord(id) {
    if (!confirm('آیا از حذف این رکورد مطمئن هستید؟')) return;
    let data = getData().filter(d => d.id !== id);
    saveData(data);
    renderAll();
}

// ========== تغییر وضعیت ==========
function changeStatus(id, status) {
    let data = getData();
    const item = data.find(d => d.id === id);
    if (item) {
        item.status = status;
        saveData(data);
    }
}

// ========== شروع ==========
renderAll();
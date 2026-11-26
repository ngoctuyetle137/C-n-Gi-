/**
 * CẦN GIỜ ECO-TOURISM - MAIN JAVASCRIPT
 * Tương tác giao diện phong cách Jacada Travel, Bản Đồ Google Maps & Quản Lý Đăng Nhập
 */

document.addEventListener('DOMContentLoaded', function () {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function () {
            mainNav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('open');
        });

        // Đóng menu khi click vào link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                mobileMenuBtn.classList.remove('open');
            });
        });
    }

    // 2. Chuyển đổi tab Lịch trình (Itinerary Tabs)
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            this.classList.add('active');
            const targetTabId = this.getAttribute('data-tab');
            const targetPane = document.getElementById(targetTabId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // 3. Xử lý Form tư vấn chuyến đi (Booking / Enquiry Form)
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;

            alert(`Cảm ơn quý khách ${fullName}!\n\nYêu cầu thiết kế tour Cần Giờ của quý khách đã được gửi thành công.\nChuyên viên tư vấn sẽ liên hệ qua SĐT ${phone} hoặc email ${email} trong vòng 24 giờ.`);
            bookingForm.reset();
        });
    }

    // 4. Xử lý Form bản tin (Newsletter Form)
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Cảm ơn bạn đã đăng ký nhận bản tin du lịch Cần Giờ!');
            newsletterForm.reset();
        });
    }

    // 5. Hiệu ứng header khi cuộn trang
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                header.style.backgroundColor = 'rgba(251, 249, 245, 0.98)';
            } else {
                header.style.boxShadow = 'none';
                header.style.backgroundColor = 'rgba(251, 249, 245, 0.95)';
            }
        });
    }

    // 6. Hero Banner Slideshow chuyển ảnh tự động (bìa -> bìa2 -> bìa3 -> bìa4)
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.hero-dot');
    let currentSlideIndex = 0;
    let slideTimer;

    function showSlide(index) {
        if (!heroSlides.length) return;
        heroSlides[currentSlideIndex].classList.remove('active');
        if (heroDots[currentSlideIndex]) {
            heroDots[currentSlideIndex].classList.remove('active');
        }

        currentSlideIndex = (index + heroSlides.length) % heroSlides.length;

        heroSlides[currentSlideIndex].classList.add('active');
        if (heroDots[currentSlideIndex]) {
            heroDots[currentSlideIndex].classList.add('active');
        }
    }

    function startAutoSlide() {
        slideTimer = setInterval(function () {
            showSlide(currentSlideIndex + 1);
        }, 4500); // Chuyển cảnh sau 4.5 giây
    }

    if (heroSlides.length > 1) {
        startAutoSlide();

        heroDots.forEach((dot, idx) => {
            dot.addEventListener('click', function () {
                clearInterval(slideTimer);
                showSlide(idx);
                startAutoSlide();
            });
        });
    }

    // 7. Bộ lọc danh mục địa điểm (trên trang diadiem.html)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const destCards = document.querySelectorAll('.destinations-full-grid .destination-card');

    if (filterBtns.length > 0 && destCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                destCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 8. TÍCH HỢP TÀI KHOẢN & ĐĂNG NHẬP / ĐĂNG KÝ TRÊN THANH MENU
    setupAuthNavbar();

    // 9. BẢN ĐỒ GOOGLE MAPS POPUP TIỆN ÍCH
    setupGlobalMapModal();

    // 10. XỬ LÝ ĐÁNH GIÁ CẦN ĐĂNG NHẬP TRÊN TRANG CAMNHAN.HTML
    setupReviewsWithAuth();
});

// ========================================================
// AUTHENTICATION & NAVBAR CONTROLLER
// ========================================================
function setupAuthNavbar() {
    const mainNavUl = document.querySelector('.main-nav ul');
    if (!mainNavUl || typeof Store === 'undefined') return;

    // Tạo container cho Auth trên navbar
    let authLi = document.getElementById('navAuthItem');
    if (!authLi) {
        authLi = document.createElement('li');
        authLi.id = 'navAuthItem';
        authLi.className = 'nav-auth-box';
        mainNavUl.appendChild(authLi);
    }

    const currentUser = Store.getCurrentUser();
    if (currentUser) {
        if (currentUser.role === 'admin') {
            authLi.innerHTML = `
                <a href="admin.html" class="btn-nav-auth btn-nav-admin" title="Truy cập Trang Quản Trị">👑 Admin Panel</a>
                <button class="btn-logout-small" id="navLogoutBtn">Thoát</button>
            `;
        } else {
            authLi.innerHTML = `
                <span class="user-nav-dropdown">👤 ${currentUser.fullName || currentUser.username}</span>
                <button class="btn-logout-small" id="navLogoutBtn">Thoát</button>
            `;
        }
        document.getElementById('navLogoutBtn')?.addEventListener('click', () => Store.logout());
    } else {
        authLi.innerHTML = `
            <button class="btn-nav-auth" id="btnOpenAuthModal">Đăng Nhập</button>
        `;
        document.getElementById('btnOpenAuthModal')?.addEventListener('click', openAuthModal);
    }

    // Tạo Modal Đăng nhập / Đăng ký nếu chưa có
    injectAuthModalHTML();
}

function injectAuthModalHTML() {
    if (document.getElementById('cgAuthModal')) return;

    const modalDiv = document.createElement('div');
    modalDiv.id = 'cgAuthModal';
    modalDiv.className = 'cg-modal-overlay';
    modalDiv.innerHTML = `
        <div class="cg-modal-content">
            <div class="cg-modal-header">
                <h4 id="authModalTitle">Tài Khoản Du Khách</h4>
                <button class="cg-modal-close" id="btnCloseAuthModal">&times;</button>
            </div>
            <div class="cg-modal-body">
                <div class="auth-tabs-toggle">
                    <button class="auth-tab-btn active" id="tabBtnLogin">Đăng Nhập</button>
                    <button class="auth-tab-btn" id="tabBtnRegister">Đăng Ký Mới</button>
                </div>

                <!-- Form Đăng Nhập -->
                <form id="globalLoginForm">
                    <div class="auth-form-group">
                        <label>Tên đăng nhập *</label>
                        <input type="text" id="loginUsername" required placeholder="admin hoặc tên tài khoản">
                    </div>
                    <div class="auth-form-group">
                        <label>Mật khẩu *</label>
                        <input type="password" id="loginPassword" required placeholder="Mật khẩu của bạn">
                    </div>
                    <button type="submit" class="btn-auth-action">Đăng Nhập Ngay</button>
                    <p style="font-size:0.8rem; color:#718096; margin-top:14px; text-align:center;">
                        Tài khoản Admin mẫu: <strong>admin</strong> / <strong>admin123</strong><br>
                        Tài khoản Du khách: <strong>dukhach</strong> / <strong>123456</strong>
                    </p>
                </form>

                <!-- Form Đăng Ký -->
                <form id="globalRegisterForm" style="display:none;">
                    <div class="auth-form-group">
                        <label>Họ và Tên *</label>
                        <input type="text" id="regFullName" required placeholder="Ví dụ: Nguyễn Văn An">
                    </div>
                    <div class="auth-form-group">
                        <label>Tên đăng nhập *</label>
                        <input type="text" id="regUsername" required placeholder="viết liền không dấu">
                    </div>
                    <div class="auth-form-group">
                        <label>Email liên hệ</label>
                        <input type="email" id="regEmail" placeholder="email@gmail.com">
                    </div>
                    <div class="auth-form-group">
                        <label>Mật khẩu *</label>
                        <input type="password" id="regPassword" required placeholder="Tối thiểu 6 ký tự">
                    </div>
                    <button type="submit" class="btn-auth-action" style="background:var(--accent-gold);">Đăng Ký Tài Khoản</button>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modalDiv);

    // Event listeners cho Auth Modal
    const modal = document.getElementById('cgAuthModal');
    document.getElementById('btnCloseAuthModal').addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });

    const tabBtnLogin = document.getElementById('tabBtnLogin');
    const tabBtnRegister = document.getElementById('tabBtnRegister');
    const formLogin = document.getElementById('globalLoginForm');
    const formRegister = document.getElementById('globalRegisterForm');

    tabBtnLogin.addEventListener('click', () => {
        tabBtnLogin.classList.add('active');
        tabBtnRegister.classList.remove('active');
        formLogin.style.display = 'block';
        formRegister.style.display = 'none';
        document.getElementById('authModalTitle').textContent = 'Đăng Nhập Tài Khoản';
    });

    tabBtnRegister.addEventListener('click', () => {
        tabBtnRegister.classList.add('active');
        tabBtnLogin.classList.remove('active');
        formLogin.style.display = 'none';
        formRegister.style.display = 'block';
        document.getElementById('authModalTitle').textContent = 'Đăng Ký Tài Khoản Mới';
    });

    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        const u = document.getElementById('loginUsername').value;
        const p = document.getElementById('loginPassword').value;
        const res = Store.login(u, p);
        if (res.success) {
            alert(`Chào mừng ${res.user.fullName || res.user.username} đã đăng nhập!`);
            modal.classList.remove('open');
            setupAuthNavbar();
            window.location.reload();
        } else {
            alert(res.message);
        }
    });

    formRegister.addEventListener('submit', (e) => {
        e.preventDefault();
        const fn = document.getElementById('regFullName').value;
        const u = document.getElementById('regUsername').value;
        const em = document.getElementById('regEmail').value;
        const p = document.getElementById('regPassword').value;
        const res = Store.register(fn, u, p, em);
        if (res.success) {
            alert(`Đăng ký thành công! Chào mừng ${res.user.fullName}.`);
            modal.classList.remove('open');
            setupAuthNavbar();
            window.location.reload();
        } else {
            alert(res.message);
        }
    });
}

function openAuthModal() {
    const modal = document.getElementById('cgAuthModal');
    if (modal) modal.classList.add('open');
}

// ========================================================
// GLOBAL GOOGLE MAPS MODAL
// ========================================================
function setupGlobalMapModal() {
    if (document.getElementById('cgMapModal')) return;

    const mapModalDiv = document.createElement('div');
    mapModalDiv.id = 'cgMapModal';
    mapModalDiv.className = 'cg-modal-overlay';
    mapModalDiv.innerHTML = `
        <div class="cg-modal-content" style="max-width: 850px; width: 95%;">
            <div class="cg-modal-header">
                <h4 id="cgMapTitle">🗺️ Bản Đồ Vị Trí Cần Giờ</h4>
                <button class="cg-modal-close" id="btnCloseMapModal">&times;</button>
            </div>
            <div style="height: 480px; width: 100%;">
                <iframe id="cgMapFrame" src="" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
    `;
    document.body.appendChild(mapModalDiv);

    const modal = document.getElementById('cgMapModal');
    document.getElementById('btnCloseMapModal').addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });

    // Gắn sự kiện cho các nút có data-place hoặc class btn-card-map
    document.addEventListener('click', function (e) {
        const btn = e.target.closest('.btn-card-map, [data-map-place]');
        if (btn) {
            e.preventDefault();
            const placeName = btn.getAttribute('data-map-place') || btn.closest('.destination-card')?.querySelector('.card-title')?.textContent || 'Cần Giờ';
            openGoogleMap(placeName);
        }
    });
}

window.openGoogleMap = function (placeName) {
    const modal = document.getElementById('cgMapModal');
    const title = document.getElementById('cgMapTitle');
    const frame = document.getElementById('cgMapFrame');
    if (modal && frame) {
        title.innerHTML = `🗺️ Vị Trí: ${placeName}`;
        frame.src = `https://maps.google.com/maps?q=${encodeURIComponent(placeName + ' Cần Giờ TP.HCM')}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
        modal.classList.add('open');
    }
};

// ========================================================
// REVIEWS & FEEDBACK WITH AUTH GATE (camnhan.html)
// ========================================================
function setupReviewsWithAuth() {
    const feedbackBox = document.getElementById('feedbackFormContainer');
    const reviewsGrid = document.getElementById('dynamicReviewsGrid');
    if (!reviewsGrid || typeof Store === 'undefined') return;

    // Render danh sách đánh giá từ LocalStorage
    function renderReviewsList() {
        const reviews = Store.getReviews();
        reviewsGrid.innerHTML = '';
        reviews.forEach(r => {
            const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
            const article = document.createElement('article');
            article.className = 'destination-card';
            article.innerHTML = `
                <div class="card-content" style="padding: 28px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                        <span class="card-location" style="margin:0; font-size:1rem; color:#E53E3E;">${stars}</span>
                        <span style="font-size:0.75rem; color:var(--text-muted);">${r.date}</span>
                    </div>
                    <h3 class="card-title" style="font-size:1.3rem; margin-bottom:8px;">${r.placeName || 'Chuyến Đi Cần Giờ'}</h3>
                    <p class="card-desc" style="font-size:0.92rem; line-height:1.7;">"${r.comment}"</p>
                    <div style="display:flex; align-items:center; gap:8px; margin-top:16px; padding-top:12px; border-top:1px dashed var(--border-subtle);">
                        <span style="font-size:1.3rem;">${r.avatar || '🌿'}</span>
                        <strong style="font-size:0.85rem; color:var(--primary-color);">${r.userName}</strong>
                    </div>
                </div>
            `;
            reviewsGrid.appendChild(article);
        });
    }

    renderReviewsList();

    // Kiểm tra trạng thái đăng nhập cho Form đánh giá
    if (feedbackBox) {
        const user = Store.getCurrentUser();
        if (!user) {
            feedbackBox.innerHTML = `
                <div class="text-center" style="padding: 30px 20px; background: #F8FAF9; border: 1px dashed var(--accent-gold); border-radius: 4px;">
                    <span style="font-size: 2.5rem; display:block; margin-bottom: 10px;">🔒</span>
                    <h3 style="font-family: var(--font-heading); font-size: 1.8rem; color: var(--primary-color); margin-bottom: 8px;">Đăng Nhập Để Gửi Đánh Giá</h3>
                    <p style="color: var(--text-muted); font-size: 0.95rem; max-width: 500px; margin: 0 auto 20px;">
                        Để đảm bảo tính xác thực của các bài suy ngẫm và cảm nhận du lịch Cần Giờ, quý khách vui lòng đăng nhập trước khi viết bài.
                    </p>
                    <button class="btn btn-primary" onclick="openAuthModal()" style="padding: 12px 28px;">Đăng Nhập Ngay</button>
                </div>
            `;
        } else {
            feedbackBox.innerHTML = `
                <div class="text-center" style="max-width: 700px; margin: 0 auto 28px;">
                    <span class="section-tag">CHIA SẺ KHOẢNH KHẮC</span>
                    <h3 style="font-family: var(--font-heading); font-size: 2rem; color: var(--primary-color); margin-bottom: 8px;">Gửi Cảm Nhận &amp; Suy Ngẫm</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem;">
                        Đang viết đánh giá với tư cách: <strong style="color:var(--accent-gold);">${user.fullName || user.username}</strong>
                    </p>
                </div>
                <form id="authReviewForm" style="max-width: 680px; margin: 0 auto;">
                    <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 20px; margin-bottom: 16px;">
                        <div>
                            <label style="display:block; font-size:0.8rem; font-weight:600; text-transform:uppercase; margin-bottom:6px; color:var(--primary-color);">Địa điểm / Chuyến tham quan *</label>
                            <input type="text" id="revPlace" required placeholder="Ví dụ: Rừng Vàm Sát, Chợ Hàng Dương..." style="width:100%; padding:10px 14px; border:1px solid var(--border-subtle); border-radius:2px; font-size:0.9rem;">
                        </div>
                        <div>
                            <label style="display:block; font-size:0.8rem; font-weight:600; text-transform:uppercase; margin-bottom:6px; color:var(--primary-color);">Mức độ hài lòng *</label>
                            <select id="revRating" style="width:100%; padding:10px 14px; border:1px solid var(--border-subtle); border-radius:2px; font-size:0.9rem;">
                                <option value="5">★★★★★ Tuyệt vời (5/5)</option>
                                <option value="4">★★★★☆ Rất tốt (4/5)</option>
                                <option value="3">★★★☆☆ Hài lòng (3/5)</option>
                            </select>
                        </div>
                    </div>
                    <div style="margin-bottom: 20px;">
                        <label style="display:block; font-size:0.8rem; font-weight:600; text-transform:uppercase; margin-bottom:6px; color:var(--primary-color);">Cảm nhận &amp; Suy ngẫm của bạn *</label>
                        <textarea id="revComment" rows="4" required placeholder="Chia sẻ những trải nghiệm đáng nhớ, cảnh đẹp, món ăn hay lưu ý hữu ích..." style="width:100%; padding:12px 14px; border:1px solid var(--border-subtle); border-radius:2px; font-size:0.9rem; font-family:var(--font-body);"></textarea>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary" style="padding: 12px 36px;">Đăng Bài Đánh Giá</button>
                    </div>
                </form>
            `;

            document.getElementById('authReviewForm').addEventListener('submit', function (e) {
                e.preventDefault();
                const newRev = {
                    userName: user.fullName || user.username,
                    rating: parseInt(document.getElementById('revRating').value, 10),
                    placeName: document.getElementById('revPlace').value,
                    comment: document.getElementById('revComment').value
                };
                Store.addReview(newRev);
                alert('Cảm ơn bạn! Đánh giá & suy ngẫm của bạn đã được đăng thành công.');
                renderReviewsList();
                this.reset();
            });
        }
    }
}

// ========================================================
// 11. CHI TIẾT 4 PHẦN NGHI LỄ NGHINH ÔNG & CAROUSEL SLIDER (lehoi.html)
// ========================================================
window.toggleRitualBox = function () {
    const box = document.getElementById('ritualDetailsBox');
    const btn = document.getElementById('btnToggleRituals');
    const card = document.getElementById('nghinh-ong');
    if (!box || !btn) return;

    const isHidden = (box.style.display === 'none' || !box.style.display);
    if (isHidden) {
        box.style.display = 'block';
        if (card) card.classList.add('is-expanded');
        btn.innerHTML = 'Thu gọn &uarr;';
    } else {
        box.style.display = 'none';
        if (card) card.classList.remove('is-expanded');
        btn.innerHTML = 'Xem chi tiết &darr;';
    }
};

window.toggleXuanDetailsBox = function () {
    const box = document.getElementById('xuanDetailsBox');
    const btn = document.getElementById('btnToggleXuanDetails');
    const card = document.getElementById('le-hoi-xuan');
    if (!box || !btn) return;

    const isHidden = (box.style.display === 'none' || !box.style.display);
    if (isHidden) {
        box.style.display = 'block';
        if (card) card.classList.add('is-expanded');
        btn.innerHTML = 'Thu gọn &uarr;';
    } else {
        box.style.display = 'none';
        if (card) card.classList.remove('is-expanded');
        btn.innerHTML = 'Xem chi tiết &darr;';
    }
};

const ritualSliderState = {
    vieng: 0,
    thuongky: 0,
    nghinhong: 0,
    cungte: 0,
    leocotmo: 0,
    vuichoi: 0,
    anun: 0,
    phaohoa: 0
};

window.moveRitualSlide = function (sliderKey, step) {
    const frame = document.querySelector(`.ritual-slider-frame[data-slider="${sliderKey}"]`);
    if (!frame) return;
    const slides = frame.querySelectorAll('.ritual-slide');
    const total = slides.length;
    if (total === 0) return;

    ritualSliderState[sliderKey] = (ritualSliderState[sliderKey] + step + total) % total;
    updateRitualSlider(sliderKey);
};

window.setRitualSlide = function (sliderKey, index) {
    ritualSliderState[sliderKey] = index;
    updateRitualSlider(sliderKey);
};

function updateRitualSlider(sliderKey) {
    const frame = document.querySelector(`.ritual-slider-frame[data-slider="${sliderKey}"]`);
    if (!frame) return;
    const track = frame.querySelector('.ritual-slider-track');
    const dots = frame.querySelectorAll('.ritual-dot');
    const counter = frame.querySelector('.ritual-slide-counter');
    const current = ritualSliderState[sliderKey] || 0;

    if (track) {
        track.style.transform = `translateX(-${current * 100}%)`;
    }
    dots.forEach((d, i) => {
        d.classList.toggle('active', i === current);
    });
    if (counter) {
        counter.textContent = `${current + 1} / 3`;
    }
}

window.switchRitualTab = function (tabKey) {
    const tabs = document.querySelectorAll('.ritual-tab-pill');
    const cards = document.querySelectorAll('.ritual-card-item');

    tabs.forEach(t => {
        if (t.getAttribute('data-tab-target') === tabKey) {
            t.classList.add('active');
        } else {
            t.classList.remove('active');
        }
    });

    cards.forEach(card => {
        if (tabKey === 'all' || card.getAttribute('data-ritual-key') === tabKey) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
};

// Touch swipe gestures for all ritual sliders
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.ritual-slider-frame').forEach(frame => {
        let startX = 0;
        let endX = 0;
        const key = frame.getAttribute('data-slider');

        frame.addEventListener('touchstart', function (e) {
            startX = e.changedTouches[0].screenX;
        }, { passive: true });

        frame.addEventListener('touchend', function (e) {
            endX = e.changedTouches[0].screenX;
            if (startX - endX > 35) {
                moveRitualSlide(key, 1);
            } else if (endX - startX > 35) {
                moveRitualSlide(key, -1);
            }
        }, { passive: true });
    });
});

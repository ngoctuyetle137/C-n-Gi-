/**
 * CẦN GIỜ BESPOKE JOURNEYS - MAIN JAVASCRIPT
 * Tương tác giao diện phong cách Jacada Travel
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
            // Xóa active cũ
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Kích hoạt tab mới
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
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            header.style.backgroundColor = 'rgba(251, 249, 245, 0.98)';
        } else {
            header.style.boxShadow = 'none';
            header.style.backgroundColor = 'rgba(251, 249, 245, 0.95)';
        }
    });

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

        // Click vào dot để xem ảnh bất kỳ
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
});

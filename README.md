# Hướng Dẫn Thay Thế Hình Ảnh & Nội Dung (Cần Giờ Bespoke Travel)

Website được xây dựng theo phong cách Luxury Bespoke Travel tương tự [Jacada Travel](https://www.jacadatravel.com/).

## 1. Cấu trúc thư mục theo đúng yêu cầu đề bài:
- `MSSV_LAB1/index.html`: File HTML chính.
- `MSSV_LAB1/Styles/style.css`: File định dạng giao diện chuẩn responsive.
- `MSSV_LAB1/Scripts/main.js`: File xử lý menu mobile, chuyển tab lịch trình, form tư vấn.
- `MSSV_LAB1/Images/`: Thư mục lưu hình ảnh trang web.
- `MSSV_LAB1/Videos/`: Thư mục lưu video giới thiệu (.mp4).
- `MSSV_LAB1/Sounds/`: Thư mục lưu file âm thanh (.mp3).

## 2. Vị trí các ảnh cần thay thế trong `index.html`:
Bạn chỉ cần chép các file ảnh vào thư mục `Images/` và đổi các khối `image-placeholder` trong `index.html` thành thẻ `<img>`:

1. **Ảnh nền Hero Banner**:
   - Vị trí: `<div class="hero-bg-placeholder">`
   - Gợi ý: `Images/hero-can-gio.jpg` (ảnh flycam toàn cảnh rừng ngập mặn Cần Giờ lúc bình minh/hoàng hôn).
2. **Ảnh Giới thiệu Cần Giờ**:
   - Vị trí: `<div class="image-placeholder main-story-img">`
   - Gợi ý: `Images/can-gio-forest.jpg` (ảnh cây đước, cầu gỗ xuyên rừng).
3. **Ảnh 4 Điểm đến nổi bật**:
   - Vị trí: `Khu du lịch sinh thái Vàm Sát` -> `Images/vam-sat.jpg`
   - Vị trí: `Chiến khu Rừng Sác` -> `Images/chien-khu-rung-sac.jpg`
   - Vị trí: `Chợ hải sản Hàng Dương` -> `Images/cho-hang-duong.jpg`
   - Vị trí: `Bãi biển 30/4 & Cầu Nam Hải` -> `Images/bien-30-4.jpg`
4. **Ảnh Trải nghiệm (Experiences Mosaic)**:
   - Chèo SUP rừng đước, tiệc du thuyền hoàng hôn, làng muối Thiềng Liềng.
5. **Ảnh Lịch trình mẫu (Itineraries)**:
   - Tour 1 Ngày, Tour 2 Ngày 1 Đêm, Tour 3 Ngày 2 Đêm.

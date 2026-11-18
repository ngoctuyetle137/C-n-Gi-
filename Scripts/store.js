/**
 * CẦN GIỜ ECO-TOURISM - DATA STORE & AUTHENTICATION MANAGER (LocalStorage)
 * Quản lý CSDL client-side cho Địa điểm, Món ăn, Bài viết, Đánh giá và Phân quyền Admin
 */

const STORAGE_KEYS = {
    PLACES: 'cg_places',
    FOODS: 'cg_foods',
    ARTICLES: 'cg_articles',
    REVIEWS: 'cg_reviews',
    USERS: 'cg_users',
    CURRENT_USER: 'cg_current_user'
};

// Dữ liệu hạt giống mặc định (Seed Data)
const DEFAULT_DATA = {
    users: [
        { id: 'u_admin', username: 'admin', password: 'admin123', fullName: 'Quản Trị Viên', role: 'admin', email: 'admin@cangiotravel.vn' },
        { id: 'u_demo', username: 'dukhach', password: '123456', fullName: 'Lữ Khách Phương Nam', role: 'user', email: 'dukhach@gmail.com' }
    ],
    places: [
        {
            id: 'p_1',
            name: 'Khu Du Lịch Sinh Thái Vàm Sát',
            category: 'sinh-thai',
            location: 'Xã Lý Nhơn, Cần Giờ',
            image: 'Images/VS1.jfif',
            mapUrl: 'https://maps.google.com/maps?q=Khu+du+l%E1%BB%8Bch+V%C3%A0m+S%C3%A1t+C%E1%BA%A7n+Gi%E1%BB%9D&t=&z=14&ie=UTF8&iwloc=&output=embed',
            description: 'Khu bảo tồn Đầm Dơi, Tháp Tang Bồng cao 26m ngắm toàn cảnh rừng xanh và trải nghiệm câu cá sấu du thuyền.'
        },
        {
            id: 'p_2',
            name: 'Xã Đảo Thạnh An',
            category: 'bien-dao',
            location: 'Xã Đảo Thạnh An',
            image: 'Images/pha/thanhan.jpg',
            mapUrl: 'https://maps.google.com/maps?q=%C4%90%E1%BA%A3o+Th%E1%BA%A1nh+An+C%E1%BA%A7n+Gi%E1%BB%9D&t=&z=14&ie=UTF8&iwloc=&output=embed',
            description: 'Ốc đảo thanh bình tách biệt với con đường kè đá chắn sóng độc đáo hướng ra biển Đông.'
        },
        {
            id: 'p_3',
            name: 'Ấp Đảo Thiềng Liềng',
            category: 'bien-dao',
            location: 'Ấp Thiềng Liềng, Xã Thạnh An',
            image: 'Images/checkin-muoi.jpg',
            mapUrl: 'https://maps.google.com/maps?q=Thi%E1%BB%81ng+Li%E1%BB%81ng+C%E1%BA%A7n+Gi%E1%BB%9D&t=&z=14&ie=UTF8&iwloc=&output=embed',
            description: 'Cái nôi nghề muối thủ công truyền thống, không gian đờn ca tài tử và ngâm chân thảo dược muối.'
        },
        {
            id: 'p_4',
            name: 'Cầu Nam Hải & Biển 30/4',
            category: 'check-in',
            location: 'Resort Phương Nam, Cần Thạnh',
            image: 'Images/checkin-caunamhai.jpg',
            mapUrl: 'https://maps.google.com/maps?q=C%E1%BA%A7u+Nam+H%E1%BA%A3i+Ph%C6%B0%C6%A1ng+Nam+C%E1%BA%A7n+Gi%E1%BB%9D&t=&z=14&ie=UTF8&iwloc=&output=embed',
            description: 'Cây cầu gỗ vươn dài giữa biển khơi ngắm hoàng hôn vịnh Đồng Tranh tuyệt mỹ.'
        },
        {
            id: 'p_5',
            name: 'Chiến Khu Rừng Sác & Đảo Khỉ',
            category: 'lich-su',
            location: 'Đường Rừng Sác, Long Hòa',
            image: 'Images/chien-khu.jfif',
            mapUrl: 'https://maps.google.com/maps?q=Chi%E1%BA%BFn+khu+R%E1%BB%ABng+S%C3%A1c+C%E1%BA%A7n+Gi%E1%BB%9D&t=&z=14&ie=UTF8&iwloc=&output=embed',
            description: 'Khu căn cứ cách mạng anh hùng của Trung đoàn 10 Đặc công Rừng Sác và quần thể khỉ bán hoang dã.'
        },
        {
            id: 'p_6',
            name: 'Lăng Ông Thủy Tướng Cần Thạnh',
            category: 'lich-su',
            location: 'Thị trấn Cần Thạnh',
            image: 'Images/lichsu/1822.png',
            mapUrl: 'https://maps.google.com/maps?q=L%C4%83ng+%C3%94ng+Th%E1%BB%A7y+T%C6%B0%E1%BB%9Bng+C%E1%BA%A7n+Th%E1%BA%A1nh&t=&z=15&ie=UTF8&iwloc=&output=embed',
            description: 'Di tích tâm linh lưu giữ bộ xương cá voi khổng lồ 12m, cái nôi của Đại lễ Nghinh Ông Cần Giờ.'
        },
        {
            id: 'p_7',
            name: 'Đình Thần Dương Văn Hạnh',
            category: 'lich-su',
            location: 'Xã Lý Nhơn, Cần Giờ',
            image: 'Images/dinh-duong-van-hanh.jpg',
            mapUrl: 'https://maps.google.com/maps?q=%C4%90%C3%ACnh+th%E1%BA%A7n+D%C6%B0%C6%A1ng+V%C4%83n+H%E1%BA%A1nh+L%C3%BD+Nh%C6%A1n+C%E1%BA%A7n+Gi%E1%BB%9D&t=&z=15&ie=UTF8&iwloc=&output=embed',
            description: 'Đình thờ “Thần Không Đầu” – Di tích lịch sử cấp TP.HCM, thờ vị danh tướng trung liệt của phong trào Trương Định.'
        },
        {
            id: 'p_8',
            name: 'Nghĩa Trang Liệt Sĩ Rừng Sác',
            category: 'lich-su',
            location: 'Thị trấn Cần Thạnh, Cần Giờ',
            image: 'Images/nghia-trang-rung-sac.jpg',
            mapUrl: 'https://maps.google.com/maps?q=Ngh%C4%A9a+trang+li%E1%BB%87t+s%C4%A9+R%E1%BB%ABng+S%C3%A1c+C%E1%BA%A7n+Gi%E1%BB%9D&t=&z=15&ie=UTF8&iwloc=&output=embed',
            description: 'Nơi an nghỉ của hơn 1.221 phần mộ liệt sĩ đã chiến đấu và hy sinh tại chiến khu Rừng Sác qua hai cuộc kháng chiến.'
        },
        {
            id: 'p_9',
            name: 'Đền Thờ Anh Hùng Liệt Sĩ Rừng Sác',
            category: 'lich-su',
            location: 'Đường Lương Văn Nho, Cần Thạnh',
            image: 'Images/den-tho-liet-si.jpg',
            mapUrl: 'https://maps.google.com/maps?q=%C4%90%E1%BB%81n+th%E1%BB%9D+Anh+h%C3%B9ng+li%E1%BB%87t+s%C4%A9+R%E1%BB%ABng+S%C3%A1c+C%E1%BA%A7n+Gi%E1%BB%9D&t=&z=15&ie=UTF8&iwloc=&output=embed',
            description: 'Công trình khánh thành tháng 7/2024 cạnh nghĩa trang trên đường Lương Văn Nho, thờ tự và ghi danh các chiến sĩ đặc công Rừng Sác.'
        }
    ],
    foods: [
        {
            id: 'f_1',
            name: 'Đại Tiệc Hải Sản Chợ Hàng Dương',
            price: 'Từ 150.000đ - 450.000đ/kg',
            image: 'Images/amthuc-hangduong.jpg',
            description: 'Cua ghẹ tươi rói, tôm tít nướng, ốc hương sốt bơ tỏi chế biến nóng sốt ăn liền tại chỗ.'
        },
        {
            id: 'f_2',
            name: 'Dừa Nước Cần Giờ Đá Đường',
            price: '25.000đ - 35.000đ/ly',
            image: 'Images/amthuc-duanuoc.jpg',
            description: 'Cơm dừa nước dẻo dai bùi béo nấu đường phèn thanh mát giúp giải nhiệt xua tan oi ả.'
        },
        {
            id: 'f_3',
            name: 'Cá Dứa Một Nắng Cần Giờ',
            price: '380.000đ - 550.000đ/kg',
            image: 'Images/amthuc-cadua.jpg',
            description: 'Cá dứa thiên nhiên phơi đúng một mẻ nắng vàng ươm, chiên giòn ăn kèm cơm cháy mắm me.'
        },
        {
            id: 'f_4',
            name: 'Canh Chua Cá Ngát Nấu Trái Bần',
            price: '180.000đ/thố lớn',
            image: 'Images/amthuc-canhchua.jpg',
            description: 'Vị chua thanh tao của bần rừng chín hòa quyện cùng vị ngọt béo của cá ngát sông Lòng Tàu.'
        },
        {
            id: 'f_5',
            name: 'Xoài Cát Cần Giờ',
            price: '60.000đ - 90.000đ/kg',
            image: 'Images/amthuc-xoaicat.jpg',
            description: 'Trái ngọt giồng cát mặn, hương thơm đậm đà, vị ngọt đậm sâu tiến vua.'
        },
        {
            id: 'f_6',
            name: 'Nghêu Bãi Bồi Hấp Sả Ớt',
            price: '80.000đ - 120.000đ/tô',
            image: 'Images/amthuc-ngheu.jpg',
            description: 'Nghêu bãi triều Long Hòa thịt dày ngập nước ngọt tự nhiên thơm nồng mùi sả cay.'
        }
    ],
    articles: [
        {
            id: 'a_1',
            title: 'Kinh Nghiệm Khám Phá Rừng Ngập Mặn Cần Giờ Từ A Đến Z',
            author: 'Ban Biên Tập Du Lịch Cần Giờ',
            date: '18/11/2026',
            image: 'Images/la-phoi-xanh.jfif',
            summary: 'Tất tần tật phương tiện di chuyển qua phà Bình Khánh, lộ trình săn ảnh đẹp và địa điểm ăn uống ngon bổ rẻ.'
        },
        {
            id: 'a_2',
            title: 'Sự Tích Tục Thờ Cá Ông & Lễ Hội Nghinh Ông Miền Biển',
            author: 'Nguyễn Văn Hùng (Nhà Nghiên Cứu Văn Hóa)',
            date: '15/11/2026',
            image: 'Images/pha/thanhan.jpg',
            summary: 'Khám phá ý nghĩa tâm linh của vị phúc thần bảo hộ ngư dân bám biển qua hàng trăm năm lịch sử Cần Giờ.'
        },
        {
            id: 'a_3',
            title: 'Hành Trình Chèo SUP Chiều Tà: Liều Thuốc Chữa Lành Tâm Hồn',
            author: 'Thu Thảo (Traveler)',
            date: '12/11/2026',
            image: 'Images/cheo-sup.jpg',
            summary: 'Lướt nhẹ mái chèo giữa những tán đước tĩnh lặng, ngắm từng đàn cò trắng rợp bóng hoàng hôn.'
        }
    ],
    reviews: [
        {
            id: 'r_1',
            userName: 'Trần Minh Tuấn',
            rating: 5,
            placeName: 'Khu Du Lịch Sinh Thái Vàm Sát',
            date: '16/11/2026',
            comment: 'Cần Giờ không ồn ào vội vã như phố thị. Trải nghiệm chèo thuyền nan ngắm Đầm Dơi và leo tháp Tang Bồng ngắm biển rừng xanh ngút ngàn thật sự tuyệt vời!',
            avatar: '👨‍💼'
        },
        {
            id: 'r_2',
            userName: 'Gia đình Chị Thu Hà',
            rating: 5,
            placeName: 'Chợ Hàng Dương & Cầu Nam Hải',
            date: '15/11/2026',
            comment: 'Hải sản ở Chợ Hàng Dương tươi roi rói, ăn ngay tại chỗ rất ngọt thịt. Buổi chiều dắt hai bé ra cầu Nam Hải chụp ảnh rất đẹp và mát mẻ.',
            avatar: '👩‍👧‍👦'
        },
        {
            id: 'r_3',
            userName: 'Lê Thanh (Blogger)',
            rating: 5,
            placeName: 'Ấp Đảo Thiềng Liềng',
            date: '14/11/2026',
            comment: 'Thiềng Liềng tĩnh lặng như tách biệt khỏi thế giới hiện đại. Đạp xe quanh ruộng muối trắng và ngâm chân thảo dược muối Cần Giờ là kỷ niệm khó quên.',
            avatar: '🎒'
        }
    ]
};

// Khởi tạo cơ sở dữ liệu nếu chưa có
function initDatabase() {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_DATA.users));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PLACES)) {
        localStorage.setItem(STORAGE_KEYS.PLACES, JSON.stringify(DEFAULT_DATA.places));
    } else {
        // Tự động đồng bộ các địa điểm mới bổ sung
        try {
            const storedPlaces = JSON.parse(localStorage.getItem(STORAGE_KEYS.PLACES) || '[]');
            let hasNew = false;
            DEFAULT_DATA.places.forEach(dp => {
                if (!storedPlaces.some(sp => sp.id === dp.id)) {
                    storedPlaces.push(dp);
                    hasNew = true;
                }
            });
            if (hasNew) {
                localStorage.setItem(STORAGE_KEYS.PLACES, JSON.stringify(storedPlaces));
            }
        } catch (e) {
            localStorage.setItem(STORAGE_KEYS.PLACES, JSON.stringify(DEFAULT_DATA.places));
        }
    }
    if (!localStorage.getItem(STORAGE_KEYS.FOODS)) {
        localStorage.setItem(STORAGE_KEYS.FOODS, JSON.stringify(DEFAULT_DATA.foods));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ARTICLES)) {
        localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(DEFAULT_DATA.articles));
    }
    if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
        localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(DEFAULT_DATA.reviews));
    }
}

initDatabase();

// Module Quản Lý Dữ Liệu
const Store = {
    // --- Auth Management ---
    getCurrentUser() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER));
        } catch {
            return null;
        }
    },
    getUsers() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    },
    login(username, password) {
        const users = this.getUsers();
        const user = users.find(u => u.username === username.trim() && u.password === password.trim());
        if (user) {
            const sessionUser = { id: user.id, username: user.username, fullName: user.fullName, role: user.role, email: user.email };
            localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(sessionUser));
            return { success: true, user: sessionUser };
        }
        return { success: false, message: 'Sai tên đăng nhập hoặc mật khẩu!' };
    },
    logout() {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
        window.location.reload();
    },
    register(fullName, username, password, email) {
        const users = this.getUsers();
        if (users.some(u => u.username === username.trim())) {
            return { success: false, message: 'Tên đăng nhập đã tồn tại!' };
        }
        const newUser = {
            id: 'u_' + Date.now(),
            username: username.trim(),
            password: password.trim(),
            fullName: fullName.trim(),
            email: email ? email.trim() : '',
            role: 'user'
        };
        users.push(newUser);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
        // Auto login
        const sessionUser = { id: newUser.id, username: newUser.username, fullName: newUser.fullName, role: newUser.role, email: newUser.email };
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(sessionUser));
        return { success: true, user: sessionUser };
    },

    // --- Places CRUD ---
    getPlaces() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.PLACES) || '[]');
    },
    savePlace(place) {
        const places = this.getPlaces();
        if (place.id) {
            const index = places.findIndex(p => p.id === place.id);
            if (index !== -1) places[index] = { ...places[index], ...place };
        } else {
            place.id = 'p_' + Date.now();
            places.unshift(place);
        }
        localStorage.setItem(STORAGE_KEYS.PLACES, JSON.stringify(places));
        return place;
    },
    deletePlace(id) {
        let places = this.getPlaces();
        places = places.filter(p => p.id !== id);
        localStorage.setItem(STORAGE_KEYS.PLACES, JSON.stringify(places));
    },

    // --- Foods CRUD ---
    getFoods() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.FOODS) || '[]');
    },
    saveFood(food) {
        const foods = this.getFoods();
        if (food.id) {
            const index = foods.findIndex(f => f.id === food.id);
            if (index !== -1) foods[index] = { ...foods[index], ...food };
        } else {
            food.id = 'f_' + Date.now();
            foods.unshift(food);
        }
        localStorage.setItem(STORAGE_KEYS.FOODS, JSON.stringify(foods));
        return food;
    },
    deleteFood(id) {
        let foods = this.getFoods();
        foods = foods.filter(f => f.id !== id);
        localStorage.setItem(STORAGE_KEYS.FOODS, JSON.stringify(foods));
    },

    // --- Articles CRUD ---
    getArticles() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.ARTICLES) || '[]');
    },
    saveArticle(article) {
        const articles = this.getArticles();
        if (article.id) {
            const index = articles.findIndex(a => a.id === article.id);
            if (index !== -1) articles[index] = { ...articles[index], ...article };
        } else {
            article.id = 'a_' + Date.now();
            article.date = new Date().toLocaleDateString('vi-VN');
            articles.unshift(article);
        }
        localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
        return article;
    },
    deleteArticle(id) {
        let articles = this.getArticles();
        articles = articles.filter(a => a.id !== id);
        localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
    },

    // --- Reviews CRUD ---
    getReviews() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS) || '[]');
    },
    addReview(review) {
        const reviews = this.getReviews();
        review.id = 'r_' + Date.now();
        review.date = new Date().toLocaleDateString('vi-VN');
        review.avatar = '🌿';
        reviews.unshift(review);
        localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
        return review;
    },
    deleteReview(id) {
        let reviews = this.getReviews();
        reviews = reviews.filter(r => r.id !== id);
        localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    },

    // --- Analytics ---
    getStats() {
        return {
            totalPlaces: this.getPlaces().length,
            totalFoods: this.getFoods().length,
            totalArticles: this.getArticles().length,
            totalReviews: this.getReviews().length,
            totalUsers: this.getUsers().length
        };
    }
};

window.Store = Store;

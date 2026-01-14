# Sorting-Algorithm-Visualizer
# 📊 Sorting Algorithm Visualizer

Một ứng dụng web trực quan hóa các thuật toán sắp xếp cơ bản, giúp người học hiểu rõ cách thức hoạt động của từng thuật toán thông qua hình ảnh và chuyển động thời gian thực.

![GitHub repo size](https://img.shields.io/github/repo-size/vuthanh291204/Sorting-Algorithm-Visualizer)
![GitHub last commit](https://img.shields.io/github/last-commit/vuthanh291204/Sorting-Algorithm-Visualizer)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🌐 Demo Trực Tuyến
Bạn có thể xem dự án đang chạy tại đây: 
👉 [https://vuthanh291204.github.io/Sorting-Algorithm-Visualizer/](https://vuthanh291204.github.io/Sorting-Algorithm-Visualizer/)

## 🚀 Tính Năng Chính
- **Trực quan hóa sinh động:** Xem các thanh dữ liệu di chuyển, đổi màu khi so sánh và hoán đổi.
- **Đa dạng thuật toán:** Hỗ trợ Bubble Sort, Selection Sort, Insertion Sort, Quick Sort, Merge Sort và Radix Sort.
- **Tùy chỉnh linh hoạt:**
  - Thay đổi kích thước mảng (số lượng cột).
  - Điều chỉnh tốc độ mô phỏng (Delay).
  - Tạo mảng ngẫu nhiên mới chỉ với một click.
- **Hiển thị giá trị:** Mỗi thanh bar đều đi kèm nhãn số để dễ dàng theo dõi logic sắp xếp.

## 🛠 Công Nghệ Sử Dụng
- **HTML5:** Cấu trúc giao diện và các thành phần DOM.
- **CSS3:** Tạo hình các thanh bar, hiệu ứng chuyển động và thiết kế Responsive.
- **JavaScript (ES6+):** Xử lý logic thuật toán sắp xếp và điều khiển hoạt động của UI.
- **GitHub Pages:** Triển khai (Deploy) dự án lên môi trường Internet.

## 📂 Cấu Trúc Thư Mục
```text
Sorting-Algorithm-Visualizer/
├── index.html          # File giao diện chính
├── style.css           # Định dạng giao diện và màu sắc
├── main.js             # Khởi tạo mảng và điều khiển sự kiện UI
├── algorithms.js       # Chứa logic các thuật toán sắp xếp (Async/Await)
└── helper.js           # Các hàm bổ trợ (Swap, SetColor, UpdateBar)

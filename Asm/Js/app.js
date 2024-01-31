
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function alertMessage(message, type) {
    var ThongBaoElement = document.querySelector('#ThongBao');
    var Message = document.getElementById('Message');
    if (type != 'success')
        Message.classList.remove("bg-success");
    else
        Message.classList.remove("bg-danger");
    var toast = new bootstrap.Toast(ThongBaoElement);
    if (type == 'success') {
        Message.classList.add("bg-success");
        Message.innerHTML = '<i class="fa-solid fa-circle-check"></i>&nbsp;' + message;
    }
    else if (type == 'danger') {
        Message.classList.add("bg-danger");
        Message.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>&nbsp;' + message;
    }

    toast.show();
}

function formatCount(count) {
    if (count < 1000) {
        return count.toString(); 
    } else {
        return (count / 1000).toFixed(2) + 'k'; 
    }
}


// var TenArray = [
//     "Gạo ST25", "Đường Cát Trắng", "Dầu Ăn Tinh Luyện", 
//     "Bánh Quy Ngũ Cốc", "Sữa Tươi Không Đường", "Nước Giải Khát", 
//     "Thực Phẩm Đóng Hộp", "Hạt Điều Rang Muối", "Gia Vị Nấu Ăn", 
//     "Mì Gói Cao Cấp"
// ]

// function generateRandomProducts() {
//     let products = [];
//     for (let i = 0; i < 10; i++) {
//         products.push({
//             id: crypto.randomUUID(),
//             name: TenArray[i],
//             img: 'image/menu12.png',
//             price: Math.floor(Math.random() * 1000000) + 1000,
//             count: Math.floor(Math.random() * 5000),
//             soldCount: Math.floor(Math.random() * 5000),
//             reviewCount: Math.floor(Math.random() * 5000),
//             datePosted: new Date(+(new Date()) - Math.floor(Math.random() * 100000000000)).toLocaleDateString('vi-VN'),
//             danhmuc: "BachHoaOnline"
//         });
//     }
//     return products;
// }

// console.log(JSON.stringify(generateRandomProducts(), null, 4));
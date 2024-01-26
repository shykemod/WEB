
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

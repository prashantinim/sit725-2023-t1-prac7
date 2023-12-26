const addCards = (items) => {
    items.forEach(item => {
        // Default values for null items
        const defaultImagePath = '/path/to/default/image.jpg'; // Default image path
        const defaultText = 'Not available'; // Default text for null values

        let itemToAppend = '<div class="col s12 center-align">' +
            '<div class="card medium"><div class="card-image waves-effect waves-block waves-light">' +
            `<img class="activator" src="${item.path || defaultImagePath}">` +
            '</div><div class="card-content">' +
            `<span class="card-title activator grey-text text-darken-4">${item.title || defaultText}<i class="material-icons right">more_vert</i></span>` +
            `<p><a href="#">${item.link || defaultText}</a></p></div>` +
            '<div class="card-reveal">' +
            `<span class="card-title grey-text text-darken-4">${item.subTitle || defaultText}<i class="material-icons right">close</i></span>` +
            `<p class="card-text">${item.description || defaultText}</p>` +
            '</div></div></div>';

        $("#card-section").append(itemToAppend);
    });
}

const formSumitted = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.path = $('#path').val();
    formData.subTitle = $('#subTitle').val();
    formData.description = $('#description').val();

    console.log(formData);
    postSwiss(formData);
}

function postSwiss(swiss) {
    $.ajax({
        url: '/api/swiss',
        type: 'POST',
        data: swiss,
        success: (result, status, xhr) => {
            if (xhr.status === 201) {
                alert('Swiss posted');
                location.reload();
            }
        },
        error: (xhr, status, error) => {
            alert("Error posting data: " + xhr.responseText);
        }
    });
}



function getAllSwiss() {
    $.get('/api/swiss',(result)=>{
        if (result.statusCode === 200) {
            addCards(result.data);
        }
    });
}

let socket = io();

socket.on('chat message', function(msg){
    $('#chat-box').append($('<div>').text(msg));
});

socket.on('bot message', function(msg){
    $('#chat-box').append($('<div class="bot">').text(msg));
});

$('#send-message').click(function(){
    let message = $('#chat-input').val();
    socket.emit('chat message', message);
    $('#chat-input').val('');
    return false;
});



$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#formSubmit').click(()=>{
        formSumitted();
    });
    $('.modal').modal();
    getAllSwiss();
    console.log('ready');
});
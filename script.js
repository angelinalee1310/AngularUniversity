var form = document.querySelector('.form')
var validateBtn = form.querySelector('.Btn')

var from = form.querySelector('.email_comment')
var text = form.querySelector('.textarea')

var error_email = document.getElementById("error_email")
var error_message = document.getElementById("error_message")
var error_radio = document.getElementById("error_radio")

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function isValidate() {
    let coin = true
    //валидация почты
    const email = from.value
    error_email.innerHTML= "";
    if (!validateEmail(email)) {
        error_email.innerHTML = email + " is not valid "
        error_email.style.color = "red"
        coin = false
    }
    //валидация сообщения
    error_message.innerHTML= "";
    let valueText = document.getElementById("textarea").value
    if (valueText.length < 3){
        error_message.innerHTML = "Comment should be at least 3 characters"
        error_message.style.color = 'red'
        coin = false
    }
    if (valueText.length > 100){
        error_message.innerHTML = "Comment should be no more than 100 characters"
        error_message.style.color = 'red'
        coin = false
    }
    //валидация оценки
    error_radio.innerHTML= "";
    if(!checkIt()){
        error_radio.innerHTML = "Assesment is mandatory"
        error_radio.style.color = 'red'
        coin = false
    }
    return coin;
}

var index = 1;
form.addEventListener('submit', function (event) {
    event.preventDefault()

    console.log('clicked on button')
    //вызов функции для проверки на валидацию почты и сообщения
    if(isValidate()){
        //будем добавлять
        createComment(index++, from.value, text.value, checkIt(), getDate())
        console.log(from.value)
        console.log(text.value)
        console.log(checkIt())
        console.log(getDate())
    }

    Clear()
})

var theGroup = document.theForm.g;
//очищает поля и радио после нажатия на кнопку
function Clear(){
    from.value=""
    text.value=""
    for (i=0; i< theGroup.length; i++) {
        theGroup[i].checked = false
    }
}
//для даты
function getDate()
{
    var today=new Date();
    return today.toLocaleString()+"\n";
}
//для поиска занчения в радио / если ничего не найдено значит ошибка
function checkIt() {
    for (i=0; i< theGroup.length; i++) {
        if (theGroup[i].checked) {
            return theGroup[i].value
            break
        }
    }
    return false
}

//--------------
function createComment(index, first, second, third, fourth){
    var list = document.getElementById("list_comments");
    var newComment = document.createElement("div");
    var n = document.createElement("h6");
    var title = document.createElement("h4");
    var comm = document.createElement("p");
    var asses = document.createElement("h6");
    var date = document.createElement("h6");
    list.appendChild(newComment);
    newComment.appendChild(n);
    newComment.appendChild(title);
    newComment.appendChild(comm);
    newComment.appendChild(asses);
    newComment.appendChild(date);
    newComment.className = "comment"
    n.className = "date_comment"
    title.className = "title_comment"
    comm.className = "text_comment"
    asses.className = "asses_comment"
    date.className = "date_comment"
    title.innerHTML = first
    comm.innerHTML = second
    asses.innerHTML = third
    date.innerHTML = fourth
    n.innerHTML = index
}
const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');

const expresions = {
    lastName: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, números, guión y guión bajo.
    userName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 dígitos.
    mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    phoneNumber: /^\d{7,14}$/ // 7 a 14 números.
}

const fields = {
    lastName: false,
    userName: false,
    password: false,
    mail: false,
    phoneNumber: false
}

const validForm = (e) => {
    switch (e.target.name) {
        case "lastName":
            validField(expresions.lastName, e.target, 'lastName');
        break;
        case "userName":
            validField(expresions.userName, e.target, 'userName');
        break;
        case "password":
            validField(expresions.password, e.target, 'password');
            validPassword2();
        break;
        case "password2":
            validPassword2();
        break;
        case "mail":
            validField(expresions.mail, e.target, 'mail');
        break;
        case "phoneNumber":
            validField(expresions.phoneNumber, e.target, 'phoneNumber');
        break;
    }
}

const validField = (expresion, input, field) => {
    if(expresion.test(input.value)) {
        document.getElementById(`${field}-group`).classList.remove('formGroup-incorrect');
        document.getElementById(`${field}-group`).classList.add('formGroup-correct');
        document.querySelector(`#${field}-group .formInput-error`).classList.remove('formInput-error-activate');
        fields[field] = true;
    } else {
        document.getElementById(`${field}-group`).classList.add('formGroup-incorrect');
        document.getElementById(`${field}-group`).classList.remove('formGroup-correct');
        document.querySelector(`#${field}-group .formInput-error`).classList.add('formInput-error-activate');
        fields[field] = false;
    }
}

const validPassword2 = () => {
    const inputPassword1 = document.getElementById('password');
    const inputPassword2 = document.getElementById('password2');

    if(inputPassword1 == "") {
        document.getElementById(`password2-group`).classList.remove('formGroup-incorrect');
    }

    if(inputPassword1.value !== inputPassword2.value) {
        document.getElementById(`password2-group`).classList.add('formGroup-incorrect');
        document.getElementById(`password2-group`).classList.remove('formGroup-correct');
        document.querySelector(`#password2-group .formInput-error`).classList.add('formInput-error-activate');
        fields['password'] = false;
    } else {
        document.getElementById(`password2-group`).classList.remove('formGroup-incorrect');
        document.getElementById(`password2-group`).classList.add('formGroup-correct');
        document.querySelector(`#password2-group .formInput-error`).classList.remove('formInput-error-activate');
        fields['password'] = true;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validForm);
    input.addEventListener('blur', validForm);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const terms = document.getElementById('terms');
    if(fields.userName && fields.userName && fields.password && fields.mail && fields.phoneNumber && terms.checked) {
        form.reset();

        document.getElementById('formSuccessMessage').classList.add('formSuccessMessage-activate');
        setTimeout(() => {
            document.getElementById('formSuccessMessage').classList.remove('formSuccessMessage-activate');
        }, 5000);

        document.querySelectorAll('.formGroup-correct').forEach((icon) => {
            icon.classList.remove('formGroup-correct');
        });
    } else {
        document.getElementById('formMessage').classList.add('formMessage-activate');
    }
});
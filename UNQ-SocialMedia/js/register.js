/**
 * @type {HTMLInputElement}
 */
const usernameElement = document.getElementById("username-input");
/**
 * @type {HTMLInputElement}
 */
const passwordElement = document.getElementById("password-input");
/**
 * @type {HTMLInputElement}
 */
const emailElement = document.getElementById("email-input");
/**
 * @type {HTMLButtonElement}
 */
const registerBtn = document.getElementById("register-btn");


//#region FUNCTIONS DEFINITION

/**
 * 
 * @param {string} mail 
 * @returns {HTMLParagraphElement|null}
 */
function emailVerification(mail){
    if(mail.lenght <12 || !mail.endsWith("@uvq.edu.ar")){
        const mailError = document.getElementById("mailError");
        mailError.textContent = "Email no valido";
        return mailError;
    }

    return null;
}

/**
 * 
 * @param {string} username 
 * @returns {HTMLParagraphElement|null}
 */
function usernameVerification(username){
    if(username.lenght < 5){
        const userError = document.getElementById("userError");
        userError.textContent = "Usuario invalido";
        return userError;
    }

    return null;
}

/**
 * 
 * @param {string} password 
 * 
 * @returns {HTMLParagraphElement|null}
 */
function passwordVerification(password){
    if(password.length < 8){
        const passError = document.getElementById("passError");
        passError.textContent = "Contraseña muy corta";
        return passError;
    }
    return null;
}

function register(){
    emailVerification(emailElement.value);
    passwordVerification(passwordElement.value);
    usernameVerification(usernameElement.value);
}

//#endregion



const accion = (evento) => {
    evento.preventDefault();
}

registerBtn.addEventListener("click", (ev) => {
    event.preventDefault();
    register();
})
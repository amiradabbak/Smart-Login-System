
var signupName = document.getElementById('signupName')
var signupEmail = document.getElementById('signupEmail')
var signupPassword = document.getElementById('signupPassword')
var signinEmail = document.getElementById('signinEmail')
var signinPassword = document.getElementById('signinPassword')


var nameRegex = /^\w{3,}$/;
var emailRegex =  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

var username = localStorage.getItem('sessionUsername')
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username
}

var signUpArray = []
if (localStorage.getItem('users') == null) {
    signUpArray = []
} else {
    signUpArray = JSON.parse(localStorage.getItem('users'))
}




function isEmpty() {

    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        return false
    } else {
        return true
    }
}





function isEmailExist() {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return false
        }
    }
}





function signUp() {
    if(validate(signupName,nameRegex)&&
      validate(signupEmail,emailRegex)&&
      validate(signupPassword,passwordRegex)){
        console.log("efkmm")
            if (isEmpty() == false) {
                document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
                return false
            }


            
            var signUp = {
                name: signupName.value,
                email: signupEmail.value,
                password: signupPassword.value,
            }
            if (signUpArray.length == 0) {
                signUpArray.push(signUp)
                localStorage.setItem('users', JSON.stringify(signUpArray))
                document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
                return true
            }
            if (isEmailExist() == false) {
                document.getElementById('exist').innerHTML = '<span class="text-danger m-3">email already exists</span>'

            } else {
                signUpArray.push(signUp)
                localStorage.setItem('users', JSON.stringify(signUpArray))
                document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'

            }

    }
    


}



function isLoginEmpty() {

    if (signinPassword.value == "" || signinEmail.value == "") {
        return false
    } else {
        return true
    }
}

function login() {
    if(
      validate(signinEmail,emailRegex)&&
      validate(signinPassword,passwordRegex)){
    if (isLoginEmpty() == false) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    var password = signinPassword.value
    var email = signinEmail.value

    for (var i = 0; i < signUpArray.length; i++) {

        if (signUpArray[i].email.toLowerCase() == email.toLowerCase() && signUpArray[i].password.toLowerCase() == password.toLowerCase()) {
            localStorage.setItem('sessionUsername', signUpArray[i].name)
        
                location.replace('home.html')

            break
        } else {
            document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
        }
    }
}

}



function logout() {
    localStorage.removeItem('sessionUsername')
}

function validate(element, regex) {

    if (regex.test(element.value)) {
      element.classList.add("is-valid");
      element.classList.remove("is-invalid");
      element.nextElementSibling.classList.add("d-none")
      return true
    } else {
      element.classList.add("is-invalid");
      element.classList.remove("is-valid");
      element.nextElementSibling.classList.remove("d-none")
      return false
    }
  }
  
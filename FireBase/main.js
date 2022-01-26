signup()
login()

function signup(){
    const signupForm = document.querySelector('#signup-form');
    //crear cuenta en firebase Email y contraseña
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const signupEmail = document.getElementById('signup-email').value;
        const signupPassword = document.getElementById('signup-password').value;

        auth
            .createUserWithEmailAndPassword( signupEmail, signupPassword)
            .then((userCredential) => {
                // Signed in
                //clear form
                signupForm.reset();
                // close the modal
                $('#signupModal').modal('hide');
                $('.modal-backdrop.fade.show').addClass('d-none');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                // ..
            });
    });
}

function login(){
    const loginForm = document.querySelector('#login-form');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const loginEmail = document.getElementById('login-email').value;
        const loginPassword = document.getElementById('login-password').value;

        auth
            .signInWithEmailAndPassword( loginEmail, loginPassword)
            .then((userCredential) => {
                // Signed in
                //clear form
                loginForm.reset();
                // close the modal
                $('#loginModal').modal('hide');
                $('.modal-backdrop.fade.show').addClass('d-none');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                // ..
            });
    })
}
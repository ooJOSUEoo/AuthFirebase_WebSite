//Auth
signup()
login()
logout()

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

function logout(){
    const logout = document.getElementById('logout');

    logout.addEventListener('click', (e) => {
        e.preventDefault();

        auth.signOut()
            .then(() => {
                // Sign-out successful.
                console.log('Sesión cerrada');
            })
            .catch((error) => {
                // An error happened.
                console.log(error);
            });
    })
}

//------------------------------------------------------------------

//firestore
getPost();

//post

function getPost(){
    const postList = document.getElementById('posts')
    const setupPosts = data => {
        if(data.length){
            let html = '';
            data.forEach(doc => {
                const post = doc.data();
                const li = `
                    <li class"list-group-item list-group-item-action">
                        <div class="card card-body mb-3">
                            <h4>${post.title}</h4>
                            <small>${post.description}</small>
                        </div>
                    </li>
                `;
                html += li;
            });
            postList.innerHTML = html;
        }else{
            postList.innerHTML = `<p class="text-center">Logeate para ver las publicaciones</p>`;
        }
    }

    auth.onAuthStateChanged(user => {
        if(user){
            fs.collection('posts').get().then(snapshot => {
                setupPosts(snapshot.docs);
            })
        }else{
            setupPosts([]);
        }
    })
}
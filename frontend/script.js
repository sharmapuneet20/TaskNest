// toggle from signup to signIn vice versa
 

document.getElementById('show-signin').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('signup-container').style.display = 'none';
    document.getElementById('signin-container').style.display = 'block';
});

document.getElementById('show-signup').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('signin-container').style.display = 'none';
    document.getElementById('signup-container').style.display = 'block';
});


// functions

// signup function
async function signup() {
    try{
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    await axios.post("http://localhost:3000/user/signup",{
        username: username,
        password: password
    });
    alert("signed up successfully")
    
 } catch(error){
    alert("signup failed")
 }
}
//  signin function

 async function signin() {
    try{
    const username = document.getElementById('signin-username').value;
    const password = document.getElementById('signin-password').value;

  const response =   await axios.post("http://localhost:3000/user/signIn",{
        username: username,
        password: password
    });

    localStorage.setItem("token",response.data.token);
    alert("signed In successfully");
    
 } catch(error){
    alert("signIn failed")
 }}











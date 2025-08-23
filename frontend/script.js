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

function showLoader() {
  document.getElementById("loader").style.display = "flex";
}
function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

// signup function
async function signup() {
    showLoader();
    try{
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    await axios.post("http://localhost:3000/api/user/signup",{
        username: username,
        password: password
    });

    

    document.getElementById('signup-container').style.display = 'none';
    document.getElementById('todo-container').style.display = 'block';


    alert("signed up successfully")
    
 } catch (error) {
    if (error.response) {
      alert("Signup failed: " + error.response.data.message);
      console.error("Error details:", error.response.data);
    } else {
      alert("Signup failed: " + error.message);
      console.error("Error:", error);
    } }finally{
    hideLoader();
 }
}
//  signin function

 async function signin() {
    showLoader();
    try{
    const username = document.getElementById('signin-username').value;
    const password = document.getElementById('signin-password').value;

  const response =   await axios.post("http://localhost:3000/api/user/signIn",{
        username: username,
        password: password
    });

    localStorage.setItem("token",response.data.token);

    document.getElementById('signin-container').style.display = 'none';
    document.getElementById('todo-container').style.display = 'block';


    alert("signed In successfully");
    
 } catch(error){
    alert("signIn failed")
 }}











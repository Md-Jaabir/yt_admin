window.onload=function(){
  checkLoginandGetData('https://youtubechannelbackend.herokuapp.com/admin/admin_info','GET',onSuccess,()=>{
    // hideLoadingScreen();
    toast("You aren't signed in");
    location.href="./login.html";
  })
}

const onSuccess=(data)=>{
  setEverythingInPlace(data);
}

function setEverythingInPlace(data){
  let nameCont=document.getElementById("name");
  let userIdCont=document.getElementById("userid");
  let passwordCont=document.getElementById("password");
  nameCont.value=data.info.name;
  userIdCont.value=data.info.userId;
  passwordCont.value=data.info.password;
}

const handleAdminFormSubmission=(event)=>{
  event.preventDefault();
  let name=document.getElementById("name").value;
  let userId=document.getElementById("userid").value;
  let password=document.getElementById("password").value;
  if(!name || !userId || !password){
    toast("All fields are required");
    return;
  }
  showLoadingScreen();
  fetch("https://youtubechannelbackend.herokuapp.com/admin/update_info",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${getToken()}`
    },
    body:JSON.stringify({
      name,userId,password
    })
  }).then(res=>res.json())
  .then(data=>{
    location.href="./success.html?msg=Your data has been updated successfully. You can now login with the updated data &backpath=./index.html";
  }).catch(()=>{
     location.href="./error.html?msg=Your data hasn't been updated. Please check your internet connection&backpath=./index.html";
  })
}

document.querySelector(".update-admin-form").addEventListener("submit",handleAdminFormSubmission);


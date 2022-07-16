function login(userid,password){
  fetch("https://youtubechannelbackend.herokuapp.com/admin/login",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      userId:userid,
      password:password
    })
  }).then(res=>res.json()).then(data=>{
    if(data.message=="error"){
      // hideLoadingScreen();
      // setTimeout(()=>{
      //   location.reload();
      // },400);
      location.href="./error.html?msg=Invalid credentials. The login details that you provided were totally invalid. Please try again &backpath=./login.html";
      return;
    }
    const token=data.token;
    setCookie("token",token,1024);
    // hideLoadingScreen();
    location.href='./index.html';
  })
  .catch(()=>{
    toast("Network issue");
  })
}

function setCookie(name,value,expireDay){
  let currentDate=new Date();
  currentDate.setTime(currentDate.getTime()+expireDay*24*60*60*1000);
  let expireTime=currentDate.toUTCString();
  document.cookie=`${name}=${value};expires=${expireTime}`
}

document.querySelector('.login-form').addEventListener('submit',event=>{
  event.preventDefault();
  showLoadingScreen();
  let userid=document.getElementById("userid").value;
  let password=document.getElementById("password").value;
  login(userid,password);
})

window.onload=function(){
  showLoadingScreen();
  fetch("https://youtubechannelbackend.herokuapp.com/admin/admin_info",{
    method:"GET",
    headers:{
      "Authorization": `Bearer ${getToken()}`,
      "Content-Type":"application/json"
    }
  }).then(res=>res.json()).then(data=>{
    console.log(data);
    if(data.message=='success'){
      toast("You are already logged in");
      location.href='./index.html';
      // hideLoadingScreen();
    }else{
      hideLoadingScreen();
    }
  })
  .catch(err=>{
    toast("Network issue");
  })
}
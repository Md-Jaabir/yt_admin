window.onload=()=>{
  checkLoginandGetData("https://youtubechannelbackend.herokuapp.com/admin/contact_msgs","GET",onSuccess,()=>{
    toast("You aren't signed in");
    setTimeout(()=>{
      location.reload();
    },400);
    location.href="./login.html";
  })
}

const onSuccess=(data)=>{
  const id=location.search.replace("?","").split("&")[0].split("=")[1];
  const message=data.find((msg)=>{
    return msg._id==id;
  })
  if(!message){
    setTimeout(()=>{
      location.reload();
    },1000);
    location.href="./contacts.html";
    return;
  }
  setEverythingInPlace(message,id);
}

const setEverythingInPlace=(message,id)=>{
  document.getElementById("name").value=message.name;
  document.getElementById("email").value=message.email;
  document.getElementById("phone").value=message.phone;
  document.getElementById("desc").value=message.description;
  document.getElementById("deleteButton").addEventListener("click",()=>{
    deleteContact(id);
  })
}
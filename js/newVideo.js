firebaseInit();
let thumbnil;
checkLoginandGetData("https://youtubechannelbackend.herokuapp.com/admin/admin_info","GET",()=>{},()=>{
    toast("You aren't signed in");
    location.href="./login.html";
});

document.querySelector(".video-form").addEventListener("submit",handleVideoFormSubmit)

function handleVideoFormSubmit(event){
  event.preventDefault();
  let title=document.getElementById("title").value;
  let videoUrl=document.getElementById("videoUrl").value;
  console.log(videoUrl);
  console.log("hello from inside");
  if(!thumbnil || thumbnil.type.split("/")[0]!="image"){
    toast("You must upload the thumbnil and it must be an image");
    return;
  }

  if(!title || title.length<5){
    toast("You must write a title and it must contain at least 5 characters");
    return;
  }

  if(!videoUrl){
    toast("You must give a video url");
    return;
  }
  
  showLoadingScreen();
  setLoadingText("Uploading cover...")
  showLoadingScreen();
  uploadThumb(thumbnil,uploadSuccess);
}

function uploadSuccess(url){
  setLoadingText("Saving to server...");
  saveData(title,url,videoUrl);
}
  
function saveData(title,thumbUrl,videoUrl){
  console.log(title,thumbUrl,videoUrl);
  fetch("https://youtubechannelbackend.ibnchowdhury.repl.co/admin/add_video",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${getToken()}`
    },
    body:JSON.stringify({
      title:document.getElementById("title").value,
      thumbUrl,
      videoUrl:document.getElementById("videoUrl").value
      
    })
  })
  .then(res=>res.json())
  .then(data=>{
    console.log(data);
    location.href="./success.html?msg=Your video has been successfully uploaded &backpath=./videos.html";
    // hideLoadingScreen();
  })
  .catch(()=>{
    location.href="./error.html?msg=Your video hasn't been uploaded &backpath=./videos.html";
    // hideLoadingScreen();
  })
}

document.getElementById("thumbnil").addEventListener("click",()=>{
  showDialogue((file)=>{
    thumbnil=file;
    document.getElementById("file-name").innerHTML=file.name;
  });
});
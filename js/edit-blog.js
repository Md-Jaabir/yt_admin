firebaseInit();
let cover;
let defaultCover;
let id=location.search.replace("?","").split("&")[0].split("=")[1];
checkLoginandGetData("https://youtubechannelbackend.herokuapp.com/admin/admin_info","GET",()=>{
  showLoadingScreen();
  fetch(`https://youtubechannelbackend.herokuapp.com/user/blog_posts?_id=${id}`)
  .then(res=>res.json())
  .then(data=>{
    setEverythingInPlace(data[0]);
    hideLoadingScreen();
    defaultCover=data.coverImageUrl;
  })
},()=>{
  toast("You aren't signed in ");
  location.href="./login.html";
});

document.querySelector(".update-blog-form").addEventListener("submit",handleBlogUpdate);

function handleBlogUpdate(event){
  event.preventDefault();
  let title=document.getElementById("title").value;
  let content=document.getElementById("content").value;
  let date=new Date().toLocaleString();
  if(!title || title.length<5){
    toast("Title can't be empty and it must contain at least 5 charecters");
    return;
  }

  if(!content || content.split(" ").length<50){
    toast("Content can't be empty and it must contain at least 50 words");
    return;
  }
  showLoadingScreen();
  if(cover){
    setLoadingText("Updating image...")
    uploadCover(cover,(url)=>{
      setLoadingText("Saving data...");
      saveData(id,title,url,content,date);
    })
  }else{
    setLoadingText("Saving data...");
    saveData(id,title,defaultCover,content,date);
  }
}

function setEverythingInPlace(data){
  document.getElementById("title").innerHTML=data.title;
  document.getElementById("content").innerHTML=data.content;
  document.getElementById("cover").src=data.coverImageUrl;
}

function saveData(id,title,coverImageUrl,content,date){
  fetch("https://youtubechannelbackend.ibnchowdhury.repl.co/admin/update_blog",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${getToken()}`
    },
    body:JSON.stringify({
      id,
      title,
      coverImageUrl,
      content,
      date
    })
  })
  .then(res=>res.json())
  .then(data=>{
    console.log(data);
    location.href="./success.html?msg=Your blog has been successfully updated &backpath=./blogs.html";
    // hideLoadingScreen();
  })
  .catch(()=>{
    location.href="./error.html?msg=Your blog hasn't been updated &backpath=./blogs.html";
    // hideLoadingScreen();
  })
}

document.getElementById("upload-cover").addEventListener("click",()=>{
  showDialogue((file)=>{
    cover=file;
    document.getElementById("file-name").innerHTML=file.name;
  });
});

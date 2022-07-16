firebaseInit();
let cover;
checkLoginandGetData("https://youtubechannelbackend.herokuapp.com/admin/admin_info","GET",onSuccess,()=>{
    toast("You aren't signed in");
    location.href="./login.html";
});

function onSuccess(){
  
}

document.querySelector(".blog-form").addEventListener("submit",handleBlogFormSubmit)

function handleBlogFormSubmit(event){
  event.preventDefault();
  let title=document.getElementById("heading").value;
  let content=document.getElementById("content").value;
  let date=new Date().toLocaleDateString();
  if(!cover || cover.type.split("/")[0]!="image"){
    toast("You must upload the cover and it must be an image");
    return;
  }

  if(!title || title.length<5){
    toast("You must write a title and it must contain at least 5 characters");
    return;
  }

  if(!content || content.split(" ").length<50){
    toast("You must write a content and it must contain at least 50 words");
    return;
  }
  setLoadingText("Uploading cover...")
  showLoadingScreen();
  uploadCover(cover,uploadSuccess);

  function uploadSuccess(url){
    setLoadingText("Saving to server...");
    const currentBlog=new blog(title,url,content,date);
    currentBlog.saveToServer();
  }
}

document.getElementById("cover").addEventListener("click",()=>{
  showDialogue((file)=>{
    cover=file;
    document.getElementById("filename").innerText=file.name;
  })
})
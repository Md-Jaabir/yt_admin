let commentForm=document.querySelector("#comment_form");
let comment_cont=document.querySelector(".comments .all");
let blogId=location.search.replace("?","").split("&")[0].split("=")[1];
let video_cont=document.querySelector(".videos");
let adminName;

checkLoginandGetData("https://youtubechannelbackend.herokuapp.com/admin/admin_info","GET",ifSuccess,()=>{
    toast("You aren't signed in");
    location.href="./login.html";
});

showLoadingScreen()
fetch(`https://youtubechannelbackend.herokuapp.com/user/blog_posts?_id=${blogId}`)
.then(res=>res.json())
.then(blogs=>{
  setEverythingInPlace(blogs[0]);
  hideLoadingScreen();
})
.catch((err)=>{
  console.log(err);
  toast("Network problem");
  hideLoadingScreen();
});

function setEverythingInPlace(blog){
  document.getElementById("cover").src=blog.coverImageUrl;
  document.getElementById("heading").innerHTML=blog.title+`<span id="date" class="text-gray-300 ml-10 text-sm font-regular">${blog.date}</span>`;
  document.getElementById("content").innerHTML=blog.content;
}

commentForm.addEventListener("submit",(event)=>{
  event.preventDefault();
  showLoadingScreen();
  

  checkLoginandGetData("https://youtubechannelbackend.herokuapp.com/admin/admin_info","GET",onSuccess,()=>{
    toast("You aren't signed in");
    location.href="./login.html";
  });
  
});
showLoadingScreen();

fetch(`https://youtubechannelbackend.herokuapp.com/user/comments?blogId=${blogId}`)
.then(res=>res.json())
.then(comments=>{
  console.log(comments);
  appendComments(comments);
  hideLoadingScreen();
})
.catch(err=>{
  toast('Network issue');
  hideLoadingScreen();
});

function onSuccess(){
  showLoadingScreen();
  let desc=document.getElementById("desc").value;
  let blogid=blogId;
  let date=new Date().toLocaleDateString();

  if(!adminName){
    toast("You may not logged in");
    hideLoadingScreen();
    return;
  }

  if(!blogid){
    toast("Blog id is a must");
    hideLoadingScreen();
    return;
  }

  if(!date){
    toast("Date is a must");
    hideLoadingScreen();
    return;
  }
  
  if(desc.length<30){
    toast("Description is too short");
    hideLoadingScreen();
    return;
  }
  
  let comment=new blogComment(blogid,`${adminName} <span class='ml-1 rounded-xl bg-[#ff1f78] px-2 text-base text-white'>admin</span>`,desc,date);
  comment.saveToServer();
}

function ifSuccess(data){
  adminName=data.info.name;
}

function appendComments(comments){
  comments.forEach(comment=>{
    comment_cont.innerHTML+=`<div class="comment xl:w-[819px] w-[80vw] mt-10 md:mt-16 mx-10" >
          <div class="name-items flex w-full items-center">
            <div  class="first-letter font-bold h-12 w-12 text-3xl text-white bg-[#ff1f78] rounded-full flex justify-center items-center cursor-pointer"><h2 class="font-['Poppins']">${comment.name.substr(0,1).toUpperCase()}</h2></div><span class="ml-5 font-['Poppins'] font-bold text-xl">${comment.name}</span>
          </div>
          <div class="mt-3 rounded-sm p-4 bg-gray-200 font-['Poppins']">
            <span class="date text-gray-500">${comment.date}</span>
            <p class="mt-3">${comment.comment}</p>
          </div> 
        </div>`
  });
  document.querySelectorAll(".first-letter").forEach(element=>{
    element.addEventListener("click",()=>{
      toast(element.id);
      console.log(element.id);
    });
  });
}



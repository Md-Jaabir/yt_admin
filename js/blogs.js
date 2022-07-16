let blog_cont=document.querySelector(".blogs");
checkLoginandGetData("https://youtubechannelbackend.herokuapp.com/admin/admin_info","GET",onSuccess,()=>{
  toast("You aren't signed in");
  location.href="./login.html";
});

function onSuccess(){
  showLoadingScreen();
  fetch("https://youtubechannelbackend.herokuapp.com/user/blog_posts")
  .then(res=>res.json())
  .then(blogs=>{
    hideLoadingScreen();
    appendBlogs(blogs);
    document.querySelector(".add-btn").classList.remove("hidden");
  })
  .catch(()=>{
    hideLoadingScreen();
    toast("Network problem");
  });
}

function appendBlogs(blogs){
  blogs.forEach(blog=>{
    blog_cont.innerHTML+=`<div class="blog my-16 px-10 w-ful flex flex-col justify-center shadow-sm pb-7 rounded-md">
        <img class="h-44 x:h-52 sm:h-60 md:h-44" src="${blog.coverImageUrl}" alt="" class="blogCover">
        <h2 class="title text-xl font-['Poppins'] font-bold mt-5">${blog.title}</h2>
        <p class="mt-3">${blog.content.substr(0,100)}<span>...</span></p>
        <div class="options flex justify-between mt-5 px-7">
          <div class="view">
            <span class="w-fit material-symbols-outlined text-[#ff1f78] cursor-pointer"><a href="./blog.html?id=${blog._id}">visibility</a></span>
          </div>
          <div class="edit-delete flex w-20 justify-between">
            <span class="w-fit material-symbols-outlined text-[#ff1f78] cursor-pointer"><a href="./edit_blog.html?id=${blog._id}">edit</a></span>
            <span onclick="deleteBlog('${blog._id}')" class="w-fit material-symbols-outlined text-[#ff1f78] cursor-pointer">delete</span>
          </div>
        </div>
      </div>`;
  })
}


function deleteBlog(id){
  console.log(id);
  showLoadingScreen();
  fetch('https://youtubechannelbackend.herokuapp.com/admin/delete_blog',{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${getToken()}`
    },
    body:JSON.stringify({id})
  }).then(res=>res.json())
  .then(data=>{
    // hideLoadingScreen();
    if(data.message=='error'){
      toast("Unauthenticated users can't delete blogs");
      return;
    }
    whenDeleted();
  })
  .catch(()=>{
    hideLoadingScreen();
    toast("Network issue");
  })
}

function  whenDeleted(){
  location.href="./blogs.html";
}
checkLoginandGetData("https://youtubechannelbackend.herokuapp.com/admin/admin_info","GET",onSuccess,()=>{
  toast("You aren't signed in");
  setTimeout(()=>{
    location.reload();
  },400);
  location.href="./login.html";
})

let review_cont=document.querySelector(".reviews .all");
function onSuccess(data){
  fetch("https://youtubechannelbackend.herokuapp.com/user/riviews")
  .then(res=>res.json())
  .then(reviews=>{
    fetchReviews(reviews);
  })
  .catch(err=>{
    toast('Network issue');
  });
}


function fetchReviews(reviews){
  review_cont.innerHTML="";
  reviews.forEach(review=>{
    review_cont.innerHTML+=`<div class="review${review.stars} review xl:w-[819px] w-[80vw] mt-10 md:mt-16 mx-10" >
            <div class="name-items flex w-full items-center">
              <div class="first-letter cursor-pointer font-bold h-12 w-12 text-3xl text-white bg-[#ff1f78] rounded-full flex justify-center items-center" onclick=toast('${review.email}')><h2 class="font-['Poppins']">${review.name.substr(0,1).toUpperCase()}</h2></div><span class="ml-5 font-['Poppins'] font-bold text-xl">${review.name}</span>
            </div>
            <div class="mt-3 rounded-sm p-4 bg-gray-200 font-['Poppins']">
              <div class="stars flex">
                <span id="0" class="cursor-pointer text-[#ff1f78] material-symbols-outlined">${review.stars>=1?"star":"grade"}</span>
                <span id="1" class="cursor-pointer text-[#ff1f78] material-symbols-outlined">${review.stars>=2?"star":"grade"}</span>
                <span id="2" class="cursor-pointer text-[#ff1f78] material-symbols-outlined">${review.stars>=3?"star":"grade"}</span>
                <span id="3" class="cursor-pointer text-[#ff1f78] material-symbols-outlined">${review.stars>=4?"star":"grade"}</span>
                <span id="4" class="cursor-pointer text-[#ff1f78] material-symbols-outlined">${review.stars>=5?"star":"grade"}</span>
              </div>
              <p class="mt-3">${review.description}</p>
            </div> 
          </div>`
  })
}

function filterReviews(stars,element){
  document.querySelectorAll(`.review`).forEach(review=>{
    review.style.display="none";
  });
  if(!stars){
    document.querySelectorAll(".review").forEach(review=>{
      review.style.display="block";
    });
    document.querySelectorAll(".btn").forEach(btn=>{
      btn.classList.remove("text-white");
      btn.classList.remove("bg-[#ff1f78]");
    });
    element.classList.add("bg-[#ff1f78]");
    element.classList.add("text-white");
    return;
  }
  document.querySelectorAll(`.review${stars}`).forEach(review=>{
    review.style.display="block";
  });
  document.querySelectorAll(".btn").forEach(btn=>{
    btn.classList.remove("text-white");
    btn.classList.remove("bg-[#ff1f78]");
  });
  element.classList.add("bg-[#ff1f78]");
  element.classList.add("text-white");
}
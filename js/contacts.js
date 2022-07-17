window.onload=()=>{
  checkLoginandGetData("https://youtubechannelbackend.herokuapp.com/admin/contact_msgs","GET",onSuccess,()=>{
    toast("You aren't signed in");
    location.href="./login.html";
  })
}

const onSuccess=(data)=>{
  appendDataToHtml(data);
}

const appendDataToHtml=(data)=>{
  const contactCont=document.querySelector(".msgs");
  contactCont.innerHTML=data.map(message=>{
    return `<div onclick="redirect('./contact.html?id=${message._id}')" class="cursor-pointer msg hover:bg-gray-200 sm:mx-auto shadow-sm bg-gray-100 flex px-3 py-3">
          <div class="w-[50px] icon cursor-pointer font-bold h-12 w-12 text-3xl text-white bg-[#ff1f78] rounded-full flex justify-center items-center">${message.name.substr(0,1)}</div>
          <div class="name-info ml-4 w-6/12">
            <h2 class="name text-xl font-bold font-['Poppins']">${message.name}</h2>
            <h3 class="email font-bold font-['Poppins']">${message.email}</h3>
            <p class="short-des font-['Poppins'] overflow-hidden h-[27px] w-[78%]">${message.description}</p>
          </div>
          <div onclick="deleteContact('${message._id}')" class="flex justify-centere relative px-3 py-3 bg-whites h-fit ml-10 text-md items-center cursor-pointer">
            <span class="material-symbols-outlined text-[#ff1f78] w-fit">delete</span>
          </div>
          
    </div>`;
  }).join('');
}
//  async function loadPhone(){
//     const response = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
//     const data = await response.json();
//     console.log(data.data);

// }
// loadPhone();

//if you make async function then you can use await otherwise not

const loadPhone = async (searchText=6)=> {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await response.json();
    const phones = data.data;
     console.log(phones);
    displayPhones(phones);

}


const displayPhones = phones =>{
    console.log(phones);
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';

    const showAll = document.getElementById('show-all-container');
    
    if(phones.length > 12){
        showAll.classList.remove('hidden');
    }else{
        showAll.classList.add('hidden')
    }

    phones = phones.slice(0,12);

    
    phones.forEach(phone=>{
        const div = document.createElement('div');
        div.classList= `card w-80 mx-auto bg-base-100 shadow-xl`;
        div.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="font-extrabold text-center">${phone.phone_name}</h2>
            <p class="text-center">There are many variations of passages of available, but the majority have suffered</p>
            <h2 class="font-extrabold text-center">$999</h2>
            <div class="card-actions justify-center">
            <button onclick="showDetails('${phone.slug}')" id="show-details-field" class="btn btn-secondary">Show Details</button>
            </div>
            </div>
        `;
        cardContainer.appendChild(div);
    })
    toggleLoading(false);
}
const doSearch = ()=>{
    toggleLoading(true);
    const searchField  = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText);
}

//function for show loading spinner
const toggleLoading = (isLoading)=>{
    const loadingField = document.getElementById('loading-spinner');
   if(isLoading===true){
    loadingField.classList.remove('hidden');
   }else{
    loadingField.classList.add('hidden');
   }
}

const showDetails =async (id)=>{
    
   const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
   const data= await response.json();
   const phone =  data.data;
   console.log(phone);
   showModal(phone);
   
   
}

const showModal = (phone)=>{
    show_details_modal.showModal();
    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML =`
    <img class="w-36 mx-auto" src="${phone.image}" alt="">
   <h4 class="font-semibold text-3xl my-5">${phone.name}</h4>
  <p><span class="font-bold">Storage: </span>${phone?.mainFeatures?.memory}</p>
  <p><span class="font-bold">Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
  <p><span class="font-bold">Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
  <p><span class="font-bold">Memory: </span>${phone?.mainFeatures?.memory}</p>
  <p><span class="font-bold">Slug: </span>${phone?.slug}</p>
  <p><span class="font-bold">Release date: </span>${phone?.releaseDate}</p>
  <p><span class="font-bold">Brand: </span>${phone?.brand}</p>
  <p><span class="font-bold">GPS: </span>${phone?.others?.GPS || 'No GPS availiable'}</p>
  `
}

loadPhone()


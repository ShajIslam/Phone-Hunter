const loadData = async (phoneName)=>{
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`);
    const data = await response.json();
    const phones = data.data;
    displayPhones(phones);
    
}

const displayPhones = phones=>{
    console.log(phones);
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';
    phones.forEach(phone =>{
        const div = document.createElement('div');
        div.classList = `card w-96 bg-base-100 shadow-xl`;
        div.innerHTML =`
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
            </div>
            </div>
        `
        cardContainer.appendChild(div)
    })
}
const doSearch = ()=>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadData(searchText);

}




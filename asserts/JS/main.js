let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let tmp;
function getTotal(){
    if(price.value != ''){
        result = (Number(price.value) + Number(taxes.value) + Number(ads.value)) - Number(discount.value);
        total.innerHTML = result;
        total.style.background = 'green';
    }else {
        total.innerHTML = '';
        total.style.background = 'red';
    }
}

let dataPro;
if( localStorage.product !=null ){
    dataPro = JSON.parse(localStorage.product);
}else{
    dataPro = [];
}
let mood = 'create';

submit.onclick =function(){
    let newPro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }
    if( title.value != '' &&
        price.value != '' &&
        newPro.count < 100 &&
        price.value > 0
    ){
        if(mood === 'create'){
            if(newPro.count > 1){
                for(let i = 0;i<newPro.count;i++){
                    dataPro.push(newPro);
                }
            }else{
                dataPro.push(newPro);
            }
            
        }
        else {
            dataPro[tmp] = newPro;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
            getTotal();
    }
    clearData()
    }else{
        Swal.fire({
            title: 'Some fields is null',
            text: 'please complete the data in the fields...',
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
          });
    }
    localStorage.setItem('product', JSON.stringify(dataPro));
    console.log(dataPro);
    readData();
    getTotal();
}

function clearData(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

function readData(){
    let table = '';
    for(let i = 0;i < dataPro.length;i++){
        
        table += `<tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button class="update" onclick="updatePro(${i})">update</button></td>
                    <td><button class="delete" onclick="deletePro(${i})">delete</button></td>
                </tr>`
            }
    document.getElementById('tbody').innerHTML = table;
    let btnDeleteAll = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDeleteAll.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
        `
    }else{
        btnDeleteAll.innerHTML = '';
    }
}
function deletePro(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    readData();
}

function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    readData();
}

function updatePro(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    count.style.display = 'none';
    submit.innerHTML = 'Update'
    getTotal()
    tmp = i;
    mood = 'update';
}
let searchMood = 'title';
function getSearchMood(id){
    if(id== 'searchByTitle'){
    searchMood = "title";
    }
    else{
        searchMood = 'category';
    }
    search.placeholder = "Search by "+ searchMood;
    search.focus();
    search.value = '';
    readData();
}
function searchData(value){
    let table = '';
    const searchValueLower = value.toLowerCase();
    for(let i = 0;i < dataPro.length; i++){
    if(searchMood == 'title'){
        
            const productTitleLower = dataPro[i].title.toLowerCase();
            if (productTitleLower.includes(searchValueLower)){
                table += `<tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button class="update" onclick="updatePro(${i})">update</button></td>
                    <td><button class="delete" onclick="deletePro(${i})">delete</button></td>
                </tr>`
                }
            
        }
    else{
        
            const productCategoryLower = dataPro[i].category.toLowerCase();
            if (productCategoryLower.includes(searchValueLower)){
                table += `<tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button class="update" onclick="updatePro(${i})">update</button></td>
                    <td><button class="delete" onclick="deletePro(${i})">delete</button></td>
                </tr>`
            }
            
    }
}
    document.getElementById('tbody').innerHTML = table;
}

readData();
const searchProducts = () => {
  fetch('https://fakestoreapi.com/products/')
  .then(res => res.json())
  .then(data => showDetails(data))

}


const showDetails = (products) => {
  const details = document.getElementById('display-card');
  products.forEach(element => {
    console.log(element)
    const ratingStar = ratings(element.rating.rate);

    const div = document.createElement('div');
    div.classList.add('col')
    div.innerHTML = `

          <div class="card ms-4 border-0 shadow  h-100 product">
            <div class="p-5">
            <img src="${element.image}" class="card-img-top" alt="..."  height=300 >
            </div>
            <div class="card-body">
              <h5 class="card-title text-center">${element.title}</h5>
             
              <h5 class="card-text text-center fw-bold">$<span class="sp fw-bold">${element.price}</span></h5>
              <h5 class="card-text text-center"><span class="sp fw-bold">${ratingStar}</span></h5>

              <p class="card-text text-center">${element.description}</p>


            </div>
            <div class="footer mx-auto">
            <button class="btn btn-secondary" onclick="addToCard(${element.id},${element.price})" >Add to Card</button>

            

            </div>           
            </div>
        
     
        
        
        `
    details.appendChild(div);

/*Add to card a click korle addtocard method call hobe element id and element price diye 
parameter hishebe element id & price jacche
 */
  });





}
let count = 0;
const addToCard = (id, price, newPrice) => {
  /* element id & price ekhane ashbe
  newprice er value by default zero
  */
  count = count + 1;
  //addtocard a click korle total prodcut er value barbe
  document.getElementById('total-products').innerHTML = count;
  //innerhtml er shahajje count er value total product a rekhe dicchi
  updatePrice(price);
  //updateprice method call hobe
  total();



}
const total = () => {
  const price = parseFloat(document.getElementById('price').innerText);
  const deliver = parseFloat(document.getElementById('delivery-charge').innerText);
  const shipping = parseFloat(document.getElementById('shipping-charge').innerText);
  //price,delivery,shipping get korbo
  const total = price + deliver + shipping;
  //price,delivery,shipping jog korbo
  document.getElementById('total').innerText = total.toFixed(2)
  //innertext er maddhome total a set korbo
  TaxCharge(total);
  //taxcharge method call hobe

  const tax = parseFloat(document.getElementById('tax-charge').innerText);
  //taxcharge er value get korbo

  document.getElementById('taxtotal').innerText = (total + tax).toFixed(2);
  //total price r tax jog korbo

}

const updatePrice = (price) => {
  const oldPrice = document.getElementById('price').innerText;
  //bortoman price ta get krtesi
  const oldPriceFloat = parseFloat(oldPrice);
  //float a conver hcche 
  const newPrice = price + oldPriceFloat;
  //puron price er shthe newprice add hobe
  document.getElementById('price').innerText = newPrice.toFixed(2);//doshomiker por kotoghor ta dkhabe 
  DeliveryCharge(newPrice);
  //deliverycharge method ta call hobe
  ShippingCharge(newPrice);


}

const TaxCharge = (newPrice) => {
  document.getElementById('tax-charge').innerText = (newPrice * 0.15).toFixed(2);
}

const DeliveryCharge = (newPrice) => {
  let DeliveryCharge;
  if (newPrice <= 500) {
    return document.getElementById('delivery-charge').innerText = 0;
    //return kora mane hcche pathacche 
  }
  if (newPrice > 500 && newPrice <= 800) {
    document.getElementById('delivery-charge').innerText = 100
  }
  else if (newPrice > 800 && newPrice <= 1000) {
    document.getElementById('delivery-charge').innerText = 150
  } else if (newPrice > 1000) {
    document.getElementById('delivery-charge').innerText = 200
  }

}

const ShippingCharge = (newPrice) => {
  let ShippingCharge;
  if (newPrice <= 500) {
    return document.getElementById('shipping-charge').innerText = 0;
  }
  if (newPrice > 500 && newPrice <= 800) {
    document.getElementById('shipping-charge').innerText = 100
  }
  else if (newPrice > 800 && newPrice <= 1000) {
    document.getElementById('shipping-charge').innerText = 150
  } else if (newPrice > 1000) {
    document.getElementById('shipping-charge').innerText = 200
  }

}

const ratings = (rate) => {
  if (rate >= 4) {
    return star = ` <h6><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i> ${rate}</h6>`
  }
  else if (rate >= 3 && rate < 4) {
    return star = ` <h6><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i> ${rate}</h6>`
  }
  else if (rate >= 2 && rate < 3) {
    return star = ` <h6><i class="fas fa-star"></i><i class="fas fa-star"></i> ${rate}</h6>`
  }
  else {
    return star = ` <h6><i class="fas fa-star"></i> ${rate}</h6>`
  }

}


const orderProducts = () => {
  const details = document.getElementById('details1');
  details.classList.remove("hidden");
  //by default hidden ta shore jabe 

  details.textContent = '';
  const totalPrice = document.getElementById('taxtotal').innerText;

  const div = document.createElement('div');

  div.innerHTML = ` <div class="alert alert-success alert-dismissible fade in " id="detailsHidden">
                            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                            <h4>Your total Shopping : $${totalPrice}</h4>
                            <p>Thanks for Shopping With Us!!!!!</p>
                        </div>
  
    `

  details.appendChild(div)
}





searchProducts();






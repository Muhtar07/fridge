const $productForm = document.forms.productForm;
const $recipes = document.querySelector('.recipes');

function newtrack(dataFromBack) {
  let result = '';
  for (let i = 0; i < dataFromBack.length; i++) {
    console.log(i);
    result += `<li><p>${dataFromBack[i].title}</p></li>`;
  }

  return result;
}

$productForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  let product = $productForm.product.value;
  product = product.replace(/[ ]/g, '%20');
  product = product.replace(/[,]/g, '%2C');
  console.log(product);

  const response = await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/suggest?query=${product}&number=10`, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'x-rapidapi-key': 'af451ac180msh9d0c646d5279fe5p19b1d6jsn3b762bcecebf',
    },
  });

  if (response.ok) {
    const dataFromBack = await response.json();
    console.log(dataFromBack);
    $recipes.insertAdjacentHTML('afterbegin', newtrack(dataFromBack.results));
  }
});

// Implement a function which takes an array of Product and returns unique products sorted by price

type Product = {
    name: string;
    price: number;
};
 
function filterAndSortProducts(products: Product[]): Product[] {
   
    const uniqueProducts = new Map<string, Product>();

   
    products.forEach(product => {
        uniqueProducts.set(product.name, product);
    });

   
    const uniqueProductsArray = Array.from(uniqueProducts.values()).sort((a, b) => a.price - b.price);

    return uniqueProductsArray;
}

module.exports = { filterAndSortProducts }

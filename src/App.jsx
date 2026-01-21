import "./App.css";
import { useCart } from "./hooks/useCart";
import { products } from "./Components/Data/products";
import ProductCard from "./Components/ProductCard";
import Cart from "./Components/Cart";

function App() {
  const { cart, addToCart, removeFromCart, updateQuanity, total } = useCart();

  return (
    <>
      <div className="app">
        <header>
          <h1>Shopping Cart</h1>
        </header>
        <main className="products">
          <section>
            {/* Product listing and cart components would go here */}
            {products.map((product) => (
              <ProductCard
                product={product}
                onAddToCart={addToCart}
                key={product.id}
              />
            ))}
          </section>
          <Cart
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuanity={updateQuanity}
            total={total}
          />
        </main>
      </div>
    </>
  );
}

export default App;

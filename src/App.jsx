import { useState } from "react";
import Header from "./Layout/Header";
import Cart from "./Cart/Cart";
import CartProvider from "./store/CartProvider";
import Products from "./Products/Products";
function App() {
  // State for toggle Cart Modal Window
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Products />
      </main>
    </CartProvider>
  );
}

export default App;

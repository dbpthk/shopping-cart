import { useEffect, useState } from "react";

export function useCart() {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  //persist cart to localstorage
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);

  //sync accross tabs
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "cart") {
        try {
          const newCart = JSON.parse(e.newValue || "[]");
          setCart(newCart);
        } catch (error) {
          console.error("failed to parse cart froom localstorage", error);
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuanity = (productId, quantity) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  //not required in react 19 or later
  const total = useMemo(() => {
    return Number(
      cart
        .reduce((sum, item) => {
          const itemTotal = item.price * (item.quantity || 0);
          return sum + itemTotal;
        }, 0)
        .toFixed(2),
    );
  }, [cart]);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuanity,
    total,
  };
}

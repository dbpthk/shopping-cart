import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
const CartItem = ({ item, onUpdateQuantity, removeFromCart }) => {
  return (
    <div className="cart-item">
      <div className="item-details">
        <h4>{item.name}</h4>
        <p>{item.price}</p>
        <div className="quantity-controls">
          <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
            <FaMinus />
          </button>
          <span>{item.quantity}</span>
          <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
            <FaPlus />
          </button>
        </div>
        <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CartItem;

import { CartItemContainer, ItemDetails } from './cart-item.styles';

const CartItem = ({CartItem}) => {
  const { name, imageUrl, price, quantity } = CartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <span>{name}</span>
        <span>{quantity} x {price}</span>
      </ItemDetails>
    </CartItemContainer>
  )
}

export default CartItem;
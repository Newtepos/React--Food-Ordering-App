import { useContext, useState, Fragment } from "react";

import Modal from "../UI/Modal";
import ClientForm from "./ClientForm";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import useRequest from "../../hooks/useRequest";
import axios from "axios";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckOut, setIsCheckOut] = useState(false);
  const { sendRequest: sendPut, isSubmitting, didSubmit } = useRequest();
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const checkOutHandler = () => {
    setIsCheckOut(true);
  };

  const confirmOrderHander = async (userData) => {
    const initialSetup = {
      method: "post",
      url: "https://react-http-efc44-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      data: { user: userData, order: cartCtx.items },
    };
    await sendPut(initialSetup);
    console.log("From cart");
    cartCtx.resetItem();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const clientFormContent = (
    <ClientForm onConfirm={confirmOrderHander} onClose={props.onClose} />
  );

  const mainButtonBarContent = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={checkOutHandler}>
          Order
        </button>
      )}
    </div>
  );

  const mainOrderPageContent = (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && clientFormContent}
      {!isCheckOut && mainButtonBarContent}
    </Modal>
  );

  const submittingContent = (
    <Modal onClose={props.onClose}>
      <p>Ordering Foods...</p>
    </Modal>
  );

  const submitCompletedContent = (
    <Modal onClose={props.onClose}>
      <p>Order Completed, Thank for ordering us</p>
    </Modal>
  );

  return (
    <Fragment>
      {!isSubmitting && !didSubmit && mainOrderPageContent}
      {isSubmitting && submittingContent}
      {!isSubmitting && didSubmit && submitCompletedContent}
    </Fragment>
  );
};

export default Cart;

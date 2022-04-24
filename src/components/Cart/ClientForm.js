import { useRef, useState } from "react";
import classes from "./ClientForm.module.css";

function ClientForm(props) {
  const nameInputRef = useRef();
  const addressInputRef = useRef();

  const [formInputValid, setFormInputValid] = useState({
    name: true,
    address: true,
  });

  const validateInput = (value) => {
    return value.trim() !== "" && value.trim().length !== 0;
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNameInput = nameInputRef.current.value;
    const enteredAddressInput = addressInputRef.current.value;

    const nameValidatedInput = validateInput(enteredNameInput);
    const addressValidatedInput = validateInput(enteredAddressInput);

    const formValid = nameValidatedInput && addressValidatedInput;

    setFormInputValid({
      name: nameValidatedInput,
      address: addressValidatedInput,
    });

    if (!formValid) {
      return;
    }
    props.onConfirm({
      name: enteredNameInput,
      address: enteredAddressInput
    })
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div
        className={`${classes.control} ${
          formInputValid.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef}></input>
        {!formInputValid.name && <p>Please insert name</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValid.address ? "" : classes.invalid
        }`}
      >
        <label htmlFor="address">Your Address</label>
        <input type="text" id="address" ref={addressInputRef}></input>
        {!formInputValid.address && <p>Please insert address</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" className={classes.submit} onClick={props.onClose}>
          Cancel
        </button>
        <button type="submit" className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
}

export default ClientForm;



import useInput from '../hooks/use-input';


const SimpleInput = (props) => {

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput
  } = useInput(value => value.trim() !== '');


  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInput(value => value.trim().match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)); // check email input is valid


  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }


  const formSumissionHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);
    console.log(enteredEmail);

    resetNameInput();
    resetEmailInput();

  };


  const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control';


  return (
    <form onSubmit={formSumissionHandler}>
      {/* ----------------------------------------------User Name Input ---------------------------------------- */}
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onChange={nameChangedHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName} />
        {nameInputHasError && <p className="error-text">Name must not be empty</p>}
      </div>

      {/* ------------------------------------------------User Email input ---------------------------------------------------------*/}
      <div className={emailInputClasses}>
        <label htmlFor='userEmail'>Your E-mail</label>
        <input
          type='email'
          id='userEmail'
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail} />
        {emailInputHasError && <p className="error-text">Please Enter Valid Email</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;


import useInput from '../hooks/use-input';


const isNotEmpty = value => value.trim() !== '' || value.match(/[A-ZÁ-ÚÑÜ][a-zá-úñü]+|([aeodlsz]+\s+)+[A-ZÁ-ÚÑÜ][a-zá-úñü]+/g);

const isEmail = value => value.trim() !== '' || value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);



const BasicForm = (props) => {
  //Form for First Name
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty);

  //Form for last name
  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(isNotEmpty);

  //Form for Email
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);


  // Check if First/Last/Email is true then form active
  let formIsValid = false;

  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = event => {
    event.preventDefault();

    // return empty if miss one of them.
    if (!formIsValid) {
      return;
    }

    console.log("Form Submitted");
    console.log(firstNameValue, lastNameValue, emailValue);

    // reset to become emptry after submitted
    resetFirstName();
    resetLastName();
    resetEmail();
  };


  // Set up CSS for every single components malpulated
  const firstNameInputClasses = firstNameHasError ? 'form-control invalid' : 'form-control';
  const lastNameInputClasses = lastNameHasError ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailHasError ? 'form-control invalid' : 'form-control';





  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='control-group'>
        <div className={firstNameInputClasses}>
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            id='firstName'
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
            value={firstNameValue}
          />
          {firstNameHasError && <p className="error-text">First Name should not be empty</p>}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor='lastName'>Last Name</label>
          <input
            type='text'
            id='lastName'
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            value={lastNameValue}
          />
          {lastNameHasError && <p className="error-text">Last Name should not be empty</p>}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>E-Mail Address</label>
        <input
          type='email'
          id='email'
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={emailValue}
        />
        {emailHasError && <p className="error-text">E-mail should not be empty</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;

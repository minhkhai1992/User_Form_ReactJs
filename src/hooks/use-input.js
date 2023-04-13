import { useReducer } from 'react';


const initialInputState = {
    value: '',
    inTouched: false,
};


const inputStateReducer = (state, action) => {
    if (action.type === 'INPUT') {
        return { value: action.value, isTouched: state.isTouched }; //get a input value and set touched is active
    }

    if (action.type === 'BLUR') {
        return { isTouched: true, value: state.value };   //set value if user touched
    };

    if (action.type === 'RESET') {
        return { isTouched: false, value: '' };   // set isTouched if fail and value is empty
    };

    return inputStateReducer;
}



const useInput = (validateValue) => {
    const [inputState, dispatch] = useReducer(
        inputStateReducer,
        initialInputState
    );

    const valueIsValid = validateValue(inputState.value); // hold a value component
    const hasError = !valueIsValid && inputState.inTouched;


    // Change Value of User Input
    const valueChangeHandler = event => {
        dispatch({ type: 'INPUT', value: event.target.value });
    };


    // out of Focus
    const inputBlurHandler = event => {
        dispatch({ type: 'BLUR' });
    };

    const reset = () => {
        dispatch({ type: 'RESET' });
    };


    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset
    };

};


export default useInput;
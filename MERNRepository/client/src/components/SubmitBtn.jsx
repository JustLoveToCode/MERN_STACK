// Import useNavigation from react-router-dom:
import { useNavigation } from "react-router-dom";

// Creating the Component SubmitBtn Here
const SubmitBtn = ({formBtn})=>{
    // Invoking the useNavigation() Hook
    const navigation = useNavigation();
    // If the navigation.state strictly equal to === 'submitting'
    const isSubmitting = navigation.state === 'submitting';
    return(
        // Using Ternary Operator,
        // If the formBtn props is present, use the form-btn class
        <button type="submit" className={`btn btn-block ${formBtn && 'form-btn'}`}
        // If isSubmitting is true, it will be disabled
        disabled={isSubmitting}>
        {/* If isSubmitting is true, it show "submitting", otherwise, it will be "submit" */}
        {/* This is using the Ternary Conditional Operator */}
        {isSubmitting? "submitting":"submit"}
        </button>
    )
}

export default SubmitBtn;
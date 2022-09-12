import { check } from "express-validator";

// Function to validate the required fields for all forms

const requiredValues = ( props ) =>
{let checks = [];
    props.forEach( ( field ) =>
    {
        checks.push( check( field )
            .notEmpty()
            .withMessage( `${ field } is required` ) );
    } );

    return checks;
};
export default requiredValues;
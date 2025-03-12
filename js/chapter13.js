(function() {
    // Disables browser-based validation. All validation will be done in this file.
    // For whatever reason, starting is as a JQuery function breaks the below line. I wonder why?
    document.forms.register.noValidate = true;
})

// JQuery submit to tell the default submit to GO AWAY
$("form").submit(function(e) {
    var children = this.elements;
    var validationFailed = false;
    var validCheck = [];

    // First, validate for minimum length.
    for (var i = 0; i < children.length - 1; i++) {
        var thisChild = children[i];
        removeErrorMessage(thisChild);

        // First validate minimum length.
        validCheck = validateRequired(thisChild);
        if (!validCheck[0]) {
            showErrorMessage(thisChild, validCheck[1]);
            validationFailed = true;
        }

        // Now validate for max length.
        validCheck = validateMaxLength(thisChild);
        if (!validCheck[0]) {
            showErrorMessage(thisChild, validCheck[1]);
            validationFailed = true;
        }

        // Now validate for max length.
        validCheck = validateEmail(thisChild);
        if (!validCheck[0]) {
            showErrorMessage(thisChild, validCheck[1]);
            validationFailed = true;
        }
    }
    if (validationFailed) {
        e.preventDefault();
    }
})

// Checks to see if an element has the 'required' element. If so, it forces the user to input a minimum amount to submit.
function validateRequired(element) {
    var elementID = element.id;
    var elementLength = element.value.length;
    var elementClass = $(element).attr("class");

    /* An array is returned, using the following format:
     * 
     * [isValid, invalidReason]
     * 
     * isValid is assumed to be a bool. invalidReason is the error message.
     */

    if (elementClass === "required") {
        if (elementLength < 1) {
            return [false, "Field is required."]
        } else {
            return [true, ""];
        }
    } else {
        return [true, ""];
    }
}

// Variables are declared outside of validateMaxLength() since they're expected to be called more than once.
// While it probably means little, a little optimisation can't hurt...right?
// ...I miss C# already.
var maxLengthName = 150;
var maxLengthFeedback = 1000;
function validateMaxLength(element) {
    var elementID = element.id;
    var elementLength = element.value.length;

    /* An array is returned, using the following format:
     * 
     * [isValid, invalidReason]
     * 
     * isValid is assumed to be a bool. invalidReason is the error message.
     */

    // When isValid is true, the error message is empty, because it will never be read.
    if (elementID === "email") {
        if (elementLength < maxLengthName)
        {
            return [true, ""];
        } else {
            var overLength = maxLengthName - elementLength;
            return [false, "Your email is " + -overLength + " characters too long."];
        }
    }
    else if (elementID === "feedback") {
        if (elementLength < maxLengthFeedback)
        {
            return [true, ""];
        } else {
            var overLength = maxLengthFeedback - elementLength;
            return [false, "Your feedback is " + -overLength + " characters too long."];
        }
    }
    else {
        return [false, "ERROR! validateMaxLength() called with invalid element:" + elementID]
    }
}

// Checks to see if an element has the 'required' element. If so, it forces the user to input a minimum amount to submit.
function validateEmail(element) {
    var elementID = element.id;
    var elementLength = element.value.length;

    /* An array is returned, using the following format:
     * 
     * [isValid, invalidReason]
     * 
     * isValid is assumed to be a bool. invalidReason is the error message.
     */
    if (elementID === "email" && elementLength > 0) {
        if (/[^@]+@[^@]+/.test(element.value))
        {
            return [true, ""];
        } else {
            return [false, "Input is invalid. It must be an email."];
        }
    } else {
        return [true, ""];
    }
}

function showErrorMessage(element, errorMessage) {
    var errorContainer = $(element).siblings('.error.message');

    if (!errorContainer.length) {
       errorContainer = $('<span class="error message text-italic"></span>').insertAfter(element);
    }
    errorContainer.html("<br>" + errorMessage);
}

function removeErrorMessage(element) {
    var errorContainer = $(element).siblings('.error.message');
    errorContainer.remove();
}
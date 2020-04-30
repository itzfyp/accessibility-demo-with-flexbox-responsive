import "./main.css";
import "./app.scss";
import "./forms.scss";

const validForm = {
    email: {
        required: true
    },
    password: {
        min: 5,
        max: null,
        required: true
    },
    confirmpassword: {
        min: 5,
        max: null,
        required: true
    },
    gender: {
        required: true
    },
    department: {
        required: true
    },
    username: {
        min: 5
    }
}

class FormValidation {
    constructor() {
        this.form = document.forms[0];
        this.setListener = this.setListener.bind(this);
        this.setListener();
    }

    resetForm() {
        this.form.reset();
    }

    setListener() {
        this.form.addEventListener('submit', (event) => {

            const elements = Array.from(this.form.elements).filter(el => validForm[el.name]);
            const isFormValid = this.checkValid(elements);
            !isFormValid && event.preventDefault();
        });
    }

    checkValid(elements) {
        let isFormValid = true;
        elements.forEach(el => {

            let value = el.value;

            if (el.type === 'radio' || el.type === 'checkbox') {
                value = el.checked ? 'checked' : '';
            }


            const isValid = this.validator(el.name, value);

            if (!isValid) {
                this.setErrorMessge(el, true);
                isFormValid = isValid;
            }
        });

        return isFormValid;

    }

    validator(key, value) {
        const validProps = validForm[key];

        if (!value)
            return false;

        if (validProps.required && !value.length)
            return false;

        if (validProps.min && validProps.mim > value.length)
            return false;

        if (validProps.max && validProps.max < value.length)
            return false;


        return true;
    }

    setErrorMessge(el, showMessage = false) {
        let ErrorEl = el.parentNode;
        if (el.type === 'radio' || el.type === 'checkbox')
            ErrorEl = ErrorEl.parentNode;

        if (showMessage) {
            ErrorEl.classList.add('invalid');
            el.setAttribute('aria-invalid', 'true');
        }
        else {
            ErrorEl.classList.remove('invalid');
            el.setAttribute('aria-invalid', 'false');

        }
    }

}


new FormValidation();
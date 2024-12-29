import { Validators, createFormValidation } from '@lemoncode/fonk';
import { arrayRequired } from '@lemoncode/fonk-array-required-validator';


const commonValidations = {
    required: [
        {
            validator: Validators.required,
            message: 'Campo requerido',
        }
    ],
    greaterZero: [
        {
            validator: Validators.pattern,
            customArgs: { pattern: /^[+]?[1-9]\d*(\.\d+)?$/ },
            message: 'El número debe ser mayor que cero'
        }
    ],
    maxLength: (amount) => [
        {
            validator: Validators.maxLength,
            customArgs: { length: amount },
            message: 'La longitud máxima son {{length}} caracteres',
        }
    ],
    email: [
        {
            validator: Validators.email,
            message: 'Email no válido',
        }
    ],
    phone: [
        {
            validator: Validators.pattern,
            customArgs: { pattern: new RegExp(/^(6|7|8|9)\d{8}$/) },
            message: 'Teléfono no válido'
        }
    ],
    arrayRequired : (min, max, message) => [
        {
            validator: arrayRequired.validator,
            customArgs: { minLength: min, maxLength: max },
            message: message,
        }
    ],
    locationUrl: [
        {
            validator: Validators.pattern,
            customArgs: { pattern: new RegExp(/^https:\/\/www\.google\.com\/maps/) },
            message: 'La dirección url indicada no es correcta',
        }
    ],
};

const validationSchema = {
    field: {
            title: [
            ...commonValidations.required,
            ...commonValidations.maxLength(64),
        ],
        notes: [
            ...commonValidations.required,
            ...commonValidations.maxLength(1000),
        ],
        email: [
            ...commonValidations.required,
            ...commonValidations.email,
        ],
        phone: [
            ...commonValidations.required,
            ...commonValidations.phone,
        ],
        price: [
            ...commonValidations.required,
            ...commonValidations.greaterZero,
        ],
        saleTypes: commonValidations.arrayRequired(1, 4, 'Debe marcar al menos una de las opciones'),
        address: [
            ...commonValidations.required,
            ...commonValidations.maxLength(54),
        ],
        city: [
            ...commonValidations.required,
            ...commonValidations.maxLength(24),
        ],
        province:  commonValidations.required,
        squareMeter: [
            ...commonValidations.required,
            ...commonValidations.greaterZero,
        ],
        rooms: commonValidations.required,
        bathrooms: commonValidations.required,
        locationUrl: [
            ...commonValidations.required,
            ...commonValidations.locationUrl,
        ], 
        mainFeatures: commonValidations.arrayRequired(1, 6, 'Debe añadir al menos una característica'),
    }
};

export const formValidation = createFormValidation(validationSchema);
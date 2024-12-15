import { Validators, createFormValidation } from '@lemoncode/fonk';

const commonValidation = [
    {
        validator: Validators.required,
        message: 'Campo requerido',
    }
];

const validationSchema = {
    field: {
            title: [
            ...commonValidation,
        {
            validator: Validators.maxLength,
            customArgs: { length: 64 },
            message: 'La longitud máxima son {{length}} caracteres',
        }
        ],
        notes: [
            ...commonValidation,
            {
            validator: Validators.maxLength,
            customArgs: { length: 1000 },
            message: 'La longitud máxima son {{length}} caracteres',
            }
        ],
        email: [
            ...commonValidation,
            {
                validator: Validators.email,
                message: 'Email no válido',
            }
        ],
        phone: [
            ...commonValidation,
            {
                validator: Validators.pattern,
                customArgs: { pattern: new RegExp(/^(6|7|8|9)\d{9}$/) },
                message: 'Teléfono no válido'
            }
        ],
        price: [
            ...commonValidation,
            {
                validator: Validators.pattern,
                customArgs: { pattern: /^[+]?[1-9]\d*(\.\d+)?$/ },
                message: 'El precio debe ser superior a cero'
            }
        ]
    }
};

export const formValidation = createFormValidation(validationSchema);
import { Validators, createFormValidation } from '@lemoncode/fonk';

const commonValidation = [
    {
        validator: Validators.required,
        message: 'Campo requerido',
    }
];

const validationSchema = {
    field: {
        email: [
            ...commonValidation,
            {
                validator: Validators.email,
                message: 'Email no válido',
            },
        ],
        message: [
            ...commonValidation,
            {
                validator: Validators.maxLength,
                customArgs: { length: 240 },
                message: 'La longitud máxima son {{length}} caracteres',
            }
        ],
}
};

export const formValidation = createFormValidation(validationSchema);
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
        notes: [
            ...commonValidation,
            {
                validator: Validators.maxLength,
                customArgs: { length: 20 },
                message: 'La longitud máxima es {{length}}',
            }
        ],
}
};

export const formValidation = createFormValidation(validationSchema);
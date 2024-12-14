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
        ],
}
};

export const formValidation = createFormValidation(validationSchema);
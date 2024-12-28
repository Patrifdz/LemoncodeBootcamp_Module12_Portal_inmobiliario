import { Validators, createFormValidation } from '@lemoncode/fonk';
import { arrayRequired } from '@lemoncode/fonk-array-required-validator';
import { isUrl } from '@lemoncode/fonk-is-url-validator';


const commonValidationFieldRequiered =  [
        {
            validator: Validators.required,
            message: 'Campo requerido',
        } 
    ];

const commonValidationGreaterZero = [
        {
            validator: Validators.pattern,
            customArgs: { pattern: /^[+]?[1-9]\d*(\.\d+)?$/ },
            message: 'El número debe ser mayor que cero'
        }
];

    const commonValidationMaxLength = (amount ) => [
        {
            validator: Validators.maxLength,
            customArgs: { length: amount },
            message: 'La longitud máxima son {{length}} caracteres',
        }
    ];

const validationSchema = {
    field: {
            title: [
            ...commonValidationFieldRequiered,
            ...commonValidationMaxLength(64),
        ],
        notes: [
            ...commonValidationFieldRequiered,
            ...commonValidationMaxLength(1000),
        ],
        email: [
            ...commonValidationFieldRequiered,
            {
                validator: Validators.email,
                message: 'Email no válido',
            }
        ],
        phone: [
            ...commonValidationFieldRequiered,
            {
                validator: Validators.pattern,
                customArgs: { pattern: new RegExp(/^(6|7|8|9)\d{8}$/) },
                message: 'Teléfono no válido'
            }
        ],
        price: [
            ...commonValidationFieldRequiered,
            ...commonValidationGreaterZero,
        ],
        saleTypes: [
            {
                validator: arrayRequired.validator,
                customArgs: { minLength: 1, maxLength: 4 },
                message: 'Debe marcar al menos una de las opciones',
            }
        ],
        address: [
            ...commonValidationFieldRequiered,
            ...commonValidationMaxLength(54),
        ],
        city: [
            ...commonValidationFieldRequiered,
            ...commonValidationMaxLength(24),
        ],
        province:  commonValidationFieldRequiered,
        squareMeter: [
            ...commonValidationFieldRequiered,
            ...commonValidationGreaterZero,
        ],
        rooms: commonValidationFieldRequiered,
        bathrooms: commonValidationFieldRequiered,
        locationUrl: [
            ...commonValidationFieldRequiered,
            {
                validator: isUrl.validator,
                message: 'La dirección url indicada no es correcta',
              },
        ], 
        newFeature: commonValidationFieldRequiered,
        mainFeatures: [
            ...commonValidationFieldRequiered,
            {
                validator: arrayRequired.validator,
                customArgs: { minLength: 1, maxLength: 6 },
                message: 'Debe añadir al menos una característica',
            }
        ],
        
        equipments: [
                {
                    validator: arrayRequired.validator,
                    customArgs: { minLength: 0, maxLength: 6 },
                }
            ],
        images: [
            {
                validator: arrayRequired.validator,
                customArgs: { minLength: 1},
            }
        ],
    }
};

export const formValidation = createFormValidation(validationSchema);
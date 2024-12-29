import { history, routes } from '../../core/router';
import { onUpdateField, onSetError, onSubmitForm, onSetFormErrors, onAddFile } from '../../common/helpers/element.helpers';
import { formValidation } from './upload-property.validations';
import { getSaleTypeList, getProvinceList, getEquipmentList, sendDataNewProperty } from '../../common/helpers/element.api';
import { setCheckboxList, setOptionList, onAddFeature, formatDeleteFeatureButtonId, onRemoveFeature, onAddImage } from './upload-property.helpers';
import { mapNewPropertyFromViewModelToApi } from './upload-property.mapper';

/*
upload-property: {
    id: string,
    title: string // maxLength 64 
    notes: string // maxLength 1000
    email: string // email format
    phone: string // phone format
    price: number // >0
    saleType: array string
    address: string // maxLength 50
    city: string,
    provinceId: string
    squareMeter: number // >0
    rooms: number,
    bathrooms: number,
    locationUrl: string // url format
    mainFeatures: array strings,
    equipmentIds: array strings,
    images: image format
}
*/

Promise.all( [
    getSaleTypeList( ),
    getProvinceList( ),
    getEquipmentList( ),
]).then( ( [saleTypeList, provinceList, equipmentList] )  => {
    setCheckboxList(saleTypeList, 'saleTypes')
    setOptionList(provinceList, 'province')
    setCheckboxList(equipmentList, 'equipments')
})

let newProperty = {
    title: '',
    notes: '',
    email: '',
    phone: '',
    price: '',
    saleTypes: [ ],
    address: '',
    city: '',
    province: '',
    squareMeter: '',
    rooms: '',
    bathrooms: '',
    locationUrl: '',
    mainFeatures: [ ],
    equipments: [ ],
    images: [ ],
}

const fieldId = [...Object.keys(newProperty), 'newFeature'];
const buttonId = ['insert-feature-button', 'save-button'];

fieldId.forEach( field => {
    onUpdateField(field, event => {
        const value = event.target.value;
        const saleTypesId = event.target.id;
            if(field === 'saleTypes' || field === 'equipments') {
                        if(newProperty[field].indexOf(value) === -1) {
                        newProperty = {
                            ...newProperty,
                            [field]: [...newProperty[field], value],
                        } 
                        } else {
                            newProperty = {
                                ...newProperty,
                                [field]: newProperty[field].filter( num => num !== value ),
                            }
                        }
            }  else if (field !== 'images') {
                    newProperty = {
                        ...newProperty,
                        [field]: value,
                    }
            }   
            if (field !== 'saleTypes') {
                    formValidation.validateField( field, value).then( result => onSetError(field, result))
            } else {
                formValidation.validateField(saleTypesId, newProperty.field).then ( result => onSetError(field, result));
            }
    });

    if(field === 'images') {
        onAddFile(field, value => {
        onAddImage(value);
        newProperty = {
            ...newProperty,
            [field]: [...newProperty[field], value],
        }
        })
    }
});



buttonId.forEach( button => {
    if(button === 'insert-feature-button') {
        onSubmitForm(button, ( ) => {
            const value = document.getElementById('newFeature').value;
            if(value) {
                onAddFeature(value);
                newProperty = {
                    ...newProperty,
                    mainFeatures : [...newProperty.mainFeatures, value]
                }
                onSubmitForm( formatDeleteFeatureButtonId(value), ( ) => {
                    onRemoveFeature(value);
                    newProperty.mainFeatures = newProperty.mainFeatures.filter(feature => feature !== value);
                })
                formValidation.validateField( 'mainFeatures', newProperty.mainFeatures).then( result => onSetError('mainFeatures', result))
            }
        })
    } else if (button === 'save-button') {
        onSubmitForm(button, () => {
            // Se validan los datos del formulario de la nueva propiedad al clickar el botón de Guardar
            formValidation.validateForm(newProperty).then(result => {
                onSetFormErrors(result);
        
                if (result.succeeded) {
                    // Si el resultado es true:
                    // mapeamos la nueva propiedad y enviamos los datos a la API
                    sendDataNewProperty(mapNewPropertyFromViewModelToApi(newProperty)).then(() => {
                    // Después de enviar los datos con éxito, redirigimos a la lista de propiedades
                    history.push(routes.propertyList);
                    // Se lanza también un alert para avisar al usuario
                    alert('Se ha añadido la propiedad con éxito');
                    });
                }
            });
        });
        } 
});


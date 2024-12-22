import { history, routes } from '../../core/router';
import { onUpdateField, onSetError, onSubmitForm, onSetFormErrors } from '../../common/helpers/element.helpers';
import { formValidation } from './upload-property.validations';
import { getSaleTypeList, getProvincesList, getEquipmentList, getPropertiesList, sendDataNewProperty } from './upload-property.api';
import { formatCheckboxId, setCheckboxList, setOptionList, onAddFeature, formatDeleteFeatureButtonId, onRemoveFeature } from './upload-property.helpers';
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
    getProvincesList( ),
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
    provinceId: '',
    squareMeter: '',
    rooms: '',
    bathrooms: '',
    locationUrl: '',
    mainFeatures: '',
    equipmentId: '',
    images: '',
}


const fieldId = [ 'title', 'notes', 'email', 'phone', 'price', 'saleTypes', 'address', 'city', 'province', 'squareMeter', 'rooms', 'bathrooms', 'locationUrl', 'newFeature', 'insert-feature-button', 'equipments', 'images'];


fieldId.forEach( field => {
    onUpdateField(field, event => {
        const value = event.target.value;
        console.log(event.target.id)
        if(field === 'saleTypes') {
            if(newProperty.saleTypes.indexOf(value) === -1) {
                newProperty = {
                     ...newProperty,
                     [field]: [...newProperty.saleTypes, value],
                } 
                } else {
                    newProperty = {
                        ...newProperty,
                        [field]: newProperty.saleTypes.filter( num => num !== value ),
                    }
                }
             } else if (field === 'insert-feature-button') {
                onAddFeature(newProperty.newFeature);
             } else {
            newProperty = {
                ...newProperty,
                [field]: value,
            }
        }   
    formValidation.validateField( field, value).then( result => {
        onSetError(field, result)
    })
    })
})

onSubmitForm('save-button', () => {
    formValidation.validateForm(newProperty).then(result => {
        onSetFormErrors(result);

        if (result.succeeded) {
            // Primero, obtenemos la lista de propiedades
            getPropertiesList().then(([propertiesList]) => {
                // Luego, mapeamos la nueva propiedad y enviamos los datos a la API
                console.log(propertiesList)
                sendDataNewProperty(mapNewPropertyFromViewModelToApi(newProperty, propertiesList)).then(() => {
                    // Después de enviar los datos con éxito, redirigimos a la lista de propiedades
                    history.push(routes.propertyList);
                    alert('Se ha añadido la propiedad con éxito');
                });
            });
        }
    });
});





// onUpdateField('title', event => {
//     const value = event.target.value;
//         newProperty = {
//             ...newProperty,
//             title: value,
//         }
//     formValidation.validateField('title', newProperty.title).then((result) => {
//         onSetError('title', result)
//     })
// })
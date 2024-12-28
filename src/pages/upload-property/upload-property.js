import { history, routes } from '../../core/router';
import { onUpdateField, onSetError, onSubmitForm, onSetFormErrors, onAddFile } from '../../common/helpers/element.helpers';
import { formValidation } from './upload-property.validations';
import { getSaleTypeList, getProvincesList, getEquipmentList, getPropertiesList, sendDataNewProperty } from './upload-property.api';
import { formatCheckboxId, setCheckboxList, setOptionList, onAddFeature, formatDeleteFeatureButtonId, onRemoveFeature, onAddImage } from './upload-property.helpers';
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
    province: '',
    squareMeter: '',
    rooms: '',
    bathrooms: '',
    locationUrl: '',
    mainFeatures: [ ],
    equipments: [ ],
    "add-image": '',
}


const fieldId = [ 'title', 'notes', 'email', 'phone', 'price', 'saleTypes', 'address', 'city', 'province', 'squareMeter', 'rooms', 'bathrooms', 'locationUrl', 'newFeature', 'mainFeatures', 'equipments', 'add-image'];

const buttonId = ['insert-feature-button', 'save-button'];

fieldId.forEach( field => {
    onUpdateField(field, event => {
        const value = event.target.value;
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
             }  else if (field !== 'add-image') {
            newProperty = {
                ...newProperty,
                [field]: value,
            }
        }   
    if (field !== 'saleTypes') {
        formValidation.validateField( field, value).then( result => {
            onSetError(field, result)
        })
    } 
    })
    if(field === 'add-image') {
        onAddFile(field, value => {
        onAddImage(value);
        newProperty = {
            ...newProperty,
            [field] : value,
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
            }
        })
    } else if (button === 'save-button') {
        onSubmitForm(button, () => {
            formValidation.validateForm(newProperty).then(result => {
                console.log(result)
                onSetFormErrors(result);
                console.log(newProperty)
        
                if (result.succeeded) {
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
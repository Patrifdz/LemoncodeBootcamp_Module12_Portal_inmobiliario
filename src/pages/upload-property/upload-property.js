console.log('upload-property page');
import { onUpdateField, onSetError } from '../../common/helpers/element.helpers';
import { formValidation } from './upload-property.validations';
import { getSaleTypeList } from './upload-property.api';
import { formatCheckboxId, setCheckboxList } from './upload-property.helpers';
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

getSaleTypeList( ).then( list => {
    setCheckboxList(list, 'saleTypes')
})

let newProperty = {
    id: '',
    title: '',
    notes: '',
    email: '',
    phone: '',
    price: '',
    saleType: '',
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

const fieldId = [ 'title', 'notes', 'email', 'phone', 'price', 'saleTypes', 'address', 'city', 'province', 'squareMeter', 'rooms', 'bathrooms', 'locationUrl', 'mainFeatures', 'equipments', 'images'];


onUpdateField('title', event => {
    const value = event.target.value;
        newProperty = {
            ...newProperty,
            title: value,
        }
    formValidation.validateField('title', newProperty.title).then((result) => {
        onSetError('title', result)
    })
})
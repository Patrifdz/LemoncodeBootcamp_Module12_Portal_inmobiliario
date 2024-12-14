import { history, routes } from '../../core/router';
import { mapPropertyDetailFromApiToViewModel } from './property-detail.mapper';
import { setPropertyValues } from './property-detail.helpers';
import { getPropertyList, getEquipmentList, sendContactData } from './property-detail.api';
import { onUpdateField, onSetError, onSubmitForm, onSetFormErrors } from '../../common/helpers/element.helpers';
import { formValidation } from './property-detail.validations';

const paramsUrl = history.getParams( );

Promise.all ( [
    getPropertyList( ),
    getEquipmentList( ),
]).then( ([propertyList, equipmentsList] ) => {
    propertyList.forEach( property => {
        if(paramsUrl.id === property.id) {
            setPropertyValues(mapPropertyDetailFromApiToViewModel(property, equipmentsList))
        }
    })
});

let contactData = {
    email: '',
    notes: ''
};

console.log(contactData);

onUpdateField('email', event => {
    const value = event.target.value;
        contactData = {
            ...contactData,
            email: value,
        }
    formValidation.validateField('email', contactData.email).then((result) => onSetError('email', result))
});

onUpdateField('message', event => {
    const value = event.target.value;
    contactData = {
        ...contactData,
        notes: value,
    }
    formValidation.validateField('message', contactData.notes).then((result) => onSetError('message', result))
});

onSubmitForm('contact-button', ( ) => {
    formValidation.validateForm(contactData).then( result => {
        console.log(result);
        onSetFormErrors(result);
        if(result.succeeded) {
            sendContactData(contactData).then( ( ) => {
                {history.push(routes.propertyList)}
                alert('Gracias por tu interés, en breve nos pondremos en contacto contigo');
            })
        }
    })
});


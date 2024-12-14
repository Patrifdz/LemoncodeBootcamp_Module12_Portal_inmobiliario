import { history } from '../../core/router';
import { mapPropertyDetailFromApiToViewModel } from './property-detail.mapper';
import { setPropertyValues } from './property-detail.helpers';
import { getPropertyList, getEquipmentList } from './property-detail.api';

const paramsUrl = history.getParams( );

console.log(paramsUrl);

// const getPropertyDataSelected = (id, ( dataProperty, dataEquip ) => {
//     dataProperty.forEach( property => {
//         if(id === property.id) {
//             mapPropertyDetailFromApiToViewModel(property, dataEquip)
//         }
//     })
// })

getPropertyList().then( response => {
    response.forEach( property => {
        if(paramsUrl.id === property.id) {
            console.log(property)
        }
    })
});



getEquipmentList().then( response => {
    console.log(response)
}) 
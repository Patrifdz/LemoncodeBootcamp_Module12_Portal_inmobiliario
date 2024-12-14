import { getWord } from '../property-list/property-list.mapper';
/*
property  {
image: string // 1ª image base64,
title: string,
city: string,
rooms: number // + habitación/habitaciones,
squareMeter:  number // + m2,
bathrooms: number // + baño/baños,
price: number // formato local + €,
notes: string,
mainFeatures: array strings,
equipments: array strings,
locationUrl: string,
}
*/

export const mapPropertyDetailFromApiToViewModel = (property, equipments) => {
    return {
        mainImage: Array.isArray(property.images) ? property.images[0] : '',
        title: property.title,
        city: property.city,
        rooms: `${property.rooms}  ${getWord(property.rooms, 'habitación', 'habitaciones')}`,
        squareMeter: `${property.squareMeter} m2`,
        bathrooms: `${property.bathrooms}  ${getWord(property.bathrooms, 'baño', 'baños')}`,
        price: `${property.price.toLocaleString( )} €`,
        notes: property.notes,
        locationUrl: property.locationUrl,
        mainFeatures: property.mainFeatures,
        equipments: getEquipments(property.mainEquipments, equipments),
        images: property.images,
    }
}

const getEquipments = (propertyEquipments, listEquipments) => {
    let mainEquipments = [ ];
    propertyEquipments.forEach( id => {
        for( equipment of listEquipments) {
            if(id === equipment.id) {
                mainEquipments.push(equipment.name)
            }
        }
    })
    return mainEquipments;
}


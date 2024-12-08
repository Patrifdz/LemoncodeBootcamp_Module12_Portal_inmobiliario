/*
Property {
    id: string,
    title: string,
    rooms: string, // 3 habitaciones
    squareMeter: string, // 30 m2
    notes: string, // "truncar" -> a 240 carácteres
    price: string, // 120.000 €
    image: string // 1ª image base64
    }
*/

export const mapPropertyListFromApiToViewModel = propertyList => {
    return propertyList.map( property => mapPropertyFromApiToViewModel(property));
}

const mapPropertyFromApiToViewModel = (property ) => {
        return {
            id: property.id,
            tittle: property.tittle,
            rooms: `${property.rooms}  ${getRoomPrice(property,rooms)}`,
            squareMeter: `${property.squareMeter} m2`,
            // notes: `${getNotesLength(property.notes)}...`,
            notes: `${property.notes.substring(0,240)}...`,
            price: `${property.price.toLocaleString( )} €`,
            image: Array.isArray(property.images) ? property.image[0] : '',
        }
}

const getRoomWord = rooms => {
    return rooms > 1 ? 'habitaciones' : 'habitación';
};

// const getNotesLength = notes => {
//     const noteMap = '';
//     for (let i = 0; notes.length < 241; i++) {
//         noteMap.push(i)  
//     }
//     return noteMap;
// }
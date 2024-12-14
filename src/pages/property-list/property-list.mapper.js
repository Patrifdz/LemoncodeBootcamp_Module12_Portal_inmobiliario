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

const mapPropertyFromApiToViewModel = ( property ) => {
        return {
            id: property.id,
            title: property.title,
            rooms: `${property.rooms}  ${getWord(property.rooms, 'habitación', 'habitaciones')}`,
            squareMeter: `${property.squareMeter} m2`,
            notes: `${property.notes.substring(0,240)}...`,
            price: `${property.price.toLocaleString( )} €`,
            image: Array.isArray(property.images) ? property.images[0] : '',
        }
}

export const getWord = (amount, singular, plural) => {
    return amount > 1 ? plural : singular;
};


export const mapFilterToQueryParams = filter => {
    let queryParams = '';
    
    if(filter.saleTypeId) {
        queryParams = `${queryParams}saleypeIds_like=${filter.saleTypeId}&`;
    }
    if(filter.provinceId) {
        queryParams = `${queryParams}provinceId=${filter.provinceId}&`;
    }
    if(filter.minRooms) {
        queryParams =`${queryParams}rooms_gte=${filter.minRooms}&`;
    }
    if(filter.minBathRooms) {
        queryParams = `${queryParams}bathrooms_gte=${filter.minBathRooms}&`;
    }
    if(filter.minPrice) {
        queryParams = `${queryParams}price_gte=${filter.minPrice}&`;
    }
    if(filter.minPrice) {
        queryParams = `${queryParams}price_lte=${filter.maxPrice}&`;
    }
    return queryParams.slice(0, -1);
}
/*
newProperty {
    id: string,
    title: string,
    notes: string,
    email: string,
    phone: string,
    price: number,
    saleTypes: array strings, -> será uno o varios números que se corresponderán con el id de la lista de saleTypes,
    address: string,
    city: string,
    provinceId: string, -> indicará el número que se corresponda con el id de la provincia indicada en la lista general de provincias,
    squareMeter: number,
    rooms: number,
    bathrooms: number,
    locationUrl: string,
    mainFeatures: array strings,
    equipmentsId: array strings -> serán uno o varios números que se corresponderán con el id de la lista de equipamientos,
    images: array strings,
    }
*/

export const mapNewPropertyFromViewModelToApi = ( newProperty) => {
    newProperty = {
        ...newProperty,
        price: Number(newProperty.price),
        equipmentId: newProperty.equipments,
    }
    return newProperty.map( ({ newFeature, ...rest}) => rest ) 
}

// He intentado machacar la propiedad 'id' que se genera automáticamente al crear la nueva propiedad, pero no me deja hacerlo. Quería asignarle un número que fuese continuación del número de id que tuviese la última propiedad de la lista. 
// const setId = (ListProperties) => {
//     return ListProperties.length + 1;
// }
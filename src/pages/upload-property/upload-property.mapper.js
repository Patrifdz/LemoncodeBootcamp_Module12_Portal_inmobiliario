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

// export const mapNewPropertyFromViewModelToApi = ( newProperty) => {
//     newProperty = {
//         ...newProperty,
//         price: Number(newProperty.price),
//         provinceId: newProperty.pronvince,
//         equipmentId: newProperty.equipments,
//         images: newProperty["add-image"],
//     }
//     return newProperty.map( ({ newFeature, ...rest}) => rest )
// }
export const mapNewPropertyFromViewModelToApi = (newProperty) => {
    const updatedProperty = {
        ...newProperty,
        price: Number(newProperty.price),
        squareMeter: Number(newProperty.squareMeter),
        rooms: Number(newProperty.rooms),
        bathrooms: Number(newProperty.bathrooms),
        provinceId: newProperty.province, // Corregido "pronvince" a "province"
        equipmentId: newProperty.equipments,
    };

    // Si necesitas eliminar "newFeature", puedes filtrar las claves:
    const { newFeature,  ...rest } = updatedProperty;
    return rest; // Devuelve el objeto sin "newFeature".
};


// He intentado machacar la propiedad 'id' que se genera automáticamente al crear la nueva propiedad, pero no me deja hacerlo. Quería asignarle un número que fuese continuación del número de id que tuviese la última propiedad de la lista. 
// const setId = (ListProperties) => {
//     return ListProperties.length + 1;
// }
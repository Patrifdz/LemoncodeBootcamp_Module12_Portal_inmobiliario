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

export const mapNewPropertyFromViewModelToApi = (newProperty) => {
    const updatedProperty = {
        ...newProperty,
        price: Number(newProperty.price),
        squareMeter: Number(newProperty.squareMeter),
        rooms: Number(newProperty.rooms),
        bathrooms: Number(newProperty.bathrooms),
        provinceId: newProperty.province, 
        equipmentIds: newProperty.equipments,
    };

    const { newFeature, equipments,  ...rest } = updatedProperty;
    return rest; // Devuelve el objeto sin "newFeature" y sin 'equipments' ya que estas propiedades no se usan en el objeto final guardado en servidor
};

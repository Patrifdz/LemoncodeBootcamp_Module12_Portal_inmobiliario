import { getPropertyList, getSaleTypeList, getProvinceList} from './property-list.api';
import { mapPropertyListFromApiToViewModel, mapFilterToQueryParams } from './property-list.mapper';
import { addPropertyRows, setOptions, clearPropertyRows } from './property-list.helpers';
import { roomOptions, bathroomOptions, minPriceOptions, maxPriceOptions } from './property-list.constants';
import { onUpdateField, onSubmitForm } from '../../common/helpers';

const selectId =  [
        'select-sale-type',
        'select-province',
        'select-room',
        'select-bathroom',
        'select-min-price',
        'select-max-price'
];

const selectDefaultValue =  [
    '¿Qué ventas',
    '¿Dónde?',
    '¿Habitaciones?',
    '¿Cuartos de baño?',
    '¿Precio mínimo?',
    '¿Precio máximo?'
];

Promise.all ( [
    getPropertyList( ),
    getSaleTypeList ( ),
    getProvinceList ( ),
]).then ( ( [propertyList, saleTypeList, provinceList] ) => {
    // const [propertyList, saleTypeList, provinceList] = resultList;
    const selectList = [
        saleTypeList,
        provinceList,
        roomOptions,
        bathroomOptions,
        minPriceOptions,
        maxPriceOptions
    ];
    loadPropertyList(propertyList);
    for(let i=0; i < selectList.length; i++) {
        setOptions(selectList[i], selectId[i], selectDefaultValue[i]);
    }
    // setOptions(saleTypeList, 'select-sale-type', '¿Qué ventas?');
    // setOptions(provinceList, 'select-province', '¿Dónde?');
    // setOptions(roomOptions, 'select-room', '¿Habitaciones?');
    // setOptions(bathroomOptions, 'select-bathroom', '¿Cuartos de baño?');
    // setOptions(minPriceOptions, 'select-min-price', '¿Precio mínimo?');
    // setOptions(maxPriceOptions, 'select-max-price', '¿Precio máximo?');
})

const loadPropertyList = propertyList => {
    const viewModelPropertyList = mapPropertyListFromApiToViewModel(propertyList);
    addPropertyRows(viewModelPropertyList);
};

let filters = {
    saleTypeId: '',
    provinceId: '',
    minRooms: '',
    minBathRooms: '',
    minPrice:'',
    maxPrice:'',
}

// Obtener las claves de filtros
const filterKeys = Object.keys(filters);

// Capturar valor de los campos del filtro y actualizar el valor de el objeto filters
selectId.forEach((id, index) => {
    onUpdateField(id, (event) => {
        const value = event.target.value;
        // Actualizar el objeto filters correspondiente con el valor capturado
        filters = {
            ...filters,
            [filterKeys[index]]: value,
        };
    });
});

onSubmitForm('search-button', ( ) => {
    console.log( {filters} )
    const queryParams = mapFilterToQueryParams(filters);
    clearPropertyRows( );
    getPropertyList(queryParams).then(propertyList => {
        loadPropertyList(propertyList);
    })
    
})




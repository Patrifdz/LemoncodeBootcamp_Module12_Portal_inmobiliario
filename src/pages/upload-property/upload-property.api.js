import Axios from 'axios';

const url = {
    saleType: `${process.env.BASE_API_URL}/saleTypes`,
    provinces: `${process.env.BASE_API_URL}/provinces`,
    equipments: `${process.env.BASE_API_URL}/equipments`,
    properties: `${process.env.BASE_API_URL}/properties`,
}

export const getSaleTypeList = ( ) => Axios.get(url.saleType).then(response => { return response.data });

export const getProvincesList = ( ) => Axios.get(url.provinces).then( response => { return response.data });

export const getEquipmentList = ( ) => Axios.get(url.equipments).then( response => { return response.data });

export const getPropertiesList = ( ) => Axios.get(url.properties).then( response =>{ return response.data});

export const sendDataNewProperty = (newPropertyData) => {
    return Axios.post(url.properties, newPropertyData ).then( (result) => result.data);
}


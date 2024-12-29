import Axios from 'axios';

const url = {
    saleTypes: `${process.env.BASE_API_URL}/saleTypes`,
    provinces: `${process.env.BASE_API_URL}/provinces`,
    equipments: `${process.env.BASE_API_URL}/equipments`,
    properties: `${process.env.BASE_API_URL}/properties`,
    contact:  `${process.env.BASE_API_URL}/contact`,
}

export const getSaleTypeList = ( ) => Axios.get(url.saleTypes).then(response => { return response.data });

export const getProvinceList = ( ) => Axios.get(url.provinces).then( response => { return response.data });

export const getEquipmentList = ( ) => Axios.get(url.equipments).then( response => { return response.data });

export const getPropertyList = ( ) => Axios.get(url.properties).then( response =>{ return response.data});

export const getPropertyListQueryParams = (queryParams ) => Axios.get(`${url.properties}?${queryParams}`).then( response => {
 return response.data; });

export const sendContactData = (contactData) => {
    return Axios.post(url.contact, contactData).then((result) =>result.data );
}

export const sendDataNewProperty = (newPropertyData) => {
    return Axios.post(url.properties, newPropertyData ).then( (result) => result.data);
}
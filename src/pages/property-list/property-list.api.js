import Axios  from 'axios';

const url = {
    properties: `${process.env.BASE_API_URL}/properties`,
    saleTypes: `${process.env.BASE_API_URL}/saleTypes`,
    provinces: `${process.env.BASE_API_URL}/provinces`,
}


export const getPropertyList = (queryParams ) => Axios.get(`${url.properties}?${queryParams}`).then( response => {
    return response.data; });


export const getSaleTypeList = ( ) =>  Axios.get(url.saleTypes).then(response => {  return response.data; });


export const getProvinceList = ( ) => Axios.get(url.provinces).then( response => { return response.data; });
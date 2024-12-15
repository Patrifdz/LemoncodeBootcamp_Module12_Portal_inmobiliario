import Axios from 'axios';

const url = `${process.env.BASE_API_URL}/saleTypes`;

export const getSaleTypeList = ( ) => Axios.get(url).then(response => { return response.data });


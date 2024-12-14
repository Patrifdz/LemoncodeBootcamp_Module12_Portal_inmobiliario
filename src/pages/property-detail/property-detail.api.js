import Axios from "axios";

const url = {
    properties: `${process.env.BASE_API_URL}/properties`,
    equipments:  `${process.env.BASE_API_URL}/equipments`,
} 

export const getPropertyList = ( ) => Axios.get(url.properties).then(response => {
    return response.data
});

export const getEquipmentList = ( ) =>  Axios.get(url.equipments).then(response => {  return response.data; });
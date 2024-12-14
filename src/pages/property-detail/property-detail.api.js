import Axios from "axios";

const url = {
    properties: `${process.env.BASE_API_URL}/properties`,
    equipments:  `${process.env.BASE_API_URL}/equipments`,
    contact:  `${process.env.BASE_API_URL}/contact`,
} 

export const getPropertyList = ( ) => Axios.get(url.properties).then(response => {
    return response.data
});

export const getEquipmentList = ( ) =>  Axios.get(url.equipments).then(response => {  return response.data; });

export const sendContactData = (contactData) => {
    return Axios.post(url.contact, contactData).then((result) =>result.data );
}
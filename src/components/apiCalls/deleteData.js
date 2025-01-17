import axios from "axios";
import { API_URL } from "../../AppConstant";

export const deleteUser = async (id) => {
    const response = await axios.delete(`${API_URL}users/deleteUser/${id}`);
    return response;
};

export const deleteTrip = async (id) => {
    const response = await axios.delete(`${API_URL}users/deleteTrip/${id}`);
    return response;
};

export const deleteDestination = async (id) => {
    const response = await axios.delete(`${API_URL}users/deleteDestination/${id}`);
    return response;
};

export const deleteSupplier = async (id) => {
    const response = await axios.delete(`${API_URL}users/deleteSupplier/${id}`);
    return response;
};

export const deleteAgent = async (id) => {
    const response = await axios.delete(`${API_URL}users/deleteAgent/${id}`);
    return response;
};

export const deletePayment = async (id) => {
    const response = await axios.delete(`${API_URL}users/deletePayment/${id}`);
    return response;
};

export const deleteRecon = async (id) => {
    const response = await axios.delete(`${API_URL}users/deleteRecon/${id}`);
    return response;
}

export const deleteBooking = async (id) => {
    const response = await axios.delete(`${API_URL}users/deleteBooking/${id}`);
    return response;
}
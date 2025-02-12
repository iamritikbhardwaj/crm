import axios from "axios";
import { API_URL } from "../../AppConstant";
import Swal from "sweetalert2";

export const deleteUser = async (id) => {
    Swal.fire({
        title: "Deleting...",
        text: "Please wait while we delete Data.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    const response = await axios.delete(`${API_URL}users/deleteUser/${id}`);
    Swal.close();
    return response;
};

export const deleteTrip = async (id) => {
    Swal.fire({
        title: "Deleting...",
        text: "Please wait while we delete Data.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    const response = await axios.delete(`${API_URL}users/deleteTrip/${id}`);
    Swal.close();
    return response;
};

export const deleteDestination = async (id) => {
    Swal.fire({
        title: "Deleting...",
        text: "Please wait while we delete Data.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    const response = await axios.delete(`${API_URL}users/deleteDestination/${id}`);
    Swal.close();
    return response;
};

export const deleteSupplier = async (id) => {
    Swal.fire({
        title: "Deleting...",
        text: "Please wait while we delete Data.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    const response = await axios.delete(`${API_URL}users/deleteSupplier/${id}`);
    Swal.fire();
    return response;
};

export const deleteAgent = async (id) => {
    Swal.fire({
        title: "Deleting...",
        text: "Please wait while we delete Data.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    const response = await axios.delete(`${API_URL}users/deleteAgent/${id}`);
    Swal.close();
    return response;
};

export const deletePayment = async (id) => {
    Swal.fire({
        title: "Deleting...",
        text: "Please wait while we delete Data.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    const response = await axios.delete(`${API_URL}users/deletePayment/${id}`);
    Swal.close();
    return response;
};

export const deleteRecon = async (id) => {
    Swal.fire({
        title: "Deleting...",
        text: "Please wait while we delete Data.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    const response = await axios.delete(`${API_URL}users/deleteRecon/${id}`);
    Swal.close();
    return response;
}

export const deleteBooking = async (id) => {
    Swal.fire({
        title: "Deleting...",
        text: "Please wait while we delete Data.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    const response = await axios.delete(`${API_URL}users/deleteBooking/${id}`);
    Swal.close();
    return response;
}

export const deleteVendor= async (id) => {
    Swal.fire({
        title: "Deleting...",
        text: "Please wait while we delete Data.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    const response = await axios.delete(`${API_URL}users/deleteVendor/${id}`);
    Swal.close();
    return response;
}
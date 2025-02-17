import axios from "axios";
import { API_URL } from "../../AppConstant";
import Swal from "sweetalert2";
import { fetchPayment } from "./fetchData";

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

export const deletePayment = async (id, tripId) => {
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
    const pay = await fetchPayment(tripId);
        console.log(pay, "response");
        const payment = pay.reduce((acc, item) => parseFloat(acc) + parseFloat(item.amount),0);
        const res = await axios.post(`${API_URL}users/updatePayment/?id=${tripId}`, {payment},{
          withCredentials: true,
          headers: {
            "Content-type" : "application/json"
          }
        })
        if(res){
          Swal.close();
          Swal.fire("Payment updated")
        }else{
          Swal.close();
          Swal.fire("Payment not updated")
        }
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

export const deleteBooking = async (id, reject) => {
    Swal.fire({
        title: "Deleting...",
        text: "Please wait while we delete Data.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    const response = await axios.delete(`${API_URL}users/deleteBooking/?id=${id}&reject=${reject}`);
    Swal.close();
    return response;
}

export const cancelBooking = async (id, reject) => {
  Swal.fire({
      title: "Rejecting...",
      text: "Please wait while we delete Data.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  const response = await axios.delete(`${API_URL}users/cancelBooking/?id=${id}`);
  
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
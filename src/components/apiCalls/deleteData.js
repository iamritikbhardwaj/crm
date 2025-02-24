import axios from "axios";
import { API_URL } from "../../AppConstant";
import Swal from "sweetalert2";
import { fetchPayment } from "./fetchData";
import { updateTrip } from "./updateData";

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
    const pay = await fetchPayment(tripId);
        console.log(pay, "response");
        if (pay !== null) {
          Swal.fire({
            title: "Calculating...",
            text: "Please wait while we calculate agent payment.",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
          const payment = pay.reduce((acc, item) => parseFloat(acc) + parseFloat(item.amount),0);
          const res = await updateTrip({ payment: payment }, tripId);
          if(res){
            Swal.close();
            Swal.fire("Payment updated")
          }else{
            Swal.close();
            Swal.fire("Payment not updated")
          }
          Swal.close();
        } else {
          updateTrip({payment: 0}, tripId);
          Swal.close();
        }
    return response;
};

export const deleteRecon = async (id, tripId) => {
    Swal.fire({
        title: "Deleting...",
        text: "Please wait while we delete Data.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    const response = await axios.delete(`${API_URL}users/deleteRecon/${id}`);
    await updateTrip({validation: "Sales"}, tripId);
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
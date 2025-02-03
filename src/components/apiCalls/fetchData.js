import axios from "axios";
import { API_URL } from "../../AppConstant";
import Swal from "sweetalert2";

export const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}users/getAllUsers`, {
    withCredentials: true,
    headers: {
      "content-type": "application/json",
    },
  });
  if (response.status === 200) {
    if (response.status === 200) {
      return response.data.OUTPUT;
    } else {
      alert(response.data.MESSAGE);
      return false;
    }
  } else {
    alert(response.data.MESSAGE);
    return false;
  }
};

export const fetchDestinations = async () => {
  const response = await axios.get(`${API_URL}users/getAllDestinations`, {
    withCredentials: true,
    headers: {
      "content-type": "application/json",
    },
  });
  if (response.status === 200) {
    if (response.status === 200) {
      return response.data.OUTPUT;
    } else {
      alert(response.data.MESSAGE);
      return false;
    }
  } else {
    alert(response.data.MESSAGE);
    return false;
  }
};

export const fetchSuppliers = async () => {
  const response = await axios.get(`${API_URL}users/getAllSuppliers`, {
    withCredentials: true,
    headers: {
      "content-type": "application/json",
    },
  });
  if (response.status === 200) {
    if (response.status === 200) {
      return response.data.OUTPUT;
    } else {
      alert(response.data.MESSAGE);
      return false;
    }
  } else {
    alert(response.data.MESSAGE);
    return false;
  }
};

export const fetchAgents = async () => {
  const response = await axios.get(`${API_URL}users/getAllAgents`, {
    withCredentials: true,
    headers: {
      "content-type": "application/json",
    },
  });
  if (response.status === 200) {
    return response.data.OUTPUT;
  } else {
    Swal.fire(response.data.MESSAGE);
    return false;
  }
};

export const fetchBookings = async () => {
  const response = await axios.get(`${API_URL}users/getAllBookings`, {
    withCredentials: true,
    headers: {
      "content-type": "application/json",
    },
  });
  if (response.status === 200) {
    return response.data.OUTPUT;
  } else {
    alert(response.data.MESSAGE);
    return false;
  }
};

export const fetchTrips = async (id) => {
  const response = await axios.get(`${API_URL}users/getAllTrips${id ? "/?id=" + id : ""}`, {
    withCredentials: true,
    headers: {
      "content-type": "application/json",
    },
  });
  if (response.status === 200) {
    return response.data.OUTPUT;
  } else {
    alert(response.data.MESSAGE);
    return false;
  }
};

export const fetchPayment = async () => {
  const response = await axios.get(`${API_URL}users/getAllPayments`, {
    withCredentials: true,
    headers: {
      "content-type": "application/json",
    },
  });
  if (response.status === 200) {
    return response.data.OUTPUT;
  } else {
    alert(response.data.MESSAGE);
    return false;
  }
};

export const fetchRecon = async () => {
  const response = await axios.get(`${API_URL}users/getAllRecons`, {
    withCredentials: true,
    headers: {
      "content-type": "application/json",
    },
  });
  if (response.status === 200) {
    return response.data.OUTPUT;
  } else {
    alert(response.data.MESSAGE);
    return false;
  }
};

export const fetchVendors = async () => {
  const response = await axios.get(`${API_URL}users/getAllVendors`, {
    withCredentials: true,
    headers: {
      "content-type": "application/json",
    },
  });
  if (response.status === 200) {
    return response.data.OUTPUT;
  } else {
    alert(response.data.MESSAGE);
    return false;
  }
};

export const fetchSalesDocs = async (id) => {
  const response = await axios.get(`${API_URL}users/getSalesDocs${id ? "/?id=" + id : ""}`, {
    withCredentials: true,
    headers: {
      "content-type": "application/json",
    },
  });
  if (response.status === 200) {
    return response.data.OUTPUT;
  } else {
    alert(response.data.MESSAGE);
    return false;
  }
}
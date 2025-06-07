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

export const fetchFilteredTrips = async (from, to) => {
  const response = await axios.get(`${API_URL}users/fetchFilteredTrip/?from=${from}&to=${to}`);
  if(response.status === 200) {
    return response.data.OUTPUT;
  }
}

export const fetchPayment = async (id) => {
  const response = await axios.get(`${API_URL}users/getAllPayments/?id=${id}`, {
    withCredentials: true,
    headers: {
      "content-type": "application/json",
    },
  });
  if (response.status === 200) {
    return await response.data.OUTPUT;
} else {
    return false;
  }
};

export const fetchRecon = async (id) => {
  const response = await axios.get(`${API_URL}users/getAllRecons/?id=${id}`, {
    withCredentials: true,
    headers: {
      "content-type": "application/json",
    },
  });
  if (response.status === 200) {
    return await response.data.OUTPUT;
} else {
    alert(response.data.MESSAGE);
    return false;
  }
};

export const fetchVendors = async (id) => {
  const response = await axios.get(`${API_URL}users/getAllVendors/?id=${id}`, {
    withCredentials: true,
    headers: {
      "content-type": "application/json",
    },
  });
  if (response.status === 200) {
    return await response.data.OUTPUT;
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

export const fetchDashboard = async (startDate, endDate) => {
  const response = await axios.get(`${API_URL}users/getDashData/?startDate=${startDate}&endDate=${endDate}`, {
    withCredentials: true,
    headers: {
      "content-type": "mutipart/form-data",
    },
  });
  if (response.status === 200) {
    return await response.data;
  } else {
    alert(await response.data.MESSAGE);
    return false;
  }
}

export const userSpecificDashboard = async (startDate, endDate, sales) => {
  const response = await axios.get(`${API_URL}users/userSpecificDashboard/?startDate=${startDate}&endDate=${endDate}&user=${JSON.stringify(sales)}`, {
    withCredentials: true,
    headers: {
      "content-type": "mutipart/form-data",
    },
  });
  if (response.status === 200) {
    return await response.data;
  } else {
    alert(await response.data.MESSAGE);
    return false;
  }
}

export const fetchIssues = async (tripId) => {
  const response = await axios.get(`${API_URL}users/getAllIssues?tripId=${tripId}`)
  if(response.status === 200) {
    return response.data.OUTPUT
  } else{
    Swal.fire({
      title: "Opps!",
      text: response.data.MESSAGE,
      icon: "error",
      showConfirmButton: true,
    })
  }
}

export const fetchPayLinks = async (tripId) => {
  const response = await axios.get(`${API_URL}users/getAllPaymentLinks?tripId=${tripId}`)
  if(response.status === 200) {
    return response.data.OUTPUT
  } else{
    Swal.fire({
      title: "Opps!",
      text: response.data.MESSAGE,
      icon: "error",
      showConfirmButton: true,
    })
  }
}
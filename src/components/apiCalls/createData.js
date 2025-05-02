import axios from "axios";
import { API_URL } from "../../AppConstant";
import Swal from "sweetalert2";

export const createIssue = async ( issue, tripId) => {
  const response = await axios.post(
    `${API_URL}users/createIssues?tripId=${tripId}`,
    issue,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.status === 200) {
    return response.data.OUTPUT;
  } else {
    Swal.fire({
      title: "Opps!",
      icon: "error",
      text: response.data.Message,
      showCloseButton: true,
    });
  }
};

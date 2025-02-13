import axios from "axios";
import { API_URL } from "../../AppConstant";
import Swal from "sweetalert2";

export const updateValidation = async (data, id) => {
    try {
        const response = await axios
            .post(`${API_URL}users/updateValidation/?id=${id}`, JSON.stringify(data),{
                headers: {
                    "Content-Type": "application/json",
                }
            })
        return response;
    } catch (error) {
        console.log(error);
    }
}
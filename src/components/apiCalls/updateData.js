import axios from "axios";
import { API_URL } from "../../AppConstant";

export const updateTrip = async (data, id) => {
    try {
        const response = await axios
            .post(`${API_URL}users/updateTrip/?id=${id}`, JSON.stringify(data),{
                headers: {
                    "Content-Type": "application/json",
                }
            })
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const updateVoucher = async (id) => {
    try {
        const response = await axios
            .post(`${API_URL}users/voucher/?id=${id}`,{
                headers: {
                    "Content-Type": "application/json",
                }
            })
        return response;
    } catch (error) {
        console.log(error);
    }
}
import { SercuseService } from '@services/sercuseService';
import { jwtDecode } from "jwt-decode"; // ✅ Dùng named import

export const decodeToken = async () => {
    const token = await SercuseService.get("accessToken");

    try {
        if(!token){
            throw new Error("Token is null or undefined")
        }
        const decoded = jwtDecode<any>(token);
        return decoded;
    } catch (error) {
        console.error("Error when decoding token: ", error);       
    }
};  

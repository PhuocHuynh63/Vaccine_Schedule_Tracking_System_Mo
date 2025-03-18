import { SercuseService } from '@services/sercuseService';
import jwtDecode, { JwtPayload } from 'jwt-decode'; 

export const decodeToken = async () => { 
    const token = await SercuseService.get("accessToken")
    
    try {
        const decoded = jwtDecode<any>(token);
        return decoded;
    } catch (error) {
        console.error("Lỗi khi decode token:", error);
    }
}
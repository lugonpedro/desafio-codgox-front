import { InUser } from "./Models/Input/InUser";
import { OutUser } from "./Models/Output/OutUser";
import { AxiosResponse } from "axios";

export interface IUser {
    login(
        user: InUser
    ): Promise<AxiosResponse<OutUser>>;    
}
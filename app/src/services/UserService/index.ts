import useApi from "..";
import { OutUser } from "./Models/Output/OutUser";
import { InUser } from "./Models/Input/InUser";
import { IUser } from "./Types";
import { AxiosResponse } from "axios";

export class UserAppService implements IUser {
    async login(user: InUser): Promise<AxiosResponse<OutUser>> {
        return await useApi.post("/login", user);
    }
}
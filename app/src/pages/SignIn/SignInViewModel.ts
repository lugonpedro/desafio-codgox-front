import { InUser } from "../../services/UserService/Models/Input/InUser";

export class SignInViewModel {
    constructor(readonly user: InUser) { }
    
    email() {
        if (!this.user.email || !/\S+@\S+\.\S+/.test(this.user.email)) {
            return '';
        } else {
            return this.user.email;
        }
    }

    password() {
        if (!this.user.password || this.user.password.length < 6 || !/[a-zA-Z]/.test(this.user.password) || !/\d/.test(this.user.password) || !/[!@#$%^&*]/.test(this.user.password)) {
            return '';
        } else {
            return this.user.password;
        }        
    }
}
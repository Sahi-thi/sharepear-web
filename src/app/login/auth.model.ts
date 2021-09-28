
export interface SignupResponse {
    message?: String ;
    userId?: number ;
}
export interface LoginResponse {
    message?: String ;
    access_token?: String ;
    refresh_token?:String;
    user?: User;
}
export interface LogoutResponse {
    message?: String;
}
export interface User {
    id?: number;
    name?: String ;
    email?: String ;
    proile_pic?: String ;
    user_type?: String;
    status?: String;
}

export interface User {
    _id:string;
    name: string;
    email: string;
    password: string;
    password1:string;
    date?:Date;
}
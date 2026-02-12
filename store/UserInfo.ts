import {create} from "zustand";

interface User{
    id: string;
    role: string;
    email: string;
    image: string;
    name: string;
}

interface UserInfoStructure{
    user: null | User;
    loggedIn: boolean;
    login: (user: User)=>void
    logout: ()=>void
}

export const UserInfo = create<UserInfoStructure>((set)=>({
    user: null,
    loggedIn: false,
    login: (user:User)=>{set({user:user,loggedIn:true})},
    logout: ()=>{set({user:null,loggedIn:false})}
}))
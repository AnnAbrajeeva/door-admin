export interface IUser {
    username: string;
    password: string;
  }


  export interface IUserData extends IUser{
    idToken: string | null;
    expiresIn: number
  }
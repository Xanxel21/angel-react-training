import usersMock from "../mock/users.json";
import { IUser } from "../interfaces/IUser";

export const getUsers = async (): Promise<IUser[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(usersMock as IUser[]);
        }, 300);
    });
};

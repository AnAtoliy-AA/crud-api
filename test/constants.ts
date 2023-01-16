
import config from "../config";
import { IUser } from '../src/types/types';

const { HOST, PORT, API_URL } = config;

export const TEST_API = `http://${HOST}:${PORT}/${API_URL}`;

export const mockUsers: Array<IUser> = [
    {
        "age": 18,
        "username": "some_username",
        "hobbies": ["first_hobby"]
    },
    {
        "age": 25,
        "username": "another_username",
        "hobbies": ["second_hobby"]
    },
]

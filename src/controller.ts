import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from 'fs/promises';
import { IUser } from "./types/types";

class Controller {
  static async readDataFile() {
    try {
      return await fs.readFile(path.resolve(__dirname, "./data.json"), { encoding: 'utf8' }) || '';
    } catch (err) {
      console.log(err);
    }
  }

  static async getUsers(): Promise<Array<IUser>> {
    return new Promise(async (resolve, _) => resolve(JSON.parse(await Controller.readDataFile() || "[]")));
  }

  static async getUser(id: string) {
    return new Promise(async (resolve, reject) => {
      const data_users = await Controller.getUsers()

      const user = data_users?.find((user) => user.id === id);
      if (user) {
        resolve(user);
      } else {
        reject(`user with id ${id} was not found `);
      }
    });
  }

  static async createUser(user: IUser): Promise<IUser> {
    return new Promise((resolve, reject) => {
      const { age, username, hobbies } = user;
      const requiredFieldValidation =
        typeof age === "number" &&
        typeof username === "string" &&
        Array.isArray(hobbies);

      if (requiredFieldValidation) {
        const newUser = {
          ...user,
          id: uuidv4(),
        };

        resolve(newUser);
      } else {
        if (!age || typeof age !== "number") {
          reject(`age field is required and should be number`);
        }
        if (!username || typeof username === "string") {
          reject(`username field is required and should be string`);
        }
        if (!hobbies || Array.isArray(hobbies)) {
          reject(`hobbies field is required and should be Array`);
        }
      }
    });
  }

  static async updateUser(user: IUser, id: string): Promise<IUser> {
    return new Promise(async (resolve, reject) => {
      const data_users = await Controller.getUsers();
      const data_user = data_users.find((u) => u.id === id);

      if (!data_user) {
        reject(`No user with id ${user.id} found`);
      }

      const updatedUser = { ...user, id };

      resolve(updatedUser);
    });
  }

  static async deleteUser(id: string | number) {
    return new Promise(async (resolve, reject) => {
      const data_users = await Controller.getUsers();
      const user = data_users.find((user) => user.id === id);

      if (!user) {
        reject(`No user with id ${id} found`);
      }

      resolve(`user deleted successfully`);
    });
  }
}

export default Controller;

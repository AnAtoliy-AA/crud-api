import { IUser } from "./types/types";
import http from "http";
import { ApiMethods, ApiPath, StatusCodes } from "./constants/common";
import Controller from "./controller";
import getReqData from "./utils/getReqData";
import { writeFile } from "fs";
import path from "path";
import uuidValidateV4 from "./utils/validateId";
import config from "../config";

const PORT = process.env.PORT || config.PORT || 4000

export const app = http.createServer(async (req, res) => {
  if (req.url === ApiPath.API_USERS) {
    switch (req.method) {
      case ApiMethods.GET:
        const users = await Controller.getUsers();

        res.writeHead(StatusCodes.OK, { "Content-Type": "application/json" });

        res.end(JSON.stringify(users));
        break;
      case ApiMethods.POST:
        try {
          const user_data = (await getReqData(req)) as string;

          const user = await Controller.createUser(JSON.parse(user_data));
          const data_users = await Controller.getUsers();
          data_users.push(user);

          writeFile(
            path.join(__dirname, "./data.json"),
            JSON.stringify(data_users),
            (err) => {
              if (err) {
                const message = { message: "could not persist data!" };
                res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, { "Content-Type": "application/json" });
                res.end(JSON.stringify(message, null, 2));
              } else {
                res.writeHead(StatusCodes.CREATED, { "Content-Type": "application/json" });
                res.end(JSON.stringify(data_users, null, 2));
              }
            }
          );
          res.writeHead(StatusCodes.CREATED, { "Content-Type": "application/json" });
          res.end(JSON.stringify(user));
        } catch (error) {
          res.writeHead(StatusCodes.BAD_REQUEST, { "Content-Type": "application/json" });

          res.end(JSON.stringify({ message: error }));
        }
    }
  } else if (req?.url?.includes(ApiPath.API_USERS + "/")) {
    const id = req?.url?.split("/")[3];

    if (!uuidValidateV4(id)) {
      res.writeHead(StatusCodes.BAD_REQUEST, { "Content-Type": "application/json" });
      res.end(JSON.stringify({"error": "You should use uuid for id"}));
    }

    switch (req.method) {
      case ApiMethods.GET:
        try {
          const user = await Controller.getUser(id);

          res.writeHead(StatusCodes.OK, { "Content-Type": "application/json" });

          res.end(JSON.stringify(user));
        } catch (error) {
          res.writeHead(StatusCodes.NOT_FOUND, { "Content-Type": "application/json" });

          res.end(JSON.stringify({ message: error }));
        }
        break;
      case ApiMethods.DELETE:
        try {
          let message = await Controller.deleteUser(id);
          const data_users = await Controller.getUsers();
          const filteredUsers = data_users.filter((user: IUser) => user.id !== id);

          writeFile(
            path.join(__dirname, "./data.json"),
            JSON.stringify(filteredUsers),
            (err) => {
              if (err) {
                const message = { message: "could not persist data!" };
                res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, { "Content-Type": "application/json" });
                res.end(JSON.stringify(message, null, 2));
              } else {
                res.writeHead(StatusCodes.NO_CONTENT, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message }));
              }
            }
          );
        } catch (error) {
          res.writeHead(StatusCodes.NOT_FOUND, { "Content-Type": "application/json" });

          res.end(JSON.stringify({ message: error }));
        }
        break;
      case ApiMethods.PUT:
        try {
          const user_data = (await getReqData(req)) as string;

          const updated_user = await Controller.updateUser(
            JSON.parse(user_data),
            id
          );

          const data_users = await Controller.getUsers();
          const filteredUsers = data_users.filter((user: IUser) => user.id !== id);

          filteredUsers.push(updated_user);

          writeFile(
            path.join(__dirname, "./data.json"),
            JSON.stringify(filteredUsers),
            (err) => {
              if (err) {
                const message = { message: "could not persist data!" };
                res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, { "Content-Type": "application/json" });
                res.end(JSON.stringify(message, null, 2));
              } else {
                res.writeHead(StatusCodes.OK, { "Content-Type": "application/json" });
                res.end(JSON.stringify(updated_user, null, 2));
              }
            }
          );
        } catch (error) {
          res.writeHead(StatusCodes.NOT_FOUND, { "Content-Type": "application/json" });

          res.end(JSON.stringify({ message: error }));
        }
        break;
      default:
        res.writeHead(StatusCodes.NOT_FOUND, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Incorrect method" }));
    }
  } else {
    res.writeHead(StatusCodes.NOT_FOUND, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});

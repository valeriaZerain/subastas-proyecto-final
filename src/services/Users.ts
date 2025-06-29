import jsonServerInstance from "../api/jsonServerInstance";
import { v4 as uuidv4 } from 'uuid';
import type { User } from "../interfaces/userInterface";
const USERS_URL = "users";

export const getUser = async (userName: string, password: string) => {
  try {
    const response = await jsonServerInstance.get(
      USERS_URL + "?userName=" + userName + "&password=" + password
    );
    return response.data;
  } catch (error) {
    console.error("Error searching user ", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await jsonServerInstance.get(USERS_URL);
    return response.data;
  } catch (error) {
    console.error("Error getting users", error);
    throw error;
  }
};

export const registerUser = async (
  userName: string,
  password: string,
  role: string,
  photoUrl: string,
) => {
  try {
    const response = await jsonServerInstance.post(USERS_URL, {
      id: uuidv4(),
      userName,
      password,
      role,
      photoUrl
    });

    return response.data;
  } catch (error) {
    console.error("Error registering user", error);
    throw error;
  }
};

export const updateUser = async ( user: User) => {
  try {
    const response = await jsonServerInstance.put(`${USERS_URL}/${user.id}`, user);
    return response.data;
  } catch (error) {
    console.error("Error updating user", error);
    throw error;
  }
}

export const deleteUser = async (userId: string) => {
  try {
    const response = await jsonServerInstance.delete(`${USERS_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user", error);
    throw error;
  }
}
import jsonServerInstance from "../api/jsonServerInstance";
import { v4 as uuidv4 } from 'uuid';
const USERS_URL = "users";

export const getUser = async (ci: string, birthDate: string) => {
  try {
    const response = await jsonServerInstance.get(
      USERS_URL + "?ci=" + ci + "&birthDate=" + birthDate
    );
    return response.data;
  } catch (error) {
    console.error("Error searching user by id", error);
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
  ci: string,
  birthDate: string,
  name: string,
  lastName: string,
  userPhoto: string,
  place: number
) => {
  try {
    const allUsers = await jsonServerInstance.get(USERS_URL);
    const exists = allUsers.data.some((user: any) => user.ci === ci);
    if (exists) {
      throw new Error("El usuario con este CI ya está registrado.");
    }
    const ids = allUsers.data.map((user: any) => user.id);
    const nextId = ids.length > 0 ? Math.max(...ids) + 1 : 1;

    const token = `user-token-${nextId + 1234}`;

    const response = await jsonServerInstance.post(USERS_URL, {
      id: uuidv4(),
      ci,
      role: "user",
      birthDate,
      name,
      lastName,
      placeId: place,
      hasVoted: false,
      token,
      userPhoto,
      numberPlace: import.meta.env.VITE_MESA
    });

    return response.data;
  } catch (error) {
    console.error("Error registering user", error);
    throw error;
  }
};
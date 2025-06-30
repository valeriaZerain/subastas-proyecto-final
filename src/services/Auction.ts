import jsonServerInstance from "../api/jsonServerInstance";
import { v4 as uuidv4 } from 'uuid';
const USERS_URL = "auctions";

export const getAuctions = async () => {
  try {
    const response = await jsonServerInstance.get(USERS_URL);
    return response.data;
  } catch (error) {
    console.error("Error getting auctions", error);
    throw error;
  }
};

export const createAuction = async (
  title: string,
  description: string,
  startingPrice: number,
  endTime: Date
) => {
  try {
    const response = await jsonServerInstance.post(USERS_URL, {
      id: uuidv4(),
      title,
      description,
      startingPrice,
      currentBid: startingPrice,
      endTime,
      bids: []
    });
    return response.data;
  } catch (error) {
    console.error("Error creating auction", error);
    throw error;
  }
};
import jsonServerInstance from "../api/jsonServerInstance";
import { v4 as uuidv4 } from 'uuid';
import type { Bid } from "../interfaces/bidInterface";
const BID_URL = "bids";

export const getBids = async (auctionId: string) => {
  try {
    const response = await jsonServerInstance.get(`${BID_URL}?auctionId=${auctionId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting bids", error);
    throw error;
  }
};

export const createBid = async (bid: Bid) => {
  try {
    const response = await jsonServerInstance.post(BID_URL, {
      ...bid,
      id: uuidv4(),
    });
    return response.data;
  } catch (error) {
    console.error("Error creating bid", error);
    throw error;
  }
};

export const getUserBids = async (userId: string) => {
  try {
    const response = await jsonServerInstance.get(`${BID_URL}?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting user bids", error);
    throw error;
  }
}
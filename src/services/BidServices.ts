import jsonServerInstance from "../api/jsonServerInstance";
import type { Bid } from "../interfaces/bidInterface";
import { getUserById } from "./Users";
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
      ...bid
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
    const bids = response.data;
    const user = await getUserById(userId);

    const enrichedBids = bids.map((bid: any) => ({
      ...bid,
      user: {
        id: user.id,
        name: user.name,
      },
    }));

    return enrichedBids;
  } catch (error) {
    console.error("Error getting user bids", error);
    throw error;
  }
};

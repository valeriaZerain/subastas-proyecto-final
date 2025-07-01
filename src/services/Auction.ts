import jsonServerInstance from "../api/jsonServerInstance";
import { v4 as uuidv4 } from "uuid";
import type { Auction } from "../interfaces/auctionInterface";
import { getUserBids } from "./BidServices";
import { serverSentEventInstance } from "../api/serverSentEventInstance";
const AUCTION_URL = "auctions";

export const getAuctions = async () => {
  try {
    const response = await jsonServerInstance.get(AUCTION_URL);
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
    const response = await jsonServerInstance.post(AUCTION_URL, {
      id: uuidv4(),
      title,
      description,
      startingPrice,
      currentBid: startingPrice,
      endTime,
      bids: [],
    });
    return response.data;
  } catch (error) {
    console.error("Error creating auction", error);
    throw error;
  }
};

export const updateAuction = async (id: string, data: Partial<Auction>) => {
  try {
    const response = await jsonServerInstance.patch(
      `${AUCTION_URL}/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating auction", error);
    throw error;
  }
};

export const deleteAuction = async (id: string) => {
  try {
    await jsonServerInstance.delete(`${AUCTION_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting auction", error);
    throw error;
  }
};

export const registerAuction = async (auction: Auction) => {
  try {
    const response = await jsonServerInstance.post(AUCTION_URL, auction);
    return response.data;
  } catch (error) {
    console.error("Error registering auction", error);
    throw error;
  }
};

export const getUserAuctionHistory = async (userId: string) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const userBids = await getUserBids(userId);

    if (!Array.isArray(userBids) || userBids.length === 0) {
      return [];
    }

    const auctionIds = [...new Set(userBids.map((bid: any) => bid.auctionId))];

    const auctionHistoryResponse = await jsonServerInstance.get(
      `${AUCTION_URL}?id=${auctionIds.join("&id=")}`
    );

    const userAuctionHistory = auctionHistoryResponse.data || [];

    const auctionHistoryWithBids = userAuctionHistory
      .map((auction: any) => {
        const bids = userBids.filter(
          (bid: any) => bid.auctionId === auction.id
        );

        if (bids.length === 0) return null;

        return {
          ...auction,
          bids,
        };
      })
      .filter(Boolean);

    return auctionHistoryWithBids;
  } catch (error) {
    console.error("Error getting user auction history with bids", error);
    throw error;
  }
};

export const postAuctionWinner = async (
  auctionId: string,
  winnerId: string,
  winnerName: string,
  amount: number
) => {
  try {
    const response = await jsonServerInstance.patch(
      `${AUCTION_URL}/${auctionId}`,
      { winnerId: winnerId }
    );
    await serverSentEventInstance.post("/winner", {
      auctionId,
      winnerId,
      winnerName,
      amount,
    }
  );
    return response.data;
  } catch (error) {
    console.error("Error posting auction winner", error);
    throw error;
  }
};

import { create } from "zustand";
import { getAuctions, updateAuction } from "../services/Auction";
import type { Auction } from "../interfaces/auctionInterface";

interface AuctionState {
  auctions: Auction[];
  fetchAuctions: () => void;
  updateAuctionStatus: (
    auctionId: string,
    newStatus: Auction["status"]
  ) => void;
}

export const useAuctionStore = create<AuctionState>((set) => ({
  auctions: [],
  fetchAuctions: async () => {
    try {
      const auctionsData = await getAuctions();
      set({ auctions: auctionsData });
    } catch (err) {
      console.error("Error:", err);
    }
  },

  updateAuctionStatus: async (auctionId, newStatus) => {
    try {
      await updateAuction(auctionId, { status: newStatus });
      set((state) => ({
        auctions: state.auctions.map((auction) =>
          auction.id === auctionId ? { ...auction, status: newStatus } : auction
        ),
      }));
    } catch (error) {
      console.error("Failed to update auction status", error);
    }
  },
}));

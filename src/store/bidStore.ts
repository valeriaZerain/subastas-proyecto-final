import { create } from "zustand";
import type { Bid } from "../interfaces/bidInterface";
import { getBids } from "../services/BidServices";
import { getUserById } from "../services/Users";

interface BidStore {
  bids: Bid[];
  fetchBids: (auctionId: string) => Promise<void>;
  addBid: (bid: Bid) => void;
  clearBids: () => void;
}

export const useBidStore = create<BidStore>((set) => ({
  bids: [],
  fetchBids: async (auctionId: string) => {
    try {
      const data = await getBids(auctionId);
      const enrichedBids = await Promise.all(
        data.map(async (bid: Bid) => {
          try {
            const user = await getUserById(bid.userId);
            return {
              ...bid,
              user: {
                id: user.id,
                name: user.name,
                photoUrl: user.photoUrl || "",
              },
            };
          } catch (userError) {
            console.error(`Error fetching user ${bid.userId}`, userError);
            return { ...bid };
          }
        })
      );

      set({ bids: enrichedBids });
    } catch (error) {
      console.error("Error fetching bids", error);
    }
  },
  addBid: (newBid) =>
    set((state) => {
      const exists = state.bids.some((b) => b.id === newBid.id);
      if (exists) return state;
      return { bids: [...state.bids, newBid] };
    }),
  clearBids: () => set({ bids: [] }),
}));

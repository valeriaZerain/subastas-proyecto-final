import { create } from 'zustand';
import type { Bid } from '../interfaces/bidInterface';
import { getBids } from '../services/BidServices';

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
      set({ bids: data });
    } catch (error) {
      console.error("Error fetching bids", error);
    }
  },
  addBid: (bid) => set((state) => ({ bids: [...state.bids, bid] })),
  clearBids: () => set({ bids: [] }),
}));
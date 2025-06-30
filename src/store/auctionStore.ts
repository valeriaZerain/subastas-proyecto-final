import { create } from 'zustand';
import { getAuctions } from '../services/Auction';
import type { Auction } from "../interfaces/auctionInterface";

interface AuctionState {
  auctions: Auction[];
  fetchAuctions: () => void;
}

export const useAuctionStore = create<AuctionState>((set) => ({
  auctions: [],
  fetchAuctions: async () => {
    try {
      const auctionsData = await getAuctions();
      set({ auctions: auctionsData });
    } catch (err) {
      console.error('Error:', err);
    }
}}));
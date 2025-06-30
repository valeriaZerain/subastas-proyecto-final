export interface Bid {
    id: string;
    auctionId: string;
    userId: string;
    amount: number;
    timestamp: Date;
    user?: {
        id: string;
        name: string;
    };
}
export interface Auction {
    id: string;
    title: string;
    image: string;
    description: string;
    basePrice: number;
    currentBid: number;
    startTime: Date;
    duration: number;
    status: 'actual' | 'coming' | 'finished';
    winnerId?: string;
}
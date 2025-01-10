export type Review = {
    reviewId: number;
    title: string;
    contents: string;
    nickname: string;
    stationName: string;
    insDate: string;
    isModified: boolean;
    reviewImageList: ReviewImage[];
}

type ReviewImage = {
    reviewId: number;
    imageUrl: string;
    order: number;
}
export type Review = {
    reviewId: number;
    title: string;
    contents: string;
    nickname: string;
    stationName: string;
    userEmail: string;
    insDate: string;
    isModified: boolean;
    reviewImageList: ReviewImage[];
}

export type ReviewImage = {
    reviewId: number;
    imageUrl: string;
    order: number;
}

export type ReviewProps = {
    title: string;
    contents: string;
    stationName: string;
    images: File[];
}
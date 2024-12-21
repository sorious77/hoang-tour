import {User} from "@/types/user";

export type Article = {
    id: string;
    title: string;
    description: string;
    stationName: string;
    user: User;
    photos: ArticlePhoto[];
    createdAt: Date;
    updatedAt: Date;
}

type ArticlePhoto = {
    url: string;
}
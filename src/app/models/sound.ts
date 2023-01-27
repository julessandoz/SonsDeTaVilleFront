import { Category } from './category';
import { User } from './user';
export type Sound = {
    location: {
        type: "Point",
        coordinates: [number, number]
    },
    _id: string,
    user: User,
    category: Category,
    comments: any[],
    date: Date
};
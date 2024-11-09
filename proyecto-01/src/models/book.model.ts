import { model, Schema, Document } from "mongoose";

export interface BookType extends Document {
    title: string;
    author: string;
    genre: string;
    publisher: string;
    publishedDate: string;
    availability: boolean;
    isDisabled: boolean;
    reservationHistory: { reservedBy: string; reservedAt: Date; deliveredAt?: Date }[];
}

const BookSchema = new Schema<BookType>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publisher: { type: String, required: true },
    publishedDate: { type: String, required: true },
    availability: { type: Boolean, default: true },
    isDisabled: { type: Boolean, default: false },
    reservationHistory: [
        {
            reservedBy: { type: String, required: true },
            reservedAt: { type: Date, required: true },
            deliveredAt: { type: Date }
        }
    ]
}, { timestamps: true, versionKey: false });

export const BookModel = model<BookType>("Book", BookSchema);

import { model, Schema, Document } from "mongoose";

export interface UserType extends Document {
    name: string;
    email: string;
    password: string;
    role: "admin" | "librarian" | "user";
    isDisabled: boolean;
    reservationHistory: { bookId: string; reservedAt: Date; deliveredAt?: Date }[];
}

const UserSchema = new Schema<UserType>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "librarian", "user"], default: "user" },
    isDisabled: { type: Boolean, default: false },
    reservationHistory: [
        {
            bookId: { type: String, required: true },
            reservedAt: { type: Date, required: true },
            deliveredAt: { type: Date }
        }
    ]
}, { timestamps: true, versionKey: false });

export const UserModel = model<UserType>("User", UserSchema);

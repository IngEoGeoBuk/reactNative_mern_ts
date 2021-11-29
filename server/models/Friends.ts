import mongoose, { model, Model, Schema } from "mongoose"

interface FriendModel {
    name: String,
    age: Number,
    description?: String
}

const FriendsSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

export const FriendModel: Model<FriendModel> = mongoose.models.friends || model('friends', FriendsSchema);
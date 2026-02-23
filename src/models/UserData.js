import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    metadata: {
      type: Object,
      default: {},
    },
    // Track user activity
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
    totalMessages: {
      type: Number,
      default: 0,
    },
    totalCalls: {
      type: Number,
      default: 0,
    },
    onlineStatus: {
      type: String,
      enum: ["online", "offline", "away"],
      default: "offline",
    },
    deviceInfo: {
      type: Object,
      default: {},
    },
    location: {
      type: String,
      default: "",
    },
    ip: {
      type: String,
      default: "",
    },
    route: {
      type: String,
      default: "",
    },
    // Session tracking
    sessionStart: {
      type: Date,
      default: Date.now,
    },
    sessionDuration: {
      type: Number, // in minutes
      default: 0,
    },
    // Chat statistics
    chatPartners: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      messageCount: {
        type: Number,
        default: 0,
      },
      lastInteraction: {
        type: Date,
        default: Date.now,
      },
    }],
    // App usage tracking
    pagesVisited: [{
      page: String,
      visitCount: { type: Number, default: 0 },
      lastVisit: { type: Date, default: Date.now },
      timeSpent: { type: Number, default: 0 }, // in seconds
    }],
    // Interaction tracking
    clicks: {
      type: Number,
      default: 0,
    },
    scrolls: {
      type: Number,
      default: 0,
    },
    // Media tracking
    imagesShared: {
      type: Number,
      default: 0,
    },
    filesShared: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const UserData = mongoose.model("UserData", userDataSchema);

export default UserData;

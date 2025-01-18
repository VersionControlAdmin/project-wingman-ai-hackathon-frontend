export interface Profile {
  id: number;
  name: string;
  age: number;
  city: string;
  bio: string;
  avatar: string;
  conversation: {
    sender: "user" | "match";
    text: string;
  }[];
  aiRecommendation: {
    isMatch: boolean;
    reason: string;
  };
}

export const mockProfiles: Profile[] = [
  {
    id: 1,
    name: "Sarah",
    age: 28,
    city: "Seattle",
    bio: "Coffee enthusiast, hiking lover, and tech professional",
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    conversation: [
      { sender: "user", text: "Hi! I noticed you're into hiking too!" },
      { sender: "match", text: "Yes! Love exploring new trails 🏃‍♀️" },
      { sender: "user", text: "What's your favorite hiking spot?" },
      { sender: "match", text: "Mount Rainier! The views are incredible 🏔️" },
    ],
    aiRecommendation: {
      isMatch: true,
      reason: "Strong shared interests in outdoor activities and similar lifestyle preferences.",
    },
  },
  {
    id: 2,
    name: "Michael",
    age: 31,
    city: "Portland",
    bio: "Software engineer by day, musician by night",
    avatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    conversation: [
      { sender: "user", text: "Hey! I see you're into coding too!" },
      { sender: "match", text: "Absolutely! Currently working with React 💻" },
      { sender: "user", text: "No way! Me too! What's your favorite framework?" },
      { sender: "match", text: "Next.js all the way! Love the DX 🚀" },
    ],
    aiRecommendation: {
      isMatch: true,
      reason: "Perfect tech background match with shared programming interests.",
    },
  },
];
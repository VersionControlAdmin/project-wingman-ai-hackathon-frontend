export interface Message {
  sender: "user" | "match";
  text: string;
}

export interface AIRecommendation {
  isMatch: boolean;
  reason: string;
}

export interface MatchProfile {
  id: number;
  name: string;
  age: number;
  city: string;
  bio: string;
  avatar: string;
  conversation: Message[];
  aiRecommendation: AIRecommendation;
}
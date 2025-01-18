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
      reason: "Deep compatibility detected in outdoor activities and lifestyle choices. Both share a passion for hiking and adventure, with complementary energy levels and goals. Their mutual appreciation for nature and physical activities suggests strong potential for shared experiences and growth.",
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
      reason: "Strong intellectual and creative alignment. Both demonstrate technical prowess with a creative outlet through music, suggesting a balanced personality. Their shared understanding of technology and appreciation for artistic expression indicates potential for deep, meaningful connections.",
    },
  },
  {
    id: 3,
    name: "Emma",
    age: 27,
    city: "Vancouver",
    bio: "Culinary artist exploring flavors & cultures",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    conversation: [
      { sender: "user", text: "Your food photography is amazing!" },
      { sender: "match", text: "Thank you! I love capturing the essence of each dish ✨" },
      { sender: "user", text: "What cuisine inspires you the most?" },
      { sender: "match", text: "Japanese fusion! The attention to detail is incredible 🍱" },
    ],
    aiRecommendation: {
      isMatch: true,
      reason: "Remarkable synergy in cultural appreciation and creative expression. Their shared passion for culinary arts and photography indicates a deep appreciation for aesthetics and experiences. Both show curiosity about different cultures, suggesting potential for rich, explorative relationship dynamics.",
    },
  },
  {
    id: 4,
    name: "Alex",
    age: 29,
    city: "Austin",
    bio: "Startup founder, AI enthusiast, coffee addict",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    conversation: [
      { sender: "user", text: "Fascinating work with AI startups!" },
      { sender: "match", text: "Thanks! It's amazing how AI is changing everything 🤖" },
      { sender: "user", text: "What's your take on AI ethics?" },
      { sender: "match", text: "It's crucial to balance innovation with responsibility 🎯" },
    ],
    aiRecommendation: {
      isMatch: false,
      reason: "While both share interests in technology and innovation, there are fundamental differences in their approaches to work-life balance and long-term goals. Their intense focus on career advancement might create challenges in maintaining a balanced relationship.",
    },
  },
  {
    id: 5,
    name: "Luna",
    age: 26,
    city: "Miami",
    bio: "Marine biologist & environmental activist",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    conversation: [
      { sender: "user", text: "Your ocean conservation work is inspiring!" },
      { sender: "match", text: "Thank you! It's my life's passion 🌊" },
      { sender: "user", text: "What's the most urgent ocean issue?" },
      { sender: "match", text: "Definitely coral reef preservation 🐠" },
    ],
    aiRecommendation: {
      isMatch: true,
      reason: "Exceptional alignment in values and life purpose. Both demonstrate strong commitment to environmental causes and share a deep connection to nature. Their complementary approaches to activism and education suggest a powerful potential for both personal and professional synergy.",
    },
  }
];
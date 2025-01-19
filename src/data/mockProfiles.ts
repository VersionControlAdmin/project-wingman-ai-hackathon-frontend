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
    bio: "Passionate about making a positive impact. Love deep conversations about life, purpose, and growth.",
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    conversation: [
      {
        sender: "match",
        text: "What drives you the most in life? I'm curious about what motivates you to wake up every morning with purpose.",
      },
      {
        sender: "user",
        text: "That's a profound question. For me, it's the belief that we can leave the world better than we found it. I've always felt that personal growth and helping others grow are deeply interconnected. What about you?",
      },
      {
        sender: "match",
        text: "I resonate with that deeply. My drive comes from wanting to create meaningful connections and inspire positive change. I believe that every small action can ripple out to create larger impact. How do you see your personal values playing into this?",
      },
      {
        sender: "user",
        text: "Family has shaped my values significantly. Growing up, I watched my parents prioritize integrity and compassion over material success. It taught me that true fulfillment comes from living authentically and supporting others. Do you have similar influences in your life?",
      },
      {
        sender: "match",
        text: "Yes, absolutely. My grandmother was a huge influence. She taught me that resilience isn't just about personal strength, but about building communities that support each other. It's made me think a lot about the kind of legacy I want to leave. Have you thought about your legacy?",
      },
      {
        sender: "user",
        text: "That's beautiful about your grandmother. Legacy to me is about the lives we touch and the positive changes we inspire. I hope to create ripples of kindness and growth that continue long after I'm gone. Speaking of community, how do you see yourself contributing to yours?",
      },
      {
        sender: "match",
        text: "I'm actively involved in mentoring young professionals and volunteering at local education initiatives. I believe education and empowerment are key to building stronger communities. It's amazing how teaching others often leads to our own greatest learnings. What's your approach to continuous learning?",
      },
      {
        sender: "user",
        text: "I love that you're involved in mentoring! I believe learning happens in every interaction - whether through books, conversations like this one, or simply being present in nature. It's about staying curious and open to new perspectives. How do you maintain balance while pursuing these meaningful goals?",
      },
      {
        sender: "match",
        text: "Balance is crucial. I practice mindfulness daily and make time for both solitude and meaningful connections. It helps me stay grounded while pursuing ambitious goals. I'm curious - how do you envision your ideal future, both personally and in terms of impact?",
      },
      {
        sender: "user",
        text: "My ideal future involves creating spaces where people feel empowered to grow and connect authentically. Personally, I want to build deep, meaningful relationships while continuing to learn and evolve. It sounds like we share similar values about growth and impact.",
      },
      {
        sender: "match",
        text: "We really do. It's refreshing to have such a deep conversation about what truly matters. Your perspective on personal growth and community impact aligns beautifully with what I'm looking for in a partner. Would you be interested in continuing this conversation over coffee?",
      },
      {
        sender: "user",
        text: "I would love that! This conversation has been incredibly engaging, and I'd really enjoy exploring these topics further in person. Your thoughtful approach to life and commitment to making a difference is truly inspiring.",
      },
      {
        sender: "match",
        text: "Perfect! I know a great local café that supports fair trade and sustainable practices. It seems fitting given our conversation about values and impact. When would work best for you?",
      },
      {
        sender: "user",
        text: "That sounds perfect! I love that even your choice of café aligns with your values. How about this Saturday afternoon?",
      },
    ],
    aiRecommendation: {
      isMatch: true,
      reason:
        "Exceptional alignment in core values, life philosophy, and long-term vision. Both individuals demonstrate deep reflection, emotional intelligence, and a genuine commitment to personal growth and positive social impact. Their communication style shows mutual respect, curiosity, and authentic engagement. Strong potential for a meaningful, growth-oriented partnership.",
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
      {
        sender: "user",
        text: "No way! Me too! What's your favorite framework?",
      },
      { sender: "match", text: "Next.js all the way! Love the DX 🚀" },
    ],
    aiRecommendation: {
      isMatch: true,
      reason:
        "Strong intellectual and creative alignment. Both demonstrate technical prowess with a creative outlet through music, suggesting a balanced personality. Their shared understanding of technology and appreciation for artistic expression indicates potential for deep, meaningful connections.",
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
      {
        sender: "match",
        text: "Thank you! I love capturing the essence of each dish ✨",
      },
      { sender: "user", text: "What cuisine inspires you the most?" },
      {
        sender: "match",
        text: "Japanese fusion! The attention to detail is incredible 🍱",
      },
    ],
    aiRecommendation: {
      isMatch: true,
      reason:
        "Remarkable synergy in cultural appreciation and creative expression. Their shared passion for culinary arts and photography indicates a deep appreciation for aesthetics and experiences. Both show curiosity about different cultures, suggesting potential for rich, explorative relationship dynamics.",
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
      {
        sender: "match",
        text: "Thanks! It's amazing how AI is changing everything 🤖",
      },
      { sender: "user", text: "What's your take on AI ethics?" },
      {
        sender: "match",
        text: "It's crucial to balance innovation with responsibility 🎯",
      },
    ],
    aiRecommendation: {
      isMatch: false,
      reason:
        "While both share interests in technology and innovation, there are fundamental differences in their approaches to work-life balance and long-term goals. Their intense focus on career advancement might create challenges in maintaining a balanced relationship.",
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
      reason:
        "Exceptional alignment in values and life purpose. Both demonstrate strong commitment to environmental causes and share a deep connection to nature. Their complementary approaches to activism and education suggest a powerful potential for both personal and professional synergy.",
    },
  },
  {
    id: 6,
    name: "Marie",
    age: 29,
    city: "Berlin",
    bio: "Tech entrepreneur, yoga enthusiast, and avid reader",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    conversation: [
      { sender: "match", text: "Hi! I noticed you're into entrepreneurship!" },
      { sender: "user", text: "Yes! I love building innovative solutions." },
      {
        sender: "match",
        text: "That's fascinating! What sector are you focusing on?",
      },
      {
        sender: "user",
        text: "Currently working on AI-driven healthcare solutions.",
      },
      {
        sender: "match",
        text: "Healthcare tech is booming! Any specific problem you're solving?",
      },
      {
        sender: "user",
        text: "We're developing predictive analytics for patient care.",
      },
      {
        sender: "match",
        text: "That could really impact lives! How's the progress?",
      },
      { sender: "user", text: "We're in beta testing with several clinics." },
      {
        sender: "match",
        text: "Amazing! Do you also practice yoga to balance the startup stress?",
      },
      { sender: "user", text: "Absolutely! It keeps me grounded and focused." },
    ],
    aiRecommendation: {
      isMatch: true,
      reason:
        "Strong alignment in entrepreneurial spirit and wellness practices. Both demonstrate a passion for innovation and maintaining work-life balance through yoga. Their complementary approaches to business and personal growth suggest excellent potential for a meaningful connection.",
    },
  },
];

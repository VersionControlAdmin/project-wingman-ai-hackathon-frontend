import axios from "axios";

// Base URL configuration
const API_BASE_URL = "http://127.0.0.1:5000";
axios.defaults.baseURL = API_BASE_URL;

// Shared state
let contextDialogue = {};

// Helper function
const convertHexToBlob = (hex: string): Blob => {
  return new Blob(
    [
      Uint8Array.from(
        hex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
      ),
    ],
    { type: "audio/mpeg" }
  );
};

// Interview endpoints
export const interviewApi = {
  startInterview: async () => {
    try {
      const { data } = await axios.get("/interview/start-interview", {
        headers: { "Content-Type": "application/json" },
      });

      contextDialogue = data.context_dialogue;
      const audioBlob = convertHexToBlob(data.audio_data);
      const audioURL = URL.createObjectURL(audioBlob);

      return { audioURL, contextDialogue };
    } catch (error) {
      console.error("Error starting the interview:", error);
      throw error;
    }
  },

  getNextQuestion: async (audioFile: File) => {
    try {
      const formData = new FormData();
      formData.append("audio", audioFile);
      formData.append("metadata", JSON.stringify(contextDialogue));

      const { data, status } = await axios.post(
        "/interview/next-question",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (status === 201) {
        return { isComplete: true };
      }

      contextDialogue = data.context_dialogue;
      const audioBlob = convertHexToBlob(data.audio_data);
      const audioURL = URL.createObjectURL(audioBlob);

      return { audioURL, contextDialogue, isComplete: false };
    } catch (error) {
      console.error("Error getting the next question:", error);
      throw error;
    }
  },
};

// Matches endpoints
export const matchesApi = {
  fetchMatches: async () => {
    try {
      const { data } = await axios.get("/matches/get-matches", {
        headers: { "Content-Type": "application/json" },
      });
      return data;
    } catch (error) {
      console.error("Failed to fetch matches:", error);
      throw error;
    }
  },

  askQuestion: async (
    dialogueHistory: any,
    question: string,
    userId: number
  ) => {
    try {
      const { data } = await axios.post(
        "/matches/ask-question",
        {
          dialogue_history: dialogueHistory,
          question: question,
          user_id: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Failed to ask question:", error);
      throw error;
    }
  },
};

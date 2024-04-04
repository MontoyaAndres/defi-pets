import axios from "axios";

export default async function handler(req, res) {
  try {
    const dividedMessages = (req?.body?.chat_history || []).reduce(
      (acc, curr, index, src) => {
        if (curr.type === "ai") {
          acc.push([curr.message, src[index + 1]?.message]);
        }
        return acc;
      },
      []
    );

    const payload = {
      question: req.body.question || "",
      chat_history: dividedMessages || [],
      knowledge_source_id: process.env.FLOCK_API_ID,
    };
    const headers = {
      "x-api-key": process.env.FLOCK_API_KEY,
    };

    const response = await axios.post(
      `https://rag-chat-ml-backend-prod.flock.io/chat/conversational_rag_chat`,
      payload,
      {
        headers,
      }
    );

    return res.json(response?.data);
  } catch (error) {
    console.error("error", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

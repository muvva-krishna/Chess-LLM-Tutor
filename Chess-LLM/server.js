const express = require("express");
const path = require("path");
const { Groq } = require("groq-sdk");
require("dotenv").config();

const app = express();
const PORT = 2000;

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/groq-text", async (req, res) => {
  const {
    FEN_INPUT,
    PGN_INPUT,
    BEST_MOVE_INPUT,
    SEQUENCE_OF_BEST_MOVES_INPUT,
    ALTERNATIVE_MOVE_1,
    ALTERNATIVE_MOVE_2,
    PLAYER_INPUT,
  } = req.body;

  console.log("Received values for Groq text generation:");
  console.log("FEN_INPUT:", FEN_INPUT);
  console.log("PGN_INPUT:", PGN_INPUT);
  console.log("BEST_MOVE_INPUT:", BEST_MOVE_INPUT);
  console.log("SEQUENCE_OF_BEST_MOVES_INPUT:", SEQUENCE_OF_BEST_MOVES_INPUT);
  console.log("ALTERNATIVE_MOVE_1:", ALTERNATIVE_MOVE_1);
  console.log("ALTERNATIVE_MOVE_2:", ALTERNATIVE_MOVE_2);
  console.log("PLAYER_INPUT:", PLAYER_INPUT);

  const system_content = `You are a chess-tutor and your aim is to provide a comprehensive chess analysis session. Based on the current FEN position: ${FEN_INPUT} and the current PGN: ${PGN_INPUT}, Stockfish recommends ${BEST_MOVE_INPUT} for ${PLAYER_INPUT} as the best move. And Stockfish also provides ${SEQUENCE_OF_BEST_MOVES_INPUT} but only use this for your understanding to explain the ${BEST_MOVE_INPUT}. Here's how to understand and optimize this move:
  - Development and Control: Evaluate how ${BEST_MOVE_INPUT} contributes to the development of ${PLAYER_INPUT}'s pieces and control over key squares, ensuring it aligns with the opening and middle game principles.
  - Coordination: Assess the improvement in the coordination between your pieces due to ${BEST_MOVE_INPUT}, which is crucial for setting up effective strategies and defenses.
  - Tactical Insights: 
    * Forks: Check if ${BEST_MOVE_INPUT} can lead to potential forks.
    * Pins: Look for opportunities where the move could exploit or create pins.
    * Skewers: Determine if ${BEST_MOVE_INPUT} could result in skewers.
    * Discovered Attacks: Explore the possibility of initiating a discovered attack with ${BEST_MOVE_INPUT}.
    * Double Attacks: Consider if ${BEST_MOVE_INPUT} allows for double attacks, particularly those that check the king and threaten another piece.
  - Defensive Strategy: Ensure that ${BEST_MOVE_INPUT} helps in maintaining a solid defensive posture, addressing any vulnerabilities and preparing for the opponent’s possible counters.
  - Alternatives and Drawbacks: Examine alternative moves and their potential drawbacks. Compare the strategic and tactical merits of ${BEST_MOVE_INPUT} against other viable moves like ${ALTERNATIVE_MOVE_1} and ${ALTERNATIVE_MOVE_2}, highlighting why ${BEST_MOVE_INPUT} might be superior only if it is much better.
  By integrating these analyses, you gain a deeper understanding of the move's strategic and tactical implications, helping you make informed decisions and improve your overall chess skills.`;

  const user_content = `FEN_INPUT = ${FEN_INPUT},
  PGN_INPUT = ${PGN_INPUT},
  BEST_MOVE_INPUT = ${BEST_MOVE_INPUT},
  SEQUENCE_OF_BEST_MOVES_INPUT = ${SEQUENCE_OF_BEST_MOVES_INPUT},
  ALTERNATIVE_MOVE_1 = ${ALTERNATIVE_MOVE_1},
  ALTERNATIVE_MOVE_2 = ${ALTERNATIVE_MOVE_2},
  PLAYER_INPUT = ${PLAYER_INPUT}
  Explain why it is the best move, with a concise yet comprehensive explanation in points`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: system_content },
        { role: "user", content: user_content },
      ],
      model: "llama3-70b-8192",
      temperature: 0,
      max_tokens: 1024,
      top_p: 1,
      stop: null,
      stream: false,
    });
    res.json({ content: chatCompletion.choices[0]?.message?.content || "" });
  } catch (error) {
    console.error("Error fetching Groq text:", error);
    res.status(500).json({ error: "Error fetching Groq text" });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

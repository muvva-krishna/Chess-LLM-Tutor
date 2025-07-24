<img width="1918" height="1017" alt="image" src="https://github.com/user-attachments/assets/0685f25c-63eb-4a52-8071-98312e4efd78" />

-----

# AI-Powered Chess Tutor ♟️

Welcome to the AI-Powered Chess Tutor, a web-based application designed to help you improve your chess skills by providing not just strong computer opponents, but also detailed, human-like explanations for the best moves in any given position.

This project combines the raw analytical power of the **Stockfish** chess engine with the advanced natural language capabilities of the **Groq API (running LLaMA 3)** to create a unique and effective learning experience.

## 🎯 Objective

The primary goal of this project is to bridge the gap between traditional chess engines and human understanding. While engines like Stockfish can tell you the best move, they don't explain *why* it's the best move in a way that's intuitive for learners. This AI Tutor solves that problem by:

1.  **Analyzing** the position with the Stockfish engine to find the optimal moves.
2.  **Sending** this data to the Groq API.
3.  **Generating** a rich, contextual explanation that covers the strategic and tactical reasons behind the best move, making complex chess concepts easier to grasp.

Whether you're a beginner learning the basics or an advanced player looking to refine your positional understanding, this tool provides personalized feedback to elevate your game.

-----

## ✨ Features

  - **Play Against AI**: Challenge the Stockfish engine with multiple difficulty levels, from beginner to ultimate.
  - **Real-time Analysis**: See the top engine moves and the board evaluation (centipawn score) updated in real-time.
  - **AI-Generated Explanations**: Click the "Get Explanation" button at any time to receive a detailed breakdown of the best move, its purpose, and how it compares to other options.
  - **Endgame Trainer**: Use the `endgame.html` page to set up custom positions using FEN strings and practice specific endgame scenarios.
  - **Interactive Interface**: A clean and simple UI built with `chessboard.js` that allows for easy move input, game resets, and move history tracking (PGN and FEN).
  - **Undo Moves**: Made a mistake? Easily take back your last move and try a different line.
  - **Custom Position Setup**: Paste any FEN (Forsyth-Edwards Notation) string to set up a specific board position and play or analyze from that point. This is perfect for studying specific openings, analyzing   your       own games, or practicing tactics.

-----

## ⚙️ How It Works

The application has a client-server architecture that leverages several key technologies:

#### Frontend (Client-Side)

  - **`index.html`**: The landing page where users select a difficulty level or navigate to other modes.
  - **`game.html`**: The main game interface.
      - **`chessboard.js`**: Renders the interactive chessboard.
      - **`chess.js`**: Handles game logic, move validation, and PGN/FEN generation.
      - **`stockfish.js`**: The powerful Stockfish engine compiled to WebAssembly, running directly in the browser to analyze positions and provide the best moves without server load.
  - **`endgame.html`**: A dedicated page for setting up and practicing endgame positions.
  - **`styles.css`**: Provides the visual styling for the application.

#### Backend (Server-Side)

  - **`server.js`**: A simple Node.js server using the **Express** framework.
      - It exposes a single API endpoint (`/groq-text`).
      - When the user requests an explanation, the frontend sends the current game state (FEN, PGN, best moves from Stockfish) to this endpoint.
      - The server then securely communicates with the **Groq API**, sending a carefully crafted prompt to the **LLaMA 3** model.
      - Groq's AI generates the textual explanation, which the server sends back to the frontend to be displayed to the user.

#### The Workflow

1.  The user plays a move on the board in `game.html`.
2.  The browser-based **Stockfish engine** analyzes the new position and displays the evaluation and top 3 moves.
3.  The user clicks **"Get Explanation"**.
4.  A `fetch` request is sent from the client to the Node.js server with the current FEN, PGN, and best moves.
5.  The Node.js server forwards this information in a prompt to the **Groq API**.
6.  Groq's LLaMA 3 model processes the prompt and returns a detailed explanation.
7.  The server sends this explanation back to the client, where it's displayed to the user.

-----

## 🚀 Getting Started

To run this project locally, follow these steps:

#### Prerequisites

  - [Node.js](https://nodejs.org/) installed on your machine.
  - A Groq API key. You can get one for free from the [Groq Console](https://console.groq.com/keys).

#### Installation

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd <repository-directory>
    ```

2.  **Install backend dependencies:**

    ```bash
    npm install
    ```

    This will install `express`, `groq-sdk`, and `dotenv`.

3.  **Set up your environment variables:**

      - Create a file named `.env` in the root of the project.
      - Add your Groq API key to it:

    <!-- end list -->

    ```
    GROQ_API_KEY=your_groq_api_key_here
    ```

4.  **Run the server:**

    ```bash
    node server.js
    ```

    The server will start on port `2000`. You should see `Server is running on port 2000` in your console.

5.  **Launch the application:**

      - Open the `index.html` file in your web browser. You can do this by right-clicking it and selecting "Open with Live Server" in VS Code or by simply double-clicking the file.

You can now select a difficulty and start playing and learning\!

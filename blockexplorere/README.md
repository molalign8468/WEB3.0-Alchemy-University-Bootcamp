# React Blockchain Explorer

A simple and intuitive **React-based Blockchain Explorer** that allows users to search for and view details of transactions, blocks, and addresses on the Ethereum Mainnet. This project leverages the **Alchemy SDK** for efficient interaction with the blockchain.

## Features

- **Overview Dashboard:** Displays key real-time blockchain metrics such as the latest block number, average gas price, network hash rate, and total transactions.

- **Search Functionality:** Easily search for:

  - **Transaction Hashes (TxHash):** View detailed information about specific transactions.

  - **Block Numbers:** Explore details of individual blocks, including miner, timestamp, and gas usage.

  - **Wallet Addresses:** See address balances, token holdings, and recent asset transfers.

- **Responsive UI:** Designed to provide a seamless experience across various devices.

- **Loading Indicators & Messages:** Provides visual feedback during data fetching and informs users about search outcomes or errors.

## Technologies Used

- **React.js:** A JavaScript library for building user interfaces.

- **Alchemy SDK:** A powerful and reliable SDK for interacting with the Ethereum blockchain.

- **Tailwind CSS:** A utility-first CSS framework for rapid UI development (inferred from `className` usage in the code).

## Setup

To run this project locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/molalign8468/WEB3.0-Alchemy-University-Bootcamp.git
    cd blockexplorer
    ```

2.  **Install dependencies:**

    ```bash
    npm install

    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root of your project and add your Alchemy API Key:

    ```
    REACT_APP_ALCHEMY_API_KEY=YOUR_ALCHEMY_API_KEY
    ```

    You can get a free Alchemy API key by signing up at [alchemy.com](https://www.alchemy.com/).

4.  **Start the development server:**

    ```bash
    npm start
    # or
    yarn start
    ```

    The application will typically open in your browser at `http://localhost:3000`.

## Usage

---

- Upon launching the application, you will see an **overview** of the Ethereum Mainnet.
- Use the **search bar** at the top to enter a **Transaction Hash**, **Block Number**, or **Wallet Address**.
- Press **Enter** or click the search button to view the respective details.
- The application will display loading messages and relevant data based on your query. If an invalid query is entered, an error message will appear.

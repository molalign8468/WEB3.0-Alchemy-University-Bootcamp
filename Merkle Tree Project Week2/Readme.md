# Merkle Tree Gift List 🎁

Welcome to the **Merkle Tree Gift List** project! gift-giving application where the server can verify if a user is eligible for a gift **without storing the entire list of names**. Instead, the server only stores a single 32-byte Merkle root, and clients must prove their eligibility using cryptographic proofs.

---

## 📖 Overview

The goal is to create a system where:

- **Clients** (users) can prove their name is on the gift list by sending a **Merkle proof**.
- **Servers** validate the proof using only the stored 32-byte Merkle root.

This leverages **Merkle trees** to cryptographically verify data integrity without exposing the full list.

---

## 🚀 Features

- **Client-Side Proof Generation**: Users generate proofs to show their name is on the list.
- **Server-Side Verification**: The server validates proofs using the Merkle root.
- **Minimal Server Storage**: The server stores only **32 bytes** (the Merkle root).

---

## ⚙️ Technologies

- **Merkle Trees** (using `MerkleTree.js` from `/utils`)
- **SHA-256** hashing (via `ethereum-cryptography`)
- Node.js/Express for the server

---

## 🛠️ Prerequisites

- Node.js (v14+)

- Basic understanding of Merkle trees .

---

## 🏁 Getting Started

1. **Clone the Starter Code**:
   ```bash
   git clone https://github.com/molalign8468/WEB3.0-Alchemy-University-Bootcamp.git
   cd Merkle Tree Project Week2
   ```
2. **For Server**:

   ```bash
   nodemon .\app.js

   ```

3. **For Client**:

   ```bash
   node .\index.js
   ```

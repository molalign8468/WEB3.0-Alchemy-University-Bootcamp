import React, { useState, useEffect } from "react";
import DetailCard from "./DetailCard";
const TransactionDetails = ({ tx, onSearch }) => (
  <DetailCard title="Transaction Details" data={tx} onSearch={onSearch} />
);
export default TransactionDetails;

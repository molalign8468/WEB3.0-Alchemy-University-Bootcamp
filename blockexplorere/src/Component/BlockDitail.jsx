import React, { useState, useEffect } from "react";

import DetailCard from "./DetailCard";
const BlockDetails = ({ block, onSearch }) => (
  <DetailCard title="Block Details" data={block} onSearch={onSearch} />
);
export default BlockDetails;

import express from "express";

const app = express();
const port = 4002;

const orders = [
  { process: "Washing", stage: "Prepare" },
  { process: "Washing", stage: "Produce" },
  { process: "Packing", stage: "Prepare" }
];

app.get("/orders/count", (req, res) => {
  const { process, stage } = req.query;

  const count = orders.filter(
    o => o.process === process && o.stage === stage
  ).length;

  res.json({ process, stage, count });
});

app.listen(port, () => {
  console.log(`order-service running on http://localhost:${port}`);
});

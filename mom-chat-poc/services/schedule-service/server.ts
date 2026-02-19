import express from "express";

const app = express();
const port = 4001;

const planningData = [
  { line: "SANPAC1", date: "2026-02-17", time: "08:00", task: "Pack batch B-1201" },
  { line: "SANPAC1", date: "2026-02-17", time: "13:30", task: "Pack batch B-1202" },
  { line: "SANWAS2", date: "2026-02-17", time: "15:30", task: "Wash batch W-9001" }
];

app.get("/planning", (req, res) => {
  const { line, date } = req.query;
  const result = planningData.filter(
    p => p.line === line && p.date === date
  );
  res.json({ line, date, rows: result });
});

app.listen(port, () => {
  console.log(`schedule-service running on http://localhost:${port}`);
});

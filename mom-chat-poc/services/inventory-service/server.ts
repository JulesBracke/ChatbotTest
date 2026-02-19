import express from "express";

const app = express();
const port = 4003;

const containers = [
  { id: "C-456", location: "Reception Storage A1" },
  { id: "C-789", location: "Automatic Warehouse B3" }
];

app.get("/containers/:id/location", (req, res) => {
  const container = containers.find(c => c.id === req.params.id);

  if (!container) {
    return res.status(404).json({ error: "Container not found" });
  }

  res.json(container);
});

app.listen(port, () => {
  console.log(`inventory-service running on http://localhost:${port}`);
});

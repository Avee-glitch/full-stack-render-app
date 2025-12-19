const express = require("express");
const router = express.Router();

// ---------------- MOCK DATA ----------------

let cases = [
  {
    id: "1",
    title: "AI hiring bias against minorities",
    category: "bias",
    severity: "high",
    status: "open",
    description: "An AI hiring system showed bias against minority candidates.",
    views: 123,
    upvotes: 45,
    createdAt: new Date()
  },
  {
    id: "2",
    title: "Facial recognition privacy violation",
    category: "privacy",
    severity: "critical",
    status: "investigating",
    description: "Facial recognition used without user consent.",
    views: 98,
    upvotes: 60,
    createdAt: new Date()
  }
];

// ---------------- HEALTH / STATUS ----------------

router.get("/status", (req, res) => {
  res.json({
    app: "fullstack-render-app",
    status: "running",
    timestamp: new Date().toISOString()
  });
});

// ---------------- STATS ----------------

router.get("/stats", (req, res) => {
  res.json({
    success: true,
    data: {
      totalCases: cases.length,
      totalUsers: 128,
      totalEvidence: 56,
      categoryDistribution: {
        bias: 1,
        privacy: 1
      }
    }
  });
});

// ---------------- GET CASES (PAGINATED) ----------------

router.get("/cases", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;

  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedCases = cases.slice(start, end);

  res.json({
    success: true,
    data: paginatedCases,
    pagination: {
      page,
      totalPages: Math.ceil(cases.length / limit),
      totalItems: cases.length
    }
  });
});

// ---------------- GET CASE BY ID ----------------

router.get("/cases/:id", (req, res) => {
  const found = cases.find(c => c.id === req.params.id);

  if (!found) {
    return res.status(404).json({ error: "Case not found" });
  }

  found.views += 1;
  res.json({ success: true, data: found });
});

// ---------------- CREATE CASE ----------------

router.post("/cases", (req, res) => {
  const newCase = {
    id: String(cases.length + 1),
    title: req.body.title,
    category: req.body.category,
    severity: req.body.severity || "low",
    status: "open",
    description: req.body.description,
    views: 0,
    upvotes: 0,
    createdAt: new Date()
  };

  cases.unshift(newCase);

  res.json({
    success: true,
    data: newCase
  });
});

module.exports = router;

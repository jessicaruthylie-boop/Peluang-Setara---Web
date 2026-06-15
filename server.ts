import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Setup database directories
  const DB_DIR = path.join(process.cwd(), "src", "db");
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  const JOBS_FILE = path.join(DB_DIR, "jobs.json");
  const APPLICATIONS_FILE = path.join(DB_DIR, "applications.json");
  const USERS_FILE = path.join(DB_DIR, "users.json");

  const INITIAL_USERS = [
    {
      id: "user-1",
      name: "Jessica Ruth Ylie",
      email: "jessicaruthylie@gmail.com",
      password: "password123",
      role: "applicant",
    },
    {
      id: "user-2",
      name: "HR PT Global Sentra Solusi",
      email: "recruitment@globalsentra.id",
      password: "password123",
      role: "recruiter",
    },
  ];

  // Utility functions
  function readUsers() {
    try {
      if (!fs.existsSync(USERS_FILE)) {
        fs.writeFileSync(
          USERS_FILE,
          JSON.stringify(INITIAL_USERS, null, 2),
          "utf-8",
        );
        return INITIAL_USERS;
      }
      const data = fs.readFileSync(USERS_FILE, "utf-8");
      return JSON.parse(data);
    } catch (err) {
      console.error("Error reading users file:", err);
      return INITIAL_USERS;
    }
  }

  function writeUsers(users: any) {
    try {
      fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
    } catch (err) {
      console.error("Error writing users file:", err);
    }
  }

  function readJobs() {
    try {
      if (!fs.existsSync(JOBS_FILE)) {
        return [];
      }
      const data = fs.readFileSync(JOBS_FILE, "utf-8");
      return JSON.parse(data);
    } catch (err) {
      console.error("Error reading jobs file:", err);
      return [];
    }
  }

  function writeJobs(jobs: any) {
    try {
      fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2), "utf-8");
    } catch (err) {
      console.error("Error writing jobs file:", err);
    }
  }

  function readApplications() {
    try {
      if (!fs.existsSync(APPLICATIONS_FILE)) {
        fs.writeFileSync(
          APPLICATIONS_FILE,
          JSON.stringify([], null, 2),
          "utf-8",
        );
        return [];
      }
      const data = fs.readFileSync(APPLICATIONS_FILE, "utf-8");
      return JSON.parse(data);
    } catch (err) {
      console.error("Error reading applications file:", err);
      return [];
    }
  }

  function writeApplications(apps: any) {
    try {
      fs.writeFileSync(
        APPLICATIONS_FILE,
        JSON.stringify(apps, null, 2),
        "utf-8",
      );
    } catch (err) {
      console.error("Error writing applications file:", err);
    }
  }

  // API Endpoints

  // GET /api/jobs
  app.get("/api/jobs", (req, res) => {
    try {
      let jobs = readJobs();
      const query = req.query.search as string;
      const company = req.query.company as string;
      const location = req.query.location as string;
      const disability = req.query.disability as string;

      if (disability && disability !== "all") {
        jobs = jobs.filter((job: any) =>
          job.disabilityTypes.some(
            (d: string) => d.toLowerCase() === disability.toLowerCase(),
          ),
        );
      }

      if (query) {
        const q = query.toLowerCase();
        jobs = jobs.filter(
          (job: any) =>
            job.title.toLowerCase().includes(q) ||
            job.companyName.toLowerCase().includes(q) ||
            job.description.toLowerCase().includes(q),
        );
      }

      if (company) {
        const c = company.toLowerCase();
        jobs = jobs.filter((job: any) =>
          job.companyName.toLowerCase().includes(c),
        );
      }

      if (location) {
        const loc = location.toLowerCase();
        jobs = jobs.filter((job: any) =>
          job.location.toLowerCase().includes(loc),
        );
      }

      // Sort by newest
      jobs.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      res.json(jobs);
    } catch (err) {
      console.error("[API] Error fetching jobs:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // GET /api/jobs/:id
  app.get("/api/jobs/:id", (req, res) => {
    try {
      const jobs = readJobs();
      const job = jobs.find((j: any) => j.id === req.params.id);
      if (!job) {
        return res.status(404).json({ error: "Lowongan tidak ditemukan." });
      }
      res.json(job);
    } catch (err) {
      console.error("[API] Error fetching job:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // POST /api/jobs
  app.post("/api/jobs", (req, res) => {
    try {
      const {
        title,
        companyName,
        companyLogoUrl,
        location,
        salaryRange,
        description,
        requirements,
        disabilityTypes,
        accommodations,
        companyEmail,
      } = req.body;

      const jobs = readJobs();
      const newJob = {
        id: `job-${Date.now()}`,
        title,
        companyName,
        companyLogoUrl,
        location,
        salaryRange,
        description,
        requirements: Array.isArray(requirements)
          ? requirements
          : requirements.split("\n").filter((r: string) => r.trim() !== ""),
        disabilityTypes: Array.isArray(disabilityTypes)
          ? disabilityTypes
          : ["Daksa"],
        accommodations: Array.isArray(accommodations) ? accommodations : [],
        companyEmail,
        createdAt: new Date().toISOString(),
      };

      jobs.push(newJob);
      writeJobs(jobs);

      res.status(201).json(newJob);
    } catch (err) {
      console.error("[API] Error creating job:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // GET /api/applications
  app.get("/api/applications", (req, res) => {
    try {
      const apps = readApplications();
      const email = req.query.email as string;
      if (email) {
        const filtered = apps.filter(
          (app: any) =>
            app.applicantEmail?.toLowerCase() === email.toLowerCase() ||
            app.companyEmail?.toLowerCase() === email.toLowerCase(),
        );
        return res.json(filtered);
      }
      res.json(apps);
    } catch (err) {
      console.error("[API] Error fetching applications:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // POST /api/applications
  app.post("/api/applications", (req, res) => {
    try {
      const {
        jobId,
        applicantEmail,
        applicantName,
        applicantPhone,
        applicantDisability,
        coverLetter,
        companyEmail,
      } = req.body;

      const apps = readApplications();
      const newApp = {
        id: `app-${Date.now()}`,
        jobId,
        applicantEmail,
        applicantName,
        applicantPhone,
        applicantDisability,
        coverLetter,
        companyEmail,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      apps.push(newApp);
      writeApplications(apps);

      res.status(201).json(newApp);
    } catch (err) {
      console.error("[API] Error creating application:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // PATCH /api/applications/:id
  app.patch("/api/applications/:id", (req, res) => {
    try {
      const { status } = req.body;
      const apps = readApplications();
      const app = apps.find((a: any) => a.id === req.params.id);

      if (!app) {
        return res.status(404).json({ error: "Aplikasi tidak ditemukan." });
      }

      app.status = status || app.status;
      writeApplications(apps);

      res.json(app);
    } catch (err) {
      console.error("[API] Error updating application:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // POST /api/auth/register
  app.post("/api/auth/register", (req, res) => {
    try {
      const { email, password, name, role } = req.body;

      if (!email || !password || !name) {
        return res.status(400).json({
          error: "Email, password, dan nama wajib diisi.",
        });
      }

      const users = readUsers();
      const exists = users.find(
        (u: any) => u.email.toLowerCase() === email.toLowerCase(),
      );

      if (exists) {
        return res.status(400).json({ error: "Email sudah terdaftar." });
      }

      const newUser = {
        id: `user-${Date.now()}`,
        email,
        password,
        name,
        role: role || "applicant",
      };

      users.push(newUser);
      writeUsers(users);

      const { password: _, ...userWithoutPassword } = newUser;
      res.status(201).json(userWithoutPassword);
    } catch (err) {
      console.error("[API] Error registering user:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // POST /api/auth/login
  app.post("/api/auth/login", (req, res) => {
    try {
      const { email, password } = req.body || {};
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email dan password wajib diisi." });
      }

      const users = readUsers();
      const user = users.find(
        (u: any) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password,
      );
      if (!user) {
        return res.status(401).json({ error: "Email atau password salah." });
      }

      const { password: _, ...userWithoutPassword } = user;
      return res.json(userWithoutPassword);
    } catch (err) {
      console.error("[API] Error during login:", err);
      return res
        .status(500)
        .json({ error: "Terjadi kesalahan sistem login: " + err.message });
    }
  });

  // Vite dev server middleware
  if (process.env.NODE_ENV !== "production") {
    console.log("[Vite] Initializing Vite dev server...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    console.log("[Vite] Vite server initialized");
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Pre-initialize database
  try {
    console.log("Initializing database collections...");
    readUsers();
    console.log("Users collection ready");
    readJobs();
    console.log("Jobs collection ready");
    readApplications();
    console.log("Applications collection ready");
  } catch (err) {
    console.error("Error pre-initializing databases:", err);
    process.exit(1);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();

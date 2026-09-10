const express = require("express");
const path = require("path");
const { exec } = require("child_process");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/security", (req, res) => {
  exec("npm audit --json", { cwd: __dirname }, (error, stdout) => {
    try {
      const audit = JSON.parse(stdout);

      const vulnerabilities = audit.metadata?.vulnerabilities || {};

      const result = {
        total: vulnerabilities.total || 0,
        critical: vulnerabilities.critical || 0,
        high: vulnerabilities.high || 0,
        moderate: vulnerabilities.moderate || 0,
        low: vulnerabilities.low || 0,
        info: vulnerabilities.info || 0,
        packages: []
      };

      if (audit.vulnerabilities) {
        for (const [packageName, data] of Object.entries(audit.vulnerabilities)) {
          result.packages.push({
            name: packageName,
            severity: data.severity || "unknown",
            direct: data.isDirect || false
          });
        }
      }

      res.json(result);

    } catch (err) {
      console.error("Error leyendo npm audit:", err);

      res.status(500).json({
        error: "No se pudo analizar el estado de seguridad"
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
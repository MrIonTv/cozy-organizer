// src/routes/profiles.js
const express = require("express");
const router = express.Router();
const fileService = require("./FileService");

router.get("/", async (req, res) => {
  res.json(await fileService.getAllProfiles());
});

router.get("/:id", async (req, res) => {
  const profile = await fileService.getProfile(req.params.id);
  if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });
  res.json(profile);
});

router.post("/:id", async (req, res) => {
  const result = await fileService.createProfile(req.params.id, req.body);

  if (!result)
    return res.status(400).json({ error: "El perfil ya existe" });

  res.status(201).json(result);
});

router.put("/:id/:file", async (req, res) => {
  const result = await fileService.updateFile(req.params.id, req.params.file, req.body);
  if (!result)
    return res.status(404).json({ error: "Perfil o archivo no encontrado" });

  res.json(result);
});

router.delete("/:id", async (req, res) => {
  const ok = await fileService.deleteProfile(req.params.id);
  if (!ok) return res.status(404).json({ error: "Perfil no encontrado" });

  res.json({ message: "Perfil eliminado correctamente" });
});

module.exports = router;

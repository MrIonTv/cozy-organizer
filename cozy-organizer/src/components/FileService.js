// src/services/fileService.js
const fs = require("fs-extra");
const path = require("path");

const BASE_DIR = path.join(__dirname, "../profiles");

module.exports = {
  /** LISTA TODOS LOS PERFILES (carpetas) Y CARGA SUS ARCHIVOS */
  async getAllProfiles() {
    const folders = await fs.readdir(BASE_DIR);
    const profiles = [];

    for (const folder of folders) {
      const folderPath = path.join(BASE_DIR, folder);

      const stat = await fs.stat(folderPath);
      if (!stat.isDirectory()) continue;

      const files = await fs.readdir(folderPath);
      const data = {};

      for (const file of files) {
        if (file.endsWith(".json")) {
          const filePath = path.join(folderPath, file);
          const key = file.replace(".json", "");
          data[key] = await fs.readJson(filePath);
        }
      }

      profiles.push({
        id: folder,
        ...data
      });
    }

    return profiles;
  },

  /** OBTENER UN PERFIL POR ID (nombre de carpeta) */
  async getProfile(id) {
    const folderPath = path.join(BASE_DIR, id);
    if (!await fs.pathExists(folderPath)) return null;

    const files = await fs.readdir(folderPath);
    const data = {};

    for (const file of files) {
      if (file.endsWith(".json")) {
        const filePath = path.join(folderPath, file);
        const key = file.replace(".json", "");
        data[key] = await fs.readJson(filePath);
      }
    }

    return { id, ...data };
  },

  /** CREAR PERFIL (carpeta + archivos) */
  async createProfile(id, initialFiles = {}) {
    const folderPath = path.join(BASE_DIR, id);

    if (await fs.pathExists(folderPath)) return null;

    await fs.mkdir(folderPath);

    for (const [fileName, content] of Object.entries(initialFiles)) {
      const filePath = path.join(folderPath, `${fileName}.json`);
      await fs.writeJson(filePath, content, { spaces: 2 });
    }

    return { id, ...initialFiles };
  },

  /** ACTUALIZAR UN ARCHIVO ESPECÍFICO DE UN PERFIL */
  async updateFile(id, fileName, data) {
    const filePath = path.join(BASE_DIR, id, `${fileName}.json`);
    if (!await fs.pathExists(filePath)) return null;

    await fs.writeJson(filePath, data, { spaces: 2 });
    return data;
  },

  /** ELIMINAR PERFIL COMPLETO */
  async deleteProfile(id) {
    const folderPath = path.join(BASE_DIR, id);
    if (!await fs.pathExists(folderPath)) return false;

    await fs.remove(folderPath);
    return true;
  }
};

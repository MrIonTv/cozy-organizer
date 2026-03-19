import { getDB } from "./DB";

export async function selectProfilesFolder() {
    let folderHandle = await loadDirectoryHandle();

    if (folderHandle && await verifyPermission(folderHandle)) {
        console.log("Directorio reutilizado");
        return folderHandle;
    }

    folderHandle = await window.showDirectoryPicker();
    await saveDirectoryHandle(folderHandle);

    return folderHandle;
}

export async function forgetProfilesFolder() {
    const db = await getDB();
    await db.delete("handles", "profilesFolder")
}

export async function saveDirectoryHandle(handle) {
    const db = await getDB();
    const tx = db.transaction("handles", "readwrite");
    tx.objectStore("handles").put(handle, "profilesFolder");
    await tx.done;
}

export async function loadDirectoryHandle() {
    const db = await getDB();
    const tx = db.transaction("handles", "readonly");
    return await tx.objectStore("handles").get("profilesFolder");
}

async function verifyPermission(handle) {
    const options = { mode: "readwrite" };

    if (await handle.queryPermission(options) === "granted") {
        return true;
    }

    if (await handle.requestPermission(options) === "granted") {
        return true;
    }

    return false;
}

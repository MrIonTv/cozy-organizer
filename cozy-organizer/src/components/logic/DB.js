import { openDB } from "idb";

export function getDB() {
    return openDB("FileSystemDB", 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains("handles")) {
                db.createObjectStore("handles");
            }
        }
    });
}

import path from 'path';
import fs from 'fs/promises';
const pFileName = "profile.json";

export async function detectProfiles(folderHandle) {
    await folderHandle.requestPermission({ mode: "readwrite" });

    let count = 0;
    for await (const h of folderHandle.values()) {
        count++;
    }
    
    if (count === 0) {
        saveProfile(folderHandle);
    }

    let profiles = [];
    for await (const prof of folderHandle.values()) {
        if (prof.kind === "directory") {
            const p = await prof.getFileHandle(pFileName);
            if (p) {
                const f = await p.getFile();
                profiles.push(f);
            }
        }
    }
    return profiles;
}

export async function saveProfile(folderHandle, name = "Nuevo Perfil", bgNumber = 0) {
    const profileDirectory = await folderHandle.getDirectoryHandle(name, {create: true});
    
    const profile = await profileDirectory.getFileHandle(pFileName, {create: true});

    const writable = await profile.createWritable();
    const profileInfo = createProfileData({name, bgNumber});
    await writable.write(JSON.stringify(profileInfo, null, 2));
    await writable.close();

    return profile;
}

export async function updateProfile(folderHandle, profile, newData) {
    const profileDirectory = await folderHandle.getDirectoryHandle(profile.userName);
    const pFile = await profileDirectory.getFileHandle(pFileName);
    const writable = await pFile.createWritable();

    await writable.write(JSON.stringify(profile, null, 2));
    await writable.close();

    if (profile.userName != newData.userName) {
        const oldProfilePath = profileDirectory.path;
        const newProfilePath = path.join(path.dirname(oldProfilePath), newData.userName);
        await fs.rename(oldProfilePath, newProfilePath);
    }
}

export async function readProfile(pFile) {
    const text = await pFile.text();
    const obj = JSON.parse(text);
    return obj;
}

function createProfileData( {userName, bgNumber} ) {
    if(!userName || !(bgNumber !== undefined)) {
        throw new Error("Missing Data");
    }

    return { userName, bgNumber };
}
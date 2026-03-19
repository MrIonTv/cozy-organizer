
import PageHead from "../components/gui/PageHead";
import Container from "../components/gui/Container";
import Tool from '../components/gui/PageTool';
import { forgetProfilesFolder, saveDirectoryHandle } from '../components/logic/FileHandler';
import { detectProfiles, readProfile, saveProfile, updateProfile } from '../components/logic/ProfileManager';

import '../styles/config.css'
import { useEffect, useState } from "react";

const AppConfig = ({ backgrounds, background, setBackground, fHandle, setFHandle, actualProfile, setActualProfile, profileList, setProfileList}) => {
    const [pNames, setPNames] = useState([""]);

    async function onSetBackground(bg) {
        setBackground(bg);
        const data = actualProfile;
        data.background = bg;
        updateProfile(fHandle, actualProfile, data);
    };

    async function onSetNewFHandle() {
        try {
            const newHandle = await window.showDirectoryPicker();
            if (newHandle) {
                forgetProfilesFolder();
                saveDirectoryHandle(newHandle);
                setFHandle(newHandle);
            }
        } catch (AbortError) {
            return;
        }
    }

    async function getName(file) {
        const text = await file.text();
        const data = JSON.parse(text);
        return data.userName;
    }

    useEffect(() => {
        if (profileList) {
            Promise.all(
                profileList.map(async (p) => {
                    return await getName(p);
                })
            ).then((names) => {
                setPNames(names);
            });
        }
}, [profileList]);

    return (
        <Container>
            <PageHead opened selected={0}/>
            <main style={{display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                marginTop: "5vh",
            }}>
                <div id='board'>
                    <div className='board-item'>
                        Carpeta de Perfiles: {fHandle.name}
                        <button onClick={onSetNewFHandle}> Cambiar Carpeta </button>
                    </div>
                    <div className='board-item'>
                        Perfiles
                        
                        <select name="selectedProfile" id="profiles">
                        {pNames &&
                            pNames.map((name) => (
                                <option key={name} value={name}>{name}</option>
                            ))    
                        }
                        </select>
                    </div>
                    <div className='board-item'
                        style={{display:"flex"}}>
                        {backgrounds.map(bg => (
                            <img className='miniatures'
                                key={bg}
                                src={`src/assets/backgrounds/${bg}`}
                                alt=""
                                onClick={() => onSetBackground(bg)}
                                style={{
                                    border: background === bg ? "2px solid white" : "none",
                                }}
                            />
                        ))}
                        <img
                            className='miniatures'
                            alt=""
                            title='Subir fondo'
                            style={{
                                border: "2px solid purple",
                            }}
                        />
                    </div>
                </div>
                
            </main>
        </Container>
    );
}

export default AppConfig;
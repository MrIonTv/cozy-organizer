import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home'
import AppConfig from './pages/AppConfig'
import Transactions from './pages/Transacctions'
import { loadDirectoryHandle, selectProfilesFolder } from './components/logic/FileHandler';
import LoadPage from './components/gui/LoadPage';
import { detectProfiles, readProfile } from './components/logic/ProfileManager';

const backgrounds = [
  "montezuma-oropendola.jpg",
  "costa-rica-guanacaste-tree.jpg",
  "palm-tree-costa-rica.jpg",
  "costa-rica-rain-forest-1.jpg",
  "costa-rica-rain-forest-2.jpg",
  "costa-rica-rain-forest-3.jpg",
];

export default function App() {
  const [background, setBackground] = useState(backgrounds[0]);
  const [needsFolder, setNeedsFolder] = useState(true);
  const [folderHandle, setFolderHandle] = useState();
  const [profileList, setProfilesList] = useState();
  const [actualProfile, setActualProfile] = useState();

  useEffect(() => {
    checkProfilesFolder();
  }, []);

  async function checkProfilesFolder() {
    const handle = await loadDirectoryHandle();

    if (!handle) {
      setNeedsFolder(true);
      return;
    }
    
    const permission = await handle.queryPermission({mode: "read"});

    if (permission === "granted") {
      setNeedsFolder(false);
      setFolderHandle(handle);
    } else {
      setNeedsFolder(true);
    }
  }

  const handleSelectFolder = async () => {
    const folder = await selectProfilesFolder();
    setFolderHandle(folder);
    setNeedsFolder(false);
  };

  async function fetchProfiles(folderHandle) {
    const profiles = await detectProfiles(folderHandle);
    setProfilesList(profiles);
    

    let profileToUse = await readProfile(profiles[0]);

    const lastSelected = localStorage.getItem('lastSelectedProfile');
    if (lastSelected) {
      for (const p of profiles) {
        const actual = await readProfile(p);
        if (actual.userName == lastSelected) {
          profileToUse = actual;
          break;
        }
      }
    }
    setActualProfile(profileToUse);
    setBackground(profileToUse.background);
  }

  useEffect(() => {
    if (folderHandle) {
      fetchProfiles(folderHandle);
    }
  }, [folderHandle])

  return (
    <>
      <div id="background-overlay" style={{backgroundImage: `url(src/assets/backgrounds/${background})`}}/>
      {needsFolder &&
        <LoadPage handleSelectFolder={handleSelectFolder} />
      }
      {!needsFolder && 
        <Router>
          <Routes>
            <Route path='/home' element={<Home/>}/>
            <Route path='/profiles' element={<AppConfig backgrounds={backgrounds} setBackground={setBackground} background={background} fHandle={folderHandle} setFHandle={setFolderHandle} actualProfile={actualProfile} setActualProfile={setActualProfile} profileList={profileList} setProfileList={setProfilesList}/>}/>
            <Route path='/transactions' element={<Transactions/>}/>

            {"Default"}
            <Route path="/" element={<Navigate to="/home" replace />} />
          </Routes>
        </Router>
      }
        
    </>
  )
}


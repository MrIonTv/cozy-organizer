import { useState, useEffect, use } from "react";

const ProfileManager = () => {
    const [profiles, setProfiles] = useState([]);
    const [activeProfile, setActiveProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProfiles() {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch("http://localhost:3000/perfiles");

                if (!response.ok) {
                    throw new Error("Error al cargar perfiles");
                }

                const data = await response.json();

                setProfiles(data);

                // Si deseas seleccionar automáticamente el primer perfil
                if (data.length > 0) {
                    setActiveProfile(data[0]);
                }

            } catch (err) {
                console.error("Error cargando perfiles:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProfiles();
    }, []);
    if (isLoading) {console.log("Loading profiles...");}
    else { console.log("Profiles loaded:", profiles); console.log("Active profile:", activeProfile);}
    return (
        <>
        </>
    );
}

export default ProfileManager;
import {createContext, useContext, useEffect, useState} from "react";
import { getCurrentUser } from "../lib/appwrite";


const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}) => {

    const [isLogged, setIsLogged] = useState(false);

    const [user, setUser] = useState(null);

    const [isloading, setIsloading] = useState(true);


    useEffect(() => {
        getCurrentUser()
        .then((res) => {
            if (res) {
                setIsLogged(true);
                setUser(res);
            } else {
                setIsLogged(false);
                setUser(null);
            }
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            setIsloading(false);
        })
    }, []);

    return (
        <GlobalContext.Provider
        
        value={{
            isLogged,
            setIsLogged,
            user,
            setUser,
            isloading
        }}
        >

            {children}

        </GlobalContext.Provider>
    )

}

export default GlobalProvider;
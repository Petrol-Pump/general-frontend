import Cookies from "js-cookie";

export const authenticateUser = async (username, password, role) => {
    
    // this promise simulates an async function for the real credential verification
    const result = await new Promise((resolve, reject)=>{
        if (username === "FartMonster45" && password === "xyz") {
            const userData = {
                username,
                role
            };
            const expirationTime = new Date(new Date().getTime() + 24*60*60000);
            Cookies.set('pump_auth', JSON.stringify(userData), { expires: expirationTime });
            resolve(true);
        }
        else{
            reject(false)
        }
    })
    return result
};
import { useContext, useEffect } from "react";
import { AppContext } from "../../utils/context";

export function Logout({ navigation }) {
    const { logout } = useContext(AppContext);

    useEffect(() => {
        logout();
        navigation.navigate('Login');
    }, []);

    return null;

}
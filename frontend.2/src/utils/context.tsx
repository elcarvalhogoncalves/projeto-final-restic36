import { ReactNode, createContext, useState } from 'react';
import { UserProps } from './Types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppContextProps {
  user: UserProps;
  isLoggedIn: boolean;
  login: (user: UserProps) => void;
  logout: () => void;
}
interface AppProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<AppContextProps>({
  user: {id: 0, nome: "", email: "", senha: ""},
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

function ContextProvider({ children }: AppProviderProps) {
  const [user, setUser] = useState<UserProps>(
    {id: 0, nome: "", email: "", senha: ""}
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (u: UserProps) => {
    setUser(u);
    const jsonValue = JSON.stringify(u);
    await AsyncStorage.setItem('user', jsonValue);
    setIsLoggedIn(true);
    console.log("Usuário logado com sucesso!");
  }
  const logout = () => {
    setUser({id: 0, nome: "", email: "", senha: ""});
    AsyncStorage.removeItem('user');
    setIsLoggedIn(false);
    console.log("Usuário deslogado com sucesso!");
  };

  return (
    <AppContext.Provider
			value={{
				user, isLoggedIn, login, logout
			}}
		>
			{children}
		</AppContext.Provider>
  );
}

export default ContextProvider;

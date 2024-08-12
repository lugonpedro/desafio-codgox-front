import React, { createContext, useState, ReactNode, useMemo, useContext } from 'react';
import { InUser } from '../../services/UserService/Models/Input/InUser';

interface UserContextType {
    user: InUser;
    setUser: React.Dispatch<React.SetStateAction<InUser>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

type Props = {
    children: ReactNode;
};

export const UserProvider = ({ children }: Props) => {
    const [user, setUser] = useState<InUser>({
        email: '',
        password: '',
        id: 0
    });
    
    const contextValue = useMemo(() => ({ user, setUser }), [user, setUser]);
    
    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext deve ser usado dentro de um UserProvider');
    }
    return context;
};

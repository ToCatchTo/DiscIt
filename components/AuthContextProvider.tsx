import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import React, { FC, PropsWithChildren } from 'react';

import { firebase_app } from '../firebase/config';

const auth = getAuth(firebase_app);

type AuthContextType = { user: User | null; loading?: boolean };
export const AuthContext = React.createContext<AuthContextType>({ user: null });
export const useAuthContext = () => React.useContext(AuthContext);
export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Firebase can return null, so it's safe to set it directly
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

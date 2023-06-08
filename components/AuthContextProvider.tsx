import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import React, { FC, PropsWithChildren } from 'react';

import { firebase_app } from '../firebase/config';

const auth = getAuth(firebase_app);
type AuthContextType = { user?: User; loading?: boolean };
export const AuthContext = React.createContext<AuthContextType>({});
export const useAuthContext = () => React.useContext(AuthContext);
export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
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

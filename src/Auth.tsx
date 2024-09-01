import { useState } from 'react';
import { auth } from './config/firebase';
import {
  signInWithEmailAndPassword,
  signOut as signOutFromApp,
} from 'firebase/auth';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    if (!email || !password) return;
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      await signOutFromApp(auth);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        maxWidth: '400px',
        margin: '2rem auto',
      }}
    >
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      ></Input>
      <Input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      ></Input>
      {auth.currentUser?.email ? (
        <div>
          <h3>{auth.currentUser?.email}</h3>
          <Button onClick={signOut}>Sign out</Button>
        </div>
      ) : (
        <Button onClick={signIn}>Sign in</Button>
      )}
    </div>
  );
};
export default Auth;

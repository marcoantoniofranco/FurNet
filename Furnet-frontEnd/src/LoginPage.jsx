import './LoginPage.css';
import LoginBox from './components/LoginBox';

export default function LoginPage() {
  const handleLogin = (username, password) => {
    console.log('Login com:', username, password);
  };

  const handleSignup = () => {
    console.log('Redirecionando para página de cadastro');
  };

  return (
    <div className="login-background">
      <LoginBox 
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    </div>
  );
}

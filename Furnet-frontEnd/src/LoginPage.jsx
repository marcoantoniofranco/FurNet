import './LoginPage.css';

export default function LoginPage() {
  return (
    <div className="login-background">
      <div className="login-box">
        <h2>Login</h2>
        <input type="text" placeholder="Usuário" className="login-input" />
        <input type="password" placeholder="Senha" className="login-input" />
        <button type="button" className="login-btn">
          Entrar
        </button>
        <button type="button" className="signup-btn">
          Criar Conta
        </button>
      </div>
    </div>
  );
}

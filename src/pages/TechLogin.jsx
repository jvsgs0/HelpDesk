import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LockKeyhole, ShieldCheck, LogIn } from "lucide-react";

export function TechLogin({ onLogin }) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const sucesso = onLogin(password);

        if (!sucesso) {
            setError(true);
            setPassword("");
        }
    };

    return (
        <div className="tech-login-page">
            <div className="tech-login-card">
                <div className="tech-login-icon">
                    <LockKeyhole size={28} />
                </div>

                <div className="tech-login-heading">
                    <h1>Acesso Restrito</h1>
                    <p>
                        Faça login para acessar a área do técnico.
                    </p>
                </div>

                <form
                    className="tech-login-form"
                    onSubmit={handleSubmit}
                >
                    <div className="tech-login-field">
                        <label htmlFor="tech-password">
                            Senha de acesso
                        </label>

                        <input
                            id="tech-password"
                            type="password"
                            value={password}
                            placeholder="Digite sua senha"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError(false);
                            }}
                            autoComplete="current-password"
                            required
                        />

                        {error && (
                            <p className="tech-login-error" role="alert">
                                Senha incorreta. Tente novamente.
                            </p>
                        )}
                    </div>

                    <button
                        className="tech-login-submit"
                        type="submit"
                    >
                        <LogIn size={18} />
                        Acessar Painel
                    </button>
                </form>

                <div className="tech-login-security">
                    <ShieldCheck size={15} />
                    Área exclusiva para técnicos autorizados
                </div>
                <div className="tech-login-back-div">
                    <button
                        className="tech-login-back"
                        type="button"
                        onClick={() => navigate("/")}
                    >
                        <ArrowLeft size={16} />
                        Voltar
                    </button>
                </div>
            </div>
        </div>
    );
}
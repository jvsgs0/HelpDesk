import { useState } from "react";
import {
    Upload,
    Ticket,
    Clock3,
    CheckCircle2,
    Mail,
    ImagePlus,
    X,
    Send,
    LifeBuoy,
    FileText,
    Check,
    ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ClientPanel({
    tickets = [],
    onCreateTicket
}) {
    const [title, setTitle] = useState("");
    const [email, setEmail] = useState("");
    const [print, setPrint] = useState([]);
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const navigate = useNavigate();

    const ticketsAbertos = tickets.filter(
        (ticket) => ticket.status === "open"
    );

    const ticketsResolvidos = tickets.filter(
        (ticket) => ticket.status === "closed"
    );

    async function handleUpload(event) {
        const files = Array.from(event.target.files || []);
        event.target.value = "";

        if (files.length === 0) return;

        const imagensValidas = files.filter(
            (file) => file.type.startsWith("image/")
        );

        if (imagensValidas.length !== files.length) {
            setError("Selecione apenas arquivos de imagem.");
            return;
        }

        const limite = 5;
        const vagas = limite - print.length;

        if (vagas <= 0) {
            setError("Você pode anexar no máximo 5 imagens.");
            return;
        }

        const selecionadas = imagensValidas.slice(0, vagas);

        try {
            const imagensConvertidas = await Promise.all(
                selecionadas.map((file) => {
                    return new Promise((resolve, reject) => {
                        const leitor = new FileReader();

                        leitor.onload = () => resolve(leitor.result);
                        leitor.onerror = () => reject(
                            new Error("Não foi possível ler uma imagem.")
                        );

                        leitor.readAsDataURL(file);
                    });
                })
            );

            setPrint((anteriores) => [
                ...anteriores,
                ...imagensConvertidas
            ]);

            setError("");

            if (imagensValidas.length > vagas) {
                setError("Foram adicionadas apenas as imagens permitidas.");
            }
        } catch (err) {
            console.error("Erro ao processar imagens:", err);
            setError("Não foi possível carregar as imagens.");
        }
    }

    function removeImage(indexToRemove) {
        setPrint((anteriores) =>
            anteriores.filter((_, index) => index !== indexToRemove)
        );
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!title.trim() || !email.trim()) {
            setError("Preencha o problema e o e-mail antes de enviar.");
            return;
        }

        if (!onCreateTicket || sending) return;

        setSending(true);
        setError("");

        try {
            onCreateTicket({
                title: title.trim(),
                email: email.trim(),
                print: [...print]
            });

            setTitle("");
            setEmail("");
            setPrint([]);
        } catch (err) {
            console.error("Erro ao criar chamado:", err);
            setError("Não foi possível enviar o chamado. Tente novamente.");
        } finally {
            setSending(false);
        }
    }

    function renderTicket(ticket, resolved = false) {
        const anexos = Array.isArray(ticket.print)
            ? ticket.print
            : [];

        return (
            <article
                className={`client-ticket ${
                    resolved ? "client-ticket-resolved" : ""
                }`}
                key={ticket.id}
            >
                <div className="client-ticket-top">
                    <div className="client-ticket-symbol">
                        {resolved ? (
                            <CheckCircle2 size={20} />
                        ) : (
                            <Ticket size={20} />
                        )}
                    </div>

                    <div className="client-ticket-main">
                        <span
                            className={`client-status ${
                                resolved
                                    ? "client-status-resolved"
                                    : "client-status-open"
                            }`}
                        >
                            {resolved ? "RESOLVIDO" : "EM ABERTO"}
                        </span>

                        <h3>
                            {ticket.title || "Problema não informado"}
                        </h3>

                        <p className="client-ticket-email">
                            <Mail size={15} />
                            {ticket.email}
                        </p>
                    </div>

                    <span className="client-ticket-id">
                        #{ticket.id}
                    </span>
                </div>

                {anexos.length > 0 && (
                    <div className="client-ticket-attachments">
                        <div className="client-attachments-heading">
                            <ImagePlus size={15} />
                            Anexos ({anexos.length})
                        </div>

                        <div className="client-attachments-list">
                            {anexos.map((foto, index) => (
                                <img
                                    key={index}
                                    src={foto}
                                    alt={`Anexo ${index + 1}`}
                                    className="client-ticket-image"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </article>
        );
    }

    return (
        <main className="client-page">
            <div className="client-shell">
                <header className="client-topbar">
                    <a className="client-brand" href="/">
                        <div className="client-brand-icon">
                            <LifeBuoy size={23} />
                        </div>

                        <div>
                            <strong>HelpDesk</strong>
                            <span>Central de suporte</span>
                        </div>
                    </a>

                    <div className="client-topbar-badge">
                        <span className="client-online-dot" />
                        Atendimento online
                    </div>
                </header>

                <section className="client-hero">
                    <div className="client-hero-content">
                        <span className="client-eyebrow">
                            <LifeBuoy size={15} />
                            PRECISA DE AJUDA?
                        </span>

                        <h1>
                            Estamos aqui para <span>resolver.</span>
                        </h1>

                        <p>
                            Conte o que aconteceu e nossa equipe vai
                            trabalhar para solucionar seu problema.
                        </p>

                        <div className="client-hero-points">
                            <span>
                                <CheckCircle2 size={16} />
                                Atendimento organizado
                            </span>

                            <span>
                                <CheckCircle2 size={16} />
                                Acompanhamento de chamados
                            </span>
                        </div>
                    </div>

                    <div className="client-hero-illustration">
                        <div className="client-illustration-glow" />

                        <div className="client-illustration-card">
                            <div className="client-illustration-top">
                                <span />
                                <span />
                                <span />
                            </div>

                            <div className="client-illustration-icon">
                                <LifeBuoy size={43} />
                            </div>

                            <div className="client-illustration-line" />
                            <div className="client-illustration-line short" />

                            <div className="client-illustration-check">
                                <Check size={18} />
                            </div>
                        </div>
                    </div>
                </section>

                <div className="client-content-grid">
                    <section className="client-form-card">
                        <div className="client-section-heading">
                            <div className="client-heading-icon">
                                <FileText size={21} />
                            </div>

                            <div>
                                <h2>Abrir um chamado</h2>
                                <p>Descreva o problema nos campos abaixo.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="client-field">
                                <label htmlFor="client-problem">
                                    Qual é o problema?
                                </label>

                                <input
                                    id="client-problem"
                                    type="text"
                                    placeholder="Ex.: Não consigo acessar minha conta"
                                    value={title}
                                    onChange={(event) =>
                                        setTitle(event.target.value)
                                    }
                                    maxLength={150}
                                    required
                                />

                                <span className="client-field-hint">
                                    Seja claro para facilitar o atendimento.
                                </span>
                            </div>

                            <div className="client-field">
                                <label htmlFor="client-email">
                                    Seu e-mail
                                </label>

                                <div className="client-input-with-icon">
                                    <Mail size={18} />

                                    <input
                                        id="client-email"
                                        type="email"
                                        placeholder="voce@exemplo.com"
                                        value={email}
                                        onChange={(event) =>
                                            setEmail(event.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <span className="client-field-hint">
                                    Informe um e-mail válido para contato.
                                </span>
                            </div>

                            <div className="client-field">
                                <label>Anexos (opcional)</label>

                                <label
                                    htmlFor="client-upload"
                                    className="client-upload-area"
                                >
                                    <div className="client-upload-icon">
                                        <Upload size={22} />
                                    </div>

                                    <strong>
                                        Clique para adicionar imagens
                                    </strong>

                                    <span>
                                        PNG, JPG ou outros formatos de imagem
                                    </span>

                                    <small>
                                        Até 5 imagens por chamado
                                    </small>
                                </label>

                                <input
                                    id="client-upload"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleUpload}
                                    hidden
                                />

                                {print.length > 0 && (
                                    <div className="client-upload-previews">
                                        {print.map((foto, index) => (
                                            <div
                                                className="client-upload-preview"
                                                key={index}
                                            >
                                                <img
                                                    src={foto}
                                                    alt={`Imagem selecionada ${index + 1}`}
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeImage(index)
                                                    }
                                                    aria-label={`Remover imagem ${index + 1}`}
                                                    title="Remover imagem"
                                                >
                                                    <X size={15} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {error && (
                                <div className="client-form-error">
                                    <span>{error}</span>

                                    <button
                                        type="button"
                                        onClick={() => setError("")}
                                        aria-label="Fechar aviso"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="client-submit-button"
                                disabled={sending}
                            >
                                <Send size={18} />
                                {sending
                                    ? "Enviando chamado..."
                                    : "Enviar chamado"}
                            </button>

                            <p className="client-form-footer">
                                <CheckCircle2 size={15} />
                                Confira os dados antes de enviar.
                            </p>
                        </form>
                    </section>

                    <aside className="client-summary">
                        <div className="client-summary-heading">
                            <div>
                                <span className="client-eyebrow">
                                    SEU ATENDIMENTO
                                </span>

                                <h2>Meus chamados</h2>
                            </div>

                            <div className="client-summary-icon">
                                <Ticket size={22} />
                            </div>
                        </div>

                        <p className="client-summary-description">
                            Acompanhe o andamento das suas solicitações.
                        </p>

                        <div className="client-summary-stats">
                            <div className="client-stat-card">
                                <div className="client-stat-icon client-stat-open">
                                    <Clock3 size={20} />
                                </div>

                                <div>
                                    <span>Em aberto</span>
                                    <strong>{ticketsAbertos.length}</strong>
                                </div>
                            </div>

                            <div className="client-stat-card">
                                <div className="client-stat-icon client-stat-done">
                                    <CheckCircle2 size={20} />
                                </div>

                                <div>
                                    <span>Resolvidos</span>
                                    <strong>{ticketsResolvidos.length}</strong>
                                </div>
                            </div>
                        </div>

                        <div className="client-summary-note">
                            <CheckCircle2 size={19} />

                            <p>
                                <strong>Dica</strong>
                                <span>
                                    Anexar uma imagem pode ajudar a equipe
                                    a entender melhor o problema.
                                </span>
                            </p>
                        </div>
                    </aside>
                </div>

                <section className="client-history">
                    <div className="client-history-heading">
                        <div>
                            <span className="client-eyebrow">
                                ACOMPANHAMENTO
                            </span>

                            <h2>Histórico de chamados</h2>

                            <p>
                                Consulte o andamento das suas solicitações.
                            </p>
                        </div>

                        <div className="client-history-total">
                            <Ticket size={17} />
                            {tickets.length}{" "}
                            {tickets.length === 1 ? "chamado" : "chamados"}
                        </div>
                    </div>

                    <div className="client-history-section">
                        <div className="client-history-subheading">
                            <div className="client-history-title">
                                <Clock3 size={19} />
                                <h3>Em aberto</h3>
                            </div>

                            <span>{ticketsAbertos.length}</span>
                        </div>

                        <div className="client-history-list">
                            {ticketsAbertos.length > 0 ? (
                                ticketsAbertos.map((ticket) =>
                                    renderTicket(ticket)
                                )
                            ) : (
                                <div className="client-empty-state">
                                    <div>
                                        <CheckCircle2 size={23} />
                                    </div>

                                    <strong>Nenhum chamado em aberto</strong>

                                    <p>
                                        Quando você enviar um chamado,
                                        ele aparecerá aqui.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="client-history-section">
                        <div className="client-history-subheading">
                            <div className="client-history-title">
                                <CheckCircle2 size={19} />
                                <h3>Resolvidos</h3>
                            </div>

                            <span>{ticketsResolvidos.length}</span>
                        </div>

                        <div className="client-history-list">
                            {ticketsResolvidos.length > 0 ? (
                                ticketsResolvidos.map((ticket) =>
                                    renderTicket(ticket, true)
                                )
                            ) : (
                                <div className="client-empty-state">
                                    <div>
                                        <FileText size={23} />
                                    </div>

                                    <strong>Nenhum chamado resolvido</strong>

                                    <p>
                                        Os chamados concluídos aparecerão
                                        aqui.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <footer className="client-footer">
                    <div className="client-footer-brand">
                        <LifeBuoy size={17} />
                        <strong>HelpDesk</strong>
                    </div>

                    <span>Estamos aqui para ajudar.</span>
                </footer>
            </div>
            <button
                    className="tech-login-back"
                    type="button"
                    onClick={() => navigate("/")}
                >
                    <ArrowLeft size={16} />
                    Voltar
                </button>
        </main>
    );
}
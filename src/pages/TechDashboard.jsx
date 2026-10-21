import { useState } from "react";
import emailjs from "@emailjs/browser";
import { ImageModal } from "../componentes/ImageModal.jsx";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function TechDashBoard({ tickets, onResolve }) {
    const ticketsAbertos = tickets.filter(
        (ticket) => ticket.status === "open"
    );

    const ticketsResolvidos = tickets.filter(
        (ticket) => ticket.status === "closed"
    );

    const [feedback, setFeedback] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    const handleComplete = async (ticket) => {
        if (!ticket.email) return;

        setIsSending(true);
        setFeedback("Enviando...");

        const templanteParams = {
            title: ticket.title,
            email: ticket.email
        };

        try {
            await emailjs.send(
                "service_eoul9l3",
                "template_8hkbh5m",
                templanteParams,
                "5qUGJOleuOQUDVAzR"
            );

            onResolve(ticket.id);
            setFeedback("Enviado com sucesso!");
        } catch (error) {
            console.log("Erro ao enviar email: ", error);
            setFeedback("Erro ao enviar o email. Tente novamente");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="tech-page">
            <div className="tech-container">
                <div className="tech-header">
                    <div>
                        <span className="dashboard-label">SUPORTE</span>
                        <h1>Painel de Chamados</h1>
                        <p>Gerencie os problemas enviados pelos usuários.</p>
                    </div>

                    <div className="dashboard-stats">
                        <div className="ticket-counter open-counter">
                            <strong>{ticketsAbertos.length}</strong>
                            <span>Chamados abertos</span>
                        </div>

                        <div className="ticket-counter closed-counter">
                            <strong>{ticketsResolvidos.length}</strong>
                            <span>Resolvidos</span>
                        </div>
                    </div>
                </div>

                <section className="ticket-section">
                    <div className="section-title">
                        <div>
                            <span className="section-icon open-icon">!</span>

                            <div>
                                <h2>Chamados Abertos</h2>
                                <p>Problemas aguardando atendimento</p>
                            </div>
                        </div>

                        <span className="section-count">
                            {ticketsAbertos.length}
                        </span>
                    </div>

                    <div className="tickets-area">
                        {ticketsAbertos.length === 0 && (
                            <div className="empty-ticket">
                                <div className="empty-icon">✓</div>
                                <h2>Nenhum chamado aberto</h2>
                                <p>Todos os chamados estão resolvidos.</p>
                            </div>
                        )}

                        {ticketsAbertos.map((ticket) => (
                            <div
                                className="ticket-card open-ticket"
                                key={ticket.id}
                            >
                                <div className="ticket-top">
                                    <div className="ticket-info">
                                        <span className="status-open">
                                            ABERTO
                                        </span>

                                        <p className="ticket-title">
                                            {ticket.title}
                                        </p>

                                        <span className="ticket-email">
                                            {ticket.email}
                                        </span>
                                    </div>

                                    <span className="ticket-id">
                                        #{ticket.id}
                                    </span>
                                </div>

                                {ticket.print.length > 0 && (
                                    <div className="ticket-attachments">
                                        <span className="attachments-title">
                                            ANEXOS
                                        </span>

                                        <div className="preview-images">
                                            {ticket.print.map((foto, index) => (
                                                <div
                                                    className="image-wrapper"
                                                    key={index}
                                                    onClick={() =>
                                                        setSelectedImage(foto)
                                                    }
                                                >
                                                    <img
                                                        src={foto}
                                                        className="preview-image"
                                                        alt={`Anexo ${index + 1}`}
                                                    />

                                                    <div className="image-overlay">
                                                        Ver imagem
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="ticket-actions">
                                    <button
                                        className="resolve-button"
                                        onClick={() => handleComplete(ticket)}
                                        disabled={isSending}
                                    >
                                        <span>✓</span>

                                        {isSending
                                            ? "Enviando..."
                                            : "Resolver Chamado"}
                                    </button>
                                </div>
                            </div>
                        ))}

                        {feedback && (
                            <div className="feedback-message">
                                <span>✓</span>
                                {feedback}
                            </div>
                        )}
                    </div>
                </section>

                <section className="ticket-section resolved-section">
                    <div className="section-title">
                        <div>
                            <span className="section-icon closed-icon">✓</span>

                            <div>
                                <h2>Chamados Resolvidos</h2>
                                <p>Histórico dos problemas solucionados</p>
                            </div>
                        </div>

                        <span className="section-count resolved-count">
                            {ticketsResolvidos.length}
                        </span>
                    </div>

                    <div className="tickets-area">
                        {ticketsResolvidos.length === 0 && (
                            <div className="empty-ticket">
                                <div className="empty-icon">✓</div>
                                <h2>Nenhum chamado resolvido</h2>
                                <p>Não há chamados resolvidos no momento.</p>
                            </div>
                        )}

                        {ticketsResolvidos.map((ticket) => (
                            <div
                                className="ticket-card resolved-ticket"
                                key={ticket.id}
                            >
                                <div className="ticket-top">
                                    <div className="ticket-info">
                                        <span className="status-closed">
                                            RESOLVIDO
                                        </span>

                                        <p className="ticket-title">
                                            {ticket.title}
                                        </p>

                                        <span className="ticket-email">
                                            {ticket.email}
                                        </span>
                                    </div>

                                    <span className="ticket-id">
                                        #{ticket.id}
                                    </span>
                                </div>

                                {ticket.print.length > 0 && (
                                    <div className="ticket-attachments">
                                        <span className="attachments-title">
                                            ANEXOS
                                        </span>

                                        <div className="preview-images">
                                            {ticket.print.map((foto, index) => (
                                                <div
                                                    className="image-wrapper"
                                                    key={index}
                                                    onClick={() =>
                                                        setSelectedImage(foto)
                                                    }
                                                >
                                                    <img
                                                        src={foto}
                                                        className="preview-image"
                                                        alt={`Anexo ${index + 1}`}
                                                    />

                                                    <div className="image-overlay">
                                                        Ver imagem
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <button
                    className="tech-login-back"
                    type="button"
                    onClick={() => navigate("/")}
                >
                    <ArrowLeft size={16} />
                    Voltar
                </button>
                    </div>
                </section>
            </div>

            <ImageModal
                image={selectedImage}
                onClose={() => setSelectedImage(null)}
            />
        </div>
    );
}
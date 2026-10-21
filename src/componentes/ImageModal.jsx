import { X } from "lucide-react";

export function ImageModal({ image, onClose }) {
    if (!image) return null;

    return (
        <div
            className="image-modal-overlay"
            onClick={onClose}
        >
            <div
                className="image-modal-content"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    className="image-modal-close"
                    onClick={onClose}
                    aria-label="Fechar imagem"
                    type="button"
                >
                    <X size={22} />
                </button>

                <img
                    src={image}
                    alt="Imagem ampliada do chamado"
                />
            </div>
        </div>
    );
}
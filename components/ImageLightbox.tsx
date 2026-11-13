"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const SELECTOR =
  "article figure img, article .screenshot-frame img, article img, [data-lightbox] img, img[data-lightbox]";

export function ImageLightbox() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogImgRef = useRef<HTMLImageElement>(null);
  const dialogCaptionRef = useRef<HTMLParagraphElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const currentGroupRef = useRef<HTMLImageElement[]>([]);
  const currentIndexRef = useRef(-1);
  const touchStartXRef = useRef(0);
  const activeTriggerRef = useRef<HTMLElement | null>(null);

  const showAt = useCallback((index: number) => {
    const group = currentGroupRef.current;
    const target = group[index];
    const dialogImg = dialogImgRef.current;
    const dialogCaption = dialogCaptionRef.current;
    const prevBtn = prevBtnRef.current;
    const nextBtn = nextBtnRef.current;

    if (!target || !dialogImg || !dialogCaption) return;

    currentIndexRef.current = index;
    dialogImg.src = target.currentSrc || target.src;
    dialogImg.alt = target.alt || "";

    const figcaption = target.closest("figure")?.querySelector("figcaption")?.textContent?.trim();
    const cardTitle = target.closest(".screenshot-card")?.querySelector(".screenshot-card__title")?.textContent?.trim();
    const baseCaption = figcaption || cardTitle || target.alt || "";
    const hasMultiple = group.length > 1;
    const countText = hasMultiple ? `${index + 1} / ${group.length}` : "";
    const fullCaption = baseCaption && countText ? `${baseCaption} (${countText})` : baseCaption || countText;

    dialogCaption.textContent = fullCaption;
    dialogCaption.hidden = !fullCaption;

    if (prevBtn) prevBtn.hidden = !hasMultiple;
    if (nextBtn) nextBtn.hidden = !hasMultiple;

    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    }
  }, []);

  const step = useCallback(
    (delta: number) => {
      const group = currentGroupRef.current;
      if (group.length <= 1) return;
      showAt((currentIndexRef.current + delta + group.length) % group.length);
    },
    [showAt]
  );

  const close = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog?.open) {
      dialog.close();
    }
    document.body.style.overflow = "";
    if (activeTriggerRef.current) {
      activeTriggerRef.current.focus();
      activeTriggerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.setAttribute("closedby", "any");

    const handleDialogClick = (event: MouseEvent) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isDialogContent =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (isDialogContent) return;
      close();
    };

    const handleCancel = (event: Event) => {
      event.preventDefault();
      close();
    };

    const handleClose = () => {
      document.body.style.overflow = "";
    };

    dialog.addEventListener("click", handleDialogClick);
    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("close", handleClose);

    return () => {
      dialog.removeEventListener("click", handleDialogClick);
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("close", handleClose);
    };
  }, [close]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!dialogRef.current?.open || currentGroupRef.current.length <= 1) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step]);

  useEffect(() => {
    const images = Array.from(document.querySelectorAll<HTMLImageElement>(SELECTOR));
    if (images.length === 0) return;

    const cleanups: Array<() => void> = [];

    images.forEach((img) => {
      if (img.dataset.lightboxBound === "true") return;
      img.dataset.lightboxBound = "true";
      img.tabIndex = 0;
      img.setAttribute("role", "button");
      if (!img.getAttribute("aria-label")) {
        img.setAttribute("aria-label", img.alt ? `Open preview: ${img.alt}` : "Open image preview");
      }

      const open = () => {
        activeTriggerRef.current = img;
        const container = img.closest("article") || img.closest(".screenshot-gallery") || document;
        currentGroupRef.current = Array.from(
          container.querySelectorAll<HTMLImageElement>(SELECTOR)
        ).filter((el) => el instanceof HTMLImageElement);
        showAt(Math.max(0, currentGroupRef.current.indexOf(img)));
      };

      const handleImgClick = (e: MouseEvent) => {
        e.stopPropagation();
        open();
      };

      const handleImgKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      };

      img.addEventListener("click", handleImgClick);
      img.addEventListener("keydown", handleImgKeyDown);

      cleanups.push(() => {
        img.dataset.lightboxBound = "false";
        img.removeEventListener("click", handleImgClick);
        img.removeEventListener("keydown", handleImgKeyDown);
      });

      const figure = img.closest("figure");
      if (figure) {
        const handleFigureClick = (e: MouseEvent) => {
          const target = e.target as HTMLElement | null;
          if (target?.closest("figcaption")) return;
          open();
        };
        figure.addEventListener("click", handleFigureClick);
        cleanups.push(() => {
          figure.removeEventListener("click", handleFigureClick);
        });
      }
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [pathname, showAt]);

  return (
    <dialog
      ref={dialogRef}
      className="image-lightbox"
      aria-label="Image preview"
      onTouchStart={(e) => {
        if (e.touches.length === 1) {
          touchStartXRef.current = e.touches[0].clientX;
        }
      }}
      onTouchEnd={(e) => {
        if (!touchStartXRef.current || e.changedTouches.length !== 1) return;
        const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
        touchStartXRef.current = 0;
        if (Math.abs(deltaX) > 48) {
          step(deltaX < 0 ? 1 : -1);
        }
      }}
    >
      <div
        className="image-lightbox__content"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            close();
          }
        }}
      >
        <button
          type="button"
          className="image-lightbox__close"
          aria-label="Close preview"
          onClick={close}
        >
          <X size={20} aria-hidden="true" />
        </button>

        <button
          ref={prevBtnRef}
          type="button"
          className="image-lightbox__nav image-lightbox__nav--prev"
          aria-label="Previous image"
          onClick={(e) => {
            e.stopPropagation();
            step(-1);
          }}
        >
          <ChevronLeft size={22} aria-hidden="true" />
        </button>

        <img
          ref={dialogImgRef}
          className="image-lightbox__img"
          alt=""
          onClick={close}
        />

        <button
          ref={nextBtnRef}
          type="button"
          className="image-lightbox__nav image-lightbox__nav--next"
          aria-label="Next image"
          onClick={(e) => {
            e.stopPropagation();
            step(1);
          }}
        >
          <ChevronRight size={22} aria-hidden="true" />
        </button>

        <p ref={dialogCaptionRef} className="image-lightbox__caption"></p>
      </div>
    </dialog>
  );
}

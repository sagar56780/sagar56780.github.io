import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const REVEAL_SELECTOR = '.reveal-up';

const useScrollReveal = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealElements = document.querySelectorAll(REVEAL_SELECTOR);

    if (prefersReducedMotion) {
      revealElements.forEach((item) => item.classList.add('is-visible'));
      return undefined;
    }

    let sequence = 0;
    const observer = new IntersectionObserver(
      (entries, activeObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('is-visible');
          activeObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -8% 0px'
      }
    );

    const bindReveal = (root = document) => {
      const targets = root.querySelectorAll ? root.querySelectorAll(REVEAL_SELECTOR) : [];

      targets.forEach((element) => {
        if (element.dataset.revealBound === '1') {
          return;
        }

        element.dataset.revealBound = '1';
        element.style.setProperty('--reveal-delay', `${(sequence % 6) * 75}ms`);
        sequence += 1;
        observer.observe(element);
      });
    };

    bindReveal(document);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) {
            return;
          }

          if (node.matches(REVEAL_SELECTOR)) {
            bindReveal(node.parentElement || document);
            return;
          }

          bindReveal(node);
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      document.querySelectorAll(REVEAL_SELECTOR).forEach((element) => {
        element.removeAttribute('data-reveal-bound');
        element.style.removeProperty('--reveal-delay');
      });
    };
  }, [location.pathname]);
};

export default useScrollReveal;

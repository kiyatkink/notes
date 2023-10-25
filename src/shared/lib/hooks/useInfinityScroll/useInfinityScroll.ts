import { MutableRefObject, useEffect } from 'react';

interface UseInfinityScrollProps {
    root: MutableRefObject<Element | null>,
    target: MutableRefObject<Element>,
    callback: (() => void) | undefined,
    rootMargin?: string,
    threshold?: number
}

export function useInfinityScroll(props: UseInfinityScrollProps) {
  const {
    root,
    target,
    callback,
    rootMargin = '0px',
    threshold = 1.0,
  } = props

  useEffect(() => {
    if (callback) {
      const targetElement = target.current
      const options = {
        root: root.current,
        rootMargin,
        threshold,
      };

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback()
        }
      }, options);

      observer.observe(targetElement);

      return () => {
        observer.unobserve(targetElement)
      }
    }
  }, [callback, root, rootMargin, target, threshold])
}

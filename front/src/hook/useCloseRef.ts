import { useCallback, useEffect, useRef } from "react"

type useCloseRefProps = {
  onClose: () => void
  useEscape?: boolean
}
const useCloseRef = ({ onClose, useEscape = true }: useCloseRefProps) => {
  const closeRef = useRef<HTMLDivElement | null>(null)

  const handleClickOutside = useCallback((event: Event) => {
    if (closeRef?.current && !closeRef?.current.contains(event.target as Node)) {
      onClose()
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  useEffect(() => {
    if (!useEscape) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return closeRef
}

export default useCloseRef
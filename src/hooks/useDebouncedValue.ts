import { useEffect, useRef, useState } from 'react';

export function useDebouncedValue<T>(value: T, delay: number) {
    const timeoutRef = useRef<number | undefined>();
    const [newValue, setNewValue] = useState<T>(value);

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(() => {
            setNewValue(value);
        }, delay);
    }, [value, delay]);

    return newValue;
}

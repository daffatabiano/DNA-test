import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// utils/formatDate.ts
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return format(date, 'EEE, dd MMMM HH.mm', { locale: id });
}

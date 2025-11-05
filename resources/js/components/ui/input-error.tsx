import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

export interface InputErrorProps extends HTMLAttributes<HTMLParagraphElement> {
    message?: string;
}


export function InputError({ message, className, ...props }: InputErrorProps) {
    if (!message) {
        return null;
    }

    return (
        <p
            {...props}
            className={cn(
                'text-sm font-medium text-destructive',
                className,
            )}
        >
            {message}
        </p>
    );
}

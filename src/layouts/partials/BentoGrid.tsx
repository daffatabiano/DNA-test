import { cn } from '@/lib/utils';

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div className={cn('grid gap-4 max-w-7xl mx-auto ', className)}>
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    footer,
    name,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    name?: string | React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                'row-span-12 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input p-4 bg-transparent border border-transparent justify-between flex flex-col space-y-4',
                className
            )}
        >
            {header}
            <div className="group-hover/bento:translate-x-2 transition duration-200">
                <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
                    {title?.includes('|') ? title.split('|')[0] : title}{' '}
                    <em>{name ? '| ' + name : ''}</em>
                </div>
                <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300 mb-2">
                    {description}
                </div>
                <div className=" flex justify-between align-bottom items-end">
                    {footer}
                </div>
            </div>
        </div>
    );
};

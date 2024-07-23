import { IconArrowBigUpLines, IconBook, IconSearch } from "@tabler/icons-react";

export const links = [
    {
        label: 'Readed',
        href: '#',
        icon: (
            <IconBook className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
    },
    {
        label: 'Top News',
        href: '#',
        icon: (
            <IconArrowBigUpLines className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
    },
    {
        label: 'Search',
        href: '#',
        icon: (
            <IconSearch className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
    },
];

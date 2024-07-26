'use client';

import { Modal, ModalTrigger } from '@/components/ui/modals';
import useGet from '@/hooks/useGet';
import { BentoGrid, BentoGridItem } from '@/layouts/partials/BentoGrid';
import { IconBook } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setId } from '@/redux/features/readSlice';
import { useRouter } from 'next/router';
import { cn, formatDate } from '@/lib/utils';
import { SUB_EMPTY_IMAGE } from '@/data/sub/data';
import ErrorSvg from '@/data/sub/svg';
import { clearValue, toggle } from '@/redux/features/searchbarSlice';

const Skeleton = ({ className }: { className: string }) => (
    <div
        className={cn(
            `flex flex-1 w-full h-full md:min-h-[24rem] rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 animatie-pulse`,
            className
        )}
    />
);

export const SkeletonCard = () => {
    return (
        <div className={'grid row-span-1 gap-2 md:grid-cols-8'}>
            <Skeleton className={'md:col-span-4'} />
            <Skeleton className={'md:col-span-2'} />
            <Skeleton className={'md:col-span-2'} />
            <Skeleton className={'md:col-span-2'} />
            <Skeleton className={'md:col-span-2'} />
            <Skeleton className={'md:col-span-4'} />
        </div>
    );
};

export default function MainViews() {
    const { get } = useGet();
    const [isNews, setIsNews] = useState<Article[]>([]);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const isShowSearchBar = useSelector((state) => state?.searchbar);
    const defaultQuery = 'sport';
    console.log(isShowSearchBar);

    const getData = async () => {
        setIsLoading(true);
        const res: any = await get(
            `everything?q=${
                isShowSearchBar?.value ? isShowSearchBar?.value : defaultQuery
            }&from=2024-07-20&to=2024-07-30&sortBy=publishedAt`
        );
        setIsNews(res.data.articles);
        if (res.status === 200) {
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);
    useEffect(() => {
        getData();
    }, [isShowSearchBar?.value]);

    console.log(isNews[0]);

    return (
        <>
            {isLoading && <SkeletonCard />}
            {isNews.length === 0 && (
                <>
                    <div className="flex justify-center text-center">
                        <ErrorSvg />
                    </div>
                    <h1 className="text-center text-3xl">
                        <b className="text-red-500">{isShowSearchBar.value}</b>{' '}
                        is not found
                    </h1>
                    <button
                        onClick={() => dispatch(toggle())}
                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded w-48 m-auto mb-0"
                    >
                        Search Else
                    </button>
                    <div className=" text-center font-bold">OR</div>
                    <button
                        onClick={() => dispatch(clearValue())}
                        className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded w-48 m-auto mt-0"
                    >
                        Back to Default
                    </button>
                </>
            )}
            <BentoGrid className={'md:grid-cols-8'}>
                {isNews?.map((item, i) => (
                    <BentoGridItem
                        key={i}
                        title={item?.title}
                        name={item?.source?.name}
                        description={item?.description}
                        header={
                            <img
                                className="w-full h-full object-cover"
                                src={item?.urlToImage || SUB_EMPTY_IMAGE}
                            />
                        }
                        className={`${
                            i == 0 || i % 5 == 0 ? 'col-span-4' : 'col-span-2'
                        }`}
                        footer={
                            <>
                                <div className="text-xs">
                                    <p className="font-medium">
                                        Post by:
                                        <span className="font-thin">
                                            {' '}
                                            {item?.author};
                                        </span>
                                    </p>
                                    <p className="font-medium">
                                        Published at:{' '}
                                        <span className="font-thin">
                                            {formatDate(item?.publishedAt)}
                                        </span>
                                    </p>
                                </div>
                                <Modal>
                                    {' '}
                                    <ModalTrigger
                                        onClick={(e) => {
                                            e.preventDefault();
                                            dispatch(setId(item));
                                            setTimeout(() => {
                                                window.open(
                                                    item?.url,
                                                    '_blank'
                                                );
                                            }, 1000);
                                        }}
                                        className="bg-tranparent max-h-10 w-24 border-solid border-2 border-slate-700 dark:bg-white dark:text-black text-slate-800 flex justify-center group/modal-btn z-0"
                                    >
                                        <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                                            <IconBook stroke={2} />
                                        </span>
                                        <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 bg-slate-700 text-slate-100 text-sm">
                                            Read More
                                        </div>
                                    </ModalTrigger>
                                </Modal>
                            </>
                        }
                    />
                ))}
            </BentoGrid>
        </>
    );
}

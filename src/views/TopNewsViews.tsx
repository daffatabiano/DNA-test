'use client';

import { Modal, ModalTrigger } from '@/components/ui/modals';
import { SUB_EMPTY_IMAGE } from '@/data/sub/data';
import useGet from '@/hooks/useGet';
import { BentoGrid, BentoGridItem } from '@/layouts/partials/BentoGrid';
import { setId } from '@/redux/features/readSlice';
import { IconBook2 } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SkeletonCard } from './MainViews';
import ErrorSvg from '@/data/sub/svg';
import { clearValue, toggle } from '@/redux/features/searchbarSlice';

export default function TopNewsViews() {
    const { get } = useGet();
    const [isNews, setIsNews] = useState<Article[]>([]);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const isQuery = useSelector((state) => state?.searchbar);

    const getData = async () => {
        setIsLoading(true);
        const res: any = await get(
            `top-headlines?sources=${
                isQuery?.value ? isQuery?.value : 'techcrunch'
            }`
        );
        setIsNews(res?.data?.articles);
        if (res?.status === 200) {
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
    }, [isQuery?.value]);

    return (
        <>
            {isLoading && <SkeletonCard />}
            {isNews.length === 0 && (
                <>
                    <div className="flex justify-center text-center">
                        <ErrorSvg />
                    </div>
                    <h1 className="text-center text-3xl">
                        <b className="text-red-500">{isQuery.value}</b> is not
                        available sources
                    </h1>
                    <button
                        onClick={() => dispatch(toggle())}
                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded w-48 m-auto mb-0"
                    >
                        Search on Sources
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
                            <Modal>
                                {' '}
                                <ModalTrigger
                                    onClick={(e) => {
                                        e.preventDefault();
                                        dispatch(setId(item));
                                        setTimeout(() => {
                                            window.open(item?.url, '_blank');
                                        }, 1000);
                                    }}
                                    className="bg-black w-24 dark:bg-white dark:text-black text-white flex justify-center group/modal-btn z-0"
                                >
                                    <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                                        <IconBook2 stroke={2} />
                                    </span>
                                    <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white ">
                                        Read More
                                    </div>
                                </ModalTrigger>
                            </Modal>
                        }
                    />
                ))}
            </BentoGrid>
        </>
    );
}

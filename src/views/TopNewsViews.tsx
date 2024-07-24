'use client';

import { Modal, ModalTrigger } from '@/components/ui/modals';
import { SUB_EMPTY_IMAGE } from '@/data/sub/data';
import useGet from '@/hooks/useGet';
import { BentoGrid, BentoGridItem } from '@/layouts/partials/BentoGrid';
import { setId } from '@/redux/features/readSlice';
import { IconBook2 } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SkeletonCard } from './MainViews';

export default function TopNewsViews() {
    const { get } = useGet();
    const [isNews, setIsNews] = useState<Article[]>([]);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    // const isUrl = useSelector((state) => console.log(state?.read));

    const getData = async () => {
        setIsLoading(true);
        const res: any = await get('top-headlines?sources=techcrunch');
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

    return (
        <>
            {isLoading && <SkeletonCard />}
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

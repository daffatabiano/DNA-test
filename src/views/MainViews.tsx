'use client';

import { Modal, ModalTrigger } from '@/components/ui/modals';
import useGet from '@/hooks/useGet';
import { BentoGrid, BentoGridItem } from '@/layouts/partials/BentoGrid';
import { IconBook2 } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setId } from '@/redux/features/readSlice';
import { useRouter } from 'next/router';

const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

export default function MainViews() {
    const { get } = useGet();
    const [isNews, setIsNews] = useState([]);
    const dispatch = useDispatch();
    // const isUrl = useSelector((state) => console.log(state?.read));
    const router = useRouter();

    const getData = async () => {
        const res = await get(
            'everything?q=apple&from=2024-07-22&to=2024-07-22&sortBy=popularity'
        );
        setIsNews(res?.data?.articles);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <BentoGrid className={'md:grid-cols-8'}>
                {isNews?.map((item, i) => (
                    <BentoGridItem
                        key={i}
                        title={item?.title}
                        description={item?.description}
                        header={
                            <img className="w-full" src={item?.urlToImage} />
                        }
                        className={`${
                            i == 0 || i % 5 == 0 ? 'col-span-4' : 'col-span-2'
                        }`}
                        footer={
                            <Modal>
                                {' '}
                                <ModalTrigger
                                    onClick={() => {
                                        dispatch(setId(item));
                                    }}
                                    className="bg-black w-24 dark:bg-white dark:text-black text-white flex justify-center group/modal-btn"
                                >
                                    <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                                        <IconBook2 stroke={2} />
                                    </span>
                                    <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
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

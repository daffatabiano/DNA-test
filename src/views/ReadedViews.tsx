import { Modal, ModalTrigger } from '@/components/ui/modals';
import { SUB_EMPTY_IMAGE } from '@/data/sub/data';
import ErrorSvg from '@/data/sub/svg';
import { useAppSelector } from '@/hooks/redux';
import { BentoGrid, BentoGridItem } from '@/layouts/partials/BentoGrid';
import { setId } from '@/redux/features/readSlice';
import { IconBook2 } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ReadedViews() {
    const isRead = useAppSelector((state) => state?.read);
    const [isNews, setIsNews] = useState<any[]>([]);
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        setIsNews(isRead?.id);
    }, []);

    return (
        <>
            {isNews?.length === 0 ? (
                <>
                    <div className="flex justify-center ">
                        <ErrorSvg />
                    </div>
                    <h1 className="text-center text-3xl">
                        No news which you read yet
                    </h1>
                    <button
                        onClick={() => router.push('/')}
                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded w-48 m-auto"
                    >
                        Read News
                    </button>
                </>
            ) : null}
            <BentoGrid className={'md:grid-cols-8'}>
                {isNews?.map((item, i) => (
                    <BentoGridItem
                        key={i}
                        title={item?.title}
                        description={item?.description}
                        header={
                            <img
                                className="w-full h-full object-cover"
                                src={item?.urlToImage}
                            />
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
                                    className="bg-black w-24 dark:bg-white dark:text-black text-white flex justify-center group/modal-btn z-0"
                                >
                                    <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                                        <IconBook2 stroke={2} />
                                    </span>
                                    <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white ">
                                        Read Again
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

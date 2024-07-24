import { Modal, ModalTrigger } from '@/components/ui/modals';
import { BentoGrid, BentoGridItem } from '@/layouts/partials/BentoGrid';
import { setId } from '@/redux/features/readSlice';
import { IconBook2 } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ReadedViews() {
    const isRead = useSelector((state) => state?.read);
    const [isNews, setIsNews] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        setIsNews(isRead?.id);
    }, []);
    console.log(isNews, 'isNewwewews');

    return (
        <>
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

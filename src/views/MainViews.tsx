import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from '@/components/ui/modals';
import useGet from '@/hooks/useGet';
import { BentoGridItem } from '@/layouts/partials/BentoGrid';
import {
    IconArrowWaveRightUp,
    IconBook2,
    IconBoxAlignRightFilled,
    IconBoxAlignTopLeft,
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
} from '@tabler/icons-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { clearId, setId } from '@/redux/features/readSlice';

const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

export default function MainViews() {
    const { get } = useGet();
    const [isNews, setIsNews] = useState([]);
    const dispatch = useDispatch();
    const isUrl = useSelector((state) => state?.read);

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
            <BentoGridItem
                title={isNews[0]?.title}
                description={isNews[0]?.description}
                header={<img src={isNews[0]?.urlToImage} />}
                footer={
                    <Modal>
                        {' '}
                        <ModalTrigger
                            onClick={() => dispatch(setId(isNews[0]?.url))}
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
                className={'md:row-span-full'}
            />
        </>
    );
}

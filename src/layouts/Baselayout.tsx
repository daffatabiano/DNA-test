import { AuroraBackground } from './partials/AuroraBackground';
import { motion } from 'framer-motion';

export default function BaseLayout(prop: Maintype) {
    return (
        <>
            <AuroraBackground>
                <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: 'easeInOut',
                    }}
                >
                    {prop?.children}
                </motion.div>
            </AuroraBackground>
        </>
    );
}

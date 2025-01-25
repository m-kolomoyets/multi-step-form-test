import { motion } from 'framer-motion';
import type { ProgressBarProps } from './types';

const ProgressBar: React.FC<ProgressBarProps> = ({ total, current }) => {
    return (
        <motion.div
            layoutId="progress-bar"
            className="flex h-2 items-center gap-1 z-20 bg-primary"
            animate={{ width: `${(current / total) * 100}%` }}
            initial={false}
        />
    );
};

export default ProgressBar;

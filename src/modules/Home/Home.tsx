import { memo } from 'react';
import clsx from 'clsx';
import Button from '@/ui/Button';
import s from './Home.module.css';

const Home: React.FC = () => {
    return (
        <main className={clsx(s.wrap, 'full-height')}>
            <Button>Hello</Button>
        </main>
    );
};

export default memo(Home);

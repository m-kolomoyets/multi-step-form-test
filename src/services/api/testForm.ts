import { sleep } from '@/utils/sleep';
import { ONE_SECOND } from '@/constants';

export const createContact = async () => {
    await sleep(2 * ONE_SECOND);

    return {
        success: true,
    };
};

export const createCompany = async () => {
    await sleep(2 * ONE_SECOND);

    return {
        success: true,
    };
};

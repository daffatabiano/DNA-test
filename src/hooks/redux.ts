import { RootState } from '@/redux/reducers';
import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector,
    useStore,
} from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<any>();
export const useAppStore = useStore.withTypes<any>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

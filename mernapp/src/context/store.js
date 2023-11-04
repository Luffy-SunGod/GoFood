import {configureStore} from '@reduxjs/toolkit';
import { addToCartSlice } from '../feature/cart/cartSlice';

export const store=configureStore({
    reducer:addToCartSlice

})

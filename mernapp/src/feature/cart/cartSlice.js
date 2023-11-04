import { createSlice,current } from "@reduxjs/toolkit";


const initialState={
    cart:[]
}

export const addToCartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const newObj={
                _id:action.payload._id,
                name:action.payload.name,
                qty:action.payload.qty,
                size:action.payload.size,
                price:action.payload.finalPrice,
                categoryName:action.payload.CategoryName,
                options:action.payload.options

            }
            state.cart.push(newObj);
            console.log(newObj);
           

        },
        removeCart:(state,action)=>{
            console.log("removecart");
            console.log(action.payload);
            state.cart=state.cart.filter((data)=>data.size!==action.payload.size||data._id!==action.payload._id);           
        },
        updateCart:(state,action)=>{
            state.cart=state.cart.map((data)=>{
                if(data._id===action.payload._id){
                    data.qty+=action.payload.qty;
                    data.price=(data.qty)*action.payload.finalPrice;
                }
                return data;
            })

        },
        drop:(state,action)=>{
            state=state.cart.splice(0,state.cart.length);
        }

    }
})


export const {addToCart,removeCart,updateCart,drop} =addToCartSlice.actions;
export default addToCartSlice.reducer;
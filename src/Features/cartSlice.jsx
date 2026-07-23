import React from 'react';
import { createSlice } from '@reduxjs/toolkit';

const initialState=()=> {
    items:[]
}

 
    const cartSlice = createSlice({
        initialState,
        name: cart,

        reducers:{
                addToCart:(state,action)=>{
                    const product = action.payload;
                  const existing = state.items.find((item)=> item.id===product.id)
                  if(!existing){
                            state.items.push(product);
                  }
                    
                },
                removeFromCart:(state,action)=>{
                    state.items.filter((item)=> item.id !== action.payload)

                },
                clearCart:(state)=>{

                },

        }

        
    })
 export const {addToCart,removeFromCart,clearCart} = cartSlice.actions;
 export default cartSlice.reducer;
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  return (
    <section>Order</section>
  )
}

export default OrderHistory
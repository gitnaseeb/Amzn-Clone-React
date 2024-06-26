import React, { useEffect, useState } from 'react'
import './Orders.css'
import { db } from './firebase';
import { useStateValue } from './StateProvider';
import { onSnapshot } from 'firebase/firestore';
import Order from './Order';
function Orders() {
  const [orders,setOrders]=useState([]);
  const [{basket ,user},dispatch]=useStateValue()

  useEffect(()=>{
    if(user){
      db.collection('users')
      .doc(user?.uid)
      .collection('orders')
      .orderBy('created','desc')
      .onSnapshot(snapshot =>{
        setOrders(snapshot.docs.map(doc =>({
          id:doc.id,
          data:doc.data()
        })))
      })
    }else{
      setOrders([])
    }

  },[user])

  return (
    <div className='orders'>
   <h2>Your orders</h2>
   <div className='orders_order'>
{orders?.map(order =>{
  <Order order={order} />
})}
   </div>
    </div>
  )
}

export default Orders
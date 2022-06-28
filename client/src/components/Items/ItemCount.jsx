import React from "react";
import { useState } from "react";

const ItemCount = ({ item }) => {
    const [count, setCount] = useState(0);

    const addCount = () => {
        if (count < item.stock) {
          setCount(count + 1)
          console.log(count)
        }
      }
    
      const restCount = () => {
        if (count > 0) setCount(count - 1)
        console.log(count)
      }

    return (
        <div>
            <p> Stock: {item.stock}</p>
            <button onClick={addCount}>+</button>
            <p>{count}</p>
            <button onClick={restCount}>-</button>
        </div>
    );
}

export default ItemCount;
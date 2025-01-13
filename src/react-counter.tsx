// Implement a Counter component with two buttons:
// “Increase” and “Decrease”, which displays the current counter value.
import React from 'react'

function Counter() {
    
    const [count, setCount] = useState(0);

    
    const increase = () => {
        setCount(prevCount => prevCount + 1);
    };

    
    const decrease = () => {
        setCount(prevCount => prevCount - 1);
    };

    return ();
}

export default Counter

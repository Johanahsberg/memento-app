import React, { useState } from 'react'

const useAppBadge = () => {
    const [counter, setCounter] = useState(1);

    const setBadge = () => {
        setCounter(counter => counter + 1 );
        if(navigator.setAppBadge){
            navigator.setAppBadge(counter);
        }else if(navigator.setClientBadge){
            navigator.setClientBadge();
        }
    }

    const clearBadge = () => {
        setCounter(counter => counter + 1 );
        if(navigator.clearAppBadge){
            navigator.clearAppBadge();
        }else if(navigator.clearClientBadge){
            navigator.clearAppBadge();
        }
    }


  return [setBadge, clearBadge];
  
}

export default useAppBadge
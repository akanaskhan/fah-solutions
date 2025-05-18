import React, { useEffect, useState } from "react";

export default function Spinner(){
   
   const [text, setText] = useState('')
   const [img, setImg] = useState(true)
   
    useEffect(() => {
        setTimeout(() => {
            setImg(false)
            setText("wait for 3 sec")
        }, 3000);
    },[])

    return(
        <>
        <div>
            {
                setImg ?(
                   <div className="ring-of-dots"></div>
                ): (
                    <h3>{text}</h3>
                )
            }
        </div>
        </>
    )
}
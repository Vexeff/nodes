import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image'

export default function XPAnimation( isVisible: boolean ) {

        // get crown emoji
        const confetti = <Image
        src="/confetti.png"
        width={0}
        height={0}
        alt="confetti"
        style={{width:'200px', height: "auto" }}
        />



    return (         
        <AnimatePresence>        
                {isVisible && 
                 <motion.img
                        className='absolute'
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                        animate={{ 
                                scale: [0.01, 0.2, 0.01], 
                                rotate: [0, -360],
                                x: [0, -100],
                                y: [-200, -300],
                                opacity: [0, 1, 0]
                                }}
                        exit={{ opacity: 0 }}
                        src={'/confetti.svg'}>  
                </motion.img>}
        </AnimatePresence>    
    );

}
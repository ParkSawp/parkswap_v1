import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

export default function BlogReveal({ children, delay = .25, ...props }) {

    const ref = useRef(null);
    const inInView = useInView(ref, { once: true });

    const mainControls = useAnimation();

    useEffect(() => {
        if(!inInView) {
            return;
        }
        console.log(inInView)
        mainControls.start('visible');

    }, [inInView]);

    return (
        <motion.div
            ref={ref}
            {...props}
            variants={{
                hidden: {opacity: 0, y: 75},
                visible: {opacity: 1, y: 0},
            }}
            initial='hidden'
            animate={mainControls}
            transition={{duration: .5, delay}}
        >
            {children}
        </motion.div>
    )
};
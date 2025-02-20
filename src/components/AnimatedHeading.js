import React from "react";
import { motion } from "framer-motion";


function AnimatedHeading({ heading, img, headingClass }) {
  return (
    <motion.div
    initial={{ opacity: 0, x: '-100%' }}
    whileInView={{ opacity: 1, x: '0px'
    }}
    viewport={{ once: true, amount: "some" }}
    transition={{ duration: 1 }}
    className={`${headingClass}__heading`}
    style={{
      display: "flex",
    }}
    >
      <img className={`${headingClass}__img`} src={img} alt="" />
      <h2 className={`${headingClass}__text`}>{heading}</h2>
    </motion.div>
  );
}

export default AnimatedHeading;

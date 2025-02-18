import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

function AnimatedHeading({heading, img}) {
  // Ссылка на сам элемент, который будем анимировать
  const ref = useRef(null);

  /**
   * useScroll позволяет отследить, где наш элемент (ref) находится
   * относительно окна браузера. В offset указываем, при каких
   * «соприкосновениях» элемента с вьюпортом считать прогресс 0 и 1.
   *
   * Пример: ["start end", "end start"] означает:
   *   - 0, когда "верх" элемента (start) касается "низа" вьюпорта (end)
   *   - 1, когда "низ" элемента (end) касается "верха" вьюпорта (start)
   */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /**
   * Теперь «превращаем» scrollYProgress (от 0 до 1) в движение по оси X
   * При 0 → x = -100% (элемент за левым краем)
   * При 1 → x = 0 (элемент полностью в видимой области)
   */
  const x = useTransform(scrollYProgress, [0, 0.5], ["-100%", "0%"]);

	// Добавляем useSpring для более плавного движения
	const smoothX = useSpring(x, {
		stiffness: 100, // Упругость: выше = быстрее
		damping: 20, // Затухание: выше = плавнее
		mass: 1, // Масса влияет на инерцию
	});
  return (
    <motion.div
		className="cases__heading"
    ref={ref}
    style={{
    x: smoothX, // Привязываем к анимации
    display: "flex",
    }}
		transition={{ duration: 1 }}
    >
			<img className="cases__img" src={img} alt="" />
      <h2 className="cases__text">{heading}</h2>
    </motion.div>
  );
}


export default AnimatedHeading
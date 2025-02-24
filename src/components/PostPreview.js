import { useContext, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useTransform } from 'framer-motion';
import { ScrollContext } from '../App'; // Убедись, что путь к ScrollContext правильный

const PostPreview = ({ post, getImageUrl, index }) => {
  const imgRef = useRef(null); // Ссылка на элемент картинки
  const [start, setStart] = useState(0); // Начало параллакса
  const [end, setEnd] = useState(0); // Конец параллакса
  const { scrollY } = useContext(ScrollContext); // Получаем scrollY из контекста

  // Вычисляем start и end на основе реального положения картинки
  useEffect(() => {
    const updatePositions = () => {
      if (imgRef.current) {
        const rect = imgRef.current.getBoundingClientRect();
        const scrollTop = scrollY.get(); // Текущая позиция скролла
        const viewportHeight = window.innerHeight;

        // Позиция верхней части картинки относительно документа
        const imgTop = rect.top + scrollTop;
        // Позиция нижней части картинки
        const imgBottom = imgTop + rect.height;

        // Start: когда верх картинки входит в зону видимости
        setStart(imgTop - viewportHeight);
        // End: когда низ картинки выходит из зоны видимости
        setEnd(imgBottom);
      }
    };

    updatePositions(); // Вычисляем при загрузке
    window.addEventListener('resize', updatePositions); // Обновляем при изменении размера окна
    return () => window.removeEventListener('resize', updatePositions); // Чистим слушатель
  }, [scrollY]);

  // Параллакс: сдвиг от 0 до 50px на протяжении start до end
  const parallaxY = useTransform(scrollY, [start, end], [0, 80]);

  return (
    <motion.div className="post__preview"
    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100}}
    whileInView={{ opacity: 1, x: 0}}
    >
      <div className='post__preview--top'>
        <div className="post__preview--wrapper">
          <motion.img
            loading="lazy"
            ref={imgRef} // Привязываем реф к картинке
            className="post__preview--img"
            src={getImageUrl(post)}
            alt={post.title.rendered || 'Пост'}
            style={{ y: parallaxY }} // Применяем параллакс
          />
        </div>
        <Link to={`/post/${post.id}`}>
          <h2
            className="post__preview--heading"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <p
            className="post__preview--descr"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          />
        </Link>
      </div>
      <div className="post__preview--additional">
        <div className="button__additional">{post.acf.cooperation}</div>
        <div className="button__additional">{post.acf.role}</div>
      </div>
      <a
        className="post__preview--href"
        href={post.acf.link}
        rel="noreferrer"
        target="_blank"
      >
        <p>На сайт</p><span>🡥</span>
      </a>
    </motion.div>
  );
};

export default PostPreview;
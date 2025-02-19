import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(6);

  useEffect(() => {
    fetch('https://a1w.ru/wp-json/wp/v2/posts?_embed')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Ошибка загрузки:', error));
  }, []);


  // Подбираем размер изображений под тип устройства
  const getImageUrl = (post) => {
    const featuredMediaArray = post._embedded?.['wp:featuredmedia'];
    if (!featuredMediaArray) return '';

    const featuredMedia = featuredMediaArray.find(media => media.media_details?.sizes);
    if (window.innerWidth < 767) {
      return featuredMedia?.media_details?.sizes?.medium?.source_url ||
      featuredMedia?.media_details?.sizes?.full?.source_url
    } else if (window.innerWidth < 2500) {
      return featuredMedia?.media_details?.sizes?.medium_large?.source_url ||
      featuredMedia?.media_details?.sizes?.full?.source_url
    } else if (window.innerWidth > 2500) {
      return featuredMedia?.media_details?.sizes?.large?.source_url ||
      featuredMedia?.media_details?.sizes?.full?.source_url
    }
  };

  return (
    <div className='cases__posts'>
      {posts.slice(0, visiblePosts).reverse().map((post, index) => (
        <motion.div
        key={post.id}
        initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100}}
        whileInView={{ opacity: 1, x: 0}}
        transition={{ duration: 0.5}}
        className="post__preview">					
					<div>
					<img
            className='post__preview--img'
            src={getImageUrl(post)}
            alt={post.title.rendered}
          />
          <Link to={`/post/${post.id}`}>
						<h2 className='post__preview--heading' dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            <p className='post__preview--descr' dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </Link>
					</div>
					<div className='post__preview--additional'>
						<div className='button__additional'>{post.acf.cooperation}</div>
						<div className='button__additional'>{post.acf.role}</div>
					</div>
					<a className='post__preview--href' href={post.acf.link} rel='noreferrer' target="_blank"><p>На сайт</p><span>&#129125;</span></a>
        </motion.div>
      ))}
      {visiblePosts < posts.length && (
        <button onClick={() => setVisiblePosts(posts.length)}>Смотреть все</button>
      )}
    </div>
  );
};

export default PostsList;
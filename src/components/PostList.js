import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(6);

  useEffect(() => {
    fetch('https://a1w.ru/wp-json/wp/v2/posts?_embed')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Ошибка загрузки:', error));
  }, []);

  return (
    <div className='cases__posts'>
      {posts.slice(0, visiblePosts).reverse().map((post) => (
        <div key={post.id} className="post__preview">					
          <img
            className='post__preview--img'
            src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''}
            alt={post.title.rendered}
          />
					<a className='post__preview--href' href={post.acf.link} rel='noreferrer' target="_blank"><p>На сайт</p><span>&#129125;</span></a>
          <Link to={`/post/${post.id}`}>
						<h2 className='post__preview--heading' dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            <p className='post__preview--descr' dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </Link>
        </div>
      ))}
      {visiblePosts < posts.length && (
        <button onClick={() => setVisiblePosts(posts.length)}>Смотреть все</button>
      )}
    </div>
  );
};

export default PostsList;
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_URL = 'https://a1w.ru/wp-json/wp/v2/posts';

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/${id}?_embed`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Ошибка загрузки поста:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (!post) return <p>Пост не найден</p>;

  return (
    <div>
      <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <img src={post._embedded['wp:featuredmedia']?.[0]?.source_url} alt={post.title.rendered} />
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </div>
  );
}

export default PostPage;

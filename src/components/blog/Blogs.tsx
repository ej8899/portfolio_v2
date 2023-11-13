import React from '../../assets/components/React';
import { LegacyRef, useEffect, useRef, useState } from 'react';
import './Blogs.scss';

interface BlogPost {
  title: string;
  date: string;
  keywords: string[];
  article: string;
}

function BlogComponent() {
  const [blogPosts, setBlogPosts] = useState<{ [postId: string]: BlogPost }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://erniejohnson.ca/cgi-bin/post.py?action=fetch', {
          method: 'POST',
          mode: 'cors',
        });
        // const response = await fetch('http://localhost:8000/post.py?action=fetch', {
        //   method: 'POST',
        //   mode: 'no-cors',
        // });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data: { [postId: string]: BlogPost } = await response.json();

        // Assuming the returned JSON structure is like { postID: { title, date, keywords, article }, ... }
        setBlogPosts(data);
        console.log('data:', blogPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    void fetchData();
  }, []);

  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, react/prop-types, @typescript-eslint/no-unsafe-member-access
    <section id='blog' className='blog' aria-label='blog posts'>
      <div className='column full_height centered_grid'>
        <h2 className='portfolio__title'>Blog Posts</h2>
        <div className='portfolio__subtitle-message subtitle-message'>Some of my Ramblings</div>
        <ul>
          {Object.entries(blogPosts).map(([postId, post]) => (
            <li key={postId}>
              <h2>{post.title}</h2>
              <p>Date: {post.date}</p>
              <p>ID: {postId}</p>
              <p>Keywords: {post.keywords.join(', ')}</p>
              <p>Article: {post.article}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default BlogComponent;

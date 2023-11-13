import React from '../../assets/components/React';
import { LegacyRef, useEffect, useRef, useState } from 'react';
import './Blogs.scss';
import Collapse from '../collapse/Collapse';

interface BlogPost {
  title: string;
  date: string;
  keywords: string[];
  article: string;
}

const convertMarkdownToHtml = (markdown: string): string => {
  if (!markdown) {
    return '';
  }

  // Convert bold text: **text** to <strong>text</strong>
  markdown = markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Convert italic text: *text* to <em>text</em>
  markdown = markdown.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Convert images: ![alt text](url) to <img src="url" alt="alt text" />
  markdown = markdown.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" />');
  // Convert horizontal rule: --- to <hr />
  markdown = markdown.replace(/---/g, '<hr />');
  // Convert links: [text](url) to <a href="url">text</a>
  markdown = markdown.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

  return markdown;
};

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
        <h2 className='blog__title'>Blog Posts</h2>
        <div className='blog__subtitle-message subtitle-message'>Some of my Ramblings</div>
        <ul>
          {Object.entries(blogPosts).map(([postId, post]) => (
            <li key={postId}>
              <Collapse title={post.title} key={postId}>
                <p>Date: {post.date}</p>
                <p>ID: {postId}</p>
                <p>Keywords: {post.keywords.join(', ')}</p>
                <div
                  className='project__text-p'
                  dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(post.article) }}
                ></div>
              </Collapse>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default BlogComponent;

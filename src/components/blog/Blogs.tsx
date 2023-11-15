import React from '../../assets/components/React';
import { LegacyRef, useEffect, useRef, useState } from 'react';
import './Blogs.scss';
import Collapse from '../collapse/Collapse';

interface BlogPost {
  image: string;
  title: string;
  date: string;
  keywords: string[];
  article: string;
  id: string;
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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [postOpen, setPostOpen] = useState(false);

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

  const handleToggleBlog = () => {
    setIsOpen((prev) => !prev);
    setSelectedPost(null);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleToggleBlog();
    }
  };

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setPostOpen(true);
    console.log(post);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    const slideOver = document.querySelector('.slide-over');
    if (slideOver && !slideOver.contains(e.target as Node)) {
      setPostOpen(false);
    }
    console.log('click out');
  };

  useEffect(() => {
    if (postOpen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [postOpen]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, react/prop-types, @typescript-eslint/no-unsafe-member-access
    <div className={`blog-container ${isOpen ? 'open' : ''}`}>
      <div
        className={`blog-tab ${isOpen ? '' : 'open'}`}
        role='button'
        tabIndex={0}
        onClick={handleToggleBlog}
        onKeyDown={handleKeyDown}
      >
        Blog
      </div>
      <section id='blog' className={`blog ${isOpen ? 'open' : ''}`} aria-label='blog posts'>
        <div className='column full_height centered_grid'>
          <h2 className='blog__title'>Blog Posts</h2>
          <div className='blog__subtitle-message subtitle-message'>Some of my Ramblings</div>
          <ul>
            {Object.entries(blogPosts)
              .sort(([, postA], [, postB]) => new Date(postB.date) - new Date(postA.date))
              .map(([postId, post]) => (
                <li key={postId}>
                  <div
                    className='blog-post-row'
                    role='button'
                    tabIndex={0} // Make the div focusable
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePostClick(post);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.stopPropagation();
                        handlePostClick(post);
                      }
                    }}
                  >
                    {post.image && (
                      <img src={post.image} alt={`${post.title}`} className='blog-post-image' />
                    )}
                    <div className='blog-post-details'>
                      <p className='post-title'>{post.title}</p>
                      {post.date && <p>Date: {post.date}</p>}
                      <p>
                        {post.keywords.map((keyword, index) => (
                          <span key={index} className='projcard-tag'>
                            {keyword}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </section>
      {selectedPost && (
        <div className={`slide-over ${postOpen ? 'open' : ''}`}>
          <div className='slide-over-content'>
            {selectedPost.image && (
              <img
                src={selectedPost.image}
                alt={`${selectedPost.title}`}
                className='blog-post-image-full'
              />
            )}
            <h2>{selectedPost.title}</h2>
            {selectedPost.date && <p>Date: {selectedPost.date}</p>}

            <p>
              {selectedPost.keywords.map((keyword, index) => (
                <span key={index} className='projcard-tag'>
                  {keyword}
                </span>
              ))}
            </p>

            <div
              className='blog__text-p'
              dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(selectedPost.article) }}
            ></div>
          </div>
          <button onClick={() => setPostOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default BlogComponent;

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
        // console.log('data:', blogPosts);
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

  // close if click/tap outside of blog window
  const handleOutsideBlogClick = (e: MouseEvent) => {
    console.log('closing blog posts');
    const blogContainer = document.getElementById('blog-container');
    if (blogContainer && !blogContainer.contains(e.target as Node)) {
      handleToggleBlog();
    }
  };

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setPostOpen(true);
    const readDate = new Date();
    localStorage.setItem(`readStatus-${post.id}`, readDate.toISOString());
    // console.log(post);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    const slideOver = document.querySelector('.slide-over');
    if (slideOver && !slideOver.contains(e.target as Node)) {
      setPostOpen(false);
    }
    // console.log('click out');
  };

  const isPostRead = (postId: string) => {
    return localStorage.getItem(`readStatus-${postId}`) === 'true';
  };

  const getFormattedReadDate = (postId: string) => {
    const readDateISOString = localStorage.getItem(`readStatus-${postId}`);

    if (readDateISOString) {
      const readDate = new Date(readDateISOString);
      const today = new Date();

      if (readDate.toDateString() === today.toDateString()) {
        return 'today';
      } else if (
        readDate.toDateString() === new Date(today.getTime() - 24 * 60 * 60 * 1000).toDateString()
      ) {
        return 'yesterday';
      } else {
        // Customize the date format as needed
        return readDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      }
    }

    return 'never'; // Return an empty string if not read
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

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleOutsideBlogClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideBlogClick);
    };
  }, [isOpen]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, react/prop-types, @typescript-eslint/no-unsafe-member-access
    <div id='blog-container' className={`blog-container ${isOpen ? 'open' : ''}`}>
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
          {Object.keys(blogPosts).length === 0 ? (
            <div className='centered_item'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='send-status error'
                viewBox='0 0 24 24'
              >
                <path
                  fill='var(--clr-error)'
                  d='M12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm0-4q.425 0 .713-.288T13 12V8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8v4q0 .425.288.713T12 13Zm0 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z'
                />
              </svg>
              <p className='thanksmessage'>
                Something went wrong fetching blog posts.
                <br />
                <br />
                Please try again shortly.
              </p>
            </div>
          ) : (
            <div className='centered_grid'>
              <h2 className='blog__header'>Blog Posts</h2>
              <div className='blog__subtitle-message subtitle-message'>Some of my Ramblings:</div>
              <ul>
                {Object.entries(blogPosts)
                  .sort(([, postA], [, postB]) => {
                    const dateA = new Date(postA.date);
                    const dateB = new Date(postB.date);
                    return dateB.getTime() - dateA.getTime();
                    // new Date(postB.date) - new Date(postA.date)
                  })
                  .map(([postId, post]) => (
                    <li key={postId}>
                      <div
                        className={`blog-post-row ${
                          getFormattedReadDate(postId) !== 'never' ? 'blog-read' : ''
                        }`}
                        role='button'
                        tabIndex={0} // Make the div focusable
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePostClick({ ...post, id: postId });
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.stopPropagation();
                            handlePostClick({ ...post, id: postId });
                          }
                        }}
                      >
                        {post.image && (
                          <img src={post.image} alt={`${post.title}`} className='blog-post-image' />
                        )}
                        <div className='blog-post-details'>
                          <p className='post-title'>{post.title}</p>
                          <p>last read: {getFormattedReadDate(postId)}</p>
                          <p className='post-title'>ID{post.id}</p>
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
              <button className='button button__outline buttonfill' onClick={handleToggleBlog}>
                back
              </button>
            </div>
          )}
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
          <div className='centered_grid'>
            <button
              className='button button__outline buttonfill'
              onClick={() => setPostOpen(false)}
            >
              back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogComponent;

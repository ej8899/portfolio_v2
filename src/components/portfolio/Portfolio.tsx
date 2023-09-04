import { useEffect, useRef, useState } from 'react';
import Minus from '../../assets/components/Minus';
import Plus from '../../assets/components/Plus';
import PROJECTS from '../../data/projects';
import useElementOnScreen from '../../hooks/useElementOnScreen';
import Project from '../project/Project';
import './Portfolio.scss';

function Portfolio() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const extraProjectsRef = useRef(null);
  const [renderAllProjects, setRenderAllProjects] = useState(false);
  const isOnScreen = useElementOnScreen(titleRef);
  const isExtraOnScreen = useElementOnScreen(extraProjectsRef);
  let projectNum = 0;

  useEffect(() => {
    if (!isOnScreen) return;
    titleRef.current?.classList.add('animate-in');
  }, [isOnScreen]);
  useEffect(() => {
    if (!isExtraOnScreen) {
      setRenderAllProjects(false);
    }
  }, [isExtraOnScreen]);

  return (
    <section id='portfolio' className='portfolio' aria-label='my portfolio'>
      <div className='custom-shape-divider-top-1681930915'>
        <svg
          data-name='Layer 1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1200 120'
          preserveAspectRatio='none'
        >
          <path
            d='M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z'
            className='shape-fill'
          ></path>
        </svg>
      </div>

      <div className='column full_height centered_grid'>
        {/* navigation point: skip over wavy divider */}
        <h2 className='portfolio__title' ref={titleRef}>
          My Portfolio
        </h2>

        {/* featured projects */}
        {PROJECTS.filter((project) => project.featured).map((project, i) => {
          projectNum++;
          return <Project data={project} number={i} key={project.title} />;
        })}

        <span className='portfolio__additional-projects'>
          <h3>Additional Projects:</h3>
          <button
            className='portfolio__view-more portfolio__additional-projects-title'
            // data-tooltip='View All Projects'
            onClick={() => {
              setRenderAllProjects((prev) => !prev);
            }}
            aria-label={`${renderAllProjects ? 'Hide Extra Projects' : 'View All Projects'}`}
          >
            {renderAllProjects ? <Minus /> : <Plus />}
          </button>
        </span>

        {/* remainder of projects */}
        <div
          ref={extraProjectsRef}
          className={`extraprojects-wrapper ${renderAllProjects ? 'nowopen' : 'closed'}`}
        >
          <div className='portfolio__extra_projects'>
            {PROJECTS.filter((project) => !project.featured).map((project, i) => {
              projectNum++;
              return <Project data={project} number={projectNum - 1} key={project.title} />;
            })}
          </div>
        </div>
      </div>
      <hr />
    </section>
  );
}
// TODO when scrolls off screen - close the extra projects toggle

export default Portfolio;

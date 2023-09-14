import { useEffect, useRef, useState } from 'react';
import Minus from '../../assets/components/Minus';
import Plus from '../../assets/components/Plus';
import PROJECTS from '../../data/projects';
import useElementOnScreen from '../../hooks/useElementOnScreen';
import Project from '../project/Project';
import './Portfolio.scss';
import ArrowSketch from '../../assets/components/ArrowSketch';

function Portfolio(props) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLHeadingElement>(null);
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, react/prop-types, @typescript-eslint/no-unsafe-member-access
    <section id='portfolio' className='portfolio' aria-label='my portfolio' ref={props.reference}>
      <div className='custom-shape-divider-top-1681930915'>
        <svg
          data-name='Layer 1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1200 120'
          preserveAspectRatio='none'
        >
          <path d='M1200 120L0 16.48 0 0 1200 0 1200 120z' className='shape-fill'></path>
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

        <div className='arrow-div'>
          <span className='arrow-sketch'>
            <ArrowSketch />
          </span>
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
        </div>

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
    </section>
  );
}

export default Portfolio;

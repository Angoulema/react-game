import React from 'react';
import './footer.scss';
import icon from './assets/github.svg';

interface ILinkProps {
  iconUrl: string,
  value: string,
  href: string,
  classNamePart: string,
}

const author: ILinkProps = {
  iconUrl: icon,
  value: 'Angoulema',
  href: 'https://github.com/Angoulema',
  classNamePart: 'footer',
}

const Link: React.FC<ILinkProps> = (props: ILinkProps) => {
  const {
    iconUrl, value, href, classNamePart,
  } = props;

  return (
    <a
      className={`${classNamePart}-link`} href={href} target="_blank"
      rel="noreferrer"
    >
      <img className={`${classNamePart}-link-icon`} src={iconUrl} alt="icon" />
      {value}
    </a>
  );
};

const Footer: React.FC = () => {

  return(
    <footer className="app-footer footer">
      <div className="footer-container">
        <div className="footer-links">
          <Link {...author} />
        </div>
        <div className="footer-course">
          <a
            className="footer-course-link" href="https://rs.school/js/" target="_blank"
            rel="noreferrer"
          >
            <img src="https://rs.school/images/rs_school_js.svg" alt="RSSchool" />
          </a>
        </div>
      </div>
    </footer>
  )
};

export default Footer;

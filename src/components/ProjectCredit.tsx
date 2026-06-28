interface ProjectCreditProps {
  open: boolean;
  onToggle: () => void;
}

export function ProjectCredit({ open, onToggle }: ProjectCreditProps) {
  return (
    <>
      <button type="button" className="project-credit-toggle" onClick={onToggle}>
        A project by UnknownCrystal
      </button>
      {open ? (
        <aside className="project-contact-card" aria-label="Contact UnknownCrystal">
          <h2 className="contact-capsule contact-capsule-name">
            <span className="identity-dot" aria-hidden="true" />
            UnknownCrystal
          </h2>
          <p className="contact-capsule">
            <span aria-hidden="true">📍</span>
            Shanghai,CN
          </p>
          <p className="contact-capsule">
            <span aria-hidden="true">✉️</span>
            email:maoson888@outlook.com
          </p>
          <a
            className="contact-capsule contact-capsule-project"
            href="https://maochongmao40-oss.github.io/unknowncrystalpersonalportfolio/"
            target="_blank"
            rel="noreferrer"
          >
            Explore more of my projects:
            <span>maochongmao40-oss.github.io/unknowncrystalpersonalportfolio</span>
          </a>
        </aside>
      ) : null}
    </>
  );
}

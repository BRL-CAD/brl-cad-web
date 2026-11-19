import Link from 'next/link';
import React from 'react';

interface IProps {
  title: string;
  id?: string;
  step?: string;
  note?: React.ReactNode;
  link?: string;
  linkName?: string;
  children?: React.ReactNode;
}

export const InfoCard: React.FC<IProps> = ({
  title, id, step, note, link, linkName, children,
}) => (
  <article className="info-card" aria-labelledby={id}>
    {step && <span className="info-card-step">{step}</span>}
    {note && <p className="info-note">{note}</p>}
    <h3 id={id}>{title}</h3>
    {children}
    {link && (
      <p className="info-card-link">
        <Link className="info-link" href={link}>
          {linkName} <span aria-hidden="true">&rarr;</span>
        </Link>
      </p>
    )}
  </article>
);

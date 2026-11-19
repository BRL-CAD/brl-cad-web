import React from 'react';

interface IProps {
  eyebrow: string;
  heading?: string;
  lead: string;
  children?: React.ReactNode;
}

export const InfoIntro: React.FC<IProps> = ({
  eyebrow, heading, lead, children,
}) => (
  <section className="info-intro">
    <p className="info-eyebrow">{eyebrow}</p>
    {heading && <h2>{heading}</h2>}
    <p className="info-lead">{lead}</p>
    {children && <div className="info-actions">{children}</div>}
  </section>
);

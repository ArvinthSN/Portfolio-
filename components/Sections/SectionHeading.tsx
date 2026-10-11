import { ReactNode } from 'react';

export function SectionHeading({ index, title, accent, children }: { index: string; title: string; accent: string; children: ReactNode }) {
  return <div className="section-heading" data-reveal><p className="eyebrow">{index}</p><div><h2>{title} <em>{accent}</em></h2><p>{children}</p></div></div>;
}

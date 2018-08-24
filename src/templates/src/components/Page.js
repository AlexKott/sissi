import React from 'react';

import Section from './Section';

const Page = ({
  page,
  sections,
  content,
}) => (
  <div>
    {sections.map(section => <Section key={section.id} {...section} />)}
  </div>
);

export default Page;

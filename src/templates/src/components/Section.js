import React from 'react';

const Section = ({
    sectionType,
    content,
}) => (
  <section>
    <article dangerouslySetInnerHTML={{ __html: content }} />
  </section>
);

export default Section;

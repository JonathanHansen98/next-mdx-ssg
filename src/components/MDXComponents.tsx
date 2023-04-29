import styled from "styled-components";

const MDXComponents = {
  h4: styled.h4`
    font-size: 1.5rem;
    font-weight: 700;
  `,
  li: styled.li`
    font-size: 1rem;
    font-weight: 500;
    padding: 0;
  `,
  code: styled.code`
    font-size: 1rem;
    font-weight: 500;
    border-radius: 0.5rem;
    padding: 0.25rem 0.5rem;
  `,
  p: styled.p`
    font-size: 1rem;
    font-weight: 500;
    padding: 0.5rem 0;
  `,
  hr: styled.hr`
    margin: 1.5rem 0 1rem 0;
  `,
  // Divider: styled.hr`
  //   margin: 0.5rem 0;
  // `,
};

export default MDXComponents;

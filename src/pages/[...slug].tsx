import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import path from "path";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import MDXComponents from "../components/MDXComponents";
import { getMarkdownPaths } from "../utils/getMarkdownPaths";
import Layout from "@/components/Layout";
import styled from "styled-components";
import { exists } from "fs-extra";
import rehypeHighlight from "rehype-highlight/lib";
import { spacing } from "@/styles/mixins";

interface PageProps {
  source: MDXRemoteSerializeResult;
  data: {
    [key: string]: any;
  };
}

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
`;

const Description = styled.p`
  font-size: 1rem;
  font-weight: 200;
  margin: 2rem 0;
  opacity: 0.7;
`;

const TitleContainer = styled.div`
  line-height: 1;
`;

const MDXContainer = styled.div`
  padding: ${spacing(4)}px ${spacing(2)}px;
  line-height: 2.5;
`;

const ItemPage: NextPage<PageProps> = ({ source, data }) => {
  return (
    <Layout>
      <MDXContainer>
        <TitleContainer>
          <Title>{data.title}</Title>
          <Description>{data.description}</Description>
        </TitleContainer>
        <MDXRemote {...source} components={MDXComponents} />
      </MDXContainer>
    </Layout>
  );
};

export default ItemPage;

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  let slug = context.params?.slug || [];

  if (typeof slug === "string") {
    slug = [slug];
  }

  if (slug[slug.length - 1] === "/") {
    slug.concat("index");
  }

  let markdownPath = path.join(process.cwd(), "/src", "/markdown", ...slug);

  if (!(await exists(markdownPath + ".mdx"))) {
    markdownPath = path.join(markdownPath, "index");
  }

  const fs = await import("fs-extra");
  const { serialize } = await import("next-mdx-remote/serialize");

  const mdx = await fs.readFile(`${markdownPath}.mdx`, "utf-8");
  const { content, data } = matter(mdx);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkFrontmatter],
      rehypePlugins: [rehypeHighlight],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (_context) => {
  return {
    paths: getMarkdownPaths(),
    fallback: false,
  };
};

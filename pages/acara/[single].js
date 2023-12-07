import config from "@config/config.json";
import PostAcara from "@layouts/Postacara";
import { getSinglePage } from "@lib/contentParser";
import { parseMDX } from "@lib/utils/mdxParser";
const { blog_folder } = config.settings;

// post single layout
const Article = ({ post, authors, mdxContent, slug }) => {
  console.warn(post[0])
  // const { frontmatter, content } = post[0];

  // console.log(frontmatter)

  return (
    <PostAcara
      frontmatter={post[0]}
      mdxContent={mdxContent}
      authors={authors}
      slug={slug}
    />
  );
};

// get post single slug
export const getStaticPaths = async () => {
  const allSlug = await getSinglePage(`http://gempita.gnusa.id/service/event-public?start=1&count=20`);
  const paths = allSlug.data.map((item) => ({
    params: {
      single: item.id,
    },
  }));
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
};

// get post single content
export const getStaticProps = async ({ params }) => {
  const { single } = params;
  console.log(single)
  const posts = await getSinglePage(`http://gempita.gnusa.id/service/event-public?start=1&count=20`);
  const post = posts.data.filter((p) => p.id == single);
  const mdxContent = await parseMDX(post[0].description);

  return {
    props: {
      post: post,
      mdxContent: mdxContent,
      slug: single,
    },
  };
};

export default Article;

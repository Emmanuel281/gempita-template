import config from "@config/config.json";
import PostAcara from "@layouts/Postacara";
import { getSingleData } from "@lib/contentParser";
import { parseMDX } from "@lib/utils/mdxParser";
const { blog_folder } = config.settingsacara;
export const revalidate = 60
// post single layout
const Article = ({ post, authors, mdxContent, slug }) => {
  // console.warn(post[0]);
  // const { frontmatter, content } = post[0];

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
  return {
    paths: [],
    fallback: "blocking",
  };
};

// get post single content
export const getStaticProps = async ({ params }) => {
  const { single } = params;

  const singles = single.split("$");
  const { pagination } = config.settingsacara;
  const posts = await getSingleData(
    `http://adm.gempitamilenial.org/service/event-public?start=${singles[0]}&count=${pagination}`
  );
  const post = posts.data.filter((p) => p.id == singles[1]);
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

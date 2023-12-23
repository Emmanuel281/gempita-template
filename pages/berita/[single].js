import config from "@config/config.json";
import PostSingle from "@layouts/PostSingle";
import { getSingleData } from "@lib/contentParser";
import { parseMDX } from "@lib/utils/mdxParser";
const { blog_folder } = config.settingsberita;
export const revalidate = 60
// post single layout
const Article = ({ post, authors, mdxContent, slug }) => {
  return (
    <PostSingle
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
  const { pagination } = config.settingsberita;
  const posts = await getSingleData(
    `http://adm.gempitamilenial.org/service/news-public?start=${singles[0]}&count=${pagination}`
  );
  console.log("posts")
  console.log(posts)
  console.log(posts)
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

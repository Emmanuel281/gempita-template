import config from "@config/config.json";
import PostSingle from "@layouts/PostSingle";
import PostYoutube from "@layouts/Postyoutube";
import { getSingleData } from "@lib/contentParser";
import { parseMDX } from "@lib/utils/mdxParser";
const { blog_folder } = config.settings;

// post single layout
const Article = ({ post, authors, slug }) => {
  // console.warn(post)
  return (
    <PostYoutube
      frontmatter={post}
      authors={authors}
      slug={slug}
    />
  );
};

// get post single slug
export const getStaticPaths = async ({ }) => {
  const allSlug = await getSingleData(`http://gempita.gnusa.id/service/youtube-public?start=1&count=20`);
  console.log("allSlug")
  console.log(allSlug)
  const paths = allSlug.data.map((item) => ({
    params: {
      single: item.id,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

// get post single content
export const getStaticProps = async ({ params }) => {
  const { single } = params;
  const posts = await getSingleData(`http://gempita.gnusa.id/service/youtube-video-public/${single}?start=1&count=20`);
  console.log("posts")
  console.log(posts)
  const post = posts.data.filter((p) => p.parentID == single);
  return {
    props: {
      post: post,
      slug: single,
    },
  };
};

export default Article;

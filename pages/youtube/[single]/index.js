import Pagination from "@components/Pagination";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { getListPage, getSingleData } from "@lib/contentParser";
import { parseMDX } from "@lib/utils/mdxParser";
import { markdownify } from "@lib/utils/textConverter";
import Postsyoutube from "@partials/Postsyoutube";
import PostYoutube from "@layouts/Postyoutube";
import Listvideo from "@partials/Listvideo";
const { blog_folder, pagination, chanel } = config.settingsyoutube;
export const revalidate = 60

// post single layout
const Article = ({ postIndex, post, posts, pagination, slug }) => {
  const { frontmatter, content, contentapi } = postIndex;
  // console.log(posts);
  return (
    <PostYoutube
      frontmatter={frontmatter}
      post={post}
      posts={posts}
      slug={slug}
      postindex={postIndex}
      type="youtube"
    />
  );
};

// get post single slug
export const getStaticPaths = async ({}) => {
  const allSlug = await getSingleData(
    `http://adm.gempitamilenial.org/service/youtube-public?start=1&count=20`
  );
  //   console.log("jalan");
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
  //   console.log("jalan");
  console.log("blog_folder");
  const { single } = params;
  const { pagination } = config.settingsyoutube;
  const postIndex = await getListPage(
    `content/${blog_folder}/_index.md`,
    `http://adm.gempitamilenial.org/service/youtube-public?start=1&count=20`
  );
  const posts = await getSingleData(
    `http://adm.gempitamilenial.org/service/youtube-video-public/${single}?start=1&count=20`
  );
  const post = posts.data.filter((p) => p.parentID == single);
  return {
    props: {
      postIndex: postIndex,
      post: post,
      posts: posts,
      slug: single,
      pagination: pagination,
    },
  };
};

export default Article;

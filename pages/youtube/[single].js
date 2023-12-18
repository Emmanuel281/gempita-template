import Pagination from "@components/Pagination";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { getListPage, getSingleData } from "@lib/contentParser";
import { parseMDX } from "@lib/utils/mdxParser";
import { markdownify } from "@lib/utils/textConverter";
import Postsyoutube from "@partials/Postsyoutube";
import PostYoutube from "@layouts/Postyoutube";
import Listvideo from "@partials/Listvideo";
const { blog_folder } = config.settings;

// post single layout
const Article = ({
  postIndex,
  post,
  authors,
  slug,
  currentPage,
  pagination,
}) => {
  const { frontmatter, content, contentapi } = postIndex;
  console.log("post");
  console.log(post);
  // const totalPages = Math.ceil(contentapi.data.length / pagination);

  return (
    <PostYoutube
      frontmatter={frontmatter}
      post={post}
      postindex={postIndex}
      type="youtube"
    />
  );
};

// get post single slug
export const getStaticPaths = async ({}) => {
  const allSlug = await getSingleData(
    `http://gempita.gnusa.id/service/youtube-public?start=1&count=20`
  );
  // console.log("allSlug");
  // console.log(allSlug);
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
  const { pagination } = config.settings;
  const postIndex = await getListPage(
    `content/${blog_folder}/_index.md`,
    `http://gempita.gnusa.id/service/youtube-public?start=1&count=20`
  );
  const posts = await getSingleData(
    `http://gempita.gnusa.id/service/youtube-video-public/${single}?start=1&count=20`
  );
  // console.log("posts getStaticProps");
  // console.log(posts);
  const post = posts.data.filter((p) => p.parentID == single);
  return {
    props: {
      postIndex: postIndex,
      post: post,
      slug: single,
      pagination: pagination,
    },
  };
};

export default Article;

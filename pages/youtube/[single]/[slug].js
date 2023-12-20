import Pagination from "@components/Pagination";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { getListPage, getSingleData } from "@lib/contentParser";
import { parseMDX } from "@lib/utils/mdxParser";
import { markdownify } from "@lib/utils/textConverter";
import Postsyoutube from "@partials/Postsyoutube";
import PostYoutube from "@layouts/Postyoutube";
import Listvideo from "@partials/Listvideo";
const { blog_folder, pagination } = config.settingsyoutube;

// blog pagination
const BlogPagination = ({ postIndex, posts, currentPage, pagination }) => {
  const { frontmatter, content, contentapi } = postIndex;
  const totalPages = Math.ceil(contentapi.data.length / pagination);
  const { title } = frontmatter;

  console.log("contentapi");
  console.log(contentapi);
  return (
    <PostYoutube
      frontmatter={frontmatter}
      post={post}
      posts={posts}
      postindex={postIndex}
      type="youtube"
      currentPage={currentPage}
      pagination={pagination}
    />
  );
};

export default BlogPagination;

// get blog pagination slug
export const getStaticPaths = async () => {
  console.log("slug jalan");
  const allSlug = await getSingleData(
    `http://gempita.gnusa.id/service/youtube-public?start=1&count=20`
  );
  //   console.log("jalan");
  const paths = allSlug.data.map((item) => ({
    params: {
      single: item.id,
      slug: item.id,
    },
  }));
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
};

// get blog pagination content
export const getStaticProps = async ({ params }) => {
  console.log(params);
  const currentPage = parseInt((params && params.slug) || 1);
  const { pagination } = config.settings;
  const postIndex = await getListPage(
    `content/${blog_folder}/_index.md`,
    `http://gempita.gnusa.id/service/youtube-public?start=1&count=20`
  );
  const posts = await getSingleData(
    `http://gempita.gnusa.id/service/youtube-video-public/${single}?start=1&count=20`
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

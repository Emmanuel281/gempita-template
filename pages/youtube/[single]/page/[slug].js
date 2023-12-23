import Pagination from "@components/Pagination";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { getListPage, getSingleData } from "@lib/contentParser";
import { parseMDX } from "@lib/utils/mdxParser";
import { markdownify } from "@lib/utils/textConverter";
import Postsyoutube from "@partials/Postsyoutube";
import PostYoutube from "@layouts/Postyoutube";
import Listvideo from "@partials/Listvideo";
const { blog_folder } = config.settingsyoutube;

// blog pagination
const BlogPagination = ({ postIndex,post, posts, slug, currentPage, pagination }) => {
  const { frontmatter, content, contentapi } = postIndex;
  const totalPages = Math.ceil(contentapi.data.length / pagination);
  const { title } = frontmatter;
// console.log(currentPage.slug)
//   console.log("contentapi");
//   console.log(contentapi);
  return (
    <PostYoutube
      frontmatter={frontmatter}
      post={post}
      posts={posts}
      slug={slug}
      postindex={postIndex}
      currentPage={currentPage.slug}
      type="youtube"
    />
  );
};

export default BlogPagination;

// get blog pagination content
export const getServerSideProps = async ({ params }) => {
  const { single, slug } = params;
  const { pagination } = config.settingsyoutube;
  const start = (slug *  pagination) + 1
  const postIndex = await getListPage(
    `content/${blog_folder}/_index.md`,
    `http://adm.gempitamilenial.org/service/youtube-public?start=1&count=20`
  );
  const posts = await getSingleData(
    `http://adm.gempitamilenial.org/service/youtube-video-public/${single}?start=${start}&count=${pagination}`
  );
  const post = posts.data.filter((p) => p.parentID == single);
  return {
    props: {
      postIndex: postIndex,
      post: post,
      posts: posts,
      slug: single,
      currentPage: params,
      pagination: pagination,
    },
  };
};

import config from "@config/config.json";
import { getListPage, getSingleData } from "@lib/contentParser";
import PostYoutube from "@layouts/Postyoutube";
const { blog_folder } = config.settingsyoutube;
export const revalidate = 10;
export const dynamic = "force-dynamic";
// blog pagination
const BlogPagination = ({
  postIndex,
  post,
  posts,
  slug,
  currentPage,
  pagination,
}) => {
  const { frontmatter, content, contentapi } = postIndex;
  const totalPages = Math.ceil(contentapi.data.length / pagination);
  const { title } = frontmatter;
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

export const getStaticPaths = async ({}) => {
  const allSlug = await getSingleData(
    `http://adm.gempitamilenial.org/service/youtube-public?start=1&count=20`
  );
  const paths = allSlug.data.map((item) => ({
    params: {
      single: item.id,
      slug: item.id,
    },
  }));
  // console.log(paths);
  return {
    paths,
    fallback: "blocking",
  };
};

// get post single content
export const getStaticProps = async ({ params }) => {
  const { single, slug } = params;
  const { pagination } = config.settingsyoutube;
  const start = slug * pagination + 1;
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
    revalidate: 10,
  };
};
// get blog pagination content
// export const getServerSideProps = async ({ params }) => {
//   const { single, slug } = params;
//   const { pagination } = config.settingsyoutube;
//   const start = (slug *  pagination) + 1
//   const postIndex = await getListPage(
//     `content/${blog_folder}/_index.md`,
//     `http://adm.gempitamilenial.org/service/youtube-public?start=1&count=20`
//   );
//   const posts = await getSingleData(
//     `http://adm.gempitamilenial.org/service/youtube-video-public/${single}?start=${start}&count=${pagination}`
//   );
//   const post = posts.data.filter((p) => p.parentID == single);
//   return {
//     props: {
//       postIndex: postIndex,
//       post: post,
//       posts: posts,
//       slug: single,
//       currentPage: params,
//       pagination: pagination,
//     },
//   };
// };

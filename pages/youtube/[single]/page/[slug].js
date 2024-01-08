import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import cbor from "cbor";
import config from "@config/config.json";
import { getListPage, getSingleData } from "@lib/contentParser";
import PostYoutube from "@layouts/Postyoutube";
import Base from "@layouts/Baseof";

export const revalidate = 10;
export const dynamic = "force-dynamic";
const { blog_folder, pagination, title } = config.settingsyoutube;
let single = {};
let start = 1;

// blog pagination
const BlogPagination = () => {
  // const totalPages = Math.ceil(contentapi.data.length / pagination);
  const router = useRouter();
  const [contentapi, setContentapi] = useState({});
  const [post, setPost] = useState({});
  const [posts, setPosts] = useState({});
  const currentPage = 1;
  single = router.query;
  if (single.slug) {
    start = single.slug * pagination + 1;
  }
  useEffect(() => {
    const fetchDataChanel = async () => {
      const response = await fetch(
        `https://adm.gempitamilenial.org/service/youtube-public?start=1&count=20`
      );
      if (!response.ok) {
        throw new Error(`https error! status: ${response.status}`);
      }
      const result = await response.arrayBuffer();
      const posts = await cbor.decode(result);
      setContentapi(posts);
    };
    const fetchDataVideo = async () => {
      console.log(start);
      const response = await fetch(
        `https://adm.gempitamilenial.org/service/youtube-video-public/${single.single}?start=${start}&count=${pagination}`
      );
      if (!response.ok) {
        throw new Error(`https error! status: ${response.status}`);
      }
      const result = await response.arrayBuffer();
      const posts = await cbor.decode(result);
      const post = posts.data.filter((p) => p.parentID == single.single);
      setPost(post);
      setPosts(posts);
    };

    setTimeout(() => {
      fetchDataChanel().catch((e) => {
        console.error("An error occurred while fetching the data: ", e);
      });
      fetchDataVideo().catch((e) => {
        console.error("An error occurred while fetching the data: ", e);
      });
    }, 1000);
  }, [router.pathname]);
  return (
    <Base title={title}>
      {Object.keys(post).length != 0 || Object.keys(posts).length != 0 ? (
        <PostYoutube
          title={title}
          post={post}
          posts={posts}
          slug={single.single}
          contentapi={contentapi}
          currentPage={single.slug}
          type="youtube"
        />
      ) : (
        "Loading..."
      )}
    </Base>
  );
};

export default BlogPagination;

// export const getStaticPaths = async ({}) => {
//   const allSlug = await getSingleData(
//     `https://adm.gempitamilenial.org/service/youtube-public?start=1&count=20`
//   );
//   const paths = allSlug.data.map((item, index) => ({
//     params: {
//       single: item.id,
//       slug: index.toString(),
//     },
//   }));
//   console.log(paths);
//   return {
//     paths,
//     fallback: "blocking",
//   };
// };

// get post single content
// export const getStaticProps = async ({ params }) => {
//   const { single, slug } = params;
//   const { pagination } = config.settingsyoutube;
//   const start = slug * pagination + 1;
//   const postIndex = await getListPage(
//     `content/${blog_folder}/_index.md`,
//     `https://adm.gempitamilenial.org/service/youtube-public?start=1&count=20`
//   );
//   const posts = await getSingleData(
//     `https://adm.gempitamilenial.org/service/youtube-video-public/${single}?start=${start}&count=${pagination}`
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
//     revalidate: 10,
//   };
// };
// get blog pagination content
// export const getServerSideProps = async ({ params }) => {
//   const { single, slug } = params;
//   const { pagination } = config.settingsyoutube;
//   const start = (slug *  pagination) + 1
//   const postIndex = await getListPage(
//     `content/${blog_folder}/_index.md`,
//     `https://adm.gempitamilenial.org/service/youtube-public?start=1&count=20`
//   );
//   const posts = await getSingleData(
//     `https://adm.gempitamilenial.org/service/youtube-video-public/${single}?start=${start}&count=${pagination}`
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

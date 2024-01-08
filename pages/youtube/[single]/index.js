import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import cbor from "cbor";
import config from "@config/config.json";
import PostYoutube from "@layouts/Postyoutube";
import Base from "@layouts/Baseof";
import { markdownify } from "@lib/utils/textConverter";
import { Oval } from 'react-loader-spinner'
const { blog_folder, pagination, chanel, title } = config.settingsyoutube;
let single = {};

// post single layout
const Article = () => {
  // console.log(posts);
  const router = useRouter();
  const [contentapi, setContentapi] = useState({});
  const [post, setPost] = useState({});
  const [posts, setPosts] = useState({});
  const currentPage = 1;
  single = router.query;
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
      const response = await fetch(
        `https://adm.gempitamilenial.org/service/youtube-video-public/${single.single}?start=1&count=${pagination}`
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

      fetchDataChanel().catch((e) => {
        console.error("An error occurred while fetching the data: ", e);
      });
      fetchDataVideo().catch((e) => {
        console.error("An error occurred while fetching the data: ", e);
      });
  }, [router.query.single]);

  return (
    <Base title={title}>
      {Object.keys(post).length != 0 &&
      Object.keys(posts).length != 0 &&
      Object.keys(contentapi).length != 0 ? (
        <PostYoutube
          title={title}
          post={post}
          posts={posts}
          slug={single.single}
          contentapi={contentapi}
          currentPage={currentPage}
          type="youtube"
        />
      ) : (
        <section className="section">
          {markdownify(
          "Video Youtube Terbaru",
          "h1",
          "h1 text-center font-normal text-[56px]"
        )}
        <Oval
  visible={true}
  height="50"
  width="50"
  color="#e00000"
  secondaryColor="#808080"
  ariaLabel="oval-loading"
  wrapperStyle={{}}
  wrapperClass="text-center"
  />
          </section>
      )}
    </Base>
  );
};

// get post single slug
// export const getStaticPaths = async ({}) => {
//   const allSlug = await getSingleData(
//     `https://adm.gempitamilenial.org/service/youtube-public?start=1&count=20`
//   );
//   const paths = allSlug.data.map((item) => ({
//     params: {
//       single: item.id,
//     },
//   }));
//   // console.log(paths);
//   return {
//     paths,
//     fallback: "blocking",
//   };
// };

// get post single content
// export const getStaticProps = async ({ params }) => {
//   //   console.log("jalan");
//   // console.log("blog_folder");
//   const { single } = params;
//   const currentPage = 1;
//   const { pagination } = config.settingsyoutube;
//   const postIndex = await getListPage(
//     `content/${blog_folder}/_index.md`,
//     `https://adm.gempitamilenial.org/service/youtube-public?start=1&count=20`
//   );
//   const posts = await getSingleData(
//     `https://adm.gempitamilenial.org/service/youtube-video-public/${single}?start=1&count=20`
//   );
//   console.log("postindex");
//   console.log(postIndex);
//   const post = posts.data.filter((p) => p.parentID == single);
//   return {
//     props: {
//       postIndex: postIndex,
//       post: post,
//       posts: posts,
//       slug: single,
//       currentPage: currentPage,
//       pagination: pagination,
//     },
//     revalidate: 10,
//   };
// };

export default Article;

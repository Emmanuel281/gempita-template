import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import cbor from "cbor";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import config from "@config/config.json";
import PostSingle from "@layouts/PostSingle";
import { serialize } from "next-mdx-remote/serialize";
import { Oval } from 'react-loader-spinner'
import Base from "@layouts/Baseof";
const { blog_folder, pagination } = config.settingsberita;
let singles = {};
const mdxoptions = {
  mdxOptions: {
    development: process.env.NODE_ENV === "development",
    rehypePlugins: [rehypeSlug],
    remarkPlugins: [remarkGfm],
  },
};
// post single layout
const Article = () => {
  const [post, setPost] = useState({});
  const [mdxContent, setmdxContent] = useState([]);
  const router = useRouter();
  const single = router.query.single;
  if (single) {
    singles = single.split("$");
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://adm.gempitamilenial.org/service/news-public?start=${singles[0]}&count=${pagination}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.arrayBuffer();
      const posts = await cbor.decode(result);
      const post = posts.data.filter((p) => p.id == singles[1]);
      const mdxContent = await serialize(post[0].description, mdxoptions);
      setPost(post);
      setmdxContent(mdxContent);
    };

      fetchData().catch((e) => {
        console.error("An error occurred while fetching the data: ", e);
      });
  }, [router.query.single]);

  return (
    <Base title={"berita"}>
    {Object.keys(post).length != 0 &&
  Object.keys(mdxContent).length != 0 ? (
    <PostSingle
    frontmatter={post[0]}
    mdxContent={mdxContent}
    slug={singles[0]}
  />
) : (
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
)}

</Base>)
};

// get post single slug
// export const getStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: "blocking",
//   };
// };

// // get post single content
// export const getStaticProps = async ({ params }) => {
//   const { single } = params;
//   const singles = single.split("$");
//   const { pagination } = config.settingsberita;
//   const posts = await getSingleData(
//     `http://adm.gempitamilenial.org/service/news-public?start=${singles[0]}&count=${pagination}`
//   );
//   // console.log("posts")
//   // console.log(posts)
//   // console.log(posts)
//   const post = posts.data.filter((p) => p.id == singles[1]);
//   const mdxContent = await parseMDX(post[0].description);

//   return {
//     props: {
//       post: post,
//       mdxContent: mdxContent,
//       slug: single,
//     },
//     revalidate: 10,
//   };
// };

export default Article;

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import cbor from "cbor";
import config from "@config/config.json";
import PostAcara from "@layouts/Postacara";
import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
const { blog_folder, pagination } = config.settingsacara;
export const revalidate = 10;
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
        `https://adm.gempitamilenial.org/service/event-public?start=${singles[0]}&count=${pagination}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.arrayBuffer();
      const posts = await cbor.decode(result);
      console.log(
        `https://adm.gempitamilenial.org/service/event-public?start=${singles[0]}&count=${pagination}`
      );
      const post = posts.data.filter((p) => p.id == singles[1]);
      const mdxContent = await serialize(post[0].description, mdxoptions);
      setPost(post);
      setmdxContent(mdxContent);
    };

    setTimeout(() => {
      fetchData().catch((e) => {
        console.error("An error occurred while fetching the data: ", e);
      });
    }, 1000);
  }, [router.pathname]);

  return Object.keys(post).length != 0 ||
    Object.keys(mdxContent).length != 0 ? (
    <PostAcara
      frontmatter={post[0]}
      mdxContent={mdxContent}
      slug={router.query.single}
    />
  ) : (
    "Loading..."
  );
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
//   const { pagination } = config.settingsacara;
//   const posts = await getSingleData(
//     `http://adm.gempitamilenial.org/service/event-public?start=${singles[0]}&count=${pagination}`
//   );
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

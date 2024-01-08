import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import cbor from "cbor";
import Pagination from "@components/Pagination";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { markdownify } from "@lib/utils/textConverter";
import Posts from "@partials/Posts";
import { Oval } from 'react-loader-spinner'

const { blog_folder, pagination } = config.settingsberita;
const title = "Berita Terbaru";
const mdxoptions = {
  mdxOptions: {
    development: process.env.NODE_ENV === "development",
    rehypePlugins: [rehypeSlug],
    remarkPlugins: [remarkGfm],
  },
};
// blog pagination
const BlogPagination = () => {
  // const { frontmatter, content, contentapi } = postIndex;
  const router = useRouter();
  const [contentapi, setContentapi] = useState({});
  const totalPages = Math.ceil(contentapi.total_count / pagination);
  const currentPage = parseInt((router.query && router.query.slug) || 1);
  let start = 1;
  if (currentPage > 1) {
    start = (currentPage - 1) * pagination;
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://adm.gempitamilenial.org/service/news-public?start=${start}&count=${pagination}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.arrayBuffer();
      const decoded = await cbor.decode(result);
      setContentapi(decoded);
    };
    fetchData().catch((e) => {
      console.error("An error occurred while fetching the data: ", e);
    });
  }, [router.query.slug]);

  return (
    <Base title={title}>
      <section className="section">
        <div className="container">
          {markdownify(title, "h1", "h1 text-center font-normal text-[56px]")}
          {Object.keys(contentapi).length != 0 ? (
            <>
              <Posts
                posts={contentapi.data}
                currentPage={currentPage}
                type="berita"
              />
              <Pagination
                section={"berita"}
                totalPages={totalPages}
                currentPage={currentPage}
              />
            </>
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
        </div>
      </section>
    </Base>
  );
};

export default BlogPagination;

// get blog pagination slug
// export const getStaticPaths = async () => {
//   const getAllSlug = await getSingleData(
//     `http://adm.gempitamilenial.org/service/news-public?start=1&count=1`
//   );
//   // console.log("getAllSlug");
//   // console.log(getAllSlug);
//   // const allSlug = getAllSlug.data.map((item) => item.slug);
//   const { pagination } = config.settingsberita;
//   const totalPages = Math.ceil(getAllSlug.total_count / pagination);
//   let paths = [];

//   for (let i = 1; i < totalPages; i++) {
//     paths.push({
//       params: {
//         slug: (i + 1).toString(),
//       },
//     });
//   }
//   // console.log("totalPages")
//   // console.log(totalPages)
//   return {
//     paths,
//     fallback: false,
//   };
// };

// // get blog pagination content
// export const getStaticProps = async ({ params }) => {
//   const currentPage = parseInt((params && params.slug) || 1);
//   const { pagination } = config.settingsberita;
//   let start = 1;
//   if (currentPage > 1) {
//     start = currentPage * pagination + 1;
//   }
//   const postIndex = await getListPage(
//     `content/${blog_folder}/_index.md`,
//     `http://adm.gempitamilenial.org/service/news-public?start=${start}&count=${pagination}`
//   );
//   // console.log(postIndex)
//   const mdxContent = await parseMDX(postIndex.content);

//   return {
//     props: {
//       pagination: pagination,
//       currentPage: currentPage,
//       postIndex: postIndex,
//       mdxContent: mdxContent,
//     },
//     revalidate: 10,
//   };
// };

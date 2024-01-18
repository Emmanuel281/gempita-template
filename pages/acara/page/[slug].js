import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import cbor from "cbor";
import Pagination from "@components/Pagination";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { markdownify } from "@lib/utils/textConverter";
import Posts from "@partials/Posts";
import { Oval } from 'react-loader-spinner'
import useSWR from 'swr'
const fetcher = url => fetch(url).then(r => r.arrayBuffer())
const { blog_folder, pagination } = config.settingsacara;

// blog pagination
const BlogPagination = () => {
  const router = useRouter();
  const [totalPages, setTotalPages] = useState(1);
  const currentPage = parseInt((router.query && router.query.slug) || 1);
  let start = 1;
  if (currentPage > 1) {
    start = (currentPage - 1) * pagination;
  }

  let { data, error, isLoading } = useSWR(`https://adm.gempitamilenial.org/service/event-public?start=${start}&count=${pagination}`, fetcher)
 
  if (error) console.log(error)
  if (isLoading) console.log(isLoading)
  if (data) {
    data = cbor.decode(data) 
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(
  //       `https://adm.gempitamilenial.org/service/event-public?start=${start}&count=${pagination}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/cbor",
  //         },
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const result = await response.arrayBuffer();
  //     const decoded = await cbor.decode(result);
  //     setContentapi(decoded);
  //     setTotalPages(Math.ceil(data.data.length / pagination));
  //   };

  //   fetchData().catch((e) => {
  //     console.error("An error occurred while fetching the data: ", e);
  //   });
  // }, [router.query.slug]);

  return (
    <Base title={"Acara Terbaru"}>
      <section className="section">
        <div className="container">
          {markdownify(
            "Acara Terbaru",
            "h1",
            "h1 text-center font-normal text-[56px]"
          )}
          { data !== undefined && Object.keys(data).length != 0 ? (
            <>
              <Posts
                posts={data.data}
                currentPage={currentPage}
                type="acara"
              />
              <Pagination
                section={blog_folder}
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

// // get blog pagination slug
// export const getStaticPaths = async () => {
//   const getAllSlug = await getSingleData(
//     `http://adm.gempitamilenial.org/service/event-public?start=1&count=1`
//   );
//   const { pagination } = config.settingsacara;
//   const totalPages = Math.ceil(getAllSlug.total_count / pagination);
//   let paths = [];

//   for (let i = 1; i < totalPages; i++) {
//     paths.push({
//       params: {
//         slug: (i + 1).toString(),
//       },
//     });
//   }

//   return {
//     paths,
//     fallback: false,
//   };
// };

// // get blog pagination content
// export const getStaticProps = async ({ params }) => {
//   const currentPage = parseInt((params && params.slug) || 1);
//   const { pagination } = config.settingsacara;
//   let start = 1;
//   if (currentPage > 1) {
//     start = (currentPage - 1) * pagination;
//   }
//   let postIndex = await getListPage(
//     `content/${blog_folder}/_index.md`,
//     `http://adm.gempitamilenial.org/service/event-public?start=${start}&count=${pagination}`
//   );

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

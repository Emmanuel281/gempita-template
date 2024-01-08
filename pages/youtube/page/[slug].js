"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import cbor from "cbor";
import { markdownify } from "@lib/utils/textConverter";
const title = "video Terbaru";
// blog pagination
const BlogPagination = () => {
  const router = useRouter();
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
      posts.data.map((item, index) => {
        if ((item.channel_name = "GEMPITA MILENIAL")) {
          router.push("/youtube/" + item.id);
        }
      });
    };

      fetchDataChanel().catch((e) => {
        console.error("An error occurred while fetching the data: ", e);
      });
  }, [router.pathname]);

  return (
    <Base title={title}>
      <section className="section">
        <div className="container">
          {markdownify(
            "Video Youtube Terbaru",
            "h1",
            "h1 text-center font-normal text-[56px]"
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
//     `https://adm.gempitamilenial.org/service/youtube-public?start=1&count=1`
//   );
//   console.log("getAllSlug");
//   console.log(getAllSlug);
//   const allSlug = getAllSlug.data.map((item) => item.slug);
//   const { pagination } = config.settingsyoutube;
//   const totalPages = Math.ceil(allSlug.length / pagination);
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
//     fallback: "blocking",
//   };
// };

// // get blog pagination content
// export const getStaticProps = async ({ params }) => {
//   const currentPage = parseInt((params && params.slug) || 1);
//   const { pagination } = config.settingsyoutube;
//   let postIndex = await getListPage(
//     `content/${blog_folder}/_index.md`,
//     `https://adm.gempitamilenial.org/service/youtube-public?start=1&count=${pagination}`
//   );
//   return {
//     props: {
//       pagination: pagination,
//       currentPage: currentPage,
//       postIndex: postIndex,
//     },
//     revalidate: 10,
//   };
// };

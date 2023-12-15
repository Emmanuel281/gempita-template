import Pagination from "@components/Pagination";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { getListPage, getSingleData } from "@lib/contentParser";
import { parseMDX } from "@lib/utils/mdxParser";
import { markdownify } from "@lib/utils/textConverter";
import Postsyoutube from "@partials/Postsyoutube";
const { blog_folder } = config.settings;

// blog pagination
const BlogPagination = ({ postIndex, posts, currentPage, pagination }) => {
  const { frontmatter, content, contentapi } = postIndex;
  console.log(contentapi);
  const totalPages = Math.ceil(contentapi.data.length / pagination);
  const { title } = frontmatter;

  return (
    <Base title={title}>
      <section className="section">
        <div className="container">
          {markdownify(
            "Video Youtube Terbaru",
            "h1",
            "h1 text-center font-normal text-[56px]"
          )}
          <Postsyoutube posts={contentapi.data} type="youtube" />
          <Pagination
            section={blog_folder}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      </section>
    </Base>
  );
};

export default BlogPagination;

// get blog pagination slug
export const getStaticPaths = async () => {
  const getAllSlug = await getSingleData(
    `http://gempita.gnusa.id/service/youtube-public?start=1&count=20`
  );
  // console.log("getAllSlug");
  const allSlug = getAllSlug.data.map((item) => item.slug);
  const { pagination } = config.settings;
  const totalPages = Math.ceil(allSlug.length / pagination);
  let paths = [];

  for (let i = 1; i < totalPages; i++) {
    paths.push({
      params: {
        slug: (i + 1).toString(),
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

// get blog pagination content
export const getStaticProps = async ({ params }) => {
  const currentPage = parseInt((params && params.slug) || 1);
  // console.warn("currentPage", currentPage);
  const { pagination } = config.settings;
  const postIndex = await getListPage(
    `content/${blog_folder}/_index.md`,
    `http://gempita.gnusa.id/service/youtube-public?start=1&count=20`
  );
  const mdxContent = await parseMDX(postIndex.content);

  return {
    props: {
      pagination: pagination,
      currentPage: currentPage,
      postIndex: postIndex,
      mdxContent: mdxContent,
    },
  };
};

import Pagination from "@components/Pagination";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { getListPage, getSingleData } from "@lib/contentParser";
import { parseMDX } from "@lib/utils/mdxParser";
import { markdownify } from "@lib/utils/textConverter";
import Posts from "@partials/Posts";
const { blog_folder } = config.settingsberita;

// blog pagination
const BlogPagination = ({ postIndex, posts, currentPage, pagination }) => {
  const { frontmatter, content, contentapi } = postIndex;
  console.log(contentapi);
  const totalPages = Math.ceil(contentapi.total_count / pagination);
  console.log(totalPages);
  const { title } = frontmatter;

  return (
    <Base title={title}>
      <section className="section">
        <div className="container">
          {markdownify(
            "Berita Terbaru",
            "h1",
            "h1 text-center font-normal text-[56px]"
          )}
          <Posts posts={contentapi.data} currentPage={currentPage} type="berita" />
          <Pagination
            section={"berita"}
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
    `http://adm.gempitamilenial.org/service/news-public?start=1&count=1`
  );
  // console.log("getAllSlug");
  // const allSlug = getAllSlug.data.map((item) => item.slug);
  const { pagination } = config.settings;
  const totalPages = Math.ceil(getAllSlug.total_count / pagination);
  let paths = [];

  for (let i = 1; i <= totalPages; i++) {
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
  const { pagination } = config.settings;
  let start = 1;
  if (currentPage > 1) {
    start = (currentPage  * pagination) + 1;
  }
  const postIndex = await getListPage(
    `content/${blog_folder}/_index.md`,
    `http://adm.gempitamilenial.org/service/news-public?start=${start}&count=${pagination}`
  );
  console.log(postIndex)
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

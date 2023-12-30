import Pagination from "@components/Pagination";
import config from "@config/config.json";
import cobapagacara from "@config/cobapagacara.json";
import Base from "@layouts/Baseof";
import { getListPage, getSingleData } from "@lib/contentParser";
import { parseMDX } from "@lib/utils/mdxParser";
import { markdownify } from "@lib/utils/textConverter";
import Posts from "@partials/Posts";
const { blog_folder } = config.settingsacara;
export const revalidate = 10
// blog pagination
const BlogPagination = ({ postIndex, posts, currentPage, pagination }) => {
  const { frontmatter, content, contentapi } = postIndex;
  const totalPages = Math.ceil(contentapi.data.length / pagination);
  const { title } = frontmatter;

  return (
    <Base title={title}>
      <section className="section">
        <div className="container">
          {markdownify(
            "Acara Terbaru",
            "h1",
            "h1 text-center font-normal text-[56px]"
          )}
          <Posts
            posts={contentapi.data}
            currentPage={currentPage}
            type="acara"
          />
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
    `http://adm.gempitamilenial.org/service/event-public?start=1&count=1`
  );
  const { pagination } = config.settingsacara;
  const totalPages = Math.ceil(getAllSlug.total_count / pagination);
  let paths = [];

  for (let i = 1; i < totalPages; i++) {
    paths.push({
      params: {
        slug: (i + 1).toString(),
      },
    });
  }
  // console.log("paths");
  // console.log(paths);

  return {
    paths,
    fallback: false,
  };
};

// get blog pagination content
export const getStaticProps = async ({ params }) => {
  const currentPage = parseInt((params && params.slug) || 1);
  const { pagination } = config.settingsacara;
  let start = 1;
  if (currentPage > 1) {
    start = (currentPage - 1) * pagination;
  }
  let postIndex = await getListPage(
    `content/${blog_folder}/_index.md`,
    `http://adm.gempitamilenial.org/service/event-public?start=${start}&count=${pagination}`
  );

  const mdxContent = await parseMDX(postIndex.content);

  return {
    props: {
      pagination: pagination,
      currentPage: currentPage,
      postIndex: postIndex,
      mdxContent: mdxContent,
    },
    revalidate: 1,
  };
};

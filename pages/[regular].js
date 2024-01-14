import NotFound from "@layouts/404";
import Base from "@layouts/Baseof";
import Default from "@layouts/Default";
import Maknalogo from "@layouts/Maknalogo";
import Struktur from "@layouts/Struktur";
import Visidanmisi from "@layouts/Visidanmisi";
import Privacypolicies from "@layouts/Privacypolicy";
import Galeri from "@layouts/Galeri";
import { useRouter } from "next/router";
// import maknalogo from "@config/maknalogo";
import { getRegularPage, getSinglePage } from "@lib/contentParser";

// for all regular pages
const RegularPages = () => {
  const router = useRouter();
  // const { title, meta_title, description, image, noindex, canonical, layout } =
  //   data.frontmatter;
  // const { content } = data;
  // console.warn(contentMaknalogo);
  const layout = router.query.regular;
  return layout !== undefined ? (
    <Base title={layout}>
      {layout ? (
        <>
          {layout === "404" ? (
            <NotFound /> //done
          ) : layout === "maknalogo" ? (
            <Maknalogo /> //done
          ) : layout === "struktur" ? (
            <Struktur />
          ) : layout === "visimisi" ? (
            <Visidanmisi />
          ) : layout === "privacypolicy" ? (
            <Privacypolicies />
          ) : layout === "galeri" ? (
            <Galeri />
          ) : (
            <NotFound />
          )}
        </>
      ) : (
        ""
      )}
    </Base>
  ) : (
    <Base title={"loading"}></Base>
  );
};
export default RegularPages;

// for regular page routes
// export const getStaticPaths = async () => {
//   const allslugs = await getSinglePage("content");
//   const slugs = allslugs.map((item) => item.slug);
//   const paths = slugs.map((slug) => ({
//     params: {
//       regular: slug,
//     },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// };

// // for regular page data
// export const getStaticProps = async ({ params }) => {
//   const { regular } = params;

//   const regularPage = await getRegularPage(regular);
//   console.log("regularPage");
//   console.log(regularPage);
//   return {
//     props: {
//       slug: regular,
//       data: regularPage,
//     },
//   };
// };

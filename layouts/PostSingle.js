import { markdownify } from "@lib/utils/textConverter";
import shortcodes from "@shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import Base from "./Baseof";

const PostSingle = ({ frontmatter, mdxContent }) => {
  let { description, title, img, date, category_name } = frontmatter;
  description = description;
  // console.log(mdxContent)

  // console.warn(frontmatter)

  const convertEpochDate = (epochDate) => {
    // console.log(epochDate)

    const epochInMilliseconds =
      epochDate > 9999999999 ? epochDate : epochDate * 1000;
    const date = new Date(epochInMilliseconds);

    const seconds = Math.floor((Date.now() - date) / 1000);

    const interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return `${interval} tahun yang lalu`;
    }

    const intervalMonths = Math.floor(seconds / 2592000);
    if (intervalMonths >= 1) {
      return `${intervalMonths} bulan yang lalu`;
    }

    const intervalDays = Math.floor(seconds / 86400);
    if (intervalDays >= 1) {
      return `${intervalDays} hari yang lalu`;
    }

    const intervalHours = Math.floor(seconds / 3600);
    if (intervalHours >= 1) {
      return `${intervalHours} jam yang lalu`;
    }

    const intervalMinutes = Math.floor(seconds / 60);
    if (intervalMinutes >= 1) {
      return `${intervalMinutes} menit yang lalu`;
    }

    return `${seconds} detik${seconds === 1 ? "" : "s"} yang lalu`;

    // return date.toISOString();
  };

  return (
      <section className="section">
        <div className="container">
          <div className="row">
            <article className="col-12 mx-auto text-center md:col-8">
              {/* {img && (
                <Image
                  src={img._img0}
                  height="500"
                  width="1000"
                  alt={title}
                  priority={true}
                  // layout="responsive"
                  className="rounded-lg"
                />
              )} */}
              {markdownify(title, "h1", "h2 mb-6 mt-6 text-left")}
              <p className="mb-2" style={{ fontSize: "1 rem" }}>
              {convertEpochDate(date.epoch_time)} - {category_name}
            </p>
              <div className="content mb-16 text-left">
                <MDXRemote {...mdxContent} components={shortcodes} />
              </div>
            </article>
          </div>
        </div>
      </section>
  );
};

export default PostSingle;

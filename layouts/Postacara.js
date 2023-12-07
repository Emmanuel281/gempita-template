import { markdownify } from "@lib/utils/textConverter";
import shortcodes from "@shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import Base from "./Baseof";

const PostAcara = ({ frontmatter, mdxContent }) => {
  let { description, title, img, _cd, category_name, date_end, date_start, place, maximun_participant, joined_participant  } = frontmatter;
  description = description;

  const convertEpoch = () => {
    const epochstartInMilliseconds =
    date_start.epoch_time > 9999999999 ? date_start.epoch_time : date_start.epoch_time * 1000;
    const epochendInMilliseconds =
    date_end.epoch_time > 9999999999 ? date_end.epoch_time : date_end.epoch_time * 1000;
    const start = new Date(epochstartInMilliseconds);
    const end = new Date(epochendInMilliseconds);

    return `${start.toLocaleString()} - ${end.toLocaleString()}`
  }

  return (
    <Base title={title} description={description}>
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
            </p>
              <div className="content mb-16 text-left">
                <MDXRemote {...mdxContent} components={shortcodes} />
                <table>
                    <tr>
                        <td>Waktu</td>
                        <td>:</td>
                        <td>{convertEpoch()}</td>
                    </tr>
                    <tr>
                        <td>Yang Bergabung</td>
                        <td>:</td>
                        <td>{joined_participant}</td>
                    </tr>
                    <tr>
                        <td>Peserta Maksimum</td>
                        <td>:</td>
                        <td>{maximun_participant}</td>
                    </tr>
                    <tr>
                        <td>Tempat</td>
                        <td>:</td>
                        <td>{place}</td>
                    </tr>
                </table>
              </div>
            </article>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default PostAcara;

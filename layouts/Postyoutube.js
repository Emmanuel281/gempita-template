import { markdownify, plainify, humanize } from "@lib/utils/textConverter";
import shortcodes from "@shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import Base from "./Baseof";
import Link from "next/link";

const PostYoutube = ({ frontmatter }) => {
  console.log(frontmatter)
  return (
    <Base>
      <section className="section">
        <div className="container">
          <div className="row">
            <article className="col-12 text-center ">
                {markdownify(frontmatter[0].channel_name, "h1", "h2 mb-6 mt-6 text-left")}
                {frontmatter.map((vids, index) => (
                    <div key={index} className="col-12 mt-5">
                        <div className="shadow">
                            <table style={{width: "100%"}}>
                                <tbody>
                                    <tr>
                                        <td rowSpan={2}>
                                            <Image
                                                className="max-w-[227px] rounded-lg"
                                                src={vids.img}
                                                alt={""}
                                                width={540}
                                                height={227}
                                                priority={true}
                                            />
                                        </td>
                                        <td>
                                            <a target="_blank" href={vids.url} rel="noopener noreferrer">
                                                <h3 className="h4 mt-4">{vids.title}</h3>
                                            </a>
                                            
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><p>{vids.description.replace(/=/g,"").replace(/-/g,"")}</p></td>
                                    </tr>
                                </tbody>
                            </table>
                            
                        </div>
                    </div>
                ))}
            </article>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default PostYoutube;

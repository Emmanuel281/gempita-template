import { markdownify, plainify, humanize } from "@lib/utils/textConverter";
import config from "@config/config.json";
import shortcodes from "@shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import Base from "./Baseof";
import Link from "next/link";
import Postsyoutube from "@partials/Postsyoutube";
import Pagination from "@components/Pagination";
const { blog_folder, pagination } = config.settings;

const PostYoutube = ({ frontmatter, post, postindex }) => {
  let { description, title } = frontmatter;
  // console.log("post");
  // console.log(post[0]);
  console.log("postindex");
  console.log(postindex.contentapi.data);
  const totalPages = Math.ceil(post.length / pagination);
  const currentPage = 1;
  return (
    <Base title={title} description={description}>
      <section className="section">
        <div className="container">
          {markdownify(
            "Video Youtube Terbaru",
            "h1",
            "h1 text-center font-normal text-[56px]"
          )}
          <Postsyoutube posts={postindex.contentapi.data} type="youtube" />
          <hr></hr>
          <section>
            <div className="container">
              <div className="row">
                <article className="col-12 text-center ">
                  {post
                    ? post.map((vids, index) => (
                        <div key={index} className="col-12 mt-5">
                          <div className="shadow">
                            <div class="flex flex-col md:flex-row">
                              <div class="w-270 flex-initial">
                                <Image
                                  className="max-w-full rounded-lg"
                                  src={vids.img}
                                  alt={""}
                                  width={270}
                                  height={114}
                                  priority={true}
                                />
                              </div>
                              <div class="flex-1 pl-2 text-left">
                                <a
                                  target="_blank"
                                  href={vids.url}
                                  rel="noopener noreferrer"
                                >
                                  <h3 className="h4 mt-4">{vids.title}</h3>
                                </a>
                                <p>
                                  {vids.description
                                    .replace(/=/g, "")
                                    .replace(/-/g, "")}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    : ""}
                </article>
              </div>
            </div>
          </section>
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

export default PostYoutube;

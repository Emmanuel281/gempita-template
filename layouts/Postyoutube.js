import { markdownify, plainify, humanize } from "@lib/utils/textConverter";
import config from "@config/config.json";
import shortcodes from "@shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import Base from "./Baseof";
import Link from "next/link";
import Postsyoutube from "@partials/Postsyoutube";
import Pagination from "@components/Pagination";
const { blog_folder, pagination } = config.settingsyoutube;

const PostYoutube = ({ frontmatter, post, posts, slug, currentPage, postindex }) => {
  let { description, title } = frontmatter;
  const totalPages = Math.ceil(posts.total_count / pagination);
  const url = `${blog_folder}/${slug}`
  return (
    <Base title={title} description={description}>
      <section className="section">
        <div className="container">
          {markdownify(
            "Video Youtube Terbaru",
            "h1",
            "h1 text-center font-normal text-[56px]"
          )}
          <Postsyoutube posts={postindex.contentapi.data} slug={slug} type="youtube" />
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
                                  width={336}
                                  height={142}
                                  priority={true}
                                />
                              </div>
                              <div class="flex-1 pl-2 text-left">
                                <a
                                  target="_blank"
                                  href={vids.url}
                                  rel="noopener noreferrer"
                                >
                                  <h4 className="h4 my-4">{vids.title}</h4>
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
            section={url}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      </section>
    </Base>
  );
};

export default PostYoutube;

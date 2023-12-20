import config from "@config/config.json";
import { plainify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const Postsyoutube = ({ posts, type }) => {
  const { blog_folder, summary_length } = config.settings;

  return (
    <div className="section row pb-0">
      <div className="col-12">
        <div className="flex flex-nowrap overflow-x-auto px-4">
          {posts.map((post, i) => (
            <div className="m-1 min-w-fit">
              <Link
                className="btn btn-primary m-1 min-w-fit"
                href={`/${type}/${post.id}`}
                rel=""
              >
                {post.channel_name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Postsyoutube;

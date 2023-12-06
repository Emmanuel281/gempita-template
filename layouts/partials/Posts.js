import config from "@config/config.json";
import { plainify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const Posts = ({ posts }) => {
  const { blog_folder, summary_length } = config.settings;
  // console.log("posts");
  console.log(posts[0].date.epoch_time);

  const convertEpochDate = (arrayindex) => {
    const epochDate = posts[arrayindex].date.epoch_time;
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
    <div className="section row pb-0">
      <div className="col-12 pb-12 lg:pb-24">
        <div
          className="row items-center rounded-lg"
          style={{ backgroundColor: "#e9e9e9" }}
        >
          <div className="col-12 md:col-6" style={{ padding: "0px" }}>
            {posts[0].img._img0 ? (
              <Image
                className="h-auto w-full rounded-lg"
                src={posts[0].img._img0}
                alt={"/images/blog-1.jpg"}
                width={540}
                height={227}
                priority={true}
              />
            ) : (
              <Image
                className="h-auto w-full rounded-lg"
                src={"/images/blog-1.jpg"}
                width={540}
                height={227}
                priority={true}
              />
            )}
          </div>
          <div className="col-12 md:col-6">
            <h2 className="h3 mt-4">
              <Link
                href={`/${blog_folder}/${posts[0].slug}`}
                className="block hover:text-primary"
              >
                {posts[0].title}
              </Link>
            </h2>
            <p className="mb-2" style={{ fontSize: "1 rem" }}>
              {convertEpochDate(0)}
            </p>

            <h5 className="mb-4 mt-4 text-text">
              {plainify(
                posts[0].description?.slice(0, Number(summary_length)),
                "div"
              )}
            </h5>
            <Link
              className="btn btn-primary mt-4"
              href={`/${blog_folder}/${posts[0].slug}`}
              rel=""
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
      {posts.slice(1).map((post, i) => (
        <div key={`key-${i}`} className="col-12 mb-8 sm:col-6 lg:col-4">
          {post.img._img0 && (
            <Image
              className="rounded-lg"
              src={post.img._img0}
              alt={"/images/blog-1.jpg"}
              width={i === 0 ? "925" : "445"}
              height={i === 0 ? "475" : "230"}
            />
          )}
          <h2 className="h3 mt-4">
            <Link
              href={`/${blog_folder}/${post.slug}`}
              className="block hover:text-primary"
            >
              {post.title}
            </Link>
          </h2>
          <p className="mb-2" style={{ fontSize: "1 rem" }}>
            {convertEpochDate(i)}
          </p>
          <p className="text-text">
            {plainify(
              post.description?.slice(0, Number(summary_length)),
              "div"
            )}
          </p>
          <Link
            className="btn btn-primary mt-4"
            href={`/${blog_folder}/${post.slug}`}
            rel=""
          >
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Posts;

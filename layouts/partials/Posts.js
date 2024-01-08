import config from "@config/config.json";
import { plainify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const Posts = ({ posts, type, currentPage }) => {
  const { blog_folder, summary_length } = config.settings;

  const convertEpochDate = (arrayindex) => {
    let epochDate = "";

    if (posts[arrayindex].date?.epoch_time) {
      epochDate = posts[arrayindex].date.epoch_time;
    } else if (posts[arrayindex]._cd?.epoch_time) {
      epochDate = posts[arrayindex]._cd.epoch_time;
    }
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
                alt={"1"}
                width={540}
                height={227}
                priority={true}
              />
            ) : posts[0].img ? (
              <Image
                className="h-auto w-full rounded-lg"
                src={
                  posts[0].img.length >= 1
                    ? posts[0].img
                    : "/images/Mukadimah-530x356.jpg"
                }
                alt={"2"}
                width={540}
                height={227}
                priority={true}
              />
            ) : (
              <Image
                className="h-auto w-full rounded-lg"
                src={"/images/Mukadimah-530x356.jpg"}
                alt={"/images/blog-1.jpg"}
                width={540}
                height={227}
                priority={true}
              />
            )}
          </div>
          <div className="col-12 md:col-6">
            <h2 className="h3 mt-4">
              <Link
                href={`/${type}/${currentPage}$${posts[0].id}`}
                className="block hover:text-primary"
              >
                {posts[0].title
                  ? posts[0].title
                  : posts[0].channel_name
                  ? posts[0].channel_name
                  : ""}
              </Link>
            </h2>
            <p className="mb-2" style={{ fontSize: "1 rem" }}>
              {convertEpochDate(0)}{" "}
              {currentPage == 1 ? (
                <span
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "4px 8px",
                    textAlign: "center",
                    borderRadius: "5px",
                  }}
                >
                  Terbaru
                </span>
              ) : (
                ""
              )}
            </p>

            <h5 className="mb-4 mt-4 text-text">
              {type == "acara"
                ? posts[0].place
                : plainify(
                    posts[0].description
                      ?.slice(0, Number(summary_length))
                      .concat("..."),
                    "div"
                  )}
            </h5>
            {/* <Link
              className="btn btn-primary mt-4"
              href={`/${type}/${posts[0].id}`}
              rel=""
            >
              Read More
            </Link> */}
          </div>
        </div>
      </div>
      {posts.slice(1).map((post, i) => (
        <div key={`key-${i}`} className="col-12 mb-8 sm:col-6 lg:col-4">
          {post.img._img0 ? (
            <Image
              className="h-auto w-full rounded-lg"
              src={post.img._img0}
              alt={"/images/blog-1.jpg"}
              width={540}
              height={227}
              priority={true}
            />
          ) : post.img != "" ? (
            <Image
              className="h-auto w-full rounded-lg"
              src={post.img}
              alt={"/images/blog-1.jpg"}
              width={540}
              height={227}
              priority={true}
            />
          ) : (
            <Image
              className="h-auto w-full rounded-lg"
              src={"Revolusioner-530x356-5"}
              alt={"/images/blog-1.jpg"}
              width={540}
              height={227}
              priority={true}
            />
          )}
          <h2 className="h3 mt-4">
            <Link
              href={`/${type}/${currentPage}$${post.id}`}
              className="block hover:text-primary"
            >
              {post.title
                ? post.title
                : post.channel_name
                ? post.channel_name
                : ""}
            </Link>
          </h2>
          <p className="mb-2" style={{ fontSize: "1 rem" }}>
            {convertEpochDate(i)}
          </p>
          <p className="text-text">
            {plainify(
              post.description?.slice(0, Number(summary_length)).concat("..."),
              "div"
            )}
          </p>
          {/* <Link
            className="btn btn-primary mt-4"
            href={`/${type}/${post.id}`}
            rel=""
          >
            Read More
          </Link> */}
        </div>
      ))}
    </div>
  );
};

export default Posts;

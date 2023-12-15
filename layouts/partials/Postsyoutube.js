import config from "@config/config.json";
import { plainify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const Postsyoutube = ({ posts, type }) => {
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
        <div className="flex flex-nowrap overflow-x-scroll ">
          {posts.map((post, i) => (
            <div className="m-1 min-w-fit">
              <Link
                className="btn btn-primary m-1 min-w-fit"
                href={`/${type}/${posts.id}`}
                rel=""
              >
                {post.channel_name}
              </Link>
            </div>
          ))}
          {posts.map((post, i) => (
            <div className="m-1 min-w-fit">
              <Link
                className="btn btn-primary m-1 min-w-fit"
                href={`/${type}/${posts.id}`}
                rel=""
              >
                {post.channel_name}
              </Link>
            </div>
          ))}
          {posts.map((post, i) => (
            <div className="m-1 min-w-fit">
              <Link
                className="btn btn-primary m-1 min-w-fit"
                href={`/${type}/${posts.id}`}
                rel=""
              >
                {post.channel_name}
              </Link>
            </div>
          ))}
          {posts.map((post, i) => (
            <div className="m-1 min-w-fit">
              <Link
                className="btn btn-primary m-1 min-w-fit"
                href={`/${type}/${posts.id}`}
                rel=""
              >
                {post.channel_name}
              </Link>
            </div>
          ))}
          {posts.map((post, i) => (
            <div className="m-1 min-w-fit">
              <Link
                className="btn btn-primary m-1 min-w-fit"
                href={`/${type}/${posts.id}`}
                rel=""
              >
                {post.channel_name}
              </Link>
            </div>
          ))}
        </div>
        <div
          className="row items-center rounded-lg"
          style={{ backgroundColor: "#e9e9e9" }}
        ></div>
      </div>
    </div>
  );
};

export default Postsyoutube;

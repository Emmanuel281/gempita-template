import Link from "next/link";

const Postsyoutube = ({ posts, slug, type }) => {
  // console.log(slug)
  return (
    <div className="section row pb-0">
      <div className="col-12">
        <div className="flex flex-nowrap overflow-x-auto px-4">
          {posts.map((post, i) =>
            post.id == "b39a0496-a42f-4d5b-8712-b127fcdcee72" ? (
              post.id == slug ? (
                <div key={`key-${i}`} className="m-1 min-w-fit">
                  <Link
                    className="btn btn-primary m-1 min-w-fit"
                    href={`/${type}/${post.id}`}
                    rel=""
                  >
                    {post.channel_name}
                  </Link>
                </div>
              ) : (
                <div className="m-1 min-w-fit">
                  <Link
                    className="btn btn-outline-primary m-1 min-w-fit"
                    href={`/${type}/${post.id}`}
                    rel=""
                  >
                    {post.channel_name}
                  </Link>
                </div>
              )
            ) : (
              ""
            )
          )}
          {posts.map((post, i) =>
            post.id != "b39a0496-a42f-4d5b-8712-b127fcdcee72" ? (
              post.id == slug ? (
                <div key={`key-${i}`} className="m-1 min-w-fit">
                  <Link
                    className="btn btn-primary m-1 min-w-fit"
                    href={`/${type}/${post.id}`}
                    rel=""
                  >
                    {post.channel_name}
                  </Link>
                </div>
              ) : (
                <div className="m-1 min-w-fit">
                  <Link
                    className="btn btn-outline-primary m-1 min-w-fit"
                    href={`/${type}/${post.id}`}
                    rel=""
                  >
                    {post.channel_name}
                  </Link>
                </div>
              )
            ) : (
              ""
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Postsyoutube;

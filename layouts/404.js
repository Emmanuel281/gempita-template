import { markdownify } from "@lib/utils/textConverter";
import config from "@config/404.json";

const NotFound = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="flex h-[40vh] items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4">{config.title}</h1>
            {markdownify(config.content, "div", "content")}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;

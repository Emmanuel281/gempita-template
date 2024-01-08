import config from "@config/config.json";
import configvisimisi from "@config/visimisi.json";
import { markdownify } from "@lib/utils/textConverter";

const Struktur = () => {
  return (
    <section className="section">
      <div className="container">
        {markdownify(configvisimisi.title, "h1", "text-center font-normal")}
        {configvisimisi.visidanmisi.map((item, i) => {
          return (
            <div className="mt-10">
              {markdownify(item.title, "h4", "text-center")}
              <br></br>
              {item?.desc.map((desc, index) =>
                markdownify(desc, "h6", "text-center font-normal")
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Struktur;

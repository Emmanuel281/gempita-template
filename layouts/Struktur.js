import configstruktur from "@config/struktu.json";
import { markdownify } from "@lib/utils/textConverter";

const Struktur = () => {
  const strukturs = configstruktur;
  return (
    <section className="section">
      <div className="container">
        {markdownify(strukturs.title, "h1", "text-center font-normal")}
        {strukturs.strukturs.map((item, i) => {
          return (
            <div className="mt-10">
              {markdownify(item.title, "h4", "text-center font-normal")}
              <br></br>
              {item?.people.map((people, index) =>
                markdownify(people, "h6", "text-center font-normal")
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Struktur;

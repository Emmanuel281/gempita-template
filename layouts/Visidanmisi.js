import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";

const Struktur = ({ data }) => {
  const { frontmatter } = data;
  const { title, info, visidanmisi } = frontmatter;
  const { contact_form_action } = config.params;
  // console.log(visidanmisi);
  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "text-center font-normal")}
        {visidanmisi.map((item, i) => {
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

export const getStaticProps = async () => {
  const homePage = await getListPage("content/visidanmisi.md");
  const { frontmatter } = homePage;
  return {
    props: {
      frontmatter,
    },
  };
};

export default Struktur;

import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";

const Struktur = ({ data }) => {
  const { frontmatter } = data;
  const { title, info, strukturs } = frontmatter;
  const { contact_form_action } = config.params;
  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "text-center font-normal")}
        {strukturs.map((item, i) => {
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

export const getStaticProps = async () => {
  const homePage = await getListPage("content/struktur.md");
  const { frontmatter } = homePage;
  return {
    props: {
      frontmatter,
    },
  };
};

export default Struktur;

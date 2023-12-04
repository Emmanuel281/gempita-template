import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";

const Privacypolicies = ({ data }) => {
  const { frontmatter } = data;
  const { title, info, visidanmisi } = frontmatter;
  const { contact_form_action } = config.params;
  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "text-center font-normal")}
        {visidanmisi.map((item, i) => {
          return (
            <div className="mt-10">
              {markdownify(item.title, "h3", "text-center font-normal")}
              <br></br>
              {item?.desc.map((desc, index) => (
                <div>
                  {markdownify(desc, "h6", "text-center font-normal")}
                  <br></br>
                </div>
              ))}
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

export default Privacypolicies;

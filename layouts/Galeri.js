import config from "@config/config.json";
import image from "@config/image.json";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import ImgContainer from "./ImgContainer";

const Maknalogo = ({ data }) => {
  const { frontmatter } = data;
  const { title, info } = frontmatter;
  const { contact_form_action } = config.params;

  console.warn(image.photos);

  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "text-center font-normal")}
        <section className="grid-cols-gallery my-3 grid auto-rows-[10px] px-1">
          {image.photos.map((photo, index) => (
            <ImgContainer key={photo.id} photo={photo} />
          ))}
        </section>
      </div>
    </section>
  );
};

export default Maknalogo;

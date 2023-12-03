import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";

const Maknalogo = ({ data }) => {
  const { frontmatter } = data;
  const { title, info } = frontmatter;
  const { contact_form_action } = config.params;

  return (
    <section className="section">
      <div className="container">
        <table>
          <tr>
            <td className="w-2/6">
              <Image
                className="mx-auto"
                src={"/images/logo.png"}
                width={200}
                height={200}
                alt=""
              />
            </td>
            <td className="w-4/6">
              <p>Lingkar Hitam</p>
              <p>
                Warna hitam dengan garis lingkar merah, melambangkan sikap
                berani, lugas, dan mendasar.
              </p>
              <br />
              <p>Garuda Pancasila</p>
              <p>
                Garuda Pancasila adalah lambang ideologi negara.Penegasan bahwa
                GEMPITA berasaskan Pancasiladengan semangat pengamalan pada lima
                sila yangada.
              </p>
              <br />
              <p>Garuda Merah Putih</p>
              <p>
                Warna merah dan putih pada burung Garuda Pancasila adalah simbol
                nasionalisme, Cinta Tanah Air.
              </p>
              <br />
              <p>Lima Milenial Emas</p>
              <p>
                Lima milenial warna emas adalah perwujudan kaum emas. Lambang
                potensi negarasekaligus tiang dan pagar nusa.
              </p>
              <br />
              <p>Pita Gempita</p>
              <p>
                Tulisan GEMPITA warna putih, pada dasar pita warna merah
                menunjukkan bahwaorganisasi ini bergerak dengan kesucian niat
                (hati) dan segenap keberanian untuk Indonesia maju.
              </p>
            </td>
          </tr>
        </table>
      </div>
    </section>
  );
};

export default Maknalogo;

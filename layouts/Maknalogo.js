import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";

const Maknalogo = () => {
  return (
    <section className="section">
      <div className="container">
        {markdownify("Makna Logo", "h1", "text-center font-normal")}
        <br />
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
              <h6>Lingkar Hitam</h6>
              <p>
                Warna hitam dengan garis lingkar merah, melambangkan sikap
                berani, lugas, dan mendasar.
              </p>
              <br />
              <h6>Garuda Pancasila</h6>
              <p>
                Garuda Pancasila adalah lambang ideologi negara.Penegasan bahwa
                GEMPITA berasaskan Pancasiladengan semangat pengamalan pada lima
                sila yangada.
              </p>
              <br />
              <h6>Garuda Merah Putih</h6>
              <p>
                Warna merah dan putih pada burung Garuda Pancasila adalah simbol
                nasionalisme, Cinta Tanah Air.
              </p>
              <br />
              <h6>Lima Milenial Emas</h6>
              <p>
                Lima milenial warna emas adalah perwujudan kaum emas. Lambang
                potensi negarasekaligus tiang dan pagar nusa.
              </p>
              <br />
              <h6>Pita Gempita</h6>
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

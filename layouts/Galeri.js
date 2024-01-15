import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import cbor from "cbor";
import config from "@config/config.json";
import image from "@config/image.json";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import ImgContainer from "./ImgContainer";
import { Oval } from "react-loader-spinner";
const title = "Galeri";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

const Maknalogo = ({ data }) => {
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://adm.gempitamilenial.org/service/gallery-public?start=0&count=10`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.arrayBuffer();
      const posts = await cbor.decode(result);
      console.log(posts);
      setPost(posts);
    };

    fetchData().catch((e) => {
      console.error("An error occurred while fetching the data: ", e);
    });
  }, []);

  const convertEpochDate = (arrayindex) => {
    let epochDate = arrayindex;
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    var date = new Date(epochDate * 1000);

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    return day + " " + months[month - 1] + " " + year;

    // return date.toISOString();
  };

  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "text-center font-normal")}
        <br></br>
        {Object.keys(post).length != 0 ? (
          <div className="grid justify-items-center gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {post.data.map((posts, index) => (
              <div className="w-full rounded-md shadow">
                <div
                  className="swiper-container order-2"
                  style={{
                    maxWidth: "90vw",
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  <Swiper
                    modules={[Autoplay, Pagination]}
                    slidesPerView={1}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                  >
                    {Object.keys(posts).map(function (key, index) {
                      if (key.includes("_foto")) {
                        return (
                          <SwiperSlide>
                            <Image
                              src={posts[key]}
                              alt=""
                              width={300}
                              height={200}
                              style={{
                                width: "100%",
                                height: "200px",
                              }}
                            />
                          </SwiperSlide>
                        );
                      }
                    })}
                    {posts.hasOwnProperty("_foto0") ? (
                      ""
                    ) : (
                      <SwiperSlide>
                        <Image
                          src={"/images/Mukadimah-530x356.jpg"}
                          alt=""
                          width={300}
                          height={200}
                          style={{
                            width: "100%",
                            height: "200px",
                          }}
                        />
                      </SwiperSlide>
                    )}
                  </Swiper>
                </div>
                <hr></hr>
                {markdownify(
                  convertEpochDate(posts.date.epoch_time),
                  "p",
                  "text-center font-normal"
                )}
                {markdownify(posts.title, "h5", "text-center font-normal")}
              </div>
              // <ImgContainer key={photo.id} photo={photo} />
            ))}
          </div>
        ) : (
          <Oval
            visible={true}
            height="50"
            width="50"
            color="#e00000"
            secondaryColor="#808080"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass="text-center"
          />
        )}
      </div>
    </section>
  );
  // return (
  //   <section className="section">
  //     <div className="container">
  //       {markdownify(title, "h1", "text-center font-normal")}
  //       {/* <section className="grid-cols-gallery my-3 grid auto-rows-[10px] px-1">
  //         {image.photos.map((photo, index) => (
  //           <ImgContainer key={photo.id} photo={photo} />
  //         ))}
  //       </section> */}
  //     </div>
  //   </section>
  // );
};

export default Maknalogo;

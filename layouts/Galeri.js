import React, { useState, useEffect } from "react";
import cbor from "cbor";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import { Oval } from "react-loader-spinner";
const title = "Galeri";
import { Modal } from "flowbite-react";
import ModalImage from "react-modal-image";
import useSWR from 'swr'
// const fetcher = (...args) => fetch(...args).then(res => res.json())
const fetcher = url => fetch(url).then(r => r.arrayBuffer())

const customTheme = {
  close: {
    base: "h-5",
    icon: "m-0",
  },
};

const Maknalogo = () => {
  const [currentpost, setcurrentpost] = useState({});
  const [openModal, setOpenModal] = useState(false);
  let { data, error, isLoading } = useSWR('https://adm.gempitamilenial.org/service/gallery-public?start=0&count=10', fetcher)
 
  if (error) console.log(error)
  if (isLoading) console.log(isLoading)
  if (data) {
    data = cbor.decode(data) 
  }
  

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(
  //       `https://adm.gempitamilenial.org/service/gallery-public?start=0&count=10`
  //     );
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const result = await response.arrayBuffer();
  //     const posts = await cbor.decode(result);
  //     console.log(posts);
  //     setPost(posts);
  //   };

  //   fetchData().catch((e) => {
  //     console.error("An error occurred while fetching the data: ", e);
  //   });
  // }, []);

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
        {Object.keys(data).length != 0 ? (
          <div className="grid justify-items-center gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {data.data.map((posts, index) => (
              <div
                className="w-full rounded-md shadow"
                onClick={() => {
                  setcurrentpost(posts);
                  setOpenModal(true);
                  // console.log(currentpost);
                }}
              >
                <div
                  className="swiper-container order-2"
                  style={{
                    maxWidth: "90vw",
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  {posts.hasOwnProperty("_foto0") ? (
                      <Image
                      src={posts["_foto0"]}
                      alt=""
                      width={300}
                      height={200}
                      style={{
                        width: "100%",
                        height: "200px",
                      }}
                    />
                    ) : (
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
                    )}
                </div>
                <hr></hr>
                {markdownify(
                  convertEpochDate(posts.date.epoch_time),
                  "p",
                  "text-center font-normal"
                )}
                <h5 className="text-center font-normal">{posts.title}</h5>
                {/* {markdownify(posts.title, "h5", "text-center font-normal")} */}
                {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
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
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header theme={customTheme}>{currentpost.title}</Modal.Header>
        <Modal.Body>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            {Object.keys(currentpost).map(function (key, index) {
              if (key.includes("_foto")) {
                return (
                  <ModalImage
                    small={currentpost[key]}
                    large={currentpost[key]}
                    alt={currentpost.title}
                  />
                  // <Image
                  //   src={currentpost[key]}
                  //   alt=""
                  //   width={300}
                  //   height={200}
                  // />
                );
              }
            })}
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer> */}
      </Modal>
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

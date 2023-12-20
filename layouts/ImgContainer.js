import Image from "next/image";
import Link from "next/link";

export default function ImgContainer({ photo }) {
  const widthHeightRatio = photo.height / photo.width;
  const galleryHeight = Math.ceil(250 * widthHeightRatio);
  const photoSpans = Math.ceil(galleryHeight / 10) + 4;

  console.warn(photo.src);

  return (
    <div
      className="w-[250px] justify-self-center"
      style={{ gridRow: `span ${photoSpans}` }}
    >
      <Link
        href={photo.url}
        target="_blank"
        className="grid place-content-center"
      >
        <div className="group overflow-hidden rounded-xl">
          <Image
            src={photo.src.original}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="250px"
            className="group-hover:opacity-75"
          />
          <h6>{photo.alt}</h6>
        </div>
      </Link>
    </div>
  );
}

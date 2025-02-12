import { ProductWithTotalPrice } from "@/helpers/product";
import Image from "next/image";

interface ProductImagesProps {
  product: ProductWithTotalPrice;
  handleImageClick: (url: string) => void;
  classNameContainer: string;
  classNameDiv: string;
  classNameImage?: string;
}

const ProductImages = ({
  product,
  handleImageClick,
  classNameContainer,
  classNameDiv,
  classNameImage,
}: ProductImagesProps) => {
  return (
    <div className={classNameContainer}>
      {product.imageURLs.map((url, index) => (
        <div
          key={index}
          className={`cursor-pointer ${classNameDiv}`}
          onClick={() => handleImageClick(url)}
          data-aos="zoom-in"
          data-aos-delay={index * 100}
        >
          <Image
            src={url}
            alt={`Imagem do produto: ${product.name}`}
            width={70}
            height={70}
            loading="lazy"
            sizes="100vw"
            className={`w-[5rem] h-[5rem] object-contain ${classNameImage}`}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductImages;

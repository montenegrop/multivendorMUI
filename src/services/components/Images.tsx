import React from "react";

import { useUploadServiceContractImage } from "../views/mutations";

const Images = () => {
  const [
    uploadServiceContractImage,
    stateServiceContractImageUpload
  ] = useUploadServiceContractImage({});

  const initImages = ["0", "1", "2", "3", "4"].map(position => ({
    file: null,
    position
  }));

  const [images, setImages] = React.useState<
    Array<{ file: any; position: string }>
  >(initImages);

  images.forEach(image => {
    if (image.file !== null) {
      if (image.file === "delete") {
        uploadServiceContractImage({
          variables: {
            contractId: "id",
            image: null,
            position: image.position
          }
        });
        return;
      }
      if (image.file?.type) {
        uploadServiceContractImage({
          variables: {
            contractId: "id",
            image: image.file,
            position: image.position
          }
        });
      }
    }
  });

  return <div>hola</div>;
};

export default Images;

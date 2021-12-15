import React from "react";

const Images = () => <div>hola</div>;
export default Images;

export const imageChange = (images, funcion) => {
  images.forEach(image => {
    if (image.file !== null) {
      if (image.file === "delete") {
        funcion({
          variables: {
            contractId: "U2VydmljZUNvbnRyYWN0OjE5",
            image: null,
            position: image.position
          }
        });
        return;
      }
      if (image.file?.type) {
        funcion({
          variables: {
            contractId: "U2VydmljZUNvbnRyYWN0OjE5",
            image: image.file,
            position: image.position
          }
        });
      }
    }
  });
};

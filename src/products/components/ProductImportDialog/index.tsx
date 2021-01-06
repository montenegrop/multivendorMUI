// import createMultiFileUploadHandler from "@saleor/utils/handlers/multiFileUploadHandler";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { productImportMutation } from "@saleor/products/mutations";
import { DialogProps } from "@saleor/types";
import React from "react";
import { useMutation } from "react-apollo";
// import { ChangeEventHandler } from "react";
// import { useIntl } from "react-intl";

interface ProductImagesProps extends DialogProps {
  loading?: boolean;
}
const ProductImportDialog: React.FC<ProductImagesProps> = ({
  onClose,
  open,
  loading
}) => {
  // const intl = useIntl();
  const upload = React.useRef(null);

  const [mutate, result] = useMutation(productImportMutation);

  const onChange: any = ({
    target: {
      validity,
      files: [file]
    }
  }) => {
    if (validity.valid) {
      mutate({ variables: { file } });
    }
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm" fullWidth>
      <>
        {result.loading && <div>loading</div>}
        <Button
          onClick={() => upload.current.click()}
          disabled={loading}
          variant="text"
          color="primary"
          data-test="button-upload-image"
        >
          {" subir csv "}
        </Button>
        <input type="file" required onChange={onChange} />
        <Button onClick={onClose} data-test="cancel">
          cerrar
        </Button>
      </>
    </Dialog>
  );
};
export default ProductImportDialog;

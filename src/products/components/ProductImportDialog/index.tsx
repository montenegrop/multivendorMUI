// import createMultiFileUploadHandler from "@saleor/utils/handlers/multiFileUploadHandler";
import { DialogActions } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { productsImportMutation } from "@saleor/products/mutations";
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

  const [mutate, result] = useMutation(productsImportMutation);

  const onChange: any = ({
    target: {
      validity,
      files: [file]
    }
  }) => {
    if (validity.valid) {
      const x = mutate({ variables: { file } });
      x.then(result => {
        onClose();
      });
    }
  };

  if (result.data?.productsImport?.success) {
    // onClose();
  }

  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm" fullWidth>
      <DialogTitle>Importador de productos</DialogTitle>
      <DialogContent>
        {result.loading && <div>loading</div>}
        <div>{result.loading}</div>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} data-test="cancel">
          cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ProductImportDialog;

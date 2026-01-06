import { Formik } from "formik";
import EditModalShell from "./EditModalShell";
import EditModalRenderer from "./EditModalRenderer";
import { FieldSchema } from "./editModal.types";
import { buildYupSchema } from "./buildYupSchema";

interface Props {
  open: boolean;
  title: string;
  leftTitle: string;
  fields: FieldSchema[];
  initialValues: Record<string, any>;
  onSubmit: (values: any) => void;
  onClose: () => void;
  loading?: boolean;
  children?: React.ReactNode;
}

const FormikEditModal = ({
  open,
  title,
  leftTitle,
  fields,
  initialValues,
  onSubmit,
  onClose,
  loading,
  children,
}: Props) => {
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={buildYupSchema(fields)}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <EditModalShell
          open={open}
          title={title}
          leftTitle={leftTitle}
          loading={loading}
          onClose={onClose}
          onSubmit={formik.submitForm}
        >
          <EditModalRenderer
            fields={fields}
            values={formik.values}
            onChange={formik.setFieldValue}
          />
          {children}
        </EditModalShell>
      )}
    </Formik>
  );
};

export default FormikEditModal;

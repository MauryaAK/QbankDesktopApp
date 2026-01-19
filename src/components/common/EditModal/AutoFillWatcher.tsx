import { useEffect } from "react";
import { FormikProps } from "formik";

interface AutoFillProps {
  formik: FormikProps<any>;
  allValues: any
}

const AutoFillWatcher = ({ formik, allValues }: AutoFillProps) => {
  const { values, setFieldValue } = formik;
  console.log(values);

  useEffect(() => {
    if (values.courseId) {
      const val = allValues.find(e => e?.courseId)
      setFieldValue("courseName", val?.courseName);
      setFieldValue("endDate", val?.endDate);
      setFieldValue("levelOfTraining", val?.levelOfTraining);
      setFieldValue("aircraftType", val?.aircraftType);
      setFieldValue("startDate", val?.startDate);
      localStorage.setItem("ataId", `${val?.ataId}`)
    }
  }, [values.courseId, setFieldValue]);

  return null; // no UI
};


export default AutoFillWatcher
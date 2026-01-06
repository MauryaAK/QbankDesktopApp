import * as Yup from "yup";
import { FieldSchema } from "./editModal.types";

export const buildYupSchema = (fields: FieldSchema[]) => {
  const shape: Record<string, any> = {};

  fields.forEach((f) => {
    let rule: any;

    switch (f.type) {
      case "number":
        rule = Yup.number();
        if (f.min !== undefined) rule = rule.min(f.min);
        if (f.max !== undefined) rule = rule.max(f.max);
        break;

      case "checkbox":
      case "toggle":
        rule = Yup.boolean();
        break;

      default:
        rule = Yup.string();
    }

    if (f.email) rule = rule.email("Invalid email");

    if (f.matches)
      rule = rule.matches(f.matches, "Invalid format");

    if (f.required)
      rule = rule.required(`${f.label} is required`);

    /* 🔥 CONDITIONAL */
    if (f.when) {
      rule = rule.when(f.when.field, {
        is: f.when.is,
        then: (r: any) =>
          f.when?.thenRequired
            ? r.required(`${f.label} is required`)
            : r,
      });
    }

    shape[f.name] = rule;
  });

  return Yup.object().shape(shape);
};

import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  NumberInput,
  TextInput,
  SelectInput,
} from "react-admin";

export const CatEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <NumberInput step={1} label="Age" source="age" />
        <TextInput label="lastName" source="lastName" />
        <TextInput label="Name" source="name" />
        <TextInput label="Picture" source="picture" />
        <TextInput label="tailSize" source="tailSize" />
        <SelectInput
          source="type"
          label="Type"
          choices={[
            { label: "Large", value: "Large" },
            { label: "Medium", value: "Medium" },
            { label: "Small", value: "Small" },
          ]}
          optionText="label"
          allowEmpty
          optionValue="value"
        />
      </SimpleForm>
    </Edit>
  );
};

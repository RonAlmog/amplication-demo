import * as React from "react";

import {
  Create,
  SimpleForm,
  CreateProps,
  NumberInput,
  ReferenceInput,
  SelectInput,
  TextInput,
} from "react-admin";

import { CustomerTitle } from "../customer/CustomerTitle";

export const CatCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <NumberInput step={1} label="Age" source="age" />
        <ReferenceInput
          source="customer.id"
          reference="Customer"
          label="Customer"
        >
          <SelectInput optionText={CustomerTitle} />
        </ReferenceInput>
        <TextInput label="lastName" source="lastName" />
        <TextInput label="mothersName" source="mothersName" />
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
    </Create>
  );
};

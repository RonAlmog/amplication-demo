import * as React from "react";
import {
  List,
  Datagrid,
  ListProps,
  TextField,
  DateField,
  ReferenceField,
} from "react-admin";
import Pagination from "../Components/Pagination";
import { CUSTOMER_TITLE_FIELD } from "../customer/CustomerTitle";

export const CatList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title={"Cats"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show">
        <TextField label="Age" source="age" />
        <DateField source="createdAt" label="Created At" />
        <ReferenceField
          label="Customer"
          source="customer.id"
          reference="Customer"
        >
          <TextField source={CUSTOMER_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="ID" source="id" />
        <TextField label="lastName" source="lastName" />
        <TextField label="mothersName" source="mothersName" />
        <TextField label="Name" source="name" />
        <TextField label="Picture" source="picture" />
        <TextField label="tailSize" source="tailSize" />
        <TextField label="Type" source="type" />
        <DateField source="updatedAt" label="Updated At" />
      </Datagrid>
    </List>
  );
};

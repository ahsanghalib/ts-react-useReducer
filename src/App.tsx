import React, { useContext, useState } from "react";
import { AppContext } from "./store/Context";
import { Create, Delete, Edit } from "./store/Actions";

function App() {
  const { state, dispatch } = useContext(AppContext);
  const [initValues, setInitValues] = useState({ name: "", price: 0 });
  const [edit, setEdit] = useState<number>(0);

  const onChangeHanle = (event: any) => {
    const name = event.target.name;
    setInitValues({
      ...initValues,
      [name]: event.target.value,
    });
  };

  const onSubmitHanlde = (event: any) => {
    event.preventDefault();

    if (edit !== 0) {
      dispatch(
        Edit({ id: edit, name: initValues.name, price: initValues.price })
      );
    } else {
      dispatch(Create(initValues));
    }

    setInitValues({
      name: "",
      price: 0,
    });
    setEdit(0);
  };

  const onRemoveHanlde = (id: number) => {
    dispatch(Delete(id));
  };

  const onEditHandle = (id: number) => {
    const prod = state.products.find((d) => d.id === id);
    setEdit(prod ? id : 0);
    setInitValues({
      name: prod ? prod.name : "",
      price: prod ? prod.price : 0,
    });
  };

  const list = state.products.map((d) => (
    <div
      key={d.id}
      style={{
        display: "flex",
        fontSize: "1rem",
        alignContent: "center",
        maxWidth: "800px",
        alignItems: "center",
        margin: "10px",
      }}
    >
      <div style={{ marginRight: "10px" }}>ID: {d.id}</div>
      <div style={{ marginRight: "10px" }}>Prod: {d.name}</div>
      <div style={{ marginRight: "10px" }}>Price: {d.price}</div>
      <button
        onClick={() => onRemoveHanlde(d.id)}
        style={{ marginRight: "10px" }}
      >
        Remove
      </button>
      <button onClick={() => onEditHandle(d.id)}>Edit</button>
    </div>
  ));

  return (
    <div style={{ padding: "15px" }}>
      <form onSubmit={onSubmitHanlde}>
        Name:{" "}
        <input
          type="text"
          id="name"
          name="name"
          value={initValues.name}
          onChange={onChangeHanle}
          style={{ marginRight: "10px" }}
        />
        Price:{" "}
        <input
          type="text"
          id="price"
          name="price"
          value={initValues.price}
          onChange={onChangeHanle}
          style={{ marginRight: "10px" }}
        />
        <button type="submit">{edit === 0 ? "Add" : "Save"}</button>
      </form>
      {list}
    </div>
  );
}

export default App;

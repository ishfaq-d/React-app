import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";

function Detail(props) {
  const { addToCart } = props;

  const { id } = useParams();

  const [sku, setSku] = useState("");

  const { data: p, loading, error } = useFetch(`products/${id}`);

  const naviGate = useNavigate();

  if (loading) return <Spinner />;
  if (p.length === 0) return <PageNotFound />;
  if (error) throw error;

  const handleChange = (e) => {
    setSku(e.target.value);
  };

  return (
    <div id="detail">
      <h1>{p.name}</h1>
      <p>{p.description}</p>
      <p id="price">{p.price}</p>
      <select id="size" value={sku} onChange={handleChange}>
        <option value="">What Size?</option>
        {p.skus.map((s) => (
          <option key={s.sku} value={s.sku}>
            {s.sku}
          </option>
        ))}
      </select>
      <p>
        <button
          className="btn btn-primary"
          disabled={!sku}
          onClick={() => {
            addToCart(p.id, p.sku);
            naviGate("/cart");
          }}
        >
          Add TO CART
        </button>
      </p>

      <img src={`/images/${p.image}`} alt={p.category} />
    </div>
  );
}

export default Detail;

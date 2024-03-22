import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://rktbbrnpcrguplfnjlxq.supabase.co/rest/v1/gpu_used_value",
          {
            method: "GET",
            headers: {
              apikey:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrdGJicm5wY3JndXBsZm5qbHhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA2NzMwNzYsImV4cCI6MjAyNjI0OTA3Nn0.YwhTla2WZ2o2OoUY3pM5wuPKy9-k83pBP_ZqeWcTaSg",
            },
          }
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            width: "75vw",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Item gpu={data[0]} />
        </div>
      )}
      {data.length > 2 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            width: "75vw",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Item gpu={data[1]} />
          <Item gpu={data[2]} />
        </div>
      )}
      {data.length > 3 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            width: "75vw",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {data.slice(3).map((gpu) => (
            <Item gpu={gpu} />
          ))}
        </div>
      )}
    </div>
  );
}

function Item(props) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: hover ? "21vw" : "20vw",
        height: "15vw",
        backgroundColor: "white",
        margin: "10px",
        borderRadius: "20px",
        padding: "20px",
        boxShadow: hover
          ? "0 0 10px rgba(0,0,0,0.5)"
          : "0 0 5px rgba(0,0,0,0.5)",
        transition: "all 0.3s",
        display: "flex",
        // vertical
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      key={props.gpu.id}
    >
      <div
        style={{
          // bold, center
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        {props.gpu.model}
      </div>
      {props.gpu.tpu_id && (
        <img
          style={{
            // center
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          alt={"Image of " + props.gpu.model}
          src={
            "https://tpucdn.com/gpu-specs/images/" +
            props.gpu.tpu_id.charAt(0) +
            "/" +
            props.gpu.tpu_id.slice(1) +
            "-front.small.jpg"
          }
          height="50%"
        />
      )}
      <div>
        <div>FPS : {props.gpu["1080_med"]}</div>
        <div>Harga Bekas : Rp. {props.gpu.price_used_manual_formatted}</div>
        <div>Rp/FPS : {props.gpu.value_1080_med_used_formatted}/fps</div>
      </div>
    </div>
  );
}

export default App;

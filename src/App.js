import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [fps, setFps] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://rktbbrnpcrguplfnjlxq.supabase.co/rest/v1/gpu_all_used_value?price",
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
        setMasterData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // handle fps radio button
  const handleFps = (e) => {
    setFps(e.target.value);
    if (e.target.value === "0") {
      setData(masterData);
    } else {
      const filteredData = masterData.filter(
        (gpu) => gpu["1080_med"] > parseInt(e.target.value)
      );
      setData(filteredData);
    }
  };

  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: "0.5%",
          left: "0.5%",
          padding: "20px",
          display: "flex",
          flexWrap: "wrap",
          width: "10%",
          fontWeight: "bold",
        }}
      >
        Database GPU Bang Mordred
      </div>
      {/* floating box on left */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "0.5%",
          transform: "translateY(-50%)",
          padding: "20px",
          backgroundColor: "white",
          // top right and bottom right border radius 20px
          borderRadius: "20px",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          width: "10%",
          height: "35%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            // bold and center
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Sort & Filter
        </div>
        <div>
          Min FPS
          {/* radio buttons for 60 100 144 */}
          <div>
            <div>
              <input
                type="radio"
                id="0"
                name="fps"
                value="0"
                onChange={handleFps}
                defaultChecked
              />
              <label for="0">None</label>
            </div>

            <div>
              <input
                type="radio"
                id="60"
                name="fps"
                value="60"
                onChange={handleFps}
              />
              <label for="60">60</label>
            </div>

            <div>
              <input
                type="radio"
                id="100"
                name="fps"
                value="100"
                onChange={handleFps}
              />
              <label for="100">100</label>
            </div>

            <div>
              <input
                type="radio"
                id="144"
                name="fps"
                value="144"
                onChange={handleFps}
              />
              <label for="144">144</label>
            </div>
          </div>
        </div>
        <div>
          Harga Min
          <input type="number" style={{ width: "90%" }} />
        </div>
        <div>
          Harga Max
          <input type="number" style={{ width: "90%" }} />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </div>

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
          <Item gpu={data[0]} index={0} />
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
          <Item gpu={data[1]} index={1} />
          <Item gpu={data[2]} index={2} />
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
            <Item gpu={gpu} index={data.indexOf(gpu)} />
          ))}
        </div>
      )}
    </div>
  );
}

function Item(props) {
  const [hover, setHover] = useState(false);

  //gold, silver, bronze
  const [colors, setColors] = useState(["#a67c00", "#71706e", "#CD7F32"]);

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
          position: "relative",
          top: "0",
          left: "0",
          color: colors[props.index],
        }}
      >
        #{props.index + 1} {props.gpu.model}
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

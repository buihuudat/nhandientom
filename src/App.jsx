import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // set backend to webgl
import Loader from "./components/loader";
import ButtonHandler from "./components/btn-handler";
import { detect } from "./utils/detect";
import "./style/App.css";

const App = () => {
  const [loading, setLoading] = useState({ loading: true, progress: 0 }); // loading state
  const [model, setModel] = useState({
    net: null,
    inputShape: [1, 0, 0, 3],
  }); // init model & input shape

  // references
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
    // model configs
  const modelName = "Sử dụng model YOLOv8 để nhận diện tôm";

  useEffect(() => {
    tf.ready().then(async () => {
      const model = await tf.loadGraphModel("./public/models/model.json",
        {
          onProgress: (fractions) => {
            setLoading({ loading: true, progress: fractions }); // set loading fractions
          },
        }
      ); // load model

      // warming up model
      const dummyInput = tf.ones(model.inputs[0].shape);
      const warmupResults = model.execute(dummyInput);

      setLoading({ loading: false, progress: 1 });
      setModel({
        net: model,
        inputShape: model.inputs[0].shape,
      }); // set model & input shape

      tf.dispose([warmupResults, dummyInput]); // cleanup memory
    });
  }, []);
  


  return (
    <div className="App">
      <div className="upload_image"></div>
      {loading.loading && <Loader>Loading model.Json...</Loader>}
      <div className="header">
        <h1>Hệ thống nhận diện tôm</h1>
        <p>
          website : <code className="code">{modelName}</code>
        </p>
        <div className="button_place">
          <ButtonHandler imageRef={imageRef} />
        </div>
      </div>

      <div className="predict_image">
        <h4 className="name_content">Kết quả dự đoán tôm</h4>
        <div className="content">
          <img 
            src="#"
            ref={imageRef}
            onLoad={() => detect(imageRef.current, model, canvasRef.current)}
          />
          <canvas width={model.inputShape[1]} height={model.inputShape[2]} ref={canvasRef} />
        </div>
      </div>
    </div>
  );
};

export default App;

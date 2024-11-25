import { useState, useEffect } from "react";
import { Image } from "./image";
import React from "react";
import { Generate } from "./generate";
import {ExemplosReais} from "./ExemplosReais"

export const GeneratePage = (props) => {

  return (
    <div id="portfolio" className="text-center">
      <Generate data={props.data}  />
      <ExemplosReais data={props.data} />
    </div>
  );
};
